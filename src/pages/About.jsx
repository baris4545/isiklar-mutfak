import { Link } from "react-router-dom";
import { useMemo } from "react";
import useReveal from "../hooks/useReveal";

export default function About() {
  useReveal();

  const waLink = useMemo(
    () =>
      "https://wa.me/90XXXXXXXXXX?text=" +
      encodeURIComponent(
        "Merhaba, endüstriyel mutfak projem için keşif ve teklif almak istiyorum."
      ),
    []
  );

  const capabilities = [
    "Endüstriyel mutfak projelendirme",
    "Profesyonel 3D çizim",
    "Projeye özel butik imalat",
    "Paslanmaz üretim",
    "Soğutma çözümleri",
    "Yerinde montaj ve devreye alma",
  ];

  const process = [
    {
      no: "01",
      title: "Keşif ve ihtiyaç analizi",
      desc: "Mekânın operasyon yapısı, kapasite ihtiyacı ve kullanım senaryosu teknik olarak değerlendirilir.",
    },
    {
      no: "02",
      title: "3D proje ve planlama",
      desc: "İşletmeye uygun yerleşim planı, ekipman kurgusu ve altyapı ihtiyaçları profesyonel olarak hazırlanır.",
    },
    {
      no: "03",
      title: "Butik imalat ve üretim",
      desc: "Projeye özel paslanmaz imalat ve soğutma çözümleri kalite kontrol süreçleriyle üretilir.",
    },
    {
      no: "04",
      title: "Montaj ve teslim",
      desc: "Saha kurulumu, test, devreye alma ve son teslim aşamaları kontrollü şekilde tamamlanır.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="aboutCorporateHero">
        <div className="container">
          <div className="aboutCorporateHeroBox reveal">
            <div className="aboutCorporateTopline">HAKKIMIZDA</div>

            <div className="aboutCorporateHeroGrid">
              <div className="aboutCorporateMain">
                <h1 className="aboutCorporateTitle">
                  2009’dan bu yana endüstriyel mutfakta
                  <span> proje, üretim ve anahtar teslim uygulama</span>
                </h1>

                <p className="aboutCorporateText">
                  IŞIKLAR MUTFAK olarak; otel, restoran, kafe ve üretim tesisleri için
                  profesyonel 3D proje çizimi, projeye özel butik imalat, paslanmaz üretim,
                  soğutma sistemleri ve yerinde montaj dahil uçtan uca çözümler sunuyoruz.
                </p>

                <p className="aboutCorporateText">
                  Her projeyi yalnızca ekipman yerleşimi olarak değil; işletmenin verimli,
                  sürdürülebilir ve doğru çalışan mutfak altyapısını kurma sorumluluğu ile ele alıyoruz.
                </p>

                <div className="aboutCorporateActions">
                  <a className="btn btnPrimary" href={waLink} target="_blank" rel="noreferrer">
                    WhatsApp’tan İletişime Geçin
                  </a>
                  <Link className="btn" to="/projeler">
                    Projelerimizi İnceleyin
                  </Link>
                </div>
              </div>

              <aside className="aboutCorporateSummary">
                <div className="aboutSummaryCard">
                  <div className="aboutSummaryLabel">Kuruluş</div>
                  <div className="aboutSummaryValue">2009</div>
                </div>

                <div className="aboutSummaryCard">
                  <div className="aboutSummaryLabel">Uzmanlık</div>
                  <div className="aboutSummaryValue">3D Proje & Butik İmalat</div>
                </div>

                <div className="aboutSummaryCard">
                  <div className="aboutSummaryLabel">Çalışma Modeli</div>
                  <div className="aboutSummaryValue">Anahtar Teslim</div>
                </div>

                <div className="aboutSummaryCard">
                  <div className="aboutSummaryLabel">Uygulama Alanı</div>
                  <div className="aboutSummaryValue">Otel, Restoran, Kafe, Üretim Tesisleri</div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* KURUMSAL METİN */}
      <section className="section">
        <div className="container">
          <div className="aboutCorporateIntro reveal">
            <div>
              <div className="sectionTag">Kurumsal Yaklaşım</div>
              <h2 className="h2">Planlı, ölçülü ve sahada karşılığı olan çözümler üretiyoruz.</h2>
            </div>

            <div className="aboutCorporateIntroText">
              <p>
                Endüstriyel mutfak projelerinde başarının; doğru planlama, uygulanabilir proje,
                kaliteli imalat ve disiplinli saha organizasyonu ile mümkün olduğuna inanıyoruz.
              </p>
              <p>
                Bu nedenle her işi, müşterinin ihtiyacını anlayarak başlayan; çizim, üretim,
                montaj ve teslim aşamalarını birbirine bağlı şekilde yöneten bir sistem içinde yürütüyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YETKİNLİKLER */}
      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <div>
              <h2 className="h2">Faaliyet Alanlarımız</h2>
              <p className="sub">
                Projenin başlangıcından saha teslimine kadar gerekli ana hizmet başlıklarımız.
              </p>
            </div>
          </div>

          <div className="aboutCapabilities reveal">
            {capabilities.map((item) => (
              <div className="aboutCapabilityItem" key={item}>
                <span className="aboutCapabilityMark" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YÖNETİM */}
      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <div>
              <h2 className="h2">Kurucular ve Yönetim Yapısı</h2>
              <p className="sub">
                Proje, satış, imalat ve soğutma süreçleri kurucu yönetimiyle doğrudan yürütülmektedir.
              </p>
            </div>
          </div>

          <div className="aboutManagementGrid reveal">
            <div className="aboutManagementCard">
              <div className="aboutManagementTop">
                <div className="aboutManagementInitial">S</div>
                <div>
                  <h3>Savaş Işık</h3>
                  <span>Proje Çizimi ve Satış</span>
                </div>
              </div>

              <p>
                Proje çizimi ve satış süreçlerini yönetmektedir. İhtiyaç analizi, profesyonel
                3D tasarım, ekipman planlama ve tekliflendirme aşamalarında projeyi doğru kurgu ile yönlendirir.
              </p>

              <ul className="aboutManagementList">
                <li>3D proje planlama</li>
                <li>Yerleşim ve ekipman kurgusu</li>
                <li>Teklif ve satış yönetimi</li>
              </ul>
            </div>

            <div className="aboutManagementCard">
              <div className="aboutManagementTop">
                <div className="aboutManagementInitial">C</div>
                <div>
                  <h3>Cengiz Işık</h3>
                  <span>İmalat ve Soğutma</span>
                </div>
              </div>

              <p>
                İmalat ve soğutma süreçlerini yönetmektedir. Projeye özel butik üretim,
                paslanmaz uygulamalar, kalite kontrol ve sahaya uygun teknik çözümler konusunda süreci yönetir.
              </p>

              <ul className="aboutManagementList">
                <li>Paslanmaz imalat süreçleri</li>
                <li>Soğutma sistemleri</li>
                <li>Kalite kontrol ve uygulama disiplini</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <div>
              <h2 className="h2">Çalışma Sürecimiz</h2>
              <p className="sub">
                Her proje; keşif, planlama, üretim ve saha uygulaması ekseninde sistemli şekilde ilerler.
              </p>
            </div>
          </div>

          <div className="aboutProcessGrid reveal">
            {process.map((item) => (
              <div className="aboutProcessCard" key={item.no}>
                <div className="aboutProcessNo">{item.no}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="ctaBox reveal">
            <h2 style={{ margin: 0, fontWeight: 950 }}>Projenizi birlikte planlayalım.</h2>
            <p style={{ marginTop: 10, color: "rgba(244,247,251,.72)", lineHeight: 1.7 }}>
              Mekânınıza uygun 3D proje, projeye özel imalat ve yerinde montaj ile
              anahtar teslim çözümler sunuyoruz.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
              <a className="btn btnPrimary" href={waLink} target="_blank" rel="noreferrer">
                WhatsApp’tan Teklif Al
              </a>
              <a className="btn" href="/#iletisim">
                İletişim Bilgileri
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}