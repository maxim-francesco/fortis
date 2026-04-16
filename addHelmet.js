const fs = require('fs');

const pages = {
  'Index.tsx': `    <Helmet>
      <title>Parc Auto Rulate Cluj | Garanție 12 luni | MEDFIL Automobile</title>
      <meta name="description" content="Parc auto MEDFIL în Cluj-Napoca, cartier Iris. Mașini rulate verificate cu istoric clar, garanție 12 luni motor+cutie, finanțare TBI Bank și servicii buy-back." />
      <link rel="canonical" href="https://medfil.ro/" />
    </Helmet>`,
  'Stoc.tsx': `    <Helmet>
      <title>Stoc Mașini de Vânzare Cluj | Prețuri Auto Rulate | MEDFIL</title>
      <meta name="description" content="Vezi stocul complet de mașini de vânzare la MEDFIL Cluj. Prețuri competitive, livrare națională, istoric verificat și garanție inclusă." />
      <link rel="canonical" href="https://medfil.ro/stoc" />
    </Helmet>`,
  'ListingDetail.tsx': `    {/* Optional Helmet placeholder, handled differently */}`,
  'Finantare.tsx': `    <Helmet>
      <title>Mașini în Rate Cluj | Leasing & Credit Auto Rulate | MEDFIL</title>
      <meta name="description" content="Cumpără mașini în rate de la MEDFIL Cluj. Finanțare TBI Bank, UniCredit și Mogo pentru mașini rulate, cu aprobare rapidă doar cu buletinul. Simulează rata!" />
    </Helmet>`,
  'Comanda.tsx': `    <Helmet>
      <title>Mașini la Comandă Cluj | Serviciu Concierge | MEDFIL Automobile</title>
      <meta name="description" content="Serviciu concierge MEDFIL pentru achiziția mașinii perfecte. Acces la rețea națională de furnizori, verificare completă și livrare la cheie în toată România." />
    </Helmet>`,
  'BuyBack.tsx': `    <Helmet>
      <title>BuyBack & Trade-In Cluj | Evaluare Auto | MEDFIL Automobile</title>
      <meta name="description" content="Evaluează-ți mașina online la MEDFIL și folosește-o ca avans pentru un nou automobil. Proces rapid, transparent și corect în Cluj-Napoca." />
    </Helmet>`,
  'Contact.tsx': `    <Helmet>
      <title>Contact | MEDFIL Automobile - Parc Auto Cluj Iris</title>
      <meta name="description" content="Contactează MEDFIL Automobile în Cluj-Napoca. Telefon: 0754 299 199. Programări, informații, consultanță gratuită. Str. Oașului 134a, cartier Iris." />
    </Helmet>`,
  'PoliticaConfidentialitate.tsx': `    <Helmet>
      <title>Politica de Confidențialitate | MEDFIL Automobile</title>
    </Helmet>`,
  'PoliticaCookies.tsx': `    <Helmet>
      <title>Politica de Cookies | MEDFIL Automobile</title>
    </Helmet>`,
  'TermeniConditii.tsx': `    <Helmet>
      <title>Termeni și Condiții | MEDFIL Automobile</title>
    </Helmet>`
};

for (const [file, helmetTags] of Object.entries(pages)) {
  const path = 'c:/Users/Francesco/Desktop/fortis/src/pages/' + file;
  if (!fs.existsSync(path)) continue;
  let code = fs.readFileSync(path, 'utf8');
  if (!code.includes('react-helmet-async')) {
    code = 'import { Helmet } from "react-helmet-async";\\n' + code;
  }
  
  if (!code.includes('<Helmet>') && !code.includes('Helmet placeholder')) {
    if (file === 'ListingDetail.tsx') {
      const listingHelmet = \`      <Helmet>
        <title>{listing ? \\\`\\\${listing.title} | MEDFIL Automobile Cluj\\\` : "Mașină | MEDFIL"}</title>
        <meta name="description" content={listing ? \\\`Cumpără \\\${listing.title} cu garanție 12 luni și finanțare în rate. Kilometri reali, verificare completă. Test drive în Cluj-Napoca, cartierul Iris.\\\` : ""} />
      </Helmet>\`;
      code = code.replace(/(<div className="min-h-screen[^>]*>)/i, "$1\\n" + listingHelmet);
    } else {
      code = code.replace(/(return\\s*\\(\\s*<div[^>]*>|return\\s*\\(\\s*<main[^>]*>|return\\s*\\(\\s*<section[^>]*>)/i, "$1\\n" + helmetTags);
    }
    fs.writeFileSync(path, code);
  }
}
