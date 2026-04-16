import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroCar}
          alt="MEDFIL Automobile - Parc Auto Cluj"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32">
        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          className="w-16 h-px bg-gradient-to-r from-[#B8962E] to-[#D4AF6A] mb-8 origin-left"
        />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 border border-[rgba(184,150,46,0.3)] px-3 py-1.5 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8962E]" />
          <span className="font-label text-[#B8962E] text-xs tracking-widest">
            DEALER PREMIUM VERIFICAT
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-hero text-[#F5F5F0] mb-5 max-w-3xl leading-[1.05]"
        >
          Găsește Mașina
          <br />
          <span className="gradient-gold-text">Ta Perfectă</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 max-w-lg"
        >
          <p className="font-body text-base sm:text-lg text-[#888880] leading-relaxed mb-2">
            Mașini rulate premium, garanție 12 luni,
            <br />
            formalități zero stres.
          </p>
          <p className="font-body text-sm text-[#888880] opacity-80">
            Parc auto autorizat în cartierul Iris, Cluj-Napoca.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/stoc" className="btn-gold text-center py-4 px-8 rounded-sm text-sm font-semibold">
            Explorează Stocul
          </Link>
          <Link to="/comanda" className="btn-ghost text-center py-4 px-8 rounded-sm text-sm">
            Mașini la Comandă
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-label text-[#888880] text-[10px] tracking-[0.3em]">SCROLL</span>
        <ChevronDown size={20} className="text-[#B8962E] animate-bounce-chevron" />
      </motion.div>
    </section>
  );
}
