const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = path.join(__dirname, '../src/assets/medfil2.jpg');
const OUTPUT_DIR = path.join(__dirname, '../public/images/logo');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const sizes = [
  { size: 64, suffix: '64' },
  { size: 128, suffix: '128' },
  { size: 256, suffix: '256' },
  { size: 512, suffix: '512' }
];

async function optimize() {
  for (const { size, suffix } of sizes) {
    // WebP
    await sharp(INPUT)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90 })
      .toFile(path.join(OUTPUT_DIR, `medfil-${suffix}.webp`));
    
    // PNG fallback
    await sharp(INPUT)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUTPUT_DIR, `medfil-${suffix}.png`));
  }
  console.log('✓ Logo optimizat în:', OUTPUT_DIR);
}

optimize().catch(console.error);
