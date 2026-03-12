import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import fortisLogo from "@/assets/fortis.png";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[rgba(184,150,46,0.2)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={fortisLogo} alt="Fortis Premium Auto" className="h-8 w-auto object-contain mb-6" />
            <p className="font-body text-sm text-[#888880] leading-relaxed mb-6">
              <em className="text-[#B8962E] not-italic font-display text-base">"Alegerea celor care știu."</em>
              <br />
              Dealer premium de mașini rulate, cu garanție și servicii complete.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center text-[#888880] hover:text-[#B8962E] hover:border-[#B8962E] transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <Instagram size={15} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center text-[#888880] hover:text-[#B8962E] hover:border-[#B8962E] transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-label text-[#F5F5F0] tracking-widest text-sm mb-5">NAVIGARE RAPIDĂ</h4>
            <ul className="space-y-3">
              {[
                { label: "Acasă", href: "/" },
                { label: "Mașinile Noastre", href: "/masini" },
                { label: "Finanțare", href: "/finantare" },
                { label: "Mașini la Comandă", href: "/la-comanda" },
                { label: "BuyBack", href: "/buyback" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href}
                    className="font-body text-sm text-[#888880] hover:text-[#D4AF6A] transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-4 h-px bg-[rgba(184,150,46,0.3)] group-hover:bg-[#B8962E] transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-label text-[#F5F5F0] tracking-widest text-sm mb-5">SERVICII</h4>
            <ul className="space-y-3">
              {[
                "Garanție 12 Luni Motor+Cutie",
                "Transport Gratuit la Domiciliu",
                "Rate cu Buletinul",
                "Numere Provizorii 30 Zile",
                "RAR la Cerere",
                "Consultanță Video",
              ].map((s) => (
                <li key={s} className="font-body text-sm text-[#888880] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#B8962E] flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-label text-[#F5F5F0] tracking-widest text-sm mb-5">CONTACT</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:0751489879"
                  className="flex items-center gap-3 font-body text-sm text-[#888880] hover:text-[#D4AF6A] transition-colors group">
                  <div className="w-8 h-8 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center group-hover:border-[#B8962E] transition-colors">
                    <Phone size={13} className="text-[#B8962E]" />
                  </div>
                  <div>
                    <div className="text-[#F5F5F0] font-medium">Gabriel — 0751-489-879</div>
                    <div className="text-xs">Luni–Sâmbătă: 09:00–19:00</div>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-[#888880]">
                <div className="w-8 h-8 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-[#B8962E]" />
                </div>
                <span>România</span>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-[#888880]">
                <div className="w-8 h-8 border border-[rgba(184,150,46,0.2)] rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-[#B8962E]" />
                </div>
                <span>CUI: 52925212</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(184,150,46,0.12)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-[#888880]">
            © 2025 Fortis Premium Auto | CUI: 52925212
          </p>
          <div className="flex items-center gap-6">
            <Link to="/politica-confidentialitate"
              className="font-body text-xs text-[#888880] hover:text-[#B8962E] transition-colors">
              Politică Confidențialitate
            </Link>
            <Link to="/termeni"
              className="font-body text-xs text-[#888880] hover:text-[#B8962E] transition-colors">
              Termeni și Condiții
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}