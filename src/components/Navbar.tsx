import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import fortisLogo from "@/assets/fortis-logo.jpeg";

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
    return () => { document.body.style.overflow = ""; };
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
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={fortisLogo} alt="Fortis Premium Auto" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <div className="font-label text-warm-white text-lg leading-none tracking-widest text-[#F5F5F0]">FORTIS</div>
              <div className="font-label text-gold text-[10px] tracking-[0.2em] text-[#B8962E]">PREMIUM AUTO</div>
            </div>
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-center items-center lg:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    className={`font-display text-4xl font-light tracking-wide transition-colors duration-200 hover:text-[#D4AF6A] ${
                      location.pathname === link.href ? "text-[#B8962E]" : "text-[#F5F5F0]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1, duration: 0.4 }}
                className="mt-4 flex flex-col gap-3 w-full items-center"
              >
                <a href="tel:0751489879" className="btn-gold w-64 text-center py-3">
                  Sună: 0751-489-879
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
