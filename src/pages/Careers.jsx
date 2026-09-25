import { useEffect, useState } from "react";

import api from "../api/axios";
import SectionTitle from "../components/SectionTitle";

import { AnimatePresence, motion } from "framer-motion";

import {
  FiArrowRight,
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiX,
  FiUploadCloud,
  FiCheckCircle,
} from "react-icons/fi";

export default function Careers() {
  const [jobs, setJobs] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);

  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    currentCompany: "",
    skills: "",
    github: "",
    linkedin: "",
    coverLetter: "",
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { data } = await api.get("/jobs");

        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("JOBS ERROR:", error);
      }
    };

    loadJobs();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openApplication = (job) => {
    setSelectedJob(job);
    setMessage("");
    setResume(null);
  };

  const closeApplication = () => {
    if (loading) return;

    setSelectedJob(null);
    setMessage("");
  };

  const normalizeUrl = (url) => {
    if (!url) return "";

    const value = url.trim();

    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }

    return `https://${value}`;
  };

  const submitApplication = async (e) => {
    e.preventDefault();

    if (!selectedJob) return;

    if (!resume) {
      setMessage("Please upload your resume.");

      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const fd = new FormData();

      fd.append("job", selectedJob._id);

      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);

      fd.append("experience", form.experience);

      fd.append("currentCompany", form.currentCompany);

      fd.append("skills", form.skills);

      fd.append("github", normalizeUrl(form.github));

      fd.append("linkedin", normalizeUrl(form.linkedin));

      fd.append("coverLetter", form.coverLetter);

      fd.append("resume", resume);

      await api.post("/job-applications", fd);

      setMessage("Application submitted successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
        experience: "",
        currentCompany: "",
        skills: "",
        github: "",
        linkedin: "",
        coverLetter: "",
      });

      setResume(null);
    } catch (error) {
      console.log("JOB APPLY ERROR:", error);

      setMessage(
        error.response?.data?.message || "Could not submit application.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Hero */}

      <section className="relative overflow-hidden bg-brand-mist py-20">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="max-w-4xl"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
              Careers at HexSoftwares
            </p>

            <h1 className="display mt-4 text-5xl font-black leading-tight md:text-6xl">
              Build what matters.
              <br />
              <span className="text-brand-blue">Grow with us.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Join a team focused on thoughtful engineering, continuous learning
              and building digital products that create practical impact.
            </p>

            <a
              href="#open-positions"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              View Open Positions
              <FiArrowRight />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Jobs */}

      <section id="open-positions" className="scroll-mt-28 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Open Positions"
            title="Find the role that fits you."
            copy="Explore current opportunities and apply directly to join HexSoftwares."
          />

          {jobs.length === 0 ? (
            <div className="rounded-[28px] bg-brand-mist p-12 text-center">
              <FiBriefcase className="mx-auto text-3xl text-brand-blue" />

              <h3 className="mt-4 text-xl font-bold">No open positions</h3>

              <p className="mt-2 text-slate-500">
                There are currently no jobs available.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="group rounded-[28px] border border-slate-200 bg-white p-6 transition hover:border-brand-blue/20 hover:shadow-xl md:p-8"
                >
                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-bold text-brand-green">
                          Hiring
                        </span>

                        {job.status && (
                          <span className="rounded-full bg-brand-blue/5 px-3 py-1 text-xs font-semibold text-brand-blue">
                            {job.status}
                          </span>
                        )}
                      </div>

                      <h3 className="display mt-4 text-2xl font-black md:text-3xl">
                        {job.title}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
                        <span className="flex items-center gap-2">
                          <FiMapPin />

                          {job.location || "Flexible"}
                        </span>

                        <span className="flex items-center gap-2">
                          <FiBriefcase />

                          {job.jobType || "Full-time"}
                        </span>

                        <span className="flex items-center gap-2">
                          <FiClock />

                          {job.experience || "Experience not specified"}
                        </span>
                      </div>

                      {job.description && (
                        <p className="mt-4 max-w-3xl leading-7 text-slate-500">
                          {job.description}
                        </p>
                      )}

                      {Array.isArray(job.skills) && job.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job.skills.slice(0, 6).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => openApplication(job)}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Apply Now
                      <FiArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && (
          <ApplicationModal
            selectedJob={selectedJob}
            form={form}
            resume={resume}
            message={message}
            loading={loading}
            handleChange={handleChange}
            setResume={setResume}
            closeApplication={closeApplication}
            submitApplication={submitApplication}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function ApplicationModal({
  selectedJob,
  form,
  resume,
  message,
  loading,
  handleChange,
  setResume,
  closeApplication,
  submitApplication,
}) {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={closeApplication}
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
      />

      <div className="pointer-events-none fixed inset-0 z-[201] flex items-center justify-center p-4">
        <motion.form
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          onSubmit={submitApplication}
          className="pointer-events-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[30px] bg-white p-6 shadow-2xl md:p-9"
        >
          <div className="flex items-start justify-between gap-5 border-b border-slate-100 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                Job Application
              </p>

              <h2 className="display mt-2 text-3xl font-black">
                Apply for {selectedJob.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {selectedJob.location} · {selectedJob.jobType}
              </p>
            </div>

            <button
              type="button"
              onClick={closeApplication}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-mist transition hover:bg-slate-200"
            >
              <FiX />
            </button>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <Input
              label="Experience"
              name="experience"
              placeholder="Example: 1 Year / Fresher"
              value={form.experience}
              onChange={handleChange}
            />

            <Input
              label="Current Company"
              name="currentCompany"
              placeholder="Optional"
              value={form.currentCompany}
              onChange={handleChange}
            />

            <Input
              label="Skills"
              name="skills"
              placeholder="React, Node.js, MongoDB..."
              value={form.skills}
              onChange={handleChange}
            />

            <Input
              label="GitHub"
              name="github"
              placeholder="github.com/username"
              value={form.github}
              onChange={handleChange}
            />

            <Input
              label="LinkedIn"
              name="linkedin"
              placeholder="linkedin.com/in/username"
              value={form.linkedin}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Cover Letter
              </label>

              <textarea
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                placeholder="Tell us briefly why you are interested in this role..."
                className="min-h-32 w-full rounded-xl bg-brand-mist p-4 outline-none transition focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Resume
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-brand-mist p-7 text-center transition hover:border-brand-blue">
                <FiUploadCloud className="text-3xl text-brand-blue" />

                <p className="mt-3 font-bold">Upload your resume</p>

                <p className="mt-1 text-xs text-slate-500">PDF, DOC or DOCX</p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                />

                {resume && (
                  <p className="mt-3 flex items-center gap-2 text-sm font-bold text-brand-green">
                    <FiCheckCircle />

                    {resume.name}
                  </p>
                )}
              </label>
            </div>
          </div>

          {message && (
            <div
              className={`mt-5 rounded-xl p-4 text-sm font-semibold ${
                message.toLowerCase().includes("success")
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-7 flex justify-end gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={closeApplication}
              className="rounded-full border border-slate-200 px-6 py-3 font-bold text-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Application"}

              {!loading && <FiArrowRight />}
            </button>
          </div>
        </motion.form>
      </div>
    </>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        required={required}
        className="w-full rounded-xl bg-brand-mist p-4 outline-none transition focus:ring-2 focus:ring-brand-blue/20"
      />
    </div>
  );
}
