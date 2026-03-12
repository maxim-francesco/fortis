import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Clock, MapPin, ChevronRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { submitContactForm } from "@/lib/api";

export default function Contact() {
  const waLink = "https://wa.me/40751489879?text=Bună%20ziua%2C%20aș%20dori%20mai%20multe%20informații.";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Informații despre o mașină",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Combine subject and message for the backend call if necessary, 
    // or just pass them as requested by the prompt
    const result = await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `[Subiect: ${formData.subject}]\n\n${formData.message}`
    });

    if (result.success) {
      setSuccessMessage("Mesajul tău a fost trimis cu succes! Te vom contacta în curând.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "Informații despre o mașină",
        message: ""
      });
    } else {
      setErrorMessage(result.error || "A apărut o eroare la trimiterea mesajului.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Page hero */}
      <div className="relative pt-20 pb-10 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-4">
            <Link to="/" className="hover:text-[#B8962E] transition-colors">Acasă</Link>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Contact</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-label text-[#B8962E] tracking-widest text-sm mb-3">CONTACT</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0] mb-10 gold-underline pb-3">
              Hai să Vorbim
            </h1>

            {/* Phone */}
            <div className="mb-8">
              <p className="font-label text-[10px] text-[#888880] tracking-widest mb-2">TELEFON — GABRIEL</p>
              <a
                href="tel:0751489879"
                className="font-display text-3xl sm:text-4xl text-[#B8962E] hover:text-[#D4AF6A] transition-colors block mb-3"
              >
                0751-489-879
              </a>
              <div className="flex items-center gap-2 font-body text-sm text-[#888880]">
                <Clock size={13} className="text-[#B8962E]" />
                <span>Luni–Sâmbătă: 09:00–19:00</span>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-body font-semibold text-sm px-6 py-3 rounded-sm hover:bg-[#1ebe59] transition-colors mb-8"
            >
              <MessageCircle size={16} />
              Scrie pe WhatsApp
            </a>

            {/* Info cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm p-4">
                <div className="w-10 h-10 border border-[rgba(184,150,46,0.25)] rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#B8962E]" />
                </div>
                <div>
                  <div className="font-body text-sm font-medium text-[#F5F5F0]">Locație</div>
                  <div className="font-body text-xs text-[#888880]">România — livrare națională</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm p-4">
                <div className="w-10 h-10 border border-[rgba(184,150,46,0.25)] rounded-sm flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#B8962E]" />
                </div>
                <div>
                  <div className="font-body text-sm font-medium text-[#F5F5F0]">CUI: 52925212</div>
                  <div className="font-body text-xs text-[#888880]">Fortis Premium Auto SRL</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="bg-[#161616] border border-[rgba(184,150,46,0.25)] rounded-sm p-6 sm:p-8 shadow-gold">
              <h2 className="font-display text-2xl text-[#F5F5F0] mb-6">Trimite un Mesaj</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">NUME *</label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50" 
                    placeholder="Numele tău" 
                  />
                </div>
                <div>
                  <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">TELEFON *</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50" 
                    placeholder="07xx xxx xxx" 
                  />
                </div>
                <div>
                  <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">EMAIL</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50" 
                    placeholder="email@exemplu.ro" 
                  />
                </div>
                <div>
                  <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">SUBIECT</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[48px] disabled:opacity-50"
                  >
                    <option>Informații despre o mașină</option>
                    <option>Finanțare</option>
                    <option>Mașini la comandă</option>
                    <option>BuyBack / Evaluare</option>
                    <option>Altele</option>
                  </select>
                </div>
                <div>
                  <label className="font-label text-[10px] text-[#888880] tracking-widest block mb-2">MESAJ</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full bg-[#111] border border-[rgba(184,150,46,0.2)] text-[#F5F5F0] font-body text-sm px-4 py-3 rounded-sm outline-none focus:border-[#B8962E] transition-colors resize-none disabled:opacity-50" 
                    placeholder="Cu ce te putem ajuta?" 
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
                    "Trimite Mesajul"
                  )}
                </button>

                {/* Feedback Messages */}
                <AnimatePresence>
                  {successMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-4 bg-[rgba(184,150,46,0.1)] border border-[#B8962E] rounded-sm flex items-start gap-3"
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
                      className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-sm flex items-start gap-3"
                    >
                      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                      <p className="text-sm font-body text-red-500">{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <div className="mt-14">
          <div className="bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden" style={{ height: "300px" }}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <MapPin size={36} className="text-[#B8962E] opacity-50" />
              <div className="text-center">
                <p className="font-display text-xl text-[#F5F5F0] mb-1">Fortis Premium Auto</p>
                <p className="font-body text-sm text-[#888880] mb-4">România — Livrare Națională</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs px-5 py-2.5 rounded-sm inline-flex items-center gap-2"
                >
                  <MapPin size={12} /> Găsești-ne pe Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}