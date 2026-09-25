import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiMail,
  FiPhone,
  FiSend,
  FiShield,
} from "react-icons/fi";
import { homeContent } from "./homeContent";

export default function ContactSection() {
  const [notice, setNotice] = useState("");
  function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\nPhone: ${form.get("phone")}\nService: ${form.get("service")}\n\n${form.get("message")}`;
    window.location.href = `mailto:info@hexsoftwares.com?subject=${encodeURIComponent("Project enquiry: " + form.get("service"))}&body=${encodeURIComponent(body)}`;
    setNotice(
      "Your email app will open with these details. Review and send the email there. If it does not open, email info@hexsoftwares.com directly.",
    );
  }
  const field =
    "w-full rounded-md border border-slate-200 bg-[#f8fafc] px-4 py-3 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  return (
    <>
      <section className="bg-[#f8fafc] py-[70px]">
        <div className="dc-container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="dc-pill mb-4">
              <FiMail /> Drop Us A Message
            </span>
            <h2 className="dc-heading !leading-[1.3]">
              Obtaining further information by{" "}
              <span className="text-[#0d6efd]">dropping a message</span> to our
              experienced IT professionals.
            </h2>
            <p className="my-6 text-[14px] leading-7 text-slate-500">
              Tell us about your project. Our team can help you explore the
              right technology, scope and budget for your requirements.
            </p>
            <ul className="space-y-4">
              {[
                [FiCheckCircle, "Project support and consultation"],
                [FiCode, "Project scope analysis and technical estimation"],
                [FiShield, "Careful handling of your project information"],
              ].map(([Icon, text]) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-[13px] font-semibold text-slate-700"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#086ad8]">
                    <Icon />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            <h3 className="dc-card-title mb-5 text-xl">Send Us A Message</h3>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="sr-only">Name</span>
                  <input
                    className={field}
                    name="name"
                    placeholder="Name *"
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  <span className="sr-only">Email</span>
                  <input
                    className={field}
                    name="email"
                    type="email"
                    placeholder="Email *"
                    autoComplete="email"
                    required
                    maxLength={200}
                  />
                </label>
              </div>
              <label className="block">
                <span className="sr-only">Mobile number</span>
                <input
                  className={field}
                  name="phone"
                  type="tel"
                  placeholder="Mobile Number *"
                  autoComplete="tel"
                  required
                  pattern="[0-9+() -]{7,20}"
                  maxLength={20}
                />
              </label>
              <label className="block">
                <span className="sr-only">Service</span>
                <select
                  className={field}
                  name="service"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Your Enquiry for
                  </option>
                  {homeContent.services.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                  <option>Any Other</option>
                </select>
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  className={`${field} min-h-28 resize-y`}
                  name="message"
                  placeholder="Please describe what you need."
                  required
                  maxLength={1500}
                />
              </label>
              <button
                type="submit"
                className="dc-primary w-full justify-center"
              >
                <FiSend /> Continue by email <FiArrowRight />
              </button>
              <p className="text-[11px] leading-5 text-slate-500">
                Opens your email app with a prepared enquiry.
              </p>
              {notice && (
                <p
                  role="status"
                  className="rounded-md bg-blue-50 p-3 text-xs leading-5 text-blue-800"
                >
                  {notice}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      <section className="dc-container grid items-center gap-8 py-12 md:grid-cols-[1fr_1.5fr]">
        <img
          src={homeContent.assets["DigiCoders Team Advice"]}
          alt="Team discussing a business project"
          loading="lazy"
          className="mx-auto max-h-[250px] w-full object-contain"
        />
        <div>
          <span className="dc-pill">Let's start a conversation</span>
          <h2 className="dc-heading mt-4">Have a project in mind?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Connect with HexSoftwares for your website, software or mobile
            application.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <a
              className="flex min-w-0 items-center gap-3"
              href="tel:+918052432951"
            >
              <span className="dc-contact-icon">
                <FiPhone />
              </span>
              <span>
                <span className="block text-[10px] font-bold tracking-wide text-slate-500">
                  CALL FOR ADVICE
                </span>
                <strong className="text-sm">+91 8052432951</strong>
              </span>
            </a>
            <a
              className="flex min-w-0 items-center gap-3"
              href="mailto:info@hexsoftwares.com"
            >
              <span className="dc-contact-icon">
                <FiMail />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-bold tracking-wide text-slate-500">
                  SAY HELLO
                </span>
                <strong className="break-all text-sm">
                  info@hexsoftwares.com
                </strong>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
