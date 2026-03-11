import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="badge">Sayfa bulunamadı.</div>
      <div style={{ marginTop: 12 }}>
        <Link className="btn" to="/">Anasayfaya dön</Link>
      </div>
    </section>
  );
}