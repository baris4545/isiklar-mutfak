import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeGallery({ images = [] }) {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const track = trackRef.current;
    let animation;

    let pos = 0;

    const animate = () => {
      pos -= 0.3; // hız (küçük = daha yavaş)
      if (Math.abs(pos) >= track.scrollWidth / 2) {
        pos = 0;
      }
      track.style.transform = `translateX(${pos}px)`;
      animation = requestAnimationFrame(animate);
    };

    animation = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animation);
  }, []);

  const doubled = [...images, ...images]; // sonsuz döngü efekti

  return (
    <div className="homeGallery reveal">
      <div
        className="galleryTrack"
        ref={trackRef}
        onClick={() => navigate("/projeler")}
      >
        {doubled.map((img, i) => (
          <div className="galleryItem" key={i}>
            <img src={img} alt="Proje" />
          </div>
        ))}
      </div>
    </div>
  );
}