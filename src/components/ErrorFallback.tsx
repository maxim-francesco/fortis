import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#080808]">
      <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="text-red-500" size={32} />
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5F5F0] mb-3">
        Oops! A apărut o problemă.
      </h1>
      <p className="font-body text-[#B0B0A8] max-w-md mx-auto mb-6">
        Ne cerem scuze, platforma a întâmpinat o eroare temporară (Eroare internă). Dacă problema persistă, te rugăm să ne contactezi telefonic.
      </p>
      
      {/* Dev-only message for fast debugging */}
      {process.env.NODE_ENV === "development" && (
        <pre className="text-left bg-[#111] border border-red-500/20 text-red-400 p-4 rounded-sm w-full max-w-2xl overflow-auto text-xs font-mono mb-8">
          {error.message}
        </pre>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-2">
        <button
          onClick={resetErrorBoundary}
          className="btn-gold py-3 px-8 rounded-sm text-sm font-semibold flex items-center gap-2"
        >
          <RefreshCw size={16} /> Reîncărcați Pagina
        </button>
        <a 
          href="/" 
          className="btn-ghost py-3 px-8 rounded-sm text-sm font-semibold flex items-center gap-2"
          onClick={() => {
            // Force fully reload on Home
            window.location.href = '/';
          }}
        >
          <Home size={16} /> Mergi la Acasă
        </a>
      </div>
    </div>
  );
}
