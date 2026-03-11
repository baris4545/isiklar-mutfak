import { useEffect } from "react";

export default function usePremiumEffects() {
  useEffect(() => {
    /* Scroll Reveal */
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    /* Mouse Parallax */
    const hero = document.querySelector(".heroShell");
    if (hero) {
      hero.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        hero.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
      });

      hero.addEventListener("mouseleave", () => {
        hero.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    }

    return () => observer.disconnect();
  }, []);
}