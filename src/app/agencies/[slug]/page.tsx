import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AreaSpendingChart } from "@/components/charts/AreaSpendingChart";
import { AgencyContractorsChart } from "@/components/charts/AgencyContractorsChart";
import { ContractsGrantsDonut } from "@/components/charts/ContractsGrantsDonut";
import { formatDollars, formatPercent, toTitleCase } from "@/lib/format";
import agencyTrends from "@/../public/data/agency-trends.json";
import agencySpending from "@/../public/data/agency-spending.json";
import agencyContractorsData from "@/../public/data/agency-contractors.json";

export const dynamicParams = true;

const agencyContractors = agencyContractorsData as Record<
  string,
  { name: string; amount: number }[]
>;

type TrendEntry = {
  code: string;
  abbr: string;
  name?: string;
  years: { fy: number; budget: number; obligated: number; outlays: number }[];
};

const trends = agencyTrends as Record<string, TrendEntry>;

// Map agency-spending codes to agency-trends keys where they differ
const codeToTrendKey: Record<string, string> = {
  DOS: "State",
  TREAS: "Treasury",
  DOC: "Commerce",
};

const agencyDescriptions: Record<string, string> = {
  DOD: "The Pentagon commands nearly half a trillion dollars in contracts alone — more than the next ten agencies combined. Defense spending has grown steadily regardless of which party controls Congress, raising questions about contractor dependency and whether the military-industrial complex is serving taxpayers or the other way around.",
  HHS: "Health and Human Services is the single largest grant-making agency in the federal government, funneling over $825 billion to hospitals, insurers, and state health programs. The sheer scale of HHS spending makes meaningful oversight nearly impossible, and waste in Medicare and Medicaid remains a perennial concern.",
  VA: "The Department of Veterans Affairs spends $78 billion in contracts, much of it on healthcare services and IT modernization projects with a troubled track record. The VA's electronic health records overhaul alone has cost billions more than projected, with persistent delays and functionality issues.",
  TREAS: "The Treasury Department manages the nation's finances but its own spending footprint is relatively modest. Still, with $8.5 billion in contracts, Treasury's role in IRS enforcement expansion and financial surveillance infrastructure deserves closer taxpayer scrutiny.",
  DOE: "The Department of Energy splits nearly equally between contracts ($48B) and grants ($29B), driven by nuclear weapons maintenance, national labs, and a growing portfolio of green energy subsidies. Whether billions in clean energy grants are producing results or lining the pockets of politically connected firms is an open question.",
  DHS: "Created after 9/11, Homeland Security has become a $61 billion spending behemoth encompassing border security, FEMA, TSA, and cybersecurity. The department's rapid growth and sprawling mission have made it a magnet for contractor spending with limited accountability.",
  USDA: "The Department of Agriculture spends $57 billion in grants — mostly food assistance and farm subsidies — dwarfing its $9.6 billion contract portfolio. Decades of farm subsidies have primarily benefited large agribusiness operations, not the small family farms politicians love to invoke.",
  DOT: "Transportation commands $124 billion in grants to states and localities for roads, bridges, and transit, plus $9 billion in contracts. The Infrastructure Investment and Jobs Act supercharged this spending, but whether the money reaches actual infrastructure or gets consumed by bureaucratic overhead remains to be seen.",
  NASA: "NASA's $15.8 billion in contracts flows heavily to legacy aerospace giants like Boeing and Lockheed Martin. While SpaceX has demonstrated that space access can be dramatically cheaper, NASA continues to pour billions into the over-budget, behind-schedule Space Launch System.",
  DOS: "The State Department's $9.8 billion contract portfolio funds embassy operations, diplomatic security, and overseas construction. Its spending is modest by federal standards but notoriously difficult to audit given its global footprint.",
  DOI: "Interior manages federal lands and natural resources with a relatively balanced $6.4B contracts / $7.7B grants split. Land management costs continue rising while the department sits on trillions in untapped energy resources that could generate revenue instead of consuming tax dollars.",
  EPA: "The EPA's $25.6 billion in grants dwarfs its $1.7 billion contract budget, with most grant money flowing to state environmental programs and Superfund cleanups. Critics question whether the agency's ever-expanding regulatory reach delivers environmental results proportional to its cost.",
  GSA: "The General Services Administration is the government's landlord and procurement arm, spending $24 billion in contracts on buildings, technology, and supplies. GSA's massive purchasing power should drive efficiency, but government procurement remains legendarily slow and expensive.",
  HUD: "Housing and Urban Development distributes $28 billion almost entirely through grants to local housing authorities and community development programs. Despite decades of spending, homelessness and housing affordability have only worsened, raising fundamental questions about whether HUD's approach works.",
  DOJ: "The Justice Department's $8.5 billion in contracts covers everything from prison operations to IT systems and forensic services. Federal prison costs alone consume billions, yet recidivism rates suggest the system isn't delivering on rehabilitation.",
  ED: "The Department of Education hands out $51 billion in grants while spending $2.5 billion on contracts. Created in 1979, the department has presided over stagnant test scores and soaring college costs, leading many to question whether federal education spending improves outcomes at all.",
  DOL: "The Department of Labor distributes $9.8 billion in grants for workforce development and unemployment programs, plus $1.8 billion in contracts. Job training programs have been repeatedly found to produce minimal long-term earnings gains for participants — a poor return on taxpayer investment.",
  SBA: "The Small Business Administration's combined spending is modest at $325 million, but its loan guarantee programs expose taxpayers to billions in potential losses. The PPP debacle during COVID — rife with fraud — showed what happens when SBA scales up without adequate controls.",
  SSA: "Social Security Administration spends $1.7 billion on contracts to administer the nation's largest entitlement program. With the trust fund projected to be depleted by the mid-2030s, every dollar spent on administration rather than benefits draws increasing scrutiny.",
  USAID: "USAID's budget tripled from $15 billion to $50 billion between 2017 and 2023 — an explosion in spending with questionable oversight. DOGE has now targeted the agency for dramatic cuts, and early audits have revealed grants to organizations with little connection to American foreign policy interests.",
  DOC: "Commerce manages $4.2 billion in contracts and $21.2 billion in grants spanning the Census Bureau, NOAA, and economic development programs. The department's grant portfolio has ballooned with broadband subsidies and climate research funding — programs where political priorities often outweigh cost-effectiveness.",
  NSF: "The National Science Foundation distributes $8.2 billion in grants and $711 million in contracts to fund academic research. While basic science funding has broad support, NSF's grant process has drawn scrutiny for funding studies of questionable public value — the kind of spending that makes taxpayers wonder who's minding the store.",
  SEC: "The Securities and Exchange Commission spends $498 million in contracts on technology, data systems, and enforcement support. For an agency that regulates trillions in capital markets, its budget is relatively small — but its regulatory footprint and compliance costs on businesses are enormous.",
  PBGC: "The Pension Benefit Guaranty Corporation spends $292 million in contracts to manage insurance for private-sector pension plans. The PBGC itself is chronically underfunded, carrying billions in net deficit — meaning taxpayers may eventually be called upon to bail out this insurer of last resort.",
  NARA: "The National Archives spends $208 million in contracts to preserve federal records and historical documents. While the mission sounds modest, NARA's digitization backlog is staggering, and the agency has struggled with basic records management — as various presidential records controversies have demonstrated.",
  OPM: "The Office of Personnel Management spends $198 million in contracts to manage the federal workforce and retirement benefits. OPM's massive 2015 data breach — which exposed 22 million personnel records — remains a cautionary tale about government IT competence.",
  NRC: "The Nuclear Regulatory Commission spends $183 million in contracts on reactor oversight, safety inspections, and research. Critics argue the NRC's glacial licensing process and regulatory burden are a primary reason nuclear power — the cleanest large-scale energy source — struggles to expand in the U.S.",
  CFPB: "The Consumer Financial Protection Bureau spends $120 million in contracts while operating outside the normal congressional appropriations process, funded instead by the Federal Reserve. This unique funding structure means $120 million in spending with minimal fiscal accountability to elected representatives.",
  GAO: "The Government Accountability Office, Congress's watchdog, spends $117 million in contracts. Ironically, the agency tasked with auditing government waste operates with relatively little external oversight of its own spending, though its budget is modest by federal standards.",
  FTC: "The Federal Trade Commission spends $93 million in contracts for technology, legal support, and enforcement operations. The FTC's budget is small, but its aggressive regulatory posture — especially on antitrust — imposes compliance costs on the private sector that dwarf the agency's own spending.",
  CNCS: "The Corporation for National and Community Service distributes $670 million in grants to fund AmeriCorps and other volunteer programs. Whether taxpayers should be subsidizing volunteerism — a concept that by definition should be freely given — is a question worth $670 million.",
  USAGM: "The U.S. Agency for Global Media distributes $304 million in grants to fund Voice of America, Radio Free Europe, and other government broadcasting. In an era of unlimited media options, spending $304 million on government-run media outlets seems like a relic of the Cold War.",
  EOP: "The Executive Office of the President distributes $289 million in grants for drug control policy and other White House initiatives. The spending is modest, but the EOP's grant-making power operates with minimal transparency compared to cabinet departments.",
  ARC: "The Appalachian Regional Commission distributes $270 million in grants for economic development across 13 states. After more than 50 years and billions in spending, Appalachia still lags national averages on most economic indicators — raising questions about whether this model of regional subsidy actually works.",
  MCC: "The Millennium Challenge Corporation distributes $252 million in grants for international development in select countries. While MCC's data-driven approach to foreign aid is better than most, a quarter-billion dollars in overseas grants still competes with pressing domestic priorities.",
  IMLS: "The Institute of Museum and Library Services distributes $246 million in grants to museums and libraries nationwide. In an age when information is free and abundant online, the case for nearly a quarter-billion in federal subsidies to these institutions deserves re-examination.",
  DENALI: "The Denali Commission distributes $178 million in grants for infrastructure and economic development in Alaska. A relatively obscure agency spending nearly $200 million annually in a single state — the kind of targeted federal spending that looks a lot like old-fashioned earmarking.",
  GCERC: "The Gulf Coast Ecosystem Restoration Council distributes $175 million in grants funded by BP oil spill settlement money. While the funding source is unique, the bureaucratic overhead of a dedicated federal council to distribute these funds adds yet another layer to the federal spending apparatus.",
  NEA: "The National Endowment for the Arts distributes $116 million in grants to arts organizations and individual artists. Whether federal taxpayers should be subsidizing art — in a country with the world's most vibrant private arts market — has been a perennial debate since the agency's creation in 1965.",
  NEH: "The National Endowment for the Humanities distributes $71 million in grants for humanities research, education, and preservation. At $71 million, it's one of the smallest agencies in the federal budget, but even modest spending on subjective cultural priorities invites questions about the proper role of government.",
};

