import { useState } from "react";

import LandingNav from "./components/LandingNav";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import BentoFeatures from "./components/BentoFeatures";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import { useAuth } from "../context/AuthContext";

import useScrollReveal from "./hooks/useScrollReveal";

export default function SmartAgroLanding({ onEnterApp }) {
  const { user, logout } = useAuth();
  const [modal, setModal] = useState(null);

  useScrollReveal();

  return (
    <>
      <LandingNav
        user={user}
        onLogin={() => setModal("login")}
        onRegister={() => setModal("register")}
        onEnterApp={onEnterApp}
        onLogout={logout}
      />

      <Hero onRegister={() => setModal("register")} onEnterApp={onEnterApp} />

      <HowItWorks />
      <BentoFeatures />
      <Testimonials />

      <Pricing
        onRegister={() => setModal("register")}
        onLogin={() => setModal("login")}
      />

      <Footer />

      <AuthModal
        mode={modal}
        onClose={() => setModal(null)}
        onSwitch={() => setModal(modal === "login" ? "register" : "login")}
        onSuccess={onEnterApp}
      />
    </>
  );
}
