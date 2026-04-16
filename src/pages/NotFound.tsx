import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="404 - Pagina nu a fost găsită | MEDFIL Automobile" 
        noindex={true} 
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center bg-[#0E0E0E] p-10 border border-[rgba(184,150,46,0.3)] rounded-sm shadow-gold">
          <m.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-6xl font-display text-[#B8962E]"
          >
            404
          </m.h1>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-xl font-body text-[#B0B0A8]"
          >
            Această pagină nu există sau a fost mutată.
          </m.p>
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/stoc" className="btn-gold py-3 px-6 rounded-sm text-sm">
              Vezi Stocul Auto
            </Link>
            <Link to="/contact" className="btn-ghost py-3 px-6 rounded-sm text-sm">
              Contactează-ne
            </Link>
          </m.div>
        </div>
    </div>
    </>
  );
};

export default NotFound;
