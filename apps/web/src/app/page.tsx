"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Security from "@/components/Security";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";


export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">(
    "signup"
  );

  const openAuthModal = (tab: "login" | "signup") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navbar openAuthModal={openAuthModal} />
      <Hero openAuthModal={openAuthModal} />
      <Features />
      <HowItWorks />
      <Security />
      <CallToAction openAuthModal={openAuthModal} />
      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </div>
  );
}
