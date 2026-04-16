import { useState, useRef, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { m, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { 
  Clock, 
  ChevronRight, 
  ChevronDown,
  Network, 
  Tag, 
  Search, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Check,
  Share2,
  Handshake,
  ShieldCheck,
  Send,
  ArrowRight
} from "lucide-react";
import { submitContactForm } from "@/lib/api";
import { getServiceSchema } from "@/lib/seo/schemas";
const faqs = [
  { q: "Cât durează până găsiți mașina?", a: "Depinde de specificul cererii. Pentru mașini comune (BMW, Mercedes, Audi — modele standard), găsim opțiuni în 2-7 zile. Pentru mașini rare sau cu dotări specifice, poate dura 2-4 săptămâni. Te ținem la curent săptămânal cu progresul căutării." },
  { q: "Există un comision pentru serviciul de căutare?", a: "Nu există comision separat pentru căutare. Prețul pe care ți-l prezentăm este prețul final — fără costuri ascunse. Noi lucrăm cu marje negociate direct cu furnizorii, deci tu plătești un preț corect de piață." },
  { q: "Ce se întâmplă dacă nu îmi place nicio opțiune prezentată?", a: "Nu ai nicio obligație să cumperi. Dacă primele opțiuni nu te mulțumesc, îți putem prezenta alte variante sau putem ajusta căutarea pe baza feedback-ului tău. Zero presiune, zero avansuri plătite până nu alegi o mașină." },
  { q: "Cum garantați că mașina e fără probleme?", a: "Fiecare mașină trece prin inspecție de 150+ puncte înainte de livrare. Primești raportul complet, istoricul tehnic (CARFAX sau echivalent), și o garanție de 12 luni pe motor și cutia de viteze. Dacă apar probleme în perioada de garanție, acoperim costurile." },
  { q: "Pot plăti în rate mașina găsită prin comandă?", a: "Da. Orice mașină din comanda personalizată poate fi finanțată prin partenerii noștri (TBI Bank, UniCredit). Aprobarea e aceeași ca pentru mașinile din stoc — rapid, doar cu buletinul. Vezi pagina de Finanțare pentru detalii." },
  { q: "Aduceți și mașini din străinătate (Germania, Olanda)?", a: "Da, avem parteneri verificați în Germania, Olanda și Belgia pentru import direct. Pentru import, procesul durează mai mult (3-6 săptămâni) dar accesul e la mașini cu istoric mult mai curat și prețuri uneori mai bune. Discutăm opțiuni în timpul apelului de confirmare." },
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

export default function Comanda() {
  const { ref: trustRef, inView: trustInView } = useInView(0.1);
  const { ref: processRef, inView: processInView } = useInView(0.1);
  
  const wizardRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [currentStep]);
  
  const [formData, setFormData] = useState({
    nume: "",
    telefon: "",
    marca: "",
    model: "",
    an: "2025",
    buget: "",
    combustibil: [] as string[],
    cutieViteze: "Oricare",
    observatii: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Curăță eroarea când se scrie
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFuelChange = (fuel: string) => {
    setFormData(prev => {
      const isSelected = prev.combustibil.includes(fuel);
      if (isSelected) {
        return { ...prev, combustibil: prev.combustibil.filter(f => f !== fuel) };
      } else {
        return { ...prev, combustibil: [...prev.combustibil, fuel] };
      }
    });
  };

  const validateStep = (step: number) => {
    let errors: Record<string, string> = {};
    let isValid = true;
    
    if (step === 1) {
      if (!formData.buget || isNaN(Number(formData.buget))) {
        errors.buget = "Introduceți un buget aproximativ (obligatoriu).";
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.nume || formData.nume.trim().length === 0) {
        errors.nume = "Numele este obligatoriu.";
        isValid = false;
      }
      if (!formData.telefon || formData.telefon.trim().length < 9) {
        errors.telefon = "Numărul de telefon este invalid.";
        isValid = false;
      }
    }
    
    setValidationErrors(errors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setErrorMessage("");
      setCurrentStep(s => s + 1);
      setTimeout(() => {
        wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    setCurrentStep(s => s - 1);
    setTimeout(() => {
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formattedMessage = `
🔍 CERERE MAȘINĂ LA COMANDĂ

👤 Nume: ${formData.nume}
📞 Telefon: ${formData.telefon}
🏷️ Marcă dorită: ${formData.marca || 'Nespecificat'}
📋 Model dorit: ${formData.model || 'Nespecificat'}
📅 An minim: ${formData.an}
💰 Buget maxim: ${formData.buget ? formData.buget + ' €' : 'Nespecificat'}
⛽ Combustibil: ${formData.combustibil.length > 0 ? formData.combustibil.join(', ') : 'Oricare'}
⚙️ Cutie viteze: ${formData.cutieViteze}

📝 Observații:
${formData.observatii || 'Fără observații'}
`.trim();

    try {
      const result = await submitContactForm({
        name: formData.nume,
        email: 'medfilautomobile@gmail.com',
        phone: formData.telefon,
        message: formattedMessage,
      });

      if (result.success) {
        setSuccessMessage("Cererea ta a fost primită! Te sunăm în maxim 24 de ore cu primele opțiuni găsite.");
      } else {
        setErrorMessage(result.error || "A apărut o eroare la trimiterea cererii.");
      }
    } catch (err) {
      setErrorMessage("Eroare de rețea. Încearcă din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  const stepsTimeline = [
    { n: "01", durata: "2 MINUTE", titlu: "Ne Spui Ce Vrei", descriere: "Completezi formularul nostru cu specificațiile mașinii dorite. Suntem interesați de marcă, model, buget și dotări obligatorii — cu cât ești mai specific, cu atât căutarea e mai eficientă.", detalii: ["Marca, model și an minim", "Buget maxim (opțional)", "Dotări obligatorii (ex: trapă, scaune încălzite, cutie automată)"] },
    { n: "02", durata: "2-7 ZILE", titlu: "Căutăm Pentru Tine", descriere: "Accesăm rețeaua noastră națională de furnizori verificați, reprezentanțe auto și parcuri auto cu care avem istoric. Nu lucrăm cu site-uri publice — accesul nostru e la oferte care nu ajung în piață.", detalii: ["40+ furnizori verificați în rețea", "Parteneri în Germania, Olanda și Belgia pentru import direct", "Filtre aplicate: istoric curat, km reali, garanție motor+cutie"] },
    { n: "03", durata: "ÎN ACEEAȘI ZI", titlu: "Prezentăm Opțiunile", descriere: "Îți trimitem opțiunile găsite cu poze detaliate, raport de inspecție, istoric complet și prețul final. Tu alegi dacă continuăm, negociem sau căutăm altceva. Zero presiune.", detalii: ["Minim 3 opțiuni prezentate pe cerere", "Raport inspecție 150+ puncte", "Istoric CARFAX sau echivalent inclus"] },
    { n: "04", durata: "7-14 ZILE", titlu: "Livrare la Tine", descriere: "Finalizăm tranzacția cu furnizorul și coordonăm livrarea. Mașina vine direct la ușa ta, oriunde în România. Pentru clienții din zona Cluj, livrare gratuită.", detalii: ["Transport asigurat la domiciliu", "Documente pregătite pentru înmatriculare", "Livrare gratuită în județul Cluj"] }
  ];

  return (
    <div className="min-h-screen bg-[#080808]">
      <SEO
        title="Mașini la Comandă Cluj - Import Auto Germania | MEDFIL"
        description="Aducem mașina pe comandă din străinătate sau România. Transparență 100%, preț negociat, garanție 12 luni. Serviciu complet de brokeraj auto."
        canonical="https://medfil.ro/comanda"
        structuredData={[getServiceSchema("Brokeraj Auto / Mașini la Comandă", "Aducem mașina pe comandă din străinătate sau România.")]}
      />

      {/* 1. HERO */}
      <div className="relative pt-24 pb-16 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)] overflow-hidden" style={{ minHeight: "40vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-6">
            <a href="/" className="hover:text-[#B8962E] transition-colors duration-300">Acasă</a>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Mașini la Comandă</span>
          </div>
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-label text-[#B8962E] tracking-widest text-sm mb-3">
            COMANDĂ PERSONALIZATĂ
          </m.p>
          <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F0] mb-4">
            Nu Ai Găsit<br />
            <span className="gradient-gold-text">Ce Cauți?</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-[#888880] text-base sm:text-lg max-w-xl leading-relaxed">
            Îți aducem noi mașina dorită, oriunde în România. Rețea națională de furnizori, prețuri negociate.
          </m.p>
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <a href="#formular" className="btn-gold py-4 px-8 rounded-sm text-sm sm:text-base inline-flex items-center gap-2 min-h-[44px]">
              Începe Cererea
              <ChevronDown size={18} />
            </a>
            <div className="flex items-center gap-2 text-[#888880]">
              <span className="hidden sm:inline">·</span>
              <a href="#proces" className="font-body text-sm hover:text-[#B8962E] transition-colors">sau <span className="underline decoration-[rgba(184,150,46,0.3)] underline-offset-4">Cum funcționează?</span></a>
            </div>
          </m.div>
        </div>
      </div>

      {/* 2. TRUST STRIP */}
      <div className="bg-[#080808]">
        <div ref={trustRef as any} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1 */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={trustInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0 }} className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6">
              <div className="flex items-end gap-4">
                <div className="w-12 h-12 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center shrink-0">
                  <Share2 className="text-[#B8962E]" size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-4xl leading-none gradient-gold-text mb-1">40+</div>
                  <div className="font-label text-[10px] text-[#B8962E]/70 tracking-widest leading-none">FURNIZORI VERIFICAȚI</div>
                </div>
              </div>
              <h3 className="font-display text-lg text-[#F5F5F0] mt-6 mb-2">Rețea Națională</h3>
              <p className="font-body text-sm text-[#888880] leading-relaxed">Furnizori verificați din toată România, parteneri de încredere pentru mașini premium.</p>
            </m.div>

            {/* Card 2 */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={trustInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6">
              <div className="flex items-end gap-4">
                <div className="w-12 h-12 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center shrink-0">
                  <Handshake className="text-[#B8962E]" size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-4xl leading-none gradient-gold-text mb-1">100%</div>
                  <div className="font-label text-[10px] text-[#B8962E]/70 tracking-widest leading-none">FĂRĂ COMISIOANE ASCUNSE</div>
                </div>
              </div>
              <h3 className="font-display text-lg text-[#F5F5F0] mt-6 mb-2">Prețuri Negociate</h3>
              <p className="font-body text-sm text-[#888880] leading-relaxed">Negociem direct cu furnizorii pentru cel mai bun preț — fără comision ascuns pentru tine.</p>
            </m.div>

            {/* Card 3 */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={trustInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6">
              <div className="flex items-end gap-4">
                <div className="w-12 h-12 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-[#B8962E]" size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-4xl leading-none gradient-gold-text mb-1">150+</div>
                  <div className="font-label text-[10px] text-[#B8962E]/70 tracking-widest leading-none">PUNCTE VERIFICATE</div>
                </div>
              </div>
              <h3 className="font-display text-lg text-[#F5F5F0] mt-6 mb-2">Inspecție Completă</h3>
              <p className="font-body text-sm text-[#888880] leading-relaxed">Peste 150 puncte verificate înainte de livrare — istoric, mecanică, exterior.</p>
            </m.div>
          </div>
        </div>
      </div>

      {/* 3. TIMELINE VERTICAL */}
      <section id="proces" className="py-16 sm:py-24 bg-[#0A0A0A] border-y border-[rgba(184,150,46,0.05)] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">PROCESUL</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] gold-underline gold-underline-center pb-4 inline-block">De la Cerere la Volan în 4 Pași</h2>
            <p className="font-body text-sm sm:text-base text-[#888880] max-w-xl mx-auto mt-6 leading-relaxed">
              Fiecare pas e transparent. Te ținem la curent la fiecare etapă, de la momentul în care ne trimiți cererea până când ajunge mașina la tine.
            </p>
          </div>

          <div ref={processRef as any} className="relative pl-10 sm:pl-16">
            <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(184,150,46,0.4)] via-[rgba(184,150,46,0.4)] to-transparent" />
            
            {stepsTimeline.map((step, i) => (
              <m.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative mb-14 last:mb-0"
              >
                <div className="absolute -left-[30px] sm:-left-[50px] top-1 w-6 h-6 rounded-full bg-[#080808] border-[2px] border-[#B8962E] flex items-center justify-center shadow-[0_0_8px_rgba(184,150,46,0.2)]">
                  <div className="w-2 h-2 rounded-full bg-[#B8962E]" />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-label text-[#B8962E] text-xs tracking-widest">PAS {step.n}</span>
                    <span className="w-8 h-px bg-[rgba(184,150,46,0.3)]" />
                    <span className="font-label text-[#888880] text-[10px] tracking-widest">{step.durata}</span>
                  </div>
                  <h3 className="font-display text-2xl text-[#F5F5F0] mb-3">{step.titlu}</h3>
                  <p className="font-body text-sm text-[#888880] leading-relaxed mb-4">{step.descriere}</p>
                  
                  {step.detalii && (
                    <ul className="space-y-1.5 mt-2 bg-[#0E0E0E] border border-[rgba(184,150,46,0.1)] rounded-sm p-4 inline-block w-full sm:w-auto">
                      {step.detalii.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm font-body text-[#888880]">
                          <span className="text-[#B8962E] flex-shrink-0 mt-[-2px] text-lg leading-none">·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MULTI-STEP WIZARD FORMULAR */}
      <section id="formular" className="py-16 sm:py-24 bg-[#080808] scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">TRIMITE CEREREA</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold mb-3">Spune-ne Ce Cauți</h2>
            <p className="font-body text-[#888880]">3 pași rapizi. Te sunăm în maxim 24 de ore cu primele opțiuni.</p>
          </div>

          <div ref={wizardRef} className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.3)] rounded-sm p-6 sm:p-10 shadow-gold scroll-mt-32">
            
            {successMessage ? (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#B8962E] bg-[rgba(184,150,46,0.05)] shadow-[0_0_30px_rgba(184,150,46,0.15)] flex items-center justify-center">
                  <Check size={40} className="text-[#B8962E]" strokeWidth={2} />
                </div>
                <h3 className="font-display text-3xl text-[#F5F5F0] mb-4">Cerere Primită!</h3>
                <p className="font-body text-base text-[#888880] max-w-md mx-auto mb-8 leading-relaxed">
                  {successMessage}
                </p>
                <div className="border-t border-[rgba(184,150,46,0.15)] pt-6 mt-6">
                  <p className="font-label text-xs text-[#B8962E] tracking-widest mb-5 uppercase">CE URMEAZĂ</p>
                  <ul className="text-left max-w-sm mx-auto space-y-4 font-body text-sm text-[#888880]">
                    <li className="flex gap-4">
                      <div className="text-[#B8962E] font-display text-xl leading-none mt-[-2px]">01</div>
                      <span className="leading-relaxed">Îți procesăm cererea în maxim 24 de ore.</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="text-[#B8962E] font-display text-xl leading-none mt-[-2px]">02</div>
                      <span className="leading-relaxed">Te sunăm pentru a confirma detaliile și preferințele.</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="text-[#B8962E] font-display text-xl leading-none mt-[-2px]">03</div>
                      <span className="leading-relaxed">Căutăm în rețeaua noastră și-ți trimitem opțiunile.</span>
                    </li>
                  </ul>
                </div>
              </m.div>
            ) : (
              <>
                {/* Steps indicator */}
                <div className="flex items-center justify-between mb-10 sm:mb-12 relative px-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label="Progres formular solicitare">
                  <div className="sr-only" role="status" aria-live="polite">
                    Ați ajuns la pasul {currentStep} din 3.
                  </div>
                  <div className="absolute top-4 left-4 right-4 h-px bg-[rgba(184,150,46,0.15)]" />
                  <div 
                    className="absolute top-4 left-4 h-px bg-[#B8962E] transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / 2) * (100 - 8)}%` }}
                  />
                  
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="relative z-10 flex flex-col items-center" aria-hidden="true">
                       <div className={`w-8 h-8 rounded-full border-[2px] flex items-center justify-center font-body text-sm font-semibold transition-all duration-300 ${
                        currentStep >= step 
                          ? 'bg-[#B8962E] border-[#B8962E] text-[#080808] shadow-[0_0_12px_rgba(184,150,46,0.4)]' 
                          : 'bg-[#0E0E0E] border-[rgba(184,150,46,0.3)] text-[#888880]'
                      }`}>
                        {currentStep > step ? <Check size={14} strokeWidth={3} /> : step}
                      </div>
                      <span className={`font-label text-[10px] sm:text-xs tracking-widest mt-3 transition-colors duration-300 ${
                        currentStep >= step ? 'text-[#B8962E]' : 'text-[#888880]'
                      }`}>
                        {step === 1 ? 'MAȘINA' : step === 2 ? 'PREFERINȚE' : 'CONTACT'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden min-h-[350px]">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1 */}
                    {currentStep === 1 && (
                      <m.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <h3 ref={stepHeadingRef} tabIndex={-1} className="font-display text-lg text-[#F5F5F0] mb-2 focus:outline-none">Pasul 1: Ce Mașină Cauți?</h3>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="marca" className="font-label text-[10px] text-[#888880] tracking-widest block mb-2 uppercase">Marca dorită</label>
                            <input 
                              id="marca"
                              name="marca"
                              value={formData.marca}
                              onChange={handleInputChange}
                              className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]" 
                              placeholder="ex: BMW, Mercedes, Audi..." 
                            />
                          </div>
                          <div>
                            <label htmlFor="model" className="font-label text-[10px] text-[#888880] tracking-widest block mb-2 uppercase">Model dorit</label>
                            <input 
                              id="model"
                              name="model"
                              value={formData.model}
                              onChange={handleInputChange}
                              className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]" 
                              placeholder="ex: Seria 5, E-Class, A6..." 
                            />
                          </div>
                          <div>
                            <label htmlFor="an" className="font-label text-[10px] text-[#888880] tracking-widest block mb-2 uppercase">An minim</label>
                            <select 
                              id="an"
                              name="an"
                              value={formData.an}
                              onChange={handleInputChange}
                              className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]"
                            >
                              {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="buget" className="font-label text-[10px] text-[#888880] tracking-widest block mb-2 uppercase">Buget maxim (€) *</label>
                            <input 
                              id="buget"
                              type="number" 
                              name="buget"
                              value={formData.buget}
                              onChange={handleInputChange}
                              aria-required="true"
                              aria-invalid={!!validationErrors.buget}
                              aria-describedby={validationErrors.buget ? "buget-error" : undefined}
                              className={`w-full bg-[#111] border ${validationErrors.buget ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'} text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]`} 
                              placeholder="ex: 35000" 
                            />
                            {validationErrors.buget && <p id="buget-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.buget}</p>}
                          </div>
                        </div>
                        <p className="font-body text-xs text-[#888880]/70 italic mt-4">
                          Lasă câmpul marca/model gol dacă nu ai o preferință clară — te ajutăm cu sugestii bazate pe buget.
                        </p>
                        <div className="flex justify-end pt-4 mt-8 border-t border-[rgba(184,150,46,0.1)]">
                          <button onClick={handleNextStep} className="btn-gold py-3 px-8 rounded-sm text-sm font-semibold min-h-[44px] flex items-center gap-2">
                            Următorul <ArrowRight size={16} />
                          </button>
                        </div>
                      </m.div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                      <m.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <h3 ref={stepHeadingRef} tabIndex={-1} className="font-display text-lg text-[#F5F5F0] mb-6 focus:outline-none">Pasul 2: Preferințele Tale</h3>
                        
                        <fieldset>
                          <legend className="font-label text-[10px] text-[#888880] tracking-widest block mb-3 uppercase">Combustibil preferat</legend>
                          <div className="flex flex-wrap gap-3">
                            {["Diesel", "Benzină", "Hybrid", "Electric", "Oricare"].map((f) => {
                              const checked = formData.combustibil.includes(f);
                              return (
                                <label key={f} className={`flex items-center gap-2 border px-4 py-2.5 rounded-sm cursor-pointer transition-colors min-h-[44px] ${checked ? 'border-[#B8962E] bg-[rgba(184,150,46,0.08)]' : 'border-[rgba(184,150,46,0.2)] hover:border-[rgba(184,150,46,0.5)]'}`}>
                                  <input 
                                    type="checkbox" 
                                    checked={checked}
                                    onChange={() => handleFuelChange(f)}
                                    className="accent-[#B8962E] w-4 h-4" 
                                  />
                                  <span className={`font-body text-sm ${checked ? 'text-[#F5F5F0]' : 'text-[#888880]'}`}>{f}</span>
                                </label>
                              )
                            })}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className="font-label text-[10px] text-[#888880] tracking-widest block mb-3 uppercase">Cutie de viteze</legend>
                          <div className="flex flex-wrap gap-3">
                            {["Automată", "Manuală", "Oricare"].map((t) => {
                              const checked = formData.cutieViteze === t;
                              return (
                                <label key={t} className={`flex items-center gap-2 border px-4 py-2.5 rounded-sm cursor-pointer transition-colors min-h-[44px] ${checked ? 'border-[#B8962E] bg-[rgba(184,150,46,0.08)]' : 'border-[rgba(184,150,46,0.2)] hover:border-[rgba(184,150,46,0.5)]'}`}>
                                  <input 
                                    type="radio" 
                                    name="cutieViteze" 
                                    value={t}
                                    checked={checked}
                                    onChange={handleInputChange}
                                    className="accent-[#B8962E] w-4 h-4" 
                                  />
                                  <span className={`font-body text-sm ${checked ? 'text-[#F5F5F0]' : 'text-[#888880]'}`}>{t}</span>
                                </label>
                              )
                            })}
                          </div>
                        </fieldset>

                        <div>
                          <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2 uppercase">Alte preferințe sau observații</label>
                          <textarea 
                            rows={3} 
                            name="observatii"
                            value={formData.observatii}
                            onChange={handleInputChange}
                            className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors resize-none" 
                            placeholder="ex: culoare preferată, dotări obligatorii (trapă, head-up display), dealeri evitați..." 
                          />
                        </div>

                        <div className="flex justify-between items-center pt-4 mt-8 border-t border-[rgba(184,150,46,0.1)]">
                          <button onClick={handlePrevStep} className="btn-ghost px-4 sm:px-6 py-3 rounded-sm text-sm font-semibold min-h-[44px]">
                            ← Înapoi
                          </button>
                          <button onClick={handleNextStep} className="btn-gold py-3 px-8 rounded-sm text-sm font-semibold min-h-[44px] flex items-center gap-2">
                            Următorul <ArrowRight size={16} />
                          </button>
                        </div>
                      </m.div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                      <m.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 ref={stepHeadingRef} tabIndex={-1} className="font-display text-lg text-[#F5F5F0] mb-2 focus:outline-none">Pasul 3: Cum Te Putem Contacta?</h3>
                        <p className="font-body text-sm text-[#888880] mb-6">Ultimul pas. Promitem că nu vom face spam. Te sunăm doar când avem opțiuni concrete.</p>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="nume" className="font-label text-[10px] text-[#888880] tracking-widest block mb-2 uppercase">Nume Complet *</label>
                            <input 
                              id="nume"
                              name="nume"
                              value={formData.nume}
                              onChange={handleInputChange}
                              disabled={isLoading}
                              aria-required="true"
                              aria-invalid={!!validationErrors.nume}
                              aria-describedby={validationErrors.nume ? "nume-error" : undefined}
                              className={`w-full bg-[#111] border ${validationErrors.nume ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'} text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]`} 
                              placeholder="Ion Popescu" 
                            />
                            {validationErrors.nume && <p id="nume-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.nume}</p>}
                          </div>
                          <div>
                            <label htmlFor="telefon" className="font-label text-[10px] text-[#888880] tracking-widest block mb-2 uppercase">Telefon *</label>
                            <input 
                              id="telefon"
                              type="tel" 
                              name="telefon"
                              value={formData.telefon}
                              onChange={handleInputChange}
                              disabled={isLoading}
                              aria-required="true"
                              aria-invalid={!!validationErrors.telefon}
                              aria-describedby={validationErrors.telefon ? "telefon-error" : undefined}
                              className={`w-full bg-[#111] border ${validationErrors.telefon ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'} text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]`} 
                              placeholder="07xx xxx xxx" 
                            />
                            {validationErrors.telefon && <p id="telefon-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.telefon}</p>}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-[#080808] border border-[rgba(184,150,46,0.1)] rounded-sm p-5 mt-8 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <span className="font-label text-xs tracking-widest text-[#B8962E] uppercase">REZUMATUL CERERII TALE</span>
                            <button onClick={() => setCurrentStep(1)} className="font-body text-xs text-[#888880] hover:text-[#B8962E] underline underline-offset-2">Editează cererea</button>
                          </div>
                          <ul className="space-y-2 font-body text-sm text-[#888880]">
                            <li><strong className="text-[#F5F5F0] font-medium">Mașină:</strong> {formData.marca || "Oricare marcă"} {formData.model ? formData.model : "— orice model"}</li>
                            <li><strong className="text-[#F5F5F0] font-medium">An / Buget:</strong> Minim {formData.an} / până la {formData.buget} €</li>
                            <li><strong className="text-[#F5F5F0] font-medium">Transmisie:</strong> {formData.cutieViteze}</li>
                            <li><strong className="text-[#F5F5F0] font-medium">Combustibil:</strong> {formData.combustibil.length > 0 ? formData.combustibil.join(", ") : "Oricare"}</li>
                            {formData.observatii && <li><strong className="text-[#F5F5F0] font-medium">Extra:</strong> {formData.observatii.substring(0, 60)}{formData.observatii.length > 60 ? "..." : ""}</li>}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 mt-8 border-t border-[rgba(184,150,46,0.1)] gap-4">
                          <button onClick={handlePrevStep} disabled={isLoading} className="btn-ghost px-6 py-3 rounded-sm text-sm font-semibold min-h-[44px] w-full sm:w-auto">
                            ← Înapoi
                          </button>
                          <button onClick={handleSubmit} disabled={isLoading} className="btn-gold py-4 px-8 rounded-sm text-sm font-semibold w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2">
                            {isLoading ? (
                              <>
                                <Loader2 className="animate-spin" size={18} />
                                <span>Se trimite...</span>
                              </>
                            ) : (
                              <>
                                Trimite Cererea <Send size={16} />
                              </>
                            )}
                          </button>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
            
            {/* Error Banner outside of success area */}
            <AnimatePresence>
              {errorMessage && !successMessage && (
                <m.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 bg-red-500/10 border border-red-500 rounded-sm flex items-start gap-3"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-body text-red-500 leading-relaxed">{errorMessage}</p>
                </m.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* 5. FAQ SPECIFIC COMENZI */}
      <section className="py-16 sm:py-24 bg-[#0A0A0A] border-t border-[rgba(184,150,46,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">ÎNTREBĂRI FRECVENTE</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold">Tot Ce Vrei Să Știi Despre Comenzi</h2>
          </div>
          <div className="divide-y-0 w-full mb-10">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
          <p className="font-body text-sm text-[#888880] text-center max-w-sm mx-auto">
            Ai altă întrebare? <a href="tel:0754299199" className="text-[#F5F5F0] hover:text-[#B8962E] font-medium underline decoration-[#B8962E]/50 underline-offset-4 transition-colors">Sună 0754 299 199</a> sau scrie-ne pe <a href="https://wa.me/40754299199" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F0] hover:text-[#B8962E] font-medium underline decoration-[#B8962E]/50 underline-offset-4 transition-colors">WhatsApp</a>.
          </p>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#080808] via-[#0A0A0A] to-[#080808]">
        {/* Borders */}
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8962E]/40 to-transparent" />
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8962E]/40 to-transparent" />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold mb-4">Nu Ai Timp Să Completezi Acum?</h2>
          <p className="font-body text-base text-[#888880] mb-10 leading-relaxed">
            Sună-ne direct. <strong className="font-medium text-[#F5F5F0]">Echipa MEDFIL te ajută în 2 minute.</strong> Îți luăm cererea la telefon, fără să completezi nimic online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:0754299199" className="btn-gold py-4 px-8 rounded-sm text-sm font-semibold tracking-wide w-full sm:w-auto min-h-[44px] flex items-center justify-center">
              Sună Acum — 0754 299 199
            </a>
            <a href="https://wa.me/40754299199?text=Bun%C4%83%20ziua%2C%20a%C8%99%20dori%20s%C4%83%20comand%20o%20ma%C8%99in%C4%83%20personalizat%C4%83." target="_blank" rel="noopener noreferrer" className="btn-ghost py-4 px-8 rounded-sm text-sm font-semibold tracking-wide w-full sm:w-auto min-h-[44px] flex items-center justify-center border border-[rgba(184,150,46,0.2)]">
              Scrie pe WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
