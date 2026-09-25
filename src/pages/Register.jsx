import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { useUserAuth } from "../context/UserAuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useUserAuth();

  const [form, setForm] = useState({
    name: "",
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

    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await register(form.name, form.email, form.password);

      navigate("/profile");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-mist pt-32 pb-20">
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
            Create Account
          </p>

          <h1 className="display mt-2 text-3xl font-black">
            Join HexSoftwares
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your account to apply for internships and career
            opportunities.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-bold">Full Name</label>

              <div className="flex items-center rounded-xl bg-brand-mist px-4">
                <FiUser className="text-slate-400" />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full bg-transparent p-4 outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-bold">Email</label>

              <div className="flex items-center rounded-xl bg-brand-mist px-4">
                <FiMail className="text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full bg-transparent p-4 outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-bold">Password</label>

              <div className="flex items-center rounded-xl bg-brand-mist px-4">
                <FiLock className="text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full bg-transparent p-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {message && (
              <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-500">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-blue p-4 font-bold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-brand-blue">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
