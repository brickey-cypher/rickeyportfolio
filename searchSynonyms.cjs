const fs = require('fs');
const path = require('path');

const searchTerm = 'synonyms.json';
const validExtensions = new Set(['.js', '.cjs', '.json', '.ts', '.jsx', '.tsx']);

function searchDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules or .git folders for speed and relevance
      if (file === 'node_modules' || file === '.git') continue;
      searchDir(fullPath);
    } else {
      if (!validExtensions.has(path.extname(file))) continue;
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.toLowerCase().includes(searchTerm)) {
          console.log(`Found in: ${fullPath}`);
        }
      } catch {
        // skip unreadable files
      }
    }
  }
}

searchDir(process.cwd());

