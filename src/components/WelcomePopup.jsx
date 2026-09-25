import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiArrowUpRight, FiBriefcase, FiCode } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("hexWelcomePopup");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShow(false);

    sessionStorage.setItem("hexWelcomePopup", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[2px]"
          />

          <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 15,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-auto relative w-full max-w-[650px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]"
            >
              <button
                type="button"
                onClick={closePopup}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-slate-100"
              >
                <FiX size={20} />
              </button>

              <div className="grid md:grid-cols-[1fr_190px]">
                <div className="p-7 md:p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-green">
                    Welcome to HexSoftwares
                  </p>

                  <h2 className="mt-3 max-w-[420px] text-3xl font-black leading-tight text-brand-ink">
                    Building digital products that move businesses forward.
                  </h2>

                  <p className="mt-4 max-w-[450px] text-sm leading-6 text-slate-500">
                    Explore our services, projects, career opportunities and
                    internship programs.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/services"
                      onClick={closePopup}
                      className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Explore Services
                      <FiArrowUpRight />
                    </Link>

                    <Link
                      to="/internships"
                      onClick={closePopup}
                      className="flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-brand-ink transition hover:border-brand-blue hover:text-brand-blue"
                    >
                      Internships
                    </Link>
                  </div>
                </div>

                <div className="hidden bg-brand-ink p-6 text-white md:flex md:flex-col md:justify-between">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <FiCode size={20} />
                    </div>

                    <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-lime">
                      Digital Solutions
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/65">
                      Web, mobile, software, AI and cloud solutions.
                    </p>
                  </div>

                  <Link
                    to="/careers"
                    onClick={closePopup}
                    className="mt-6 flex items-center gap-2 text-xs font-bold"
                  >
                    <FiBriefcase />
                    Join Our Team
                  </Link>
                </div>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-brand-blue via-brand-green to-brand-lime" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
