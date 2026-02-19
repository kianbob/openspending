const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'public', 'data');
const states = JSON.parse(fs.readFileSync(path.join(dataDir, 'spending-by-state.json'), 'utf-8'));

// Sort by amount descending
states.sort((a, b) => b.amount - a.amount);

const totalSum = states.reduce((sum, s) => sum + s.amount, 0);

const stateDetails = {};
states.forEach((s, i) => {
  const slug = s.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
  stateDetails[s.code] = {
    name: s.name,
    code: s.code,
    slug,
    totalAmount: s.amount,
    rank: i + 1,
    pctOfTotal: Math.round((s.amount / totalSum) * 10000) / 100,
    perCapita: null,
  };
});

fs.writeFileSync(
  path.join(dataDir, 'state-details.json'),
  JSON.stringify(stateDetails, null, 2)
);

console.log(`Wrote ${Object.keys(stateDetails).length} states to state-details.json`);
console.log('\nSample entries:');
console.log('VA:', JSON.stringify(stateDetails['VA'], null, 2));
console.log('TX:', JSON.stringify(stateDetails['TX'], null, 2));
