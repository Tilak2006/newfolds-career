import React, { useEffect, useRef, useState, useMemo } from 'react';
import GlobeComponent from 'react-globe.gl';
import * as THREE from 'three';

export const OFFICES = [
  { name: 'London, UK',       lat: 51.5074, lng: -0.1278,   size: 1.5 },
  { name: 'Austin, TX',       lat: 30.2672, lng: -97.7431,  size: 1.0 },
  { name: 'Jacksonville, FL', lat: 30.3322, lng: -81.6557,  size: 0.9 },
  { name: 'Phoenix, AZ',      lat: 33.4484, lng: -112.0740, size: 0.9 },
  { name: 'New York, NY',     lat: 40.7128, lng: -74.0060,  size: 1.0 },
  { name: 'Mumbai, IN',       lat: 19.0760, lng: 72.8777,   size: 1.0 },
  { name: 'Sao Paulo, BR',    lat: -23.5505, lng: -46.6333, size: 0.9 },
];

export default function Globe({ size = 520, className = '' }) {
  const globeRef = useRef();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: size, height: size });
  const [countries, setCountries] = useState([]);

  // Fetch GeoJSON directly for the minimal vector map
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => setCountries(data.features))
      .catch(err => console.error("Failed to fetch map:", err));
  }, []);

  // Responsive observation
  useEffect(() => {
    let animationFrameId = null;
    const resizeObserver = new ResizeObserver((entries) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        for (let entry of entries) {
          const { width } = entry.contentRect;
          if (width > 0) setDimensions({ width: width, height: width });
        }
      });
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  // Initialization & Auto-Rotation Setup
  useEffect(() => {
    let timeout;
    if (globeRef.current) {
      // Delay slightly ensures Three.js canvas controls are fully mounted
      timeout = setTimeout(() => {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.8;
          controls.enableZoom = false; // Disable scroll zoom as requested
        }
        
        // Smoothly orient the camera onto the Atlantic to highlight US/UK
        globeRef.current.pointOfView({ lat: 35, lng: -25, altitude: 2.2 }, 1000);
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, []);

  const globeMaterial = useMemo(() => {
    // Pure minimal lighting material for the water/base globe
    const mat = new THREE.MeshPhongMaterial();
    mat.color = new THREE.Color(0xf8fafc); // very light slate
    mat.emissive = new THREE.Color(0x000000);
    mat.transparent = true;
    mat.opacity = 0.95;
    mat.shininess = 10;
    return mat;
  }, []);

  const processedMarkers = useMemo(() => {
    return OFFICES.map(o => ({ ...o, color: '#ff6a2b' })); // Newfold orange
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`nf-globe ${className}`} 
      style={{ 
        width: '100%', 
        maxWidth: size, 
        aspectRatio: '1 / 1', 
        position: 'relative', 
        zIndex: 1, 
        margin: '0 auto',
        contain: 'layout size'
      }}
    >
      <GlobeComponent
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        
        // Atmosphere
        showAtmosphere={true}
        atmosphereColor="#94a3b8" 
        atmosphereAltitude={0.12}
        globeMaterial={globeMaterial}

        // Continents Layer
        polygonsData={countries}
        polygonAltitude={0.005}
        polygonCapColor={() => '#e2e8f0'}
        polygonSideColor={() => 'rgba(255, 255, 255, 0.05)'}
        polygonStrokeColor={() => '#cbd5e1'}

        // Points Layer (solid dot)
        pointsData={processedMarkers}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.02}
        pointRadius="size"
        pointsMerge={true}

        // Ripple/Rings Layer (adds animated glow impact)
        ringsData={processedMarkers}
        ringLat="lat"
        ringLng="lng"
        ringColor="color"
        ringMaxRadius={d => d.size * 3.5}
        ringPropagationSpeed={1.8}
        ringRepeatPeriod={800}
      />
    </div>
  );
}
