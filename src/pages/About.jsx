import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLightbulb,
  FaUsers,
  FaAward,
  FaHandshake,
  FaEnvelope,
  FaPhoneAlt,
  FaGlobeAmericas,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const values = [
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    description:
      "We constantly push boundaries to deliver cutting-edge solutions that drive business growth.",
  },
  {
    icon: <FaHandshake />,
    title: "Collaboration",
    description:
      "We work closely with our clients to understand their unique needs, goals, and challenges.",
  },
  {
    icon: <FaAward />,
    title: "Excellence",
    description:
      "We maintain the highest standards of quality in every solution and every project we deliver.",
  },
  {
    icon: <FaUsers />,
    title: "Transparency",
    description:
      "We believe in open communication, honest collaboration, and complete visibility throughout development.",
  },
];

const journey = [
  {
    year: "2023",
    title: "Company Founded",
    description:
      "Hexsoftwares was established with a vision to innovate digital solutions.",
  },
  {
    year: "2023",
    title: "First Major Project",
    description:
      "Successfully delivered our first enterprise-level software solution.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description:
      "Extended our services to international markets across 5 countries.",
  },
  {
    year: "2024",
    title: "AI Integration",
    description:
      "Launched our AI and Machine Learning division with cutting-edge solutions.",
  },
  {
    year: "2024",
    title: "200+ Projects",
    description:
      "Reached the milestone of 200+ successful projects across 15+ countries.",
  },
  {
    year: "2025",
    title: "Innovation Hub",
    description:
      "Established an innovation center focused on emerging technologies.",
  },
];

