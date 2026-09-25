import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiCode,
  FiFolder,
  FiBriefcase,
  FiUsers,
  FiAward,
  FiMessageSquare,
  FiMail,
  FiLogOut,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSave,
  FiEye,
  FiFileText,
  FiRefreshCw,
  FiMenu,
} from "react-icons/fi";

import api from "../api/axios";

const menu = [
  { key: "dashboard", label: "Dashboard", icon: FiGrid },
  { key: "services", label: "Services", icon: FiCode },
  { key: "projects", label: "Projects", icon: FiFolder },
  { key: "jobs", label: "Jobs", icon: FiBriefcase },
  { key: "jobApplications", label: "Job Applications", icon: FiFileText },
  { key: "internships", label: "Internships", icon: FiUsers },
  { key: "applications", label: "Internship Applications", icon: FiFileText },
  { key: "certificates", label: "Certificates", icon: FiAward },
  { key: "testimonials", label: "Testimonials", icon: FiMessageSquare },
  { key: "contact", label: "Contact Leads", icon: FiMail },
];

const endpoints = {
  services: "/services",
  projects: "/projects",
  jobs: "/jobs",
  jobApplications: "/job-applications",
  internships: "/internships",
  applications: "/applications",
  certificates: "/certificates",
  testimonials: "/testimonials",
  contact: "/contact",
};

