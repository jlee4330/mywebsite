import { useEffect, useRef } from 'react';
import './Research.css';

const publications = [
    {
        id: 'P1',
        tag: 'P.1',
        title: 'One Is Not Enough: How People Use Multiple AI Models in Everyday Life',
        authors: 'Seunghwa Pyo*, Donggun Lee*, Jungwoo Rhee*, Soobin Park, Youn-kyung Lim',
        venue: 'CHI 2026 Posters',
        venueDetail: 'to appear',
        type: 'Poster',
        year: 2026,
        links: {},
    },
    {
        id: 'C2',
        tag: 'C.2',
        title: 'Evaluating Visual Prompts with Eye-Tracking Data for MLLM-Based Human Activity Recognition',
        authors: 'Jae Young Choi, Seon Gyeom Kim, Hyungjun Yoon, Taeckyung Lee, Donggun Lee, Jaeryung Chung, Jihyung Kil, Ryan Rossi, Sung-Ju Lee, Tak Yeon Lee',
        venue: 'IEEE PacificVis 2026',
        venueDetail: 'to appear',
        type: 'Conference',
        year: 2026,
        links: { paper: '/Evaluating Visual Prompts with Eye-Tracking Data for MLLM–Based Human Activity Recognition.pdf' },
    },
    {
        id: 'J4',
        tag: 'J.4',
        title: 'Creating Text-Based AI Clones of Myself: Exploring Perceptions, Development Strategies, and Challenges',
        authors: 'Donggun Lee*, Suyoun Lee*, Hyunseung Lim, Hwajung Hong',
        venue: 'International Journal of Human - Computer Studies',
        venueDetail: 'Special Issue "AI-Generated Personas: Representing User Needs with Generative AI Models"',
        type: 'Journal',
        year: 2025,
        links: {},
    },
    {
        id: 'J3',
        tag: 'J.3',
        title: 'Understanding the Impact of Spatial Immersion in Web Data Stories',
        authors: 'SeonGyeom Kim, Juhyeong Park, Yutaek Song, Donggun Lee, Yubin Lee, Ryan Rossi, Jane Hoffswell, Eunyee Koh, Tak Yeon Lee',
        venue: 'International Journal of Human - Computer Studies, 2025',
        venueDetail: 'Under Revision',
        type: 'Journal',
        year: 2025,
        links: {},
    },
    {
        id: 'J2',
        tag: 'J.2',
        title: 'The Impact of a Meditation Camp on Emotional Regulation and Abstinence Intentions in Individuals with Gambling Addiction',
        authors: 'Sanghee Cho, Sangseong Kim, Donggun Lee, Junggi Hong, Eunmi Kim',
        venue: 'Korean Journal of Meditation 2025, Vol. 15, No. 1, pp.105-117',
        venueDetail: '',
        type: 'Journal',
        year: 2025,
        links: { paper: '#' },
    },

    {
        id: 'C1',
        tag: 'C.1',
        title: 'Pokemon Color Adjustments for Augmented Reality Contents',
        authors: 'Donggun Lee, Taesu Kim, Hyeon-Jeong Suk',
        venue: "Electronic Imaging (IS&T International Symposium on Electronic Imaging 2022)",
        venueDetail: '',
        type: 'Conference',
        year: 2022,
        links: { paper: '#' },
    },
];

const projects = [
    {
        id: 1,
        title: 'AI-Powered Design Tools',
        description: 'Developing creative tools that treat AI as design material, enabling novel design processes.',
        tags: ['LLM', 'Generative AI', 'Design Tools'],
    },
    {
        id: 2,
        title: 'Adaptive Interface Systems',
        description: 'Research on interfaces that learn and evolve with user behavior over time.',
        tags: ['Adaptive UI', 'ML', 'Personalization'],
    },
];

export default function Research() {
    const itemsRef = useRef([]);

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

        itemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    let refIndex = 0;

    return (
        <section id="research" className="research">
            <div className="container">
                {/* Publications */}
                <div className="section-header">
                    <span className="section-tag">Publications</span>
                    <h2 className="section-title">Selected Publications</h2>
                </div>

                <div className="publications-list">
                    {publications.map((pub, index) => (
                        <article
                            key={pub.id}
                            ref={(el) => (itemsRef.current[refIndex++] = el)}
                            className="publication-item"
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <div className="pub-meta">
                                <span className="pub-tag-label">[{pub.tag}]</span>
                                <span className="pub-type">{pub.type}</span>
                            </div>
                            <h3 className="pub-title">{pub.title}</h3>
                            <p className="pub-authors">{pub.authors}</p>
                            <p className="pub-venue-detail">
                                {pub.venue}
                                {pub.venueDetail && <span className="pub-venue-extra"> — {pub.venueDetail}</span>}
                            </p>
                            {Object.keys(pub.links).length > 0 && (
                                <div className="pub-links">
                                    {pub.links.paper && <a href={pub.links.paper} className="pub-link">PDF</a>}
                                    {pub.links.video && <a href={pub.links.video} className="pub-link">Video</a>}
                                </div>
                            )}
                        </article>
                    ))}
                </div>

                {/* Projects */}
                <div className="section-header projects-header">
                    <span className="section-tag">Ongoing Research</span>
                    <h2 className="section-title">Research Projects</h2>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            ref={(el) => (itemsRef.current[refIndex++] = el)}
                            className="project-card glass-card"
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
