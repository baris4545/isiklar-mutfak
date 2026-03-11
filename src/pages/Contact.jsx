import { useMemo } from "react";

export default function Contact() {
  const waLink = useMemo(
    () =>
      "https://wa.me/905437743498?text=" +
      encodeURIComponent(
        "Merhaba, endüstriyel mutfak projem için bilgi almak istiyorum."
      ),
    []
  );

  const mapsLink = useMemo(
    () =>
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("129/3 Sokak No: 27/C Bornova İzmir"),
    []
  );

  return (
    <>
      {/* HERO */}
      <section className="contactCorporateHero">
        <div className="container">
          <div className="contactCorporateHeroBox">
            <div className="contactCorporateTopline">İLETİŞİM</div>

            <div className="contactCorporateHeroGrid">
              <div className="contactCorporateMain">
                <h1 className="contactCorporateTitle">
                  Kurumsal iletişim bilgilerimiz
                </h1>

                <p className="contactCorporateLead">
                  Endüstriyel mutfak projeleri, 3D proje çizimi, butik imalat,
                  paslanmaz üretim ve anahtar teslim uygulamalar hakkında bilgi
                  almak için bizimle doğrudan iletişime geçebilirsiniz.
                </p>

                <p className="contactCorporateLead">
                  Keşif, planlama, üretim ve montaj süreçlerinde ihtiyaçlarınıza
                  uygun çözümleri değerlendirmek üzere telefon, e-posta ve
                  WhatsApp üzerinden hızlı şekilde ulaşabilirsiniz.
                </p>

                <div className="contactCorporateActions">
                  <a
                    className="btn btnPrimary"
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp’tan Ulaşın
                  </a>

                  <a className="btn" href={mapsLink} target="_blank" rel="noreferrer">
                    Haritada Aç
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* MAIN INFO */}
      <section className="section">
        <div className="container">
          <div className="contactCorporateGrid">
            <div className="contactInfoPanel">
              <div className="contactPanelHead">
                <div className="sectionTag">İletişim Bilgileri</div>
                <h2 className="h2">Doğrudan ulaşım kanalları</h2>
                <p className="sub">
                  Projeleriniz için bilgi almak, keşif planlamak veya teklif sürecini
                  başlatmak üzere aşağıdaki kanallardan bizimle iletişime geçebilirsiniz.
                </p>
              </div>

              <div className="contactInfoList">
                <div className="contactInfoRow">
                  <div className="contactInfoIcon">📞</div>
                  <div className="contactInfoBody">
                    <span>Telefon</span>
                    <strong>+90 543 774 34 98</strong>
                  </div>
                </div>

                <div className="contactInfoRow">
                  <div className="contactInfoIcon">✉️</div>
                  <div className="contactInfoBody">
                    <span>E-posta</span>
                    <strong>isiklarcarsi@hotmail.com</strong>
                  </div>
                </div>

                <div className="contactInfoRow">
                  <div className="contactInfoIcon">📍</div>
                  <div className="contactInfoBody">
                    <span>Adres</span>
                    <strong>İzmir Bornova 129/3 Sokak No: 27/C</strong>
                  </div>
                </div>

                <div className="contactInfoRow">
                  <div className="contactInfoIcon">🕘</div>
                  <div className="contactInfoBody">
                    <span>Çalışma Saatleri</span>
                    <strong>Pazartesi – Cuma / 08:00 – 19:00</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="contactCorporateSidePanel">
              <div className="contactSideBlock">
                <h3>Kurumsal İletişim</h3>
                <p>
                  Tüm proje süreçlerinde ilk değerlendirme ve yönlendirme için
                  telefon veya WhatsApp hattımız üzerinden bizimle hızlı şekilde
                  bağlantı kurabilirsiniz.
                </p>
              </div>

              <div className="contactSideBlock">
                <h3>Konum Bilgisi</h3>
                <p>
                  Merkez lokasyonumuz İzmir Bornova’dadır. Görüşme, keşif planlaması
                  ve proje değerlendirmeleri için iletişim kanallarımız aktif olarak hizmet vermektedir.
                </p>
              </div>

              <div className="contactSideButtons">
                <a
                  className="btn btnPrimary"
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>

                <a
                  className="btn"
                  href="mailto:isiklarcarsi@hotmail.com"
                >
                  E-posta Gönder
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="section">
        <div className="container">
          <div className="contactMapWrap">
            <div className="contactMapTop">
              <div>
                <div className="sectionTag">Konum</div>
                <h2 className="h2">Ofis ve iletişim noktası</h2>
              </div>

              <a
                className="btn"
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
              >
                Google Maps’te Aç
              </a>
            </div>

            <div className="contactMapFrame">
              <iframe
                title="Işıklar Mutfak Konum"
                src="https://www.google.com/maps?q=Bornova%20129/3%20Sokak%20No:%2027/C%20Izmir&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}   