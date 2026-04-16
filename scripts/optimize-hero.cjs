const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = path.join(__dirname, '../src/assets/hero-car.jpg');
const OUTPUT_DIR = path.join(__dirname, '../public/images');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function optimize() {
  await sharp(INPUT)
    .resize(1920, 1080, { fit: 'cover' })
    .avif({ quality: 70 })
    .toFile(path.join(OUTPUT_DIR, 'hero-car.avif'));

  await sharp(INPUT)
    .resize(1920, 1080, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(path.join(OUTPUT_DIR, 'hero-car.webp'));

  // Variante mobile (720p)
  await sharp(INPUT)
    .resize(1280, 720, { fit: 'cover' })
    .avif({ quality: 70 })
    .toFile(path.join(OUTPUT_DIR, 'hero-car-mobile.avif'));

  console.log('✓ Hero Image optimizat!');
}

optimize().catch(console.error);
