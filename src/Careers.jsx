import { useCallback, useEffect, useMemo, useRef, useState, Suspense, lazy } from 'react';
import './Careers.css';

const Globe = lazy(() => import('./Globe'));

const HERO_SLIDES = [
  {
    tag: 'Engineering',
    title: 'Build what millions rely on.',
    subtitle:
      'Ship products that power small businesses across the globe — from the first line of code to the final deploy.',
  },
  {
    tag: 'Design',
    title: 'Design for the next million dreamers.',
    subtitle:
      'Craft interfaces that help entrepreneurs launch, grow, and thrive online. Pixel-perfect, human-first.',
  },
  {
    tag: 'Growth',
    title: 'Grow with the fold.',
    subtitle:
      'Join a team that treats careers like craft — mentorship, ownership, and room to become your boldest self.',
  },
];

const CATEGORIES = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Support'];

const JOBS = [
  { id: 1, title: 'Senior Frontend Engineer', category: 'Engineering', location: 'Remote · Global', type: 'Full-time', team: 'Web Platform', blurb: 'Own the experience layer of our flagship SMB tooling. React, TypeScript, a bias for craft.' },
  { id: 2, title: 'Staff Backend Engineer', category: 'Engineering', location: 'Austin, TX', type: 'Full-time', team: 'Infrastructure', blurb: 'Design distributed systems serving millions. You lead from the terminal, not the deck.' },
  { id: 3, title: 'Product Designer', category: 'Design', location: 'Remote · US', type: 'Full-time', team: 'Brand Studio', blurb: 'Shape the visual voice of Newfold. Systems thinker, storyteller, pixel perfectionist.' },
  { id: 4, title: 'UX Researcher', category: 'Design', location: 'Jacksonville, FL', type: 'Full-time', team: 'Insights', blurb: 'Unearth what SMB owners actually need. Synthesize ambiguity into clarity.' },
  { id: 5, title: 'Senior Product Manager', category: 'Product', location: 'Remote · Global', type: 'Full-time', team: 'Websites', blurb: 'Own the roadmap for a product used by hundreds of thousands of creators.' },
  { id: 6, title: 'Growth Marketer', category: 'Marketing', location: 'New York, NY', type: 'Full-time', team: 'Acquisition', blurb: 'Build loops, not funnels. Ship experiments weekly and measure what moves.' },
  { id: 7, title: 'Brand Copywriter', category: 'Marketing', location: 'Remote · US', type: 'Full-time', team: 'Brand Studio', blurb: 'Write like a human. Make every touchpoint feel like a conversation.' },
  { id: 8, title: 'Customer Success Lead', category: 'Support', location: 'Phoenix, AZ', type: 'Full-time', team: 'Care', blurb: 'Turn first-time website owners into lifelong Newfold advocates.' },
  { id: 9, title: 'Site Reliability Engineer', category: 'Engineering', location: 'Remote · EU', type: 'Full-time', team: 'Infrastructure', blurb: 'Keep uptime boring. Automate the rest. Incident responder at heart.' },
  { id: 10, title: 'Design Systems Engineer', category: 'Design', location: 'Remote · Global', type: 'Full-time', team: 'Platform', blurb: 'Tokens, primitives, and the quiet joy of a well-named component.' },
];

const OFFICE_DETAILS = [
  { name: 'London, UK', description: 'Our European hub. A mix of engineering, design, and plenty of afternoon tea.' },
  { name: 'Austin, TX', description: 'Deep in the heart of Texas. Infrastructure and BBQ.' },
  { name: 'Jacksonville, FL', description: 'Sun, surf, and our premier support team headquarters.' },
  { name: 'Phoenix, AZ', description: 'Desert views and solid customer success operations.' },
  { name: 'New York, NY', description: 'The city that never sleeps, home to our growth and acquisition teams.' },
  { name: 'Mumbai, IN', description: 'A vibrant technical powerhouse driving core platform innovation.' },
  { name: 'Sao Paulo, BR', description: 'Expanding our reach for the booming South American market.' }
];

const Icon = {
  Target: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  ),
  People: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
  Book: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </svg>
  ),
  Chart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 4 4 5-6" />
    </svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  Location: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  ChevronLeft: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  ChevronRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
};

const VALUES = [
  { Icon: Icon.Target, title: 'Own the outcome', text: 'We hire people who finish. Titles blur; impact is loud.' },
  { Icon: Icon.Sparkle, title: 'Make it simple', text: 'Simplicity is a team sport. We fight complexity every sprint.' },
  { Icon: Icon.People, title: 'Bet on people', text: 'We invest early and deeply. Growth is mutual, not transactional.' },
  { Icon: Icon.Shield, title: 'Move with care', text: 'Fast, but never careless. Millions depend on what we ship.' },
];

