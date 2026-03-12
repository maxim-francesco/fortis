import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Clock, ChevronRight, Network, Tag, Search, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/lib/api";

export default function LaComanda() {
  const { ref, inView } = useInView(0.1);

  // Form State
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

  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 7 + Math.random() * 6,
    delay: Math.random() * 5,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        email: 'comanda@fortispremiumauto.ro',
        phone: formData.telefon,
        message: formattedMessage,
      });

      if (result.success) {
        setSuccessMessage("Cererea ta a fost trimisă cu succes! Te vom contacta în curând.");
        setFormData({
          nume: "",
          telefon: "",
          marca: "",
          model: "",
          an: "2025",
          buget: "",
          combustibil: [],
          cutieViteze: "Oricare",
          observatii: ""
        });
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
      {/* Hero */}
      <div className="relative pt-20 pb-20 overflow-hidden" style={{ minHeight: "40vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0 bg-[#080808]" />
        {/* Floating particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle absolute"
            style={{ left: p.left, top: p.top, "--duration": `${p.duration}s`, "--delay": `${p.delay}s` } as React.CSSProperties}
          />
        ))}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 30% 60%, rgba(184,150,46,0.4) 0%, transparent 60%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-6">
            <a href="/" className="hover:text-[#B8962E] transition-colors">Acasă</a>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Mașini la Comandă</span>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-label text-[#B8962E] tracking-widest text-sm mb-3">
            COMANDĂ PERSONALIZATĂ
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl sm:text-6xl font-semibold text-[#F5F5F0] mb-4">
            Nu Ai Găsit<br />
            <span className="gradient-gold-text">Ce Cauți?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-[#888880] text-base sm:text-lg max-w-xl leading-relaxed">
            Îți aducem noi mașina dorită, oriunde în România. Rețea națională de furnizori, prețuri negociate.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 space-y-16">
        {/* How it works */}
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <div className="text-center mb-10">
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">PROCESUL</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F5F0] font-semibold">Cum Funcționează</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Ne Spui Ce Vrei", d: "Completezi formularul cu specificațiile mașinii dorite." },
              { n: "02", t: "Căutăm Pentru Tine", d: "Accesăm rețeaua noastră națională de furnizori verificați." },
              { n: "03", t: "Prezentăm Opțiunile", d: "Îți trimitem ofertele găsite cu poze, inspecție și preț." },
              { n: "04", t: "Livrare la Tine", d: "Finalizezi tranzacția și mașina ajunge la ușa ta." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm p-5"
              >
                <div className="font-display text-5xl text-[#B8962E] opacity-25 leading-none mb-3 font-semibold">{step.n}</div>
                <h3 className="font-display text-lg text-[#F5F5F0] mb-2">{step.t}</h3>
                <p className="font-body text-xs text-[#888880] leading-relaxed">{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Request form */}
        <div className="bg-[#161616] border border-[rgba(184,150,46,0.3)] rounded-sm p-6 sm:p-8 shadow-gold">
          <h2 className="font-display text-2xl sm:text-3xl text-[#F5F5F0] mb-2">Trimite Cererea Ta</h2>
          <p className="font-body text-sm text-[#888880] mb-8">Completează formularul și îți răspundem în maxim 24 de ore.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">NUME COMPLET *</label>
                <input 
                  required 
                  name="nume"
                  value={formData.nume}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50" 
                  placeholder="Ion Popescu" 
                />
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">TELEFON *</label>
                <input 
                  required 
                  type="tel" 
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50" 
                  placeholder="07xx xxx xxx" 
                />
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">MARCĂ DORITĂ</label>
                <input 
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50" 
                  placeholder="ex: BMW, Mercedes, Audi..." 
                />
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">MODEL DORIT</label>
                <input 
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50" 
                  placeholder="ex: Seria 5, E-Class, A6..." 
                />
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">AN MINIM</label>
                <select 
                  name="an"
                  value={formData.an}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50"
                >
                  {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">BUGET MAXIM (€)</label>
                <input 
                  type="number" 
                  name="buget"
                  value={formData.buget}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50" 
                  placeholder="ex: 35000" 
                />
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">COMBUSTIBIL</label>
              <div className="flex flex-wrap gap-2">
                {["Diesel", "Benzină", "Hybrid", "Electric", "Oricare"].map((f) => (
                  <label key={f} className="flex items-center gap-2 border border-[rgba(184,150,46,0.2)] px-3 py-2 rounded-sm cursor-pointer hover:border-[#B8962E] transition-colors min-h-[44px]">
                    <input 
                      type="checkbox" 
                      checked={formData.combustibil.includes(f)}
                      onChange={() => handleFuelChange(f)}
                      disabled={isLoading}
                      className="accent-[#B8962E]" 
                    />
                    <span className="font-body text-sm text-[#888880]">{f}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">CUTIE VITEZE</label>
              <div className="flex flex-wrap gap-2">
                {["Automată", "Manuală", "Oricare"].map((t) => (
                  <label key={t} className="flex items-center gap-2 border border-[rgba(184,150,46,0.2)] px-3 py-2 rounded-sm cursor-pointer hover:border-[#B8962E] transition-colors min-h-[44px]">
                    <input 
                      type="radio" 
                      name="cutieViteze" 
                      value={t}
                      checked={formData.cutieViteze === t}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="accent-[#B8962E]" 
                    />
                    <span className="font-body text-sm text-[#888880]">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">OBSERVAȚII</label>
              <textarea 
                rows={3} 
                name="observatii"
                value={formData.observatii}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors resize-none disabled:opacity-50" 
                placeholder="Alte detalii sau preferințe..." 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-gold w-full py-4 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Se trimite...</span>
                </>
              ) : (
                "Trimite Cererea"
              )}
            </button>

            {/* Feedback Messages */}
            <AnimatePresence>
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-[rgba(184,150,46,0.1)] border border-[#B8962E] rounded-sm flex items-start gap-3"
                >
                  <CheckCircle2 className="text-[#B8962E] flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-body text-[#F5F5F0]">{successMessage}</p>
                </motion.div>
              )}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500 rounded-sm flex items-start gap-3"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-body text-red-500">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="flex items-center gap-2 mt-4 justify-center">
            <Clock size={14} className="text-[#B8962E]" />
            <span className="font-body text-xs text-[#888880]">Răspundem în maxim 24 de ore</span>
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Network, t: "Rețea Națională", d: "Furnizori verificați din toată România" },
            { icon: Tag, t: "Prețuri Negociate", d: "Cel mai bun preț pentru mașina ta" },
            { icon: Search, t: "Inspecție Inclusă", d: "Verificare tehnică înainte de livrare" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-4 bg-[#161616] border border-[rgba(184,150,46,0.1)] rounded-sm p-5">
                <Icon size={20} className="text-[#B8962E] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="font-body text-sm font-medium text-[#F5F5F0] mb-1">{item.t}</h4>
                  <p className="font-body text-xs text-[#888880]">{item.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
