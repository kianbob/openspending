import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'public', 'data');

// Copied from src/lib/format.ts — toTitleCase logic
const TITLE_CASE_PRESERVE = new Set([
  'LLC', 'DOD', 'USA', 'IBM', 'RTX', 'LP', 'LLP', 'PC', 'NA',
  'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'XI', 'XII',
  'U.S.', 'SAIC', 'IT',
  // US state abbreviations (2-letter)
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC', 'PR', 'VI', 'GU', 'AS', 'MP',
  // Common abbreviations used in grant recipient names
  'NYS', 'HHS', 'DEPT',
]);

const TITLE_CASE_REPLACE = {
  'INC': 'Inc.',
  'CORP': 'Corp.',
};

// Minor words that should be lowercase in titles (unless first word)
const MINOR_WORDS = new Set([
  'OF', 'AND', 'THE', 'FOR', 'IN', 'ON', 'AT', 'TO', 'BY', 'A', 'AN',
]);

function toTitleCase(str) {
  // For ALL-CAPS strings: full title-case conversion
  if (str.toUpperCase() === str && str.length > 3) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word, idx) => {
        const upper = word.toUpperCase();
        const stripped = upper.replace(/[.,]+$/g, '');
        const suffix = upper.slice(stripped.length);
        if (TITLE_CASE_PRESERVE.has(upper) || TITLE_CASE_PRESERVE.has(stripped)) return stripped + suffix;
        if (TITLE_CASE_REPLACE[stripped]) return TITLE_CASE_REPLACE[stripped];
        if (idx > 0 && MINOR_WORDS.has(stripped)) return word + suffix;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  // For already mixed-case strings: fix abbreviations and minor words
  return str
    .split(' ')
    .map((word, idx) => {
      const upper = word.toUpperCase();
      const stripped = upper.replace(/[.,]+$/g, '');
      const suffix = word.slice(stripped.length);
      // Fix abbreviations that got lowercased (e.g. "Nys" → "NYS", "Pa" → "PA", "Tx" → "TX")
      if (TITLE_CASE_PRESERVE.has(stripped)) return stripped + suffix;
      if (TITLE_CASE_REPLACE[stripped]) return TITLE_CASE_REPLACE[stripped];
      // Fix minor words that should be lowercase (e.g. "Of" → "of") unless first word
      if (idx > 0 && MINOR_WORDS.has(stripped)) return word.toLowerCase();
      return word;
    })
    .join(' ');
}

const files = [
  'top-grant-recipients.json',
  'top-grant-recipients-detailed.json',
];

for (const file of files) {
  const filePath = join(dataDir, file);
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  console.log(`\n--- ${file} ---`);
  let changed = 0;

  for (const entry of data) {
    if (entry.name) {
      const before = entry.name;
      const after = toTitleCase(before);
      if (before !== after) {
        if (changed < 5) {
          console.log(`  "${before}" → "${after}"`);
        }
        entry.name = after;
        changed++;
      }
    }
  }

  console.log(`  (${changed} names title-cased out of ${data.length} entries)`);
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

console.log('\nDone!');