const agencyMissions: Record<string, string> = {
  DOD: "Provides military forces to deter war and protect national security. Manages the Army, Navy, Air Force, Marine Corps, and Space Force, along with intelligence agencies and combatant commands worldwide.",
  HHS: "Protects the health of Americans through Medicare, Medicaid, the CDC, FDA, and NIH. Administers health insurance programs covering over 150 million people and funds biomedical research.",
  VA: "Provides healthcare, disability benefits, education assistance, and home loan guarantees to military veterans. Operates the nation's largest integrated healthcare system with over 1,200 facilities.",
  TREAS: "Manages federal finances, collects taxes through the IRS, produces currency, enforces economic sanctions, and advises on domestic and international financial policy.",
  DOE: "Oversees the nation's nuclear weapons stockpile, funds energy research and national laboratories, manages nuclear waste cleanup, and administers energy efficiency and renewable energy programs.",
  DHS: "Secures U.S. borders through CBP and ICE, manages disaster response through FEMA, screens airline passengers through TSA, and protects critical infrastructure from cyber threats.",
  USDA: "Administers food assistance programs including SNAP, provides crop insurance and farm subsidies, inspects food safety, manages national forests, and supports rural development.",
  DOT: "Funds highways, bridges, transit, and rail through grants to states and localities. Regulates aviation safety through the FAA and sets vehicle safety standards through NHTSA.",
  NASA: "Conducts space exploration, aeronautics research, and Earth science missions. Manages human spaceflight programs, robotic planetary missions, and the development of next-generation space technologies.",
  DOS: "Conducts U.S. foreign policy and diplomacy, operates embassies and consulates in nearly 200 countries, issues passports and visas, and negotiates international agreements.",
  DOI: "Manages 500 million acres of federal land including national parks, wildlife refuges, and Bureau of Land Management territory. Oversees natural resource extraction, water infrastructure, and tribal affairs.",
  EPA: "Sets and enforces environmental regulations for air and water quality, manages Superfund toxic waste cleanup, regulates pesticides and chemicals, and administers environmental grants to states.",
  GSA: "Manages federal buildings and real estate, negotiates bulk purchasing contracts for government agencies, operates the federal fleet, and provides shared technology services across government.",
  HUD: "Administers federal housing programs including Section 8 vouchers, FHA mortgage insurance, and Community Development Block Grants. Enforces fair housing laws and funds homelessness assistance.",
  DOJ: "Enforces federal law through the FBI, DEA, ATF, and U.S. Marshals. Operates the federal prison system, prosecutes criminal cases, represents the government in civil litigation, and oversees immigration courts.",
  ED: "Distributes federal financial aid for higher education, enforces civil rights in schools, collects education data, and administers grants to K-12 schools serving disadvantaged students.",
  DOL: "Enforces workplace safety through OSHA, administers unemployment insurance, sets wage and hour standards, manages federal job training programs, and collects labor market statistics through BLS.",
  SBA: "Provides loan guarantees, disaster loans, and counseling to small businesses. Manages government contracting set-asides for small and disadvantaged firms.",
  SSA: "Administers Social Security retirement and disability benefits for over 70 million Americans. Manages the Supplemental Security Income program for aged, blind, and disabled individuals.",
  USAID: "Leads U.S. international development and humanitarian assistance in over 100 countries. Funds programs in global health, food security, democracy promotion, and disaster relief.",
  DOC: "Conducts the decennial census, monitors weather and oceans through NOAA, issues patents and trademarks, promotes economic development, and sets industrial standards through NIST.",
  NSF: "Funds basic scientific research and STEM education across all non-medical disciplines. Awards competitive grants to universities and research institutions for fundamental science and engineering.",
  SEC: "Regulates securities markets, enforces investor protection laws, oversees stock exchanges, and requires public companies to disclose financial information to investors.",
  PBGC: "Insures private-sector defined-benefit pension plans, paying retirement benefits when companies cannot meet their pension obligations. Protects roughly 31 million workers and retirees.",
  NARA: "Preserves and provides access to federal government records, presidential libraries, and historically significant documents including the Declaration of Independence and Constitution.",
  OPM: "Manages the federal civilian workforce including hiring policies, retirement and health benefits for federal employees, and background investigations for security clearances.",
  NRC: "Regulates civilian use of nuclear materials including commercial power reactors, research reactors, nuclear fuel facilities, and radioactive waste disposal to protect public health and safety.",
  CFPB: "Regulates consumer financial products and services including mortgages, credit cards, and student loans. Enforces consumer protection laws and handles consumer complaints against financial companies.",
  GAO: "Serves as Congress's investigative arm, auditing federal programs, evaluating policy effectiveness, and issuing reports on government waste, fraud, and mismanagement.",
  FTC: "Enforces antitrust laws, protects consumers from deceptive business practices, reviews corporate mergers, and regulates advertising and data privacy practices.",
  CNCS: "Funds national service programs including AmeriCorps and Senior Corps, engaging Americans in community service addressing education, disaster response, health, and economic opportunity.",
  USAGM: "Oversees U.S. international broadcasting including Voice of America, Radio Free Europe/Radio Liberty, and Radio Free Asia, providing news and information to audiences in countries with restricted media.",
  EOP: "Supports the President through policy offices including the Office of Management and Budget, National Security Council, and Office of National Drug Control Policy.",
  ARC: "Funds economic development in the 13-state Appalachian region, investing in infrastructure, workforce development, business incubation, and community capacity-building in distressed counties.",
  MCC: "Provides time-limited grants to developing countries that meet governance, economic freedom, and social investment criteria, funding large-scale infrastructure and institutional reform projects.",
  IMLS: "Provides federal support to the nation's museums and libraries through grants for education programs, digital infrastructure, community engagement, and preservation of cultural collections.",
  DENALI: "Funds infrastructure, energy, and economic development projects in rural Alaska, addressing the unique challenges of building and maintaining services in remote, high-cost communities.",
  GCERC: "Coordinates Gulf Coast restoration using funds from the Deepwater Horizon oil spill settlement, investing in ecosystem restoration, water quality improvement, and coastal resilience projects.",
  NEA: "Awards grants to nonprofit arts organizations, state arts agencies, and individual artists to support public engagement with the arts across music, theater, visual arts, literature, and media.",
  NEH: "Funds research, education, preservation, and public programs in the humanities including history, philosophy, literature, and cultural studies through grants to scholars and institutions.",
};

