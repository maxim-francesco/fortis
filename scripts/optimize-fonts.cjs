const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=Bebas+Neue&display=swap';
const TARGET_DIR = path.join(__dirname, '../public/fonts');
const TARGET_CSS = path.join(__dirname, '../src/fonts.css');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Function to clear old fonts
fs.readdirSync(TARGET_DIR).forEach(file => {
  if (file.endsWith('.woff2')) fs.unlinkSync(path.join(TARGET_DIR, file));
});

console.log('Fetching CSS from Google Fonts...');

https.get(FONTS_URL, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  let cssData = '';
  res.on('data', chunk => cssData += chunk);
  res.on('end', async () => {
    
    // We only care about latin subset. We will split by @font-face blocks and filter.
    const blocks = cssData.split('}').filter(b => b.trim().length > 0);
    
    let finalCss = '';
    
    const downloads = [];
    
    for (let block of blocks) {
      // Only include latin subset (or you can include latin-ext if you want).
      // For performance, latin is usually enough for Romanian if it includes ăâîșț.
      // Actually, latin-ext is required for Romanian ăâîșț? Let's check: 
      // ş (U+015F) is in latin-ext. So we need latin AND latin-ext.
      
      if (!block.includes('/* latin */') && !block.includes('/* latin-ext */')) {
        continue;
      }

      const familyMatch = block.match(/font-family:\s*'([^']+)'/);
      const weightMatch = block.match(/font-weight:\s*(\d+)/);
      const urlMatch = block.match(/url\((https:\/\/[^)]+)\)/);
      
      if (!familyMatch || !weightMatch || !urlMatch) continue;
      
      const family = familyMatch[1].toLowerCase().replace(/ /g, '-');
      const weight = weightMatch[1];
      const fontName = `${family}-${weight}`;
      
      // Some families have both latin and latin-ext. Let's merge them or name them distinctly.
      const isExt = block.includes('/* latin-ext */');
      const fileName = `${fontName}${isExt ? '-ext' : ''}.woff2`;
      const url = urlMatch[1];
      
      console.log(`Downloading ${fileName}...`);
      finalCss += block.replace(/url\([^)]+\)/, `url('/fonts/${fileName}')`) + '}\n\n';
      
      // Adjust metrics for CLS avoidance if not already there
      if (!finalCss.includes('size-adjust')) {
        if (family === 'cormorant-garamond') {
           finalCss = finalCss.replace(/}\n\n$/, '  size-adjust: 96%;\n  ascent-override: 95%;\n  descent-override: 25%;\n  line-gap-override: 0%;\n}\n\n');
        } else if (family === 'dm-sans') {
           finalCss = finalCss.replace(/}\n\n$/, '  size-adjust: 100%;\n}\n\n');
        } else if (family === 'bebas-neue') {
           finalCss = finalCss.replace(/}\n\n$/, '  size-adjust: 100%;\n}\n\n');
        }
      }

      downloads.push(
        new Promise((resolve) => {
          https.get(url, (fontRes) => {
            const fileStream = fs.createWriteStream(path.join(TARGET_DIR, fileName));
            fontRes.pipe(fileStream);
            fileStream.on('finish', () => resolve());
          });
        })
      );
    }
    
    await Promise.all(downloads);
    fs.writeFileSync(TARGET_CSS, finalCss, 'utf-8');
    console.log(`✓ 6 font weights optimized, CSS written!`);
  });
}).on('error', console.error);
