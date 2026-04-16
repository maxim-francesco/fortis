import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Convert <motion.xxx> to <m.xxx>
  if (content.includes('<motion.')) {
    content = content.replace(/<motion\./g, '<m.');
    content = content.replace(/<\/motion\./g, '</m.');
    changed = true;
  }

  // 2. Adjust import
  // Replaces: import { motion, ... } from "framer-motion";
  // To: import { m, ... } from "framer-motion";
  // (Assuming typical imports)
  if (changed && content.includes('from "framer-motion"') || content.includes("from 'framer-motion'")) {
    const importRegex = /import\s+{([^}]+)}\s+from\s+["']framer-motion["']/g;
    content = content.replace(importRegex, (match, imports) => {
      let parts = imports.split(',').map(s => s.trim());
      if (parts.includes('motion') && !parts.includes('m')) {
        parts = parts.map(p => p === 'motion' ? 'm' : p);
        return `import { ${parts.join(', ')} } from "framer-motion"`;
      }
      return match;
    });
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

const rootDir = path.join(process.cwd(), 'src');
walkDir(rootDir, processFile);
console.log('✅ Framer motion imports replaced successfully.');