const STORIES = [
  { name: 'Priya Menon', role: 'Staff Engineer · 4 yrs', quote: 'I came to build APIs. I stayed because my first mentor here still reviews my PRs — and we still argue over tabs vs. spaces.', avatar: 'PM' },
  { name: 'Marcus Hale', role: 'Product Designer · 2 yrs', quote: 'Newfold is the first place I’ve worked where “design at the table” isn’t a slogan. It’s the meeting invite.', avatar: 'MH' },
  { name: 'Lena Okafor', role: 'Engineering Manager · 6 yrs', quote: 'I’ve been promoted three times. Each time it felt earned, not given. That’s rare.', avatar: 'LO' },
  { name: 'Diego Ramirez', role: 'Growth Marketer · 1 yr', quote: 'They told me “we hire for slope, not intercept” in my interview. A year in, I finally get what that means.', avatar: 'DR' },
];

const PERKS = [
  { Icon: Icon.Calendar, title: 'Unlimited PTO', text: 'Rest is infrastructure. Take what you need, when you need it.' },
  { Icon: Icon.Globe, title: 'Remote-first', text: 'Work from anywhere. We fly you in for the moments that matter.' },
  { Icon: Icon.Book, title: 'Learning budget', text: '$2,000 a year for books, courses, conferences — your call.' },
  { Icon: Icon.Chart, title: 'Equity for all', text: 'Every employee owns a piece of what we build, from day one.' },
  { Icon: Icon.Heart, title: 'Parental leave', text: '16 weeks, fully paid, for every new parent regardless of role.' },
  { Icon: Icon.Sun, title: 'Wellness stipend', text: 'Monthly support for gyms, therapy, or whatever keeps you sharp.' },
];

