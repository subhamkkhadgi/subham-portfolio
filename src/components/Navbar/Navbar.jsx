import "./Navbar.css";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useFetch } from "../../services/hooks";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // Pull the brand text from the API, fall back to the original hardcoded value.
  const { data: settings } = useFetch(api.fetchSettings, []);
  const logoText = settings?.logo_text || "Subham Khadgi";
  const siteTitle = settings?.site_title;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");

      let current = "home";

      sections.forEach((section) => {
        const top = section.offsetTop - 150;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <h1 className="logo">{logoText}</h1>

        <nav className="nav-links">
          <a className={active === "home" ? "active" : ""} href="#home">Home</a>
          <a className={active === "about" ? "active" : ""} href="#about">About</a>
          <a className={active === "education" ? "active" : ""} href="#education">Education</a>
          <a className={active === "skills" ? "active" : ""} href="#skills">Skills</a>
          <a className={active === "projects" ? "active" : ""} href="#projects">Projects</a>
          <a className={active === "contact" ? "active" : ""} href="#contact">Contact</a>
        </nav>
      </div>

      {/* Update the document title if the API provides one */}
      {siteTitle && typeof document !== "undefined" && (document.title !== siteTitle) && (document.title = siteTitle)}
    </header>
  );
}

export default Navbar;
