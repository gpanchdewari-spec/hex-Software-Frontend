import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
export default function ProjectDetails() {
  const { id } = useParams(),
    [d, setD] = useState(null);
  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then((r) => setD(r.data))
      .catch(() => setD(false));
  }, [id]);
  if (d === null)
    return (
      <div className="pt-32">
        <Loader />
      </div>
    );
  if (!d) return <div className="pt-40 text-center">Project not found.</div>;
  return (
    <main className="pt-32">
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-brand-green font-bold">{d.category}</p>
          <h1 className="display text-5xl md:text-7xl font-black mt-2">
            {d.title}
          </h1>
          <p className="mt-6 text-xl text-slate-600">{d.description}</p>
          <div className="mt-10 rounded-[2rem] bg-brand-mist p-8">
            <h2 className="display text-2xl font-bold">Impact</h2>
            <p className="mt-3">{d.results}</p>
          </div>
          <div className="mt-8 flex gap-2 flex-wrap">
            {(d.stack || []).map((x) => (
              <span className="border rounded-full px-4 py-2" key={x}>
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
