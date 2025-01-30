"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "../AuthModal";
import { Wallet } from "lucide-react";
import { useUserSession } from "@/context/UserSessionContext";

export default function Navbar() {
  const { user, loading, logout } = useUserSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const openAuthModal = (tab: "login" | "signup") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">WalletApp</span>
          </div>
          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-white">Loading...</span>
            ) : user ? (
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="text-blue-700 hover:bg-blue-100 hover:text-gray-900"
                  onClick={() => openAuthModal("login")}
                >
                  Log in
                </Button>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => openAuthModal("signup")}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        key={authModalTab}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </nav>
  );
}
