const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'public', 'data');
const TAXPAYERS = 161_000_000;

const CATEGORIES = {
  Defense: [
    'lockheed martin', 'boeing', 'raytheon', 'northrop grumman',
    'general dynamics', 'bae systems', 'l3harris', 'electric boat'
  ],
  'IT/Consulting': [
    'booz allen hamilton', 'saic', 'leidos', 'deloitte',
    'accenture', 'cgi', 'perspecta', 'caci'
  ],
  Healthcare: [
    'humana', 'mckesson', 'centene', 'unitedhealth', 'optum', 'cvs'
  ],
  Energy: ['bechtel', 'fluor', 'aecom']
};

function classify(name) {
  const lower = name.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(kw => lower.includes(kw))) return category;
  }
  return 'Other';
}

// Read files
const dedupedPath = path.join(DATA_DIR, 'top-contractors-deduped.json');
const detailsPath = path.join(DATA_DIR, 'contractor-details.json');

const deduped = JSON.parse(fs.readFileSync(dedupedPath, 'utf-8'));
const details = JSON.parse(fs.readFileSync(detailsPath, 'utf-8'));

// Compute total contracts from deduped list
const totalContracts = deduped.reduce((sum, c) => sum + c.amount, 0);
console.log(`Total contracts: $${(totalContracts / 1e9).toFixed(1)}B from ${deduped.length} contractors`);

// Enrich deduped list
for (const contractor of deduped) {
  contractor.pctOfAllContracts = Math.round((contractor.amount / totalContracts) * 100 * 100) / 100;
  contractor.costPerTaxpayer = Math.round((contractor.amount / TAXPAYERS) * 100) / 100;
  contractor.category = classify(contractor.name);
}

// Enrich details (keyed by slug)
for (const [slug, contractor] of Object.entries(details)) {
  contractor.pctOfAllContracts = Math.round((contractor.totalAmount / totalContracts) * 100 * 100) / 100;
  contractor.costPerTaxpayer = Math.round((contractor.totalAmount / TAXPAYERS) * 100) / 100;
  contractor.category = classify(contractor.name);
}

// Save
fs.writeFileSync(dedupedPath, JSON.stringify(deduped, null, 2) + '\n');
fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2) + '\n');

// Summary
const cats = {};
for (const c of deduped) {
  cats[c.category] = (cats[c.category] || 0) + 1;
}
console.log('Categories:', cats);
console.log(`Enriched ${deduped.length} deduped + ${Object.keys(details).length} detail entries`);
