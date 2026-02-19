const fs = require("fs");
const path = require("path");

const API_URL =
  "https://api.usaspending.gov/api/v2/search/spending_by_category/recipient/";
const DELAY_MS = 300;
const TOP_N = 20;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchStateContractors(stateCode) {
  const body = {
    filters: {
      time_period: [
        { start_date: "2024-10-01", end_date: "2025-09-30" },
      ],
      place_of_performance_locations: [
        { country: "USA", state: stateCode },
      ],
    },
    category: "recipient",
    limit: 10,
    page: 1,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return (data.results || []).map((r) => ({
    name: r.name,
    amount: r.amount,
  }));
}

async function main() {
  const statesPath = path.join(
    __dirname,
    "..",
    "public",
    "data",
    "spending-by-state.json"
  );
  const states = JSON.parse(fs.readFileSync(statesPath, "utf-8"));
  const top20 = states.slice(0, TOP_N);

  console.log(`Fetching top contractors for ${top20.length} states...\n`);

  const result = {};

  for (let i = 0; i < top20.length; i++) {
    const { code, name } = top20[i];
    process.stdout.write(
      `[${i + 1}/${top20.length}] ${name} (${code})... `
    );

    try {
      const contractors = await fetchStateContractors(code);
      result[code] = contractors;
      console.log(
        `OK — ${contractors.length} recipients (top: ${contractors[0]?.name || "N/A"})`
      );
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      result[code] = [];
    }

    if (i < top20.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  const outPath = path.join(
    __dirname,
    "..",
    "public",
    "data",
    "state-contractors.json"
  );
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log(`\nSaved to ${outPath}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
