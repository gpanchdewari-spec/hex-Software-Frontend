import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";
import { homeContent } from "./homeContent";

export default function HeroSlider() {
  const { slides } = homeContent;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touch = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  useEffect(() => {
    if (paused || hovered || reduced || hidden) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5500,
    );
    return () => clearInterval(timer);
  }, [paused, hovered, reduced, hidden, slides.length]);
  const go = (i) => {
    setIndex((i + slides.length) % slides.length);
    setPaused(true);
  };
  return (
    <section
      className="relative overflow-hidden bg-[#2100b0]"
      aria-label="Featured services"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(e) => {
        if (!e.target.closest("[data-play-control]")) setPaused(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(index - 1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(index + 1);
        }
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x,
          dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy))
          go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <h1 className="sr-only">
        HexSoftwares — Web, Software and Mobile App Development
      </h1>
      <div className="grid" aria-live={paused || reduced ? "polite" : "off"}>
        {slides.map((slide, i) => (
          <Link
            key={slide.image}
            to="/services"
            tabIndex={i === index ? 0 : -1}
            aria-hidden={i !== index}
            aria-label={`Explore ${slide.name}`}
            className={`col-start-1 row-start-1 transition-opacity duration-500 motion-reduce:transition-none ${i === index ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="mx-auto block h-auto max-h-[600px] w-full object-contain"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </Link>
        ))}
      </div>
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous banner"
        className="dc-hero-arrow left-3 sm:left-[4%]"
      >
        <FiChevronLeft />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next banner"
        className="dc-hero-arrow right-3 sm:right-[4%]"
      >
        <FiChevronRight />
      </button>
      <div className="absolute inset-x-0 bottom-1 z-20 flex items-center justify-center gap-1 sm:bottom-3">
        {slides.map((s, i) => (
          <button
            type="button"
            key={s.image}
            aria-label={`Show ${s.name} banner`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span
              className={`h-2 rounded-full ${i === index ? "w-5 bg-white" : "w-2 bg-white/50"}`}
            />
          </button>
        ))}
        {!reduced && (
          <button
            type="button"
            data-play-control
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play banners" : "Pause banners"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-xs text-white"
          >
            {paused ? <FiPlay /> : <FiPause />}
          </button>
        )}
      </div>
    </section>
  );
}
