"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    src: "/images/slideshow/slide1.jpg",
    title: "Varm Velkomst i Sri Lanka",
    subtitle: "Opplev ekte gjestfrihet og kultur",
  },
  {
    src: "/images/slideshow/slide2.jpg",
    title: "Minner for Livet",
    subtitle: "Skreddersydde opplevelser for hele familien",
  },
  {
    src: "/images/slideshow/slide3.jpg",
    title: "Kultur & Tradisjon",
    subtitle: "Ayubowan – Velkommen til Vårt Paradis",
  },
];

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full max-w-md mx-auto group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Liquid Glass Card Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/50 bg-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500">
        {slides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Slide Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="inline-block rounded-full bg-primary/80 backdrop-blur-md px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                Ayubowan 🇱🇰
              </span>
              <h3 className="font-display text-xl font-medium text-white drop-shadow-md">
                {slide.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-1">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Floating Top Badge */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
          <div className="rounded-full border border-white/30 bg-black/30 backdrop-blur-md px-3.5 py-1 text-xs font-medium text-white shadow-lg">
            Norsk Lanka Experiences
          </div>
          <div className="flex gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all pointer-events-auto ${
                  i === current ? "w-6 bg-primary-glow" : "w-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Prev / Next Controls */}
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 hover:scale-110"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 hover:scale-110"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* Decorative Shadow Glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-primary/20 blur-2xl rounded-full -z-10" />
    </div>
  );
}
