const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "public", "data");

const contractors = JSON.parse(
  fs.readFileSync(path.join(dataDir, "top-contractors-deduped.json"), "utf-8")
);
const agencyContractors = JSON.parse(
  fs.readFileSync(path.join(dataDir, "agency-contractors.json"), "utf-8")
);

// Top 10 contractors share
const top10 = contractors.slice(0, 10).map((c) => ({
  name: c.name,
  amount: c.amount,
  pctOfTotal: c.pctOfAllContracts,
}));

const top10PctTotal = parseFloat(
  top10.reduce((sum, c) => sum + c.pctOfTotal, 0).toFixed(2)
);

// HHI: sum of squared market shares for ALL contractors
const hhiIndex = parseFloat(
  contractors
    .reduce((sum, c) => sum + c.pctOfAllContracts ** 2, 0)
    .toFixed(2)
);

let hhiInterpretation;
if (hhiIndex >= 2500) {
  hhiInterpretation = "Highly concentrated market (HHI >= 2500)";
} else if (hhiIndex >= 1500) {
  hhiInterpretation = "Moderately concentrated market (HHI 1500-2500)";
} else {
  hhiInterpretation = "Unconcentrated market (HHI < 1500)";
}

// By agency
const byAgency = {};

for (const [agencySlug, agencyList] of Object.entries(agencyContractors)) {
  // Deduplicate by contractor name within each agency (sum amounts)
  const merged = {};
  for (const c of agencyList) {
    if (merged[c.name]) {
      merged[c.name].amount += c.amount;
    } else {
      merged[c.name] = { name: c.name, amount: c.amount };
    }
  }

  const sorted = Object.values(merged).sort((a, b) => b.amount - a.amount);
  const totalContractSpending = sorted.reduce((s, c) => s + c.amount, 0);

  const top5 = sorted.slice(0, 5).map((c) => ({
    name: c.name,
    amount: c.amount,
    pct: parseFloat(((c.amount / totalContractSpending) * 100).toFixed(2)),
  }));

  const top5ConcentrationPct = parseFloat(
    top5.reduce((s, c) => s + c.pct, 0).toFixed(2)
  );

  const agencyName = agencySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  byAgency[agencySlug] = {
    agencyName,
    top5Contractors: top5,
    top5ConcentrationPct,
    totalContractSpending,
  };
}

const result = {
  topContractorsShare: top10,
  top10PctTotal,
  hhiIndex,
  hhiInterpretation,
  byAgency,
};

fs.writeFileSync(
  path.join(dataDir, "contractor-concentration.json"),
  JSON.stringify(result, null, 2)
);

console.log("Generated contractor-concentration.json");
console.log(`  Top 10 share: ${top10PctTotal}%`);
console.log(`  HHI Index: ${hhiIndex} — ${hhiInterpretation}`);
console.log(`  Agencies analyzed: ${Object.keys(byAgency).length}`);
