import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    return !localStorage.getItem("fortis-cookies-accepted");
  });

  const accept = () => {
    localStorage.setItem("fortis-cookies-accepted", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:max-w-md z-50 glass border border-[rgba(184,150,46,0.2)] rounded-sm p-4 shadow-xl"
        >
          <div className="flex items-start gap-3 mb-3">
            <Cookie size={18} className="text-[#B8962E] flex-shrink-0 mt-0.5" />
            <p className="font-body text-sm text-[#888880] leading-relaxed">
              Folosim cookie-uri pentru a îmbunătăți experiența ta pe site.
              <a href="#" className="text-[#B8962E] hover:text-[#D4AF6A] ml-1 transition-colors">
                Află mai multe
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={accept}
              className="btn-gold text-xs px-4 py-2 rounded-sm"
            >
              Acceptă
            </button>
            <button
              onClick={() => setVisible(false)}
              className="font-body text-xs text-[#888880] hover:text-[#F5F5F0] transition-colors px-2"
            >
              Personalizează
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
