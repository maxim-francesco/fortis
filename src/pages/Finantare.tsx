import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { 
  ChevronRight, 
  ChevronDown, 
  Check, 
  CheckCircle2, 
  Banknote, 
  Globe, 
  User, 
  Building2, 
  ArrowRight, 
  Zap, 
  CreditCard, 
  TrendingDown, 
  Clock 
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFinancialProductSchema } from "@/lib/seo/schemas";
const faqs = [
  { q: "Ce acte sunt necesare pentru finanțare?", a: "Pentru finanțare este necesar doar buletinul de identitate. Nu sunt necesare documente suplimentare sau adeverințe de venit în majoritatea cazurilor." },
  { q: "Cât durează aprobarea finanțării?", a: "Aprobarea poate veni în aceeași zi, uneori în câteva ore. Partenerii noștri bancari au procese simplificate pentru clienții noștri." },
  { q: "Este obligatoriu avansul?", a: "Nu, avansul nu este obligatoriu. Poți finanța 100% din valoarea mașinii, în funcție de profilul tău financiar." },
  { q: "Pe câți ani pot lua credit?", a: "Perioadele de finanțare disponibile sunt între 12 și 84 de luni, astfel poți adapta rata lunară la bugetul tău." },
  { q: "Pot face rambursare anticipată?", a: "Da, poți rambursa anticipat partial sau total creditul, de obicei fără penalizări semnificative, în funcție de contractul ales." },
  { q: "Ce se întâmplă dacă mașina are o problemă în perioada de garanție?", a: "Intervenim rapid. Garanția MEDFIL acoperă motorul și cutia de viteze 12 luni. Te punem în contact cu service autorizat." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(184,150,46,0.12)] hover:bg-[#0E0E0E] transition-colors duration-300">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between py-5 px-4 text-left group min-h-[60px] ${open ? "bg-[#0E0E0E]" : ""}`}
      >
        <span className={`font-body text-sm sm:text-base pr-4 transition-colors duration-300 ${open ? "text-[#B8962E]" : "text-[#F5F5F0] group-hover:text-[#D4AF6A]"}`}>
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#B8962E]" : "text-[#888880] group-hover:text-[#D4AF6A]"}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-[#888880] pb-6 pl-4 pr-12 leading-relaxed">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Finantare() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);
  const { ref: processRef, inView: processInView } = useInView(0.1);
  const { ref: calcRef, inView: calcInView } = useInView(0.05);
  const { ref: tabsRef, inView: tabsInView } = useInView(0.1);

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

    return { rata, totalDePlata, totalDobanda, principalRon };
  };

  const results = calculateLoan();
  const avansEur = (pretMasina * avansPercent) / 100;
  const avansRon = avansEur * EUR_TO_RON;

  // Tabs state
  const [activeTab, setActiveTab] = useState<"pf" | "pj">("pf");

  return (
    <div className="min-h-screen bg-[#080808]">
      <SEO
        title="Finanțare Auto MEDFIL - Credit Auto prin TBI Bank | 0% Avans"
        description="Calculează rata la mașina dorită. Finanțare auto TBI Bank cu 0% avans minim, perioadă 12-72 luni, aprobare rapidă. Calculator credit online."
        canonical="https://medfil.ro/finantare"
        ogImage="/og-finantare.jpg"
        structuredData={[getFinancialProductSchema()]}
      />

      {/* 1. HERO */}
      <div className="relative pt-24 pb-16 lg:pb-20 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)] overflow-hidden" ref={heroRef as any}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-8">
            <Link to="/" className="hover:text-[#B8962E] transition-colors duration-300">Acasă</Link>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Finanțare</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 xl:col-span-6">
              <m.p className="font-label text-[#B8962E] tracking-widest text-sm mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                FINANȚARE SIMPLĂ
              </m.p>
              <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F0] mb-6 leading-tight">
                Rate Simple,<br />
                <span className="gradient-gold-text">Aprobare Rapidă</span>
              </m.h1>
              <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="font-body text-[#888880] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Finanțare disponibilă doar cu buletinul. Fără avans obligatoriu, fără adeverințe de venit, fără birocrație inutilă.
              </m.p>
              <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                <a href="#calculator" className="btn-gold py-4 px-8 rounded-sm text-sm sm:text-base inline-flex items-center gap-2 min-h-[44px]">
                  Simulează Rata Ta
                  <ChevronDown size={18} />
                </a>
              </m.div>
            </div>
            {/* Highlights Grid */}
            <div className="lg:col-span-5 xl:col-span-5 xl:col-start-8">
              <m.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
              >
                {[
                  { icon: Zap, title: "Aprobare rapidă", text: "Răspuns în 15-120 minute" },
                  { icon: CreditCard, title: "Doar cu buletinul", text: "Fără adeverințe de venit" },
                  { icon: TrendingDown, title: "DAE 7.9%", text: "Ofertă TBI Bank" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.12)] p-4 rounded-sm flex flex-col sm:items-center sm:text-center lg:flex-row lg:text-left lg:items-center gap-4">
                    <div className="w-10 h-10 shrink-0 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center">
                      <item.icon className="text-[#B8962E] w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-[#F5F5F0] text-lg font-medium mb-0.5">{item.title}</h4>
                      <p className="font-body text-sm text-[#888880]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </m.div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROCESUL */}
      <section className="py-16 sm:py-24 bg-[#080808] border-b border-[rgba(184,150,46,0.05)]" ref={processRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <m.p initial={{ opacity: 0 }} animate={processInView ? { opacity: 1 } : {}} className="font-label text-[#B8962E] tracking-widest text-sm mb-3 uppercase">PROCES SIMPLU</m.p>
            <m.h2 initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold">
              De la Întrebare la Volan în 24h
            </m.h2>
          </div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Desktop Dashed Line */}
            <div className="hidden lg:block absolute top-[50%] left-0 w-full border-t border-dashed border-[rgba(184,150,46,0.3)] z-0 -translate-y-[50%]" />
            
            {[
              { n: "01", val: "2 MINUTE", title: "Alegi Mașina", desc: "Selectezi mașina dorită din stocul nostru sau ne spui ce cauți." },
              { n: "02", val: "5 MINUTE", title: "Cerere Simplă", desc: "Completezi cererea online sau la sediu, doar cu buletinul." },
              { n: "03", val: "SUB 24H", title: "Aprobare Rapidă", desc: "Primești răspuns în aceeași zi și pleci cu mașina acasă." },
            ].map((step, i) => (
              <m.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={processInView ? { opacity: 1, y: 0 } : {}} 
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                className="bg-[#0E0E0E] z-10 relative border border-[rgba(184,150,46,0.12)] p-8 rounded-sm hover:border-[rgba(184,150,46,0.3)] transition-colors duration-300 flex flex-col"
              >
                <div className="absolute top-6 right-6 font-display text-7xl text-[#B8962E] opacity-15 leading-none font-bold select-none">{step.n}</div>
                <div className="w-8 h-px bg-[#B8962E] mb-6" />
                <h3 className="font-display text-xl text-[#F5F5F0] mb-3 relative z-10">{step.title}</h3>
                <p className="font-body text-sm text-[#888880] leading-relaxed mb-8 flex-grow relative z-10">{step.desc}</p>
                <div className="flex items-center gap-2 font-label text-[10px] tracking-widest text-[#B8962E] uppercase relative z-10">
                  <Clock size={12} />
                  <span>{step.val}</span>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CALCULATOR RATE */}
      <section id="calculator" className="py-16 sm:py-24 scroll-mt-20" ref={calcRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            animate={calcInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.2)] rounded-sm p-6 sm:p-10"
          >
            <div className="mb-12 border-b border-[rgba(184,150,46,0.12)] pb-8">
              <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">CALCULATOR</p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] mb-3 font-semibold">Cât Te Costă Mașina Dorită?</h2>
              <p className="font-body text-xs text-[#888880] uppercase tracking-widest">Curs fix 1 EUR = 5.0 RON · DAE 7.9% · TBI Bank</p>
            </div>

            <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-14">
              
              {/* Left Column: Inputs (7/12) */}
              <div className="lg:col-span-7 space-y-12">
                
                {/* Preț Masina */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <Label htmlFor="pretMasina" className="font-label text-sm tracking-widest text-[#888880] uppercase">PREȚ MAȘINĂ</Label>
                    <div className="font-display text-3xl sm:text-4xl text-[#B8962E] font-semibold tracking-tight">€ {formatNumber(pretMasina)}</div>
                  </div>
                  <Input 
                    id="pretMasina"
                    type="number" 
                    value={pretMasina} 
                    onChange={(e) => setPretMasina(Math.max(3000, Math.min(500000, Number(e.target.value))))}
                    className="bg-[#0A0A0A] border-[rgba(184,150,46,0.2)] text-[#F5F5F0] h-14 text-center font-body text-lg focus-visible:ring-1 focus-visible:ring-[#B8962E] focus-visible:border-[#B8962E] transition-all min-h-[44px]"
                  />
                </div>

                {/* Avans */}
                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <Label htmlFor="avansPercent" className="font-label text-sm tracking-widest text-[#888880] uppercase">AVANS</Label>
                    <div className="text-right">
                      <div className="font-display text-2xl text-[#F5F5F0] font-semibold" aria-live="polite">{avansPercent}%</div>
                    </div>
                  </div>
                  <Slider 
                    id="avansPercent"
                    defaultValue={[20]} 
                    max={70} 
                    step={5}
                    value={[avansPercent]}
                    onValueChange={(val) => setAvansPercent(val[0])}
                    className="py-4 cursor-pointer"
                    aria-label="Procent avans"
                  />
                  <div className="flex justify-between font-body text-xs text-[#888880]">
                    <span>Valoare avans: {formatNumber(avansEur)} €</span>
                    <span>{formatNumber(avansRon)} RON</span>
                  </div>
                </div>

                {/* Perioada */}
                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <Label htmlFor="perioada" className="font-label text-sm tracking-widest text-[#888880] uppercase">PERIOADĂ</Label>
                    <div className="font-display text-2xl text-[#F5F5F0] font-semibold" aria-live="polite">{perioada} luni</div>
                  </div>
                  <Slider 
                    id="perioada"
                    defaultValue={[60]} 
                    min={12}
                    max={72} 
                    step={12}
                    value={[perioada]}
                    onValueChange={(val) => setPerioada(val[0])}
                    className="py-4 cursor-pointer"
                    aria-label="Perioadă finanțare în luni"
                  />
                  <div className="flex justify-between font-label text-[10px] text-[#888880] uppercase">
                    <span>12</span>
                    <span>24</span>
                    <span>36</span>
                    <span>48</span>
                    <span>60</span>
                    <span>72</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Results (5/12) - Col reverse places it on top for mobile */}
              <div className="lg:col-span-5 relative">
                <div className="bg-[#080808] border border-[rgba(184,150,46,0.3)] shadow-[0_0_30px_rgba(184,150,46,0.05)] rounded-sm p-6 sm:p-8 flex flex-col h-full sticky top-24 z-10 transition-all duration-300">
                  <div className="mb-8">
                    <p className="font-label text-[#B8962E] text-[10px] tracking-[0.25em] uppercase mb-4">RATA LUNARĂ ESTIMATĂ</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-display text-5xl sm:text-6xl font-bold gradient-gold-text">{formatNumber(results.rata)}</span>
                      <span className="font-display text-xl text-[#B8962E] opacity-70">LEI</span>
                    </div>
                    <p className="font-body text-xs text-[#888880]">pe lună, timp de {perioada} luni</p>
                  </div>

                  <div className="border-t border-[rgba(184,150,46,0.1)] py-6 flex-grow">
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                      <div>
                        <div className="font-label text-[10px] text-[#888880] uppercase tracking-wider mb-1">Sumă finanțată</div>
                        <div className="font-body text-sm text-[#F5F5F0]">{formatNumber(results.principalRon)} RON</div>
                      </div>
                      <div>
                        <div className="font-label text-[10px] text-[#888880] uppercase tracking-wider mb-1">Total de plată</div>
                        <div className="font-body text-sm text-[#F5F5F0]">{formatNumber(results.totalDePlata)} RON</div>
                      </div>
                      <div>
                        <div className="font-label text-[10px] text-[#888880] uppercase tracking-wider mb-1">Total dobândă</div>
                        <div className="font-body text-sm text-[#F5F5F0]">{formatNumber(results.totalDobanda)} RON</div>
                      </div>
                      <div>
                        <div className="font-label text-[10px] text-[#888880] uppercase tracking-wider mb-1">DAE</div>
                        <div className="font-body text-sm text-[#B8962E] font-semibold">7.9%</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto space-y-4 pt-4">
                    <p className="font-body text-[11px] text-[#888880] italic leading-relaxed text-center mb-6">
                      * Calculul este orientativ. Oferta finală se stabilește individual, în funcție de profilul financiar.
                    </p>
                    <Link 
                      to="/contact?subiect=finantare" 
                      className="btn-gold w-full flex items-center justify-center gap-2 py-4 rounded-sm font-semibold tracking-wide min-h-[44px]"
                    >
                      <span>Solicită Ofertă Acum</span>
                      <ArrowRight size={16} />
                    </Link>
                    <div className="text-center">
                      <a href="tel:0754299199" className="font-body text-xs text-[#888880] hover:text-[#B8962E] transition-colors min-h-[44px] inline-flex items-center justify-center">
                        sau sună direct la 0754 299 199
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </m.div>
        </div>
      </section>

      {/* 4. CRITERII TBI BANK (Tabs) */}
      <section className="py-16 sm:py-24 bg-[#080808]" ref={tabsRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3 uppercase">CRITERII DE ELIGIBILITATE</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold mb-4">Condiții Finanțare TBI Bank</h2>
            <p className="font-body text-[#888880] leading-relaxed">Cea mai comună întrebare: mă încadrez? Iată condițiile exacte pentru finanțare auto prin TBI Bank.</p>
          </div>

          <div className="max-w-md mx-auto flex gap-2 sm:gap-4 mb-12" role="tablist" aria-label="Taburi eligibilitate credit">
            <button 
              id="tab-pf"
              role="tab"
              aria-selected={activeTab === "pf"}
              aria-controls="panel-pf"
              onClick={() => setActiveTab("pf")}
              className={`flex-1 py-4 px-2 sm:px-6 flex items-center justify-center gap-2 font-body font-medium text-sm transition-all duration-300 min-h-[56px] border-b-2 ${activeTab === "pf" ? "border-[#B8962E] text-[#B8962E]" : "border-transparent text-[#888880] hover:text-[#F5F5F0]"}`}
            >
              <User size={18} aria-hidden="true" />
              <span className="whitespace-nowrap">Persoane Fizice</span>
            </button>
            <button 
              id="tab-pj"
              role="tab"
              aria-selected={activeTab === "pj"}
              aria-controls="panel-pj"
              onClick={() => setActiveTab("pj")}
              className={`flex-1 py-4 px-2 sm:px-6 flex items-center justify-center gap-2 font-body font-medium text-sm transition-all duration-300 min-h-[56px] border-b-2 ${activeTab === "pj" ? "border-[#B8962E] text-[#B8962E]" : "border-transparent text-[#888880] hover:text-[#F5F5F0]"}`}
            >
              <Building2 size={18} aria-hidden="true" />
              <span className="whitespace-nowrap">Persoane Juridice</span>
            </button>
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "pf" && (
                <m.div 
                  id="panel-pf"
                  role="tabpanel"
                  aria-labelledby="tab-pf"
                  key="pf"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, exit: { duration: 0.15 } }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.12)] rounded-sm p-6 sm:p-8">
                    <div className="w-12 h-12 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center mb-6">
                      <CheckCircle2 className="text-[#B8962E]" size={24} />
                    </div>
                    <h3 className="font-display text-xl text-[#F5F5F0] mb-6">Eligibilitate</h3>
                    <ul className="space-y-3">
                      {["Vârstă: 18-75 ani (la finalizarea creditului)", "Minim 3 luni la actualul angajator (3 salarii încasate și declarate la ANAF)", "Salariu minim: 2.000 lei / Pensie minimă: 1.250 lei", "Venituri acceptate: salarii, pensii, PFA, șoferi cu diurne, chirii, dividende, indemnizații", "Se acceptă codebitor dacă clientul nu se încadrează singur (nu trebuie să fie din familie)"].map((li, i) => (
                        <li key={i} className="flex gap-3 text-sm font-body text-[#888880]">
                          <Check className="text-[#B8962E] w-4 h-4 shrink-0 mt-0.5" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.12)] rounded-sm p-6 sm:p-8 flex flex-col justify-center">
                    <div className="w-12 h-12 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center mb-6">
                      <Banknote className="text-[#B8962E]" size={24} />
                    </div>
                    <h3 className="font-display text-xl text-[#F5F5F0] mb-8">Detalii Credit</h3>
                    <div className="space-y-8">
                      <div>
                        <div className="font-display text-3xl sm:text-4xl gradient-gold-text mb-2 tracking-tight">3.000 - 150.000 RON</div>
                        <div className="font-body text-sm text-[#888880]">Sumă ce poate fi finanțată</div>
                      </div>
                      <div>
                        <div className="font-display text-3xl sm:text-4xl gradient-gold-text mb-2 tracking-tight">15 - 120 MINUTE</div>
                        <div className="font-body text-sm text-[#888880]">Timp estimat de răspuns</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.12)] rounded-sm p-6 sm:p-8">
                    <div className="w-12 h-12 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center mb-6">
                      <Globe className="text-[#B8962E]" size={24} />
                    </div>
                    <h3 className="font-display text-xl text-[#F5F5F0] mb-6">Venituri din Străinătate</h3>
                    <ul className="space-y-3">
                      {[
                        "Contract de muncă pe perioadă nedeterminată, vechime minim 6 luni",
                        "Cu istoric de creditare în România (ultimii 5 ani): fără girant",
                        "Fără istoric: girant angajat minim 3 luni (se acceptă și pensionari)"
                      ].map((li, i) => (
                        <li key={i} className="flex gap-3 text-sm font-body text-[#888880]">
                          <Check className="text-[#B8962E] w-4 h-4 shrink-0 mt-0.5" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              )}

              {activeTab === "pj" && (
                <m.div 
                  id="panel-pj"
                  role="tabpanel"
                  aria-labelledby="tab-pj"
                  key="pj"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, exit: { duration: 0.15 } }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                >
                  <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.12)] rounded-sm p-6 sm:p-8">
                    <div className="w-12 h-12 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center mb-6">
                      <CheckCircle2 className="text-[#B8962E]" size={24} />
                    </div>
                    <h3 className="font-display text-xl text-[#F5F5F0] mb-6">Eligibilitate</h3>
                    <ul className="space-y-3">
                      {[
                        "Cifră de afaceri minimă: 500.000 RON",
                        "Pentru transport și construcții: minim 1.500.000 RON cifră de afaceri",
                        "Vechime firmă: minim 1 an",
                        "Bilanțul anului anterior depus"
                      ].map((li, i) => (
                        <li key={i} className="flex gap-3 text-sm font-body text-[#888880]">
                          <Check className="text-[#B8962E] w-4 h-4 shrink-0 mt-0.5" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.12)] rounded-sm p-6 sm:p-8 flex flex-col justify-center">
                    <div className="w-12 h-12 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center mb-6">
                      <Banknote className="text-[#B8962E]" size={24} />
                    </div>
                    <h3 className="font-display text-xl text-[#F5F5F0] mb-8">Detalii Finanțare</h3>
                    <div className="space-y-8">
                      <div>
                        <div className="font-display text-3xl sm:text-4xl gradient-gold-text mb-2 tracking-tight">Până la 250.000 RON</div>
                        <div className="font-body text-sm text-[#888880]">Sumă maximă finanțată</div>
                      </div>
                      <div>
                        <div className="font-display text-3xl sm:text-4xl gradient-gold-text mb-2 tracking-tight">10% CA</div>
                        <div className="font-body text-sm text-[#888880]">Se finanțează până la 10% din cifra de afaceri</div>
                      </div>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. PARTENERI FINANȚARE */}
      <section className="bg-[#080808]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="font-label text-[10px] tracking-[0.3em] text-[#888880] text-center mb-8 uppercase">PARTENERI OFICIALI DE FINANȚARE</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {["TBI Bank", "UniCredit", "Mogo IFN", "BT Rate"].map((partner, i, arr) => (
              <div key={partner} className="flex items-center gap-6 sm:gap-12">
                <span className="font-display text-xl sm:text-2xl text-[#888880] hover:text-[#B8962E] transition-colors duration-300 cursor-default select-none">{partner}</span>
                {i < arr.length - 1 && <div className="w-px h-6 bg-[rgba(184,150,46,0.15)] hidden sm:block" />}
              </div>
            ))}
          </div>
          <p className="font-body text-[11px] text-[#888880]/60 text-center mt-10 max-w-lg mx-auto">
            Oferta finală se stabilește individual, în funcție de profilul financiar al clientului.
          </p>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-16 sm:py-24 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <div className="text-center mb-12 w-full">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">ÎNTREBĂRI FRECVENTE</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold">Tot Ce Vrei Să Știi</h2>
          </div>
          <div className="divide-y-0 w-full mb-8">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
          
          <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.2)] rounded-sm p-6 sm:p-10 text-center w-full mt-4">
            <h3 className="font-display text-xl sm:text-2xl text-[#F5F5F0] mb-2">Nu ai găsit răspunsul?</h3>
            <p className="font-body text-sm text-[#888880] mb-8">Sună-ne direct, echipa MEDFIL te ajută în 2 minute.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:0754299199" className="btn-gold py-3 px-8 rounded-sm text-sm font-semibold w-full sm:w-auto text-center min-h-[44px] flex items-center justify-center">
                Sună 0754 299 199
              </a>
              <a href="https://wa.me/40754299199?text=Salut%2C%20am%20o%20%C3%AEntrebare%20despre%20finan%C8%9Bare..." target="_blank" rel="noopener noreferrer" className="btn-ghost py-3 px-8 rounded-sm text-sm font-semibold w-full sm:w-auto text-center min-h-[44px] flex items-center justify-center">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#080808] via-[#0A0A0A] to-[#080808]">
        {/* Borders */}
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8962E]/40 to-transparent" />
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8962E]/40 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] font-semibold mb-6">Gata să iei mașina în rate?</h2>
          <p className="font-body text-base text-[#888880] max-w-md mx-auto mb-10 leading-relaxed">
            Aprobarea durează cât o cafea. Alege mașina și noi ne ocupăm de restul.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/stoc" className="btn-gold py-4 px-8 rounded-sm text-sm font-semibold tracking-wide w-full sm:w-auto min-h-[44px] flex items-center justify-center">
              Vezi Stocul de Mașini
            </Link>
            <Link to="/contact" className="btn-ghost py-4 px-8 rounded-sm text-sm font-semibold tracking-wide w-full sm:w-auto min-h-[44px] flex items-center justify-center border border-[rgba(184,150,46,0.2)]">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
