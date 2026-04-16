import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/PageLoader";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";

const Index = lazy(() => import("./pages/Index"));
const Stoc = lazy(() => import("./pages/Stoc"));
const ListingDetail = lazy(() => import("./pages/ListingDetail"));
const Finantare = lazy(() => import("./pages/Finantare"));
const Comanda = lazy(() => import("./pages/Comanda"));
const BuyBack = lazy(() => import("./pages/BuyBack"));
const Contact = lazy(() => import("./pages/Contact"));
const PoliticaConfidentialitate = lazy(() => import("./pages/PoliticaConfidentialitate"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));
const TermeniConditii = lazy(() => import("./pages/TermeniConditii"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </m.div>
    </AnimatePresence>
  );
}

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <CookieConsentProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <LazyMotion features={domAnimation}>
                <div className="flex flex-col min-h-screen bg-[#080808]">
                  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-[#B8962E] focus:text-[#080808] focus:p-3 focus:z-[100] font-bold">
                    Sari la conținut
                  </a>
                  <Navbar />
                  <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
                    <AnimatedRoutes />
                  </main>
                  <Footer />
                  <FloatingButtons />
                  <CookieBanner />
                </div>
              </LazyMotion>
            </BrowserRouter>
          </TooltipProvider>
        </CookieConsentProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
