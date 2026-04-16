import { m } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{
        background: "linear-gradient(135deg, #0E0B04 0%, #1A1200 40%, #0E0B04 100%)",
      }}
    >
      {/* Gold border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8962E] to-transparent" />
      {/* Gold border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8962E] to-transparent" />

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #B8962E, transparent)" }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <m.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-label text-[#B8962E] tracking-widest text-sm mb-4"
        >
          PASUL URMĂTOR
        </m.p>
        <m.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-display text-display text-[#F5F5F0] mb-5"
        >
          Gata să faci alegerea cea bună?
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-base text-[#B0B0A8] mb-10 max-w-lg mx-auto"
        >
          Echipa MEDFIL Automobile te așteaptă cu o selecție exclusivă de mașini premium verificate.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/contact" className="btn-gold py-4 px-10 rounded-sm text-sm font-semibold text-center">
            Contactează-ne Acum
          </Link>
          <Link to="/stoc" className="btn-ghost py-4 px-10 rounded-sm text-sm text-center">
            Explorează Stocul
          </Link>
        </m.div>
      </div>
    </section>
  );
}
