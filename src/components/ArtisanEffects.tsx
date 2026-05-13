"use client";

import { useEffect } from "react";

export function ArtisanEffects() {
  useEffect(() => {
    const hueMap: Record<string, string> = {
      "172": "18",
      "28": "205",
      "38": "205",
      "44": "18",
      "292": "205",
      "322": "348",
    };

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const spotlight = target.closest<HTMLElement>("[data-spotlight]");
      if (spotlight) {
        const rect = spotlight.getBoundingClientRect();
        spotlight.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        spotlight.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
        const hue = spotlight.dataset.hue || "18";
        spotlight.style.setProperty("--spotlight-hue", hueMap[hue] || hue);
      }

      const magnetic = target.closest<HTMLElement>("[data-magnetic]");
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
        magnetic.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const magnetic = target.closest<HTMLElement>("[data-magnetic]");
      if (!magnetic) return;

      const nextTarget = event.relatedTarget;
      if (!(nextTarget instanceof Node) || !magnetic.contains(nextTarget)) {
        magnetic.style.transform = "";
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return null;
}
