import { Loader2 } from "lucide-react";
import { m } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808]">
      <m.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="w-8 h-8 text-[#B8962E] animate-spin" />
        <p className="font-label text-[10px] tracking-widest text-[#B0B0A8] uppercase">
          Se încarcă pagina...
        </p>
      </m.div>
    </div>
  );
}
