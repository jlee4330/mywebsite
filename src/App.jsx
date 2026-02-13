import { useState, useEffect, useRef } from 'react';
import './index.css';
import ResearchScope from './components/ResearchScope';

const newsItems = [
  { date: '2026.02', text: <>Our paper, "Evaluating Visual Prompts with Eye-Tracking Data for MLLM-Based Human Activity Recognition," is accepted to <strong>IEEE PacificVis 2026</strong> 📄✨ Big congratulations to <a href="https://jaeyoungchoi1.github.io/" target="_blank" rel="noopener noreferrer">JaeYoung</a>!</> },
  { date: '2026.01', text: <>Attend <strong>HCI Korea 2026</strong> 🇰🇷</> },
  { date: '2026.01', text: <>Submit one poster to <strong>CHI 2026</strong> 🤞 Submit two full papers to <strong>DIS 2026</strong> 🤞</> },
  { date: '2025.11', text: <>Attend the <strong>IEEE VIS 2025</strong> conference in Vienna 🎨📊</> },
  { date: '2025.11', text: <>First-authored paper, "Creating Text-Based AI Clones of Myself," is accepted to <strong>IJHCS</strong> 📘</> },
  { date: '2025.05', text: <>Attend <strong>CHI 2025</strong> in Yokohama 🌍✨</> },
];

const publications = [
  {
    tag: 'J.4',
    title: 'Creating Text-Based AI Clones of Myself: Exploring Perceptions, Development Strategies, and Challenges',
    authors: ['Donggun Lee*', 'Suyoun Lee*', 'Hyunseung Lim', 'Hwajung Hong'],
    venue: 'International Journal of Human–Computer Studies (IJHCS), 103692. Special Issue: "AI-Generated Personas: Representing User Needs with Generative AI Models."',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1016/j.ijhcs.2025.103692' }, { label: 'PDF', url: '/clone.pdf' }],
  },
  {
    tag: 'J.3',
    title: 'Understanding the Impact of Spatial Immersion in Web Data Stories',
    authors: ['SeonGyeom Kim', 'Juhyeong Park', 'Yutaek Song', 'Donggun Lee', 'Yubin Lee', 'Ryan Rossi', 'Jane Hoffswell', 'Eunyee Koh', 'Tak Yeon Lee'],
    venue: 'Preprint (Under Revision)',
    links: [{ label: 'DOI', url: 'https://doi.org/10.48550/arXiv.2411.18049' }, { label: 'PDF', url: '/ids.pdf' }],
  },
  {
    tag: 'J.2',
    title: 'The Impact of a Meditation Camp on Emotional Regulation and Abstinence Intentions in Individuals with Gambling Addiction',
    authors: ['Sanghee Cho', 'Sangseong Kim', 'Donggun Lee', 'Junggi Hong', 'Eunmi Kim'],
    venue: 'Korean Journal of Meditation 2025, Vol. 15, No. 1, pp.105-117',
    links: [{ label: 'DOI', url: 'https://doi.org/10.23250/kjm.15.1.202502.006' }, { label: 'PDF', url: '/med.pdf' }],
  },
  {
    tag: 'C.1',
    title: 'Pokemon Color Adjustments for Augmented Reality Contents',
    authors: ['Donggun Lee', 'Taesu Kim', 'Hyeon-Jeong Suk'],
    venue: "Electronic Imaging (IS&T International Symposium on Electronic Imaging 2022)",
    links: [
      { label: 'DOI', url: 'https://doi.org/10.2352/EI.2022.34.15.COLOR-377' },
      { label: 'PDF', url: '/pokemon.pdf' },
    ],
  },
];

