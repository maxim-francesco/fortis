import { m } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    number: "01",
    title: "Alegi Mașina",
    description: "Navighezi stocul nostru sau ne spui ce mașină vrei. Noi ne ocupăm de tot.",
  },
  {
    number: "02",
    title: "Noi Pregătim Tot",
    description: "ITP, RAR la cerere, finanțare, numere provizorii — fără nicio bătaie de cap pentru tine.",
  },
  {
    number: "03",
    title: "Primești Mașina Acasă",
    description: "Transport gratuit oriunde în Str. Oașului 134a, Cluj-Napoca, cartier Iris. Pleci mulțumit, sau nu pleci.",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <m.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-label text-[#B8962E] tracking-widest text-sm mb-3"
          >
            PROCESUL NOSTRU
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-section-title text-[#F5F5F0] gold-underline gold-underline-center pb-3"
          >
            Cum Funcționează
          </m.h2>
        </div>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connecting dashed line (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[calc(33.33%+2rem)] right-[calc(33.33%+2rem)] h-px border-t border-dashed border-[rgba(184,150,46,0.3)]" />

          {steps.map((step, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center lg:text-left relative"
            >
              {/* Big number */}
              <div className="font-display text-7xl sm:text-8xl text-[#B8962E] opacity-30 leading-none mb-4 lg:mb-2 font-semibold">
                {step.number}
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-[#B8962E] to-transparent mb-4 mx-auto lg:mx-0" />
              <h3 className="font-display text-2xl font-medium text-[#F5F5F0] mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-[#888880] leading-relaxed max-w-xs mx-auto lg:mx-0">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
