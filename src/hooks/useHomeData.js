import { useState, useEffect, useCallback, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import api from "../api/axios";

export const fieldText = (value, fallback = "") =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

// Supports arrays and common backend response formats.
function readCollection(payload, name) {
  const candidates = [
    payload,
    payload?.[name],
    payload?.data,
    payload?.data?.[name],
    payload?.items,
    payload?.data?.items,
  ];

  const result = candidates.find(Array.isArray);

  if (!result) {
    throw new Error(`Invalid ${name} response`);
  }

  return result.filter(
    (item) => item && typeof item === "object" && !Array.isArray(item),
  );
}

// Loads services, projects and testimonials.
export function useCollection(name) {
  const [resource, setResource] = useState({
    items: [],
    status: "loading",
  });

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setResource((current) => ({
      ...current,
      status: "loading",
    }));

    async function load() {
      try {
        const response = await api.get(`/${name}`, {
          signal: controller.signal,
          timeout: 12000,
        });

        const items = readCollection(response.data, name);

        if (!controller.signal.aborted) {
          setResource({
            items,
            status: "success",
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setResource((current) => ({
            ...current,
            status: "error",
          }));
        }
      }
    }

    load();

    return () => controller.abort();
  }, [name, attempt]);

  return {
    ...resource,
    retry: () => setAttempt((value) => value + 1),
  };
}

// Slider with autoplay, pause/play, arrows and mobile swipe.
export function useCarousel(count, delay = 6500) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  const ref = useRef(null);
  const touch = useRef(null);

  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15 });

  const current = count ? index % count : 0;

  useEffect(() => {
    setPlaying(!reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = playing && !hovered && !hidden && inView && count > 1;

  useEffect(() => {
    if (!running) return;

    const timer = window.setTimeout(() => {
      setIndex((value) => (value + 1) % count);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [running, current, count, delay]);

  const go = useCallback(
    (next) => {
      if (count < 2) return;

      setIndex(((next % count) + count) % count);
      setPlaying(false);
    },
    [count],
  );

  return {
    ref,
    index: current,
    playing,
    running,
    delay,
    go,

    previous: () => go(current - 1),
    next: () => go(current + 1),
    toggle: () => setPlaying((value) => !value),

    interaction: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),

      onFocusCapture: (event) => {
        if (!event.target.closest("[data-carousel-play]")) {
          setPlaying(false);
        }
      },

      onKeyDown: (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;

        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(current + 1);
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(current - 1);
        }
      },

      onTouchStart: (event) => {
        touch.current =
          event.touches.length === 1
            ? {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              }
            : null;
      },

      onTouchEnd: (event) => {
        if (!touch.current || !event.changedTouches.length) return;

        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;

        touch.current = null;

        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          go(current + (dx < 0 ? 1 : -1));
        }
      },

      onTouchCancel: () => {
        touch.current = null;
      },
    },
  };
}
