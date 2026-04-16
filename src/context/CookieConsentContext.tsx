import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CookieCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

interface CookieConsentContextType {
  hasConsent: boolean;
  categories: CookieCategories;
  acceptAll: () => void;
  acceptNecessary: () => void;
  savePreferences: (categories: CookieCategories) => void;
  resetConsent: () => void;
}

const defaultCategories: CookieCategories = {
  necessary: true, // Always true
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false);
  const [categories, setCategories] = useState<CookieCategories>(defaultCategories);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie_consent_categories");
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setCategories(parsed);
        setHasConsent(true);
      } catch (e) {
        console.error("Failed to parse cookie consent");
      }
    }
  }, []);

  const saveAndSet = (newCategories: CookieCategories) => {
    setCategories(newCategories);
    setHasConsent(true);
    localStorage.setItem("cookie_consent_categories", JSON.stringify(newCategories));
  };

  const acceptAll = () => {
    saveAndSet({ necessary: true, analytics: true, marketing: true });
  };

  const acceptNecessary = () => {
    saveAndSet(defaultCategories);
  };

  const savePreferences = (prefs: CookieCategories) => {
    saveAndSet({ ...prefs, necessary: true });
  };

  const resetConsent = () => {
    setHasConsent(false);
    setCategories(defaultCategories);
    localStorage.removeItem("cookie_consent_categories");
  };

  return (
    <CookieConsentContext.Provider
      value={{
        hasConsent,
        categories,
        acceptAll,
        acceptNecessary,
        savePreferences,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
