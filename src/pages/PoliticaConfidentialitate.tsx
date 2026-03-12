import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function PoliticaConfidentialitate() {
  const lastUpdated = "20 Mai 2024";

  return (
    <div className="min-h-screen bg-[#080808] pb-20">
      {/* Hero Header */}
      <div className="relative pt-24 pb-12 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-4">
            <a href="/" className="hover:text-[#B8962E] transition-colors">Acasă</a>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Politică de Confidențialitate</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0] mb-4"
          >
            Politică de Confidențialitate
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
              <span className="text-[#B8962E]">01.</span> Identitatea Operatorului
            </h2>
            <p>
              Prezenta Politică de Confidențialitate descrie modul în care <strong>FORTIS PREMIUM AUTO SRL</strong> („Societatea”, „noi” sau „Operatorul”), cu sediul în [ADRESA FIRMEI], înmatriculată la Registrul Comerțului sub nr. <strong>J2025088822001</strong>, având CUI <strong>52925212</strong>, colectează și procesează datele dumneavoastră cu caracter personal.
            </p>
            <p>
              În calitate de operator de date, suntem angajați să protejăm confidențialitatea datelor dumneavoastră în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația română în vigoare.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">02.</span> Datele colectate
            </h2>
            <p>Colectăm informații atunci când interacționați cu site-ul nostru, inclusiv:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Date de identificare:</strong> Nume și prenume furnizate în formularele de contact sau buy-back.</li>
              <li><strong>Date de contact:</strong> Adresă de e-mail și număr de telefon.</li>
              <li><strong>Date tehnice:</strong> Adresa IP, tipul browserului, date despre sistemul de operare și comportamentul de navigare prin intermediul cookie-urilor.</li>
              <li><strong>Date despre vehicul:</strong> În cazul utilizării serviciului de evaluare/buy-back (marcă, model, an, kilometraj).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">03.</span> Scopul și Temeiul Juridic
            </h2>
            <p>Prelucrăm datele dumneavoastră pe baza următoarelor temeiuri:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Executarea unui contract:</strong> Pentru a răspunde solicitărilor dumneavoastră privind achiziția sau finanțarea unui vehicul.</li>
              <li><strong>Consimțământ:</strong> Pentru activități de marketing (dacă v-ați abonat la newsletter).</li>
              <li><strong>Interes legitim:</strong> Pentru a îmbunătăți experiența de utilizare a site-ului și a asigura securitatea platformei.</li>
              <li><strong>Obligație legală:</strong> Pentru îndeplinirea obligațiilor fiscale sau de raportare.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">04.</span> Drepturile Dumneavoastră (GDPR)
            </h2>
            <p>Conform GDPR, beneficiați de următoarele drepturi:</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {[
                { t: "Dreptul de acces", d: "Puteți solicita o copie a datelor pe care le deținem despre dvs." },
                { t: "Dreptul la rectificare", d: "Puteți solicita corectarea datelor inexacte." },
                { t: "Dreptul la ștergere", d: "Cunoscut și sub numele de „dreptul de a fi uitat”." },
                { t: "Dreptul la portabilitate", d: "Puteți solicita transferul datelor către un alt operator." },
                { t: "Dreptul la opoziție", d: "Vă puteți opune prelucrării în scopuri de marketing." },
                { t: "Restricționarea prelucrării", d: "Puteți solicita limitarea modului în care folosim datele." }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[#111] border border-[rgba(184,150,46,0.1)] rounded-sm">
                  <h4 className="text-[#F5F5F0] font-medium text-sm mb-1">{item.t}</h4>
                  <p className="text-xs">{item.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">05.</span> Perioada de Retenție
            </h2>
            <p>
              Vom păstra datele dumneavoastră doar atât timp cât este necesar pentru scopurile menționate (de exemplu, pe durata procesării unei cereri de ofertă) sau conform obligațiilor legale de arhivare (în general 5-10 ani pentru documente financiar-contabile).
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-2xl text-[#F5F5F0] mb-4 flex items-center gap-3">
              <span className="text-[#B8962E]">06.</span> Destinatari și Transferuri
            </h2>
            <p>
              Datele dumneavoastră pot fi partajate cu parteneri de încredere (furnizori de servicii IT, platforme de analiză precum Google Analytics, sau instituții bancare în cazul solicitărilor de finanțare). Nu vindem datele dumneavoastră către terți. Orice transfer în afara Spațiului Economic European se realizează cu garanții adecvate.
            </p>
          </section>

          {/* Contact Section */}
          <div className="mt-16 p-8 bg-[#161616] border border-[rgba(184,150,46,0.2)] rounded-sm shadow-gold">
            <h3 className="font-display text-2xl text-[#F5F5F0] mb-6">Contact pentru Protecția Datelor</h3>
            <p className="mb-8 text-sm">Pentru orice întrebări legate de prelucrarea datelor dumneavoastră sau pentru exercitarea drepturilor, ne puteți contacta:</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[rgba(184,150,46,0.1)] rounded-sm flex items-center justify-center">
                  <Mail size={18} className="text-[#B8962E]" />
                </div>
                <span className="text-[#F5F5F0]">[EMAIL CONTACT]</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[rgba(184,150,46,0.1)] rounded-sm flex items-center justify-center">
                  <Phone size={18} className="text-[#B8962E]" />
                </div>
                <span className="text-[#F5F5F0]">0751-489-879</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[rgba(184,150,46,0.1)] rounded-sm flex items-center justify-center">
                  <MapPin size={18} className="text-[#B8962E]" />
                </div>
                <span className="text-[#F5F5F0]">[ADRESA FIRMEI]</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[rgba(184,150,46,0.1)]">
              <p className="text-xs">
                Aveți, de asemenea, dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) la <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-[#B8962E] hover:underline">www.dataprotection.ro</a>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}