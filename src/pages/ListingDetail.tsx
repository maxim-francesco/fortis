import { useState, useEffect, useCallback } from "react";
import { SEO } from "@/components/SEO";
import { useParams, Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings, 
  Phone, 
  MessageCircle,
  Shield,
  CreditCard,
  Loader2,
  ArrowLeft,
  ChevronLeft,
  X,
  Car,
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { getListingById, submitContactForm } from "@/lib/api";
import { getVehicleSchema } from "@/lib/seo/schemas";
import { cldImage, cldSrcSet } from "@/lib/cloudinary";
import { getAttrValue } from "@/lib/attributes";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [enquiryForm, setEnquiryForm] = useState({
    nume: "",
    telefon: "",
    email: "",
    mesaj: "",
    consent: false,
  });
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState("");
  const [enquiryError, setEnquiryError] = useState("");
  const [enquiryValidationErrors, setEnquiryValidationErrors] = useState<Record<string, string>>({});

  const images = listing?.images || [];

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setActiveImage((prev) => (prev + 1) % images.length);
  }, [images]);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    setLoading(true);
    getListingById(id)
      .then((data) => {
        setListing(data);
        if (data?.title) {
          setEnquiryForm(prev => ({
            ...prev,
            mesaj: `Doresc mai multe informații despre ${data.title}.`
          }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (isLightboxOpen) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, nextImage, prevImage]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!enquiryForm.nume || enquiryForm.nume.trim().length < 2) errors.nume = "Introdu un nume valid";
    if (!enquiryForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryForm.email.trim())) errors.email = "Introdu o adresă de email validă";
    if (!enquiryForm.telefon || !/^(\+4|4)?0?7[0-9]{8}$/.test(enquiryForm.telefon.replace(/\s+/g, ''))) errors.telefon = "Introdu un număr de telefon românesc valid";
    if (!enquiryForm.mesaj || enquiryForm.mesaj.trim().length < 5) errors.mesaj = "Mesajul este obligatoriu";
    if (!enquiryForm.consent) errors.consent = "Trebuie să fii de acord cu Politica de Confidențialitate";

    setEnquiryValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setEnquiryLoading(true);
    setEnquirySuccess("");
    setEnquiryError("");

    const formattedMessage = `
🚗 SOLICITARE INFORMAȚII MAȘINĂ DIN STOC

📌 Vehicul: ${listing?.title || 'Vehicul'} (ID: ${listing?.id || id})
👤 Nume: ${enquiryForm.nume}
✉️ Email: ${enquiryForm.email}
📞 Telefon: ${enquiryForm.telefon}

📝 Mesaj:
${enquiryForm.mesaj}
    `.trim();

    try {
      const result = await submitContactForm({
        type: "STOCK",
        listingId: listing?.id || id,
        name: enquiryForm.nume,
        email: enquiryForm.email,
        phone: enquiryForm.telefon,
        message: formattedMessage,
      });

      if (result.success) {
        setEnquirySuccess("Am primit solicitarea ta. Te contactăm în cel mai scurt timp posibil.");
        setEnquiryForm({
          nume: "",
          telefon: "",
          email: "",
          mesaj: `Doresc mai multe informații despre ${listing?.title || 'acest vehicul'}.`,
          consent: false,
        });
        setEnquiryValidationErrors({});
      } else {
        setEnquiryError(result.error || "A apărut o eroare la trimitere. Încearcă din nou sau sună-ne la 0754 299 199.");
      }
    } catch (err) {
      setEnquiryError("Eroare de rețea. Încearcă din nou.");
    } finally {
      setEnquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#B8962E] mb-4" size={40} />
        <p className="font-body text-[#B0B0A8] text-sm tracking-widest">SE ÎNCARCĂ DETALIILE...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-4">
        <h1 className="font-display text-2xl text-[#F5F5F0] mb-4 text-center">Mașina solicitată nu a putut fi găsită.</h1>
        <Link to="/stoc" className="btn-gold flex items-center gap-2">
          <ArrowLeft size={16} /> Înapoi la stoc
        </Link>
      </div>
    );
  }

  const make = getAttrValue(listing, "make") || listing.marca;
  const model = getAttrValue(listing, "model") || listing.model;
  const year = getAttrValue(listing, "year") || listing.year || "N/A";
  const mileage = listing.mileage ? listing.mileage.toLocaleString("ro-RO") : (getAttrValue(listing, "mileage")?.toLocaleString("ro-RO") ?? "N/A");
  const fuel = listing.fuelType || getAttrValue(listing, "fuelType") || "N/A";
  const gearbox = listing.gearbox || getAttrValue(listing, "gearbox") || "N/A";

  const carHeading = (make && model) ? `${make} ${model} ${year !== "N/A" ? year : ""}`.trim() : (listing.title || "Auto");
  const seoTitle = `${carHeading} - MEDFIL Cluj | ${listing.price ? listing.price.toLocaleString("ro-RO") + " EUR" : "Contact"}`;
  const seoDesc = `${carHeading} din ${year !== "N/A" ? year : "N/A"}, ${mileage} km, ${fuel}, ${gearbox}. Verificat tehnic la MEDFIL Automobile Cluj. Finanțare disponibilă.`;

  const attributes = listing.attributeValues || [];

  // Fix 10: Split feature attributes from technical specifications
  const isFeatureAttr = (av: any) => {
    const attrId = av.attributeId || av.attribute?.id || "";
    return attrId.startsWith("attr:feature:");
  };
  const specAttributes = attributes.filter((av: any) => !isFeatureAttr(av));
  const featureAttributes = attributes.filter((av: any) => isFeatureAttr(av) && av.booleanValue !== false);

  const waLink = `https://wa.me/40754299199?text=Bună%20ziua%2C%20sunt%20interesat%20de%20anunțul%20${encodeURIComponent(listing.title)}`;

  return (
    <div className="min-h-screen bg-[#080808] pb-20">
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={`https://medfil.ro/stoc/${id}`}
        ogImage={images[0]?.url || "/og-default.jpg"}
        structuredData={[getVehicleSchema(listing)]}
      />
      {/* Breadcrumbs */}
      <div className="pt-24 pb-6 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 font-body text-xs text-[#B0B0A8]">
            <Link to="/" className="hover:text-[#B8962E] transition-colors">Acasă</Link>
            <ChevronRight size={12} />
            <Link to="/stoc" className="hover:text-[#B8962E] transition-colors">Mașini</Link>
            <ChevronRight size={12} />
            <span className="text-[#B8962E] truncate max-w-[200px] sm:max-w-none">{listing.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left: Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden group cursor-zoom-in">
              <AnimatePresence mode="wait">
                {images[activeImage]?.url ? (
                  <m.img 
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={cldImage(images[activeImage]?.url, { width: 1200, format: 'auto' })} 
                    srcSet={cldSrcSet(images[activeImage]?.url, [600, 800, 1200])}
                    sizes="(max-width: 1024px) 100vw, 800px"
                    alt={`Fotografie principală ${listing.title || 'vehicul'}`}
                    className="w-full h-full object-cover"
                    loading={activeImage === 0 ? "eager" : "lazy"}
                    fetchpriority={activeImage === 0 ? "high" : "auto"}
                    decoding="async"
                    onClick={() => setIsLightboxOpen(true)}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, { offset }) => {
                      if (offset.x < -50) nextImage();
                      else if (offset.x > 50) prevImage();
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-[#111111] flex flex-col items-center justify-center text-[#B0B0A8] border border-[rgba(184,150,46,0.1)]">
                    <Car size={48} className="text-[#B8962E] mb-2" strokeWidth={1.5} />
                    <span className="font-body text-sm">Fără imagine</span>
                  </div>
                )}
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    aria-label="Imaginea anterioară"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-[#B8962E] hover:text-[#080808] transition-all lg:opacity-0 lg:group-hover:opacity-100 z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    aria-label="Imaginea următoare"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-[#B8962E] hover:text-[#080808] transition-all lg:opacity-0 lg:group-hover:opacity-100 z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Badges Overlay */}
              <div className="absolute top-4 right-4 pointer-events-none z-10">
                <span className="font-label text-[10px] tracking-widest bg-[#B8962E] text-[#080808] px-3 py-1.5 shadow-lg">
                  GARANȚIE 12 LUNI
                </span>
              </div>

              {/* Counter Overlay */}
              {images.length > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 pointer-events-none z-10">
                  <p className="text-[10px] font-label text-white tracking-widest uppercase">
                    Poza {activeImage + 1} din {images.length}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F0] mb-4 leading-tight">
                {listing.title}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="font-display text-3xl font-bold text-[#B8962E]">
                  €{listing.price?.toLocaleString("ro-RO") || "Contact"}
                </div>
                <div className="h-6 w-px bg-[rgba(184,150,46,0.2)]" />
                <div className="font-body text-xs text-[#B0B0A8] uppercase tracking-widest">
                  TVA INCLUS
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(184,150,46,0.1)] p-3 rounded-sm">
                  <Calendar size={18} className="text-[#B8962E]" />
                  <div>
                    <div className="text-[9px] font-label text-[#B0B0A8] tracking-widest">AN</div>
                    <div className="text-sm font-body text-[#F5F5F0]">{year}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(184,150,46,0.1)] p-3 rounded-sm">
                  <Gauge size={18} className="text-[#B8962E]" />
                  <div>
                    <div className="text-[9px] font-label text-[#B0B0A8] tracking-widest">KILOMETRAJ</div>
                    <div className="text-sm font-body text-[#F5F5F0]">{mileage} km</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(184,150,46,0.1)] p-3 rounded-sm">
                  <Fuel size={18} className="text-[#B8962E]" />
                  <div>
                    <div className="text-[9px] font-label text-[#B0B0A8] tracking-widest">COMBUSTIBIL</div>
                    <div className="text-sm font-body text-[#F5F5F0]">{fuel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(184,150,46,0.1)] p-3 rounded-sm">
                  <Settings size={18} className="text-[#B8962E]" />
                  <div>
                    <div className="text-[9px] font-label text-[#B0B0A8] tracking-widest">CUTIE</div>
                    <div className="text-sm font-body text-[#F5F5F0]">{gearbox}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a href="tel:0754299199" className="btn-gold w-full py-4 flex items-center justify-center gap-2">
                <Phone size={18} />
                <span>Contactează Dealer</span>
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full py-4 flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                <span>Scrie pe WhatsApp</span>
              </a>
              <Link to="/finantare" className="block w-full text-center font-body text-xs text-[#B0B0A8] hover:text-[#B8962E] transition-colors py-2 uppercase tracking-widest">
                VERIFICĂ ELIGIBILITATE FINANȚARE
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="bg-[#111111] border border-[rgba(184,150,46,0.1)] rounded-sm p-5 space-y-4">
              <div className="flex gap-3">
                <Shield size={18} className="text-[#B8962E] flex-shrink-0" />
                <p className="text-xs font-body text-[#B0B0A8] leading-relaxed">
                  <strong className="text-[#F5F5F0]">Garanție 12 luni Motor+Cutie</strong> — Mașina a fost supusă unei verificări tehnice riguroase înainte de vânzare.
                </p>
              </div>
              <div className="flex gap-3">
                <CreditCard size={18} className="text-[#B8962E] flex-shrink-0" />
                <p className="text-xs font-body text-[#B0B0A8] leading-relaxed">
                  <strong className="text-[#F5F5F0]">Finanțare Fără Avans</strong> — Aprobare rapidă doar cu buletinul pentru persoane fizice și juridice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details & Description & Enquiry Form */}
        <div className="mt-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            
            {/* Spec grid */}
            <div>
              <h2 className="font-display text-2xl text-[#F5F5F0] mb-6 gold-underline pb-3">
                Date Tehnice
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1">
                {specAttributes.map((av: any, i: number) => (
                  <div key={i} className="flex justify-between items-center border-b border-[rgba(136,136,128,0.1)] py-3">
                    <span className="text-[10px] font-label text-[#B0B0A8] tracking-widest uppercase">{av.attribute?.name || av.attributeId}</span>
                    <span className="text-sm font-body text-[#F5F5F0]">
                      {av.stringValue ?? av.numberValue ?? (av.booleanValue ? "Da" : "Nu")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fix 10: Dotări / Features section */}
            {featureAttributes.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-[#F5F5F0] mb-6 gold-underline pb-3">
                  Dotări și Echipamente
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#111111] p-6 rounded-sm border border-[rgba(184,150,46,0.1)]">
                  {featureAttributes.map((av: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 font-body text-xs text-[#B0B0A8]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B8962E]" />
                      <span>{av.attribute?.name || av.attributeId}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {listing.description && (
              <div>
                <h2 className="font-display text-2xl text-[#F5F5F0] mb-6 gold-underline pb-3">
                  Descrierea Vehiculului
                </h2>
                <div className="font-body text-sm text-[#B0B0A8] leading-relaxed whitespace-pre-line bg-[#111] p-6 sm:p-8 rounded-sm border border-[rgba(184,150,46,0.05)] shadow-inner">
                  {listing.description}
                </div>
              </div>
            )}

            {/* Fix 4: Inline Enquiry Form */}
            <div className="bg-[#0E0E0E] border border-[rgba(184,150,46,0.3)] rounded-sm p-6 sm:p-8 shadow-gold">
              <h3 className="font-display text-2xl text-[#F5F5F0] mb-2">Solicită Informații Despre Această Mașină</h3>
              <p className="font-body text-sm text-[#B0B0A8] mb-6">Completează formularul de mai jos și echipa noastră te va contacta în cel mai scurt timp.</p>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="enquiry-nume" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-1 uppercase">Nume *</label>
                    <input
                      id="enquiry-nume"
                      name="nume"
                      value={enquiryForm.nume}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, nume: e.target.value }))}
                      disabled={enquiryLoading}
                      className={`w-full bg-[#111] border text-[#F5F5F0] font-body text-sm px-3 py-2.5 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[44px] ${enquiryValidationErrors.nume ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'}`}
                      placeholder="Ion Popescu"
                    />
                    {enquiryValidationErrors.nume && <p className="text-red-500 text-xs font-body mt-1">{enquiryValidationErrors.nume}</p>}
                  </div>

                  <div>
                    <label htmlFor="enquiry-email" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-1 uppercase">Email *</label>
                    <input
                      id="enquiry-email"
                      type="email"
                      name="email"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
                      disabled={enquiryLoading}
                      className={`w-full bg-[#111] border text-[#F5F5F0] font-body text-sm px-3 py-2.5 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[44px] ${enquiryValidationErrors.email ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'}`}
                      placeholder="ion.popescu@gmail.com"
                    />
                    {enquiryValidationErrors.email && <p className="text-red-500 text-xs font-body mt-1">{enquiryValidationErrors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="enquiry-telefon" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-1 uppercase">Telefon *</label>
                    <input
                      id="enquiry-telefon"
                      type="tel"
                      name="telefon"
                      value={enquiryForm.telefon}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, telefon: e.target.value }))}
                      disabled={enquiryLoading}
                      className={`w-full bg-[#111] border text-[#F5F5F0] font-body text-sm px-3 py-2.5 rounded-sm outline-none focus:border-[#B8962E] transition-colors min-h-[44px] ${enquiryValidationErrors.telefon ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'}`}
                      placeholder="07xx xxx xxx"
                    />
                    {enquiryValidationErrors.telefon && <p className="text-red-500 text-xs font-body mt-1">{enquiryValidationErrors.telefon}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="enquiry-mesaj" className="font-label text-[10px] text-[#B0B0A8] tracking-widest block mb-1 uppercase">Mesaj *</label>
                  <textarea
                    id="enquiry-mesaj"
                    rows={3}
                    name="mesaj"
                    value={enquiryForm.mesaj}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, mesaj: e.target.value }))}
                    disabled={enquiryLoading}
                    className={`w-full bg-[#111] border text-[#F5F5F0] font-body text-sm px-3 py-2.5 rounded-sm outline-none focus:border-[#B8962E] transition-colors resize-none ${enquiryValidationErrors.mesaj ? 'border-red-500' : 'border-[rgba(184,150,46,0.2)]'}`}
                  />
                  {enquiryValidationErrors.mesaj && <p className="text-red-500 text-xs font-body mt-1">{enquiryValidationErrors.mesaj}</p>}
                </div>

                <div className="pt-2">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="enquiry-consent"
                      name="consent"
                      checked={enquiryForm.consent}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, consent: e.target.checked }))}
                      disabled={enquiryLoading}
                      className="mt-1 h-4 w-4 rounded border-[rgba(184,150,46,0.3)] bg-[#111] text-[#B8962E] focus:ring-[#B8962E]"
                    />
                    <label htmlFor="enquiry-consent" className="font-body text-xs text-[#B0B0A8] leading-normal">
                      Sunt de acord cu prelucrarea datelor mele personale conform{" "}
                      <Link to="/politica-de-confidentialitate" target="_blank" className="text-[#B8962E] underline hover:text-[#D4AF6A]">
                        Politicii de Confidențialitate
                      </Link>. *
                    </label>
                  </div>
                  {enquiryValidationErrors.consent && (
                    <p className="text-red-500 text-xs font-body mt-1">{enquiryValidationErrors.consent}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={enquiryLoading}
                  className="btn-gold w-full py-3 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {enquiryLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Se trimite...</span>
                    </>
                  ) : (
                    <>
                      <span>Trimite Solicitarea</span>
                      <Send size={16} />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {enquirySuccess && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-[rgba(184,150,46,0.1)] border border-[#B8962E] rounded-sm flex items-start gap-3 mt-4"
                    >
                      <CheckCircle2 className="text-[#B8962E] flex-shrink-0 mt-0.5" size={18} />
                      <p className="text-xs font-body text-[#F5F5F0]">{enquirySuccess}</p>
                    </m.div>
                  )}
                  {enquiryError && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500 rounded-sm flex items-start gap-3 mt-4"
                    >
                      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                      <p className="text-xs font-body text-red-500">{enquiryError}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Sticky sidebar helper */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm p-8 text-center shadow-gold">
                <div className="w-14 h-14 border border-[rgba(184,150,46,0.3)] rounded-sm flex items-center justify-center mx-auto mb-5 rotate-45">
                  <div className="-rotate-45">
                    <Phone className="text-[#B8962E]" size={20} />
                  </div>
                </div>
                <h3 className="font-display text-xl text-[#F5F5F0] mb-2 font-medium">Vrei să o vezi live?</h3>
                <p className="font-body text-xs text-[#B0B0A8] mb-8 leading-relaxed">Programează o prezentare video prin WhatsApp sau vizitează parcul nostru auto.</p>
                <a href="tel:0754299199" className="btn-gold w-full text-center py-3 rounded-sm text-sm">Programează Vizionare</a>
              </div>
              
              <div className="border border-[rgba(184,150,46,0.1)] rounded-sm p-6">
                <h4 className="font-label text-[#B8962E] text-[10px] tracking-widest mb-4">ALTE SERVICII INCLUSE</h4>
                <ul className="space-y-3">
                  {["Transport Gratuit", "RAR la Cerere", "Numere Provizorii", "Consultanță RAR"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#B0B0A8] font-body">
                      <div className="w-1 h-1 bg-[#B8962E] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Galerie foto vehicul"
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button 
              aria-label="Închide galeria"
              className="absolute top-6 right-6 text-white hover:text-[#B8962E] transition-colors p-2 z-[110]"
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            >
              <X size={32} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[110]">
              <p className="text-sm font-label text-white tracking-widest uppercase bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
                Poza {activeImage + 1} din {images.length}
              </p>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  aria-label="Imaginea anterioară"
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10 hover:bg-[#B8962E] hover:text-[#080808] transition-all z-[110]"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  aria-label="Imaginea următoare"
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10 hover:bg-[#B8962E] hover:text-[#080808] transition-all z-[110]"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Image Container */}
            <div 
              className="w-full h-full flex items-center justify-center p-4 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <m.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={images[activeImage]?.url ? cldImage(images[activeImage]?.url, { width: 1920, format: 'auto' }) : undefined} 
                  srcSet={images[activeImage]?.url ? cldSrcSet(images[activeImage]?.url, [800, 1200, 1920]) : undefined}
                  sizes="100vw"
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain shadow-2xl"
                  alt={`Fotografie detaliu ${listing.title || 'vehicul'}`}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) nextImage();
                    else if (offset.x > 50) prevImage();
                  }}
                />
              </AnimatePresence>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
