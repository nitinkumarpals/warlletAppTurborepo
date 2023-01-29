"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Wallet, X } from "lucide-react";
import { AuthModal } from "../AuthModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const openAuthModal = (tab: "login" | "signup") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex flex-shrink-0">
              <Wallet className="h-6 w-6" />
              <span className="ml-2 text-lg font-bold">Wallet App</span>
            </div>
          </div>
          <div>
            <Button
              variant="outline"
              className="mr-2 text-black border-white hover:bg-blue-100 hover:text-gray-900"
              onClick={() => openAuthModal("login")}
            >
              Log in
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => openAuthModal("signup")}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              How It Works
            </Link>
            <Link
              href="#security"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Security
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <Button
                variant="outline"
                className="mr-2 text-white border-white hover:bg-white hover:text-gray-900 w-full"
                onClick={() => openAuthModal("login")}
              >
                Log in
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                onClick={() => openAuthModal("signup")}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </nav>
  );
}
