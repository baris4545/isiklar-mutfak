import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

const CITY_MARKERS = [
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

export default function HomeMapGL({ height = 260 }) {
  const mapRef = useRef(null);
  const mapObjRef = useRef(null);
  const tooltipRef = useRef(null);
  const pulseRafRef = useRef(null);

  const geo = useMemo(() => toGeoJSON(CITY_MARKERS), []);
  const [ready, setReady] = useState(false);

  const style = useMemo(
    () => ({
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
        cities: {
          type: "geojson",
          data: geo,
          cluster: true,
          clusterRadius: 48,
          clusterMaxZoom: 6,
        },
      },
      layers: [
        { id: "base", type: "raster", source: "carto" },

        {
          id: "city-glow",
          type: "circle",
          source: "cities",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 18,
            "circle-color": "rgba(214,178,94,0.22)",
            "circle-blur": 0.9,
          },
        },

        {
          id: "clusters",
          type: "circle",
          source: "cities",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "rgba(214,178,94,0.4)",
              6,
              "rgba(214,178,94,0.5)",
              12,
              "rgba(125,211,252,0.45)",
            ],
            "circle-radius": ["step", ["get", "point_count"], 18, 6, 24, 12, 28],
            "circle-stroke-width": 1,
            "circle-stroke-color": "rgba(255,255,255,0.35)",
          },
        },

        {
          id: "cluster-count",
          type: "symbol",
          source: "cities",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["Open Sans Bold"],
            "text-size": 12,
          },
          paint: {
            "text-color": "rgba(244,247,251,0.95)",
          },
        },

        {
          id: "unclustered",
          type: "circle",
          source: "cities",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 7,
            "circle-color": "rgba(214,178,94,0.95)",
            "circle-stroke-width": 2,
            "circle-stroke-color": "rgba(15,18,26,0.9)",
          },
        },

        {
          id: "pulse",
          type: "circle",
          source: "cities",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 16,
            "circle-color": "rgba(214,178,94,0.18)",
            "circle-blur": 0.3,
          },
        },
      ],
    }),
    [geo]
  );

  useEffect(() => {
    if (!mapRef.current || mapObjRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style,
      center: [12, 44],
      zoom: 3.4,
      pitch: 32,
      bearing: -6,
      attributionControl: false,
    });

    mapObjRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      setReady(true);

      const bounds = new maplibregl.LngLatBounds();
      CITY_MARKERS.forEach((c) => bounds.extend([c.lng, c.lat]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 5, duration: 900 });

      // Pulse animation (clean version)
      const animate = (t) => {
        const p = (t % 1400) / 1400;
        const radius = 12 + p * 18;
        const opacity = 0.25 * (1 - p);

        if (map.getLayer("pulse")) {
          map.setPaintProperty("pulse", "circle-radius", radius);
          map.setPaintProperty(
            "pulse",
            "circle-color",
            `rgba(214,178,94,${opacity})`
          );
        }
        pulseRafRef.current = requestAnimationFrame(animate);
      };
      pulseRafRef.current = requestAnimationFrame(animate);
    });

    /* TOOLTIP */
    const showTip = (e) => {
      const el = tooltipRef.current;
      if (!el) return;
      const f = e.features?.[0];
      if (!f) return;

      const name =
        f.properties?.name ||
        `${f.properties?.point_count ?? ""} Lokasyon`;

      el.innerHTML = `
        <div class="glTipTitle">${name}</div>
        <div class="glTipSub">Tıkla & yakınlaş</div>
      `;

      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };

    const moveTip = (e) => {
      const el = tooltipRef.current;
      if (!el) return;

      const pad = 16;
      const rect = mapRef.current.getBoundingClientRect();

      let x = e.point.x + pad;
      let y = e.point.y + pad;

      // overflow fix
      if (x + 220 > rect.width) x -= 180;
      if (y + 80 > rect.height) y -= 60;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };

    const hideTip = () => {
      const el = tooltipRef.current;
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
    };

    ["unclustered", "clusters"].forEach((layer) => {
      map.on("mouseenter", layer, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", layer, () => {
        map.getCanvas().style.cursor = "";
        hideTip();
      });

      map.on("mousemove", layer, (e) => {
        showTip(e);
        moveTip(e);
      });
    });

    map.on("click", "clusters", (e) => {
      const feature = e.features?.[0];
      if (!feature) return;

      const clusterId = feature.properties.cluster_id;
      const source = map.getSource("cities");

      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        map.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 800,
          pitch: 40,
        });
      });
    });

    map.on("click", "unclustered", (e) => {
      const f = e.features?.[0];
      if (!f) return;

      map.easeTo({
        center: f.geometry.coordinates,
        zoom: 6.5,
        duration: 900,
        pitch: 45,
      });
    });

    /* PARALLAX (desktop only) */
    const isMobile = window.innerWidth < 980;

    const onMouseMove = (ev) => {
      if (isMobile) return;

      const rect = mapRef.current.getBoundingClientRect();
      const nx = (ev.clientX - rect.left) / rect.width - 0.5;
      const ny = (ev.clientY - rect.top) / rect.height - 0.5;

      map.easeTo({
        bearing: -6 + nx * 6,
        pitch: 32 + -ny * 6,
        duration: 200,
      });
    };

    if (!isMobile) {
      mapRef.current.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      if (pulseRafRef.current) cancelAnimationFrame(pulseRafRef.current);
      if (!isMobile) {
        mapRef.current?.removeEventListener("mousemove", onMouseMove);
      }
      map.remove();
      mapObjRef.current = null;
    };
  }, [style]);

  return (
    <div className="mapSlimWrap">
      <div className="mapSlimHeader">
        <div>
          <div className="mapSlimTitle">Proje Yaptığımız Şehirler</div>
          <div className="mapSlimSub">
            Türkiye & Avrupa • Haritada gez • Pinlere tıkla
          </div>
        </div>

        <div className={`mapSlimPill ${ready ? "ok" : ""}`}>
          {ready ? "Canlı Harita" : "Yükleniyor…"}
        </div>
      </div>

      <div className="mapSlimShell" style={{ height }}>
        <div ref={mapRef} className="mapSlimCanvas" />
        <div ref={tooltipRef} className="glTooltip" />
        <div className="mapSlimVignette" />
      </div>
    </div>
  );
}