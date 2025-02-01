"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CallToActionProps {
  openAuthModal: (tab: "login" | "signup") => void;
}

export default function CallToAction({ openAuthModal }: CallToActionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block">Ready to transform your finances?</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-lg leading-6 text-indigo-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join millions of users who trust WalletApp for their financial
          journey.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="mt-8 w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50"
            onClick={() => openAuthModal("signup")}
          >
            Get started for free
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
