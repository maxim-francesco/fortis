import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock,
  Car,
  Search,
  RefreshCw,
  CreditCard,
  ArrowRight,
  Loader2,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { submitContactForm } from "@/lib/api";
import { getContactPageSchema } from "@/lib/seo/schemas";
export default function Contact() {
  const { ref: gridRef, inView: gridInView } = useInView(0.1);
  const { ref: crossRef, inView: crossInView } = useInView(0.1);
  const { ref: mapRef, inView: mapInView } = useInView(0.1);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [formData, setFormData] = useState({
    nume: "",
    telefon: "",
    mesaj: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validare
    const errors: Record<string, string> = {};
    if (!formData.nume || formData.nume.trim().length < 2) errors.nume = "Introdu un nume valid";
    if (!formData.telefon || !/^(\+4|4)?0?7[0-9]{8}$/.test(formData.telefon.replace(/\s+/g, ''))) {
      errors.telefon = "Introdu un număr de telefon românesc valid";
    }
    if (!formData.mesaj || formData.mesaj.trim().length < 10) errors.mesaj = "Mesajul e prea scurt (min 10 caractere)";
    
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formattedMessage = `
📨 MESAJ DE CONTACT

👤 Nume: ${formData.nume}
📞 Telefon: ${formData.telefon}

📝 Mesaj:
${formData.mesaj}
    `.trim();

    try {
      const result = await submitContactForm({
        name: formData.nume,
        email: 'medfilautomobile@gmail.com', // Ignored legacy fallback
        phone: formData.telefon,
        message: formattedMessage,
      });

      if (result.success) {
        setSuccessMessage("Am primit mesajul tău. Te contactăm în cel mai scurt timp posibil.");
        setFormData({ nume: "", telefon: "", mesaj: "" });
        setValidationErrors({});
      } else {
        setErrorMessage(result.error || "A apărut o eroare. Încearcă din nou sau sună-ne direct la 0754 299 199.");
      }
    } catch (err) {
      setErrorMessage("Eroare de rețea. Încearcă din nou sau sună-ne direct la 0754 299 199.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <SEO
        title="Contact MEDFIL Automobile - Parc Auto Cluj-Napoca"
        description="Ne găsești în Cluj-Napoca pe Str. Oașului 134a. Sună la 0754 299 199 sau scrie-ne pentru informații, test drive sau consultanță vânzări auto."
        canonical="https://medfil.ro/contact"
        structuredData={[getContactPageSchema()]}
      />

      {/* 1. HERO — compact */}
      <div className="relative pt-24 pb-12 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)]">
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", 
          backgroundSize: "60px 60px" 
        }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
          <div className="flex items-center gap-2 font-body text-xs text-[#B0B0A8] mb-6">
            <Link to="/" className="hover:text-[#B8962E] transition-colors duration-300">Acasă</Link>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Contact</span>
          </div>
          
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-label text-[#B8962E] tracking-widest text-sm mb-3">
            VIZITEAZĂ-NE
          </m.p>
          <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F0] mb-4 leading-tight">
            În Inima<br />
            <span className="gradient-gold-text">Cartierului Iris</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-base sm:text-lg text-[#B0B0A8] max-w-xl leading-relaxed">
            Parcul nostru auto e pe Str. Oașului 134a, Cluj-Napoca. Te așteptăm de luni până sâmbătă să vezi mașinile live, să faci test drive și să discuți direct cu echipa.
          </m.p>
        </div>
      </div>

      {/* 2. INFO/TRUST GRID */}
      <section className="bg-[#080808]">
        <div ref={gridRef as any} className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <p className="font-label text-[#B0B0A8] tracking-[0.3em] text-[10px] text-center mb-12 uppercase">METODE DE CONTACT</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1 - Telefon */}
            <m.a 
              initial={{ opacity: 0, y: 20 }} animate={gridInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0 }}
              href="tel:0754299199" 
              className="group bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[100px]"
            >
              <div className="w-12 h-12 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-5 group-hover:border-[#B8962E] transition-colors">
                <Phone size={22} className="text-[#B8962E]" strokeWidth={1.5} />
              </div>
              <p className="font-label text-[10px] text-[#B8962E] tracking-widest mb-2 uppercase">SUNĂ DIRECT</p>
              <div className="font-display text-2xl sm:text-3xl text-[#F5F5F0] mb-2 leading-tight">
                0754 299 199
              </div>
              <p className="font-body text-sm text-[#B0B0A8] leading-snug mt-auto pt-3">
                Echipa MEDFIL, luni-sâmbătă 09:00–18:00
              </p>
            </m.a>

            {/* Card 2 - WhatsApp */}
            <m.a 
              initial={{ opacity: 0, y: 20 }} animate={gridInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              href="https://wa.me/40754299199?text=Bun%C4%83%20ziua%2C%20vreau%20mai%20multe%20informa%C8%9Bii%20despre%20MEDFIL%20Automobile." 
              target="_blank" rel="noopener noreferrer"
              className="group bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[100px]"
            >
              <div className="w-12 h-12 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-5 group-hover:border-[#B8962E] transition-colors">
                <MessageCircle size={22} className="text-[#B8962E]" strokeWidth={1.5} />
              </div>
              <p className="font-label text-[10px] text-[#B8962E] tracking-widest mb-2 uppercase">WHATSAPP</p>
              <div className="font-display text-2xl sm:text-3xl text-[#F5F5F0] mb-2 leading-tight">
                Chat instant
              </div>
              <p className="font-body text-sm text-[#B0B0A8] leading-snug mt-auto pt-3">
                Răspuns în câteva minute în orele de program
              </p>
            </m.a>

            {/* Card 3 - Adresă */}
            <m.a 
              initial={{ opacity: 0, y: 20 }} animate={gridInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
              href="https://maps.google.com/?q=Strada+Oa%C8%99ului+134A,+Cluj-Napoca,+Rom%C3%A2nia" 
              target="_blank" rel="noopener noreferrer"
              className="group bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[100px]"
            >
              <div className="w-12 h-12 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-5 group-hover:border-[#B8962E] transition-colors">
                <MapPin size={22} className="text-[#B8962E]" strokeWidth={1.5} />
              </div>
              <p className="font-label text-[10px] text-[#B8962E] tracking-widest mb-2 uppercase">PARCUL AUTO</p>
              <div className="font-display text-2xl sm:text-3xl text-[#F5F5F0] mb-2 leading-tight">
                Str. Oașului 134a
              </div>
              <p className="font-body text-sm text-[#B0B0A8] leading-snug mt-auto pt-3">
                Cluj-Napoca, cartier Iris · Deschide în Google Maps
              </p>
            </m.a>

            {/* Card 4 - Program (Static) */}
            <m.div 
              initial={{ opacity: 0, y: 20 }} animate={gridInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
              className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col min-h-[100px]"
            >
              <div className="w-12 h-12 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-5">
                <Clock size={22} className="text-[#B8962E]" strokeWidth={1.5} />
              </div>
              <p className="font-label text-[10px] text-[#B8962E] tracking-widest mb-2 uppercase">PROGRAM DE LUCRU</p>
              <div className="font-display text-[#F5F5F0] mb-2 leading-tight">
                <div className="text-xl mb-1">Luni – Sâmbătă</div>
                <div className="text-2xl gradient-gold-text">09:00 – 18:00</div>
              </div>
              <p className="font-body text-sm text-[#B0B0A8] leading-snug mt-auto pt-3">
                <strong className="text-[#F5F5F0] font-medium">Duminică închis.</strong> Programări telefonice în afara orelor la cerere.
              </p>
            </m.div>
          </div>
        </div>
      </section>

      {/* 3. CROSS-LINK CARDS */}
      <section className="border-t border-[rgba(184,150,46,0.08)] bg-[#0A0A0A]">
        <div ref={crossRef as any} className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center mb-12">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">ȘTII EXACT CE VREI?</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] gold-underline gold-underline-center pb-3 inline-block">Formulare Dedicate</h2>
            <p className="font-body text-sm text-[#B0B0A8] max-w-xl mx-auto mt-4 leading-relaxed">
              Pentru anumite servicii avem formulare specifice care ne ajută să îți răspundem mai rapid și mai precis. Alege opțiunea potrivită.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-12">
            {/* Card 1 - Stoc */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={crossInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0 }}>
              <Link to="/stoc" className="group bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300 h-full min-h-[100px]">
                <div className="w-14 h-14 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-5 group-hover:border-[#B8962E] group-hover:bg-[rgba(184,150,46,0.05)] transition-all">
                  <Car size={24} className="text-[#B8962E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-[#F5F5F0] mb-2">Vezi Mașinile</h3>
                <p className="font-body text-sm text-[#B0B0A8] leading-relaxed mb-4 flex-grow">
                  Explorează stocul curent — toate mașinile disponibile cu poze, specificații și preț.
                </p>
                <div className="flex items-center gap-2 text-[#B8962E] font-label text-xs tracking-widest group-hover:gap-3 transition-all mt-auto uppercase">
                  <span>VEZI STOCUL</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </m.div>

            {/* Card 2 - Comanda */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={crossInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              <Link to="/comanda" className="group bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300 h-full min-h-[100px]">
                <div className="w-14 h-14 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-5 group-hover:border-[#B8962E] group-hover:bg-[rgba(184,150,46,0.05)] transition-all">
                  <Search size={24} className="text-[#B8962E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-[#F5F5F0] mb-2">Comandă Personalizată</h3>
                <p className="font-body text-sm text-[#B0B0A8] leading-relaxed mb-4 flex-grow">
                  Nu găsești ce cauți? Îți aducem mașina dorită din rețeaua noastră națională de furnizori.
                </p>
                <div className="flex items-center gap-2 text-[#B8962E] font-label text-xs tracking-widest group-hover:gap-3 transition-all mt-auto uppercase">
                  <span>TRIMITE CEREREA</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </m.div>

            {/* Card 3 - BuyBack */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={crossInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
              <Link to="/buyback" className="group bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300 h-full min-h-[100px]">
                <div className="w-14 h-14 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-5 group-hover:border-[#B8962E] group-hover:bg-[rgba(184,150,46,0.05)] transition-all">
                  <RefreshCw size={24} className="text-[#B8962E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-[#F5F5F0] mb-2">Vinde Mașina Ta</h3>
                <p className="font-body text-sm text-[#B0B0A8] leading-relaxed mb-4 flex-grow">
                  Evaluare gratuită în 24 ore. Consultanță de vânzare sau part-exchange cu o mașină din stoc.
                </p>
                <div className="flex items-center gap-2 text-[#B8962E] font-label text-xs tracking-widest group-hover:gap-3 transition-all mt-auto uppercase">
                  <span>CERE EVALUARE</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </m.div>

            {/* Card 4 - Finantare */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={crossInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
              <Link to="/finantare" className="group bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm p-6 flex flex-col hover:border-[rgba(184,150,46,0.45)] hover:-translate-y-1 transition-all duration-300 h-full min-h-[100px]">
                <div className="w-14 h-14 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mb-5 group-hover:border-[#B8962E] group-hover:bg-[rgba(184,150,46,0.05)] transition-all">
                  <CreditCard size={24} className="text-[#B8962E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-[#F5F5F0] mb-2">Simulează Rata</h3>
                <p className="font-body text-sm text-[#B0B0A8] leading-relaxed mb-4 flex-grow">
                  Calculator rate auto. Aprobare rapidă doar cu buletinul prin TBI Bank și partenerii noștri.
                </p>
                <div className="flex items-center gap-2 text-[#B8962E] font-label text-xs tracking-widest group-hover:gap-3 transition-all mt-auto uppercase">
                  <span>CALCULEAZĂ RATA</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </m.div>
          </div>
        </div>
      </section>

      {/* 4. FORMULAR DE CONTACT */}
      <section id="formular" className="border-t border-[rgba(184,150,46,0.08)] bg-[#080808]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center mb-12">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">ÎNTREBARE GENERALĂ?</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] gold-underline gold-underline-center pb-3 inline-block">Scrie-ne un Mesaj</h2>
            <p className="font-body text-sm text-[#B0B0A8] max-w-lg mx-auto mt-4 leading-relaxed">
              Pentru orice altă întrebare. Răspundem în aceeași zi, de obicei în câteva ore.
            </p>
          </div>

          <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.3)] rounded-sm p-6 sm:p-10 shadow-gold mt-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label htmlFor="nume" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">NUME *</label>
                <input 
                  id="nume"
                  required 
                  name="nume"
                  value={formData.nume}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  aria-invalid={!!validationErrors.nume}
                  aria-describedby={validationErrors.nume ? "nume-error" : undefined}
                  className={`w-full bg-[#111] border text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50 ${
                    validationErrors.nume ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'
                  }`}
                  placeholder="Ion Popescu" 
                />
                {validationErrors.nume && (
                  <p id="nume-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.nume}</p>
                )}
              </div>

              <div>
                <label htmlFor="telefon" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">TELEFON *</label>
                <input 
                  id="telefon"
                  required
                  type="tel"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  aria-invalid={!!validationErrors.telefon}
                  aria-describedby={validationErrors.telefon ? "telefon-error" : undefined}
                  className={`w-full bg-[#111] border text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50 ${
                    validationErrors.telefon ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'
                  }`}
                  placeholder="07xx xxx xxx" 
                />
                <p className="font-body text-[10px] text-[#B0B0A8]/60 mt-1">Te sunăm — nu folosim numărul pentru marketing.</p>
                {validationErrors.telefon && (
                  <p id="telefon-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.telefon}</p>
                )}
              </div>

              <div>
                <label htmlFor="mesaj" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-2 uppercase">MESAJUL TĂU *</label>
                <textarea 
                  id="mesaj"
                  required
                  rows={5}
                  name="mesaj"
                  value={formData.mesaj}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  aria-invalid={!!validationErrors.mesaj}
                  aria-describedby={validationErrors.mesaj ? "mesaj-error" : undefined}
                  className={`w-full bg-[#111] border text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors resize-none disabled:opacity-50 ${
                    validationErrors.mesaj ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'
                  }`}
                  placeholder="Scrie-ne ce te interesează..." 
                />
                <div className="flex justify-between items-start">
                  {validationErrors.mesaj ? (
                    <p id="mesaj-error" role="alert" className="text-red-500 text-xs font-body mt-1">{validationErrors.mesaj}</p>
                  ) : <div />}
                  <p className="font-body text-[10px] text-[#B0B0A8]/60 mt-1 text-right">{formData.mesaj.length} / 1000</p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-gold w-full py-4 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6 min-h-[44px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Se trimite...</span>
                  </>
                ) : (
                  <>
                    <span>Trimite Mesajul</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {successMessage && (
                  <m.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    aria-live="polite"
                    className="mt-6 p-4 bg-[rgba(184,150,46,0.1)] border border-[#B8962E] rounded-sm flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-[#B8962E] flex-shrink-0 mt-0.5" size={18} aria-hidden="true" />
                    <div>
                      <p className="text-sm font-body text-[#F5F5F0] mb-1 font-medium">Mesaj trimis cu succes!</p>
                      <p className="text-xs font-body text-[#B0B0A8]">
                        {successMessage}
                      </p>
                    </div>
                  </m.div>
                )}
                {errorMessage && (
                  <m.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    aria-live="assertive"
                    className="mt-6 p-4 bg-red-500/10 border border-red-500 rounded-sm flex items-start gap-3"
                  >
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} aria-hidden="true" />
                    <p className="text-sm font-body text-red-500">{errorMessage}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </form>
          </div>
          
          <p className="font-body text-xs text-[#B0B0A8]/70 text-center mt-6 italic">
            Preferi să ne suni direct? <a href="tel:0754299199" className="text-[#B8962E] hover:underline hover:underline-offset-2 font-medium">0754 299 199</a> — răspundem în 2 minute.
          </p>
        </div>
      </section>

      {/* 5. HARTĂ MARE 500px */}
      <section className="border-t border-[rgba(184,150,46,0.08)] bg-[#0A0A0A]">
        <div ref={mapRef as any} className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center mb-12">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">VIZITEAZĂ SHOWROOM-UL</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] gold-underline gold-underline-center pb-3 inline-block">Te Așteptăm la Parc</h2>
            <p className="font-body text-sm text-[#B0B0A8] max-w-xl mx-auto mt-4 leading-relaxed">
              Mașinile arată mai bine live. Vino la Str. Oașului 134a să le vezi în persoană, să faci test drive și să discuți cu echipa.
            </p>
          </div>

          <div className="grid lg:grid-cols-10 gap-6 mt-12">
            {/* Hartă */}
            <m.div initial={{ opacity: 0 }} animate={mapInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} className="lg:col-span-7">
              <div className="relative bg-[#0E0E0E] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden" style={{ height: "500px" }}>
                {!mapLoaded ? (
                  <div 
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer group bg-[#111] hover:bg-[#1a1a1a] transition-all"
                    onClick={() => setMapLoaded(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setMapLoaded(true)}
                    aria-label="Încarcă Google Maps"
                  >
                    <div className="w-16 h-16 bg-[rgba(184,150,46,0.1)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MapPin className="text-[#B8962E]" size={32} />
                    </div>
                    <span className="font-display text-xl text-[#F5F5F0] mb-2">Apasă pentru Hartă</span>
                    <span className="font-body text-sm text-[#B0B0A8]">Click pentru a încărca Google Maps</span>
                  </div>
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.396342616854!2d23.60635397637841!3d46.7972749712497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490fb9ec2b4739%3A0x6c6e756531317537!2sStrada%20Oa%C8%99ului%20134A%2C%20Cluj-Napoca%20400000!5e0!3m2!1sen!2sro!4v1709230000000!5m2!1sen!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MEDFIL Automobile - Str. Oașului 134a, Cluj-Napoca"
                  />
                )}
              </div>
            </m.div>
            
            {/* Info card */}
            <m.div initial={{ opacity: 0, x: 20 }} animate={mapInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-3">
              <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.25)] rounded-sm p-6 h-full flex flex-col">
                <p className="font-label text-[10px] text-[#B8962E] tracking-widest mb-4 uppercase">DETALII LOCAȚIE</p>
                
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin size={16} className="text-[#B8962E] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-display text-lg text-[#F5F5F0] leading-tight">Str. Oașului 134a</p>
                      <p className="font-body text-sm text-[#B0B0A8]">Cluj-Napoca, cartier Iris</p>
                      <p className="font-body text-xs text-[#B0B0A8]/70 mt-1">400000, Jud. Cluj</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 pb-6 border-b border-[rgba(184,150,46,0.1)]">
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#B8962E] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-body text-sm text-[#F5F5F0] font-medium mb-1">Program vizitare</p>
                      <p className="font-body text-sm text-[#B0B0A8]">Luni – Sâmbătă: 09:00 – 18:00</p>
                      <p className="font-body text-xs text-red-400/70 mt-1">Duminică: Închis</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 flex-grow">
                  <p className="font-label text-[10px] text-[#B8962E] tracking-widest mb-3 uppercase">CÂTEVA SFATURI</p>
                  <ul className="space-y-2 font-body text-sm text-[#B0B0A8]">
                    <li className="flex gap-2">
                      <span className="text-[#B8962E] flex-shrink-0">→</span>
                      <span>Sună înainte pentru a ne asigura că mașina dorită e la parc</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#B8962E] flex-shrink-0">→</span>
                      <span>Test drive-urile se fac cu buletinul (original sau copie)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#B8962E] flex-shrink-0">→</span>
                      <span>Parcare liberă pe stradă în fața parcului</span>
                    </li>
                  </ul>
                </div>
                
                <a 
                  href="https://maps.google.com/?q=Strada+Oa%C8%99ului+134A,+Cluj-Napoca,+Rom%C3%A2nia"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-center py-3 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 min-h-[44px] mt-auto"
                >
                  <ExternalLink size={14} />
                  <span>Deschide în Google Maps</span>
                </a>
              </div>
            </m.div>
          </div>
          
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-12 sm:py-16 relative bg-[#080808]">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8962E]/30 to-transparent" />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-[#F5F5F0] mb-3">Orice metodă alegi, răspundem rapid.</h2>
          <p className="font-body text-sm text-[#B0B0A8] mb-8">
            Telefon, WhatsApp, formular sau vizită la parc. Alege ce-ți convine.
          </p>
          <div className="flex items-center justify-center">
            <a href="tel:0754299199" className="btn-gold py-4 px-8 rounded-sm text-sm font-semibold tracking-wide w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2">
              <Phone size={16} /> Sună Acum — 0754 299 199
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}