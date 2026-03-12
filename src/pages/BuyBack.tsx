import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ChevronRight, Clock, AlertCircle } from "lucide-react";

export default function BuyBack() {
  const { ref, inView } = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Hero */}
      <div className="relative pt-20 pb-16 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-4">
            <a href="/" className="hover:text-[#B8962E] transition-colors">Acasă</a>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">BuyBack</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0] mb-6">
            Vinzi o Mașină?
          </motion.h1>

          {/* Note card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="max-w-2xl bg-[rgba(184,150,46,0.05)] border border-[rgba(184,150,46,0.3)] rounded-sm p-4 flex gap-3">
            <AlertCircle size={18} className="text-[#B8962E] flex-shrink-0 mt-0.5" />
            <p className="font-body text-sm text-[#888880] leading-relaxed">
              Momentan nu oferim serviciu de buyback direct, dar evaluăm fiecare situație individual.
              <strong className="text-[#F5F5F0]"> Contactează-ne</strong> și găsim împreună cea mai bună soluție.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-14">
        {/* What we offer */}
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <div className="text-center mb-10">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">CE OFERIM</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold">Cum Te Putem Ajuta</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Consultanță Vânzare",
                description: "Te ajutăm să îți vinzi mașina la cel mai bun preț. Sfaturi despre pregătire, fotografiere și promovare. Experiența noastră în piața auto românească îți oferă avantaj real.",
                icon: "💬",
              },
              {
                title: "Part-Exchange",
                description: "Evaluăm posibilitatea unui schimb cu o mașină din stocul nostru. Dacă vrei să treci la o mașină mai nouă sau diferită, discutăm și găsim o soluție echitabilă.",
                icon: "🔄",
              },
            ].map((option, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="bg-[#161616] border border-[rgba(184,150,46,0.2)] rounded-sm p-6 hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{option.icon}</div>
                <h3 className="font-display text-xl font-medium text-[#F5F5F0] mb-3">{option.title}</h3>
                <p className="font-body text-sm text-[#888880] leading-relaxed">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Evaluation form */}
        <div className="bg-[#161616] border border-[rgba(184,150,46,0.3)] rounded-sm p-6 sm:p-8 shadow-gold">
          <h2 className="font-display text-2xl sm:text-3xl text-[#F5F5F0] mb-2">Solicită Evaluare Gratuită</h2>
          <p className="font-body text-sm text-[#888880] mb-8">Completează datele mașinii tale și îți trimitem o evaluare în 24 de ore.</p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">NUME *</label>
                <input required className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]" placeholder="Ion Popescu" />
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">TELEFON *</label>
                <input required type="tel" className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]" placeholder="07xx xxx xxx" />
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">MARCĂ MAȘINĂ</label>
                <input className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]" placeholder="ex: BMW, Audi..." />
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">MODEL</label>
                <input className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]" placeholder="ex: Seria 3, A4..." />
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">AN FABRICAȚIE</label>
                <select className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]">
                  {Array.from({ length: 15 }, (_, i) => 2025 - i).map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">KILOMETRAJ</label>
                <input type="number" className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]" placeholder="ex: 90000" />
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">STARE GENERALĂ</label>
              <div className="flex flex-wrap gap-3">
                {["Excelentă", "Bună", "Acceptabilă"].map((s) => (
                  <label key={s} className="flex items-center gap-2 border border-[rgba(184,150,46,0.2)] px-4 py-2.5 rounded-sm cursor-pointer hover:border-[#B8962E] transition-colors min-h-[44px]">
                    <input type="radio" name="condition" className="accent-[#B8962E]" />
                    <span className="font-body text-sm text-[#888880]">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">DESCRIERE</label>
              <textarea rows={3} className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors resize-none" placeholder="Descrie starea mașinii, dotările speciale, istoricul service..." />
            </div>

            <div>
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">FOTOGRAFII (OPȚIONAL)</label>
              <div className="border-2 border-dashed border-[rgba(184,150,46,0.2)] rounded-sm p-6 text-center hover:border-[rgba(184,150,46,0.4)] transition-colors cursor-pointer">
                <p className="font-body text-sm text-[#888880]">📎 Adaugă fotografii ale mașinii</p>
                <p className="font-body text-xs text-[#888880] opacity-60 mt-1">JPG, PNG — max 10MB fiecare</p>
              </div>
            </div>

            <button type="submit" className="btn-gold w-full py-4 rounded-sm text-sm font-semibold">
              Solicită Evaluare Gratuită
            </button>
          </form>

          <div className="flex items-center gap-2 mt-4 justify-center">
            <Clock size={14} className="text-[#B8962E]" />
            <span className="font-body text-xs text-[#888880]">Răspundem în maxim 24 de ore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
