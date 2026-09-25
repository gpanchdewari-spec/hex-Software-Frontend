import { useEffect, useRef, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

import {
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiInfo,
  FiUsers,
  FiTarget,
  FiAward,
  FiCode,
  FiBriefcase,
  FiFolder,
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiMessageSquare,
} from "react-icons/fi";

import { AnimatePresence, motion } from "framer-motion";

import api from "../api/axios";
import { useUserAuth } from "../context/UserAuthContext";

export default function Navbar() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);

  const [services, setServices] = useState([]);

  const [projects, setProjects] = useState([]);

  const [jobs, setJobs] = useState([]);

  const [internships, setInternships] = useState([]);

  const { user, role, logout } = useUserAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadNavbarData = async () => {
      try {
        const [servicesRes, projectsRes, jobsRes, internshipsRes] =
          await Promise.all([
            api.get("/services"),
            api.get("/projects"),
            api.get("/jobs"),
            api.get("/internships"),
          ]);

        setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);

        setProjects(Array.isArray(projectsRes.data) ? projectsRes.data : []);

        setJobs(Array.isArray(jobsRes.data) ? jobsRes.data : []);

        setInternships(
          Array.isArray(internshipsRes.data) ? internshipsRes.data : [],
        );
      } catch (error) {
        console.log("Navbar data error:", error);
      }
    };

    loadNavbarData();
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    setActiveMenu(null);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-white/90 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto flex h-[82px] max-w-[1600px] items-center justify-between gap-5 px-8 lg:px-12 2xl:px-14">
        {/* Logo */}

        <Link to="/" className="shrink-0">
          <img
            src="/HexsoftwaresLogo.png"
            alt="HexSoftwares"
            className="h-[68px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}

        <nav className="mx-auto hidden items-center gap-1 text-[13px] font-semibold xl:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 transition ${
                isActive
                  ? "bg-brand-blue/[0.07] text-brand-blue"
                  : "text-slate-700 hover:bg-brand-mist hover:text-brand-blue"
              }`
            }
          >
            Home
          </NavLink>

          <Dropdown
            title="About"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            routeActive={location.pathname === "/about"}
            width="540px"
          >
            <AboutDropdown close={() => setActiveMenu(null)} />
          </Dropdown>

          <Dropdown
            title="Services"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            routeActive={location.pathname.startsWith("/services")}
            width="700px"
          >
            <ServicesDropdown
              services={services}
              close={() => setActiveMenu(null)}
            />
          </Dropdown>

          <Dropdown
            title="Portfolio"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            routeActive={location.pathname.startsWith("/portfolio")}
            width="620px"
          >
            <PortfolioDropdown
              projects={projects}
              close={() => setActiveMenu(null)}
            />
          </Dropdown>

          <Dropdown
            title="Careers"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            routeActive={location.pathname.startsWith("/careers")}
            width="550px"
          >
            <CareersDropdown jobs={jobs} close={() => setActiveMenu(null)} />
          </Dropdown>

          <Dropdown
            title="Internships"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            routeActive={location.pathname.startsWith("/internships")}
            width="640px"
          >
            <InternshipsDropdown
              internships={internships}
              close={() => setActiveMenu(null)}
            />
          </Dropdown>

          <Dropdown
            title="Verify"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            routeActive={location.pathname === "/certificate-verification"}
            width="480px"
          >
            <VerifyDropdown close={() => setActiveMenu(null)} />
          </Dropdown>

          <Dropdown
            title="Contact"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            routeActive={location.pathname === "/contact"}
            width="500px"
          >
            <ContactDropdown close={() => setActiveMenu(null)} />
          </Dropdown>
        </nav>

        {/* Login / Profile */}

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-full px-3 py-2.5 text-[13px] font-bold text-slate-700 transition hover:bg-brand-mist hover:text-brand-blue"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full border border-brand-blue/30 px-4 py-2.5 text-[13px] font-bold text-brand-blue transition hover:border-brand-blue hover:bg-brand-blue hover:text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                to={role === "admin" ? "/admin/dashboard" : "/profile"}
                className="flex items-center gap-2 rounded-full bg-brand-mist px-3 py-2 transition hover:bg-brand-blue/[0.08]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-black text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="max-w-[90px]">
                  <p className="truncate text-xs font-bold text-brand-ink">
                    {user?.name?.split(" ")[0] || "User"}
                  </p>

                  <p className="truncate text-[9px] text-slate-400">
                    {role === "admin" ? "Admin Panel" : "My Profile"}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-red-50 hover:text-red-500"
              >
                <FiLogOut />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Button */}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl transition hover:bg-brand-mist xl:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <MobileMenu
            user={user}
            role={role}
            handleLogout={handleLogout}
            close={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

/* Dropdown */

function Dropdown({
  title,
  activeMenu,
  setActiveMenu,
  routeActive,
  width,
  children,
}) {
  const opened = activeMenu === title;

  const timer = useRef(null);

  const openMenu = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setActiveMenu(title);
  };

  const closeMenu = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      /*
        Important:
        Agar user next dropdown par chala gaya,
        previous dropdown usko close nahi karega.
      */
      setActiveMenu((current) => {
        if (current === title) {
          return null;
        }

        return current;
      });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button
        type="button"
        onMouseEnter={openMenu}
        className={`flex items-center gap-1 rounded-full px-3 py-2 transition ${
          opened || routeActive
            ? "bg-brand-blue/[0.07] text-brand-blue"
            : "text-slate-700 hover:bg-brand-mist hover:text-brand-blue"
        }`}
      >
        {title}

        <motion.span
          animate={{
            rotate: opened ? 180 : 0,
          }}
          transition={{
            duration: 0.18,
          }}
          className="flex"
        >
          <FiChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {opened && (
          <div className="pointer-events-none fixed inset-x-0 top-[72px] z-[200] flex justify-center px-8 pt-2">
            <motion.div
              initial={{
                opacity: 0,
                y: 7,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 5,
                scale: 0.985,
              }}
              transition={{
                duration: 0.16,
                ease: "easeOut",
              }}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
              style={{
                width,
                maxWidth: "calc(100vw - 64px)",
              }}
              className="pointer-events-auto relative overflow-visible rounded-[22px] border border-slate-200 bg-white shadow-[0_24px_65px_rgba(15,23,42,0.16)]"
            >
              {/* Invisible hover bridge */}

              <div
                className="absolute -top-4 left-0 h-5 w-full"
                onMouseEnter={openMenu}
              />

              <div className="overflow-hidden rounded-[22px]">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Header inside dropdown */

function MenuHeader({ eyebrow, title, description, link, close }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-green">
          {eyebrow}
        </p>

        <h3 className="mt-1 text-[17px] font-black leading-tight text-brand-ink">
          {title}
        </h3>

        {description && (
          <p className="mt-1 max-w-[390px] text-[10.5px] leading-[17px] text-slate-500">
            {description}
          </p>
        )}
      </div>

      {link && (
        <Link
          to={link}
          onClick={close}
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[10.5px] font-bold text-brand-blue"
        >
          View All
          <FiArrowUpRight size={12} />
        </Link>
      )}
    </div>
  );
}

/* Reusable menu card */

function MenuCard({ icon: Icon, title, description, to, close }) {
  return (
    <Link
      to={to}
      onClick={close}
      className="group flex min-w-0 items-start gap-3 rounded-xl border border-transparent p-3 transition hover:border-brand-blue/10 hover:bg-brand-blue/[0.04]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
        <Icon size={15} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1">
          <h4 className="break-words text-[12.5px] font-bold leading-5 text-brand-ink transition group-hover:text-brand-blue">
            {title}
          </h4>

          <FiArrowUpRight
            size={11}
            className="shrink-0 text-brand-blue opacity-0 transition group-hover:opacity-100"
          />
        </div>

        <p className="mt-0.5 break-words text-[10px] leading-[16px] text-slate-500">
          {description}
        </p>
      </div>
    </Link>
  );
}

/* About */

function AboutDropdown({ close }) {
  return (
    <>
      <MenuHeader
        eyebrow="About Us"
        title="Get to know HexSoftwares."
        description="Our story, mission and the people behind our work."
        link="/about"
        close={close}
      />

      <div className="grid grid-cols-2 gap-1 p-3">
        <MenuCard
          icon={FiInfo}
          title="Our Story"
          description="Discover our journey and growth."
          to="/about"
          close={close}
        />

        <MenuCard
          icon={FiUsers}
          title="Leadership"
          description="Meet the people behind our team."
          to="/about"
          close={close}
        />

        <MenuCard
          icon={FiTarget}
          title="Mission & Vision"
          description="See what we're building and why."
          to="/about"
          close={close}
        />

        <MenuCard
          icon={FiAward}
          title="Our Values"
          description="Innovation, quality and transparency."
          to="/about"
          close={close}
        />
      </div>
    </>
  );
}

/* Services */

function ServicesDropdown({ services, close }) {
  return (
    <>
      <MenuHeader
        eyebrow="Our Services"
        title="Digital solutions for modern businesses."
        description="Development, AI, cloud and digital technology services."
        link="/services"
        close={close}
      />

      <div className="grid grid-cols-2 gap-1 p-3">
        {services.length > 0 ? (
          services.slice(0, 8).map((service, index) => (
            <Link
              key={service._id}
              to={`/services/${service._id}`}
              onClick={close}
              className="group flex min-w-0 items-start gap-3 rounded-xl p-3 transition hover:bg-brand-blue/[0.04]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-[10px] font-black text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-1">
                  <h4 className="break-words text-[12.5px] font-bold leading-5 text-brand-ink transition group-hover:text-brand-blue">
                    {service.title}
                  </h4>

                  <FiArrowUpRight
                    size={11}
                    className="shrink-0 text-brand-blue opacity-0 transition group-hover:opacity-100"
                  />
                </div>

                <p className="mt-0.5 line-clamp-2 break-words text-[10px] leading-[16px] text-slate-500">
                  {service.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-2 p-6 text-center text-xs text-slate-500">
            Services are loading...
          </div>
        )}
      </div>

      <BottomCTA close={close} />
    </>
  );
}

/* Portfolio */

function PortfolioDropdown({ projects, close }) {
  return (
    <>
      <MenuHeader
        eyebrow="Portfolio"
        title="Selected work from our team."
        description="Explore digital products and experiences built by HexSoftwares."
        link="/portfolio"
        close={close}
      />

      <div className="grid grid-cols-2 gap-2 p-3">
        {projects.length > 0 ? (
          projects.slice(0, 4).map((project) => (
            <Link
              key={project._id}
              to={`/portfolio/${project._id}`}
              onClick={close}
              className="group min-w-0 rounded-xl bg-brand-mist/60 p-3.5 transition hover:bg-brand-blue/[0.05]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-blue">
                  <FiFolder size={14} />
                </div>

                <FiArrowUpRight
                  size={13}
                  className="text-brand-blue opacity-0 transition group-hover:opacity-100"
                />
              </div>

              <p className="mt-3 text-[8.5px] font-bold uppercase tracking-wider text-brand-green">
                {project.category || "Project"}
              </p>

              <h4 className="mt-1 break-words text-[12.5px] font-bold leading-5 text-brand-ink transition group-hover:text-brand-blue">
                {project.title}
              </h4>

              <p className="mt-1 line-clamp-2 break-words text-[10px] leading-[16px] text-slate-500">
                {project.description}
              </p>
            </Link>
          ))
        ) : (
          <>
            <MenuCard
              icon={FiFolder}
              title="Our Projects"
              description="Explore our latest digital work."
              to="/portfolio"
              close={close}
            />

            <MenuCard
              icon={FiCode}
              title="Digital Products"
              description="Web and software experiences."
              to="/portfolio"
              close={close}
            />
          </>
        )}
      </div>
    </>
  );
}

/* Careers */

function CareersDropdown({ jobs, close }) {
  return (
    <>
      <MenuHeader
        eyebrow="Careers"
        title="Build your career with us."
        description="Explore current opportunities at HexSoftwares."
        link="/careers"
        close={close}
      />

      <div className="grid grid-cols-2 gap-1 p-3">
        {jobs.length > 0 ? (
          jobs.slice(0, 4).map((job) => (
            <Link
              key={job._id}
              to="/careers"
              onClick={close}
              className="group flex min-w-0 items-start gap-3 rounded-xl p-3 transition hover:bg-brand-mist"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <FiBriefcase size={15} />
              </div>

              <div className="min-w-0">
                <h4 className="break-words text-[12.5px] font-bold leading-5 text-brand-ink transition group-hover:text-brand-blue">
                  {job.title}
                </h4>

                <p className="mt-0.5 break-words text-[10px] leading-4 text-slate-500">
                  {job.location || "Flexible"}
                </p>

                <p className="mt-1 text-[8.5px] font-semibold text-slate-400">
                  {job.jobType || job.type || "Full-time"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <>
            <MenuCard
              icon={FiBriefcase}
              title="Open Positions"
              description="Explore available career opportunities."
              to="/careers"
              close={close}
            />

            <MenuCard
              icon={FiUsers}
              title="Join Our Team"
              description="Grow with our development team."
              to="/careers"
              close={close}
            />
          </>
        )}
      </div>
    </>
  );
}

/* Internships */

function InternshipsDropdown({ internships, close }) {
  return (
    <>
      <MenuHeader
        eyebrow="Internships"
        title="Learn. Build. Grow."
        description="Build practical skills through real-world projects."
        link="/internships"
        close={close}
      />

      <div className="grid grid-cols-2 gap-1 p-3">
        {internships.length > 0 ? (
          internships.slice(0, 6).map((item) => (
            <Link
              key={item._id}
              to="/internships"
              onClick={close}
              className="group min-w-0 rounded-xl p-3 transition hover:bg-brand-blue/[0.04]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <FiCode size={14} />
                </div>

                {item.status !== "closed" && (
                  <span className="rounded-full bg-brand-green/10 px-2 py-1 text-[8px] font-black uppercase text-brand-green">
                    Open
                  </span>
                )}
              </div>

              <h4 className="mt-2.5 break-words text-[12.5px] font-bold leading-5 text-brand-ink transition group-hover:text-brand-blue">
                {item.title}
              </h4>

              <p className="mt-1 break-words text-[9.5px] text-slate-500">
                {item.duration || "Flexible"} · {item.mode || "Remote"}
              </p>
            </Link>
          ))
        ) : (
          <>
            <MenuCard
              icon={FiCode}
              title="Internship Programs"
              description="Explore current internship opportunities."
              to="/internships"
              close={close}
            />

            <MenuCard
              icon={FiAward}
              title="Certificate"
              description="Build experience and earn certification."
              to="/internships"
              close={close}
            />
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-brand-mist/50 px-5 py-3">
        <p className="text-[9.5px] text-slate-500">
          Real Projects · Mentorship · Certificate · Placement Support
        </p>

        <Link
          to="/internships"
          onClick={close}
          className="text-[9.5px] font-bold text-brand-blue"
        >
          Apply Now →
        </Link>
      </div>
    </>
  );
}

/* Verify */

function VerifyDropdown({ close }) {
  return (
    <>
      <MenuHeader
        eyebrow="Verification"
        title="Verify your certificate."
        description="Validate credentials issued by HexSoftwares."
        close={close}
      />

      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="min-w-0 rounded-xl bg-brand-green/[0.06] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
            <FiAward size={15} />
          </div>

          <h4 className="mt-3 text-[12.5px] font-bold">Authenticity Check</h4>

          <p className="mt-1 break-words text-[9.5px] leading-[16px] text-slate-500">
            Confirm whether your certificate is authentic.
          </p>
        </div>

        <div className="min-w-0 rounded-xl bg-brand-ink p-4 text-white">
          <FiCheckCircle size={18} className="text-brand-lime" />

          <h4 className="mt-3 text-[12.5px] font-bold">Instant Verification</h4>

          <p className="mt-1 break-words text-[9.5px] leading-[16px] text-white/60">
            Enter your certificate ID and check details.
          </p>

          <Link
            to="/certificate-verification"
            onClick={close}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-2 text-[9.5px] font-bold"
          >
            Verify Now
            <FiArrowUpRight size={11} />
          </Link>
        </div>
      </div>
    </>
  );
}

/* Contact */

function ContactDropdown({ close }) {
  return (
    <>
      <MenuHeader
        eyebrow="Let's Talk"
        title="Start a conversation."
        description="Reach our team for projects, support or partnerships."
        link="/contact"
        close={close}
      />

      <div className="grid grid-cols-2 gap-1 p-3">
        <MenuCard
          icon={FiMail}
          title="Contact Our Team"
          description="Tell us about your project or requirement."
          to="/contact"
          close={close}
        />

        <MenuCard
          icon={FiMessageSquare}
          title="Project Enquiry"
          description="Discuss your next digital product."
          to="/contact"
          close={close}
        />

        <MenuCard
          icon={FiPhone}
          title="Consultation"
          description="Talk with our team about your idea."
          to="/contact"
          close={close}
        />

        <MenuCard
          icon={FiBriefcase}
          title="Partnership"
          description="Explore business collaboration."
          to="/contact"
          close={close}
        />
      </div>

      <div className="flex items-center justify-between gap-4 bg-brand-ink px-5 py-4 text-white">
        <div className="min-w-0">
          <p className="text-[8.5px] font-bold uppercase tracking-widest text-brand-lime">
            Have a project?
          </p>

          <p className="mt-1 break-words text-[13px] font-black">
            Let's build something great.
          </p>
        </div>

        <Link
          to="/contact"
          onClick={close}
          className="flex shrink-0 items-center gap-1 rounded-full bg-brand-blue px-3.5 py-2 text-[9.5px] font-bold"
        >
          Contact Us
          <FiArrowUpRight size={11} />
        </Link>
      </div>
    </>
  );
}

/* Bottom CTA */

function BottomCTA({ close }) {
  return (
    <div className="border-t border-slate-100 bg-brand-mist/50 px-5 py-3">
      <p className="text-[9.5px] text-slate-500">
        Need something custom?{" "}
        <Link
          to="/contact"
          onClick={close}
          className="font-bold text-brand-blue"
        >
          Talk to our team →
        </Link>
      </p>
    </div>
  );
}

/* Mobile Menu */

function MobileMenu({ user, role, handleLogout, close }) {
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Portfolio", "/portfolio"],
    ["Careers", "/careers"],
    ["Internships", "/internships"],
    ["Verify Certificate", "/certificate-verification"],
    ["Contact", "/contact"],
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -8,
      }}
      transition={{
        duration: 0.18,
      }}
      className="max-h-[calc(100vh-82px)] overflow-y-auto border-t border-slate-100 bg-white px-6 py-5 xl:hidden"
    >
      <div className="space-y-1">
        {links.map(([name, path]) => (
          <Link
            key={path}
            to={path}
            onClick={close}
            className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-brand-mist hover:text-brand-blue"
          >
            {name}

            <FiArrowUpRight size={14} className="text-slate-400" />
          </Link>
        ))}
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        {!user ? (
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/login"
              onClick={close}
              className="rounded-xl border border-slate-200 p-3 text-center text-sm font-bold"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={close}
              className="rounded-xl bg-brand-blue p-3 text-center text-sm font-bold text-white"
            >
              Register
            </Link>
          </div>
        ) : (
          <>
            <Link
              to={role === "admin" ? "/admin/dashboard" : "/profile"}
              onClick={close}
              className="flex items-center gap-3 rounded-2xl bg-brand-mist p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue font-black text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <p className="truncate font-bold">{user?.name || "User"}</p>

                <p className="truncate text-xs text-slate-500">
                  {role === "admin" ? "Open Admin Dashboard" : user?.email}
                </p>
              </div>
            </Link>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                to={role === "admin" ? "/admin/dashboard" : "/profile"}
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 p-3 text-sm font-bold"
              >
                <FiUser />

                {role === "admin" ? "Dashboard" : "Profile"}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-500"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
