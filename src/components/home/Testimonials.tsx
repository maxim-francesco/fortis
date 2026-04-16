import { useState } from "react";
import { m } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Am cumpărat un BMW Seria 5 de la MEDFIL și am fost impresionat de profesionalism. Mașina a venit livrată acasă, cu tot cu numere provizorii. Recomand cu toată încrederea!",
    name: "Alexandru M.",
    city: "București",
  },
  {
    text: "Am venit din afara județului Cluj să văd o mașină la MEDFIL și merită fiecare kilometru. Parcul e ușor de găsit în cartierul Iris, echipa e foarte profesionistă și mașina a fost exact cum a fost descrisă. Formalitățile s-au făcut în aceeași zi.",
    name: "Cristina P.",
    city: "Oradea",
  },
  {
    text: "Rate cu buletinul, chiar funcționează! Am luat un Audi A6 fără avans. Mașina e superbă, garanția de 12 luni m-a liniștit complet. MEDFIL e alegerea cea bună.",
    name: "Mihai D.",
    city: "Timișoara",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Gold grain texture bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, rgba(184,150,46,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-12">
          <m.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-label text-[#B8962E] tracking-widest text-sm mb-3"
          >
            RECENZII VERIFICATE
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-section-title text-[#F5F5F0] gold-underline gold-underline-center pb-3"
          >
            Ce Spun Clienții
          </m.h2>
        </div>

        {/* Carousel (swipeable on mobile) */}
        <div className="snap-carousel sm:grid sm:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="snap-item w-[85vw] sm:w-auto flex-shrink-0 sm:flex-shrink bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col gap-4"
            >
              <Quote size={28} className="text-[#B8962E] opacity-60" />
              <p className="font-body text-sm text-[#B0B0A8] leading-relaxed flex-1">
                "{t.text}"
              </p>
              <div>
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className="text-[#B8962E] fill-[#B8962E]" />
                  ))}
                </div>
                <div className="font-body text-sm font-medium text-[#F5F5F0]">{t.name}</div>
                <div className="font-body text-xs text-[#B0B0A8]">{t.city}</div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 sm:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-6 h-px transition-all duration-300 ${
                active === i ? "bg-[#B8962E]" : "bg-[rgba(184,150,46,0.3)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
