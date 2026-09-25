import { useState } from "react";
import api from "../api/axios";
import SectionTitle from "../components/SectionTitle";
export default function Contact() {
  const [f, setF] = useState({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    }),
    [msg, setMsg] = useState("");
  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/contact", f);
      setMsg("Thanks — your message has been received.");
      setF({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch (e) {
      setMsg(e.response?.data?.message || "Something went wrong.");
    }
  }
  return (
    <main className="pt-32 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Contact" title="Tell us what you're building." />
        <form
          onSubmit={submit}
          className="grid md:grid-cols-2 gap-4 rounded-[2rem] bg-brand-mist p-6 md:p-10"
        >
          {Object.keys(f)
            .filter((k) => k !== "message")
            .map((k) => (
              <input
                required={["name", "email"].includes(k)}
                className="rounded-xl bg-white p-4 border"
                key={k}
                placeholder={k[0].toUpperCase() + k.slice(1)}
                value={f[k]}
                onChange={(e) => setF({ ...f, [k]: e.target.value })}
              />
            ))}
          <textarea
            className="md:col-span-2 rounded-xl bg-white p-4 border min-h-36"
            placeholder="Message"
            value={f.message}
            onChange={(e) => setF({ ...f, message: e.target.value })}
          />
          <button className="rounded-xl bg-brand-blue text-white p-4 font-bold">
            Send inquiry
          </button>
          {msg && <p className="p-4">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
