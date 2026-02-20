const fs = require("fs");
const path = require("path");

// 2023 Census estimates (in actual population numbers)
const populations = {
  AL: 5108468,
  AK: 733406,
  AZ: 7431344,
  AR: 3067732,
  CA: 38965193,
  CO: 5877610,
  CT: 3617176,
  DE: 1031890,
  DC: 678972,
  FL: 22610726,
  GA: 11029227,
  HI: 1435138,
  ID: 1964726,
  IL: 12549689,
  IN: 6862199,
  IA: 3207004,
  KS: 2940546,
  KY: 4526154,
  LA: 4573749,
  ME: 1395722,
  MD: 6180253,
  MA: 7001399,
  MI: 10037261,
  MN: 5737915,
  MS: 2939690,
  MO: 6196156,
  MT: 1132812,
  NE: 1978379,
  NV: 3194176,
  NH: 1402054,
  NJ: 9290841,
  NM: 2114371,
  NY: 19571216,
  NC: 10835491,
  ND: 783926,
  OH: 11785935,
  OK: 4053824,
  OR: 4233358,
  PA: 12961683,
  RI: 1095962,
  SC: 5373555,
  SD: 919318,
  TN: 7126489,
  TX: 30503301,
  UT: 3417734,
  VT: 647464,
  VA: 8642274,
  WA: 7812880,
  WV: 1770071,
  WI: 5910955,
  WY: 584057,
  PR: 3205691,
  VI: 87146,
  GU: 153836,
  AS: 43895,
  MP: 47329,
};

const inputPath = path.join(__dirname, "../public/data/state-spending-detailed.json");
const outputPath = path.join(__dirname, "../public/data/state-spending-enriched.json");

const raw = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

// Filter out null entries
const states = raw.filter((s) => s.name && s.code);

// Calculate per capita
const enriched = states.map((s) => {
  const pop = populations[s.code];
  const per_capita = pop ? Math.round(s.amount / pop) : null;
  return { ...s, population: pop || null, per_capita };
});

// Sort by total amount descending and assign rank_total
enriched.sort((a, b) => b.amount - a.amount);
enriched.forEach((s, i) => {
  s.rank_total = i + 1;
});

// Sort by per_capita descending and assign rank_per_capita
const withPerCapita = enriched.filter((s) => s.per_capita !== null);
const withoutPerCapita = enriched.filter((s) => s.per_capita === null);

withPerCapita.sort((a, b) => b.per_capita - a.per_capita);
withPerCapita.forEach((s, i) => {
  s.rank_per_capita = i + 1;
});
withoutPerCapita.forEach((s) => {
  s.rank_per_capita = null;
});

// Combine and sort by total amount for final output
const result = [...withPerCapita, ...withoutPerCapita];
result.sort((a, b) => b.amount - a.amount);

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log(`Enriched ${result.length} states/territories.`);
console.log(`Output: ${outputPath}`);

// Show top 5 by per capita
console.log("\nTop 5 by per capita spending:");
const topPC = [...result].filter((s) => s.per_capita).sort((a, b) => b.per_capita - a.per_capita).slice(0, 5);
topPC.forEach((s) => {
  console.log(`  ${s.name} (${s.code}): $${s.per_capita.toLocaleString()} per capita`);
});
