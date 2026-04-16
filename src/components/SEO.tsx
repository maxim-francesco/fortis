import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: Array<Record<string, any>>;
  noindex?: boolean;
}

export function SEO({
  title = "MEDFIL Automobile - Parc Auto Cluj-Napoca",
  description = "MEDFIL Automobile - Consultanță, BuyBack și Part-Exchange în Cluj-Napoca, str. Oașului 134a. Descoperă oferte transparente, evaluate corect, pentru autoturisme rulate.",
  canonical,
  ogImage = "/og-default.jpg",
  ogType = "website",
  structuredData = [],
  noindex = false
}: SEOProps) {
  
  const siteUrl = "https://medfil.ro";
  const canonicalUrl = canonical || (typeof window !== "undefined" ? window.location.href : siteUrl);
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="MEDFIL Automobile" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Data */}
      {structuredData.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData.length === 1 ? structuredData[0] : structuredData)}
        </script>
      )}
    </Helmet>
  );
}
