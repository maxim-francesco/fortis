import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link } from "react-router-dom";
import { Calendar, Gauge, Fuel, Settings, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import carBmw from "@/assets/car-bmw.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import carAudi from "@/assets/car-audi.jpg";

const allCars = [
  { img: carBmw, badge: "RECOMANDAT", brand: "BMW", model: "Seria 5 530d M-Sport", year: "2021", km: "68.000", fuel: "Diesel", transmission: "Automată", price: "29.900", color: "Gri Grafit", body: "Berlină" },
  { img: carMercedes, badge: "NOU", brand: "Mercedes-Benz", model: "E 220d AMG Line", year: "2020", km: "72.000", fuel: "Diesel", transmission: "Automată", price: "34.500", color: "Negru Obsidian", body: "Berlină" },
  { img: carAudi, badge: "RECOMANDAT", brand: "Audi", model: "A6 50 TDI S-Line", year: "2022", km: "45.000", fuel: "Diesel", transmission: "Automată", price: "37.900", color: "Gri Quantum", body: "Berlină" },
  { img: carBmw, badge: "", brand: "BMW", model: "X5 xDrive40d", year: "2021", km: "55.000", fuel: "Diesel", transmission: "Automată", price: "52.900", color: "Albastru Mediteranean", body: "SUV" },
  { img: carMercedes, badge: "", brand: "Mercedes-Benz", model: "C 200d AMG", year: "2022", km: "38.000", fuel: "Diesel", transmission: "Automată", price: "28.900", color: "Argintiu", body: "Berlină" },
  { img: carAudi, badge: "NOU", brand: "Audi", model: "Q5 40 TDI Quattro", year: "2023", km: "22.000", fuel: "Diesel", transmission: "Automată", price: "44.900", color: "Gri Manhattan", body: "SUV" },
];

function CarCard({ car, delay }: { car: typeof allCars[0]; delay: number }) {
  const { ref, inView } = useInView(0.05);
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55 }}
      className="bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden group hover:-translate-y-1.5 hover:border-[rgba(184,150,46,0.45)] hover:shadow-[0_20px_60px_-15px_rgba(184,150,46,0.2)] transition-all duration-300"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img src={car.img} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {car.badge && (
            <span className="font-label text-[9px] tracking-widest bg-[#B8962E] text-[#080808] px-2 py-1">{car.badge}</span>
          )}
          <span className="font-label text-[9px] tracking-widest border border-[rgba(184,150,46,0.5)] text-[#B8962E] px-2 py-1 bg-[rgba(8,8,8,0.85)]">GARANȚIE 12 LUNI</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-[#F5F5F0] mb-1">
          {car.brand} <span className="font-light">{car.model}</span>
        </h3>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]"><Calendar size={10} />{car.year}</span>
          <span className="w-1 h-1 rounded-full bg-[rgba(136,136,128,0.4)]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]"><Gauge size={10} />{car.km} km</span>
          <span className="w-1 h-1 rounded-full bg-[rgba(136,136,128,0.4)]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]"><Fuel size={10} />{car.fuel}</span>
          <span className="w-1 h-1 rounded-full bg-[rgba(136,136,128,0.4)]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]"><Settings size={10} />{car.transmission}</span>
        </div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="font-display text-xl font-semibold text-[#B8962E]">€{car.price}</div>
            <div className="font-body text-[10px] text-[#888880]">Finanțare disponibilă</div>
          </div>
        </div>
        <Link to="#" className="block w-full text-center font-body text-xs font-medium border border-[rgba(184,150,46,0.3)] text-[#F5F5F0] py-2.5 rounded-sm hover:bg-[#B8962E] hover:text-[#080808] hover:border-[#B8962E] transition-all duration-300">
          Vezi Detalii
        </Link>
      </div>
    </motion.div>
  );
}

export default function Masini() {
  const [filterOpen, setFilterOpen] = useState(false);
  const { ref, inView } = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#080808]">
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
        <div className="flex items-center justify-between mb-8">
          <div ref={ref as React.RefObject<HTMLDivElement>}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-display text-xl text-[#F5F5F0]"
            >
              <span className="text-[#B8962E]">{allCars.length}</span> mașini disponibile
            </motion.p>
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allCars.map((car, i) => (
            <CarCard key={i} car={car} delay={i * 0.07} />
          ))}
        </div>
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
