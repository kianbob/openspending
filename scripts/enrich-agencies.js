const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'public', 'data');

const agencies = JSON.parse(fs.readFileSync(path.join(dataDir, 'agencies.json'), 'utf-8'));
const agencySpending = JSON.parse(fs.readFileSync(path.join(dataDir, 'agency-spending.json'), 'utf-8'));

// Build lookup from slug -> { contracts, grants }
const spendingBySlug = {};
for (const entry of agencySpending) {
  if (entry.slug) {
    spendingBySlug[entry.slug] = {
      contracts: entry.contracts || 0,
      grants: entry.grants || 0,
    };
  }
}

// Compute totalBudget as sum of all agency budgetAuthority
const totalBudget = agencies.reduce((sum, a) => sum + a.budgetAuthority, 0);

// Sort by budgetAuthority descending to assign ranks
const sorted = agencies
  .map((a, i) => ({ index: i, budget: a.budgetAuthority }))
  .sort((a, b) => b.budget - a.budget);

const rankMap = {};
sorted.forEach((item, rank) => {
  rankMap[item.index] = rank + 1;
});

// Title case helper
function toTitleCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Clean display name: title case, remove "Department Of" prefix
function makeDisplayName(name) {
  let display = toTitleCase(name);
  display = display.replace(/^Department Of /, '');
  // Also handle "U.s." -> "U.S." and similar edge cases
  display = display.replace(/\bU\.s\.\b/g, 'U.S.');
  return display;
}

const US_POPULATION = 335_000_000;

// Enrich each agency
const enriched = agencies.map((agency, i) => {
  const spending = spendingBySlug[agency.slug] || { contracts: 0, grants: 0 };
  const totalSpending = spending.contracts + spending.grants;

  const pctOfBudget = totalBudget > 0
    ? Math.round((agency.budgetAuthority / totalBudget) * 10000) / 100
    : 0;

  const pctContracts = totalSpending > 0
    ? Math.round((spending.contracts / totalSpending) * 10000) / 100
    : null;

  const costPerAmerican = Math.round((agency.budgetAuthority / US_POPULATION) * 100) / 100;

  return {
    ...agency,
    displayName: makeDisplayName(agency.name),
    pctOfBudget,
    pctContracts,
    costPerAmerican,
    rankBySpending: rankMap[i],
  };
});

fs.writeFileSync(
  path.join(dataDir, 'agencies.json'),
  JSON.stringify(enriched, null, 2) + '\n'
);

console.log(`Enriched ${enriched.length} agencies.`);
console.log(`Total budget: $${(totalBudget / 1e12).toFixed(2)}T`);
console.log(`Top 3 by rank:`);
enriched
  .filter((a) => a.rankBySpending <= 3)
  .sort((a, b) => a.rankBySpending - b.rankBySpending)
  .forEach((a) => {
    console.log(`  #${a.rankBySpending} ${a.displayName} — $${(a.budgetAuthority / 1e9).toFixed(1)}B — ${a.pctOfBudget}% of budget — $${a.costPerAmerican}/American`);
  });
