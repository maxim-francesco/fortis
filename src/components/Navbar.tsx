import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import fortisLogo from "@/assets/fortis.png";

const navLinks = [
  { label: "Acasă", href: "/" },
  { label: "Mașini", href: "/masini" },
  { label: "Finanțare", href: "/finantare" },
  { label: "La Comandă", href: "/la-comanda" },
  { label: "BuyBack", href: "/buyback" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    document.body.classList.toggle('menu-open', mobileOpen);
    return () => { 
      document.body.style.overflow = ""; 
      document.body.classList.remove('menu-open');
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/90 backdrop-blur-xl border-b border-[rgba(184,150,46,0.2)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={fortisLogo} alt="Fortis Premium Auto" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-sm tracking-wide transition-colors duration-200 hover:text-[#D4AF6A] relative group ${
                  location.pathname === link.href ? "text-[#B8962E]" : "text-[#888880]"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#B8962E] transition-all duration-300 ${
                  location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0751489879"
              className="flex items-center gap-2 font-body text-sm text-[#B8962E] hover:text-[#D4AF6A] transition-colors"
            >
              <Phone size={14} />
              <span>0751-489-879</span>
            </a>
            <a
              href="tel:0751489879"
              className="btn-gold text-sm px-5 py-2.5 rounded-sm font-semibold"
            >
              Sună Acum
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center text-[#F5F5F0] hover:text-[#B8962E] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[60] bg-[#080808]/97 backdrop-blur-sm flex flex-col lg:hidden"
          >
            {/* Header row */}
            <div className="flex justify-between items-center px-6 pt-6 h-16">
              <Link to="/">
                <img src={fortisLogo} alt="Fortis Premium Auto" className="h-10 w-auto object-contain" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-12 h-12 flex items-center justify-center text-[#F5F5F0] hover:text-[#B8962E]"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links section centered */}
            <div className="flex-1 flex flex-col justify-center items-center px-6">
              <div className="w-full max-w-xs flex flex-col items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`font-display text-2xl py-3 w-full text-center transition-colors duration-200 border-b border-[#B8962E]/30 last:border-0 ${
                      location.pathname === link.href ? "text-[#D4AF6A]" : "text-[#F5F5F0]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom buttons row */}
            <div className="px-6 pb-10 w-full">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:0751489879"
                  className="h-12 flex items-center justify-center bg-[#B8962E] text-[#080808] font-body font-semibold rounded-lg text-sm"
                >
                  Sună Acum
                </a>
                <a
                  href="https://wa.me/40751489879?text=Bună%20ziua%2C%20aș%20dori%20mai%20multe%20informații."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 flex items-center justify-center bg-[#080808] border border-[#B8962E] text-[#B8962E] font-body font-semibold rounded-lg text-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
