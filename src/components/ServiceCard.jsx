import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
export default function ServiceCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-3xl border border-black/5 bg-white p-7 soft-card"
    >
      <div className="text-xs font-bold text-brand-green mb-8">
        {item.number || "CAPABILITY"}
      </div>
      <h3 className="display text-2xl font-bold">{item.title}</h3>
      <p className="mt-3 text-slate-600 min-h-20">{item.description}</p>
      <Link
        to={`/services/${item._id}`}
        className="mt-6 inline-flex items-center gap-2 font-bold text-brand-blue"
      >
        Learn more <FiArrowUpRight />
      </Link>
    </motion.div>
  );
}
