import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import SectionTitle from "../components/SectionTitle";

import { AnimatePresence, motion } from "framer-motion";

import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiInstagram,
  FiUsers,
} from "react-icons/fi";

import { useUserAuth } from "../context/UserAuthContext";

const heroSlides = [
  {
    image: "/internship/hero-1.jpg",
    tag: "Real Projects",
    title: "Build real projects that strengthen your portfolio.",
    text: "Work on practical projects designed around real industry requirements.",
  },
  {
    image: "/internship/hero-2.jpg",
    tag: "Mentor Guidance",
    title: "Learn directly through practical mentor guidance.",
    text: "Get structured learning support and feedback while improving your skills.",
  },
  {
    image: "/internship/hero-3.jpg",
    tag: "Career Growth",
    title: "Turn your learning into career-ready experience.",
    text: "Develop practical skills, build your portfolio and prepare for opportunities.",
  },
];

const reviewVideos = [
  {
    name: "Rahul Sharma",
    role: "MERN Stack Intern",
    video: "/reviews/review-1.mp4",
    poster: "/reviews/review-1.jpg",
    instagramUrl: "#",
  },
  {
    name: "Priya Singh",
    role: "Frontend Developer Intern",
    video: "/reviews/review-2.mp4",
    poster: "/reviews/review-2.jpg",
    instagramUrl: "#",
  },
  {
    name: "Aditya Kumar",
    role: "Web Development Intern",
    video: "/reviews/review-3.mp4",
    poster: "/reviews/review-3.jpg",
    instagramUrl: "#",
  },
  {
    name: "Sneha Gupta",
    role: "React Developer Intern",
    video: "/reviews/review-4.mp4",
    poster: "/reviews/review-4.jpg",
    instagramUrl: "#",
  },
];

