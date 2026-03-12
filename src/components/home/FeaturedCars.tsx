import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link } from "react-router-dom";
import { ArrowRight, Gauge, Calendar, Fuel } from "lucide-react";
import carBmw from "@/assets/car-bmw.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import carAudi from "@/assets/car-audi.jpg";

const cars = [
  {
    img: carBmw,
    badge: "RECOMANDAT",
    brand: "BMW",
    model: "Seria 5 M-Sport",
    year: "2021",
    km: "68.000",
    fuel: "Diesel",
    price: "29.900",
    href: "/masini",
  },
  {
    img: carMercedes,
    badge: "NOU",
    brand: "Mercedes-Benz",
    model: "E 220d AMG Line",
    year: "2020",
    km: "72.000",
    fuel: "Diesel",
    price: "34.500",
    href: "/masini",
  },
  {
    img: carAudi,
    badge: "RECOMANDAT",
    brand: "Audi",
    model: "A6 S-Line",
    year: "2022",
    km: "45.000",
    fuel: "Diesel",
    price: "37.900",
    href: "/masini",
  },
];

function CarCard({ car, delay }: { car: typeof cars[0]; delay: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="snap-item w-[80vw] sm:w-auto flex-shrink-0 sm:flex-shrink bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden group hover:-translate-y-1.5 hover:border-[rgba(184,150,46,0.45)] hover:shadow-[0_20px_60px_-15px_rgba(184,150,46,0.2)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3">
          <span className="font-label text-[10px] tracking-widest bg-[#B8962E] text-[#080808] px-2 py-1">
            {car.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="font-label text-[9px] tracking-widest border border-[rgba(184,150,46,0.5)] text-[#B8962E] px-2 py-1 bg-[rgba(8,8,8,0.8)]">
            GARANȚIE 12 LUNI
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-[#F5F5F0] mb-1">
          {car.brand} <span className="font-light">{car.model}</span>
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]">
            <Calendar size={11} />
            {car.year}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#888880]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]">
            <Gauge size={11} />
            {car.km} km
          </span>
          <span className="w-1 h-1 rounded-full bg-[#888880]" />
          <span className="flex items-center gap-1 font-body text-xs text-[#888880]">
            <Fuel size={11} />
            {car.fuel}
          </span>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="font-display text-2xl font-semibold text-[#B8962E]">
              €{car.price}
            </div>
            <div className="font-body text-[11px] text-[#888880]">Finanțare disponibilă</div>
          </div>
        </div>

        <Link
          to={car.href}
          className="block w-full text-center font-body text-sm font-medium border border-[rgba(184,150,46,0.3)] text-[#F5F5F0] py-2.5 rounded-sm hover:bg-[#B8962E] hover:text-[#080808] hover:border-[#B8962E] transition-all duration-300"
        >
          Vezi Detalii
        </Link>
      </div>
    </motion.div>
  );
}

export default function FeaturedCars() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="flex items-end justify-between mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="font-label text-[#B8962E] tracking-widest text-sm mb-2"
            >
              SELECȚIE CURENTĂ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-section-title text-[#F5F5F0]"
            >
              Stoc Recomandat
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/masini"
              className="hidden sm:flex items-center gap-2 font-body text-sm text-[#B8962E] hover:text-[#D4AF6A] transition-colors"
            >
              Vezi Toate <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Carousel mobile / Grid desktop */}
        <div className="snap-carousel sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-4">
          {cars.map((car, i) => (
            <CarCard key={i} car={car} delay={i * 0.1} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link to="/masini" className="btn-ghost text-sm px-6 py-3 rounded-sm inline-flex items-center gap-2">
            Vezi Toate Mașinile <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
