"use client";

import { useState, useEffect } from "react";

const heroSlides = [
  {
    src: "/images/hero-slides/hero1.jpg",
    position: "object-[center_20%]",
    caption: "Varm Velkomst i Sri Lanka",
  },
  {
    src: "/images/hero-slides/hero2.jpg",
    position: "object-[center_15%]",
    caption: "Minner for Livet",
  },
  {
    src: "/images/hero-slides/hero3.jpg",
    position: "object-[center_25%]",
    caption: "Kultur & Tradisjon",
  },
];

export function HeroBackgroundSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background Image Slides */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.caption}
            className={`h-full w-full object-cover ${slide.position} transition-transform duration-[6000ms] ease-out ${
              idx === current ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Dark Vignette Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 md:from-black/80 md:via-black/50 md:to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08170F] via-transparent to-black/40" />

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2 pointer-events-auto">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-primary-glow shadow-lg shadow-primary/50"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
