import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const waLink =
    "https://wa.me/905437743498?text=" +
    encodeURIComponent("Merhaba, endüstriyel mutfak projem için teklif almak istiyorum.");

  return (
    <footer className="proFooter">
      <div className="proFooterTop">
        <div className="proFooterInner">

          {/* Marka */}
          <div className="footCol brandCol">
            <div className="footBrand">
              <strong>IŞIKLAR MUTFAK</strong>
              <span>Endüstriyel Mutfak Sistemleri</span>
            </div>

            <p className="footDesc">
              Otel, restoran, kafe ve üretim tesisleri için projelendirme,
              paslanmaz imalat ve montaj dahil anahtar teslim çözümler.
            </p>

          </div>

          {/* Menü */}
          <div className="footCol">
            <h4>Kurumsal</h4>
            <div className="proFootList">
              <Link to="/">Anasayfa</Link>
              <Link to="/referanslar">Referanslarımız</Link>
              <Link to="/projeler">Projeler</Link>
              <a href="/#iletisim">İletişim</a>
            </div>
          </div>

          {/* Hizmet */}
          <div className="footCol">
            <h4>Hizmet Alanları</h4>
            <div className="proFootList">
              <span>Otel Mutfakları</span>
              <span>Restoran Sistemleri</span>
              <span>Fırın & Pastane</span>
              <span>Endüstriyel Tesisler</span>
            </div>
          </div>

          {/* İletişim */}
          <div className="footCol contactCol">
            <h4>İletişim</h4>
            <div className="proFootList">
              <a href="tel:+905437743494">📞 +90 543 774 34 94</a>
              <a href="mailto:isiklarcarsi@hotmail.com">✉️ isiklarcarsi@hotmail.com</a>
              <span>📍 İzmir, Türkiye</span>
            </div>

            <a className="footerBtn" href={waLink} target="_blank" rel="noreferrer">
              WhatsApp’tan Yazın
            </a>
          </div>

        </div>
      </div>

      <div className="proFooterBar">
        <span>© {year} IŞIKLAR MUTFAK • Tüm hakları saklıdır.</span>
        <span>Paslanmaz • Hijyen • Proje Bazlı Üretim</span>
      </div>
    </footer>
  );
}