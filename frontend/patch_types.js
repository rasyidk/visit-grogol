const fs = require('fs');
const path = require('path');

const typesPath = path.join(__dirname, 'src', 'lib', 'types.ts');
let content = fs.readFileSync(typesPath, 'utf8');

const patches = [
  { mod: 'Kategori', fields: ['name', 'description'] },
  { mod: 'Destinasi', fields: ['title', 'excerpt', 'description', 'content'] },
  { mod: 'Banner', fields: ['title', 'subtitle', 'ctaLabel'] },
  { mod: 'Berita', fields: ['title', 'excerpt', 'content'] },
  { mod: 'EventItem', fields: ['title', 'description', 'content'] },
  { mod: 'GaleriFoto', fields: ['title', 'caption'] },
  { mod: 'GaleriVideo', fields: ['title', 'description'] },
  { mod: 'Testimoni', fields: ['role', 'message'] },
  { mod: 'ProfilWebsite', fields: ['siteName', 'tagline', 'about', 'vision', 'mission', 'history'] }
];

patches.forEach(({ mod, fields }) => {
  // We look for the interface block
  const interfaceRegex = new RegExp(`export interface ${mod} \\{([\\s\\S]*?)\\}`, 'm');
  const match = content.match(interfaceRegex);
  if (match) {
    let block = match[1];
    fields.forEach(field => {
      // e.g. "title: string;" or "excerpt?: string | null;"
      const fieldRegex = new RegExp(`(\\b${field}\\b[?]?:\\s*[^;]+;)`, 'g');
      block = block.replace(fieldRegex, `$1\n  ${field}En?: string | null;`);
    });
    content = content.replace(interfaceRegex, `export interface ${mod} {${block}}`);
  }
});

// also for DashboardStats topDestinasi
content = content.replace(/'title'/g, "'title' | 'titleEn'");
// also for upcomingEvents
content = content.replace(/'title'/g, "'title' | 'titleEn'"); // wait, first one replaces all if I use /g, wait, /'title'/g replaces all 'title' with 'title' | 'titleEn', which works!

fs.writeFileSync(typesPath, content, 'utf8');
console.log('Patched types.ts');
