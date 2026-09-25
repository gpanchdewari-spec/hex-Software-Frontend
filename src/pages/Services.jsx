import { useEffect, useState } from "react";
import api from "../api/axios";
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";
import SectionTitle from "../components/SectionTitle";
export default function Services() {
  const [data, setData] = useState([]),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/services")
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="pt-32 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Services"
          title="Capabilities built for modern businesses."
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((x, i) => (
              <ServiceCard key={x._id} item={{ ...x, number: `0${i + 1}` }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
