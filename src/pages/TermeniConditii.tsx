import { m } from "framer-motion";
import { SEO } from "@/components/SEO";
import { ChevronRight, FileText, Info, ShieldAlert, Phone, Scale } from "lucide-react";

export default function TermeniConditii() {
  const lastUpdated = "20 Mai 2024";

  return (
    <div className="min-h-screen bg-[#080808] pb-20">
      <SEO 
        title="Termeni și Condiții | MEDFIL Automobile" 
        description="Termeni și condiții de utilizare pentru platforma MEDFIL Automobile."
        canonical="https://medfil.ro/termeni-si-conditii"
      />
      {/* Hero Header */}
      <div className="relative pt-24 pb-12 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-4">
            <a href="/" className="hover:text-[#B8962E] transition-colors">Acasă</a>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Termeni și Condiții</span>
          </div>
          <m.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0] mb-4"
          >
            Termeni și Condiții
          </m.h1>
          <p className="font-body text-sm text-[#888880]">Ultima actualizare: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <m.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-gold max-w-none space-y-10 font-body text-[#888880] leading-relaxed"
        >
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">01.</span> Identitatea Operatorului
            </h2>
            <p>
              Prezenta secțiune stabilește termenii și condițiile de utilizare a site-ului nostru și se aplică raporturilor dintre utilizator și <strong>MEDFIL AUTOMOBILE SRL</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li><strong>CUI:</strong> 44290330</li>
              <li><strong>Nr. Reg. Com.:</strong> J12/2390/2021</li>
              <li><strong>Sediul social:</strong> Str. Oașului 164/A, Cluj-Napoca</li>
              <li><strong>Punct de lucru:</strong> Str. Oașului 134a, Cluj-Napoca</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">02.</span> Obiectul de activitate
            </h2>
            <p>Compania noastră oferă o gamă variată de servicii auto, inclusiv:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Comercializare autoturisme second-hand.</li>
              <li>Intermediere financiară în parteneriat cu instituții precum TBI Bank și UniCredit.</li>
              <li>Servicii de buy-back.</li>
              <li>Aducere autoturisme la comandă personalizată, conform preferințelor clienților.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">03.</span> Acuratețea informațiilor
            </h2>
            <p>
              Facem toate eforturile pentru a asigura corectitudinea informațiilor prezentate. Cu toate acestea, subliniem că prețurile, dotările, kilometrajul și alte aspecte tehnice sau comerciale afișate pe platforma noastră au caracter strict informativ și <strong>nu</strong> constituie oferte contractuale sau un angajament legal. Cumpărătorul are responsabilitatea de a verifica, la momentul vizionării autoturismului, corectitudinea tuturor datelor prezentate public.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">04.</span> Proprietate intelectuală
            </h2>
            <p>
              Întregul conținut al acestui site, incluzând imagini, texte, logo-uri, elemente de grafică și scripturi, este proprietatea <strong>MEDFIL AUTOMOBILE SRL</strong> și beneficiază de protecția legilor pentru drepturile de proprietate intelectuală. Utilizarea, reproducerea sau modificarea acestuia fără acordul scris în prealabil al companiei noastre este strict interzisă.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">05.</span> Legea aplicabilă
            </h2>
            <p>
              Prezentul document de Termeni și Condiții se guvernează și se interpretează în conformitate cu legea română. Orice litigii sau neînțelegeri rezultate în legătură cu utilizarea site-ului vor fi supuse jurisdicției instanțelor competente din Cluj-Napoca, Str. Oașului 134a, Cluj-Napoca, cartier Iris.
            </p>
          </section>

          {/* Contact Section */}
          <div className="mt-16 p-8 bg-[#161616] border border-[rgba(184,150,46,0.2)] rounded-sm shadow-gold">
            <h3 className="font-display text-2xl text-[#F5F5F0] mb-6">Contact pentru Solicitări</h3>
            <p className="mb-8 text-sm">Pentru orice detalii suplimentare, sesizări sau pentru a discuta referitor la un autovehicul, ne găsiți la datele de mai jos:</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[rgba(184,150,46,0.1)] rounded-sm flex items-center justify-center">
                  <Phone size={18} className="text-[#B8962E]" />
                </div>
                <span className="text-[#F5F5F0]">0754 299 199</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[rgba(184,150,46,0.1)] rounded-sm flex items-center justify-center">
                  <Info size={18} className="text-[#B8962E]" />
                </div>
                <span className="text-[#F5F5F0]">medfilautomobile@gmail.com</span>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}
