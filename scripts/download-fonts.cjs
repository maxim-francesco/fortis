const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap';
const TARGET_DIR = path.join(__dirname, '../public/fonts');
const TARGET_CSS = path.join(__dirname, '../src/fonts.css');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

https.get(FONTS_URL, {
  headers: {
    // Chrome User Agent to force woff2
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  let cssData = '';
  res.on('data', chunk => cssData += chunk);
  res.on('end', () => {
    let fontIndex = 0;
    
    // Replace URL with local relative URLs
    const finalCss = cssData.replace(/url\((https:\/\/[^)]+)\)/g, (match, url) => {
      const extension = url.split('.').pop() || 'woff2';
      const fileName = `font-${fontIndex++}.${extension}`;
      const localFilePath = path.join(TARGET_DIR, fileName);
      
      console.log(`Downloading ${url} -> ${fileName}`);
      
      https.get(url, (fontRes) => {
        const fileStream = fs.createWriteStream(localFilePath);
        fontRes.pipe(fileStream);
      });

      return `url('/fonts/${fileName}')`;
    });

    fs.writeFileSync(TARGET_CSS, finalCss, 'utf-8');
    console.log('Fonts CSS generated at src/fonts.css');
  });
}).on('error', (e) => {
  console.error(e);
});
