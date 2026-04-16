import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = "https://saas-platform-backend.onrender.com/public/listings/search?businessId=cmjt2601008sslj28uni4fwkj";
const DOMAIN = "https://medfil.ro";
const STATIC_ROUTES = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/stoc', priority: 0.9, changefreq: 'daily' },
  { url: '/finantare', priority: 0.8, changefreq: 'weekly' },
  { url: '/comanda', priority: 0.8, changefreq: 'weekly' },
  { url: '/buyback', priority: 0.8, changefreq: 'weekly' },
  { url: '/contact', priority: 0.8, changefreq: 'weekly' },
  { url: '/termeni-si-conditii', priority: 0.5, changefreq: 'monthly' },
  { url: '/politica-de-confidentialitate', priority: 0.5, changefreq: 'monthly' },
  { url: '/politica-cookies', priority: 0.5, changefreq: 'monthly' }
];

async function fetchListings() {
  return new Promise((resolve, reject) => {
    https.get(API_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.data || []);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function generateXmlItem(url, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${DOMAIN}${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function main() {
  console.log("Generating sitemap...");
  let sitemapEntries = STATIC_ROUTES.map(route => 
    generateXmlItem(route.url, new Date().toISOString(), route.changefreq, route.priority)
  );

  try {
    const listings = await fetchListings();
    console.log(`Fetched ${listings.length} dynamic listings.`);
    
    listings.forEach(listing => {
      const lastmod = listing.updatedAt ? new Date(listing.updatedAt).toISOString() : new Date().toISOString();
      sitemapEntries.push(generateXmlItem(`/stoc/${listing.id}`, lastmod, 'weekly', 0.6));
    });
  } catch (err) {
    console.error("Warning: Failed to fetch active listings. Generating static sitemap only.", err.message);
  }

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;

  const distDir = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(distDir)) {
    console.log("Creating dist dir...");
    fs.mkdirSync(distDir, { recursive: true });
  }

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  
  console.log("Sitemap generated successfully.");
}

main().catch(console.error);
