import "./About.css";
import profileFallback from "../../assets/subham.png";
import { api } from "../../services/api";
import { useFetch } from "../../services/hooks";
import StateMessage from "../../services/StateMessage";

const FALLBACK_IMAGE = profileFallback;

const DEFAULTS = {
  section_tag: "About Me",
  heading: "Turning ideas into intuitive digital experiences.",
  bio_paragraph_1:
    "I'm Subham Khadgi, a BCS (Hons) graduate, Frontend Developer, and UI/UX Designer passionate about creating modern digital products that prioritize usability, performance, and visual excellence.",
  bio_paragraph_2:
    "My expertise lies in frontend development with React and UI/UX design, allowing me to bridge the gap between design and implementation. I enjoy transforming ideas into intuitive user experiences, crafting responsive and interactive web applications, and collaborating on backend integration to deliver complete digital solutions.",
  bio_paragraph_3:
    "My experience includes designing healthcare and educational platforms, developing responsive web applications, and contributing to AI-powered solutions. With a strong focus on usability, accessibility, and performance, I enjoy transforming complex ideas into intuitive and meaningful digital experiences.",
  profile_image: null,
  stat_1_value: "5+",
  stat_1_label: "Projects Completed",
  stat_2_value: "React",
  stat_2_label: "Frontend Development",
  stat_3_value: "Figma",
  stat_3_label: "UI/UX Design",
};

function About() {
  const { data, loading, error } = useFetch(api.fetchAbout, []);

  if (loading) {
    return (
      <section className="about" id="about">
        <div className="about-container">
          <StateMessage kind="loading" text="Loading about..." />
        </div>
      </section>
    );
  }

  const about = (!error && data && Object.keys(data).length > 0) ? data : DEFAULTS;
  const profileSrc = about.profile_image || FALLBACK_IMAGE;

  const stats = [
    { value: about.stat_1_value, label: about.stat_1_label },
    { value: about.stat_2_value, label: about.stat_2_label },
    { value: about.stat_3_value, label: about.stat_3_label },
  ].filter((s) => s.value && s.label);

  return (
    <section className="about" id="about">
      <div className="about-container">

        <div className="about-image">
          <img src={profileSrc} alt="Subham Khadgi" />
        </div>

        <div className="about-content">

          <span className="section-tag">
            {about.section_tag}
          </span>

          <h2>
            {about.heading}
          </h2>

          {about.bio_paragraph_1 && <p>{about.bio_paragraph_1}</p>}
          {about.bio_paragraph_2 && <p>{about.bio_paragraph_2}</p>}
          {about.bio_paragraph_3 && <p>{about.bio_paragraph_3}</p>}

          {stats.length > 0 && (
            <div className="about-stats">
              {stats.map((s, i) => (
                <div className="stat" key={i}>
                  <h3>{s.value}</h3>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default About;
