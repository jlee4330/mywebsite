import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            const sections = ['hero', 'about', 'research', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'hero', label: 'About' },
        { id: 'research', label: 'Research' },
        { id: 'contact', label: 'Contact' },
        { id: 'cv', label: 'CV', isLink: true },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    return (
        <nav className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-logo" onClick={() => scrollToSection('hero')}>
                <span className="logo-text">DG</span>
            </div>

            <button
                className="nav-hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
            </button>

            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                {navItems.map((item) => (
                    <li key={item.id}>
                        {item.isLink ? (
                            <a
                                className="nav-link"
                                href="/Donggun Lee_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <button
                                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        )}
                    </li>
                ))}
            </li>
                ))}
        </ul>
        </nav >
    );
}
