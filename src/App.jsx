import { useState, useEffect } from 'react';
import './index.css';

const slideshowImages = [
  { src: '/slideshow/sing.png', position: 'center 53%' },
  { src: '/slideshow/3vis.JPG', position: 'center 60%' },
  { src: '/slideshow/2vis.jpg', position: 'center 30%' },
  { src: '/slideshow/tennis.jpg', position: 'center 80%' },
  { src: '/slideshow/4ael_christmas_party.JPG', position: 'center 10%' },
  { src: '/slideshow/IMG_4166.jpg', position: 'center 30%' },
  { src: '/slideshow/6.png', position: 'center 55%' },
  { src: '/slideshow/7.jpg', position: 'center -23%' }
];

const newsItems = [
  {
    date: '2026.04',
    text: (
      <>
        Heading to <strong>CHI 2026</strong> in Barcelona to present our poster 🇪🇸<br />
        Also excited that our lab is hosting KAIST NIGHT this year — see you there!
        <div style={{ marginTop: '8px' }}>
          <img
            src="/kaistnightinvitation.png"
            alt="KAIST NIGHT Poster"
            style={{ width: '200%', maxWidth: '310px', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'block' }}
          />
        </div>
      </>
    )
  },
  { date: '2026.02', text: <>First-authored poster, "One Is Not Enough: How People Use Multiple AI Models in Everyday Life," is conditionally accepted to <strong>ACM CHI EA 2026</strong> 🎉 Huge thanks to <a href="https://www.linkedin.com/in/seunghwa-pyo/" target="_blank" rel="noopener noreferrer">Seunghwa</a> and <a href="https://jungwoorhee.com/" target="_blank" rel="noopener noreferrer">Jungwoo</a>!</> },
  { date: '2026.02', text: <>Our paper, "Evaluating Visual Prompts with Eye-Tracking Data for MLLM-Based Human Activity Recognition," is accepted to <strong>IEEE PacificVis 2026</strong> 📄✨ Big congratulations to <a href="https://jaeyoungchoi1.github.io/" target="_blank" rel="noopener noreferrer">JaeYoung</a>!</> },
  { date: '2026.01', text: <>Attend <strong>HCI Korea 2026</strong> 🇰🇷</> },
  { date: '2026.01', text: <>Submit two full papers to <strong>DIS 2026</strong> 🤞</> },
  { date: '2025.11', text: <>Attend the <strong>IEEE VIS 2025</strong> conference in Vienna 🎨📊</> },
  { date: '2025.11', text: <>First-authored paper, "Creating Text-Based AI Clones of Myself," is accepted to <strong>IJHCS</strong> 📘</> },
  { date: '2025.05', text: <>Attend <strong>CHI 2025</strong> in Yokohama 🌍✨</> },
];

