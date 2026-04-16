import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link } from "react-router-dom";
import { ArrowRight, Gauge, Calendar, Fuel, Loader2 } from "lucide-react";
import { searchListings } from "@/lib/api";

function CarCard({ listing, delay }: { listing: any; delay: number }) {
  const { ref, inView } = useInView(0.1);

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
  const km = listing.mileage ? listing.mileage.toLocaleString("ro-RO") : "N/A";
  const price = listing.price ? listing.price.toLocaleString("ro-RO") : "Contact";
  const imageUrl = listing.images?.[0]?.url || "https://picsum.photos/seed/car/600/400";

  return (
    <m.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="snap-item w-[80vw] sm:w-auto flex-shrink-0 sm:flex-shrink bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden group hover:-translate-y-1.5 hover:border-[rgba(184,150,46,0.45)] hover:shadow-[0_20px_60px_-15px_rgba(184,150,46,0.2)] transition-all duration-300"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3">
          <span className="font-label text-[10px] tracking-widest bg-[#B8962E] text-[#080808] px-2 py-1">
            RECOMANDAT
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="font-label text-[9px] tracking-widest border border-[rgba(184,150,46,0.5)] text-[#B8962E] px-2 py-1 bg-[rgba(8,8,8,0.8)]">
            GARANȚIE 12 LUNI
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-[#F5F5F0] mb-1 truncate">
          {listing.title}
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]">
            <Calendar size={11} />
            {year}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#888880]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]">
            <Gauge size={11} />
            {km} km
          </span>
          <span className="w-1 h-1 rounded-full bg-[#888880]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]">
            <Fuel size={11} />
            {fuel}
          </span>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="font-display text-2xl font-semibold text-[#B8962E]">
              €{price}
            </div>
            <div className="font-body text-[11px] text-[#888880]">Finanțare disponibilă</div>
          </div>
        </div>

        <Link
          to={`/stoc/${listing.id}`}
          className="block w-full text-center font-body text-sm font-medium border border-[rgba(184,150,46,0.3)] text-[#F5F5F0] py-2.5 rounded-sm hover:bg-[#B8962E] hover:text-[#080808] hover:border-[#B8962E] transition-all duration-300"
        >
          Vezi Detalii
        </Link>
      </div>
    </m.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#161616] border border-[rgba(184,150,46,0.1)] rounded-sm overflow-hidden aspect-[16/14] animate-pulse">
      <div className="w-full h-1/2 bg-[#222]" />
      <div className="p-5 space-y-4">
        <div className="h-6 w-3/4 bg-[#222] rounded" />
        <div className="h-4 w-1/2 bg-[#222] rounded" />
        <div className="h-10 w-full bg-[#222] rounded" />
      </div>
    </div>
  );
}

export default function FeaturedCars() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView(0.1);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const result = await searchListings({
          limit: '3',
          sortBy: 'newest',
        });
        setListings(result.data || []);
      } catch (err) {
        console.error("Failed to fetch featured listings", err);
        setError("Error fetching listings");
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  // Hide the section if there's an error or no results after loading
  if (!loading && (error || listings.length === 0)) {
    return null;
  }

  return (
    <section className="section-padding bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="flex items-end justify-between mb-10">
          <div>
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="font-label text-[#B8962E] tracking-widest text-sm mb-2"
            >
              SELECȚIE CURENTĂ
            </m.p>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-section-title text-[#F5F5F0]"
            >
              Stoc Recomandat
            </m.h2>
          </div>
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/stoc"
              className="hidden sm:flex items-center gap-2 font-body text-sm text-[#B8962E] hover:text-[#D4AF6A] transition-colors"
            >
              Vezi Toate <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>

        {/* Carousel mobile / Grid desktop */}
        <div className="snap-carousel sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            listings.map((listing, i) => (
              <CarCard key={listing.id} listing={listing} delay={i * 0.1} />
            ))
          )}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link to="/stoc" className="btn-ghost text-sm px-6 py-3 rounded-sm inline-flex items-center gap-2">
            Vezi Toate Mașinile <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}