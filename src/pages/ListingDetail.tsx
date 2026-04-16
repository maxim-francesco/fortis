import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  X
} from "lucide-react";
import { getListingById } from "@/lib/api";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#B8962E] mb-4" size={40} />
        <p className="font-body text-[#888880] text-sm tracking-widest">SE ÎNCARCĂ DETALIILE...</p>
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

  const getAttr = (name: string) => {
    if (!listing?.attributeValues) return null;
    return listing.attributeValues.find((av: any) => {
      const avName = (av.attribute?.name || "").toLowerCase().trim();
      const query = name.toLowerCase().trim();
      if (query === 'an') return avName === 'an' || avName.includes('fabrica');
      if (query === 'cutie de viteze' || query === 'cutie') return avName.includes('cutie') || avName.includes('transmisie') || avName.includes('viteze');
      if (query === 'combustibil') return avName.includes('combustibil') || avName.includes('motorizare');
      return avName === query || avName.includes(query);
    });
  };

  const attributes = listing.attributeValues || [];
  const waLink = `https://wa.me/40754299199?text=Bună%20ziua%2C%20sunt%20interesat%20de%20anunțul%20${encodeURIComponent(listing.title)}`;

  return (
    <div className="min-h-screen bg-[#080808] pb-20">
      <Helmet>
        <title>{listing ? `${listing.title} | MEDFIL Automobile Cluj` : "Mașină | MEDFIL"}</title>
        <meta name="description" content={listing ? `Cumpără ${listing.title} cu garanție 12 luni și finanțare în rate. Kilometri reali, verificare completă. Test drive în Cluj-Napoca, cartierul Iris.` : ""} />
      </Helmet>
      {/* Breadcrumbs */}
      <div className="pt-24 pb-6 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880]">
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
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImage]?.url || "https://picsum.photos/seed/car/800/500"} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  onClick={() => setIsLightboxOpen(true)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) nextImage();
                    else if (offset.x > 50) prevImage();
                  }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-[#B8962E] hover:text-[#080808] transition-all lg:opacity-0 lg:group-hover:opacity-100 z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-[#B8962E] hover:text-[#080808] transition-all lg:opacity-0 lg:group-hover:opacity-100 z-10"
              >
                <ChevronRight size={24} />
              </button>

              {/* Badges Overlay */}
              <div className="absolute top-4 right-4 pointer-events-none z-10">
                <span className="font-label text-[10px] tracking-widest bg-[#B8962E] text-[#080808] px-3 py-1.5 shadow-lg">
                  GARANȚIE 12 LUNI
                </span>
              </div>

              {/* Counter Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 pointer-events-none z-10">
                <p className="text-[10px] font-label text-white tracking-widest uppercase">
                  Poza {activeImage + 1} din {images.length}
                </p>
              </div>
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
                  €{listing.price?.toLocaleString() || "Contact"}
                </div>
                <div className="h-6 w-px bg-[rgba(184,150,46,0.2)]" />
                <div className="font-body text-xs text-[#888880] uppercase tracking-widest">
                  TVA INCLUS
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(184,150,46,0.1)] p-3 rounded-sm">
                  <Calendar size={18} className="text-[#B8962E]" />
                  <div>
                    <div className="text-[9px] font-label text-[#888880] tracking-widest">AN</div>
                    <div className="text-sm font-body text-[#F5F5F0]">{getAttr("An")?.numberValue || getAttr("An")?.stringValue || "N/A"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(184,150,46,0.1)] p-3 rounded-sm">
                  <Gauge size={18} className="text-[#B8962E]" />
                  <div>
                    <div className="text-[9px] font-label text-[#888880] tracking-widest">KILOMETRAJ</div>
                    <div className="text-sm font-body text-[#F5F5F0]">{listing.mileage?.toLocaleString() || "N/A"} km</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(184,150,46,0.1)] p-3 rounded-sm">
                  <Fuel size={18} className="text-[#B8962E]" />
                  <div>
                    <div className="text-[9px] font-label text-[#888880] tracking-widest">COMBUSTIBIL</div>
                    <div className="text-sm font-body text-[#F5F5F0]">{getAttr("Combustibil")?.stringValue || "N/A"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(184,150,46,0.1)] p-3 rounded-sm">
                  <Settings size={18} className="text-[#B8962E]" />
                  <div>
                    <div className="text-[9px] font-label text-[#888880] tracking-widest">CUTIE</div>
                    <div className="text-sm font-body text-[#F5F5F0]">{getAttr("Cutie de viteze")?.stringValue || "N/A"}</div>
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
              <Link to="/finantare" className="block w-full text-center font-body text-xs text-[#888880] hover:text-[#B8962E] transition-colors py-2 uppercase tracking-widest">
                VERIFICĂ ELIGIBILITATE FINANȚARE
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="bg-[#111111] border border-[rgba(184,150,46,0.1)] rounded-sm p-5 space-y-4">
              <div className="flex gap-3">
                <Shield size={18} className="text-[#B8962E] flex-shrink-0" />
                <p className="text-xs font-body text-[#888880] leading-relaxed">
                  <strong className="text-[#F5F5F0]">Garanție 12 luni Motor+Cutie</strong> — Mașina a fost supusă unei verificări tehnice riguroase înainte de vânzare.
                </p>
              </div>
              <div className="flex gap-3">
                <CreditCard size={18} className="text-[#B8962E] flex-shrink-0" />
                <p className="text-xs font-body text-[#888880] leading-relaxed">
                  <strong className="text-[#F5F5F0]">Finanțare Fără Avans</strong> — Aprobare rapidă doar cu buletinul pentru persoane fizice și juridice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details & Description */}
        <div className="mt-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            
            {/* Spec grid */}
            <div>
              <h2 className="font-display text-2xl text-[#F5F5F0] mb-6 gold-underline pb-3">
                Date Tehnice
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1">
                {attributes.map((av: any, i: number) => (
                  <div key={i} className="flex justify-between items-center border-b border-[rgba(136,136,128,0.1)] py-3">
                    <span className="text-[10px] font-label text-[#888880] tracking-widest uppercase">{av.attribute.name}</span>
                    <span className="text-sm font-body text-[#F5F5F0]">
                      {av.stringValue ?? av.numberValue ?? (av.booleanValue ? "Da" : "Nu")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div>
                <h2 className="font-display text-2xl text-[#F5F5F0] mb-6 gold-underline pb-3">
                  Descrierea Vehiculului
                </h2>
                <div className="font-body text-sm text-[#888880] leading-relaxed whitespace-pre-line bg-[#111] p-6 sm:p-8 rounded-sm border border-[rgba(184,150,46,0.05)] shadow-inner">
                  {listing.description}
                </div>
              </div>
            )}
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
                <p className="font-body text-xs text-[#888880] mb-8 leading-relaxed">Programează o prezentare video prin WhatsApp sau vizitează parcul nostru auto.</p>
                <a href="tel:0754299199" className="btn-gold w-full text-center py-3 rounded-sm text-sm">Programează Vizionare</a>
              </div>
              
              <div className="border border-[rgba(184,150,46,0.1)] rounded-sm p-6">
                <h4 className="font-label text-[#B8962E] text-[10px] tracking-widest mb-4">ALTE SERVICII INCLUSE</h4>
                <ul className="space-y-3">
                  {["Transport Gratuit", "RAR la Cerere", "Numere Provizorii", "Consultanță RAR"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#888880] font-body">
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button 
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
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10 hover:bg-[#B8962E] hover:text-[#080808] transition-all z-[110]"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10 hover:bg-[#B8962E] hover:text-[#080808] transition-all z-[110]"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Container */}
            <div 
              className="w-full h-full flex items-center justify-center p-4 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={images[activeImage]?.url} 
                  className="max-w-full max-h-full object-contain shadow-2xl"
                  alt={listing.title}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) nextImage();
                    else if (offset.x > 50) prevImage();
                  }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
