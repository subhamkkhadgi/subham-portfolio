import "./Education.css";
import { api } from "../../services/api";
import { useFetch } from "../../services/hooks";
import StateMessage from "../../services/StateMessage";

// Matches the original hardcoded content so the page looks identical
// if the API is unreachable or returns an empty list.
const FALLBACK = [
  {
    degree: "Bachelor of Computer Science (Hons)",
    institution: "Institute of International Management Science (IIMS)",
    location: "Naxal, Kathmandu, Nepal",
    start_year: "2022",
    end_year: "2026",
    tags: ["BCS (Hons)", "Undergraduate Degree"],
  },
  {
    degree: "Higher Secondary Education (+2)",
    institution: "Uniglobe SS/College",
    location: "Kathmandu, Nepal",
    start_year: "2019",
    end_year: "2021",
    tags: ["Management", "NEB"],
  },
];

function EducationCard({ item }) {
  const startYear = item.start_year || "";
  const endYear = item.end_year || "Present";
  const tagList = Array.isArray(item.tags) ? item.tags : [];

  return (
    <div className="education-card">
      <span className="education-tag">
        {startYear} – {endYear}
      </span>

      <h3>{item.degree}</h3>

      {item.institution && <p className="institution">{item.institution}</p>}
      {item.location && <p className="location">{item.location}</p>}

      {tagList.length > 0 && (
        <div className="education-meta">
          {tagList.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function Education() {
  const { data, loading, error } = useFetch(api.fetchEducation, []);

  if (loading) {
    return (
      <section className="education" id="education">
        <div className="education-container">
          <StateMessage kind="loading" text="Loading education..." />
        </div>
      </section>
    );
  }

  const items =
    !error && Array.isArray(data) && data.length > 0 ? data : FALLBACK;

  return (
    <section className="education" id="education">
      <div className="education-container">

        <div className="education-header">
          <span className="section-tag">
            Education
          </span>

          <h2>Academic Background</h2>

          <p>
            My academic journey has provided a strong foundation in
            computer science, problem-solving, and modern software development.
          </p>
        </div>

        {items.length === 0 ? (
          <StateMessage kind="empty" text="No education entries to display yet." />
        ) : (
          <div className="education-grid">
            {items.map((item, i) => (
              <EducationCard item={item} key={item.id ?? i} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Education;
