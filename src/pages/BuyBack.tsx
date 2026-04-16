import { useState, useRef, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { m, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { 
  Clock, 
  ChevronRight, 
  ChevronDown,
  AlertCircle, 
  Loader2, 
  Check,
  MessageCircle,
  Repeat,
  Gift,
  MapPin,
  Send,
  ArrowRight
} from "lucide-react";
import { submitContactForm } from "@/lib/api";
import { getServiceSchema } from "@/lib/seo/schemas";
const faqs = [
  { q: "Cumpărați direct mașina mea?", a: "Momentan, nu — nu avem capital circulant dedicat exclusiv achizițiilor directe. Ce oferim este consultanță gratuită pentru vânzarea la preț corect sau, dacă vrei upgrade, part-exchange cu o mașină din stocul nostru. Ești transparent informat din start, fără surprize." },
  { q: "Cât costă evaluarea?", a: "Nimic. Evaluarea e 100% gratuită, indiferent dacă alegi consultanță, part-exchange sau dacă decizi să nu continui. Investim timpul nostru pentru că, dacă ajungi să faci part-exchange cu noi, câștigăm amândoi. Dacă nu — ai primit oricum o opinie corectă despre prețul mașinii tale." },
  { q: "Cât durează până primesc evaluarea?", a: "Maxim 24 de ore de la trimiterea cererii. De obicei sunăm în aceeași zi dacă cererea vine înainte de prânz. Pentru mașini comune (modele populare, an recent), estimarea inițială vine chiar mai repede." },
  { q: "Ce se întâmplă dacă mașina are defecte?", a: "Nu te judecăm și nu refuzăm evaluarea. Majoritatea mașinilor second-hand au defecte minore sau majore — asta face parte din piață. Te sfătuim cum să le comunici eficient cumpărătorilor și cum influențează prețul real. Transparența crește șansele de vânzare rapidă." },
  { q: "Dacă aleg part-exchange, cum se calculează valoarea mașinii mele?", a: "Folosim 3 repere: (a) prețul mediu al modelului tău pe piața din România (Autovit, OLX), (b) starea tehnică reală după inspecție fizică, (c) diferența față de mașina din stocul nostru pe care o dorești. Calculul e transparent — îți arătăm fiecare factor când discutăm." },
  { q: "Pot aduce mașina la parc pentru evaluare fizică directă?", a: "Da, te așteptăm la Str. Oașului 134a, Cluj-Napoca (cartier Iris). Programează o vizită la telefon 0754 299 199 — evaluarea fizică durează 30-45 minute și include test drive, diagnoză computer și inspecție vizuală completă. E cea mai corectă metodă." }
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
          className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#B8962E]" : "text-[#B0B0A8] group-hover:text-[#D4AF6A]"}`}
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
            <p className="font-body text-sm text-[#B0B0A8] pb-6 pl-4 pr-12 leading-relaxed">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BuyBack() {
  const { ref: servicesRef, inView: servicesInView } = useInView(0.1);
  const { ref: trustRef, inView: trustInView } = useInView(0.1);
  const wizardRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

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
    kilometraj: "",
    stare: "Excelentă",
    descriere: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number) => {
    let errors: Record<string, string> = {};
    let isValid = true;
    
    if (step === 1) {
      if (!formData.nume || formData.nume.trim().length === 0) {
        errors.nume = "Numele este obligatoriu.";
        isValid = false;
      }
      if (!formData.telefon || formData.telefon.trim().length < 9) {
        errors.telefon = "Numărul de telefon este invalid.";
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.marca || formData.marca.trim().length === 0) {
        errors.marca = "Marca este obligatorie.";
        isValid = false;
      }
      if (!formData.model || formData.model.trim().length === 0) {
        errors.model = "Modelul este obligatoriu.";
        isValid = false;
      }
      if (!formData.kilometraj || isNaN(Number(formData.kilometraj)) || Number(formData.kilometraj) <= 0) {
        errors.kilometraj = "Atașează un kilometraj valid.";
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
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formattedMessage = `
🚗 SOLICITARE EVALUARE BUYBACK

👤 Nume: ${formData.nume}
📞 Telefon: ${formData.telefon}
🏷️ Marcă: ${formData.marca}
📋 Model: ${formData.model}
📅 An fabricație: ${formData.an}
📍 Kilometraj: ${formData.kilometraj} km
⭐ Stare generală: ${formData.stare}

📝 Descriere:
${formData.descriere || 'Fără descriere adițională'}
`.trim();

    try {
      const result = await submitContactForm({
        name: formData.nume,
        email: 'medfilautomobile@gmail.com',
        phone: formData.telefon,
        message: formattedMessage,
      });

      if (result.success) {
        setSuccessMessage("Cererea ta a fost primită! Te sunăm în maxim 24 de ore cu evaluarea mașinii tale.");
      } else {
        setErrorMessage(result.error || "A apărut o eroare la trimiterea cererii.");
      }
    } catch (err) {
      setErrorMessage("Eroare de rețea. Încearcă din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <SEO
        title="Evaluare Auto Gratuită - Part-Exchange Cluj | MEDFIL"
        description="Află prețul corect al mașinii tale în 24h. Oferim consultanță pentru vânzare transparentă sau sistem part-exchange (BuyBack) la MEDFIL Automobile Cluj."
        canonical="https://medfil.ro/buyback"
        structuredData={[getServiceSchema("Evaluare Auto și Consultanță Vânzare / Part-Exchange", "Evaluăm gratuit mașina și oferim consultanță pentru vânzare sau sistem part-exchange.")]}
      />

      {/* 1. HERO */}
      <div className="relative pt-24 pb-16 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)] overflow-hidden" style={{ minHeight: "40vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            
            {/* Left Col */}
            <div className="w-full lg:w-[60%]">
              <div className="flex items-center gap-2 font-body text-xs text-[#B0B0A8] mb-6">
                <a href="/" className="hover:text-[#B8962E] transition-colors duration-300">Acasă</a>
                <ChevronRight size={12} />
                <span className="text-[#B8962E]">BuyBack</span>
              </div>
              <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-label text-[#B8962E] tracking-widest text-sm mb-3">
                EVALUARE GRATUITĂ
              </m.p>
              <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F0] mb-4">
                Vrei să-ți vinzi<br />
                <span className="gradient-gold-text">mașina mai bine?</span>
              </m.h1>
              <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-[#B0B0A8] text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
                Completezi detaliile mașinii tale, iar noi îți oferim consultanță de vânzare sau o analiză de part-exchange cu o mașină din stocul nostru.
              </m.p>
              
              <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <a href="#formular" className="btn-gold py-4 px-8 rounded-sm text-sm sm:text-base inline-flex items-center gap-2 min-h-[44px]">
                  Cere Evaluare
                  <ChevronDown size={18} />
                </a>
                <div className="flex items-center gap-2 text-[#B0B0A8]">
                  <span className="hidden sm:inline">·</span>
                  <a href="#cum-functioneaza" className="font-body text-sm hover:text-[#B8962E] transition-colors">sau <span className="underline decoration-[rgba(184,150,46,0.3)] underline-offset-4">Vezi cum funcționează</span></a>
                </div>
              </m.div>
            </div>

            {/* Right Col */}
            <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="w-full lg:w-[40%] mt-8 lg:mt-0">
              <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.25)] rounded-sm p-6 shadow-gold relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 border border-[rgba(184,150,46,0.3)] bg-[rgba(184,150,46,0.05)] rounded-sm flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={18} className="text-[#B8962E]" />
                  </div>
                  <div>
                    <p className="font-label text-[10px] text-[#B8962E] tracking-widest mb-2 uppercase">ONESTITATE</p>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#F5F5F0] leading-tight mt-1">Nu cumpărăm direct. <br className="hidden sm:block"/>Dar te ajutăm.</h3>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-body text-sm sm:text-base text-[#B0B0A8] leading-relaxed mb-5">
                    Momentan nu oferim serviciu de buyback direct, dar evaluăm fiecare situație individual. Îți oferim:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3 font-body text-sm text-[#B0B0A8]">
                      <span className="text-[#B8962E] flex-shrink-0 font-medium">→</span>
                      <span>Consultanță gratuită pentru vânzare la preț corect</span>
                    </li>
                    <li className="flex gap-3 font-body text-sm text-[#B0B0A8]">
                      <span className="text-[#B8962E] flex-shrink-0 font-medium">→</span>
                      <span>Analiză part-exchange cu mașinile din stocul nostru</span>
                    </li>
                    <li className="flex gap-3 font-body text-sm text-[#B0B0A8]">
                      <span className="text-[#B8962E] flex-shrink-0 font-medium">→</span>
                      <span>Evaluare de piață în 24 de ore</span>
                    </li>
                  </ul>
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </div>

      {/* 2. "CE OFERIM" - Consultanță Vânzare + Part-Exchange */}
      <section id="cum-functioneaza" className="py-16 sm:py-24 scroll-mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">SERVICIILE NOASTRE</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] gold-underline gold-underline-center pb-3 inline-block">Două Opțiuni Pentru Mașina Ta</h2>
            <p className="font-body text-sm sm:text-base text-[#B0B0A8] max-w-xl mx-auto mt-4 leading-relaxed">
              Alegi ce ți se potrivește. Ambele opțiuni pornesc cu aceeași evaluare gratuită — decizi tu ce urmează.
            </p>
          </div>

          <div ref={servicesRef as any} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Option A */}
            <m.div initial={{ opacity: 0, y: 30 }} animate={servicesInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0, duration: 0.4 }} className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-8 hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-6">
                <MessageCircle className="text-[#B8962E]" size={26} strokeWidth={1.5} />
              </div>
              <p className="font-label text-[10px] text-[#B8962E] tracking-[0.2em] mb-2 uppercase">OPȚIUNEA A</p>
              <h3 className="font-display text-3xl text-[#F5F5F0] mb-4">Consultanță Vânzare</h3>
              <p className="font-body text-sm text-[#B0B0A8] leading-relaxed mb-6">
                Te ajutăm să-ți vinzi mașina la preț corect de piață. Experiența noastră în zona auto-rulate din Cluj îți oferă un avantaj real față de vânzarea pe cont propriu.
              </p>
              <div className="border-t border-[rgba(184,150,46,0.1)] my-5" />
              <ul className="space-y-3">
                <li className="flex gap-2 text-sm font-body text-[#B0B0A8]">
                  <span className="text-[#B8962E]">·</span> Estimare preț corect de piață
                </li>
                <li className="flex gap-2 text-sm font-body text-[#B0B0A8]">
                  <span className="text-[#B8962E]">·</span> Sfaturi pregătire mașină pentru vânzare (fotografii, descriere)
                </li>
                <li className="flex gap-2 text-sm font-body text-[#B0B0A8]">
                  <span className="text-[#B8962E]">·</span> Recomandări platforme și anunțuri optimizate
                </li>
              </ul>
            </m.div>

            {/* Option B */}
            <m.div initial={{ opacity: 0, y: 30 }} animate={servicesInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.4 }} className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-8 hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-6">
                <Repeat className="text-[#B8962E]" size={26} strokeWidth={1.5} />
              </div>
              <p className="font-label text-[10px] text-[#B8962E] tracking-[0.2em] mb-2 uppercase">OPȚIUNEA B</p>
              <h3 className="font-display text-3xl text-[#F5F5F0] mb-4">Part-Exchange</h3>
              <p className="font-body text-sm text-[#B0B0A8] leading-relaxed mb-6">
                Schimbi mașina ta actuală cu una din stocul nostru. Evaluăm corect vehiculul tău și îl folosim ca avans pentru upgrade. Tranzacție rapidă, documente pregătite.
              </p>
              <div className="border-t border-[rgba(184,150,46,0.1)] my-5" />
              <ul className="space-y-3">
                <li className="flex gap-2 text-sm font-body text-[#B0B0A8]">
                  <span className="text-[#B8962E]">·</span> Evaluare obiectivă în 24 de ore
                </li>
                <li className="flex gap-2 text-sm font-body text-[#B0B0A8]">
                  <span className="text-[#B8962E]">·</span> Ofertă folosită ca avans pentru mașina dorită
                </li>
                <li className="flex gap-2 text-sm font-body text-[#B0B0A8]">
                  <span className="text-[#B8962E]">·</span> Documente și formalități gestionate de noi
                </li>
              </ul>
            </m.div>
          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="bg-[#080808]">
        <div ref={trustRef as any} className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <p className="font-label text-[#B0B0A8] tracking-[0.3em] text-[10px] text-center mb-8 uppercase">DE CE SĂ VINZI PRIN MEDFIL</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <m.div initial={{ opacity: 0, y: 20 }} animate={trustInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0 }} className="bg-[#0A0A0A] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 relative shadow-gold">
              <div className="font-display text-5xl leading-none gradient-gold-text mb-2">24H</div>
              <div className="font-label text-[10px] text-[#B8962E]/70 tracking-widest leading-none mb-4 uppercase">RĂSPUNS GARANTAT</div>
              <div className="w-10 h-10 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center mb-4">
                <Clock className="text-[#B8962E]" size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl text-[#F5F5F0] mb-2">Evaluare în 24 Ore</h3>
              <p className="font-body text-sm text-[#B0B0A8] leading-relaxed">Analizăm rapid detaliile tale și revenim cu o estimare corectă bazată pe piața actuală din România.</p>
            </m.div>

            <m.div initial={{ opacity: 0, y: 20 }} animate={trustInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="bg-[#0A0A0A] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 relative shadow-gold">
              <div className="font-display text-5xl leading-none gradient-gold-text mb-2">0%</div>
              <div className="font-label text-[10px] text-[#B8962E]/70 tracking-widest leading-none mb-4 uppercase">CONSULTANȚĂ GRATUITĂ</div>
              <div className="w-10 h-10 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center mb-4">
                <Gift className="text-[#B8962E]" size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl text-[#F5F5F0] mb-2">Fără Costuri Ascunse</h3>
              <p className="font-body text-sm text-[#B0B0A8] leading-relaxed">Evaluarea e gratuită. Dacă alegi part-exchange, negocierea e transparentă — vezi exact cum se calculează valoarea mașinii tale.</p>
            </m.div>

            <m.div initial={{ opacity: 0, y: 20 }} animate={trustInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="bg-[#0A0A0A] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 relative shadow-gold">
              <div className="font-display text-5xl leading-none gradient-gold-text mb-2">500+</div>
              <div className="font-label text-[10px] text-[#B8962E]/70 tracking-widest leading-none mb-4 uppercase">EVALUĂRI REALIZATE</div>
              <div className="w-10 h-10 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center mb-4">
                <MapPin className="text-[#B8962E]" size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl text-[#F5F5F0] mb-2">Experiență în Zona Cluj</h3>
              <p className="font-body text-sm text-[#B0B0A8] leading-relaxed">Cunoaștem piața auto-rulate din zona de nord a Clujului — cartier Iris, Oașului-Muncii — și negociem pe cunoștință reală.</p>
            </m.div>
          </div>
        </div>
      </section>

      {/* 4. MULTI-STEP WIZARD FORMULAR */}
      <section id="formular" className="py-16 sm:py-24 scroll-mt-20 border-t border-[rgba(184,150,46,0.05)] mt-12 bg-[#0A0A0A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">CEREA DE EVALUARE</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] gold-underline gold-underline-center pb-3 inline-block">Solicită Evaluare Gratuită</h2>
            <p className="font-body text-sm text-[#B0B0A8] max-w-xl mx-auto mt-6">
              3 pași simpli. Te sunăm în maxim 24 de ore cu evaluarea mașinii tale.
            </p>
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
                <p className="font-body text-base text-[#B0B0A8] max-w-md mx-auto mb-8 leading-relaxed">
                  {successMessage}
                </p>
                <div className="border-t border-[rgba(184,150,46,0.15)] pt-6 mt-6">
                  <p className="font-label text-xs text-[#B8962E] tracking-widest mb-5 uppercase">CE URMEAZĂ</p>
                  <ul className="text-left max-w-sm mx-auto space-y-4 font-body text-sm text-[#B0B0A8]">
                    <li className="flex gap-4">
                      <div className="text-[#B8962E] font-display text-xl leading-none mt-[-2px]">01</div>
                      <span className="leading-relaxed">Analizăm detaliile și comparăm cu piața actuală.</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="text-[#B8962E] font-display text-xl leading-none mt-[-2px]">02</div>
                      <span className="leading-relaxed">Te sunăm cu o estimare inițială și opțiuni (consultanță sau part-exchange).</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="text-[#B8962E] font-display text-xl leading-none mt-[-2px]">03</div>
                      <span className="leading-relaxed">Dacă alegi să continuăm, organizăm vizualizare fizică la parc (Cluj, cartier Iris).</span>
                    </li>
                  </ul>
                </div>
              </m.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-10 sm:mb-12 relative px-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label="Progres formular evaluare">
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
                          : 'bg-[#0E0E0E] border-[rgba(184,150,46,0.3)] text-[#B0B0A8]'
                      }`}>
                        {currentStep > step ? <Check size={14} strokeWidth={3} /> : step}
                      </div>
                      <span className={`font-label text-[10px] sm:text-xs tracking-widest mt-3 transition-colors duration-300 uppercase ${
                        currentStep >= step ? 'text-[#B8962E]' : 'text-[#B0B0A8]'
                      }`}>
                        {step === 1 ? 'CONTACT' : step === 2 ? 'MAȘINA' : 'STAREA'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative min-h-[350px]">
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
                        <h3 ref={stepHeadingRef} tabIndex={-1} className="font-display text-xl text-[#F5F5F0] mb-2 focus:outline-none">Pasul 1: Cum Te Putem Contacta?</h3>
                        <p className="font-body text-sm text-[#B0B0A8] mb-6">Ai noștri te sună cu evaluarea. Nu facem spam, promitem.</p>
                        
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="nume" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">Nume Complet *</label>
                            <input 
                              id="nume"
                              name="nume"
                              value={formData.nume}
                              onChange={handleInputChange}
                              aria-required="true"
                              aria-invalid={!!validationErrors.nume}
                              aria-describedby={validationErrors.nume ? "nume-error" : undefined}
                              className={`w-full bg-[#111] border ${validationErrors.nume ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'} text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]`} 
                              placeholder="ex: Ion Popescu" 
                            />
                            {validationErrors.nume && <p id="nume-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.nume}</p>}
                          </div>
                          <div>
                            <label htmlFor="telefon" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">Telefon *</label>
                            <input 
                              id="telefon"
                              type="tel"
                              name="telefon"
                              value={formData.telefon}
                              onChange={handleInputChange}
                              aria-required="true"
                              aria-invalid={!!validationErrors.telefon}
                              aria-describedby={validationErrors.telefon ? "telefon-error" : undefined}
                              className={`w-full bg-[#111] border ${validationErrors.telefon ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'} text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]`} 
                              placeholder="07xx xxx xxx" 
                            />
                            {validationErrors.telefon && <p id="telefon-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.telefon}</p>}
                          </div>
                        </div>
                        <p className="font-body text-xs text-[#B0B0A8]/70 italic mt-4">
                          Preferăm să te sunăm decât să trimitem email — e mai rapid și mai personal.
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
                        <h3 ref={stepHeadingRef} tabIndex={-1} className="font-display text-xl text-[#F5F5F0] mb-2 focus:outline-none">Pasul 2: Detaliile Mașinii</h3>
                        <p className="font-body text-sm text-[#B0B0A8] mb-6">Cu cât sunt mai precise datele, cu atât evaluarea e mai corectă.</p>
                        
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="marca" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">Marcă *</label>
                            <input 
                              id="marca"
                              name="marca"
                              value={formData.marca}
                              onChange={handleInputChange}
                              aria-required="true"
                              aria-invalid={!!validationErrors.marca}
                              aria-describedby={validationErrors.marca ? "marca-error" : undefined}
                              className={`w-full bg-[#111] border ${validationErrors.marca ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'} text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]`} 
                              placeholder="ex: BMW, Audi, Mercedes..." 
                            />
                            {validationErrors.marca && <p id="marca-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.marca}</p>}
                          </div>
                          <div>
                            <label htmlFor="model" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">Model *</label>
                            <input 
                              id="model"
                              name="model"
                              value={formData.model}
                              onChange={handleInputChange}
                              aria-required="true"
                              aria-invalid={!!validationErrors.model}
                              aria-describedby={validationErrors.model ? "model-error" : undefined}
                              className={`w-full bg-[#111] border ${validationErrors.model ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'} text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]`} 
                              placeholder="ex: Seria 3, A4, C-Class..." 
                            />
                            {validationErrors.model && <p id="model-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.model}</p>}
                          </div>
                          <div>
                            <label htmlFor="an" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">An Fabricație</label>
                            <select 
                              id="an"
                              name="an"
                              value={formData.an}
                              onChange={handleInputChange}
                              className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]"
                            >
                              {Array.from({ length: 16 }, (_, i) => 2025 - i).map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="kilometraj" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">Kilometraj (aprox) *</label>
                            <input 
                              id="kilometraj"
                              type="number" 
                              name="kilometraj"
                              value={formData.kilometraj}
                              onChange={handleInputChange}
                              aria-required="true"
                              aria-invalid={!!validationErrors.kilometraj}
                              aria-describedby={validationErrors.kilometraj ? "kilometraj-error" : undefined}
                              className={`w-full bg-[#111] border ${validationErrors.kilometraj ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'} text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px]`} 
                              placeholder="ex: 90000" 
                            />
                            {validationErrors.kilometraj && <p id="kilometraj-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.kilometraj}</p>}
                          </div>
                        </div>
                        <p className="font-body text-xs text-[#B0B0A8]/70 italic mt-4">
                          Kilometrajul real îl verificăm prin test drive și diagnoză — nu-ți face griji să fie exact.
                        </p>
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
                        <h3 ref={stepHeadingRef} tabIndex={-1} className="font-display text-xl text-[#F5F5F0] mb-2 focus:outline-none">Pasul 3: Starea Mașinii</h3>
                        <p className="font-body text-sm text-[#B0B0A8] mb-6">Fii sincer — o descriere onestă ne ajută să îți dăm o evaluare realistă. Nu te judecăm pentru defecte.</p>
                        
                        <fieldset className="mb-8">
                          <legend className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-3 uppercase">Stare generală</legend>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { value: "Excelentă", label: "Excelentă", desc: "Impecabilă, minime urme de uzură" },
                              { value: "Bună", label: "Bună", desc: "Câteva zgârieturi normale" },
                              { value: "Acceptabilă", label: "Acceptabilă", desc: "Defecte vizibile sau mecanice" },
                            ].map((s) => (
                              <label 
                                key={s.value}
                                className={`cursor-pointer border rounded-sm p-4 transition-all min-h-[44px] ${
                                  formData.stare === s.value 
                                    ? 'border-[#B8962E] bg-[rgba(184,150,46,0.08)]' 
                                    : 'border-[rgba(184,150,46,0.2)] hover:border-[rgba(184,150,46,0.4)]'
                                }`}
                              >
                                <input 
                                  type="radio" 
                                  name="stare" 
                                  value={s.value}
                                  checked={formData.stare === s.value}
                                  onChange={handleInputChange}
                                  className="sr-only"
                                />
                                <div className={`font-display text-xl mb-1 ${
                                  formData.stare === s.value ? 'text-[#B8962E]' : 'text-[#F5F5F0]'
                                }`}>
                                  {s.label}
                                </div>
                                <div className="font-body text-xs text-[#B0B0A8] leading-snug">
                                  {s.desc}
                                </div>
                              </label>
                            ))}
                          </div>
                          <p className="font-body text-[11px] text-[#B0B0A8]/70 italic mt-3">Evaluarea finală poate diferi după test drive fizic. Estimarea noastră inițială e un punct de plecare.</p>
                        </fieldset>

                        <div className="mb-6">
                          <label htmlFor="descriere" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-3 uppercase">Descriere adițională</label>
                          <textarea 
                            id="descriere"
                            rows={4} 
                            name="descriere"
                            value={formData.descriere}
                            onChange={handleInputChange}
                            className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors resize-none" 
                            placeholder="Orice informație utilă: dotări, istoric service, defecte cunoscute, mod de folosire, motiv vânzare..." 
                          />
                          <div className="flex flex-wrap gap-2 mt-3">
                            {[
                              "Istoric service complet",
                              "Recent a trecut ITP",
                              "Am schimbat distribuția",
                              "Are accident declarat",
                              "Vând pentru upgrade",
                            ].map((chip, idx) => (
                              <button 
                                key={idx}
                                type="button"
                                onClick={() => setFormData(prev => ({ 
                                  ...prev, 
                                  descriere: prev.descriere + (prev.descriere ? '\n' : '') + chip + '. ' 
                                }))}
                                className="text-xs font-body text-[#B0B0A8] border border-[rgba(184,150,46,0.15)] px-3 py-1.5 rounded-sm hover:border-[#B8962E] hover:text-[#B8962E] transition-all bg-[#0A0A0A]"
                              >
                                + {chip}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-[#080808] border border-[rgba(184,150,46,0.1)] rounded-sm p-5 mt-8 mb-4">
                          <div className="flex justify-between items-start mb-4 border-b border-[rgba(184,150,46,0.1)] pb-3">
                            <p className="font-label text-xs tracking-widest text-[#B8962E] uppercase m-0 leading-none">REZUMATUL CERERII</p>
                            <button 
                              type="button"
                              onClick={() => setCurrentStep(1)}
                              className="font-body text-xs text-[#B0B0A8] hover:text-[#B8962E] transition-colors underline-offset-2 hover:underline leading-none m-0"
                            >
                              Editează
                            </button>
                          </div>
                          <div className="space-y-3 font-body text-sm text-[#B0B0A8]">
                            <div className="flex justify-between gap-4">
                              <span>Contact:</span>
                              <span className="text-[#F5F5F0] text-right font-medium">{formData.nume}, {formData.telefon}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>Mașină:</span>
                              <span className="text-[#F5F5F0] text-right font-medium">{formData.marca} {formData.model}, {formData.an}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>Kilometraj:</span>
                              <span className="text-[#F5F5F0] text-right font-medium">{formData.kilometraj ? Number(formData.kilometraj).toLocaleString() + ' km' : 'Nespecificat'}</span>
                            </div>
                            <div className="flex justify-between gap-4 border-t border-[rgba(184,150,46,0.05)] pt-2">
                              <span>Stare generală:</span>
                              <span className="text-[#F5F5F0] text-right font-medium">{formData.stare}</span>
                            </div>
                          </div>
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
                                Solicită Evaluare <Send size={16} />
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

            {/* Error Banner */}
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

      {/* 5. FAQ SPECIFIC BUYBACK */}
      <section className="py-16 sm:py-24 bg-[#0A0A0A] border-t border-[rgba(184,150,46,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">ÎNTREBĂRI FRECVENTE</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold">Întrebări Despre Evaluare</h2>
          </div>
          <div className="divide-y-0 w-full mb-10">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
          <p className="font-body text-sm text-[#B0B0A8] text-center max-w-sm mx-auto">
            Ai altă întrebare specifică mașinii tale? <a href="tel:0754299199" className="text-[#F5F5F0] hover:text-[#B8962E] font-medium underline decoration-[#B8962E]/50 underline-offset-4 transition-colors">Sună 0754 299 199</a> sau scrie pe <a href="https://wa.me/40754299199?text=Bun%C4%83%20ziua%2C%20am%20o%20ma%C8%99in%C4%83%20pe%20care%20a%C8%99%20vrea%20s%C4%83%20o%20v%C3%A2nd%20%2F%20schimb." target="_blank" rel="noopener noreferrer" className="text-[#F5F5F0] hover:text-[#B8962E] font-medium underline decoration-[#B8962E]/50 underline-offset-4 transition-colors">WhatsApp</a>.
          </p>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#080808] via-[#0A0A0A] to-[#080808]">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8962E]/40 to-transparent" />
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8962E]/40 to-transparent" />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold mb-4">Preferi Să Vorbim Direct?</h2>
          <p className="font-body text-base text-[#B0B0A8] mb-10 leading-relaxed">
            Unii clienți preferă să discute detaliile la telefon — mai rapid, mai personal. Echipa MEDFIL răspunde în 2 minute.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:0754299199" className="btn-gold py-4 px-8 rounded-sm text-sm font-semibold tracking-wide w-full sm:w-auto min-h-[44px] flex items-center justify-center">
              Sună Acum — 0754 299 199
            </a>
            <a href="https://wa.me/40754299199?text=Bun%C4%83%20ziua%2C%20vreau%20o%20evaluare%20pentru%20ma%C8%99ina%20mea." target="_blank" rel="noopener noreferrer" className="btn-ghost py-4 px-8 rounded-sm text-sm font-semibold tracking-wide w-full sm:w-auto min-h-[44px] flex items-center justify-center border border-[rgba(184,150,46,0.2)]">
              Scrie pe WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
