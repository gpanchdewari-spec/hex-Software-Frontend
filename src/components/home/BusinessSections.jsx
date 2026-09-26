import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiCode,
  FiGlobe,
  FiUsers,
  FiCheck,
  FiCalendar,
} from "react-icons/fi";
import { homeContent } from "./homeContent";
import { SectionHeading } from "./ShowcaseSections";
import { hexSite } from "../../config/hexSite";

export function WhyChooseUs() {
  return (
    <section className="dc-container py-[50px]">
      <SectionHeading
        centered
        lead="Why Choose"
        accent="HexSoftwares?"
        subtitle="We combine creativity, technology and strategy to deliver outstanding results."
      />
      <div className="grid gap-[30px] lg:grid-cols-2">
        <article className="dc-card flex flex-col p-6 lg:p-7">
          <span className="dc-pill self-start">
            <FiAward /> Built for your business
          </span>
          <div className="my-6 flex flex-wrap items-center gap-5">
            <span className="text-[82px] font-extrabold leading-none tracking-[-2px] text-[#c49a6c]">
              {hexSite.stats[0].value}
            </span>
            <div>
              <h3 className="dc-card-title text-[23px]">Projects Delivered</h3>
              <p className="mt-1 text-[13px] font-semibold text-slate-500">
                Delivering digital solutions
              </p>
            </div>
          </div>
          <p className="mb-6 text-[13px] leading-[1.7] text-slate-600">
            HexSoftwares builds custom software, mobile applications and modern
            websites. We help businesses bring ideas to life with thoughtful
            design, reliable development and ongoing support.
          </p>
          <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            <span className="dc-chip">
              <FiCode /> Experienced development team
            </span>
            <span className="dc-chip">
              <FiCheckCircle /> Client-focused solutions
            </span>
          </div>
        </article>
        <article className="grid items-center gap-4 rounded-md border border-sky-200 bg-gradient-to-br from-blue-50 to-sky-100 p-6 sm:grid-cols-[1.4fr_1fr] lg:p-7">
          <div>
            <h3 className="dc-card-title text-[24px] leading-snug">
              Let's{" "}
              <span className="text-[#0d6efd]">
                Build Something
                <br />
                Amazing
              </span>{" "}
              Together
            </h3>
            <p className="my-4 text-[13px] leading-[1.7] text-slate-600">
              We focus on the growth of your business. From your first website
              to custom software, our team helps you choose and build the right
              digital solution.
            </p>
            <Link to="/about" className="dc-primary">
              Discover Now <FiArrowRight />
            </Link>
          </div>
          <img
            src={homeContent.assets["DigiCoders Rocket Laptop Illustration"]}
            alt="Rocket launching from a laptop"
            loading="lazy"
            className="mx-auto max-h-[210px] w-full object-contain"
          />
        </article>
      </div>
    </section>
  );
}
export function AboutCards() {
  const content = [
    {
      title: "Who we are?",
      text: "HexSoftwares is a software development team building practical digital solutions for businesses.",
      label: "About Us",
      to: "/about",
    },
    {
      title: "What We Do",
      text: "We build websites, software and mobile applications, alongside internship and learning opportunities.",
      label: "IT Solutions",
      to: "/services",
    },
    {
      title: "How We Do It",
      text: "We combine clear communication, thoughtful design and modern development to deliver your project.",
      label: "Our Work Culture",
      to: "/about",
    },
  ];
  return (
    <section className="bg-[#f8f9fa] py-[60px]">
      <div className="dc-container">
        <div className="grid gap-[30px] md:grid-cols-3">
          {content.map((item, i) => (
            <article
              key={item.title}
              className="flex flex-col border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={homeContent.about[i].image}
                alt={item.title}
                loading="lazy"
                className="h-auto w-full"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="dc-card-title text-xl">{item.title}</h3>
                <p className="mb-5 mt-3 flex-1 text-[13.5px] leading-6 text-slate-500">
                  {item.text}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs">
                  <span className="font-semibold text-slate-700">
                    {item.label}
                  </span>
                  <Link className="dc-text-link !text-xs" to={item.to}>
                    Discover Now <FiArrowRight />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center text-sm text-slate-600">
          Challenges are just opportunities in disguise.{" "}
          <Link className="font-semibold text-[#086ad8]" to="/contact">
            Take the challenge!
          </Link>
        </p>
      </div>
    </section>
  );
}
export function ServicesGrid() {
  return (
    <section className="dc-container py-[70px]" id="home-services">
      <div className="mb-3 text-center">
        <span className="dc-pill">An Umbrella Solution for All IT Needs</span>
      </div>
      <SectionHeading
        centered
        lead={
          <>
            Reach out to the world's most
            <br />
          </>
        }
        accent="reliable IT services."
      />
      <div className="dc-service-grid">
        {homeContent.services.map((s, i) => (
          <Link
            to="/services"
            key={s.name}
            className={`dc-service-card ${i === 0 ? "dc-service-active" : ""}`}
          >
            <img
              className="mb-4 h-[60px] w-[60px] object-contain"
              src={s.image}
              alt=""
              loading="lazy"
            />
            <h3 className="mb-3 text-[15px] font-bold leading-snug text-slate-800">
              {s.name}
            </h3>
            <p className="mb-4 flex-1 text-[12.5px] leading-[1.6] text-slate-500">
              {s.description}
            </p>
            <span className="flex w-full items-center justify-center gap-2 border-t border-slate-100 pt-3 text-[12px] font-bold text-[#0056b3]">
              Discover now <FiArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function StatsBanner() {
  const icons = [FiCode, FiGlobe, FiCheckCircle, FiUsers];
  return (
    <section className="dc-container py-8">
      <div className="grid gap-8 rounded-md bg-gradient-to-br from-[#086ad8] to-[#03489e] px-7 py-10 text-white shadow-xl sm:grid-cols-2 lg:grid-cols-4">
        {hexSite.stats.map((stat, i) => {
          const Icon = icons[i];
          return (
            <div
              key={stat.label}
              className="flex items-center justify-center gap-4"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-2xl">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <strong className="text-[30px] font-extrabold">
                  {stat.value}
                </strong>
                <p className="text-xs text-blue-100">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
const packages = [
  {
    name: "Website Starter",
    price: "9999",
    features: [
      "1 Year Domain",
      "1 Year Hosting",
      "Dynamic Website",
      "Official 5 Emails",
      "Basic SEO",
      "Many More...",
    ],
  },
  {
    name: "Mobile App Starter",
    price: "24999",
    features: [
      "E Commerce App",
      "Taxi Booking App",
      "Food Delivery App",
      "Gaming Tournaments App",
      "Service App",
      "MLM Application",
      "Many more...",
    ],
  },
  {
    name: "Software Starter",
    price: "15999",
    features: [
      "Billing Software",
      "Inventory Software",
      "CRM & ERP",
      "School Management ERP",
      "MLM Software",
      "Many More...",
    ],
  },
];
export function Pricing() {
  return (
    <section className="dc-container pb-10 pt-[70px]">
      <span className="dc-pill mb-3">Pricing and Packages</span>
      <SectionHeading
        lead="Find the right package for"
        accent="your next project."
      >
        <Link className="dc-text-link" to="/services">
          Explore All Services <FiArrowRight />
        </Link>
      </SectionHeading>
      <p className="mb-6 text-xs text-slate-500">
        Reference packages shown for comparison. Contact HexSoftwares for
        current scope and pricing.
      </p>
      <div className="grid gap-[30px] md:grid-cols-3">
        {packages.map((p, i) => (
          <article
            key={p.name}
            className="dc-card relative flex flex-col overflow-hidden px-7 pb-8 pt-10 text-center"
          >
            {i === 1 && (
              <span className="absolute -right-10 top-6 rotate-45 bg-[#b58b5d] px-10 py-1 text-[9px] font-bold tracking-wider text-white">
                MOST POPULAR
              </span>
            )}
            <p className="text-[13px] font-bold uppercase tracking-wider text-slate-600">
              {p.name}
            </p>
            <div className="mx-auto my-6 flex h-[110px] w-[110px] items-center justify-center rounded-full border border-slate-200 bg-white p-3 shadow-sm">
              <img
                src="/HexsoftwaresLogo.png"
                alt="HexSoftwares"
                className="max-h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <p className="mb-6">
              <sup className="mr-1 text-xl font-bold">₹</sup>
              <strong className="text-[46px] font-extrabold tracking-tight">
                {p.price}
              </strong>
              <span className="text-xs font-semibold text-slate-500">
                {" "}
                /onward
              </span>
            </p>
            <Link
              to="/services"
              className={`mb-7 rounded border px-5 py-3 text-sm font-bold ${i === 1 ? "border-[#086ad8] bg-[#086ad8] text-white" : "border-slate-300 text-[#086ad8] hover:bg-blue-50"}`}
            >
              Explore package
            </Link>
            <ul className="mx-auto space-y-4 text-left text-sm text-slate-600">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <FiCheck className="shrink-0 text-[#086ad8]" />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Insights() {
  return (
    <section className="bg-[#f8fafc] py-[60px]">
      <div className="dc-container">
        <SectionHeading
          lead="Latest"
          accent="Insights"
          subtitle="Industry articles from the reference website."
        />
        <div className="grid gap-[30px] md:grid-cols-2">
          {homeContent.blogs.map((blog) => (
            <article className="dc-card overflow-hidden" key={blog.image}>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="relative block"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="h-[270px] w-full object-cover"
                />
                <span className="absolute bottom-3 left-4 rounded bg-[#086ad8] px-3 py-1 text-xs font-semibold text-white">
                  {blog.category}
                </span>
              </a>
              <div className="p-6">
                <p className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                  <FiCalendar />
                  {blog.date} · DigiCoders
                </p>
                <h3 className="dc-card-title mb-4 text-xl leading-snug">
                  {blog.title}
                </h3>
                <a
                  className="dc-text-link"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read More <FiArrowRight />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Technologies() {
  return (
    <section className="bg-[#0b132b] py-10 text-white">
      <div className="dc-container grid items-center gap-8 md:grid-cols-[1fr_3fr]">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-300">
            Technologies
          </p>
          <h2 className="dc-heading !text-white">We Work With</h2>
          <p className="mt-3 text-[13px] leading-6 text-slate-300">
            Modern technologies for secure, future-ready solutions.
          </p>
        </div>
        <div className="dc-marquee">
          <div className="dc-track dc-tech-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 gap-5 pr-5"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {homeContent.tech.map((t) => (
                  <div
                    key={t.image}
                    className="flex w-[112px] shrink-0 flex-col items-center rounded-lg border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <img
                      src={t.image}
                      alt=""
                      className="mb-3 h-12 w-12 rounded-lg object-contain"
                      loading="lazy"
                    />
                    <span className="text-center text-xs">{t.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
