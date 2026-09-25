import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiLogOut,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

import api from "../api/axios";
import { useUserAuth } from "../context/UserAuthContext";

export default function Profile() {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD LOGGED-IN USER APPLICATIONS
  // ==========================================

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setApplicationsLoading(true);
        setError("");

        const userToken = localStorage.getItem("userToken");

        if (!userToken) {
          navigate("/login");
          return;
        }

        const { data } = await api.get("/applications/mine", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setApplications(data);
      } catch (error) {
        console.error("MY APPLICATIONS ERROR:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("userToken");

          logout();

          navigate("/login");

          return;
        }

        setError(
          error.response?.data?.message || "Could not load applications.",
        );
      } finally {
        setApplicationsLoading(false);
      }
    };

    loadApplications();
  }, [navigate]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  // ==========================================
  // COUNTS
  // ==========================================

  const shortlistedCount = applications.filter(
    (application) => application.status === "shortlisted",
  ).length;

  const selectedCount = applications.filter(
    (application) => application.status === "selected",
  ).length;

  return (
    <main className="min-h-screen bg-brand-mist pb-20 pt-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* =====================================
            HEADER
        ===================================== */}

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
            My Account
          </p>

          <h1 className="display mt-2 text-4xl font-black md:text-5xl">
            Welcome, {user?.name}
          </h1>

          <p className="mt-3 text-slate-500">
            Manage your profile and track your internship applications.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* =====================================
              LEFT PROFILE CARD
          ===================================== */}

          <div>
            <div className="sticky top-28 rounded-[28px] bg-white p-7 shadow-sm">
              {/* AVATAR */}

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue text-3xl font-black text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <h2 className="mt-5 text-2xl font-bold">{user?.name}</h2>

              <p className="mt-1 text-sm text-slate-500">Student Account</p>

              <div className="mt-7 space-y-3">
                {/* NAME */}

                <div className="flex items-center gap-3 rounded-xl bg-brand-mist p-4">
                  <FiUser className="shrink-0 text-brand-blue" />

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Full Name</p>

                    <p className="truncate font-semibold">{user?.name}</p>
                  </div>
                </div>

                {/* EMAIL */}

                <div className="flex items-center gap-3 rounded-xl bg-brand-mist p-4">
                  <FiMail className="shrink-0 text-brand-blue" />

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Email</p>

                    <p className="truncate font-semibold">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* EXPLORE */}

              <button
                onClick={() => navigate("/internships")}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue p-4 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Internships
                <FiArrowRight />
              </button>

              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-ink p-4 font-bold text-white transition hover:opacity-90"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>

          {/* =====================================
              RIGHT SIDE
          ===================================== */}

          <div>
            {/* =====================================
                STATS
            ===================================== */}

            <div className="grid gap-4 sm:grid-cols-3">
              {/* APPLICATIONS */}

              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <FiBriefcase />
                </div>

                <p className="mt-4 text-3xl font-black">
                  {applications.length}
                </p>

                <p className="text-sm text-slate-500">Applications</p>
              </div>

              {/* SHORTLISTED */}

              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FiClock />
                </div>

                <p className="mt-4 text-3xl font-black">{shortlistedCount}</p>

                <p className="text-sm text-slate-500">Shortlisted</p>
              </div>

              {/* SELECTED */}

              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <FiCheckCircle />
                </div>

                <p className="mt-4 text-3xl font-black">{selectedCount}</p>

                <p className="text-sm text-slate-500">Selected</p>
              </div>
            </div>

            {/* =====================================
                MY APPLICATIONS
            ===================================== */}

            <div className="mt-6 rounded-[28px] bg-white p-7 shadow-sm">
              {/* HEADER */}

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand-green">
                    Internships
                  </p>

                  <h2 className="mt-1 text-2xl font-black">My Applications</h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Track the status of your internship applications.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/internships")}
                  className="w-fit rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Explore Internships
                </button>
              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-500">
                  {error}
                </div>
              )}

              {/* LOADING */}

              {applicationsLoading ? (
                <div className="mt-8 rounded-2xl bg-brand-mist p-10 text-center">
                  <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-brand-blue" />

                  <p className="mt-4 font-semibold text-slate-500">
                    Loading applications...
                  </p>
                </div>
              ) : applications.length === 0 ? (
                /* =====================================
                    NO APPLICATIONS
                ===================================== */

                <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                  <FiBriefcase className="mx-auto text-4xl text-slate-300" />

                  <h3 className="mt-4 text-lg font-bold">
                    No applications yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    You haven't applied for an internship yet. Explore available
                    opportunities and start your career journey.
                  </p>

                  <button
                    onClick={() => navigate("/internships")}
                    className="mt-5 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white"
                  >
                    Find Internships
                  </button>
                </div>
              ) : (
                /* =====================================
                    APPLICATION LIST
                ===================================== */

                <div className="mt-8 space-y-4">
                  {applications.map((application) => (
                    <ApplicationCard
                      key={application._id}
                      application={application}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* =====================================
                INFORMATION
            ===================================== */}

            <div className="mt-6 rounded-[28px] bg-brand-ink p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">
                Application Process
              </p>

              <h2 className="mt-2 text-2xl font-black">
                What happens after you apply?
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["01", "Application Submitted"],
                  ["02", "Application Review"],
                  ["03", "Shortlisting"],
                  ["04", "Final Selection"],
                ].map(([number, title]) => (
                  <div
                    key={number}
                    className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-black">
                      {number}
                    </div>

                    <span className="text-sm font-semibold text-white/80">
                      {title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ======================================================
// APPLICATION CARD
// ======================================================

function ApplicationCard({ application }) {
  const statusStyles = {
    pending: "border-amber-200 bg-amber-50 text-amber-600",

    shortlisted: "border-blue-200 bg-blue-50 text-blue-600",

    selected: "border-green-200 bg-green-50 text-green-600",

    rejected: "border-red-200 bg-red-50 text-red-500",
  };

  const statusLabels = {
    pending: "Pending",
    shortlisted: "Shortlisted",
    selected: "Selected",
    rejected: "Rejected",
  };

  const status = application.status || "pending";

  return (
    <div className="rounded-[22px] border border-slate-100 bg-brand-mist/40 p-5 transition hover:border-brand-blue/10 hover:shadow-sm">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        {/* LEFT */}

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">
            Internship Application
          </p>

          <h3 className="mt-2 text-lg font-black text-brand-ink">
            {application.internship?.title || "Internship Program"}
          </h3>

          {/* DETAILS */}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
            {/* DURATION */}

            {application.duration && (
              <span className="flex items-center gap-1.5">
                <FiClock />

                {application.duration}
              </span>
            )}

            {/* MODE */}

            {application.internship?.mode && (
              <span>{application.internship.mode}</span>
            )}

            {/* DATE */}

            {application.createdAt && (
              <span className="flex items-center gap-1.5">
                <FiCalendar />

                {new Date(application.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>

        {/* STATUS */}

        <div>
          <span
            className={`inline-flex rounded-full border px-4 py-2 text-xs font-bold ${
              statusStyles[status] || statusStyles.pending
            }`}
          >
            {statusLabels[status] || status}
          </span>
        </div>
      </div>

      {/* STATUS MESSAGE */}

      <div className="mt-4 border-t border-slate-200/70 pt-4">
        <StatusMessage status={status} />
      </div>
    </div>
  );
}

// ======================================================
// STATUS MESSAGE
// ======================================================

function StatusMessage({ status }) {
  if (status === "selected") {
    return (
      <p className="text-sm font-semibold text-green-600">
        🎉 Congratulations! You have been selected for this internship.
      </p>
    );
  }

  if (status === "shortlisted") {
    return (
      <p className="text-sm font-semibold text-blue-600">
        Your application has been shortlisted. Keep an eye on your email for
        further updates.
      </p>
    );
  }

  if (status === "rejected") {
    return (
      <p className="text-sm text-slate-500">
        This application was not selected. You can explore and apply for other
        opportunities.
      </p>
    );
  }

  return (
    <p className="text-sm text-slate-500">
      Your application has been received and is currently under review.
    </p>
  );
}
