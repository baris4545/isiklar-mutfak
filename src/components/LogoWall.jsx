import { Link } from "react-router-dom";

export default function LogoWall({ projects }) {
  return (
    <div className="grid logoWall">
      {projects.filter(p => p.logo).map(p => (
        <Link key={p.id} className="logo" to={`/proje/${encodeURIComponent(p.id)}`} aria-label={p.title}>
          <img src={p.logo} alt={`${p.title} logo`} />
        </Link>
      ))}
    </div>
  );
}