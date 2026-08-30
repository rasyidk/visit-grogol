const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'modules');

const fieldsToAdd = {
  kategori: ['name', 'description'],
  destinasi: ['title', 'excerpt', 'description', 'content'],
  banner: ['title', 'subtitle', 'ctaLabel'],
  berita: ['title', 'excerpt', 'content'],
  event: ['title', 'description', 'content'],
  galeriFoto: ['title', 'caption'],
  galeriVideo: ['title', 'description'],
  testimoni: ['role', 'message'],
  profil: ['siteName', 'tagline', 'about', 'vision', 'mission', 'history']
};

for (const [mod, fields] of Object.entries(fieldsToAdd)) {
  const routePath = path.join(modulesDir, mod, `${mod}.route.ts`);
  if (!fs.existsSync(routePath)) continue;

  let content = fs.readFileSync(routePath, 'utf8');

  // Add `zOptionalString` import if not present
  if (!content.includes('zOptionalString')) {
    content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]\.\.\/\.\.\/utils\/zodHelpers['"];/, (match, p1) => {
      // make sure we don't duplicate
      if (p1.includes('zOptionalString')) return match;
      return `import { ${p1.trim()}, zOptionalString } from '../../utils/zodHelpers';`;
    });
  }

  // Insert En fields into baseFields, createSchema, or updateSchema
  fields.forEach(field => {
    const regex = new RegExp(`(\\b${field}\\b\\s*:[^,]+,)`, 'g');
    content = content.replace(regex, `$1\n  ${field}En: zOptionalString,`);
  });
  
  if (mod === 'destinasi') {
    content = content.replace(/select: { id: true, name: true, slug: true }/g, 'select: { id: true, name: true, nameEn: true, slug: true }');
  }

  fs.writeFileSync(routePath, content, 'utf8');
  console.log(`Patched ${mod}.route.ts`);
}

const statsPath = path.join(modulesDir, 'stats', 'stats.route.ts');
if (fs.existsSync(statsPath)) {
  let statsContent = fs.readFileSync(statsPath, 'utf8');
  statsContent = statsContent.replace(/title: true,/g, 'title: true, titleEn: true,');
  fs.writeFileSync(statsPath, statsContent, 'utf8');
  console.log('Patched stats.route.ts');
}

console.log('Done patching routes.');
