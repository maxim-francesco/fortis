import { motion } from "framer-motion";
import { useInView, useCountUp } from "@/hooks/useInView";

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col items-center text-center px-4 py-2"
    >
      <div className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0] leading-none mb-2">
        {count}{suffix}
      </div>
      <div className="font-label text-[#B8962E] text-xs tracking-widest">{label}</div>
    </motion.div>
  );
}

export default function StatsBar() {
  const stats = [
    { value: 500, suffix: "+", label: "MAȘINI VÂNDUTE" },
    { value: 12, suffix: " LUNI", label: "GARANȚIE" },
    { value: 30, suffix: " ZILE", label: "NUMERE PROVIZORII" },
    { value: 0, suffix: " STRES", label: "FORMALITĂȚI" },
  ];

  return (
    <section className="bg-[#0E0E0E] border-y border-[rgba(184,150,46,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          {stats.map((s, i) => (
            <div key={i} className="relative">
              <Stat {...s} delay={i * 0.1} />
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-[rgba(184,150,46,0.4)] to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
