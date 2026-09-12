import { SITE_CONFIG } from '../../config/site.js';

export default function AboutSection() {
  const { hero, profile, contact } = SITE_CONFIG;

  return (
    <>
      <figure className="hero-static-figure">
        <div className="hero-image-container hero-image-container--static">
          <img src={hero.image} alt={hero.imageAlt} className="hero-image hero-static-image" />
        </div>
        <figcaption className="hero-static-caption">{hero.caption}</figcaption>
      </figure>

      <div className="bio-section">
        <div className="bio-image-container">
          <div className="profile-pic-wrapper">
            <img src={profile.image} alt={profile.imageAlt} className="profile-pic" />
          </div>

          <div className="profile-contact">
            <div className="profile-contact-title">Contact</div>
            <address className="profile-contact-email">
              <span>{contact.localPart} [at]</span>
              <span>{contact.domainParts.join(' [dot] ')}</span>
            </address>
          </div>
        </div>

        <div className="bio-content">
          <div className="bio-text">
            <p>
              I am a first-year Master’s student in <a href="https://id.kaist.ac.kr/" target="_blank" rel="noopener noreferrer">Industrial Design at KAIST</a>, advised by Prof. <a href="https://takyeonlee.com/" target="_blank" rel="noopener noreferrer">Tak Yeon Lee</a> in the <a href="https://ai-experience-lab.github.io/" target="_blank" rel="noopener noreferrer">AI Experience Lab</a> and affiliated with the <a href="https://hci.kaist.ac.kr/" target="_blank" rel="noopener noreferrer">HCI@KAIST</a> and <a href="https://ai4good.kaist.ac.kr/" target="_blank" rel="noopener noreferrer">AI4GOOD@KAIST</a> communities. Earlier in my academic journey, I was fortunate to be mentored by Prof. <a href="https://galaxytourist.notion.site/Hwajung-Hong-cc10b0291bbe4ca38dbf4882cd687423" target="_blank" rel="noopener noreferrer">Hwajung Hong</a>, whose guidance has been deeply influential in shaping my perspective as a researcher.
            </p>
            <p>
              My research lies at the intersection of human–AI interaction and design. Recently, my interests have shifted toward multi-agent systems, with a focus on how people can monitor, guide, and provide feedback to AI agents in collaborative workflows.
            </p>
            <p>
              Outside of research, I enjoy tennis, football, singing, and DJing. I also love experimenting with new ideas, tools, and creative practices.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