export default function Internships() {
  const navigate = useNavigate();
  const { user } = useUserAuth();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    graduationYear: "",
    duration: "3 Months",
    skills: "",
    github: "",
    linkedin: "",
    message: "",
  });

  const [resume, setResume] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInternships = async () => {
      try {
        const { data } = await api.get("/internships");

        setData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Internship load error:", error);
      }
    };

    loadInternships();
  }, []);

  const handleApply = (internship) => {
    if (!user) {
      navigate("/login", {
        state: {
          from: "/internships",
        },
      });

      return;
    }

    setSelected(internship);

    setForm((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
      duration: internship.duration || prev.duration,
    }));

    setMsg("");

    setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const normalizeUrl = (url) => {
    if (!url) return "";

    const trimmedUrl = url.trim();

    if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
      return trimmedUrl;
    }

    return `https://${trimmedUrl}`;
  };

  async function submit(e) {
    e.preventDefault();

    if (!selected) {
      setMsg("Please select an internship first.");
      return;
    }

    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "github" || key === "linkedin") {
        fd.append(key, normalizeUrl(value));
      } else {
        fd.append(key, value);
      }
    });

    fd.append("internship", selected._id);

    if (resume) {
      fd.append("resume", resume);
    }

    try {
      setLoading(true);
      setMsg("");

      await api.post("/applications", fd, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setMsg("Application submitted successfully.");

      setForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        college: "",
        course: "",
        graduationYear: "",
        duration: "3 Months",
        skills: "",
        github: "",
        linkedin: "",
        message: "",
      });

      setResume(null);
    } catch (error) {
      console.error("APPLICATION SUBMIT ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("userToken");

        setMsg("Your session has expired. Please login again.");

        setTimeout(() => {
          navigate("/login");
        }, 1000);

        return;
      }

      setMsg(error.response?.data?.message || "Could not submit application.");
    } finally {
      setLoading(false);
    }
  }

  const benefits = [
    {
      icon: FiFileText,
      title: "Real Projects",
      text: "Work on practical assignments and portfolio-ready projects.",
    },
    {
      icon: FiUsers,
      title: "Mentor Guidance",
      text: "Learn with guidance from experienced professionals.",
    },
    {
      icon: FiAward,
      title: "Internship Certificate",
      text: "Receive a completion certificate after successful completion.",
    },
    {
      icon: FiBriefcase,
      title: "Placement Support",
      text: "Get career guidance, interview preparation and placement support.",
    },
  ];

  return (
    <main className="pt-28">
      {/* Hero */}

      <section className="relative overflow-hidden bg-brand-mist py-20">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <div className="inline-flex rounded-full border border-brand-green/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                Career Focused Internships
              </div>

              <h1 className="display mt-5 text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
                Learn skills.
                <br />
                <span className="text-brand-blue">Build real projects.</span>
                <br />
                Start your career.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Join HexSoftwares internship programs and gain practical
                experience through real-world projects, mentor guidance,
                industry-oriented learning and career support.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#internships"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  Explore Internships
                  <FiArrowRight />
                </a>

                <a
                  href="#certificate"
                  className="rounded-full border border-slate-200 bg-white px-6 py-4 font-bold transition hover:border-brand-blue hover:text-brand-blue"
                >
                  View Sample Certificate
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-brand-green" />1 / 3 / 6 Month
                  Programs
                </span>

                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-brand-green" />
                  Internship Certificate
                </span>

                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-brand-green" />
                  Placement Support
                </span>
              </div>
            </motion.div>

            <HeroImageSlider />
          </div>
        </div>
      </section>

      {/* Benefits */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Why Join" title="More than an internship." />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-xl text-brand-blue">
                    <Icon />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

                  <p className="mt-3 leading-7 text-slate-500">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Review Videos */}

      <ReviewVideoSlider />

      {/* Internship Programs */}

      <section id="internships" className="scroll-mt-28 bg-brand-mist py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Internship Programs"
            title="Choose the path you want to build your career in."
          />

          {data.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center">
              <p className="font-semibold text-slate-500">
                No internship programs available right now.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.map((x, index) => (
                <motion.div
                  key={x._id}
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
                  whileHover={{
                    y: -7,
                  }}
                  className="group rounded-[28px] border border-white bg-white p-6 shadow-sm transition hover:shadow-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-extrabold text-brand-blue">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-bold text-brand-green">
                      Applications Open
                    </span>
                  </div>

                  <h3 className="display mt-5 text-2xl font-bold">{x.title}</h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-brand-blue/5 px-3 py-2 text-xs font-semibold text-brand-blue">
                      <FiClock />

                      {x.duration}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold">
                      {x.mode}
                    </span>
                  </div>

                  <p className="mt-5 leading-7 text-slate-600">
                    {x.description}
                  </p>

                  {Array.isArray(x.skills) && x.skills.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {x.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleApply(x)}
                    className="mt-7 inline-flex items-center gap-2 font-bold text-brand-blue transition hover:gap-3"
                  >
                    Apply Now
                    <FiArrowRight />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certificate */}

      <section id="certificate" className="scroll-mt-28 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
                Internship Certificate
              </p>

              <h2 className="display mt-3 text-4xl font-bold md:text-5xl">
                Showcase your internship experience.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                After successful completion of the internship program, eligible
                interns can receive an internship completion certificate that
                can be used in resumes, portfolios and professional profiles.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Student name",
                  "Internship domain",
                  "Program duration",
                  "Certificate ID",
                  "Issue date",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <FiCheckCircle className="text-brand-green" />

                    <span className="font-semibold text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                rotate: 2,
              }}
              whileInView={{
                opacity: 1,
                rotate: 0,
              }}
              viewport={{
                once: true,
              }}
              className="rounded-[28px] bg-brand-mist p-4 shadow-xl"
            >
              <img
                src="/sample-internship-certificate.jpg"
                alt="Sample HexSoftwares internship certificate"
                className="w-full rounded-[20px] border bg-white object-cover"
              />

              <p className="mt-4 text-center text-xs text-slate-500">
                Sample certificate for representation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Placement Support */}

      <section className="bg-brand-ink py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-lime">
                Career & Placement Support
              </p>

              <h2 className="display mt-3 text-4xl font-bold md:text-5xl">
                Internship experience that supports your next career step.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
                Our focus is not only on completing an internship. We help
                students understand industry expectations and prepare for future
                job opportunities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Resume Guidance",
                "Interview Preparation",
                "Portfolio Guidance",
                "Career Guidance",
                "Technical Skill Improvement",
                "Placement Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <FiCheckCircle className="shrink-0 text-brand-lime" />

                  <span className="font-semibold text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}

      {selected && user && (
        <section id="application-form" className="scroll-mt-28 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <form
              onSubmit={submit}
              className="grid gap-5 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl md:grid-cols-2 md:p-10"
            >
              <div className="md:col-span-2">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-green">
                      Internship Application
                    </p>

                    <h2 className="display mt-2 text-3xl font-bold md:text-4xl">
                      Apply for {selected.title}
                    </h2>

                    <p className="mt-3 text-slate-500">
                      Fill in your details and submit your application.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setMsg("");
                    }}
                    className="w-fit rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-6 rounded-2xl border border-brand-blue/10 bg-brand-blue/[0.04] p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                    Applying as
                  </p>

                  <p className="mt-1 font-bold text-brand-ink">{user.name}</p>

                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>

              {[
                ["name", "Full Name"],
                ["email", "Email Address"],
                ["phone", "Phone Number"],
                ["college", "College / University"],
                ["course", "Course"],
                ["graduationYear", "Graduation Year"],
                ["skills", "Your Skills"],
                ["github", "GitHub URL"],
                ["linkedin", "LinkedIn URL"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    {label}
                  </label>

                  <input
                    type={
                      key === "email"
                        ? "email"
                        : key === "phone"
                          ? "tel"
                          : "text"
                    }
                    required={["name", "email", "phone"].includes(key)}
                    placeholder={label}
                    className="w-full rounded-xl bg-brand-mist p-4 outline-none transition focus:ring-2 focus:ring-brand-blue/20"
                    value={form[key]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [key]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Internship Duration
                </label>

                <select
                  className="w-full rounded-xl bg-brand-mist p-4 outline-none"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: e.target.value,
                    })
                  }
                >
                  <option value="1 Month">1 Month</option>

                  <option value="3 Months">3 Months</option>

                  <option value="6 Months">6 Months</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Upload Resume
                </label>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  className="w-full rounded-xl bg-brand-mist p-4"
                />

                {resume && (
                  <p className="mt-2 text-xs font-semibold text-brand-green">
                    Selected: {resume.name}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Message
                </label>

                <textarea
                  placeholder="Tell us why you're interested in this internship..."
                  className="min-h-32 w-full rounded-xl bg-brand-mist p-4 outline-none transition focus:ring-2 focus:ring-brand-blue/20"
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-brand-blue p-4 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>

              {msg && (
                <p
                  className={`flex items-center rounded-xl p-4 font-semibold ${
                    msg.toLowerCase().includes("success")
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {msg}
                </p>
              )}
            </form>
          </div>
        </section>
      )}
    </main>
  );
}

function HeroImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const slide = heroSlides[current];

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
      }}
      className="relative"
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-[34px] bg-brand-ink shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{
              opacity: 0,
              scale: 1.05,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.65,
            }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-5">
          <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            HexSoftwares Internship
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={previousSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow transition hover:bg-white"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow transition hover:bg-white"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
          <span className="inline-flex rounded-full bg-brand-blue px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
            {slide.tag}
          </span>

          <h2 className="mt-3 max-w-lg text-2xl font-black leading-tight text-white md:text-3xl">
            {slide.title}
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">
            {slide.text}
          </p>

          <div className="mt-5 flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl sm:block">
        <p className="text-2xl font-black text-brand-blue">200+</p>

        <p className="mt-0.5 text-xs font-semibold text-slate-500">
          Projects Delivered
        </p>
      </div>
    </motion.div>
  );
}

function ReviewVideoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);

  const goToSlide = (index, playVideo = false) => {
    if (index < 0 || index >= reviewVideos.length) {
      return;
    }

    setActiveIndex(index);

    videoRefs.current.forEach((video, videoIndex) => {
      if (video && videoIndex !== index) {
        video.pause();
      }
    });

    const container = sliderRef.current;
    const card = cardRefs.current[index];

    if (container && card) {
      const left =
        card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;

      container.scrollTo({
        left,
        behavior: "smooth",
      });
    }

    if (playVideo) {
      setTimeout(() => {
        const video = videoRefs.current[index];

        if (video) {
          video.play().catch(() => {});
        }
      }, 450);
    }
  };

  const previousSlide = () => {
    const nextIndex =
      activeIndex === 0 ? reviewVideos.length - 1 : activeIndex - 1;

    goToSlide(nextIndex, true);
  };

  const nextSlide = () => {
    const nextIndex =
      activeIndex === reviewVideos.length - 1 ? 0 : activeIndex + 1;

    goToSlide(nextIndex, true);
  };

  const handleCardClick = (index) => {
    if (index !== activeIndex) {
      goToSlide(index, true);
      return;
    }

    const video = videoRefs.current[index];

    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <section id="reviews" className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* heading */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-pink-600">
            <FiInstagram />
            Student Reviews
          </div>

          <h2 className="display mt-5 text-4xl font-black leading-tight md:text-5xl">
            Real stories from{" "}
            <span className="text-brand-blue">our interns.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Hear directly from students about their internship experience,
            practical learning and projects at HexSoftwares.
          </p>
        </div>

        {/* slider */}

        <div className="relative mx-auto mt-12 max-w-[700px]">
          <div
            ref={sliderRef}
            className="
    flex
    snap-x
    snap-mandatory
    gap-4
    overflow-x-hidden
    scroll-smooth
    px-[calc(50%-105px)]
    sm:px-[calc(50%-115px)]
    lg:px-[calc(50%-125px)]
  "
          >
            {reviewVideos.map((review, index) => {
              const active = index === activeIndex;

              return (
                <motion.div
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  key={`${review.name}-${index}`}
                  onClick={() => handleCardClick(index)}
                  animate={{
                    scale: active ? 1 : 0.88,
                    opacity: active ? 1 : 0.48,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
  w-[210px]
  shrink-0
  cursor-pointer
  snap-center
  sm:w-[230px]
  lg:w-[250px]
"
                >
                  <div
                    className={`relative overflow-hidden rounded-[30px] bg-brand-ink transition-all duration-300 ${
                      active
                        ? "shadow-[0_25px_70px_rgba(15,23,42,0.22)]"
                        : "shadow-md"
                    }`}
                  >
                    <div className="relative aspect-[9/16] overflow-hidden bg-black">
                      <video
                        ref={(element) => {
                          videoRefs.current[index] = element;
                        }}
                        src={review.video}
                        poster={review.poster}
                        playsInline
                        preload="metadata"
                        controls={active}
                        onPlay={() => {
                          videoRefs.current.forEach((video, videoIndex) => {
                            if (video && videoIndex !== index) {
                              video.pause();
                            }
                          });
                        }}
                        className="h-full w-full object-cover"
                        onClick={(e) => {
                          if (!active) {
                            e.preventDefault();
                          }
                        }}
                      />

                      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
                        <span className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                          <FiInstagram />
                          Intern Review
                        </span>

                        <span className="rounded-full bg-black/40 px-2.5 py-1 text-[9px] font-bold text-white backdrop-blur-md">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {!active && (
                        <>
                          <div className="pointer-events-none absolute inset-0 bg-black/25" />

                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 text-xl text-white backdrop-blur-md">
                              <FiArrowRight />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="bg-brand-ink p-4 text-white">
                      <p className="truncate text-sm font-bold">
                        {review.name}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-white/50">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* left arrow */}

          <button
            type="button"
            onClick={previousSlide}
            className="
              absolute
              left-2
              top-1/2
              z-30
              flex
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-lg
              shadow-lg
              transition
              hover:bg-brand-blue
              hover:text-white
              md:-left-5
            "
          >
            <FiChevronLeft />
          </button>

          {/* right arrow */}

          <button
            type="button"
            onClick={nextSlide}
            className="
              absolute
              right-2
              top-1/2
              z-30
              flex
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-brand-blue
              text-lg
              text-white
              shadow-lg
              transition
              hover:scale-105
              md:-right-5
            "
          >
            <FiChevronRight />
          </button>
        </div>

        {/* dots */}

        <div className="mt-8 flex items-center justify-center gap-2">
          {reviewVideos.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index, false)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-8 bg-brand-blue" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>

        <p className="mt-5 text-center text-xs font-medium text-slate-400">
          Click a side video to bring it into focus.
        </p>
      </div>
    </section>
  );
}
