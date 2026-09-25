import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCode,
  FiCloud,
  FiTrendingUp,
  FiLayers,
} from "react-icons/fi";

const stats = [
  ["200+", "Projects"],
  ["15+", "Countries"],
  ["100%", "Satisfaction"],
  ["5+", "Years"],
];

export default function Hero() {
  return (
    <section className="grid-bg relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-[100px] lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex rounded-full border border-brand-green/20 bg-black px-3 py-1.5 text-[10px] font-bold tracking-widest text-brand-green shadow-sm">
            TECHNOLOGY • INNOVATION • GROWTH
          </div>

          {/* Heading */}
          <h1 className="display mt-7 text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-5xl lg:text-[60px]">
            Engineering digital experiences{" "}
            <span className="text-brand-blue">that move</span> businesses{" "}
            <span className="text-brand-green">forward.</span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 lg:text-lg">
            HexSoftwares transforms ambitious ideas into powerful software, web
            platforms and digital products built for growth.
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Start Your Project
              <FiArrowUpRight />
            </Link>

            <Link
              to="/services"
              className="rounded-full border border-black/10 bg-white px-5 py-3 font-bold transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              View Our Services
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item[1]}>
                <div className="display text-xl font-extrabold text-brand-ink">
                  {item[0]}
                </div>

                <div className="mt-1 text-[11px] font-medium text-slate-500">
                  {item[1]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[470px]"
        >
          {/* Main Background Card */}
          <div className="absolute inset-8 rounded-[2.5rem] border border-white bg-gradient-to-br from-brand-blue/10 to-brand-lime/20 shadow-2xl" />

          {/* Code Card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute left-4 top-10 w-56 rounded-3xl bg-brand-ink p-5 text-white shadow-2xl md:left-8"
          >
            <div className="flex items-center justify-between">
              <FiCode className="text-xl text-brand-lime" />

              <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-semibold text-white/60">
                LIVE
              </span>
            </div>

            <p className="mt-4 text-xs text-white/50">Development</p>

            <h3 className="mt-1 font-bold">Clean Architecture</h3>

            <div className="mt-5 space-y-2">
              <div className="h-2 w-3/4 rounded-full bg-white/25" />

              <div className="h-2 w-1/2 rounded-full bg-brand-lime/70" />

              <div className="h-2 w-2/3 rounded-full bg-white/20" />

              <div className="h-2 w-2/5 rounded-full bg-brand-blue/70" />
            </div>
          </motion.div>

          {/* Growth Card */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="absolute right-3 top-24 w-52 rounded-3xl border bg-white p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10">
                <FiTrendingUp className="text-xl text-brand-blue" />
              </div>

              <span className="rounded-full bg-brand-green/10 px-2 py-1 text-[10px] font-bold text-brand-green">
                +24.8%
              </span>
            </div>

            <p className="mt-4 text-xs text-slate-500">Product momentum</p>

            <p className="display mt-1 text-3xl font-extrabold text-brand-ink">
              +42%
            </p>

            {/* Fake chart */}
            <div className="relative mt-4 h-16 overflow-hidden rounded-xl bg-brand-green/5">
              <div className="absolute bottom-0 left-0 right-0 flex h-full items-end gap-1 px-3 pb-2">
                {[25, 38, 31, 48, 44, 58, 52, 65].map((h, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                    }}
                    className="flex-1 rounded-t-sm bg-brand-green/60"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cloud Card */}
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4.5,
              ease: "easeInOut",
            }}
            className="absolute bottom-8 left-12 w-52 rounded-3xl border bg-white p-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue/10">
                <FiCloud className="text-xl text-brand-blue" />
              </div>

              <div>
                <div className="font-bold text-brand-ink">Cloud Ready</div>

                <div className="mt-0.5 text-xs text-slate-500">
                  Scalable architecture
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[82%] rounded-full bg-brand-blue" />
              </div>

              <span className="text-[10px] font-bold text-slate-500">82%</span>
            </div>
          </motion.div>

          {/* Floating Icon */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 7, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute bottom-12 right-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-white shadow-xl"
          >
            <FiLayers />
          </motion.div>

          {/* Decorative Dot */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute left-[46%] top-[12%] h-2.5 w-2.5 rounded-full bg-brand-green shadow-[0_0_18px_#22A06B]"
          />
        </motion.div>
      </div>
    </section>
  );
}


