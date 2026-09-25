export default function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="max-w-3xl mb-12">
      <p className="text-brand-blue uppercase tracking-[.25em] text-xs font-extrabold mb-3">
        {eyebrow}
      </p>
      <h2 className="display text-3xl md:text-5xl font-extrabold tracking-tight">
        {title}
      </h2>
      {copy && <p className="mt-4 text-slate-600 text-lg">{copy}</p>}
    </div>
  );
}
