import "./Projects.css";
import { api } from "../../services/api";
import { useFetch } from "../../services/hooks";
import StateMessage from "../../services/StateMessage";

// Hardcoded fallback matches the previous ProjectsData.js content so the
// site looks the same if the backend is empty/unreachable.
const FALLBACK = [
  {
    title: "Teaching Engagement Scale",
    role: "Internship Project",
    description:
      "Contributed to the development of an educational engagement platform focused on improving interaction and learning experiences for students and educators.",
    highlights: [
      "Designed user interfaces and user experiences in Figma",
      "Developed responsive frontend components",
      "Collaborated on backend implementation and integration",
      "Worked closely with the development team throughout the project",
    ],
    tech: ["React", "JavaScript", "Figma", "UI/UX Design", "Frontend Development", "MySQL"],
  },
  {
    title: "Disease Prediction System",
    role: "Team Project",
    description:
      "An AI-powered system that analyzes user symptoms to predict potential health conditions and provide early insights.",
    highlights: ["AI-based symptom analysis", "Personalized health recommendations"],
    tech: ["AI/ML", "Python", "Data Processing"],
  },
  {
    title: "Food Donation App",
    role: "UI/UX Design",
    description:
      "A mobile UI/UX design created in Figma to simplify and streamline food donation processes for charities and donors.",
    highlights: ["End-to-end mobile UI design", "Donation flow optimization"],
    tech: ["Figma", "UI/UX", "Mobile Design"],
    link: "Figma Project",
  },
  {
    title: "Patient–Doctor Platform",
    role: "UI/UX Design",
    description:
      "A clean and intuitive interface design for online doctor consultation and appointment booking system.",
    highlights: ["Appointment booking flow", "User-friendly healthcare UI"],
    tech: ["Figma", "UX Research", "Prototyping"],
  },
  {
    title: "Web Application Suite",
    role: "Web Development",
    description:
      "A set of responsive web tools including Weather App, QR Code Generator, and To-Do List built using core web technologies.",
    highlights: ["Multiple utility tools", "Fully responsive design"],
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

function Projects() {
  const { data, loading, error } = useFetch(api.fetchProjects, []);

  if (loading) {
    return (
      <section className="projects" id="projects">
        <div className="container">
          <StateMessage kind="loading" text="Loading projects..." />
        </div>
      </section>
    );
  }

  const projects =
    !error && Array.isArray(data) && data.length > 0 ? data : FALLBACK;

  return (
    <section className="projects" id="projects">
      <div className="container">

        <div className="header">
          <h2>Featured Projects</h2>

          <p>
            A showcase of projects spanning frontend development,
            UI/UX design, AI-powered solutions, and collaborative
            software development experiences.
          </p>
        </div>

        {projects.length === 0 ? (
          <StateMessage kind="empty" text="No projects to display yet." />
        ) : (
          <div className="grid">
            {projects.map((project, index) => (
              <div className="card" key={project.id ?? index}>

                <div className="top">
                  <h3>{project.title}</h3>
                  {project.role && <span>{project.role}</span>}
                </div>

                {project.description && <p className="desc">{project.description}</p>}

                {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                  <ul className="highlights">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}

                {Array.isArray(project.tech) && project.tech.length > 0 && (
                  <div className="tech">
                    {project.tech.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                )}

                {project.link && (
                  <div className="footer">
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <button>View Project</button>
                    </a>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;
