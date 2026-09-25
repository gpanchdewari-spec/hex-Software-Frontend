import { useEffect, useState } from "react";
import api from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";

export default function Portfolio() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.get("/projects");

        console.log("PROJECT API RESPONSE:", res.data);

        setData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(
          "PROJECT FETCH ERROR:",
          error.response?.data || error.message,
        );

        setData([]);
      }
    };

    loadProjects();
  }, []);

  const shown =
    filter === "All"
      ? data
      : data.filter((project) => project.category === filter);

  return (
    <main className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Portfolio"
          title="Selected work with business impact."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {["All", "Web", "Mobile", "AI", "Software", "UI/UX"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 ${
                filter === item
                  ? "bg-brand-ink text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div className="rounded-3xl bg-slate-50 p-10 text-center">
            <p className="font-bold">No projects found</p>

            <p className="mt-2 text-sm text-slate-500">
              Check browser console for PROJECT API RESPONSE.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((project) => (
              <ProjectCard key={project._id} item={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
