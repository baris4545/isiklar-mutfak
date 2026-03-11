import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <Link to={`/proje/${encodeURIComponent(project.id)}`} className="card" aria-label={project.title}>
      <div className="cardMedia">
        <img src={project.cover} alt={project.title} />
      </div>

      <div className="cardBody">
        <div className="cardTitle">{project.title}</div>
        <div className="cardMeta">
          <span className="pill">{project.category}</span>
          <span className="pill">{project.city}</span>
          <span className="pill">{project.year}</span>
        </div>
      </div>
    </Link>
  );
}