export function getAutoDealerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "MEDFIL Automobile",
    "image": "https://medfil.ro/og-default.jpg",
    "@id": "https://medfil.ro",
    "url": "https://medfil.ro",
    "telephone": "+40754299199",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Strada Oașului 134a",
      "addressLocality": "Cluj-Napoca",
      "addressRegion": "Cluj",
      "postalCode": "400000",
      "addressCountry": "RO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.797274, 
      "longitude": 23.606353 
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": []
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MEDFIL AUTOMOBILE SRL",
    "legalName": "MEDFIL AUTOMOBILE SRL",
    "url": "https://medfil.ro",
    "logo": "https://medfil.ro/og-default.jpg",
    "telephone": "+40754299199",
    "vatID": "RO44290330",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Strada Oașului 134a",
      "addressLocality": "Cluj-Napoca",
      "addressRegion": "Cluj",
      "postalCode": "400000",
      "addressCountry": "RO"
    }
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MEDFIL Automobile",
    "url": "https://medfil.ro",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://medfil.ro/stoc?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function getVehicleSchema(listing: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": `${listing.marca} ${listing.model} ${listing.an}`,
    "brand": {
      "@type": "Brand",
      "name": listing.marca
    },
    "model": listing.model,
    "vehicleModelDate": listing.an?.toString(),
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": listing.km,
      "unitCode": "KMT"
    },
    "fuelType": listing.combustibil,
    "vehicleTransmission": listing.cutie,
    "color": listing.culoare || "Nespecificat",
    "offers": {
      "@type": "Offer",
      "price": listing.pret,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "@id": "https://medfil.ro"
      }
    }
  };
}

export function getFinancialProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Credit Auto TBI Bank",
    "provider": {
      "@type": "Organization",
      "name": "TBI Bank"
    },
    "interestRate": "7.9",
    "annualPercentageRate": "7.9"
  };
}

export function getServiceSchema(serviceName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "provider": {
      "@type": "AutoDealer",
      "@id": "https://medfil.ro"
    },
    "areaServed": "RO",
    "description": description
  };
}

export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "@id": "https://medfil.ro"
    }
  };
}
