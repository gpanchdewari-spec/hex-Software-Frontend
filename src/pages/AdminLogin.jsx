import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
export default function AdminLogin() {
  const [email, setEmail] = useState("admin@hexsoftwares.com"),
    [password, setPassword] = useState("Admin@123"),
    [error, setError] = useState("");
  const nav = useNavigate();
  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      nav("/admin/dashboard");
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
    }
  }
  return (
    <main className="min-h-screen grid place-items-center bg-brand-mist p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl"
      >
        <div className="display text-2xl font-black">
          <span className="text-brand-blue">HEX</span> ADMIN
        </div>
        <h1 className="display text-4xl font-black mt-8">Welcome back.</h1>
        <input
          className="mt-8 w-full rounded-xl bg-brand-mist p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="mt-3 w-full rounded-xl bg-brand-mist p-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="mt-5 w-full rounded-xl bg-brand-blue text-white p-4 font-bold">
          Login
        </button>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        <p className="mt-6 text-xs text-slate-400">
          Seed credentials are documented in README and should be changed for
          production.
        </p>
      </form>
    </main>
  );
}
