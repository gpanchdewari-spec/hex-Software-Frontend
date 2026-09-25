import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-brand-blue text-white shadow-xl grid place-items-center hover:-translate-y-1 transition"
    >
      <FiArrowUp />
    </button>
  );
}
