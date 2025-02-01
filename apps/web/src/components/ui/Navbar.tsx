"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X, ChevronDown } from "lucide-react";
import { useUserSession } from "@/context/UserSessionContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  openAuthModal: (tab: "login" | "signup") => void;
}

export default function Navbar({ openAuthModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUserSession();

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Wallet className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">
                WalletApp
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="#features"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  How It Works
                </Link>
                <Link
                  href="#security"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Security
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-blue-500"
                  >
                    <Avatar className="h-8 w-8 ring-1 ring-white">
                      <AvatarImage alt={user.name || user.email} />
                      <AvatarFallback className="bg-white text-black">
                        {user.name?.[0].toUpperCase() ||
                          user.email[0].toUpperCase}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white">
                      {user.name || user.email.split("@")[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-white " />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="default"
                  className="mr-2 text-black bg-white hover:bg-blue-200 hover:text-gray-900"
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
              </>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <X className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
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
              {user ? (
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10 ring-2 ring-white">
                      <AvatarImage alt={user.name || user.email} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {user.name?.[0] || user.email[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name || user.email.split("@")[0]}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    variant="default"
                    className="mr-2 text-black bg-white hover:bg-blue-200 hover:text-gray-900 w-full"
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
                </>
              )}
            </div>
            {user && (
              <div className="mt-3 px-2 space-y-1">
                <Button
                  variant="ghost"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 w-full text-left"
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 w-full text-left"
                >
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-white hover:bg-red-600 w-full text-left"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
