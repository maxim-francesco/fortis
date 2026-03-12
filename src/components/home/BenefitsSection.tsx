import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Shield, Truck, CreditCard, FileText, Car, Video } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Garanție 12 Luni",
    description: "Motor și cutie de viteze garantate 12 luni. Conduci în liniște, noi acoperim neașteptatul.",
  },
  {
    icon: Truck,
    title: "Transport Gratuit",
    description: "Livrăm mașina ta oriunde în România, fără costuri suplimentare. Direct la ușa ta.",
  },
  {
    icon: CreditCard,
    title: "Rate Doar cu Buletinul",
    description: "Finanțare rapidă, fără avans obligatoriu și fără birocrație. Aprobare în aceeași zi.",
  },
  {
    icon: FileText,
    title: "Numere Provizorii 30 Zile",
    description: "Pleci cu mașina în aceeași zi. Noi ne ocupăm de numere provizorii pentru 30 de zile.",
  },
  {
    icon: Car,
    title: "RAR Efectuat la Cerere",
    description: "Inspecție tehnică RAR la cerere, pentru liniștea ta înainte de achiziție.",
  },
  {
    icon: Video,
    title: "Consultanță Video",
    description: "Ești departe? Îți prezentăm mașina live, în timp real, cu toate detaliile.",
  },
];

export default function BenefitsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-label text-[#B8962E] tracking-widest text-sm mb-3"
          >
            AVANTAJE EXCLUSIVE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-section-title text-[#F5F5F0] gold-underline gold-underline-center pb-3"
          >
            De Ce Fortis?
          </motion.h2>
        </div>

        {/* Grid */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="card-premium rounded-sm p-6 group cursor-default"
              >
                <div className="w-12 h-12 border border-[rgba(184,150,46,0.25)] rounded-sm flex items-center justify-center mb-5 group-hover:border-[#B8962E] transition-colors duration-300">
                  <Icon size={22} className="text-[#B8962E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-[#F5F5F0] mb-3 font-medium">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm text-[#888880] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
