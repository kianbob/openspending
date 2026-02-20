const BASE_URL = "https://openspending-app.vercel.app";

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
