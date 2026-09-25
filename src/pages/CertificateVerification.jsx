import { useState } from "react";
import api from "../api/axios";
import { FiCheckCircle } from "react-icons/fi";
export default function CertificateVerification() {
  const [id, setId] = useState(""),
    [data, setData] = useState(null),
    [err, setErr] = useState("");
  async function verify(e) {
    e.preventDefault();
    setErr("");
    setData(null);
    try {
      const r = await api.get(`/certificates/verify/${id}`);
      setData(r.data);
    } catch (e) {
      setErr(e.response?.data?.message || "Certificate Not Found");
    }
  }
  return (
    <main className="pt-32 min-h-screen bg-brand-mist">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="rounded-[2rem] bg-white border p-8 md:p-12 soft-card">
          <p className="text-brand-blue font-bold tracking-widest text-xs">
            CERTIFICATE VERIFICATION
          </p>
          <h1 className="display text-4xl md:text-5xl font-black mt-3">
            Verify authenticity instantly.
          </h1>
          <form onSubmit={verify} className="mt-8 flex gap-3">
            <input
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="min-w-0 flex-1 rounded-xl bg-brand-mist p-4"
              placeholder="Enter Certificate ID"
            />
            <button className="rounded-xl bg-brand-blue text-white px-6 font-bold">
              Verify
            </button>
          </form>
          {err && (
            <div className="mt-6 rounded-2xl bg-red-50 text-red-700 p-5">
              {err}
            </div>
          )}
          {data && (
            <div className="mt-6 rounded-2xl bg-green-50 p-6">
              <div className="flex items-center gap-2 text-brand-green font-bold">
                <FiCheckCircle /> Verified Certificate
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Student</span>
                  <p className="font-bold">{data.studentName}</p>
                </div>
                <div>
                  <span className="text-slate-500">Certificate ID</span>
                  <p className="font-bold">{data.certificateId}</p>
                </div>
                <div>
                  <span className="text-slate-500">Domain</span>
                  <p className="font-bold">{data.domain}</p>
                </div>
                <div>
                  <span className="text-slate-500">Duration</span>
                  <p className="font-bold">{data.duration}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
