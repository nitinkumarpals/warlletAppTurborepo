"use client";

import { Lock, Shield, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const securityFeatures = [
  {
    name: "Safe and Secure Payments",
    description:
      "We've got you covered with our secure payment system, designed to protect your money and keep your transactions safe.",
    icon: Lock,
  },
  {
    name: "Extra Layer of Protection",
    description:
      "Our unique dual backend system adds an extra layer of security to prevent unauthorized access and keep your data safe.",
    icon: Shield,
  },
  {
    name: "Top-Notch Encryption",
    description:
      "We use the latest encryption technology to safeguard your sensitive information and keep your transactions private.",
    icon: AlertTriangle,
  },
];

export default function Security() {
  return (
    <div id="security" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">
            Security
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Your Security is Our Top Priority
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
