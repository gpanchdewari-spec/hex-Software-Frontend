import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
export default function ServiceDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    api
      .get(`/services/${id}`)
      .then((r) => setData(r.data))
      .catch(() => setData(false));
  }, [id]);
  if (data === null)
    return (
      <div className="pt-32">
        <Loader />
      </div>
    );
  if (!data) return <div className="pt-40 text-center">Service not found.</div>;
  return (
    <main className="pt-32">
      <section className="py-24 bg-brand-mist">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-brand-green font-bold">SERVICE</p>
          <h1 className="display text-5xl md:text-7xl font-black mt-3">
            {data.title}
          </h1>
          <p className="text-xl text-slate-600 mt-6">{data.description}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="display text-3xl font-bold">What you get</h2>
            <div className="mt-5 space-y-3">
              {(data.features || []).map((x) => (
                <div className="rounded-2xl bg-brand-mist p-4" key={x}>
                  {x}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="display text-3xl font-bold">Technologies</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {(data.technologies || []).map((x) => (
                <span className="rounded-full border px-4 py-2" key={x}>
                  {x}
                </span>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-block mt-10 rounded-full bg-brand-blue text-white px-6 py-4 font-bold"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
