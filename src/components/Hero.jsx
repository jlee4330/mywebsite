import TokenizedText from './TokenizedText';
import './Hero.css';

export default function Hero() {
    return (
        <section id="hero" className="hero">
            <div className="hero-container">
                {/* About Me Section */}
                <div className="about-section">
                    <h2 className="section-heading">About Me</h2>

                    <div className="about-layout">
                        {/* Left: Profile + Social */}
                        <div className="profile-column">
                            <img
                                src="/donggun.png"
                                alt="Donggun Lee"
                                className="profile-image"
                            />
                            <div className="profile-info">
                                <h3 className="profile-name">Donggun Lee</h3>
                                <p className="profile-title">Master Student</p>
                                <p className="profile-affiliation">KAIST, South Korea</p>
                            </div>
                            <div className="social-links">
                                <a href="https://scholar.google.com" className="social-link">
                                    <span className="social-icon">📚</span> Google Scholar
                                </a>
                                <a href="mailto:donggun@kaist.ac.kr" className="social-link">
                                    <span className="social-icon">✉️</span> Email
                                </a>
                                <a href="https://github.com" className="social-link">
                                    <span className="social-icon">💻</span> GitHub
                                </a>
                                <a href="https://linkedin.com" className="social-link">
                                    <span className="social-icon">🔗</span> LinkedIn
                                </a>
                            </div>
                        </div>

                        {/* Right: Introduction */}
                        <div className="intro-column">
                            <p className="intro-text">
                                I'm a Master student of <strong>Industrial Design</strong> at{' '}
                                <a href="https://kaist.ac.kr" className="text-link">KAIST</a>.
                                I'm currently advised by Prof. <a href="#" className="text-link">Tak Yeon Lee</a> and
                                conduct research in <a href="https://ai-experience-lab.github.io" className="text-link">AI Experience Lab</a>.
                            </p>
                            <p className="intro-text">
                                I explore the intersection of <strong>human-AI interaction</strong> and{' '}
                                <strong>design</strong>, treating{' '}
                                <TokenizedText
                                    text="AI as design material"
                                    showMetadata={false}
                                    animateOnHover={true}
                                />{' '}
                                to create meaningful user experiences.
                            </p>
                        </div>
                    </div>
                </div>

                {/* News Section */}
                <div className="news-section" id="news">
                    <h2 className="section-heading">News</h2>
                    <ul className="news-list">
                        <li className="news-item">
                            <span className="news-date">2025.01</span> Paper accepted at <strong>CHI 2025</strong>! 🎉
                        </li>
                        <li className="news-item">
                            <span className="news-date">2024.11</span> Attended <strong>IEEE VIS 2024</strong> conference.
                        </li>
                        <li className="news-item">
                            <span className="news-date">2024.11</span> One paper accepted to the <strong>IJHCS Special Issue</strong>.
                        </li>
                        <li className="news-item">
                            <span className="news-date">2024.09</span> Started Master's at KAIST, <a href="https://ai-experience-lab.github.io" className="news-link">AI Experience Lab</a>
                        </li>
                        <li className="news-item">
                            <span className="news-date">2024.05</span> Attended <strong>CHI 2024</strong>.
                        </li>
                    </ul>
                </div>

                {/* Education Section */}
                <div className="education-section" id="education">
                    <h2 className="section-heading">Education</h2>
                    <div className="education-list">
                        <div className="education-item">
                            <div className="edu-degree">
                                <strong>M.S. student, KAIST</strong>, Industrial Design
                            </div>
                            <div className="edu-period">Sep 2024 - Present</div>
                        </div>
                        <div className="education-item">
                            <div className="edu-degree">
                                <strong>B.S., KAIST</strong>, Industrial Design
                            </div>
                            <div className="edu-period">Mar 2020 - Aug 2024</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
