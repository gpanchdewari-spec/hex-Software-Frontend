import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPhone,
  FiMapPin,
  FiMail,
  FiBriefcase,
  FiVolume2,
} from "react-icons/fi";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { hexSite } from "../../config/hexSite";

const items = [
  {
    icon: FiPhone,
    label: "Call Us",
    value: "+91 8052432951",
    href: "tel:+918052432951",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: FiMapPin,
    label: "Kanpur",
    value: "Ramadevi, UP, India",
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    icon: FiMail,
    label: "Email Us",
    value: "info@hexsoftwares.com",
    href: "mailto:info@hexsoftwares.com",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: FiBriefcase,
    label: "Let's Build",
    value: "Web • Apps • Software",
    to: "/services",
    color: "text-orange-500 bg-orange-50",
  },
];
function Info({ item }) {
  const Icon = item.icon;
  const content = (
    <>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${item.color}`}
      >
        <Icon aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <strong className="block text-xs text-slate-800">{item.label}</strong>
        <span className="block whitespace-nowrap text-[11px] text-slate-500">
          {item.value}
        </span>
      </span>
    </>
  );
  const cls =
    "flex w-[225px] shrink-0 items-center gap-3 border-r border-slate-200 px-5";
  return item.href ? (
    <a className={cls} href={item.href}>
      {content}
    </a>
  ) : item.to ? (
    <Link className={cls} to={item.to}>
      {content}
    </Link>
  ) : (
    <div className={cls}>{content}</div>
  );
}
export default function HomeTopBars() {
  return (
    <div className="dc-topbars">
      <div className="flex min-h-[38px] flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-gradient-to-r from-[#00458e] via-[#006cd8] to-[#003673] px-4 py-[7px] text-center text-[12px] text-white sm:text-[13.5px]">
        <FiVolume2 className="shrink-0 text-yellow-300" aria-hidden="true" />
        <strong>Build your future with HexSoftwares!</strong>
        <span>Explore our latest career & internship opportunities.</span>
        <Link
          to="/careers"
          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-0.5 text-[11px] font-bold text-[#086ad8]"
        >
          View opportunities <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="flex min-h-[70px] flex-wrap items-center gap-3 border-b border-slate-100 bg-white px-4 py-3 lg:flex-nowrap lg:px-5">
        <Link
          to="/internships"
          className="flex shrink-0 items-center gap-2 text-xs text-slate-700"
        >
          <span className="text-lg text-[#086ad8]">🎓</span>
          <span className="hidden xl:inline">Our Internship Programs |</span>
          <strong className="flex items-center gap-1 text-[#086ad8]">
            Explore Now <FiArrowRight />
          </strong>
        </Link>
        <div
          className="dc-marquee min-w-0 flex-1"
          aria-label="HexSoftwares contact details"
        >
          <div className="dc-track dc-contact-track">
            <div className="flex shrink-0">
              {items.map((x) => (
                <Info key={x.label} item={x} />
              ))}
            </div>
            <div className="flex shrink-0" aria-hidden="true" inert={true}>
              {items.map((x) => (
                <Info key={x.label} item={x} />
              ))}
            </div>
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <a
            aria-label="Chat with HexSoftwares on WhatsApp"
            href="https://wa.me/918052432951"
            className="dc-social text-green-500"
          >
            <FaWhatsapp />
          </a>
          <a
            aria-label="Email HexSoftwares"
            href="mailto:info@hexsoftwares.com"
            className="dc-social text-blue-600"
          >
            <FiMail />
          </a>
          {hexSite.linkedin && (
            <a
              aria-label="HexSoftwares LinkedIn"
              href={hexSite.linkedin}
              className="dc-social text-blue-700"
            >
              <FaLinkedinIn />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
