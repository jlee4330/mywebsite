import './ResearchScope.css';

export default function ResearchScope() {
    return (
        <section className="research-scope">
            {/* Venn Diagram */}
            <div className="venn-container">
                {/* Three circles with labels */}
                <div className="venn-circle venn-circle--design">
                    <div className="venn-circle-content">
                        <span className="venn-label">Design</span>
                        <span className="venn-rationale">Shaping experiences through form, process, and meaning</span>
                    </div>
                </div>
                <div className="venn-circle venn-circle--hci">
                    <div className="venn-circle-content">
                        <span className="venn-label">HCI</span>
                        <span className="venn-rationale">Understanding how people interact with technology</span>
                    </div>
                </div>
                <div className="venn-circle venn-circle--ai">
                    <div className="venn-circle-content">
                        <span className="venn-label">AI</span>
                        <span className="venn-rationale">Building intelligent systems that learn and adapt</span>
                    </div>
                </div>

                {/* Center intersection highlight */}
                <div className="venn-intersection">
                    <span className="venn-intersection-label">my research</span>
                </div>
            </div>
        </section>
    );
}
