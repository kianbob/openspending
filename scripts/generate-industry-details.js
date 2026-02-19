const fs = require('fs');
const path = require('path');

const industries = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'top-industries.json'), 'utf-8')
);

const total = industries.reduce((sum, i) => sum + i.amount, 0);

const details = industries.map((industry, idx) => {
  const slug = `${industry.code}-${industry.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;

  return {
    code: industry.code,
    name: industry.name,
    slug,
    amount: industry.amount,
    rank: idx + 1,
    pctOfTotal: Math.round((industry.amount / total * 100) * 10) / 10,
  };
});

const outPath = path.join(__dirname, '..', 'public', 'data', 'industry-details.json');
fs.writeFileSync(outPath, JSON.stringify(details, null, 2));
console.log(`Wrote ${details.length} industries to ${outPath}`);
