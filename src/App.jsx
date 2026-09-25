import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HomeTopBars from "./components/home/HomeTopBars";
import "./components/home/home-shell.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Portfolio from "./pages/Portfolio";
import ProjectDetails from "./pages/ProjectDetails";
import Careers from "./pages/Careers";
import Internships from "./pages/Internships";
import CertificateVerification from "./pages/CertificateVerification";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BackToTop from "./components/BackToTop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UserProtectedRoute from "./components/UserProtectedRoute";
import WelcomePopup from "./components/WelcomePopup";
function Shell() {
  const l = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [l.pathname]);
  const isHome = l.pathname === "/";
  const admin = l.pathname.startsWith("/admin");
  return (
    <div className={isHome ? "home-shell" : undefined}>
      {isHome && <HomeTopBars />}
      {!admin && (isHome ? <div className="home-navbar"><Navbar /></div> : <Navbar />)}
      {!admin && !isHome && <WelcomePopup />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<ProjectDetails />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/internships" element={<Internships />} />
        <Route
          path="/certificate-verification"
          element={<CertificateVerification />}
        />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            localStorage.getItem("token") ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            <div className="pt-40 min-h-screen text-center">
              <h1 className="display text-7xl font-black">404</h1>
              <p>Page not found.</p>
            </div>
          }
        />
      </Routes>
      {!admin && <Footer />}
      {!admin && <BackToTop />}
    </div>
  );
}
export default function App() {
  return <Shell />;
}
