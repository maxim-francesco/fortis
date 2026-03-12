import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  ArrowLeft
} from "lucide-react";
import { getListingById } from "@/lib/api";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

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
        <Link to="/masini" className="btn-gold flex items-center gap-2">
          <ArrowLeft size={16} /> Înapoi la stoc
        </Link>
      </div>
    );
  }

  const getAttr = (name: string) => {
    return listing.attributeValues?.find((av: any) => av.attribute.name.toLowerCase() === name.toLowerCase());
  };

  const attributes = listing.attributeValues || [];
  const waLink = `https://wa.me/40751489879?text=Bună%20ziua%2C%20sunt%20interesat%20de%20anunțul%20${encodeURIComponent(listing.title)}`;

  return (
    <div className="min-h-screen bg-[#080808] pb-20">
      {/* Breadcrumbs */}
      <div className="pt-24 pb-6 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880]">
            <Link to="/" className="hover:text-[#B8962E] transition-colors">Acasă</Link>
            <ChevronRight size={12} />
            <Link to="/masini" className="hover:text-[#B8962E] transition-colors">Mașini</Link>
            <ChevronRight size={12} />
            <span className="text-[#B8962E] truncate max-w-[200px] sm:max-w-none">{listing.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden">
              <img 
                src={listing.images?.[activeImage]?.url || "https://picsum.photos/seed/car/800/500"} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="font-label text-[10px] tracking-widest bg-[#B8962E] text-[#080808] px-3 py-1.5">
                  GARANȚIE 12 LUNI
                </span>
              </div>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x scrollbar-hide">
              {listing.images?.map((img: any, i: number) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-shrink-0 w-24 sm:w-32 aspect-video border rounded-sm overflow-hidden transition-all snap-start ${
                    activeImage === i ? "border-[#B8962E]" : "border-[rgba(184,150,46,0.15)] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} className="w-full h-full object-cover" alt={`Gallery thumbnail ${i}`} />
                </button>
              ))}
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
              <a href="tel:0751489879" className="btn-gold w-full py-4 flex items-center justify-center gap-2">
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
                <a href="tel:0751489879" className="btn-gold w-full text-center py-3 rounded-sm text-sm">Programează Vizionare</a>
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
    </div>
  );
}
