import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".ai");

    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, i * 90);

            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);
}
