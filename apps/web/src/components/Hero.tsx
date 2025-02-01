"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  openAuthModal: (tab: "login" | "signup") => void;
}

export default function Hero({ openAuthModal }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Your Money,</span>{" "}
              <span className="block text-blue-400 xl:inline">Reimagined</span>
            </h1>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Experience the next generation of digital payments. Fast, secure,
              and designed for the modern world.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 mr-4"
                onClick={() => openAuthModal("signup")}
              >
                Get started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full mt-3 sm:w-auto sm:mt-0 text-black  hover:bg-blue-100 hover:text-gray-900"
                onClick={scrollToFeatures}
              >
                Learn more
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          >
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                <div className="bg-gray-200 h-12 flex items-center justify-between px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    WalletApp
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    Account Balance
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    ₹12,345.67
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Savings</span>
                      <span className="font-medium text-gray-900">
                        ₹5,000.00
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Investments</span>
                      <span className="font-medium text-gray-900">
                        ₹7,345.67
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Recent Transactions
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Coffee Shop</span>
                        <span className="font-medium text-red-600">-₹4.50</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Salary Deposit</span>
                        <span className="font-medium text-green-600">
                          +₹3,000.00
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Electric Bill</span>
                        <span className="font-medium text-red-600">
                          -₹85.20
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
