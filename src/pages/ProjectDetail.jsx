import { Link, useParams } from "react-router-dom";
import projects from "../data/projects.json";

export default function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find(x => x.id === id);

  if (!p) {
    return (
      <section className="section">
        <div className="badge">Proje bulunamadı.</div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn" to="/referanslar">Referanslara dön</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="breadcrumb">
        <Link to="/">Anasayfa</Link> / <Link to="/referanslar">Referanslarımız</Link> / {p.title}
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
        {p.logo ? (
          <img src={p.logo} alt={`${p.title} logo`} style={{ height: 42, maxWidth: 220, objectFit: "contain" }} />
        ) : null}

        <div>
          <h1 style={{ margin: 0 }}>{p.title}</h1>
          <div className="meta" style={{ marginTop: 8 }}>
            <span>{p.category}</span><span>•</span><span>{p.city}</span><span>•</span><span>{p.year}</span>
          </div>
        </div>
      </div>

      {Array.isArray(p.scope) && p.scope.length ? (
        <div className="badge" style={{ margin: "10px 0 18px" }}>
          <strong>Kapsam:</strong>&nbsp; {p.scope.join(" • ")}
        </div>
      ) : null}

      <div className="gallery">
        {(p.gallery || []).map((src, i) => (
          <a key={src + i} href={src} target="_blank" rel="noopener">
            <img src={src} alt={`${p.title} fotoğraf ${i + 1}`} />
          </a>
        ))}
      </div>
    </section>
  );
}