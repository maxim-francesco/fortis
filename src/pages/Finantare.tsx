import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Ce acte sunt necesare pentru finanțare?", a: "Pentru finanțare este necesar doar buletinul de identitate. Nu sunt necesare documente suplimentare sau adeverințe de venit în majoritatea cazurilor." },
  { q: "Cât durează aprobarea finanțării?", a: "Aprobarea poate veni în aceeași zi, uneori în câteva ore. Partenerii noștri bancari au procese simplificate pentru clienții noștri." },
  { q: "Este obligatoriu avansul?", a: "Nu, avansul nu este obligatoriu. Poți finanța 100% din valoarea mașinii, în funcție de profilul tău financiar." },
  { q: "Pe câți ani pot lua credit?", a: "Perioadele de finanțare disponibile sunt între 12 și 84 de luni, astfel poți adapta rata lunară la bugetul tău." },
  { q: "Pot face rambursare anticipată?", a: "Da, poți rambursa anticipat partial sau total creditul, de obicei fără penalizări semnificative, în funcție de contractul ales." },
  { q: "Ce se întâmplă dacă mașina are o problemă în perioada de garanție?", a: "Intervenim rapid. Garanția Fortis acoperă motorul și cutia de viteze 12 luni. Te punem în contact cu service autorizat." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(184,150,46,0.12)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group min-h-[60px]"
      >
        <span className="font-body text-sm sm:text-base text-[#F5F5F0] pr-4 group-hover:text-[#D4AF6A] transition-colors">{q}</span>
        <ChevronDown
          size={18}
          className={`text-[#B8962E] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="font-body text-sm text-[#888880] pb-5 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

export default function Finantare() {
  const { ref, inView } = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Page hero */}
      <div className="relative pt-20 pb-14 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-4">
            <a href="/" className="hover:text-[#B8962E] transition-colors">Acasă</a>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Finanțare</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.p className="font-label text-[#B8962E] tracking-widest text-sm mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                FINANȚARE SIMPLĂ
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0] mb-4">
                Rate Simple,<br />
                <span className="gradient-gold-text">Aprobare Rapidă</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-[#888880] leading-relaxed mb-6">
                Finanțare disponibilă doar cu buletinul. Fără avans obligatoriu, fără adeverințe de venit, fără birocrație inutilă.
              </motion.p>
              <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} href="#aplica" className="btn-gold py-4 px-8 rounded-sm text-sm inline-block">
                Aplică pentru Finanțare
              </motion.a>
            </div>
            {/* Geometric decoration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 border border-[rgba(184,150,46,0.2)] rounded-sm" />
                <div className="absolute inset-4 border border-[rgba(184,150,46,0.15)] rounded-sm" />
                <div className="absolute inset-8 border border-[rgba(184,150,46,0.1)] rounded-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-6xl text-[#B8962E] font-semibold leading-none">0%</div>
                    <div className="font-label text-[#888880] text-xs tracking-widest mt-2">AVANS MINIM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Partners */}
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="font-label text-[#B8962E] tracking-widest text-sm mb-6 text-center">PARTENERI DE FINANȚARE</motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["TBI Bank", "BCR", "BT Rate", "ING Bank"].map((bank) => (
              <div key={bank} className="bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm p-5 flex items-center justify-center">
                <span className="font-label text-[#888880] text-sm tracking-wider">{bank}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div>
          <div className="text-center mb-10">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">PROCESUL</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold">Cum Funcționează</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Alegi Mașina", d: "Selectezi mașina dorită din stocul nostru sau ne spui ce cauți." },
              { n: "02", t: "Cerere Simplă", d: "Completezi o cerere online sau la sediu, doar cu buletinul." },
              { n: "03", t: "Aprobare Rapidă", d: "Primești răspuns în aceeași zi și pleci cu mașina acasă." },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-7xl text-[#B8962E] opacity-25 leading-none mb-2 font-semibold">{step.n}</div>
                <div className="w-8 h-px bg-[#B8962E] mx-auto mb-3" />
                <h3 className="font-display text-xl text-[#F5F5F0] mb-2">{step.t}</h3>
                <p className="font-body text-sm text-[#888880] leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator placeholder */}
        <div id="aplica" className="bg-[#161616] border border-[rgba(184,150,46,0.3)] rounded-sm p-8 text-center shadow-gold">
          <div className="w-12 h-12 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mx-auto mb-4">
            <span className="text-[#B8962E] text-xl">⚡</span>
          </div>
          <h3 className="font-display text-2xl text-[#F5F5F0] mb-2">Calculator Rate</h3>
          <p className="font-label text-[#B8962E] text-xs tracking-widest mb-6">COMING SOON</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6 opacity-40 pointer-events-none">
            <div className="bg-[#111] border border-[rgba(184,150,46,0.15)] rounded-sm p-3">
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-1">PREȚ MAȘINĂ (€)</label>
              <input disabled placeholder="30.000" className="bg-transparent text-[#F5F5F0] font-body text-sm w-full outline-none" />
            </div>
            <div className="bg-[#111] border border-[rgba(184,150,46,0.15)] rounded-sm p-3">
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-1">AVANS (%)</label>
              <input disabled placeholder="0%" className="bg-transparent text-[#F5F5F0] font-body text-sm w-full outline-none" />
            </div>
            <div className="bg-[#111] border border-[rgba(184,150,46,0.15)] rounded-sm p-3">
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-1">PERIOADĂ (LUNI)</label>
              <input disabled placeholder="60" className="bg-transparent text-[#F5F5F0] font-body text-sm w-full outline-none" />
            </div>
          </div>
          <p className="font-body text-sm text-[#888880]">Calculatorul va fi disponibil în curând.<br />Contactează-ne direct pentru o ofertă personalizată.</p>
          <a href="tel:0751489879" className="btn-gold text-sm px-8 py-3 rounded-sm mt-6 inline-block">
            Solicită Ofertă Acum
          </a>
        </div>

        {/* FAQ */}
        <div>
          <div className="text-center mb-10">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">ÎNTREBĂRI FRECVENTE</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold">Finanțare FAQ</h2>
          </div>
          <div className="divide-y-0">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
