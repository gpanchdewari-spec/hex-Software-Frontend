import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";

import { useUserAuth } from "../context/UserAuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUserAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const data = await login(
        form.email,
        form.password
      );

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-mist pt-32 pb-20">
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
            Welcome Back
          </p>

          <h1 className="display mt-2 text-3xl font-black">
            Login to HexSoftwares
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Login to manage your profile and internship applications.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-bold">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-transparent bg-brand-mist px-4 transition focus-within:border-brand-blue">
                <FiMail className="text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent p-4 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-transparent bg-brand-mist px-4 transition focus-within:border-brand-blue">
                <FiLock className="text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full bg-transparent p-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="text-slate-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {message && (
              <div className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-500">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue p-4 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}

              {!loading && <FiArrowRight />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-brand-blue"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}