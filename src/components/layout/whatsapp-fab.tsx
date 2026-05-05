"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { CLINIC } from "@/lib/site-config";

export function WhatsAppFab() {
  return (
    <motion.a
      href={CLINIC.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white/80 md:bottom-8 md:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="size-7" aria-hidden />
    </motion.a>
  );
}
