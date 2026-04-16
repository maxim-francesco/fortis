import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Cookie, ShieldCheck, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function PoliticaCookies() {
  const lastUpdated = "20 Mai 2024";

  return (
    <div className="min-h-screen bg-[#080808] pb-20">
      <Helmet>
        <title>Politica de Cookies | MEDFIL Automobile</title>
      </Helmet>
      {/* Hero Header */}
      <div className="relative pt-24 pb-12 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-4">
            <Link to="/" className="hover:text-[#B8962E] transition-colors">Acasă</Link>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Politică de Cookie-uri</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0] mb-4"
          >
            Politică de Cookie-uri
          </motion.h1>
          <p className="font-body text-sm text-[#888880]">Ultima actualizare: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-gold max-w-none space-y-10 font-body text-[#888880] leading-relaxed"
        >
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">01.</span> Ce sunt Cookie-urile?
            </h2>
            <p>
              Un "Cookie" (termen cunoscut și sub numele de "browser cookie" sau "HTTP cookie" ori "cookie") este un fișier de mici dimensiuni, format din litere și cifre, care va fi stocat pe computerul, terminalul mobil sau alte echipamente ale unui utilizator de pe care se accesează internetul.
            </p>
            <p>
              Cookie-ul este instalat prin solicitarea emisă de către un web-server unui browser (ex: Internet Explorer, Chrome) și este complet "pasiv" (nu conține programe software, viruși sau spyware și nu poate accesa informațiile de pe hard-driverul utilizatorului).
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">02.</span> Tipuri de Cookie-uri utilizate
            </h2>
            <p>Site-ul <strong>MEDFIL Automobile</strong> utilizează următoarele categorii de cookie-uri:</p>
            <div className="space-y-6 mt-6">
              <div className="p-6 bg-[#111] border border-[rgba(184,150,46,0.1)] rounded-sm">
                <h4 className="text-[#F5F5F0] font-medium text-lg mb-2 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#B8962E]" />
                  Cookie-uri Strict Necesar
                </h4>
                <p className="text-sm">Acestea sunt esențiale pentru buna funcționare a site-ului. Fără acestea, site-ul nu ar putea afișa corect conținutul sau nu ar permite navigarea securizată. Acestea nu colectează informații despre dvs. care ar putea fi folosite pentru marketing.</p>
              </div>
              
              <div className="p-6 bg-[#111] border border-[rgba(184,150,46,0.1)] rounded-sm">
                <h4 className="text-[#F5F5F0] font-medium text-lg mb-2 flex items-center gap-2">
                  <Settings size={18} className="text-[#B8962E]" />
                  Cookie-uri de Analiză (Performanță)
                </h4>
                <p className="text-sm">Utilizăm instrumente precum Google Analytics pentru a înțelege cum interacționează vizitatorii cu site-ul nostru (ex: pagini vizitate, timpul petrecut pe site). Toate informațiile sunt colectate în mod anonim și agregat.</p>
              </div>

              <div className="p-6 bg-[#111] border border-[rgba(184,150,46,0.1)] rounded-sm">
                <h4 className="text-[#F5F5F0] font-medium text-lg mb-2 flex items-center gap-2">
                  <Cookie size={18} className="text-[#B8962E]" />
                  Cookie-uri de Funcționalitate
                </h4>
                <p className="text-sm">Acestea permit site-ului să rețină alegerile pe care le faceți (cum ar fi acceptarea bannerului de cookies) pentru a vă oferi o experiență personalizată la următoarea vizită.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">03.</span> Durata de stocare
            </h2>
            <p>
              Durata de viață a unui cookie poate varia semnificativ, depinzând de scopul pentru care este plasat. Unele cookie-uri sunt folosite exclusiv pentru o singură sesiune ("session cookies") și nu mai sunt reținute odată ce utilizatorul a părăsit website-ul, în timp ce altele sunt reținute și refolosite de fiecare dată când utilizatorul revine pe acel website ("cookie-uri persistente").
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">04.</span> Cum puteți opri cookie-urile?
            </h2>
            <p>
              Dezactivarea și refuzul de a primi cookie-uri pot face site-ul dificil de vizitat sau utilizat. Puteți configura browserul dumneavoastră să refuze cookie-urile sau să vă alerteze atunci când sunt trimise cookie-uri către dispozitivul dvs.
            </p>
            <p className="mt-4">Setările pot fi găsite de regulă în meniul "Opțiuni" sau "Preferințe" al browserului:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
              <li>Setări Cookie în Chrome</li>
              <li>Setări Cookie în Firefox</li>
              <li>Setări Cookie în Safari</li>
              <li>Setări Cookie în Edge</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">05.</span> Contact
            </h2>
            <p>
              Dacă aveți întrebări suplimentare despre modul în care utilizăm cookie-urile, vă rugăm să ne contactați la <strong>medfilautomobile@gmail.com</strong> sau să consultați <Link to="/politica-de-confidentialitate" className="text-[#B8962E] hover:underline">Politica de Confidențialitate</Link>.
            </p>
          </section>

          {/* Business Info Footer */}
          <div className="mt-16 pt-8 border-t border-[rgba(184,150,46,0.12)]">
            <p className="text-xs text-center">
              © 2025 MEDFIL AUTOMOBILE SRL | CUI: 44290330 | Str. Oașului 164/A, Cluj-Napoca, Jud. Cluj (sediu social) / Str. Oașului 134a, Cluj-Napoca (punct de lucru)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
