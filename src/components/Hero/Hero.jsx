import "./Hero.css";
import { motion } from "framer-motion";
import { api } from "../../services/api";
import { useFetch } from "../../services/hooks";
import StateMessage from "../../services/StateMessage";

// Sensible defaults so the page never looks blank if the backend is unreachable.
const DEFAULTS = {
  badge_text: "Designing & Developing User-Centered Products",
  title: "Designing\ninterfaces.\nBuilding\nexperiences.",
  subtitle:
    "Frontend Developer and UI/UX Designer focused on creating modern, accessible and performant web apps.",
  primary_button_text: "View Projects",
  primary_button_link: "#projects",
  secondary_button_text: "Contact Me",
  secondary_button_link: "#contact",
};

function Hero() {
  const { data, loading, error } = useFetch(api.fetchHero, []);

  if (loading) {
    return (
      <section className="hero" id="home">
        <div className="hero-container">
          <StateMessage kind="loading" text="Loading hero..." />
        </div>
      </section>
    );
  }

  // If the backend is down or returns an error, fall back to defaults so the
  // page still renders. If the section has no record in the database, the
  // controller returns null/empty and we use the defaults.
  const hero = (!error && data && Object.keys(data).length > 0) ? data : DEFAULTS;

  // Convert literal "\n" in the title into actual line breaks (JSX <br>).
  const titleLines = (hero.title || "").split("\n");

  return (
    <section className="hero" id="home">
      <div className="hero-container">

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="badge">
            {hero.badge_text}
          </span>

          <h1 className="title">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="subtitle">
            {hero.subtitle}
          </p>

            <div className="buttons">
               <a href={hero.primary_button_link || "#projects"} className="primary">
                {hero.primary_button_text}
              </a>

              <a href={hero.secondary_button_link || "#contact"} className="secondary">
                {hero.secondary_button_text}
              </a>
            </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
