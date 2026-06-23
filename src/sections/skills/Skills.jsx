import "./Skills.css";
import { api } from "../../services/api";
import { useFetch } from "../../services/hooks";
import StateMessage from "../../services/StateMessage";

const FALLBACK = [
  {
    title: "Frontend Development",
    skills: ["React", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive Web Design"],
  },
  {
    title: "UI/UX Design",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research", "Design Systems"],
  },
  {
    title: "Backend Integration",
    skills: ["Node.js", "Express.js", "MySQL", "REST APIs"],
  },
  {
    title: "Development Tools",
    skills: ["Git", "GitHub", "VS Code", "Vite", "Agile Collaboration"],
  },
];

function Skills() {
  const { data, loading, error } = useFetch(api.fetchSkills, []);

  if (loading) {
    return (
      <section className="skills" id="skills">
        <div className="skills-container">
          <StateMessage kind="loading" text="Loading skills..." />
        </div>
      </section>
    );
  }

  const groups =
    !error && Array.isArray(data) && data.length > 0 ? data : FALLBACK;

  return (
    <section className="skills" id="skills">
      <div className="skills-container">

        <div className="skills-header">
          <span className="section-tag">
            Skills
          </span>

          <h2>
            Technologies & Tools
          </h2>

          <p>
           A focused set of skills in React development, UI/UX design, and backend integration used to build scalable and user-centered digital products.
          </p>
        </div>

        {groups.length === 0 ? (
          <StateMessage kind="empty" text="No skill groups have been added yet." />
        ) : (
          <div className="skills-grid">
            {groups.map((group, index) => (
              <div className="skill-card" key={group.id ?? index}>

                <h3 className="skill-title">{group.title}</h3>

                <div className="skill-tags">
                  {(group.skills || []).map((skill, i) => (
                    <span className="skill-badge" key={i}>
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Skills;
