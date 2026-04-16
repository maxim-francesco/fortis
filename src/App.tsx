import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Stoc from "./pages/Stoc";
import ListingDetail from "./pages/ListingDetail";
import Finantare from "./pages/Finantare";
import Comanda from "./pages/Comanda";
import BuyBack from "./pages/BuyBack";
import Contact from "./pages/Contact";
import PoliticaConfidentialitate from "./pages/PoliticaConfidentialitate";
import PoliticaCookies from "./pages/PoliticaCookies";
import TermeniConditii from "./pages/TermeniConditii";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/stoc" element={<Stoc />} />
          <Route path="/stoc/:id" element={<ListingDetail />} />
          <Route path="/finantare" element={<Finantare />} />
          <Route path="/comanda" element={<Comanda />} />
          <Route path="/buyback" element={<BuyBack />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/politica-de-confidentialitate" element={<PoliticaConfidentialitate />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />
          <Route path="/termeni-si-conditii" element={<TermeniConditii />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#080808]">
          <Navbar />
          <div className="flex-1">
            <AnimatedRoutes />
          </div>
          <Footer />
          <FloatingButtons />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
