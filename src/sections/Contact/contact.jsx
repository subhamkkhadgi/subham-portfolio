import "./Contact.css";
import { api } from "../../services/api";
import { useFetch } from "../../services/hooks";
import StateMessage from "../../services/StateMessage";

const DEFAULTS = {
  section_tag: "Contact",
  heading: "Let's Work Together",
  description:
    "Whether you have a project, internship opportunity, or simply want to connect, feel free to reach out.",
  email: "subhamkhadgiisme@gmail.com",
  location: "Kathmandu, Nepal",
  availability: "Open to Oppurtunities",
  contact_number: "9811111111",
};

function InfoCard({ title, value, href }) {
  if (!value) return null;
  return (
    <div className="info-card">
      <h3>{title}</h3>
      {href ? (
        <p>
          <a href={href}>{value}</a>
        </p>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}

function Contact() {
  const { data, loading, error } = useFetch(api.fetchContact, []);

  if (loading) {
    return (
      <section className="contact" id="contact">
        <div className="contact-container">
          <StateMessage kind="loading" text="Loading contact..." />
        </div>
      </section>
    );
  }

  const contact = (!error && data && Object.keys(data).length > 0) ? data : DEFAULTS;

  return (
    <section className="contact" id="contact">
      <div className="contact-container">

        <div className="contact-header">
          <span className="section-tag">
            {contact.section_tag}
          </span>

          <h2>{contact.heading}</h2>

          {contact.description && <p>{contact.description}</p>}
        </div>

        <div className="contact-info">

          <InfoCard
            title="Email"
            value={contact.email}
            href={contact.email ? `mailto:${contact.email}` : null}
          />

          <InfoCard title="Location" value={contact.location} />

          <InfoCard title="Availability" value={contact.availability} />

          <InfoCard
            title="Contact Number"
            value={contact.contact_number}
            href={contact.contact_number ? `tel:${contact.contact_number}` : null}
          />

        </div>

      </div>
    </section>
  );
}

export default Contact;
