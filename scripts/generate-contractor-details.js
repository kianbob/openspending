const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'public', 'data');

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/g, '');
}

// Load all input files
const dedupedContractors = readJSON('top-contractors-deduped.json');
const originalContractors = readJSON('top-contractors.json');
const contractorTrends = readJSON('contractor-trends.json');
const agencyContractors = readJSON('agency-contractors.json');
const topAwards = readJSON('top-awards.json');

// --- Step 1: Log structure of each file ---
console.log('=== top-contractors-deduped.json (first entry) ===');
console.log(JSON.stringify(dedupedContractors[0], null, 2));
console.log('\n=== top-contractors.json (first entry) ===');
console.log(JSON.stringify(originalContractors[0], null, 2));
console.log('\n=== contractor-trends.json (first entry) ===');
console.log(JSON.stringify(contractorTrends[0], null, 2));
console.log('\n=== agency-contractors.json (keys + first agency first entry) ===');
const agencyKeys = Object.keys(agencyContractors);
console.log('Agency slugs:', agencyKeys);
console.log('First entry of first agency:', JSON.stringify(agencyContractors[agencyKeys[0]][0], null, 2));
console.log('\n=== top-awards.json (first entry) ===');
console.log(JSON.stringify(topAwards[0], null, 2));

// --- Step 2: Build subsidiary name lists from original contractors ---
// Group original entries by name to find all UEI variants
const nameToEntries = {};
for (const c of originalContractors) {
  if (!nameToEntries[c.name]) nameToEntries[c.name] = [];
  nameToEntries[c.name].push(c);
}

// For each deduped contractor, figure out which original names belong to it.
// LOCKHEED MARTIN CORPORATION (subsidiaries: 6) = 4x "LOCKHEED MARTIN CORPORATION" + 2x "LOCKHEED MARTIN CORP"
// We match by checking if the deduped name is a prefix of or equal to the original name.
// More precisely: group by slug prefix to catch "LOCKHEED MARTIN CORP" → "LOCKHEED MARTIN CORPORATION".
// Actually, looking at the data: the deduped file already summed amounts for related entities.
// The subsidiary count = total UEI entries that were merged.
// We need to find which original names were merged into each deduped entry.
// Strategy: for each deduped entry, find original entries whose name starts with the deduped entry's
// name (minus trailing variations) OR whose deduped entry's name starts with the original name.

function buildSubsidiaryNames(dedupedName, subsidiaryCount) {
  const names = new Set();
  names.add(dedupedName);

  if (subsidiaryCount <= 1) return Array.from(names);

  // Find original names that are close matches
  const dedupedLower = dedupedName.toLowerCase();
  for (const origName of Object.keys(nameToEntries)) {
    const origLower = origName.toLowerCase();
    if (origLower === dedupedLower) continue;
    // Check if one is a prefix/substring of the other
    if (dedupedLower.startsWith(origLower) || origLower.startsWith(dedupedLower)) {
      names.add(origName);
    }
  }

  return Array.from(names);
}

// --- Step 3: Build trend lookup ---
const trendLookup = {};
for (const t of contractorTrends) {
  trendLookup[t.name.toLowerCase()] = t;
}

// --- Step 4: Compute total of all contractor amounts for pctOfTotal ---
const totalAllContractors = dedupedContractors.reduce((sum, c) => sum + c.amount, 0);
console.log(`\nTotal of all deduped contractor amounts: $${(totalAllContractors / 1e9).toFixed(1)}B`);

// Prettify agency slug to name
function agencySlugToName(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// --- Step 5: Build per-contractor details ---
const contractorDetails = {};

for (let i = 0; i < dedupedContractors.length; i++) {
  const c = dedupedContractors[i];
  const slug = slugify(c.name);
  const rank = i + 1;
  const subsidiaryNames = buildSubsidiaryNames(c.name, c.subsidiaries);
  const subsidiaryNamesLower = subsidiaryNames.map(n => n.toLowerCase());

  // Agency breakdown: iterate agency-contractors, match contractor names
  const agencies = [];
  for (const [agencySlug, contractors] of Object.entries(agencyContractors)) {
    let agencyTotal = 0;
    for (const ac of contractors) {
      const acLower = ac.name.toLowerCase();
      if (subsidiaryNamesLower.some(sn => acLower === sn || acLower.startsWith(sn) || sn.startsWith(acLower))) {
        agencyTotal += ac.amount;
      }
    }
    if (agencyTotal > 0) {
      agencies.push({
        name: agencySlugToName(agencySlug),
        slug: agencySlug,
        amount: agencyTotal,
      });
    }
  }
  agencies.sort((a, b) => b.amount - a.amount);

  // Trends: match by name (check all subsidiary names)
  let trends = [];
  for (const sn of subsidiaryNamesLower) {
    if (trendLookup[sn]) {
      const t = trendLookup[sn];
      trends = Object.entries(t.years)
        .map(([fy, amount]) => ({ fy: parseInt(fy), amount }))
        .sort((a, b) => a.fy - b.fy);
      break;
    }
  }

  // Top contracts: filter top-awards by recipient name matching
  const topContracts = topAwards
    .filter(a => {
      const recipLower = a.recipient.toLowerCase();
      return subsidiaryNamesLower.some(sn =>
        recipLower.includes(sn) || sn.includes(recipLower)
      );
    })
    .map(a => ({
      description: a.description,
      amount: a.amount,
      agency: a.agency,
    }))
    .sort((a, b) => b.amount - a.amount);

  // pctOfTotal
  const pctOfTotal = Math.round((c.amount / totalAllContractors) * 10000) / 100;

  contractorDetails[slug] = {
    name: c.name,
    slug,
    totalAmount: c.amount,
    rank,
    subsidiaries: subsidiaryNames,
    agencies,
    trends,
    topContracts,
    pctOfTotal,
  };
}

// --- Step 6: Write output ---
const outputPath = path.join(DATA_DIR, 'contractor-details.json');
fs.writeFileSync(outputPath, JSON.stringify(contractorDetails, null, 2));

console.log(`\nWrote ${Object.keys(contractorDetails).length} contractor details to ${outputPath}`);

// Print a summary of a few entries
const sampleSlugs = ['lockheed-martin-corporation', 'optum-public-sector-solutions-inc', 'space-exploration-technologies-corp'];
for (const s of sampleSlugs) {
  const d = contractorDetails[s];
  if (d) {
    console.log(`\n--- ${d.name} (rank #${d.rank}) ---`);
    console.log(`  Total: $${(d.totalAmount / 1e9).toFixed(2)}B | ${d.pctOfTotal}% of total`);
    console.log(`  Subsidiaries: ${d.subsidiaries.join(', ')}`);
    console.log(`  Agencies: ${d.agencies.map(a => `${a.name} ($${(a.amount / 1e9).toFixed(2)}B)`).join(', ')}`);
    console.log(`  Trends: ${d.trends.length} years`);
    console.log(`  Top contracts: ${d.topContracts.length}`);
  }
}
