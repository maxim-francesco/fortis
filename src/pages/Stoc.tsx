import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link } from "react-router-dom";
import { Calendar, Gauge, Fuel, Settings, ChevronRight, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { useListings } from "@/hooks/useListings";

function CarCard({ listing, delay }: { listing: any; delay: number }) {
  const { ref, inView } = useInView(0.05);

  // Extract attributes from real data structure
  const getAttr = (name: string) => {
    if (!listing?.attributeValues) return null;
    const attr = listing.attributeValues.find((av: any) => {
      const avName = (av.attribute?.name || "").toLowerCase().trim();
      const query = name.toLowerCase().trim();
      if (query === 'an') return avName === 'an' || avName.includes('fabrica');
      if (query === 'cutie de viteze' || query === 'cutie') return avName.includes('cutie') || avName.includes('transmisie') || avName.includes('viteze');
      if (query === 'combustibil') return avName.includes('combustibil') || avName.includes('motorizare');
      return avName === query || avName.includes(query);
    });
    return attr?.numberValue ?? attr?.stringValue ?? attr?.booleanValue;
  };

  const year = getAttr("An") || "N/A";
  const fuel = getAttr("Combustibil") || "N/A";
  const transmission = getAttr("Cutie de viteze") || "N/A";
  const price = listing.price ? listing.price.toLocaleString() : "Contact";
  const km = listing.mileage ? listing.mileage.toLocaleString() : "N/A";
  const imageUrl = listing.images?.[0]?.url || "https://picsum.photos/seed/car/600/400";

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55 }}
      className="bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden group hover:-translate-y-1.5 hover:border-[rgba(184,150,46,0.45)] hover:shadow-[0_20px_60px_-15px_rgba(184,150,46,0.2)] transition-all duration-300"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img 
          src={imageUrl} 
          alt={listing.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" 
          data-ai-hint="car exterior"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="font-label text-[9px] tracking-widest border border-[rgba(184,150,46,0.5)] text-[#B8962E] px-2 py-1 bg-[rgba(8,8,8,0.85)]">GARANȚIE 12 LUNI</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-[#F5F5F0] mb-1 line-clamp-1">
          {listing.title}
        </h3>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]"><Calendar size={10} />{year}</span>
          <span className="w-1 h-1 rounded-full bg-[rgba(136,136,128,0.4)]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]"><Gauge size={10} />{km} km</span>
          <span className="w-1 h-1 rounded-full bg-[rgba(136,136,128,0.4)]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]"><Fuel size={10} />{fuel}</span>
          <span className="w-1 h-1 rounded-full bg-[rgba(136,136,128,0.4)]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]"><Settings size={10} />{transmission}</span>
        </div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="font-display text-xl font-semibold text-[#B8962E]">€{price}</div>
            <div className="font-body text-[10px] text-[#888880]">Finanțare disponibilă</div>
          </div>
        </div>
        <Link to={`/stoc/${listing.id}`} className="block w-full text-center font-body text-xs font-medium border border-[rgba(184,150,46,0.3)] text-[#F5F5F0] py-2.5 rounded-sm hover:bg-[#B8962E] hover:text-[#080808] hover:border-[#B8962E] transition-all duration-300">
          Vezi Detalii
        </Link>
      </div>
    </motion.div>
  );
}

