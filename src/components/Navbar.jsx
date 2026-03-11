import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `proLink ${isActive ? "active" : ""}`;

  const waLink =
    "https://wa.me/905437743498?text=" +
    encodeURIComponent(
      "Merhaba, endüstriyel mutfak projem için teklif almak istiyorum."
    );

  return (
    <header className={`proNav ${scrolled ? "scrolled" : ""}`}>
      <div className="proNavInnerFull">

        {/* LEFT */}
        <div className="navLeft">
          <Link to="/" className="proBrand">
            <strong>IŞIKLAR MUTFAK</strong>
            <span>Endüstriyel Mutfak İmalatı</span>
          </Link>
        </div>

        {/* CENTER */}
        <nav className="proNavLinks">
          <NavLink to="/" end className={linkClass}>Anasayfa</NavLink>
          <NavLink to="/referanslar" className={linkClass}>Referanslarımız</NavLink>
          <NavLink to="/projeler" className={linkClass}>Projeler</NavLink>
          <NavLink to="/hakkimizda" className={linkClass}>Hakkımızda</NavLink>
          <NavLink to="/iletisim" className={linkClass}>İletişim</NavLink>
        </nav>

        {/* RIGHT */}
        <div className="proCtas">
          <a className="proBtn" href={waLink} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="proBtn proBtnGold" href="/#iletisim">
            Teklif Al
          </a>
        </div>

        {/* Mobile */}
        <button
          className="proBurger"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div className={`proMobile ${open ? "open" : ""}`}>
        <div className="proMobileInner">
          <NavLink to="/" end className={linkClass}>Anasayfa</NavLink>
          <NavLink to="/referanslar" className={linkClass}>Referanslarımız</NavLink>
          <NavLink to="/projeler" className={linkClass}>Projeler</NavLink>
          <NavLink to="/hakkimizda" className={linkClass}>Hakkımızda</NavLink>
          <a className="proLink" href="/#iletisim">İletişim</a>

          <div className="mobileCtas">
            <a className="proBtn" href={waLink} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="proBtn proBtnGold" href="/#iletisim">
              Teklif Al
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}