function renderAuthors(authors) {
  return authors.map((author, i) => {
    const isMe = author.startsWith('Donggun Lee');
    return (
      <span key={i}>
        {i > 0 && ', '}
        {isMe ? <span className="me">{author}</span> : author}
      </span>
    );
  });
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('/donggun1.png');
  const [prevPhoto, setPrevPhoto] = useState('/donggun1.png');
  const [photoFading, setPhotoFading] = useState(false);
  const photoTimerRef = useRef(null);
  const puzzleRef = useRef(null);

  // Preload swap images so they display instantly
  useEffect(() => {
    ['/sing.png', '/dj.png', '/tennis.jpg', '/lab2.png'].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove animation property after it ends so hover CSS can take effect
  useEffect(() => {
    const group = puzzleRef.current;
    if (!group) return;
    const labels = group.querySelectorAll('.floating-label, .label-glow');
    const handlers = [];
    labels.forEach((el) => {
      const handler = () => {
        el.style.animation = 'none';
        el.classList.add('landed');
      };
      el.addEventListener('animationend', handler);
      handlers.push({ el, handler });
    });
    return () => {
      handlers.forEach(({ el, handler }) =>
        el.removeEventListener('animationend', handler)
      );
    };
  }, []);

  const swapPhoto = (src) => {
    if (photoTimerRef.current) clearTimeout(photoTimerRef.current);
    setPrevPhoto(profilePhoto);
    setProfilePhoto(src);
    setPhotoFading(true);
    // Let the fade complete, then sync prevPhoto
    setTimeout(() => {
      setPrevPhoto(src);
      setPhotoFading(false);
    }, 400);
    photoTimerRef.current = setTimeout(() => {
      setPrevPhoto(src);
      setProfilePhoto('/donggun1.png');
      setPhotoFading(true);
      setTimeout(() => {
        setPrevPhoto('/donggun1.png');
        setPhotoFading(false);
      }, 400);
    }, 3000);
  };

  useEffect(() => {
    // Smooth scroll for anchor links
    const nav = document.querySelector('.header-nav');
    if (!nav) return;
    const handleClick = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = e.target.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) {
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 64,
            behavior: 'smooth',
          });
        }
      }
    };
    nav.addEventListener('click', handleClick);
    return () => nav.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* ─── Header ─── */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#" className="header-name">
            <svg className="header-logo" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="2" width="12" height="16" rx="2.5" fill="url(#logo-grad-1)" />
              <path d="M12 7.5 C14.5 7.5 14.5 12.5 12 12.5" fill="url(#logo-grad-1)" />
              <path d="M14.5 10 C14.5 7.5 12 7.5 12 10 C12 12.5 14.5 12.5 14.5 10Z" fill="url(#logo-grad-2)" />
              <rect x="12" y="2" width="12" height="16" rx="2.5" fill="url(#logo-grad-2)" />
              <path d="M24 7.5 C26.5 7.5 26.5 12.5 24 12.5" fill="url(#logo-grad-2)" />
              <path d="M26.5 10 C26.5 7.5 24 7.5 24 10 C24 12.5 26.5 12.5 26.5 10Z" fill="url(#logo-grad-3)" />
              <rect x="24" y="2" width="12" height="16" rx="2.5" fill="url(#logo-grad-3)" />
              <defs>
                <linearGradient id="logo-grad-1" x1="0" y1="10" x2="12" y2="10" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id="logo-grad-2" x1="12" y1="10" x2="24" y2="10" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818cf8" />
                  <stop offset="1" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="logo-grad-3" x1="24" y1="10" x2="36" y2="10" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
            Donggun Lee
            <span className="header-affiliation">HCI @ KAIST</span>
          </a>
          <nav className="header-nav">
            <a href="#about">About</a>
            <a href="#publications">Publications</a>
            <a href="#projects">Projects</a>
            <a href="/Donggun Lee_CV.pdf" target="_blank" rel="noopener noreferrer">CV</a>
          </nav>
        </div>
      </header>

      <div className="page-layout">
        {/* ─── Sidebar ─── */}
        <aside className="sidebar">
          <div className="sidebar-profile">
            <div className="photo-wrapper">
              <div className="photo-crossfade">
                <img
                  src={prevPhoto}
                  alt=""
                  className="sidebar-photo crossfade-prev"
                  style={
                    prevPhoto === '/sing.png'
                      ? { objectPosition: 'center 0%' }
                      : prevPhoto === '/dj.png'
                        ? { objectPosition: '15% 90%' }
                        : prevPhoto === '/tennis.jpg'
                          ? { objectPosition: '100% center' }
                          : prevPhoto === '/lab2.png'
                            ? { objectPosition: '5% center' }
                            : {}
                  }
                />
                <img
                  src={profilePhoto}
                  alt="Donggun Lee"
                  className={`sidebar-photo crossfade-next ${photoFading ? 'fade-in' : ''}`}
                  style={
                    profilePhoto === '/sing.png'
                      ? { objectPosition: 'center 0%' }
                      : profilePhoto === '/dj.png'
                        ? { objectPosition: '15% 90%' }
                        : profilePhoto === '/tennis.jpg'
                          ? { objectPosition: '100% center' }
                          : profilePhoto === '/lab2.png'
                            ? { objectPosition: '5% center' }
                            : {}
                  }
                />
              </div>
              {/* Puzzle label group - hover to interlock */}
              <div className="puzzle-group" ref={puzzleRef}>
                <div className="label-glow"></div>
                <div className="floating-label label-design">Design</div>
                <div className="floating-label label-hci">HCI</div>
                <div className="floating-label label-ai">AI</div>
              </div>
            </div>
            <h1 className="sidebar-name">Donggun Lee</h1>
            <p className="sidebar-title">jlee4330@kaist.ac.kr</p>
            <p className="sidebar-title">Daejeon, South Korea</p>
            <div className="sidebar-icons">
              <a href="mailto:jlee4330@kaist.ac.kr" title="Email" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
              <a href="https://scholar.google.com/citations?user=JoR4t6YAAAAJ&hl=ko" target="_blank" rel="noopener noreferrer" title="Google Scholar" aria-label="Google Scholar">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/donggunlee0/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://github.com/jlee4330" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="https://www.youtube.com/@donggunlee0" target="_blank" rel="noopener noreferrer" title="YouTube" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>

            {/* News in sidebar */}
            <div className="sidebar-news">
              <h3 className="sidebar-news-title">News</h3>
              {newsItems.map((item, i) => (
                <div key={i} className="sidebar-news-item">
                  <span className="sidebar-news-date">{item.date}</span>
                  <span className="sidebar-news-text">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Education in sidebar */}
            <div className="sidebar-education">
              <h3 className="sidebar-education-title">Education</h3>
              <div className="sidebar-edu-item">
                <div className="sidebar-edu-degree"><strong>M.S. student, KAIST</strong> — Industrial Design</div>
                <div className="sidebar-edu-period">Sep 2025 – Present</div>
              </div>
              <div className="sidebar-edu-item">
                <div className="sidebar-edu-degree"><strong>B.S., KAIST</strong> — Industrial Design / AI Special Designated Major</div>
                <div className="sidebar-edu-period">Sep 2018 – Aug 2025</div>
                <div className="sidebar-edu-sub">🇨🇭 Alumnus of <a href="https://www.ecolint.ch/fr/la-grande-boissiere" target="_blank" rel="noopener noreferrer">International School of Geneva</a></div>
                <div className="sidebar-edu-period">Class of 2018</div>
              </div>
            </div>
          </div>



        </aside>

        {/* ─── Main Content ─── */}
        <main className="main-content">
          {/* About */}
          <section id="about" className="content-section">
            <h2 className="section-title">About me</h2>
            <p className="intro-text">
              Hello, thanks for stopping by 👋
              {' '}I'm a first-year Master's student in <a href="https://id.kaist.ac.kr/" target="_blank" rel="noopener noreferrer">Industrial Design at KAIST</a>, advised by Prof.{' '}
              <a href="https://takyeonlee.com/" target="_blank" rel="noopener noreferrer">Tak Yeon Lee</a> in the{' '}
              <a href="https://ai-experience-lab.github.io/" target="_blank" rel="noopener noreferrer">AI Experience Lab</a>
              {' '}and affiliated with the{' '}
              <a href="https://hci.kaist.ac.kr/" target="_blank" rel="noopener noreferrer">HCI@KAIST</a> community.
              {' '}Earlier in my academic path, I was fortunate to receive mentorship from{' '}
              <a href="https://galaxytourist.notion.site/Hwajung-Hong-cc10b0291bbe4ca38dbf4882cd687423" target="_blank" rel="noopener noreferrer">Hwajung Hong</a>,
              {' '}whose guidance has been deeply influential.
            </p>
            <p className="intro-text">
              My research explores the intersection of human–AI interaction and{' '}
              design. I approach AI not as a convenient tool, but as a{' '}
              design material to be examined, shaped, and negotiated through design practice,
              with a focus on how people make sense of AI systems through interaction.
              Recently, my focus has shifted toward multi-agent systems,
              with an emphasis on human–AI collaboration, including how people coordinate with,
              interpret, and oversee multiple AI agents as they work together in dynamic and interdependent settings.
            </p>
            <p className="intro-text">
              Outside of research, I enjoy outdoor activities, especially <span className="photo-swap-trigger" onClick={() => swapPhoto('/tennis.jpg')}>tennis 🎾</span> and football ⚽,
              and I love <span className="photo-swap-trigger" onClick={() => swapPhoto('/sing.png')}>singing 🎤</span>. You can find some of my song covers on YouTube.
              I am also a <span className="photo-swap-trigger" onClick={() => swapPhoto('/dj.png')}>hobby DJ 🎧</span>, and I enjoy exploring and experimenting with new ideas,
              tools, and creative practices.
            </p>
            <p className="intro-text">
              No matter who you are or what you are working on, feel free to reach out if you would like to chat.
              I enjoy exchanging stories, questions, and perspectives, and I am always happy to listen and share ✨
            </p>
            <a
              href="https://calendar.app.google/jdH44c9sj69dWYoi8"
              target="_blank"
              rel="noopener noreferrer"
              className="coffee-chat-btn"
            >
              <svg className="coffee-chat-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /></svg>
              Schedule a Coffee Chat
            </a>
          </section>


          {/* Publications */}
          <section id="publications" className="content-section">
            <h2 className="section-title">Publications</h2>
            {publications.map((pub, i) => (
              <div key={i} className="pub-entry">
                <span className="pub-entry-title">{pub.title}</span>
                <span className="pub-entry-authors">{renderAuthors(pub.authors)}</span>
                <span className="pub-entry-venue">{pub.venue}</span>
                {pub.links.length > 0 && (
                  <span className="pub-entry-links">
                    {pub.links.map((link, j) => (
                      <a key={j} href={link.url}>{link.label}</a>
                    ))}
                  </span>
                )}
              </div>
            ))}
          </section>

          {/* Projects */}
          <section id="projects" className="content-section">
            <h2 className="section-title">Projects</h2>

            {/* Yakgook */}
            <div className="project-entry">
              <h3 className="project-title">Yakgook: <span className="project-subtitle">A Metaverse Community for Shared Medication Care</span> <a href="https://techforimpact.io/" target="_blank" rel="noopener noreferrer" className="project-exhibit-badge">Social Impact Award, Kakao!mpact × KAIST Tech for Impact</a></h3>
              <p className="project-authors">
                Seowon Shin*, Yeongeun An*, <span className="me">Donggun Lee*</span>, Suhyeon Park*, Yejun Chung*, Hansam Lee*, Jooyoung Lee*
              </p>
              <p className="project-desc">
                A working Unity + React metaverse platform that supports medication adherence through loose solidarity among chronic patients.
              </p>
              <span className="pub-entry-links">
                <a href="https://drive.google.com/drive/folders/1SzL0LQt7NDrO_5HDX4ncKD2NtdBEq0Sf" target="_blank" rel="noopener noreferrer">App Download</a>
                <a href="https://github.com/jlee4330/medMax" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://youtu.be/RTVi_pHaPeI" target="_blank" rel="noopener noreferrer">Video</a>
              </span>
              <div style={{ marginBottom: '1.2rem' }}></div>
              <div className="project-video">
                <iframe
                  src="https://www.youtube.com/embed/RTVi_pHaPeI"
                  title="Yakgook Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Hey Mirror */}
            <div className="project-entry">
              <h3 className="project-title">Hey Mirror: Designing an Emotional Interaction Mirror Based on Large Language Models <a href="https://www.shinsegae.com/store/cns/cns.do?storeCd=SC00060&cnsNb=2#focus_move" target="_blank" rel="noopener noreferrer" className="project-exhibit-badge">Exhibited in SHINSEGAE NEXPERIUM</a></h3>
              <p className="project-authors"><span className="me">Donggun Lee</span></p>
              <p className="project-desc">
                A working LLM-powered smart mirror for real-time conversational emotional support, inspired by Snow White's magic mirror.
              </p>
              <div className="project-video">
                <img src="/heymirror.jpeg" alt="Hey Mirror" className="project-image" />
              </div>
            </div>

            {/* SEAhab */}
            <div className="project-entry">
              <h3 className="project-title">SEAhab: Welcoming Virtual Rehab Community for Drug Users</h3>
              <p className="project-authors">Jaeryung Chung*, <span className="me">Donggun Lee*</span>, Sohwi Son*, Maida Aizaz*, Yujin Kwon*, Tak Yeon Lee</p>
              <p className="project-desc">
                Designing rehabilitation systems that support accessibility and personalization through community participation and real-time intervention.
              </p>
              <span className="pub-entry-links">
                <a href="https://youtu.be/rwfZhoy7vXc" target="_blank" rel="noopener noreferrer">Video</a>
                <a href="/SEAhab.pdf" target="_blank" rel="noopener noreferrer">PDF</a>
              </span>
              <div style={{ marginBottom: '1.2rem' }}></div>
              <div className="project-video">
                <iframe
                  src="https://www.youtube.com/embed/rwfZhoy7vXc"
                  title="SEAhab Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Thoughtless Consumption */}
            <div className="project-entry">
              <h3 className="project-title">Thoughtless Consumption</h3>
              <p className="project-authors"><span className="me">Donggun Lee*</span>, Yujin Kwon*, Wooryung Jeong*</p>
              <p className="project-desc">
                An interactive installation that reveals how sensory stimulation, social pressure, and system design shape unconscious consumer behavior.
              </p>
              <span className="pub-entry-links">
                <a href="https://youtu.be/DSIze1NkLrc" target="_blank" rel="noopener noreferrer">Video</a>
              </span>
              <div style={{ marginBottom: '1.2rem' }}></div>
              <div className="project-video">
                <iframe
                  src="https://www.youtube.com/embed/DSIze1NkLrc"
                  title="Thoughtless Consumption Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="site-footer">
        <p>Copyright © 2026 Donggun Lee. All Rights Reserved. The website was designed by Donggun Lee and built with React.js.</p>
        <p>Acknowledgements: The design of this website was inspired by multiple other wonderful personal websites (incl. <a href="https://inhwasong.com/" target="_blank" rel="noopener noreferrer">[1]</a>, <a href="https://taewankim.io/" target="_blank" rel="noopener noreferrer">[2]</a>, <a href="https://jaeyoungchoi1.github.io/" target="_blank" rel="noopener noreferrer">[3]</a>)</p>
      </footer>
    </>
  );
}

export default App;