export default function Masini() {
  const [page, setPage] = useState("1");
  const [filterOpen, setFilterOpen] = useState(false);
  const { listings, loading, error, pagination } = useListings({ page });
  const { ref, inView } = useInView(0.1);
  const listTopRef = useRef<HTMLDivElement>(null);

  // Scroll to top of list when page changes
  useEffect(() => {
    if (page !== "1" && listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page]);

  const handlePageChange = (newPage: string) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <Helmet>
        <title>Stoc Mașini de Vânzare Cluj | Prețuri Auto Rulate | MEDFIL</title>
        <meta name="description" content="Vezi stocul complet de mașini de vânzare la MEDFIL Cluj. Prețuri competitive, livrare națională, istoric verificat și garanție inclusă." />
        <link rel="canonical" href="https://medfil.ro/stoc" />
      </Helmet>
      {/* Page hero */}
      <div className="relative pt-20 pb-14 bg-[#0A0A0A] border-b border-[rgba(184,150,46,0.12)]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(184,150,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,46,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 font-body text-xs text-[#888880] mb-4">
            <Link to="/" className="hover:text-[#B8962E] transition-colors">Acasă</Link>
            <ChevronRight size={12} />
            <span className="text-[#B8962E]">Mașini</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0]">
            Mașinile Noastre
          </h1>
          <p className="font-body text-sm text-[#888880] mt-2">Selecție premium de vehicule verificate și garantate</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filter toggle (mobile) + results header */}
        <div ref={listTopRef} className="flex items-center justify-between mb-8 scroll-mt-24">
          <div ref={ref as React.RefObject<HTMLDivElement>}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-display text-xl text-[#F5F5F0]"
            >
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-[#888880]">
                  <Loader2 className="animate-spin" size={16} /> Se încarcă stocul...
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm">Nu s-au putut încărca mașinile.</p>
              ) : (
                <p><span className="text-[#B8962E]">{pagination?.total || listings.length}</span> mașini disponibile</p>
              )}
            </motion.div>
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-[#161616] border border-[rgba(184,150,46,0.2)] text-[#888880] font-body text-sm px-3 py-2 rounded-sm outline-none focus:border-[#B8962E] transition-colors hidden sm:block">
              <option>Preț crescător</option>
              <option>Preț descrescător</option>
              <option>An (nou→vechi)</option>
              <option>Kilometraj</option>
            </select>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 border border-[rgba(184,150,46,0.3)] text-[#F5F5F0] font-body text-sm px-4 py-2 rounded-sm hover:border-[#B8962E] transition-colors sm:hidden"
            >
              <SlidersHorizontal size={15} />
              Filtre
            </button>
          </div>
        </div>

        {/* Desktop filter bar */}
        <div className="hidden sm:flex flex-wrap gap-3 mb-8 p-4 bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm">
          {["BMW", "Mercedes", "Audi", "Volkswagen", "Volvo"].map((brand) => (
            <button key={brand} className="font-body text-xs px-3 py-1.5 border border-[rgba(184,150,46,0.2)] text-[#888880] rounded-sm hover:border-[#B8962E] hover:text-[#B8962E] transition-all">
              {brand}
            </button>
          ))}
          <div className="w-px bg-[rgba(184,150,46,0.2)] self-stretch" />
          {["Diesel", "Benzină", "Hybrid", "Electric"].map((fuel) => (
            <button key={fuel} className="font-body text-xs px-3 py-1.5 border border-[rgba(184,150,46,0.2)] text-[#888880] rounded-sm hover:border-[#B8962E] hover:text-[#B8962E] transition-all">
              {fuel}
            </button>
          ))}
          <button className="ml-auto btn-gold text-xs px-4 py-1.5 rounded-sm">Aplică Filtre</button>
        </div>

        {/* Cars grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-h-[400px]">
          {!loading && !error && listings.map((listing, i) => (
            <CarCard key={listing.id} listing={listing} delay={i * 0.07} />
          ))}
          
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-[#161616] border border-[rgba(184,150,46,0.1)] rounded-sm aspect-[16/14]" />
          ))}
        </div>

        {/* Pagination controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12 pb-10 border-t border-[rgba(184,150,46,0.1)] pt-10">
            <button
              onClick={() => handlePageChange((pagination.page - 1).toString())}
              disabled={pagination.page <= 1 || loading}
              className="btn-ghost px-6 py-2.5 rounded-sm text-sm disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              Pagina anterioară
            </button>
            
            <div className="font-body text-sm text-[#888880]">
              Pagina <span className="text-[#B8962E] font-semibold">{pagination.page}</span> din {pagination.totalPages}
            </div>

            <button
              onClick={() => handlePageChange((pagination.page + 1).toString())}
              disabled={pagination.page >= pagination.totalPages || loading}
              className="btn-gold px-6 py-2.5 rounded-sm text-sm disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              Pagina următoare
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="relative mt-auto bg-[#161616] border-t border-[rgba(184,150,46,0.2)] rounded-t-xl p-6 z-10 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl text-[#F5F5F0]">Filtre</h3>
              <button onClick={() => setFilterOpen(false)} className="text-[#888880] hover:text-[#F5F5F0]"><X size={20} /></button>
            </div>
            <div className="mb-5">
              <p className="font-label text-[#B8962E] text-xs tracking-widest mb-3">MARCĂ</p>
              <div className="flex flex-wrap gap-2">
                {["BMW", "Mercedes", "Audi", "Volkswagen", "Volvo"].map((b) => (
                  <button key={b} className="font-body text-sm px-3 py-2 border border-[rgba(184,150,46,0.2)] text-[#888880] rounded-sm hover:border-[#B8962E] hover:text-[#B8962E] transition-all min-h-[44px]">{b}</button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <p className="font-label text-[#B8962E] text-xs tracking-widest mb-3">COMBUSTIBIL</p>
              <div className="flex flex-wrap gap-2">
                {["Diesel", "Benzină", "Hybrid", "Electric"].map((f) => (
                  <button key={f} className="font-body text-sm px-3 py-2 border border-[rgba(184,150,46,0.2)] text-[#888880] rounded-sm hover:border-[#B8962E] hover:text-[#B8962E] transition-all min-h-[44px]">{f}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 btn-ghost py-3 rounded-sm text-sm">Resetează</button>
              <button onClick={() => setFilterOpen(false)} className="flex-1 btn-gold py-3 rounded-sm text-sm">Aplică</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
