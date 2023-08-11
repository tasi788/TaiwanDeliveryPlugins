import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
export default function Details({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-blue-500 bg-opacity-5 rounded-[.5em] w-full frosted-glass">
      <div
        className="text-blue-100 font-bold py-2 px-4 rounded cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{title}</div>
        <svg
          className={`w-4 h-4 transform ${
            isOpen ? "rotate-180" : ""
          } transition-transform`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 13.586L3.707 7.293a1 1 0 011.414-1.414L10 10.172l4.879-4.879a1 1 0 111.414 1.414L10 13.586z"
          />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="p-4 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
