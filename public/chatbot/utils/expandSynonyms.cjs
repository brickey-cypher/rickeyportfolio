// expandSynonyms.js
const fs = require("fs");
const path = require("path");

// === CONFIGURATION ===

// Path to your existing custom synonyms
const inputPath = path.resolve(__dirname, "synonyms.json");

// Path where the expanded synonyms will be written
const outputPath = path.resolve(__dirname, "synonyms.expanded.json");

// Basic manual synonym expansion list (more can be added here)
const extraSynonyms = {
  "frontend": ["front-end", "UI", "user interface"],
  "backend": ["back-end", "server-side", "API layer"],
  "database": ["data store", "SQL", "PostgreSQL", "DB"],
  "cybersecurity": ["infosec", "security", "network security"],
  "JavaScript": ["js", "vanilla js", "javascript"],
  "resume": ["cv", "curriculum vitae", "resumé"],
  "soft skills": ["communication", "teamwork", "time management"],
  "hard skills": ["technical skills", "programming", "tech stack"],
  "Node.js": ["node", "nodejs", "server runtime"],
  "React": ["reactjs", "react.js", "react framework"],
  "skills": ["experience", "abilities", "competencies"]
};

// === LOGIC ===

function expandSynonyms(original) {
  const expanded = {};

  for (const [key, values] of Object.entries(original)) {
    const normalizedKey = key.toLowerCase();
    expanded[normalizedKey] = new Set([normalizedKey, ...values.map(v => v.toLowerCase())]);

    // Merge in extra terms if available
    if (extraSynonyms[normalizedKey]) {
      extraSynonyms[normalizedKey].forEach(syn => expanded[normalizedKey].add(syn.toLowerCase()));
    }
  }

  // Convert sets to arrays
  const finalOutput = {};
  for (const key in expanded) {
    finalOutput[key] = Array.from(expanded[key]);
  }

  return finalOutput;
}

// === EXECUTE ===

function main() {
  if (!fs.existsSync(inputPath)) {
    console.error("Missing input file at:", inputPath);
    return;
  }

  const raw = fs.readFileSync(inputPath, "utf-8");
  const original = JSON.parse(raw);
  const expanded = expandSynonyms(original);

  fs.writeFileSync(outputPath, JSON.stringify(expanded, null, 2));
  console.log(`✅ Expanded synonyms written to:\n${outputPath}`);
}

main();

