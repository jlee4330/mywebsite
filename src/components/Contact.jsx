import './Contact.css';

export default function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Contact</span>
                    <h2 className="section-title">Get in Touch</h2>
                </div>

                <div className="contact-content">
                    <p className="contact-intro">
                        연구 협력, 질문, 또는 단순한 인사도 환영합니다.
                        아래 이메일로 연락해 주시거나 소셜 미디어에서 찾아주세요.
                    </p>

                    <div className="contact-info">
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            <a href="mailto:donggun@kaist.ac.kr" className="info-value">
                                donggun@kaist.ac.kr
                            </a>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Office</span>
                            <span className="info-value">
                                N25, KAIST, Daejeon, South Korea
                            </span>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <p>© 2024 Donggun Lee. Built with React.</p>
                </footer>
            </div>
        </section>
    );
}
