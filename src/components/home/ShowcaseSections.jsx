import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiPause,
  FiPlay,
  FiAward,
} from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { homeContent } from "./homeContent";

export function SectionHeading({
  lead,
  accent,
  subtitle,
  children,
  centered = false,
}) {
  return (
    <div
      className={`mb-7 flex flex-wrap items-center justify-between gap-4 ${centered ? "text-center" : ""}`}
    >
      <div className={centered ? "w-full" : ""}>
        <h2 className="dc-heading">
          {lead} <span className="text-[#0d6efd]">{accent}</span>
        </h2>
        {subtitle && (
          <p className="mt-2 text-[14px] leading-6 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
export function ClientsBanner() {
  return (
    <>
      <section
        className="flex flex-col items-center gap-5 border-b border-slate-100 bg-white px-4 py-5 shadow-sm sm:flex-row sm:px-9"
        aria-label="Reference client logos"
      >
        <div className="shrink-0 text-sm font-bold text-slate-800 sm:border-r sm:pr-6">
          Client <span className="text-[#086ad8]">Showcase</span>
          <span className="mt-1 block text-[10px] font-normal text-slate-400">
            DigiCoders reference gallery
          </span>
        </div>
        <div className="dc-marquee min-w-0 flex-1 max-sm:w-full">
          <div className="dc-track dc-client-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-10 pr-10"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {homeContent.clients.map((c) => (
                  <img
                    key={c.image}
                    src={c.image}
                    alt={copy === 0 ? c.name : ""}
                    loading="lazy"
                    className="h-10 w-24 object-contain"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="dc-container py-10">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-md border border-sky-200 bg-gradient-to-r from-sky-50 to-sky-100 px-5 py-5 text-center text-sm">
          <span className="inline-flex items-center gap-2 rounded bg-[#086ad8] px-4 py-2 font-bold text-white shadow-md">
            <FiAward /> HexSoftwares
          </span>
          <span>
            <strong>Technology built around your business</strong>{" "}
            <span className="mx-2">•</span>{" "}
            <strong className="text-sky-700">
              Ideas. Innovation. Digital Solutions.
            </strong>
          </span>
        </div>
      </div>
    </>
  );
}
function ShowcaseCard({ item, software = false }) {
  const contents = (
    <>
      <div className="flex h-[230px] items-center justify-center overflow-hidden bg-slate-50 p-2">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-4">
        <h3 className="dc-card-title mb-6 truncate text-center">{item.name}</h3>
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
            {software ? "Software" : item.type}
          </span>
          <span className="ml-auto rounded-lg bg-[#e26324] px-3.5 py-2 text-xs font-bold text-white shadow-md">
            {software ? "Explore" : "Enquiry"}
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#01964a] text-white shadow-md">
            <FiArrowRight />
          </span>
        </div>
      </div>
    </>
  );
  return (
    <Link
      to={software ? "/services" : "/contact"}
      className="dc-card group block h-full"
    >
      {contents}
    </Link>
  );
}
export function SoftwareSolutions() {
  return (
    <section className="dc-container pb-[50px] pt-5" id="software-products">
      <SectionHeading
        centered
        lead="Our"
        accent="Software Solutions"
        subtitle="Transform your business with powerful software solutions from HexSoftwares."
      />
      <div className="grid gap-x-[30px] gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {homeContent.software.map((item) => (
          <ShowcaseCard key={item.image} item={item} software />
        ))}
      </div>
    </section>
  );
}
export function ExpertTeam() {
  const list = useRef(null),
    reduced = useReducedMotion();
  const [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (paused || hovered || reduced) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      const el = list.current;
      if (!el) return;
      const next = el.scrollLeft + el.clientWidth;
      if (next >= el.scrollWidth - 10)
        el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, hovered, reduced]);
  const move = (d) => {
    setPaused(true);
    list.current?.scrollBy({
      left: d * list.current.clientWidth,
      behavior: reduced ? "instant" : "smooth",
    });
  };
  return (
    <section
      className="bg-[#f8f9fa] px-4 py-[60px] lg:px-12"
      aria-label="DigiCoders reference team gallery"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(e) => {
        if (!e.target.closest("[data-team-play]")) setPaused(true);
      }}
    >
      <SectionHeading
        lead="Expert Team at"
        accent="HexSoftwares"
        subtitle="Experienced. Creative. Passionate. — reference team gallery"
      >
        <div className="flex gap-2">
          <button
            type="button"
            className="dc-control"
            aria-label="Previous team members"
            onClick={() => move(-1)}
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            className="dc-control"
            aria-label="Next team members"
            onClick={() => move(1)}
          >
            <FiChevronRight />
          </button>
          {!reduced && (
            <button
              type="button"
              data-team-play
              className="dc-control"
              aria-label={paused ? "Play team carousel" : "Pause team carousel"}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <FiPlay /> : <FiPause />}
            </button>
          )}
        </div>
      </SectionHeading>
      <div
        ref={list}
        className="dc-team-list flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        tabIndex={0}
        aria-label="Team members; scroll for more"
      >
        {homeContent.team.map((person) => (
          <article
            key={person.image}
            className="dc-team-card shrink-0 snap-start rounded-md border border-slate-200 bg-white px-3 py-3.5 text-center shadow-sm"
          >
            <img
              src={person.image}
              alt={person.name}
              loading="lazy"
              className="mb-3 h-[320px] w-full rounded-md bg-slate-50 object-cover object-top min-[481px]:h-[260px] md:h-[210px]"
            />
            <h3 className="truncate text-[15px] font-extrabold text-[#086ad8]">
              {person.name}
            </h3>
            <p className="mt-1 truncate text-xs text-slate-500">
              {person.role}
            </p>
            <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
              {[FaWhatsapp, FaFacebookF, FaInstagram].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-sky-100 text-xs text-sky-600"
                >
                  <Icon />
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Projects() {
  return (
    <section className="dc-container py-[50px]">
      <SectionHeading
        lead="Recent"
        accent="Project Showcase"
        subtitle="Original project visuals from the DigiCoders reference."
      >
        <Link className="dc-text-link" to="/portfolio">
          Our portfolio <FiArrowRight />
        </Link>
      </SectionHeading>
      <div className="grid gap-x-[30px] gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {homeContent.projects.map((item) => (
          <ShowcaseCard key={item.image} item={item} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/portfolio" className="dc-primary">
          View Our Projects <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}
