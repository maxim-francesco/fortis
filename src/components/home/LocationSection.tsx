import { useState } from "react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export default function LocationSection() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding bg-[#080808] border-t border-[rgba(184,150,46,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <m.p
            ref={ref as React.RefObject<HTMLParagraphElement>}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-label text-[#B8962E] tracking-widest text-sm mb-2"
          >
            LOCAȚIE
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F0] mb-4"
          >
            Ne găsești în Cartierul Iris!
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#B0B0A8] max-w-2xl mx-auto"
          >
            Te așteptăm în parcul nostru auto de pe Strada Oașului 134a, Cluj-Napoca.
          </m.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Map Left */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-[#161616] border border-[rgba(184,150,46,0.15)] rounded-sm overflow-hidden relative"
            style={{ height: "450px" }}
          >
            {!mapLoaded ? (
              <div 
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer group bg-[#111] hover:bg-[#1a1a1a] transition-all"
                onClick={() => setMapLoaded(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setMapLoaded(true)}
                aria-label="Încarcă Google Maps"
              >
                <div className="w-16 h-16 bg-[rgba(184,150,46,0.1)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="text-[#B8962E]" size={32} />
                </div>
                <span className="font-display text-xl text-[#F5F5F0] mb-2">Apasă pentru Hartă</span>
                <span className="font-body text-sm text-[#B0B0A8]">Click pentru a încărca Google Maps</span>
              </div>
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.396342616854!2d23.60635397637841!3d46.7972749712497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490fb9ec2b4739%3A0x6c6e756531317537!2sStrada%20Oa%C8%99ului%20134A%2C%20Cluj-Napoca%20400000!5e0!3m2!1sen!2sro!4v1709230000000!5m2!1sen!2sro"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MEDFIL Automobile - Str. Oașului 134a, Cluj-Napoca"
              />
            )}
          </m.div>

          {/* Info Right */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="p-8 bg-[#111] border border-[rgba(184,150,46,0.2)] rounded-sm shadow-gold group hover:border-[rgba(184,150,46,0.4)] transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[rgba(184,150,46,0.1)] rounded-sm flex items-center justify-center">
                  <MapPin className="text-[#B8962E]" size={20} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[#F5F5F0]">Adresă</h3>
                </div>
              </div>
              <p className="font-body text-[#B0B0A8] mb-2 text-lg">Strada Oașului 134a</p>
              <p className="font-body text-[#B0B0A8] text-sm mb-1">Cartier Iris, Cluj-Napoca</p>
              <p className="font-body text-[#B0B0A8] text-sm">România</p>
            </div>

            <div className="p-8 bg-[#111] border border-[rgba(184,150,46,0.2)] rounded-sm shadow-gold group hover:border-[rgba(184,150,46,0.4)] transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[rgba(184,150,46,0.1)] rounded-sm flex items-center justify-center">
                  <Phone className="text-[#B8962E]" size={20} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[#F5F5F0]">Contact</h3>
                </div>
              </div>
              <a href="tel:0754299199" className="font-display text-2xl text-[#B8962E] hover:text-[#D4AF6A] transition-colors block mb-3">
                 0754 299 199
              </a>
              <p className="font-body text-[#B0B0A8] text-sm">Luni–Sâmbătă: 09:00–18:00</p>
              <p className="font-body text-[#B0B0A8] text-sm">Duminică: Închis</p>
            </div>

            <div className="pt-4">
              <Link to="/contact" className="btn-ghost inline-flex items-center gap-2 px-8 py-4 rounded-sm text-sm">
                Programează o vizionare <ArrowRight size={15} />
              </Link>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