export default function Careers() {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [story, setStory] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef([]);

  // Spotlight state
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleHeroMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  // Hero auto-rotate
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  // Nav scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveals
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      const matchCat = category === 'All' || j.category === category;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.team.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [category, query]);

  const current = HERO_SLIDES[slide];

  // ===== Testimonial carousel with drag support =====
  const trackRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, dx: 0, pointerId: null });
  const [dragOffset, setDragOffset] = useState(0);

  const goStory = useCallback((next) => {
    setStory((s) => (next + STORIES.length) % STORIES.length);
  }, []);

  const onPointerDown = (e) => {
    dragState.current.active = true;
    dragState.current.startX = e.clientX;
    dragState.current.dx = 0;
    dragState.current.pointerId = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    dragState.current.dx = dx;
    setDragOffset(dx);
  };
  const onPointerUp = (e) => {
    if (!dragState.current.active) return;
    const { dx } = dragState.current;
    dragState.current.active = false;
    setDragOffset(0);
    const threshold = 60;
    if (dx < -threshold) goStory(story + 1);
    else if (dx > threshold) goStory(story - 1);
    try { e.currentTarget.releasePointerCapture(dragState.current.pointerId); } catch {}
  };

  // Keyboard navigation for story
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goStory(story - 1);
      if (e.key === 'ArrowRight') goStory(story + 1);
    };
    const node = trackRef.current;
    if (!node) return;
    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, [story, goStory]);

  return (
    <div className="nf-root">
      {/* NAV */}
      <nav className={`nf-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nf-nav-inner">
          <a href="#" className="nf-logo">
            <span className="nf-logo-mark">
              <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
                <path
                  d="M6 26V6l12 14V6m2 0h6m-6 20h6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="nf-logo-word">newfold <em>digital</em></span>
          </a>
          <div className="nf-nav-links">
            <a href="#open">Open Roles</a>
            <a href="#life">Life at Newfold</a>
            <a href="#values">Values</a>
            <a href="#perks">Perks</a>
          </div>
          <button className="nf-btn nf-btn-primary nf-nav-cta" onClick={() => document.getElementById('open')?.scrollIntoView({ behavior: 'smooth' })}>
            Browse Openings
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="nf-hero" onMouseMove={handleHeroMouseMove}>
        <div className="nf-hero-spotlight" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }} aria-hidden="true" />
        <div className="nf-mesh" aria-hidden="true">
          <span className="nf-mesh-blob nf-mesh-blob-1" />
          <span className="nf-mesh-blob nf-mesh-blob-2" />
          <span className="nf-mesh-blob nf-mesh-blob-3" />
          <span className="nf-mesh-conic" />
        </div>
        <div className="nf-hero-grid" aria-hidden="true" />
        <div className="nf-hero-inner">
          <div className="nf-hero-badge">
            <span className="nf-dot" /> We’re hiring across {CATEGORIES.length - 1} teams
          </div>
          <h1 className="nf-hero-title" key={slide}>
            {current.title.split(' ').map((w, i) => (
              <span className="nf-word" style={{ animationDelay: `${i * 60}ms` }} key={i}>
                {w}&nbsp;
              </span>
            ))}
          </h1>
          <p className="nf-hero-sub" key={`s-${slide}`}>{current.subtitle}</p>
          <div className="nf-hero-cta">
            <a href="#open" className="nf-btn nf-btn-primary nf-btn-lg">
              See open roles
              <Icon.ArrowRight width="18" height="18" />
            </a>
            <a href="#life" className="nf-btn nf-btn-ghost nf-btn-lg">
              Life at Newfold
            </a>
          </div>
          <div className="nf-hero-dots" role="tablist" aria-label="Featured team">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.tag}
                role="tab"
                aria-selected={i === slide}
                aria-label={s.tag}
                className={`nf-hero-dot ${i === slide ? 'is-active' : ''}`}
                onClick={() => setSlide(i)}
              >
                <span className="nf-hero-dot-label">{s.tag}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="nf-hero-marquee" aria-hidden="true">
          <div className="nf-marquee-track">
            {Array.from({ length: 2 }).map((_, k) => (
              <div className="nf-marquee-group" key={k}>
                <span>Engineering</span><span>·</span>
                <span>Design</span><span>·</span>
                <span>Product</span><span>·</span>
                <span>Marketing</span><span>·</span>
                <span>Support</span><span>·</span>
                <span>Data</span><span>·</span>
                <span>People</span><span>·</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="nf-stats nf-reveal" ref={addReveal}>
        <div className="nf-stats-inner">
          {[
            ['6M+', 'Small businesses served'],
            ['3,000+', 'Newfolders worldwide'],
            ['30+', 'Countries represented'],
            ['#1', 'In web presence solutions'],
          ].map(([n, l]) => (
            <div className="nf-stat" key={l}>
              <div className="nf-stat-num">{n}</div>
              <div className="nf-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>



      {/* OPEN ROLES — responsive grid / mobile carousel */}
      <section className="nf-section nf-reveal" id="open" ref={addReveal}>
        <div className="nf-section-head">
          <div>
            <div className="nf-eyebrow">Open Roles</div>
            <h2 className="nf-h2">Find your next chapter.</h2>
          </div>
          <label className="nf-search">
            <Icon.Search width="18" height="18" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles, teams, cities…"
              aria-label="Search open roles"
            />
          </label>
        </div>

        <div className="nf-tabs" role="tablist" aria-label="Filter roles by team">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              className={`nf-tab ${category === c ? 'is-active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
              <span className="nf-tab-count">
                {c === 'All' ? JOBS.length : JOBS.filter((j) => j.category === c).length}
              </span>
            </button>
          ))}
        </div>

        <div className="nf-jobs" key={category + '-' + query}>
          {filtered.length === 0 ? (
            <div className="nf-empty">
              No roles match that search — try a different keyword or category.
            </div>
          ) : (
            filtered.map((job, i) => (
              <article className="nf-card" key={job.id} style={{ animationDelay: `${i * 55}ms` }}>
                <div className="nf-card-glow" aria-hidden="true" />
                <div className="nf-card-top">
                  <span className="nf-card-tag">{job.category}</span>
                  <span className="nf-card-type">{job.type}</span>
                </div>
                <h3 className="nf-card-title">{job.title}</h3>
                <p className="nf-card-blurb">{job.blurb}</p>
                <div className="nf-card-meta">
                  <div className="nf-meta-row">
                    <Icon.Location width="14" height="14" />
                    {job.location}
                  </div>
                  <div className="nf-meta-row">
                    <Icon.People width="14" height="14" />
                    {job.team}
                  </div>
                </div>
                <button className="nf-card-cta">
                  Apply
                  <Icon.ArrowRight width="14" height="14" />
                </button>
              </article>
            ))
          )}
        </div>
      </section>

      {/* VALUES */}
      <section className="nf-section nf-values nf-reveal" id="values" ref={addReveal}>
        <div className="nf-section-head nf-section-head-center">
          <div>
            <div className="nf-eyebrow">What we stand for</div>
            <h2 className="nf-h2">Four values. No asterisks.</h2>
          </div>
        </div>
        <div className="nf-values-grid">
          {VALUES.map((v, i) => (
            <div className="nf-value" key={v.title} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="nf-value-icon">
                <v.Icon width="26" height="26" />
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL FOOTPRINT */}
      <section className="nf-section nf-reveal" id="global-footprint" ref={addReveal}>
        <div className="nf-section-head nf-section-head-center">
          <div>
            <div className="nf-eyebrow">Our Global Footprint</div>
            <h2 className="nf-h2">Where we work.</h2>
          </div>
        </div>
        <div className="nf-globe-layout">
          <div className="nf-globe-locations">
            {OFFICE_DETAILS.map((office, i) => (
              <div className="nf-office-card nf-reveal" key={office.name} style={{ animationDelay: `${i * 100}ms` }} ref={addReveal}>
                <div className="nf-office-header">
                  <Icon.Location width="18" height="18" />
                  <h4>{office.name}</h4>
                </div>
                <p>{office.description}</p>
              </div>
            ))}
          </div>
          <div className="nf-globe-visual">
            <Suspense fallback={<div style={{ width: '100%', height: 600 }} />}>
              <Globe size={600} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* LIFE / STORIES — draggable carousel */}
      <section className="nf-section nf-life nf-reveal" id="life" ref={addReveal}>
        <div className="nf-life-inner">
          <div className="nf-life-copy">
            <div className="nf-eyebrow">Life at Newfold</div>
            <h2 className="nf-h2">Stories from the fold.</h2>
            <p className="nf-lead">
              The best part of Newfold isn’t the product — it’s the people building it.
              Hear it from them.
            </p>
            <div className="nf-story-nav">
              <button
                className="nf-story-btn"
                onClick={() => goStory(story - 1)}
                aria-label="Previous story"
              >
                <Icon.ChevronLeft width="20" height="20" />
              </button>
              <div className="nf-story-dots" role="tablist" aria-label="Choose a story">
                {STORIES.map((s, i) => (
                  <button
                    key={s.name}
                    role="tab"
                    aria-selected={i === story}
                    aria-label={`Story ${i + 1}: ${s.name}`}
                    className={`nf-story-dot ${i === story ? 'is-active' : ''}`}
                    onClick={() => goStory(i)}
                  />
                ))}
              </div>
              <button
                className="nf-story-btn"
                onClick={() => goStory(story + 1)}
                aria-label="Next story"
              >
                <Icon.ChevronRight width="20" height="20" />
              </button>
            </div>
            <div className="nf-story-counter">
              {String(story + 1).padStart(2, '0')} <span>/ {String(STORIES.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div
            className="nf-story-viewport"
            ref={trackRef}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            aria-roledescription="carousel"
            aria-live="polite"
          >
            <div
              className={`nf-story-track ${dragOffset !== 0 ? 'is-dragging' : ''}`}
              style={{ transform: `translate3d(calc(${-story * 100}% + ${dragOffset}px), 0, 0)` }}
            >
              {STORIES.map((s, i) => (
                <div className="nf-story-slide" key={s.name} aria-hidden={i !== story}>
                  <div className="nf-story-card">
                    <svg className="nf-story-quote" viewBox="0 0 48 36" aria-hidden="true">
                      <path d="M14 36c-4.4 0-8-3.6-8-8 0-8 6-16 14-20l2 4c-5 3-8 7-8 12 0 1 .2 2 .6 3 .8-.6 1.8-1 3-1 3.3 0 6 2.7 6 6s-3.2 4-9.6 4ZM38 36c-4.4 0-8-3.6-8-8 0-8 6-16 14-20l2 4c-5 3-8 7-8 12 0 1 .2 2 .6 3 .8-.6 1.8-1 3-1 3.3 0 6 2.7 6 6s-3.2 4-9.6 4Z" fill="currentColor" />
                    </svg>
                    <div className="nf-story-avatar">{s.avatar}</div>
                    <blockquote>{s.quote}</blockquote>
                    <div className="nf-story-person">
                      <strong>{s.name}</strong>
                      <span>{s.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="nf-section nf-reveal" id="perks" ref={addReveal}>
        <div className="nf-section-head">
          <div>
            <div className="nf-eyebrow">Perks & Benefits</div>
            <h2 className="nf-h2">We take care of our own.</h2>
          </div>
        </div>
        <div className="nf-perks-grid">
          {PERKS.map((p, i) => (
            <div className="nf-perk" key={p.title} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="nf-perk-icon">
                <p.Icon width="24" height="24" />
              </div>
              <div className="nf-perk-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="nf-cta nf-reveal" ref={addReveal}>
        <div className="nf-cta-inner">
          <div className="nf-cta-orb nf-cta-orb-1" aria-hidden="true" />
          <div className="nf-cta-orb nf-cta-orb-2" aria-hidden="true" />
          <h2>Ready to join the fold?</h2>
          <p>Don’t see your role? We’re always looking for exceptional people.</p>
          <div className="nf-cta-row">
            <a href="#open" className="nf-btn nf-btn-primary nf-btn-lg">Browse all openings</a>
            <a href="#" className="nf-btn nf-btn-outline nf-btn-lg">Send us your CV</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="nf-footer">
        <div className="nf-footer-inner">
          <div className="nf-logo">
            <span className="nf-logo-mark">
              <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
                <path d="M6 26V6l12 14V6m2 0h6m-6 20h6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="nf-logo-word">newfold <em>digital</em></span>
          </div>
          <p>© {new Date().getFullYear()} Newfold Digital. Careers prototype.</p>
        </div>
      </footer>
    </div>
  );
}
