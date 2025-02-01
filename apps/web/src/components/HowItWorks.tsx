"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Sign Up",
    description:
      "Create your account in minutes. All you need is your email and a secure password.",
  },
  {
    title: "Link Your Bank",
    description:
      "Securely connect your existing bank account to start funding your WalletApp.",
  },
  {
    title: "Start Transacting",
    description:
      "Send money, pay bills, or set up recurring payments with just a few taps.",
  },
  {
    title: "Manage Your Finances",
    description:
      "Use our built-in tools to track your spending, set budgets, and grow your savings.",
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-16 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">
            Guide
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            How It Works
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="ml-4 text-lg leading-6 font-medium text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-base text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
