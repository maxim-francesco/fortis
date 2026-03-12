import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * @fileOverview Cookie consent banner for GDPR compliance.
 * Inform the user about cookie usage and store preferences in localStorage.
 */

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch by checking localStorage inside useEffect
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (type: "all" | "necessary") => {
    localStorage.setItem("cookie_consent", type);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-20 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:max-w-sm z-[100] bg-[#0A0A0A]/95 backdrop-blur-md border border-[rgba(184,150,46,0.3)] rounded-sm p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(184,150,46,0.1)]"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center flex-shrink-0">
              <Cookie size={20} className="text-[#B8962E]" />
            </div>
            <div>
              <h4 className="font-display text-lg text-[#F5F5F0] mb-1">Setări Cookie</h4>
              <p className="font-body text-[11px] text-[#888880] leading-relaxed">
                Utilizăm module cookie pentru a vă oferi cea mai bună experiență pe site-ul nostru. Citiți mai multe în{" "}
                <Link to="/politica-cookies" className="text-[#B8962E] hover:text-[#D4AF6A] transition-colors underline underline-offset-2">
                  Politică Cookies
                </Link>.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleConsent("all")}
              className="btn-gold w-full text-xs py-3 rounded-sm font-semibold shadow-gold"
            >
              Accept toate
            </button>
            <button
              onClick={() => handleConsent("necessary")}
              className="font-body text-[10px] text-[#888880] hover:text-[#F5F5F0] transition-colors py-2 text-center tracking-widest uppercase font-medium"
            >
              Doar necesare
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
