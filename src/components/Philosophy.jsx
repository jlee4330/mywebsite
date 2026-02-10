import { useEffect, useRef } from 'react';
import './Philosophy.css';

const philosophies = [
    {
        id: 1,
        title: 'Data as Pulse',
        description: 'Data has become the lens to understand people, and the blood that runs through modern products. We leverage data to find insights and build prototypes.',
    },
    {
        id: 2,
        title: 'AI as Material',
        description: 'Inspired by Louis Kahn, we approach AI as design material — something to actively dissect, examine, shape, and engage with, not just a convenient tool.',
    },
    {
        id: 3,
        title: 'Beyond Form-Giving',
        description: 'We design with time, uncertainty, and intelligence — crafting processes, rules, and interactions that guide how systems behave, learn, and grow.',
    },
    {
        id: 4,
        title: 'Post-Human Design',
        description: 'We resituate design within a world of interconnected, evolving, and more-than-human actors, moving beyond user-centric to relational world-building.',
    },
];

export default function Philosophy() {
    const cardsRef = useRef([]);

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

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="philosophy" className="philosophy">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Research Philosophy</span>
                    <h2 className="section-title">How I Approach Research</h2>
                </div>

                <div className="philosophy-list">
                    {philosophies.map((item, index) => (
                        <article
                            key={item.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="philosophy-item"
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <span className="item-number">{String(item.id).padStart(2, '0')}</span>
                            <div className="item-content">
                                <h3 className="item-title">{item.title}</h3>
                                <p className="item-description">{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
