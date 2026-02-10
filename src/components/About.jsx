import { useEffect, useRef } from 'react';
import './About.css';
import profileImg from '../assets/profile.png';

export default function About() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="about" ref={sectionRef}>
            <div className="container about-content">
                <div className="about-layout">
                    <div className="about-photo">
                        <img src={profileImg} alt="이동건" className="profile-image" />
                    </div>

                    <div className="about-info">
                        <div className="section-header">
                            <span className="section-tag">About</span>
                            <h2 className="section-title">이동건 <span className="name-en">Donggun Lee</span></h2>
                        </div>

                        <p className="about-title">
                            Ph.D. Student · HCI Researcher
                        </p>

                        <p className="about-affiliation">
                            <a href="https://id.kaist.ac.kr" target="_blank" rel="noopener noreferrer">
                                KAIST Industrial Design
                            </a>
                            {' · '}
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                AI Experience Lab
                            </a>
                        </p>

                        <p className="about-bio">
                            디자인, 데이터, 인공지능의 교차점에서 현실 문제에 대한
                            혁신적인 해결책을 연구합니다. AI를 단순한 도구가 아닌
                            디자인 재료로 다루며, 인간 중심을 넘어선 포스트휴먼 디자인을
                            탐구합니다.
                        </p>

                        <div className="about-links">
                            <a href="mailto:donggun@kaist.ac.kr" className="link-item">
                                <span className="link-icon">✉️</span>
                                <span>Email</span>
                            </a>
                            <a href="#" className="link-item">
                                <span className="link-icon">📄</span>
                                <span>CV</span>
                            </a>
                            <a href="#" className="link-item">
                                <span className="link-icon">📚</span>
                                <span>Google Scholar</span>
                            </a>
                            <a href="#" className="link-item">
                                <span className="link-icon">🐙</span>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
