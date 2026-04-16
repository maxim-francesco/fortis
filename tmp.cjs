const fs = require('fs');
let css = fs.readFileSync('src/fonts.css', 'utf-8');

const overrides = {
  'Cormorant Garamond': '\n  size-adjust: 95%;\n  ascent-override: 90%;\n  descent-override: 22%;\n  line-gap-override: 0%;',
  'DM Sans': '\n  size-adjust: 100%;\n  ascent-override: 100%;\n  descent-override: 25%;\n  line-gap-override: 0%;',
  'Bebas Neue': '\n  size-adjust: 90%;\n  ascent-override: 95%;\n  descent-override: 10%;\n  line-gap-override: 0%;'
};

// Remove existing overrides first
css = css.replace(/\s+size-adjust:.*?;/g, '');
css = css.replace(/\s+ascent-override:.*?;/g, '');
css = css.replace(/\s+descent-override:.*?;/g, '');
css = css.replace(/\s+line-gap-override:.*?;/g, '');

// Process blocks
css = css.replace(/(@font-face\s*\{[^}]+font-family:\s*['"]([^'"]+)['"][^}]*?)(})/g, (match, block, family, tail) => {
  if (overrides[family]) {
    return block.replace(/\s*$/, '') + overrides[family] + '\n}';
  }
  return match;
});

fs.writeFileSync('src/fonts.css', css);
console.log('Fonts updated successfully');
