const BASE_URL = "https://www.openspending.us";

const items = [
  {
    path: "/spending-analysis",
    title: "Where Does $11.2 Trillion Actually Go?",
    description:
      "A comprehensive breakdown of the federal budget — mandatory vs discretionary spending, top agencies, contracts vs grants, and what it means per taxpayer.",
  },
  {
    path: "/top-10",
    title: "The 10 Companies That Run the Government",
    description:
      "Just 10 companies receive $145 billion — 18.7% of all federal contracts. Who they are, what they do, and why this concentration persists.",
  },
  {
    path: "/pentagon-spending",
    title: "The Pentagon: $1.4 Trillion and Counting",
    description:
      "Deep dive into Department of Defense spending — budget trajectory, top contractors, the F-35 cost explosion, and why DOD has never passed an audit.",
  },
  {
    path: "/healthcare-spending",
    title: "Healthcare: The Quiet Giant",
    description:
      "HHS spends $2.6 trillion per year — more than any agency except Treasury. Medicare, Medicaid, improper payments, and why spending more doesn't mean better outcomes.",
  },
  {
    path: "/no-bid",
    title: "No-Bid Nation: $74B Without Competition",
    description:
      "$74 billion in sole-source federal contracts awarded without competitive bidding in FY2025. See who got the money.",
  },
  {
    path: "/waste",
    title: "The Federal Waste Problem",
    description:
      "The GAO says the government loses $233-521B per year to fraud. $2.8 trillion in improper payments since 2003. The data speaks for itself.",
  },
  {
    path: "/covid",
    title: "The COVID Spending Tsunami",
    description:
      "$1.46 trillion in COVID emergency spending — the largest emergency outlay in U.S. history. See which agencies and recipients got the money.",
  },
  {
    path: "/usaid",
    title: "Where Does Foreign Aid Actually Go?",
    description:
      "USAID's budget nearly doubled in six years. See the 100 largest grants and contracts — and who got the money.",
  },
  {
    path: "/foreign-aid",
    title: "Foreign Aid by Country",
    description:
      "U.S. foreign assistance spending breakdown — which countries receive the most American tax dollars.",
  },
  {
    path: "/efficiency",
    title: "Government Efficiency & Accountability",
    description:
      "The case for government efficiency: contractor concentration, no-bid contracts, and runaway spending growth. Data-driven accountability.",
  },
  {
    path: "/how-it-works",
    title: "How Federal Contracting Works",
    description:
      "A plain-English guide to how the federal government awards contracts, spends money, and (sometimes) holds itself accountable.",
  },
  {
    path: "/global-comparison",
    title: "US vs The World: How American Spending Compares",
    description:
      "The US spends less of GDP than France or Germany — but more per person on healthcare than anyone. A global comparison of government spending.",
  },
  {
    path: "/national-debt",
    title: "The $36 Trillion Debt Clock",
    description:
      "The national debt nearly doubled in 8 years. At $108,060 per citizen, the math is getting harder to ignore.",
  },
  {
    path: "/shutdown-calculator",
    title: "Government Shutdown Cost Calculator",
    description:
      "Calculate the real cost of a government shutdown — $400M per day in direct costs, 800,000 workers furloughed, and billions in economic damage.",
  },
  {
    path: "/contractor-monopoly",
    title: "The Contractor Monopoly: How 10 Companies Control Federal Spending",
    description:
      "The top 10 federal contractors hold 64% of all contract dollars. HHI index, agency dependency, and why competition is broken.",
  },
  {
    path: "/interest",
    title: "The Interest Time Bomb: $952B and Counting",
    description:
      "Interest on the national debt hit $952B in FY2025 — now larger than the defense budget. The compounding cost of decades of borrowing.",
  },
  {
    path: "/state-dependency",
    title: "Federal Dependency by State: Who Takes More Than They Give?",
    description:
      "For every $1 in federal taxes, West Virginia gets $4.22 back. New Jersey gets $0.71. See which states are donors and which are takers.",
  },
  {
    path: "/spending-explosion",
    title: "The Spending Explosion",
    description:
      "Federal spending grew 63% since 2017 — a deep dive into where the growth happened and why.",
  },
  {
    path: "/your-tax-bill",
    title: "Your Tax Bill Breakdown",
    description:
      "$33,135 per taxpayer — see exactly where your federal tax dollars go.",
  },
  {
    path: "/doge-reality",
    title: "The DOGE Reality Check",
    description:
      "DOGE promised $2 trillion in savings. Federal spending increased $392 billion. The data tells the real story.",
  },
  {
    path: "/foreign-aid-deep-dive",
    title: "Where Does Foreign Aid Actually Go?",
    description:
      "An investigation into U.S. foreign aid — which countries get the most, what categories dominate, and whether it's working.",
  },
  {
    path: "/pentagon-deep-dive",
    title: "The Pentagon's Blank Check",
    description:
      "The DOD has never passed a full audit. $501B in spending, cost-plus contracts, and the revolving door between Pentagon and contractors.",
  },
  {
    path: "/welfare-queens",
    title: "Which States Are Federal Welfare Queens?",
    description:
      "For every $1 in federal taxes, West Virginia gets $4.22 back. See which states are donors and which are takers.",
  },
  {
    path: "/grants",
    title: "The Grant Machine: $1.24T in Federal Grants",
    description:
      "$1.24 trillion in federal grants — who gets the money and where does it go?",
  },
  {
    path: "/spending-speed",
    title: "Federal Spending by the Second",
    description:
      "Watch federal spending tick up in real time — $355,000 per second, $21.3 million per minute.",
  },
  {
    path: "/where-tax-dollars-go",
    title: "Where Do Your Tax Dollars Go in 2025? A Complete Breakdown",
    description:
      "Medicare gets 18¢ of every dollar. Interest on debt gets 12¢ — more than veterans benefits. See the full breakdown of where your federal taxes go.",
  },
  {
    path: "/doge-savings-reality",
    title: "Is DOGE Actually Saving Money? A Data-Driven Reality Check",
    description:
      "DOGE claimed $55B in savings while federal spending increased $392B. That's 0.81% of the budget. Here's what the data shows.",
  },
  {
    path: "/biggest-government-contractors-2025",
    title: "The 10 Companies That Get the Most Government Money in 2025",
    description:
      "Lockheed Martin: $58.8B. The top 10 hold 23.5% of all federal contracts. See who they are and what they do with your money.",
  },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const itemsXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${BASE_URL}${item.path}</link>
      <description>${escapeXml(item.description)}</description>
      <guid>${BASE_URL}${item.path}</guid>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>OpenSpending - Federal Spending Analysis</title>
    <link>${BASE_URL}</link>
    <description>Data-driven analysis of federal government spending, contracts, and accountability.</description>
    <language>en-us</language>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
