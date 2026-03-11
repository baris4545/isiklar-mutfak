import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const CITIES = [
  { name: "Manisa", lat: 38.6191, lng: 27.4289 },
  { name: "İzmir", lat: 38.4237, lng: 27.1428 },
  { name: "Aydın", lat: 37.8444, lng: 27.8458 },
  { name: "Muğla", lat: 37.2153, lng: 28.3636 },
  { name: "Balıkesir", lat: 39.6484, lng: 27.8826 },
  { name: "İstanbul", lat: 41.0082, lng: 28.9784 },
  { name: "Çanakkale", lat: 40.1553, lng: 26.4142 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Köln", lat: 50.9375, lng: 6.9603 },
];

function toGeoJSON(points) {
  return {
    type: "FeatureCollection",
    features: points.map((p) => ({
      type: "Feature",
      properties: { name: p.name },
      geometry: { type: "Point", coordinates: [p.lng, p.lat] },
    })),
  };
}

export default function Referanslar() {
  const mapRef = useRef(null);
  const mapObjRef = useRef(null);
  const addedRef = useRef(false);
  const timersRef = useRef([]);

  const [activeImage, setActiveImage] = useState(null);

  const emptyGeo = useMemo(() => toGeoJSON([]), []);
  const fullGeo = useMemo(() => toGeoJSON(CITIES), []);

  const images = useMemo(
    () => [
      "/img/p1.jpg",
      "/img/p2.jpg",
      "/img/p3.jpg",
      "/img/p4.jpg",
      "/img/p5.jpg",
      "/img/p6.jpg",
      "/img/p7.jpg",
      "/img/p8.jpg",
    ],
    []
  );

  useEffect(() => {
    if (!mapRef.current || mapObjRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: {
        version: 8,
        sources: {
          carto: {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors © CARTO",
          },
          cities: { type: "geojson", data: emptyGeo },
        },
        layers: [
          { id: "base", type: "raster", source: "carto" },

          {
            id: "city-glow",
            type: "circle",
            source: "cities",
            paint: {
              "circle-radius": 14,
              "circle-color": "rgba(214,178,94,0.18)",
              "circle-blur": 0.9,
            },
          },
          {
            id: "city-dots",
            type: "circle",
            source: "cities",
            paint: {
              "circle-radius": 6,
              "circle-color": "rgba(214,178,94,0.96)",
              "circle-stroke-width": 2,
              "circle-stroke-color": "rgba(15,18,26,0.90)",
            },
          },
          {
            id: "city-labels",
            type: "symbol",
            source: "cities",
            layout: {
              "text-field": ["get", "name"],
              "text-size": 12,
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.2],
              "text-anchor": "top",
              "text-allow-overlap": true,
              "text-ignore-placement": true,
            },
            paint: {
              "text-color": "rgba(244,247,251,0.94)",
              "text-halo-color": "rgba(10,12,18,0.88)",
              "text-halo-width": 1.3,
            },
          },
        ],
      },
      center: [12, 44],
      zoom: 3.4,
      pitch: 0,
      bearing: 0,
      interactive: false,
      attributionControl: true,
    });

    mapObjRef.current = map;

    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.dragRotate.disable();
    map.dragPan.disable();
    map.keyboard.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();

    map.on("load", () => {
      const bounds = new maplibregl.LngLatBounds();
      CITIES.forEach((c) => bounds.extend([c.lng, c.lat]));
      map.fitBounds(bounds, {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        duration: 0,
        maxZoom: 4.6,
      });

      if (addedRef.current) return;
      addedRef.current = true;

      const src = map.getSource("cities");
      if (!src) return;

      const features = fullGeo.features;
      const stepMs = 220;

      for (let i = 0; i < features.length; i++) {
        const t = window.setTimeout(() => {
          src.setData({
            type: "FeatureCollection",
            features: features.slice(0, i + 1),
          });
        }, i * stepMs);

        timersRef.current.push(t);
      }
    });

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      map.remove();
      mapObjRef.current = null;
      addedRef.current = false;
    };
  }, [emptyGeo, fullGeo]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="refPage">
        <section className="refHeroBlock">
          <div className="refHeroCard">
            <div className="refHeroLeft">
              <div className="refKicker">REFERANSLAR</div>
              <h1 className="refTitle">Türkiye & Avrupa’da Tamamlanan Projeler</h1>
              <p className="refSub">
                Farklı şehirlerde gerçekleştirdiğimiz uygulamaları harita üzerinde görebilir,
                aşağıdaki görsellerden tamamlanan projelerimizin genel niteliğini inceleyebilirsiniz.
              </p>

              <div className="refHeroBadges">
                <span>Endüstriyel Mutfak</span>
                <span>3D Projelendirme</span>
                <span>Butik İmalat</span>
                <span>Anahtar Teslim</span>
              </div>
            </div>

            <div className="refHeroRight">
              <div className="refMiniInfo">
                <strong>11+</strong>
                <span>Şehir</span>
              </div>
              <div className="refMiniInfo">
                <strong>Türkiye</strong>
                <span>Yurt İçi Projeler</span>
              </div>
              <div className="refMiniInfo">
                <strong>Avrupa</strong>
                <span>Yurt Dışı Uygulamalar</span>
              </div>
            </div>
          </div>
        </section>

        <section className="refMapSection">
          <div className="refSectionTop">
            <div>
              <h2 className="h2">Şehir Dağılımı</h2>
              <p className="sub">
                Şehirler sayfa açıldığında sırayla işaretlenir. Harita sabittir.
              </p>
            </div>
          </div>

          <div className="refMapShell">
            <div ref={mapRef} className="refMap" />
            <div className="refVignette" />
          </div>
        </section>

        <section className="refGallerySection">
          <div className="refSectionTop">
            <div>
              <h2 className="h2">Proje Görselleri</h2>
              <p className="sub">
                Görsellere tıklayarak büyük boyutta inceleyebilirsiniz.
              </p>
            </div>
          </div>

          <div className="refGrid">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                className={`refImg refImg${(i % 5) + 1}`}
                onClick={() => setActiveImage(src)}
                aria-label="Fotoğrafı büyüt"
              >
                <img src={src} alt={`Proje görseli ${i + 1}`} loading="lazy" />
                <span className="refImgOverlay">
                  <span>Görseli Büyüt</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {activeImage ? (
        <div className="refLightbox" onClick={() => setActiveImage(null)}>
          <button
            type="button"
            className="refLightboxClose"
            onClick={() => setActiveImage(null)}
            aria-label="Kapat"
          >
            ✕
          </button>

          <div className="refLightboxInner" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage} alt="Büyük proje görseli" />
          </div>
        </div>
      ) : null}
    </>
  );
}