import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HomeGallery from "../components/HomeGallery";
import useReveal from "../hooks/useReveal";

function useCountUp(target, durationMs = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const to = Number(target) || 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [target, durationMs]);

  return value;
}

export default function Home() {
  useReveal();

  const countProjects = useCountUp(1000);
  const countYears = useCountUp(15);
  const countSupport = useCountUp(100);

  const waLink = useMemo(
    () =>
      "https://wa.me/905437743498?text=" +
      encodeURIComponent("Merhaba, endüstriyel mutfak projem için teklif almak istiyorum."),
    []
  );

  // ✅ Fullscreen cinematic slider images
  const heroSlides = useMemo(
    () => [
      "/img/hero.jpg",
      "/img/p1.jpg",
      "/img/p2.jpg",
      "/img/p3.jpg",
      "/img/p4.jpg",
    ],
    []
  );

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 5200); // yavaş geçiş
    return () => window.clearInterval(id);
  }, [heroSlides.length]);

  const services = [
    { icon: "🏨", title: "Otel Mutfakları", desc: "Yüksek kapasiteli servis ve üretim çözümleri." },
    { icon: "🍽️", title: "Restoran Mutfakları", desc: "Akış odaklı yerleşim ve hijyenik paslanmaz imalat." },
    { icon: "☕", title: "Kafe & Bistro", desc: "Kompakt ve estetik mutfak tasarımları." },
    { icon: "🥐", title: "Pastane Üretim", desc: "Üretim hattı planlaması ve özel ölçü imalat." },
    { icon: "🥖", title: "Fırın Sistemleri", desc: "Yoğun kullanıma dayanıklı çözümler." },
    { icon: "🏭", title: "Endüstriyel Tesis", desc: "Büyük ölçekli üretim alanları için anahtar teslim." },
  ];

  return (
    <>
      {/* ✅ FULLSCREEN CINEMATIC HERO */}
      <section className="homeCineHero" aria-label="Cinematic hero">
        <div className="cineStage">
          {/* Slides (crossfade) */}
          <div className="cineSlides" aria-hidden="true">
            {heroSlides.map((src, i) => (
              <div
                key={src}
                className={"cineSlide" + (i === slide ? " isActive" : "")}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>

          {/* Premium overlays */}
          <div className="cineOverlay" />
          <div className="cineGrain" />

          {/* Content */}
          <div className="cineContent">
            <div className="cineInner container">
            <div className="cineBadge">
              <span className="cineBadgeDot" /> 2009'dan Beri Endüstriyel Mutfak Uzmanı
            </div>

            <h1 className="cineH1">
              Büyük Mutfağın <br />
              <span className="cineGold">Güçlü Çözüm Ortağı</span>
            </h1>

            <p className="cineP">
              Otel, restoran, kafe ve üretim tesisleri için proje, imalat ve montaj dahil
              anahtar teslim endüstriyel mutfak çözümleri sunuyoruz.
            </p>

            <div className="cineActions">
              <a className="btn btnPrimary" href="#iletisim">
                Proje Teklifi Al
              </a>
              <Link className="btn" to="/projeler">
                Projelerimizi İncele
              </Link>
              <Link className="btn" to="/referanslar">
                Referanslarımız
              </Link>
            </div>

            {/* Stats (premium panel) */}
            <div className="cineStats">
              <div className="cineStatsTop">Güvenle Tamamlanan Projeler</div>

              <div className="cineStatsGrid">
                <div className="cineStat">
                  <div className="cineStatValue">{countProjects}+</div>
                  <div className="cineStatLabel">Tamamlanan Proje</div>
                </div>

                <div className="cineStat">
                  <div className="cineStatValue">{countYears}+</div>
                  <div className="cineStatLabel">Yıllık Tecrübe</div>
                </div>

                <div className="cineStat">
                  <div className="cineStatValue">%{countSupport}</div>
                  <div className="cineStatLabel">Müşteri Memnuniyeti</div>
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <a className="cineScrollHint" href="#devam">
              <span className="cineScrollMouse" />
              <span>Keşfet</span>
            </a>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ PAGE CONTINUES ON SCROLL */}
      <div id="devam" />

      {/* SERVICES */}
      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2 className="h2">Hizmet Alanlarımız</h2>
            <p className="sub">Planlama, üretim ve montaj dahil anahtar teslim çözümler.</p>
          </div>
        </div>

        <div className="cards">
          {services.map((svc, i) => (
            <div className="svc" key={i}>
              <div className="svcIcon">{svc.icon}</div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NASIL ÇALIŞIYORUZ */}
      <section className="section reveal">
        <div className="sectionHeader">
          <div>
            <h2 className="h2">
              Projeyi <span style={{ color: "#d6b25e" }}>Nasıl Yönetiyoruz?</span>
            </h2>
            <p className="sub">Keşiften teslimata kadar şeffaf ve sistematik ilerliyoruz.</p>
          </div>
        </div>

        <div className="timeline">
          <div className="step">
            <div className="stepNum">1</div>
            <h4>Keşif & Analiz</h4>
            <p>Alan incelemesi ve ihtiyaç tespiti yapılır.</p>
          </div>
          <div className="step">
            <div className="stepNum">2</div>
            <h4>Projelendirme</h4>
            <p>Teknik yerleşim ve ekipman planı hazırlanır.</p>
          </div>
          <div className="step">
            <div className="stepNum">3</div>
            <h4>İmalat</h4>
            <p>Paslanmaz üretim ve kalite kontrol.</p>
          </div>
          <div className="step">
            <div className="stepNum">4</div>
            <h4>Montaj & Teslim</h4>
            <p>Yerinde kurulum ve devreye alma.</p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2 className="h2">Projelerimizden Seçmeler</h2>
            <p className="sub">Tamamladığımız projelerden görseller.</p>
          </div>
        </div>

        <HomeGallery
          images={[
            "/img/p1.jpg",
            "/img/p2.jpg",
            "/img/p3.jpg",
            "/img/p4.jpg",
            "/img/p5.jpg",
            "/img/p6.jpg",
            "/img/p7.jpg",
            "/img/p8.jpg",
          ]}
        />
      </section>

      {/* CTA */}
      <section className="section" id="iletisim">
        <div className="ctaBox">
          <h2 style={{ margin: 0, fontWeight: 950 }}>Yeni Bir Mutfak Projesi mi Planlıyorsunuz?</h2>
          <p style={{ marginTop: 10, color: "rgba(244,247,251,.72)" }}>
            Keşif, planlama, üretim ve montaj dahil tüm süreci tek elden yönetiyoruz.
          </p>

          <div style={{ marginTop: 18 }}>
            <a className="btn btnPrimary" href={waLink} target="_blank" rel="noreferrer">
              WhatsApp’tan Teklif Al
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a className="waFloat" href={waLink} target="_blank" rel="noreferrer">
        <span className="waDot" />
        WhatsApp
      </a>
    </>
  );
}