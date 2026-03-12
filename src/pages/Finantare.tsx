import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ChevronRight, ChevronDown, Check, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

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

function CriteriaItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3 text-sm font-body text-[#888880]">
      <Check className="text-[#B8962E] w-4 h-4 shrink-0 mt-0.5" />
      <span>{text}</span>
    </li>
  );
}

export default function Finantare() {
  const { ref, inView } = useInView(0.1);

  // Calculator State
  const [pretMasina, setPretMasina] = useState(30000);
  const [avansPercent, setAvansPercent] = useState(20);
  const [perioada, setPerioada] = useState(60);
  
  const EUR_TO_RON = 5.0;
  const DAE = 0.079; // 7.9%

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(num);
  };

  const calculateLoan = () => {
    const principalEur = pretMasina * (1 - avansPercent / 100);
    const principalRon = principalEur * EUR_TO_RON;
    
    if (principalRon <= 0) return { rata: 0, totalDePlata: 0, totalDobanda: 0, principalRon: 0 };

    const monthlyInterest = DAE / 12;
    const rata = principalRon * (monthlyInterest * Math.pow(1 + monthlyInterest, perioada)) / (Math.pow(1 + monthlyInterest, perioada) - 1);
    const totalDePlata = rata * perioada;
    const totalDobanda = totalDePlata - principalRon;

    return {
      rata,
      totalDePlata,
      totalDobanda,
      principalRon
    };
  };

  const results = calculateLoan();
  const avansEur = (pretMasina * avansPercent) / 100;
  const avansRon = avansEur * EUR_TO_RON;

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
              <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} href="#calculator" className="btn-gold py-4 px-8 rounded-sm text-sm inline-block">
                Calculează Rată
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

      {/* Detailed Criteria Section */}
      <section className="section-padding bg-[#080808] border-b border-[rgba(184,150,46,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center">
              <Info size={20} className="text-[#B8962E]" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0]">Criterii de Finanțare TBI Bank</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Persoane Fizice */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="relative">
                <h3 className="font-display text-2xl text-[#F5F5F0] mb-6 gold-underline pb-3">Persoane Fizice</h3>
                <div className="grid sm:grid-cols-1 gap-8 mt-8">
                  <div>
                    <h4 className="font-label text-[#B8962E] text-[10px] tracking-[0.2em] mb-4 uppercase">Criterii de Eligibilitate</h4>
                    <ul className="space-y-3">
                      <CriteriaItem text="Vârstă: 18-75 ani (la finalizarea creditului)" />
                      <CriteriaItem text="Minim 3 luni la actualul angajator (3 salarii încasate și declarate la ANAF)" />
                      <CriteriaItem text="Salariu minim: 2.000 lei / Pensie minimă: 1.250 lei" />
                      <CriteriaItem text="Venituri acceptate: salarii, pensii, PFA, șoferi cu diurne, chirii, dividende, indemnizații" />
                      <CriteriaItem text="Se acceptă codebitor dacă clientul nu se încadrează singur (nu trebuie să fie din familie)" />
                    </ul>
                  </div>

                  <div className="p-5 bg-[#111] border border-[rgba(184,150,46,0.1)] rounded-sm">
                    <h4 className="font-label text-[#B8962E] text-[10px] tracking-[0.2em] mb-4 uppercase">Detalii Credit</h4>
                    <ul className="space-y-3">
                      <CriteriaItem text="Sumă finanțată: 3.000 – 150.000 RON" />
                      <CriteriaItem text="Timp de răspuns: 15 – 120 minute" />
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-label text-[#B8962E] text-[10px] tracking-[0.2em] mb-4 uppercase">Venituri din Străinătate</h4>
                    <ul className="space-y-3">
                      <CriteriaItem text="Contract de muncă pe perioadă nedeterminată, vechime minim 6 luni" />
                      <CriteriaItem text="Cu istoric de creditare în România (ultimii 5 ani): nu este necesar girant" />
                      <CriteriaItem text="Fără istoric: girant angajat minim 3 luni (se acceptă și pensionari)" />
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Persoane Juridice */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h3 className="font-display text-2xl text-[#F5F5F0] mb-6 gold-underline pb-3">Persoane Juridice</h3>
                <div className="grid sm:grid-cols-1 gap-8 mt-8">
                  <div>
                    <h4 className="font-label text-[#B8962E] text-[10px] tracking-[0.2em] mb-4 uppercase">Criterii de Eligibilitate</h4>
                    <ul className="space-y-3">
                      <CriteriaItem text="Cifră de afaceri minimă: 500.000 RON" />
                      <CriteriaItem text="Cifră de afaceri minimă (transport și construcții): 1.500.000 RON" />
                      <CriteriaItem text="Vechime firmă: minim 1 an" />
                      <CriteriaItem text="Bilanțul anului anterior trebuie să fie depus" />
                    </ul>
                  </div>

                  <div className="p-5 bg-[#111] border border-[rgba(184,150,46,0.1)] rounded-sm">
                    <h4 className="font-label text-[#B8962E] text-[10px] tracking-[0.2em] mb-4 uppercase">Detalii Finanțare</h4>
                    <ul className="space-y-3">
                      <CriteriaItem text="Sumă maximă finanțată: 250.000 RON" />
                      <CriteriaItem text="Se finanțează până la 10% din cifra de afaceri" />
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Loan Calculator */}
        <div id="calculator" className="bg-[#161616] border border-[rgba(184,150,46,0.3)] rounded-sm p-6 sm:p-10 shadow-gold scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-[#F5F5F0] mb-2">Calculator Rate Auto</h2>
            <p className="font-body text-xs text-[#888880] uppercase tracking-widest">Curs fix: 1 EUR = 5.0 RON</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Inputs */}
            <div className="lg:col-span-7 space-y-8">
              {/* Preț Masina */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-label text-xs tracking-widest text-[#F5F5F0]">PREȚ MAȘINĂ (€)</Label>
                  <span className="font-body text-sm text-[#B8962E] font-medium">{formatNumber(pretMasina)} €</span>
                </div>
                <Input 
                  type="number" 
                  value={pretMasina} 
                  onChange={(e) => setPretMasina(Math.max(3000, Math.min(500000, Number(e.target.value))))}
                  className="bg-[#111] border-[rgba(184,150,46,0.2)] text-[#F5F5F0] focus:border-[#B8962E]"
                />
              </div>

              {/* Avans */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-label text-xs tracking-widest text-[#F5F5F0]">AVANS (%)</Label>
                  <span className="font-body text-sm text-[#B8962E] font-medium">{avansPercent}%</span>
                </div>
                <Slider 
                  defaultValue={[20]} 
                  max={70} 
                  step={5} 
                  onValueChange={(val) => setAvansPercent(val[0])}
                  className="py-4"
                />
                <div className="flex justify-between font-body text-[10px] text-[#888880] uppercase tracking-wider">
                  <span>Valoare Avans: {formatNumber(avansEur)} €</span>
                  <span>{formatNumber(avansRon)} RON</span>
                </div>
              </div>

              {/* Perioada */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-label text-xs tracking-widest text-[#F5F5F0]">PERIOADĂ (LUNI)</Label>
                  <span className="font-body text-sm text-[#B8962E] font-medium">{perioada} luni</span>
                </div>
                <Slider 
                  defaultValue={[60]} 
                  min={12}
                  max={72} 
                  step={12} 
                  onValueChange={(val) => setPerioada(val[0])}
                  className="py-4"
                />
                <div className="flex justify-between font-body text-[10px] text-[#888880] uppercase tracking-wider">
                  <span>1 an</span>
                  <span>6 ani</span>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#111] border border-[rgba(184,150,46,0.2)] rounded-sm p-6 sm:p-8 flex flex-col h-full justify-between shadow-inner">
                <div>
                  <p className="font-label text-[10px] text-[#888880] tracking-[0.2em] mb-4 uppercase">Rată lunară estimată</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="font-display text-5xl font-bold text-[#B8962E]">{formatNumber(results.rata)}</span>
                    <span className="font-display text-xl text-[#B8962E]">LEI / LUNĂ</span>
                  </div>

                  <div className="space-y-4 border-t border-[rgba(184,150,46,0.1)] pt-6">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-xs text-[#888880]">Sumă finanțată</span>
                      <span className="font-body text-sm text-[#F5F5F0]">{formatNumber(results.principalRon)} RON</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-xs text-[#888880]">Total de plată</span>
                      <span className="font-body text-sm text-[#F5F5F0]">{formatNumber(results.totalDePlata)} RON</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-xs text-[#888880]">Total dobândă</span>
                      <span className="font-body text-sm text-[#F5F5F0]">{formatNumber(results.totalDobanda)} RON</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-xs text-[#888880]">DAE</span>
                      <span className="font-body text-sm text-[#B8962E] font-semibold">7.9%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="font-body text-[10px] text-[#888880] leading-relaxed mb-6 italic">
                    * Calculul este orientativ. Rata finală poate varia în funcție de profilul financiar al clientului. Oferta TBI Bank.
                  </p>
                  <Link to="/contact" className="btn-gold w-full text-center py-4 rounded-sm text-sm font-semibold shadow-gold">
                    Solicită Ofertă Acum
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

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