// Build list of ALL agencies with slugs
const allAgencies = agencySpending
  .filter((a): a is typeof a & { slug: string } => a.slug != null)
  .map((a) => {
    const trendKey = codeToTrendKey[a.code] ?? a.code;
    const trend = trends[trendKey];
    const hasTrend = trend && trend.years.length > 0;
    return { spending: a, trend: hasTrend ? trend : null };
  });

const slugMap = new Map(allAgencies.map((a) => [a.spending.slug, a]));

const SUFFIX_RE = /\b(INC|LLC|CORP|CORPORATION|COMPANY|LTD|LP|L\.P\.|CO)\.?\b/g;
const TRAILING_PUNCT = /[\s,.\-]+$/;

function normalizeContractorName(name: string): string {
  return name.toUpperCase().replace(SUFFIX_RE, "").replace(TRAILING_PUNCT, "").trim();
}

function dedupeContractors(
  contractors: { name: string; amount: number }[]
): { name: string; amount: number }[] {
  const groups = new Map<
    string,
    { total: number; nameCounts: Map<string, number> }
  >();
  for (const c of contractors) {
    const key = normalizeContractorName(c.name);
    let group = groups.get(key);
    if (!group) {
      group = { total: 0, nameCounts: new Map() };
      groups.set(key, group);
    }
    group.total += c.amount;
    group.nameCounts.set(c.name, (group.nameCounts.get(c.name) ?? 0) + 1);
  }
  return Array.from(groups.values())
    .map((g) => {
      let bestName = "";
      let bestCount = 0;
      for (const [name, count] of g.nameCounts) {
        if (count > bestCount) {
          bestCount = count;
          bestName = name;
        }
      }
      return { name: bestName, amount: g.total };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 20);
}

export function generateStaticParams() {
  return allAgencies.map((a) => ({ slug: a.spending.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = slugMap.get(slug);
  const name = entry?.spending.name ?? "Agency";
  const contracts = entry?.spending.contracts ?? 0;
  const grants = entry && "grants" in entry.spending ? (entry.spending.grants ?? 0) : 0;
  const total = contracts + grants;
  const amount = total > 0 ? `$${(total / 1e9).toFixed(1)}B` : "";
  const title = amount ? `${name}: ${amount} in Spending — OpenSpending` : `${name} — OpenSpending`;
  const description = amount
    ? `${name} spends ${amount} across contracts and grants. Budget trends, top contractors, and spending breakdowns.`
    : `Budget trends, contracts, and grants for ${name}.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function AgencyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = slugMap.get(slug);
  if (!entry) notFound();

  const { spending, trend } = entry;
  const years = trend?.years ?? null;
  const latest = years ? years[years.length - 1] : null;
  const contracts = spending.contracts || 0;
  const grants = "grants" in spending ? (spending.grants ?? 0) : 0;
  const budget = latest ? latest.budget : contracts + grants;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Agencies", href: "/agencies" }, { label: spending.name }]} />

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {spending.name}
      </h1>
      <p className="text-gray-500 mb-4">
        <span className="font-medium text-indigo-700">{spending.code}</span>
        {years && latest
          ? ` · FY${years[0].fy}\u2013FY${latest.fy} budget trends`
          : " · FY2025 spending data"}
      </p>

      {agencyDescriptions[spending.code] && (
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-3xl">
          {agencyDescriptions[spending.code]}
        </p>
      )}

      {agencyMissions[spending.code] && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 max-w-3xl">
          <h2 className="text-sm font-bold text-gray-900 mb-1">What This Agency Does</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {agencyMissions[spending.code]}
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {latest ? `Budget Authority (FY${latest.fy})` : "Total Spending"}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatDollars(budget)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Contracts
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatDollars(contracts)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Grants
          </p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {formatDollars(grants)}
          </p>
        </div>
      </div>

      {/* Contracts vs Grants donut */}
      {contracts > 0 && grants > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Contracts vs Grants
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <ContractsGrantsDonut contracts={contracts} grants={grants} />
          </div>
        </div>
      )}

      {/* Budget trend chart */}
      {years ? (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Trend</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <AreaSpendingChart data={years} />
          </div>
        </div>
      ) : (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Spending Breakdown</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Contracts</p>
                <p className="text-2xl font-bold text-indigo-700">{formatDollars(contracts)}</p>
                {contracts + grants > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPercent((contracts / (contracts + grants)) * 100)} of total spending
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Grants</p>
                <p className="text-2xl font-bold text-emerald-700">{formatDollars(grants)}</p>
                {contracts + grants > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPercent((grants / (contracts + grants)) * 100)} of total spending
                  </p>
                )}
              </div>
            </div>
            {contracts + grants > 0 && (
              <div className="mt-5">
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-indigo-500 h-full"
                    style={{ width: `${(contracts / (contracts + grants)) * 100}%` }}
                  />
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(grants / (contracts + grants)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                  <span>Contracts</span>
                  <span>Grants</span>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-4">
              Historical budget trend data is not available for this agency. FY2025 contract and grant totals shown.
            </p>
          </div>
        </div>
      )}

      {/* Year-over-year table */}
      {years && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Year-over-Year Changes
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    FY
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    YoY
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Obligated
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    YoY
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Outlays
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    YoY
                  </th>
                </tr>
              </thead>
              <tbody>
                {years.map((yr, i) => {
                  const prev = i > 0 ? years[i - 1] : null;
                  const budgetChg = prev
                    ? ((yr.budget - prev.budget) / prev.budget) * 100
                    : null;
                  const obligatedChg = prev
                    ? ((yr.obligated - prev.obligated) / prev.obligated) * 100
                    : null;
                  const outlaysChg = prev
                    ? ((yr.outlays - prev.outlays) / prev.outlays) * 100
                    : null;

                  return (
                    <tr
                      key={yr.fy}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2.5 font-medium text-gray-900">
                        {yr.fy}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-700">
                        {formatDollars(yr.budget)}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <YoyBadge value={budgetChg} />
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-700">
                        {formatDollars(yr.obligated)}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <YoyBadge value={obligatedChg} />
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-700">
                        {formatDollars(yr.outlays)}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <YoyBadge value={outlaysChg} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Contractors */}
      {agencyContractors[slug] && (() => {
        const dedupedContractors = dedupeContractors(agencyContractors[slug]);
        return (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Top Contractors
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6">
              <AgencyContractorsChart data={dedupedContractors} />
            </div>
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      #
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Contractor
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dedupedContractors.map((c, i) => (
                    <tr
                      key={`${c.name}-${i}`}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2.5 text-gray-400 font-medium">
                        {i + 1}
                      </td>
                      <td className="px-4 py-2.5 text-gray-900">{toTitleCase(c.name)}</td>
                      <td className="px-4 py-2.5 text-right text-gray-700 font-medium">
                        {formatDollars(c.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      <div className="flex items-center justify-between mt-4">
        <Link
          href="/agencies"
          className="text-indigo-600 hover:text-indigo-800 text-sm"
        >
          &larr; Back to all agencies
        </Link>
        <a
          href={`https://www.usaspending.gov/agency/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-600 text-sm transition-colors"
        >
          View on USASpending.gov &rarr;
        </a>
      </div>
    </div>
  );
}

function YoyBadge({ value }: { value: number | null }) {
  if (value === null) return <span className="text-gray-300">&mdash;</span>;
  const positive = value >= 0;
  return (
    <span
      className={
        positive ? "text-red-600 font-medium" : "text-emerald-600 font-medium"
      }
    >
      {positive ? "+" : ""}
      {formatPercent(value)}
    </span>
  );
}
