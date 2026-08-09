"use client";

import { useState, useEffect } from "react";

const slides = [
  { src: "/images/slideshow/slide1.jpg", caption: "Ayubowan – Velkommen" },
  { src: "/images/slideshow/slide2.jpg", caption: "Minner for Livet" },
  { src: "/images/slideshow/slide3.jpg", caption: "Kultur & Tradisjon" },
];

export function RightHeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-[4/4.8] mx-auto overflow-hidden rounded-3xl">
      {/* Slides Container */}
      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        {slides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.caption}
              className="h-full w-full object-cover object-top transition-transform duration-[5000ms] ease-out hover:scale-105"
            />
          </div>
        ))}

        {/* Soft Vignette Mask blending edges into main background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* Subtle Bottom Slide Controls */}
        <div className="absolute bottom-5 left-6 right-6 flex justify-between items-center z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary-glow animate-pulse" />
            {slides[current].caption}
          </span>
          <div className="flex gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-primary-glow" : "w-2 bg-white/40 hover:bg-white"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
