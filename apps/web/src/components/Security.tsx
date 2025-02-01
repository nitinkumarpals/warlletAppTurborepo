"use client";

import { Lock, Shield, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const securityFeatures = [
  {
    name: "End-to-End Encryption",
    description:
      "All your data and transactions are protected with military-grade encryption.",
    icon: Lock,
  },
  {
    name: "Fraud Protection",
    description:
      "Our AI-powered system detects and prevents fraudulent activities in real-time.",
    icon: Shield,
  },
  {
    name: "24/7 Monitoring",
    description:
      "Our security team monitors your account around the clock to ensure your money is always safe.",
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