const publications = [
  {
    tag: 'P.1',
    title: 'One Is Not Enough: How People Use Multiple AI Models in Everyday Life',
    authors: ['Seunghwa Pyo*', 'Donggun Lee*', 'Jungwoo Rhee*', 'Soobin Park', 'Youn-kyung Lim'],
    venue: 'ACM CHI EA 2026',
    teaser: '/chiposter26.png',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1145/3772363.3798682' }, { label: 'PDF', url: '/3772363.3798682.pdf' }, { label: 'Poster', url: '/Poster.pdf' }],
  },
  {
    tag: 'C.2',
    title: 'Evaluating Visual Prompts with Eye-Tracking Data for MLLM-Based Human Activity Recognition',
    authors: ['Jae Young Choi', 'Seon Gyeom Kim', 'Hyungjun Yoon', 'Taeckyung Lee', 'Donggun Lee', 'Jaeryung Chung', 'Jihyung Kil', 'Ryan Rossi', 'Sung-Ju Lee', 'Tak Yeon Lee'],
    venue: 'IEEE PacificVis 2026',
    teaser: '/pacificvis26.png',
    links: [{ label: 'DOI', url: 'https://doi.org/10.48550/arXiv.2604.09585' }, { label: 'PDF', url: '/Evaluating Visual Prompts with Eye-Tracking Data for MLLM–Based Human Activity Recognition.pdf' }],
  },
  {
    tag: 'J.4',
    title: 'Creating Text-Based AI Clones of Myself: Exploring Perceptions, Development Strategies, and Challenges',
    authors: ['Donggun Lee*', 'Suyoun Lee*', 'Hyunseung Lim', 'Hwajung Hong'],
    venue: 'International Journal of Human–Computer Studies (IJHCS), 103692. Special Issue: "AI-Generated Personas: Representing User Needs with Generative AI Models."',
    teaser: '/ijhcs4_web.jpg',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1016/j.ijhcs.2025.103692' }, { label: 'PDF', url: '/clone.pdf' }],
  },
  {
    tag: 'J.3',
    title: 'Understanding the Impact of Spatial Immersion in Web Data Stories',
    authors: ['SeonGyeom Kim', 'Juhyeong Park', 'Yutaek Song', 'Donggun Lee', 'Yubin Lee', 'Ryan Rossi', 'Jane Hoffswell', 'Eunyee Koh', 'Tak Yeon Lee'],
    venue: 'Preprint (Under Revision)',
    teaser: '/Immersive.jpg',
    links: [{ label: 'DOI', url: 'https://doi.org/10.48550/arXiv.2411.18049' }, { label: 'PDF', url: '/ids.pdf' }],
  },
  {
    tag: 'J.2',
    title: 'The Impact of a Meditation Camp on Emotional Regulation and Abstinence Intentions in Individuals with Gambling Addiction',
    authors: ['Sanghee Cho', 'Sangseong Kim', 'Donggun Lee', 'Junggi Hong', 'Eunmi Kim'],
    venue: 'Korean Journal of Meditation 2025, Vol. 15, No. 1, pp.105-117',
    teaser: '/meditation.jpg',
    links: [{ label: 'DOI', url: 'https://doi.org/10.23250/kjm.15.1.202502.006' }, { label: 'PDF', url: '/med.pdf' }],
  },
  {
    tag: 'C.1',
    title: 'Pokemon Color Adjustments for Augmented Reality Contents',
    authors: ['Donggun Lee', 'Taesu Kim', 'Hyeon-Jeong Suk'],
    venue: "Electronic Imaging (IS&T International Symposium on Electronic Imaging 2022)",
    teaser: '/EI2022.png',
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
  const [activeTab, setActiveTab] = useState('about');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (activeTab === 'about') {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  return (
    <div className="container">
      {/* Header */}
      <header className="top-header">
        <div className="header-brand-section">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="#about" className="brand-logo" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}>
              <strong>Donggun</strong> Lee
              <span className="logo-dot">
                .
                <div className="logo-venn-bg">
                  <div className="venn-circle-bg left-circle"></div>
                  <div className="venn-circle-bg right-circle"></div>
                  <span className="venn-label label-left">Design (+HCI)</span>
                  <span className="venn-label label-right">AI</span>
                </div>
              </span>
            </a>
          </div>
        </div>

        <div className="header-actions-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          <div className="social-icons">
            <a href="https://scholar.google.com/citations?user=JoR4t6YAAAAJ&hl=ko" target="_blank" rel="noopener noreferrer" title="Google Scholar" aria-label="Google Scholar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/donggunlee0/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://github.com/jlee4330" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://www.youtube.com/@donggunlee0" target="_blank" rel="noopener noreferrer" title="YouTube" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
          </div>
          <button 
            className="dark-mode-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '11px',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
              fontFamily: 'inherit',
              letterSpacing: '0.02em'
            }}
          >
            {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="top-nav">
        <a href="#about" className={activeTab === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}>ABOUT ME</a>
        <a href="#publications" className={activeTab === 'publications' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('publications'); }}>PUBLICATIONS</a>
        <a href="#projects" className={activeTab === 'projects' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('projects'); }}>PAST PROJECTS</a>
        <a href="/Donggun Lee_CV.pdf" target="_blank" rel="noopener noreferrer">
          CURRICULUM VITAE <span className="nav-date">(March, 2026)</span>
        </a>
      </nav>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Column */}
        <div className="left-column">
          {activeTab === 'about' && (
            <>
              <div className="hero-image-container">
                {slideshowImages.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={`Hero ${index}`}
                    className="hero-image"
                    style={{
                      opacity: index === currentImageIndex ? 1 : 0,
                      zIndex: index === currentImageIndex ? 1 : 0,
                      objectPosition: image.position,
                      transform: image.scale ? `scale(${image.scale})` : undefined,
                      objectFit: image.fit || 'cover'
                    }}
                  />
                ))}
              </div>
              <div className="hero-caption">
                To everyone growing and walking this path with me—thank you, 2026.
              </div>

              <div className="bio-section">
                <div className="bio-image-container">
                  <div className="profile-pic-wrapper">
                    <img src="/slideshow/donggun.png" alt="Donggun Lee" className="profile-pic" />
                  </div>
                  
                  <div className="profile-quotes-container">
                    <div className="quotes-title">Inspired By</div>
                    
                    <div className="profile-quote">
                      <blockquote>
                        “AI is going to be the defining technology of our times.”
                      </blockquote>
                      <cite>— Satya Nadella</cite>
                    </div>
                    
                    <div className="profile-quote">
                      <blockquote>
                        “I was taught to confront things you can’t avoid. Death is one of those things.”
                      </blockquote>
                      <cite>— Damien Hirst</cite>
                    </div>
                  </div>
                </div>
                <div className="bio-content">
                  <div className="bio-text">
                    <p>
                      I am a first-year Master’s student in <a href="https://id.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Industrial Design at KAIST</a>, advised by Prof. <a href="https://takyeonlee.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Tak Yeon Lee</a> in the <a href="https://ai-experience-lab.github.io/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>AI Experience Lab</a> and affiliated with the <a href="https://hci.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>HCI@KAIST</a> and <a href="https://ai4good.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>AI4GOOD@KAIST</a> communities. Earlier in my academic journey, I was fortunate to be mentored by Prof. <a href="https://galaxytourist.notion.site/Hwajung-Hong-cc10b0291bbe4ca38dbf4882cd687423" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Hwajung Hong</a>, whose guidance has been deeply influential in shaping my perspective as a researcher.
                    </p>
                    <p>
                      My research lies at the intersection of human–AI interaction and design. I view AI not simply as a tool, but as a design material to be examined, shaped, and negotiated through practice. Recently, my interests have shifted toward multi-agent systems, with a focus on how people can monitor, guide, and provide feedback to AI agents in collaborative workflows.
                    </p>
                    <p>
                      Outside of research, I enjoy tennis 🎾, football ⚽, singing 🎤, and DJing 🎧. I also love experimenting with new ideas, tools, and creative practices.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'publications' && (
            <section id="publications" className="content-section">
              <h2 className="section-title">Publications</h2>
              {publications.map((pub, i) => (
                <div key={i} className="pub-entry">
                  {pub.teaser && (
                    <div className="pub-entry-teaser">
                      <img
                        src={pub.teaser}
                        alt={`${pub.title} teaser`}
                        style={pub.teaser === '/ijhcs4_web.jpg' ? { transform: 'scale(1.1) translateX(3%) translateY(1%)' } : {}}
                      />
                    </div>
                  )}
                  <div className="pub-entry-body">
                    <span className="pub-entry-title">{pub.title}</span>
                    <span className="pub-entry-authors">{renderAuthors(pub.authors)}</span>
                    <span className="pub-entry-venue">{pub.venue}</span>
                    {pub.links.length > 0 && (
                      <span className="pub-entry-links">
                        {pub.links.map((link, j) => (
                          <a key={j} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {activeTab === 'projects' && (
            <section id="projects" className="content-section">
              <h2 className="section-title">Past Projects</h2>
              {/* Retro DJ Player */}
              <div className="project-entry">
                <h3 className="project-title">Retro DJ Player: <span className="project-subtitle">A Web-Based DJ Mixing Experience</span></h3>
                <p className="project-authors"><span className="me-highlight">Donggun Lee</span></p>
                <p className="project-desc">
                  A web-based DJ player that lets users mix music at home without physical DJ equipment, combining dual-deck controls, audio effects, and a retro inspired interface.
                </p>
                <span className="pub-entry-links" style={{ marginBottom: '12px', display: 'flex' }}>
                  <a href="https://retro-dj.vercel.app/" target="_blank" rel="noopener noreferrer">Website</a>
                </span>
                <div className="project-video">
                  <a href="https://retro-dj.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <img src="/retrodjplayer.png" alt="Retro DJ Player" />
                  </a>
                </div>
              </div>

              {/* Yakgook */}
              <div className="project-entry">
                <h3 className="project-title">Yakgook: <span className="project-subtitle">A Metaverse Community for Shared Medication Care</span></h3>
                <p className="project-authors">
                  Seowon Shin*, Yeongeun An*, <span className="me-highlight">Donggun Lee*</span>, Suhyeon Park*, Yejun Chung*, Hansam Lee*, Jooyoung Lee*
                </p>
                <p className="project-desc">
                  A working Unity + React metaverse platform that supports medication adherence through loose solidarity among chronic patients. (Social Impact Award, Kakao!mpact × KAIST)
                </p>
                <span className="pub-entry-links" style={{ marginBottom: '12px', display: 'flex' }}>
                  <a href="https://github.com/jlee4330/medMax" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://youtu.be/RTVi_pHaPeI" target="_blank" rel="noopener noreferrer">Video</a>
                </span>
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
                <h3 className="project-title">Hey Mirror: <span className="project-subtitle">Designing an Emotional Interaction Mirror Based on Large Language Models</span></h3>
                <p className="project-authors"><span className="me-highlight">Donggun Lee</span></p>
                <p className="project-desc">
                  A working LLM-powered smart mirror for real-time conversational emotional support, inspired by Snow White's magic mirror. (Exhibited in SHINSEGAE NEXPERIUM)
                </p>
                <div className="project-video">
                  <img src="/heymirror.jpeg" alt="Hey Mirror" />
                </div>
              </div>

              {/* SEAhab */}
              <div className="project-entry">
                <h3 className="project-title">SEAhab: <span className="project-subtitle">Welcoming Virtual Rehab Community for Drug Users</span></h3>
                <p className="project-authors">Jaeryung Chung*, <span className="me-highlight">Donggun Lee*</span>, Sohwi Son*, Maida Aizaz*, Yujin Kwon*, Tak Yeon Lee</p>
                <p className="project-desc">
                  Designing rehabilitation systems that support accessibility and personalization through community participation and real-time intervention.
                </p>
                <span className="pub-entry-links" style={{ marginBottom: '12px', display: 'flex' }}>
                  <a href="https://youtu.be/rwfZhoy7vXc" target="_blank" rel="noopener noreferrer">Video</a>
                  <a href="/SEAhab.pdf" target="_blank" rel="noopener noreferrer">PDF</a>
                </span>
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
                <p className="project-authors"><span className="me-highlight">Donggun Lee*</span>, Yujin Kwon*, Wooryung Jeong*</p>
                <p className="project-desc">
                  An interactive installation that reveals how sensory stimulation, social pressure, and system design shape unconscious consumer behavior.
                </p>
                <span className="pub-entry-links" style={{ marginBottom: '12px', display: 'flex' }}>
                  <a href="https://youtu.be/DSIze1NkLrc" target="_blank" rel="noopener noreferrer">Video</a>
                </span>
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
          )}
        </div>

        {/* Right Column */}
        <div className="right-column">
          {activeTab === 'about' && (
            <div className="sidebar-section">
              <h3 className="sidebar-heading">• LATEST UPDATES</h3>
              <div className="updates-list">
                {newsItems.map((item, index) => (
                  <div className="update-item" key={index}>
                    <div className="update-date">{item.date}</div>
                    <div>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="site-footer">
        <p>Copyright © 2026 Donggun Lee. All Rights Reserved.</p>
        <p>
          Acknowledgements: The design of this website was inspired by multiple other wonderful personal websites (incl. <a href="https://www.joonsungpark.com/" target="_blank" rel="noopener noreferrer">[1]</a>, <a href="https://inhwasong.com/" target="_blank" rel="noopener noreferrer">[2]</a>).
        </p>
      </footer>
    </div>
  );
}

export default App;