const countries = [
  "India",
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "UAE",
  "Brazil",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "South Africa",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const About = () => {
  return (
    <div className="overflow-hidden bg-white text-[#1A1A1A]">
      {/* HERO */}
      <section className="relative px-6 pb-20 pt-32 md:px-10 lg:px-20 lg:pb-28">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#1565C0]/10 blur-3xl" />
          <div className="absolute right-[-100px] top-40 h-72 w-72 rounded-full bg-[#22A06B]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8edf4_1px,transparent_1px),linear-gradient(to_bottom,#e8edf4_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1565C0]/15 bg-[#1565C0]/5 px-4 py-2 text-sm font-semibold text-[#1565C0]"
            >
              <span className="h-2 w-2 rounded-full bg-[#22A06B]" />
              About Hexsoftwares
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-5xl font-[Manrope] text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl"
            >
              Innovating Digital Solutions for a{" "}
              <span className="text-[#1565C0]">Smarter Future.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl"
            >
              We help businesses transform ambitious ideas into scalable,
              intelligent, and future-ready digital products through
              engineering, AI, cloud, and modern software development.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="px-6 py-20 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#22A06B]"
            >
              Our Story
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-[Manrope] text-4xl font-bold leading-tight md:text-5xl"
            >
              From a bold idea in Kanpur to a growing global technology company.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              Hexsoftwares was founded with a simple yet powerful vision: to
              bridge the gap between innovative technology and real-world
              business solutions. Led by Mr. Kaptan, an experienced AI Engineer
              and visionary CEO, we have grown from a small startup to a
              globally recognized software development company.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg leading-8 text-gray-600"
            >
              Our journey began in Kanpur, India, and has since expanded to
              serve clients across 15+ countries. With over 200 successful
              projects, we continue to push the boundaries of software
              development, AI, and digital transformation.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#F5F7FA] px-5 py-4">
                <FaMapMarkerAlt className="text-[#1565C0]" />
                <div>
                  <p className="text-xs text-gray-500">Headquarters</p>
                  <p className="font-semibold">Ramadevi, Kanpur, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#F5F7FA] px-5 py-4">
                <FaCalendarAlt className="text-[#22A06B]" />
                <div>
                  <p className="text-xs text-gray-500">Founded</p>
                  <p className="font-semibold">2023</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-3xl bg-[#6BCB77]/20 blur-xl" />
            <div className="absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-[#1565C0]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white p-3 shadow-[0_30px_80px_rgba(20,40,80,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85"
                alt="Modern Hexsoftwares office building"
                className="h-[500px] w-full rounded-[24px] object-cover"
              />

              <div className="absolute bottom-8 left-8 rounded-2xl border border-white/50 bg-white/90 px-5 py-4 shadow-xl backdrop-blur">
                <p className="text-3xl font-bold text-[#1565C0]">200+</p>
                <p className="text-sm text-gray-600">Projects Delivered</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION VISION */}
      <section className="bg-[#F5F7FA] px-6 py-24 md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1565C0]">
              Mission & Vision
            </p>
            <h2 className="mt-4 font-[Manrope] text-4xl font-bold md:text-5xl">
              Building technology with purpose.
            </h2>
          </div>

          <div className="grid gap-7 lg:grid-cols-2">
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1565C0]/10 text-2xl text-[#1565C0]">
                <FaArrowRight />
              </div>

              <h3 className="font-[Manrope] text-2xl font-bold">Our Mission</h3>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                To empower businesses worldwide with innovative, scalable, and
                reliable technology solutions that drive growth, efficiency, and
                digital transformation.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22A06B]/10 text-2xl text-[#22A06B]">
                <FaGlobeAmericas />
              </div>

              <h3 className="font-[Manrope] text-2xl font-bold">Our Vision</h3>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                To be a global leader in innovative software solutions,
                recognized for expertise in AI, cloud technologies, and digital
                transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="px-6 py-24 md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#22A06B]">
              Our Core Values
            </p>
            <h2 className="mt-3 font-[Manrope] text-4xl font-bold md:text-5xl">
              Principles behind every product we build.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group rounded-[26px] border border-gray-200 bg-white p-7 transition-shadow hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1565C0]/10 text-2xl text-[#1565C0] transition group-hover:bg-[#1565C0] group-hover:text-white">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#1A1A1A] px-6 py-24 text-white md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#6BCB77]">
              Meet Our Leadership
            </p>
            <h2 className="mt-4 font-[Manrope] text-4xl font-bold md:text-5xl">
              Visionary leadership driving innovation and excellence.
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] lg:grid-cols-[340px_1fr]"
          >
            <div className="flex min-h-[390px] items-center justify-center bg-gradient-to-br from-[#1565C0] to-[#22A06B]">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/30 bg-white/10 text-6xl font-bold backdrop-blur">
                HK
              </div>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6BCB77]">
                Founder & CEO
              </p>

              <h3 className="mt-3 font-[Manrope] text-4xl font-bold">
                Mr. Kaptan
              </h3>

              <p className="mt-2 text-lg text-white/60">AI Engineer</p>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">
                HexSoftwares was founded in 2023 by Mr. Kaptan, a visionary
                entrepreneur passionate about technology and innovation. Under
                his leadership, the company focuses on Generative AI, Machine
                Learning, Cybersecurity, Data Science, modern software
                development, and digital transformation.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:info@hexsoftwares.com"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
                >
                  <FaEnvelope className="text-[#6BCB77]" />
                  info@hexsoftwares.com
                </a>

                <a
                  href="tel:+918052432951"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
                >
                  <FaPhoneAlt className="text-[#6BCB77]" />
                  +91 8052432951
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="px-6 py-24 md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1565C0]">
              Our Journey
            </p>
            <h2 className="mt-3 font-[Manrope] text-4xl font-bold md:text-5xl">
              Key milestones in our growth and evolution.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[18px] top-0 h-full w-px bg-gray-200 md:left-1/2" />

            <div className="space-y-10">
              {journey.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative grid md:grid-cols-2 ${
                    index % 2 === 0 ? "" : "md:text-right"
                  }`}
                >
                  <div
                    className={`ml-14 md:ml-0 ${
                      index % 2 === 0
                        ? "md:pr-16"
                        : "md:col-start-2 md:pl-16 md:text-left"
                    }`}
                  >
                    <span className="inline-flex rounded-full bg-[#1565C0]/10 px-3 py-1 text-sm font-bold text-[#1565C0]">
                      {item.year}
                    </span>

                    <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>

                    <p className="mt-2 max-w-lg leading-7 text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="absolute left-[8px] top-2 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-[#22A06B] shadow md:left-1/2 md:-translate-x-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="bg-[#F5F7FA] px-6 py-24 md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#22A06B]">
              Global Presence
            </p>
            <h2 className="mt-4 font-[Manrope] text-4xl font-bold md:text-5xl">
              Serving clients across continents.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Local expertise. Global standards. Long-term partnerships.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {countries.map((country, index) => (
              <motion.div
                key={country}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -5 }}
                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
              >
                <FaGlobeAmericas className="text-[#1565C0]" />
                <span className="font-semibold">{country}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
     
    </div>
  );
};

export default About;
