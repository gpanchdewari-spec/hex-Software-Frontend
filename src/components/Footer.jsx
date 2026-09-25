import { Link } from "react-router-dom";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
  FiGithub,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#020817] text-white">
      {/* background effects */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Main Footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 font-black text-blue-400">
                &lt;/&gt;
              </div>

              <div>
                <h2 className="text-xl font-black tracking-wide">
                  HEXSOFTWARES
                </h2>

                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  Building Technology. Building Futures.
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/50">
              Building digital solutions for businesses and creating
              opportunities for the next generation of tech professionals.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                <FiLinkedin />
              </SocialLink>

              <SocialLink href="https://instagram.com" label="Instagram">
                <FiInstagram />
              </SocialLink>

              <SocialLink href="https://youtube.com" label="YouTube">
                <FiYoutube />
              </SocialLink>

              <SocialLink href="https://github.com" label="GitHub">
                <FiGithub />
              </SocialLink>
            </div>
          </div>

          {/* Solutions */}
          <FooterColumn title="Solutions">
            <FooterLink to="/services">Web Development</FooterLink>

            <FooterLink to="/services">App Development</FooterLink>

            <FooterLink to="/services">Custom Software</FooterLink>

            <FooterLink to="/services">AI & Automation</FooterLink>

            <FooterLink to="/services">Cloud & SaaS</FooterLink>

            <FooterLink to="/services">UI/UX Design</FooterLink>
          </FooterColumn>

          {/* Careers */}
          <FooterColumn title="Careers">
            <FooterLink to="/internships">Internships</FooterLink>

            <FooterLink to="/careers">Jobs & Opportunities</FooterLink>

            <FooterLink to="/certificate-verification">
              Certificate Verification
            </FooterLink>

            <FooterLink to="/login">Student Login</FooterLink>
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            <FooterLink to="/about">About Us</FooterLink>

            <FooterLink to="/portfolio">Portfolio</FooterLink>

            <FooterLink to="/services">Services</FooterLink>

            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterColumn>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-black">Contact Us</h4>

            <div className="mt-5 space-y-4">
              <ContactItem
                icon={FiMail}
                href="mailto:info@hexsoftwares.com"
                text="info@hexsoftwares.com"
              />

              <ContactItem
                icon={FiPhone}
                href="tel:+918052432951"
                text="+91 80524 32951"
              />

              <div className="flex items-start gap-3 text-sm text-white/50">
                <FiMapPin className="mt-1 shrink-0 text-blue-400" />

                <span>
                  Kanpur, Uttar Pradesh
                  <br />
                  India
                </span>
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-400 transition hover:text-blue-300"
            >
              Contact our team
              <FiArrowUpRight />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} HexSoftwares. All Rights Reserved.</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>

            <Link to="/refund-policy" className="transition hover:text-white">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-black text-white">{title}</h4>

      <div className="mt-5 space-y-3">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block w-fit text-sm text-white/50 transition duration-200 hover:translate-x-1 hover:text-blue-400"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/55 transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-400"
    >
      {children}
    </a>
  );
}

function ContactItem({ icon: Icon, href, text }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 text-sm text-white/50 transition hover:text-white"
    >
      <Icon className="shrink-0 text-blue-400" />

      <span>{text}</span>
    </a>
  );
}
