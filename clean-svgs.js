import fs from 'fs';
import path from 'path';

// Folder containing your SVGs
const svgFolder = './public/svgs';

const tagsToRemove = ['metadata', 'title', 'desc'];
const commentRegex = /<!--[\s\S]*?-->/g;

fs.readdir(svgFolder, (err, files) => {
  if (err) return console.error('❌ Error reading directory:', err);

  files.forEach((file) => {
    if (path.extname(file) === '.svg') {
      const filePath = path.join(svgFolder, file);
      let svg = fs.readFileSync(filePath, 'utf-8');

      // Remove comments
      svg = svg.replace(commentRegex, '');

      // Remove specified tags
      tagsToRemove.forEach((tag) => {
        const tagRegex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
        svg = svg.replace(tagRegex, '');
      });

      fs.writeFileSync(filePath, svg, 'utf-8');
      console.log(`✅ Cleaned: ${file}`);
    }
  });
});
