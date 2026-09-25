export default function TestimonialCard({ item }) {
  return (
    <div className="rounded-3xl border bg-white p-7">
      <div className="text-brand-gold text-xl">★★★★★</div>
      <p className="mt-4 text-slate-700">“{item.message}”</p>
      <div className="mt-6 font-bold">{item.name}</div>
      <div className="text-sm text-slate-500">
        {item.position} · {item.company}
      </div>
    </div>
  );
}