const emptyForms = {
  services: {
    title: "",
    description: "",
    features: "",
    technologies: "",
  },

  projects: {
    title: "",
    category: "Web",
    description: "",
    stack: "",
    results: "",
    imageFile: null,
  },

  jobs: {
    title: "",
    location: "",
    jobType: "",
    experience: "",
    skills: "",
    description: "",
    status: "open",
  },

  internships: {
    title: "",
    domain: "",
    duration: "3 Months",
    mode: "Remote",
    description: "",
    skills: "",
    status: "open",
  },

  certificates: {
    certificateId: "",
    studentName: "",
    domain: "",
    duration: "",
    issueDate: "",
    certificateUrl: "",
    status: "verified",
  },

  testimonials: {
    name: "",
    position: "",
    company: "",
    image: "",
    message: "",
    rating: 5,
  },
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const loadAll = async () => {
    try {
      setLoading(true);

      const results = await Promise.all(
        Object.entries(endpoints).map(async ([key, endpoint]) => {
          try {
            const res = await api.get(endpoint);

            return [key, Array.isArray(res.data) ? res.data : []];
          } catch (error) {
            console.log(`${key} error`, error);

            if (error.response?.status === 401) {
              throw error;
            }

            return [key, []];
          }
        }),
      );

      setData(Object.fromEntries(results));
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSection = async (section = active) => {
    if (!endpoints[section]) return;

    try {
      const { data } = await api.get(endpoints[section]);

      setData((prev) => ({
        ...prev,
        [section]: Array.isArray(data) ? data : [],
      }));
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const openCreate = () => {
    setEditId(null);
    setFormError("");
    setForm({
      ...emptyForms[active],
    });

    setFormOpen(true);
  };

  const openEdit = (item) => {
    setFormError("");

    const newForm = {
      ...item,
    };

    newForm.imageFile = null;

    if (Array.isArray(item.features)) {
      newForm.features = item.features.join(", ");
    }

    if (Array.isArray(item.technologies)) {
      newForm.technologies = item.technologies.join(", ");
    }

    if (Array.isArray(item.stack)) {
      newForm.stack = item.stack.join(", ");
    }

    if (Array.isArray(item.skills)) {
      newForm.skills = item.skills.join(", ");
    }

    if (item.issueDate) {
      newForm.issueDate = item.issueDate.slice(0, 10);
    }

    setEditId(item._id);
    setForm(newForm);
    setFormOpen(true);
  };

  const preparePayload = () => {
    const payload = {
      ...form,
    };

    const arrayFields = ["features", "technologies", "stack", "skills"];

    arrayFields.forEach((field) => {
      if (typeof payload[field] === "string") {
        payload[field] = payload[field]
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean);
      }
    });

    delete payload._id;
    delete payload.__v;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.imageFile;
    delete payload.imagePublicId;

    return payload;
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      if (active === "projects") {
        const formData = new FormData();

        formData.append("title", form.title?.trim() || "");
        formData.append("category", form.category?.trim() || "Web");
        formData.append("description", form.description?.trim() || "");
        formData.append("results", form.results?.trim() || "");

        if (Array.isArray(form.stack)) {
          formData.append("stack", JSON.stringify(form.stack));
        } else {
          formData.append("stack", form.stack || "");
        }

        if (form.imageFile instanceof File) {
          formData.append("image", form.imageFile);
        }

        if (editId) {
          await api.put(`/projects/${editId}`, formData);
          showMessage("Project updated successfully");
        } else {
          await api.post("/projects", formData);
          showMessage("Project created successfully");
        }
      } else {
        const payload = preparePayload();

        if (editId) {
          await api.put(`${endpoints[active]}/${editId}`, payload);
          showMessage("Updated successfully");
        } else {
          await api.post(endpoints[active], payload);
          showMessage("Created successfully");
        }
      }

      setFormOpen(false);
      setEditId(null);
      setForm({});
      await loadSection(active);
    } catch (error) {
      console.error("SAVE ERROR:", error);
      console.error("SERVER RESPONSE:", error.response?.data);

      const errorMessage =
        error.response?.data?.message || error.message || "Request failed";

      setFormError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (section, id) => {
    const ok = window.confirm("Are you sure you want to delete this record?");

    if (!ok) return;

    try {
      await api.delete(`${endpoints[section]}/${id}`);

      showMessage("Deleted successfully");

      await loadSection(section);
    } catch (error) {
      showMessage(error.response?.data?.message || "Delete failed");
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}`, {
        status,
      });

      setData((prev) => ({
        ...prev,

        applications: prev.applications.map((item) =>
          item._id === id ? { ...item, status } : item,
        ),
      }));

      showMessage("Status updated");
    } catch (error) {
      showMessage("Could not update status");
    }
  };

  const updateJobApplicationStatus = async (id, status) => {
    try {
      await api.put(`/job-applications/${id}`, {
        status,
      });

      setData((prev) => ({
        ...prev,
        jobApplications: (prev.jobApplications || []).map((item) =>
          item._id === id ? { ...item, status } : item,
        ),
      }));

      showMessage("Job application status updated");
    } catch (error) {
      console.log("JOB APPLICATION UPDATE ERROR:", error);
      showMessage(
        error.response?.data?.message || "Could not update job application",
      );
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, {
        status,
      });

      setData((prev) => ({
        ...prev,

        contact: prev.contact.map((item) =>
          item._id === id ? { ...item, status } : item,
        ),
      }));

      showMessage("Lead updated");
    } catch (error) {
      showMessage("Could not update lead");
    }
  };

  const counts = {
    services: data.services?.length || 0,
    projects: data.projects?.length || 0,
    jobs: data.jobs?.length || 0,
    jobApplications: data.jobApplications?.length || 0,
    internships: data.internships?.length || 0,
    applications: data.applications?.length || 0,
    certificates: data.certificates?.length || 0,
    testimonials: data.testimonials?.length || 0,
    contact: data.contact?.length || 0,
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[270px] bg-brand-ink p-5 text-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-brand-lime">
              HEXSOFTWARES
            </p>

            <h2 className="text-xl font-black">Admin Panel</h2>
          </div>

          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FiX size={22} />
          </button>
        </div>

        <div className="mt-8 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active === item.key
                    ? "bg-brand-blue text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon />

                {item.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={logout}
          className="absolute bottom-6 left-5 right-5 flex items-center justify-center gap-2 rounded-xl bg-white/10 p-3 text-sm font-bold transition hover:bg-red-500"
        >
          <FiLogOut />
          Logout
        </button>
      </aside>

      <div className="lg:ml-[270px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white/90 px-5 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl lg:hidden"
            >
              <FiMenu />
            </button>

            <div>
              <h1 className="text-xl font-black capitalize">
                {active === "dashboard" ? "Dashboard" : active}
              </h1>

              <p className="text-xs text-slate-500">
                HexSoftwares administration
              </p>
            </div>
          </div>

          <button
            onClick={loadAll}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mist"
          >
            <FiRefreshCw />
          </button>
        </header>

        <main className="p-5 md:p-8">
          {message && (
            <div className="mb-5 rounded-xl bg-brand-blue/10 p-4 text-sm font-bold text-brand-blue">
              {message}
            </div>
          )}

          {loading ? (
            <div className="grid min-h-[70vh] place-items-center">
              <div>
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-blue" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading dashboard...
                </p>
              </div>
            </div>
          ) : active === "dashboard" ? (
            <DashboardHome
              counts={counts}
              applications={data.applications || []}
              contacts={data.contact || []}
              setActive={setActive}
            />
          ) : active === "applications" ? (
            <Applications
              rows={data.applications || []}
              updateStatus={updateApplicationStatus}
              remove={(id) => remove("applications", id)}
            />
          ) : active === "jobApplications" ? (
            <JobApplications
              rows={data.jobApplications || []}
              updateStatus={updateJobApplicationStatus}
              remove={(id) => remove("jobApplications", id)}
            />
          ) : active === "contact" ? (
            <Contacts
              rows={data.contact || []}
              updateStatus={updateContactStatus}
              remove={(id) => remove("contact", id)}
            />
          ) : (
            <CrudSection
              title={active}
              rows={data[active] || []}
              onCreate={openCreate}
              onEdit={openEdit}
              onDelete={(id) => remove(active, id)}
            />
          )}
        </main>
      </div>

      {formOpen && (
        <FormModal
          type={active}
          form={form}
          setForm={setForm}
          editId={editId}
          close={() => {
            setFormOpen(false);
            setEditId(null);
          }}
          save={save}
          saving={saving}
          formError={formError}
        />
      )}
    </div>
  );
}

function DashboardHome({ counts, applications, contacts, setActive }) {
  const cards = [
    ["Services", counts.services, FiCode, "services"],
    ["Projects", counts.projects, FiFolder, "projects"],
    ["Jobs", counts.jobs, FiBriefcase, "jobs"],
    ["Job Applications", counts.jobApplications, FiFileText, "jobApplications"],
    ["Internships", counts.internships, FiUsers, "internships"],
    ["Applications", counts.applications, FiFileText, "applications"],
    ["Certificates", counts.certificates, FiAward, "certificates"],
    ["Testimonials", counts.testimonials, FiMessageSquare, "testimonials"],
    ["Contact Leads", counts.contact, FiMail, "contact"],
  ];

  const pending = applications.filter((x) => x.status === "pending").length;

  const selected = applications.filter((x) => x.status === "selected").length;

  return (
    <>
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-brand-green">
          Overview
        </p>

        <h2 className="mt-2 text-4xl font-black">Welcome back, Admin.</h2>

        <p className="mt-2 text-slate-500">
          Manage your website content and student applications from one place.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, value, Icon, key]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="rounded-[24px] border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
              <Icon />
            </div>

            <p className="mt-5 text-3xl font-black">{value}</p>

            <p className="mt-1 text-sm text-slate-500">{title}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] bg-brand-ink p-7 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-lime">
            Internships
          </p>

          <h3 className="mt-2 text-2xl font-black">Application overview</h3>

          <div className="mt-7 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/[0.06] p-4">
              <p className="text-3xl font-black">{applications.length}</p>
              <p className="mt-1 text-xs text-white/50">Total</p>
            </div>

            <div className="rounded-2xl bg-white/[0.06] p-4">
              <p className="text-3xl font-black">{pending}</p>
              <p className="mt-1 text-xs text-white/50">Pending</p>
            </div>

            <div className="rounded-2xl bg-white/[0.06] p-4">
              <p className="text-3xl font-black">{selected}</p>
              <p className="mt-1 text-xs text-white/50">Selected</p>
            </div>
          </div>

          <button
            onClick={() => setActive("applications")}
            className="mt-6 rounded-xl bg-brand-blue px-5 py-3 text-sm font-bold"
          >
            Manage Applications
          </button>
        </div>

        <div className="rounded-[28px] bg-white p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
            Leads
          </p>

          <h3 className="mt-2 text-2xl font-black">Contact enquiries</h3>

          <p className="mt-6 text-5xl font-black text-brand-blue">
            {contacts.length}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Total enquiries received from the website.
          </p>

          <button
            onClick={() => setActive("contact")}
            className="mt-6 rounded-xl bg-brand-ink px-5 py-3 text-sm font-bold text-white"
          >
            View Leads
          </button>
        </div>
      </div>
    </>
  );
}

function CrudSection({ title, rows, onCreate, onEdit, onDelete }) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-green">
            Management
          </p>

          <h2 className="mt-1 text-3xl font-black capitalize">{title}</h2>

          <p className="mt-1 text-sm text-slate-500">{rows.length} records</p>
        </div>

        <button
          onClick={onCreate}
          className="flex w-fit items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-white"
        >
          <FiPlus />
          Add New
        </button>
      </div>

      <div className="mt-7 overflow-hidden rounded-[26px] border border-slate-200 bg-white">
        {rows.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            No records available.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {rows.map((item) => (
              <div
                key={item._id}
                className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center"
              >
                <div className="min-w-0">
                  <h3 className="font-bold">{getTitle(item)}</h3>

                  <p className="mt-1 max-w-3xl truncate text-sm text-slate-500">
                    {getDescription(item)}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    onClick={() => onDelete(item._id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Applications({ rows, updateStatus, remove }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-widest text-brand-green">
        Students
      </p>

      <h2 className="mt-1 text-3xl font-black">Internship Applications</h2>

      <p className="mt-2 text-slate-500">
        Review students and update application status.
      </p>

      <div className="mt-7 overflow-x-auto rounded-[26px] border bg-white">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b bg-brand-mist text-left">
              <th className="p-4 text-xs">Student</th>

              <th className="p-4 text-xs">Internship</th>

              <th className="p-4 text-xs">College</th>

              <th className="p-4 text-xs">Status</th>

              <th className="p-4 text-xs">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-4">
                  <p className="font-bold">{item.name}</p>

                  <p className="text-xs text-slate-500">{item.email}</p>
                </td>

                <td className="p-4 text-sm">
                  {item.internship?.title || "Internship"}

                  <p className="text-xs text-slate-400">{item.duration}</p>
                </td>

                <td className="p-4">
                  <p className="text-sm font-semibold">{item.college || "-"}</p>

                  <p className="text-xs text-slate-400">{item.course || "-"}</p>
                </td>

                <td className="p-4">
                  <select
                    value={item.status || "pending"}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                    className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold"
                  >
                    <option value="pending">Pending</option>

                    <option value="shortlisted">Shortlisted</option>

                    <option value="selected">Selected</option>

                    <option value="rejected">Rejected</option>
                  </select>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(item)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue"
                    >
                      <FiEye />
                    </button>

                    {item.resumeUrl && (
                      <a
                        href={item.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600"
                      >
                        <FiFileText />
                      </a>
                    )}

                    <button
                      onClick={() => remove(item._id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <ApplicationDetails item={selected} close={() => setSelected(null)} />
      )}
    </div>
  );
}

function ApplicationDetails({ item, close }) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-7">
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-brand-green">
              Application
            </p>

            <h2 className="mt-1 text-2xl font-black">{item.name}</h2>
          </div>

          <button onClick={close}>
            <FiX size={22} />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Info label="Email" value={item.email} />

          <Info label="Phone" value={item.phone} />

          <Info label="College" value={item.college} />

          <Info label="Course" value={item.course} />

          <Info label="Graduation Year" value={item.graduationYear} />

          <Info label="Skills" value={item.skills} />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border px-4 py-3 text-sm font-bold"
            >
              GitHub
            </a>
          )}

          {item.linkedin && (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border px-4 py-3 text-sm font-bold"
            >
              LinkedIn
            </a>
          )}

          {item.resumeUrl && (
            <a
              href={item.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-brand-blue px-4 py-3 text-sm font-bold text-white"
            >
              Resume
            </a>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-brand-mist p-5">
          <p className="text-xs font-bold uppercase text-slate-400">Message</p>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            {item.message || "No message provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

function JobApplications({ rows, updateStatus, remove }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-widest text-brand-green">
        Careers
      </p>

      <div className="mt-1 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-black">Job Applications</h2>

          <p className="mt-2 text-slate-500">
            Review candidates who applied through the Careers page.
          </p>
        </div>

        <div className="w-fit rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-bold text-brand-blue">
          {rows.length} Applications
        </div>
      </div>

      <div className="mt-7 overflow-x-auto rounded-[26px] border border-slate-200 bg-white">
        {rows.length === 0 ? (
          <div className="p-16 text-center">
            <FiBriefcase className="mx-auto text-3xl text-slate-300" />

            <h3 className="mt-4 font-bold">No job applications yet</h3>

            <p className="mt-2 text-sm text-slate-500">
              Applications submitted from the Careers page will appear here.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b bg-brand-mist text-left">
                <th className="p-4 text-xs">Candidate</th>
                <th className="p-4 text-xs">Applied For</th>
                <th className="p-4 text-xs">Experience</th>
                <th className="p-4 text-xs">Status</th>
                <th className="p-4 text-xs">Applied</th>
                <th className="p-4 text-xs">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((item) => (
                <tr key={item._id} className="border-b border-slate-100">
                  <td className="p-4">
                    <p className="font-bold">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.email}</p>
                    <p className="text-xs text-slate-400">{item.phone}</p>
                  </td>

                  <td className="p-4">
                    <p className="font-semibold">{item.job?.title || "Job"}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {item.job?.location || "-"}
                    </p>
                  </td>

                  <td className="p-4 text-sm">
                    {item.experience || "Fresher"}
                  </td>

                  <td className="p-4">
                    <select
                      value={item.status || "pending"}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview">Interview</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="p-4 text-sm text-slate-500">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue"
                        title="View Application"
                      >
                        <FiEye />
                      </button>

                      {item.resumeUrl && (
                        <a
                          href={item.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600"
                          title="View Resume"
                        >
                          <FiFileText />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => remove(item._id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500"
                        title="Delete Application"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <JobApplicationDetails
          item={selected}
          close={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function JobApplicationDetails({ item, close }) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
              Job Application
            </p>

            <h2 className="mt-1 text-3xl font-black">{item.name}</h2>

            <p className="mt-1 text-sm text-slate-500">
              Applied for <strong>{item.job?.title || "Job"}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mist"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Info label="Email" value={item.email} />
          <Info label="Phone" value={item.phone} />
          <Info label="Experience" value={item.experience} />
          <Info label="Current Company" value={item.currentCompany} />
          <Info label="Skills" value={item.skills} />
          <Info label="Status" value={item.status} />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border px-4 py-3 text-sm font-bold"
            >
              GitHub
            </a>
          )}

          {item.linkedin && (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border px-4 py-3 text-sm font-bold"
            >
              LinkedIn
            </a>
          )}

          {item.resumeUrl && (
            <a
              href={item.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-brand-blue px-5 py-3 text-sm font-bold text-white"
            >
              View Resume
            </a>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-brand-mist p-5">
          <p className="text-xs font-bold uppercase text-slate-400">
            Cover Letter
          </p>

          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
            {item.coverLetter || "No cover letter provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Contacts({ rows, updateStatus, remove }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-widest text-brand-green">
        Leads
      </p>

      <h2 className="mt-1 text-3xl font-black">Contact Enquiries</h2>

      <div className="mt-7 space-y-4">
        {rows.map((item) => (
          <div key={item._id} className="rounded-[24px] bg-white p-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row">
              <div>
                <h3 className="text-lg font-black">{item.name}</h3>

                <p className="mt-1 text-sm text-slate-500">{item.email}</p>

                <p className="text-sm text-slate-500">{item.phone}</p>
              </div>

              <div className="flex items-start gap-3">
                <select
                  value={item.status || "new"}
                  onChange={(e) => updateStatus(item._id, e.target.value)}
                  className="rounded-xl border px-3 py-2 text-sm"
                >
                  <option value="new">New</option>

                  <option value="contacted">Contacted</option>

                  <option value="closed">Closed</option>
                </select>

                <button
                  onClick={() => remove(item._id)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Info label="Company" value={item.company} />

              <Info label="Service" value={item.service} />

              <Info label="Budget" value={item.budget} />
            </div>

            {item.message && (
              <p className="mt-4 rounded-xl bg-brand-mist p-4 text-sm text-slate-600">
                {item.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FormModal({
  type,
  form,
  setForm,
  editId,
  close,
  save,
  saving,
  formError,
}) {
  const fields = getFields(type);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={save}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white p-7"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
              {editId ? "Edit Record" : "New Record"}
            </p>

            <h2 className="mt-1 text-2xl font-black capitalize">{type}</h2>
          </div>

          <button type="button" onClick={close}>
            <FiX size={22} />
          </button>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={form[field.name] ?? ""}
              change={(value) =>
                setForm({
                  ...form,
                  [field.name]: value,
                })
              }
            />
          ))}
        </div>

        {formError && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
            {formError}
          </div>
        )}

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            disabled={saving}
            className="rounded-xl border px-5 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave />
            {saving ? "Saving..." : editId ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ field, value, change }) {
  if (field.type === "file") {
    return (
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-bold">{field.label}</label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-brand-mist p-6 transition hover:border-brand-blue">
          <FiPlus className="text-2xl text-brand-blue" />

          <p className="mt-2 font-bold">Choose Project Image</p>

          <p className="mt-1 text-xs text-slate-500">
            JPG, PNG or WEBP · Max 5MB
          </p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => change(e.target.files?.[0] || null)}
          />

          {value instanceof File && (
            <p className="mt-3 text-sm font-bold text-brand-green">
              {value.name}
            </p>
          )}
        </label>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={field.full ? "md:col-span-2" : ""}>
        <label className="mb-2 block text-sm font-bold">{field.label}</label>

        <textarea
          value={value}
          onChange={(e) => change(e.target.value)}
          required={field.required}
          className="min-h-28 w-full rounded-xl bg-brand-mist p-4 outline-none"
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={field.full ? "md:col-span-2" : ""}>
        <label className="mb-2 block text-sm font-bold">{field.label}</label>

        <select
          value={value}
          onChange={(e) => change(e.target.value)}
          required={field.required}
          className="w-full rounded-xl bg-brand-mist p-4"
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={field.full ? "md:col-span-2" : ""}>
      <label className="mb-2 block text-sm font-bold">{field.label}</label>

      <input
        type={field.type || "text"}
        value={value}
        onChange={(e) => change(e.target.value)}
        required={field.required}
        placeholder={field.placeholder}
        className="w-full rounded-xl bg-brand-mist p-4 outline-none"
      />
    </div>
  );
}
function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>

      <p className="mt-1 break-words text-sm font-semibold">{value || "-"}</p>
    </div>
  );
}

function getTitle(item) {
  return (
    item.title ||
    item.studentName ||
    item.name ||
    item.certificateId ||
    "Record"
  );
}

function getDescription(item) {
  return (
    item.description ||
    item.message ||
    item.domain ||
    item.position ||
    item.category ||
    item.email ||
    ""
  );
}

function getFields(type) {
  if (type === "services") {
    return [
      {
        name: "title",
        label: "Service Title",
        required: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        full: true,
        required: true,
      },
      {
        name: "features",
        label: "Features",
        placeholder: "Feature 1, Feature 2, Feature 3",
        full: true,
      },
      {
        name: "technologies",
        label: "Technologies",
        placeholder: "React.js, Node.js, MongoDB",
        full: true,
      },
    ];
  }

  if (type === "projects") {
    return [
      {
        name: "title",
        label: "Project Title",
        required: true,
      },
      {
        name: "category",
        label: "Category",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        full: true,
        required: true,
      },
      {
        name: "stack",
        label: "Tech Stack",
        placeholder: "React, Node.js, MongoDB",
        full: true,
      },
      {
        name: "results",
        label: "Results",
      },
      {
        name: "imageFile",
        label: "Project Image",
        type: "file",
        full: true,
      },
    ];
  }

  if (type === "jobs") {
    return [
      {
        name: "title",
        label: "Job Title",
        required: true,
      },
      {
        name: "location",
        label: "Location",
      },
      {
        name: "jobType",
        label: "Job Type",
        placeholder: "Full-time",
      },
      {
        name: "experience",
        label: "Experience",
      },
      {
        name: "skills",
        label: "Skills",
        placeholder: "React, Node.js, MongoDB",
        full: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        full: true,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["open", "closed"],
      },
    ];
  }

  if (type === "internships") {
    return [
      {
        name: "title",
        label: "Internship Title",
        required: true,
      },
      {
        name: "domain",
        label: "Domain",
      },
      {
        name: "duration",
        label: "Duration",
        type: "select",
        options: ["1 Month", "3 Months", "6 Months"],
      },
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: ["Remote", "On-site", "Hybrid"],
      },
      {
        name: "skills",
        label: "Skills",
        placeholder: "React, JavaScript, Node.js",
        full: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        full: true,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["open", "closed"],
      },
    ];
  }

  if (type === "certificates") {
    return [
      {
        name: "certificateId",
        label: "Certificate ID",
        required: true,
      },
      {
        name: "studentName",
        label: "Student Name",
        required: true,
      },
      {
        name: "domain",
        label: "Domain",
      },
      {
        name: "duration",
        label: "Duration",
      },
      {
        name: "issueDate",
        label: "Issue Date",
        type: "date",
      },
      {
        name: "certificateUrl",
        label: "Certificate URL",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["verified", "revoked", "expired"],
      },
    ];
  }

  if (type === "testimonials") {
    return [
      {
        name: "name",
        label: "Name",
        required: true,
      },
      {
        name: "position",
        label: "Position",
      },
      {
        name: "company",
        label: "Company",
      },
      {
        name: "image",
        label: "Image URL",
      },
      {
        name: "rating",
        label: "Rating",
        type: "number",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        full: true,
        required: true,
      },
    ];
  }

  return [];
}
