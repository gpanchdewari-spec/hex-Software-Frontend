
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TechLeadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("hex-tech-lead-popup");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("hex-tech-lead-popup", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="h-28 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500" />

            {/* Close Button */}
            <button
              onClick={closePopup}
              aria-label="Close popup"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xl text-white backdrop-blur-md transition hover:bg-white/30"
            >
              ×
            </button>

            {/* Profile */}
            <div className="-mt-14 px-6 pb-7 text-center">
              {/* Profile Image */}
              <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-xl">
                <img
                  src="/images/home/govind-thakur.jpg"
                  alt="Govind Thakur"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="mt-4">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wide text-blue-700">
                  TEAM LEAD
                </span>

                <h2 className="mt-3 text-2xl font-bold text-gray-900">
                  Govind Thakur
                </h2>

                <p className="mt-1 font-semibold text-blue-600">
                  Team Lead & Full Stack Developer
                </p>
              </div>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-600">
                Building modern, scalable and user-focused digital solutions
                with full-stack technologies and the MERN ecosystem.
              </p>

              {/* Tech Stack */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {[
                  "Next.js",
                  "Java Spring Boot",
                  "MongoDB",
                  "Express.js",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Profile
                </button>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  in
                </a>

             
              </div>

              <p className="mt-5 text-xs text-gray-400">
                HexSoftware · Digital Solutions
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechLeadPopup;

