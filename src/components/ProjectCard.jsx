import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectCard({ item }) {
  if (!item) return null;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white transition hover:shadow-xl"
    >
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden bg-brand-mist">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title || "Project"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-blue/20 via-white to-brand-lime/30">
            <p className="text-sm font-bold text-slate-400">
              No Project Image
            </p>
          </div>
        )}

        {/* Category */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-brand-green shadow-sm backdrop-blur">
          {item.category || "Project"}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="display text-xl font-bold text-brand-ink">
          {item.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
          {item.description}
        </p>

        {Array.isArray(item.stack) && item.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border bg-brand-mist px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/portfolio/${item._id}`}
          className="mt-5 inline-flex items-center gap-1 font-bold text-brand-blue transition hover:gap-2"
        >
          View case study →
        </Link>
      </div>
    </motion.div>
  );
}