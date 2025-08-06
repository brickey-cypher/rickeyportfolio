/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const synonymsPath = path.join(__dirname, '../../public/chatbot/utils/synonyms.json');

let synonymMap = {};
try {
  const raw = fs.readFileSync(synonymsPath, 'utf-8');
  synonymMap = JSON.parse(raw);
} catch (e) {
  console.error('Could not load synonyms.json:', e.message);
}

module.exports = synonymMap;
