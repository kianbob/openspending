import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars, formatDollarsLong } from "@/lib/format";
import programs from "@/../public/data/federal-programs.json";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

const totalSpending = programs.reduce((s, p) => s + p.amount, 0);
const slugMap = new Map(programs.map((p) => [slugify(p.name), p]));

export const dynamicParams = true;

export function generateStaticParams() {
  return programs.slice(0, 100).map((p) => ({ slug: slugify(p.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = slugMap.get(slug);
  if (!program) return { title: "Program Not Found — OpenSpending" };
  return {
    title: `${program.name}: ${formatDollars(program.amount)} in Federal Spending — OpenSpending`,
    description: `${program.name} (CFDA ${program.code}) receives ${formatDollars(program.amount)} in federal grants, ranking #${program.rank} of 200 programs tracked.`,
    openGraph: {
      title: `${program.name}: ${formatDollars(program.amount)} in Federal Spending`,
      description: `Ranked #${program.rank} of 200 federal assistance programs. ${formatDollars(program.amount)} in annual spending.`,
    },
  };
}

function getProgramDescription(name: string): string {
  const n = name.toUpperCase();
  if (n.includes("MEDICAID")) return "Medicaid is the nation's largest health coverage program, providing free or low-cost health coverage to millions of low-income Americans, including children, pregnant women, elderly adults, and people with disabilities. It is jointly funded by the federal government and states.";
  if (n.includes("HIGHWAY")) return "This program funds the construction, reconstruction, and improvement of highways and bridges on federal-aid highway systems. It provides the backbone of America's surface transportation infrastructure.";
  if (n.includes("SCHOOL LUNCH")) return "The National School Lunch Program provides nutritionally balanced, low-cost or free lunches to children in public and nonprofit private schools and residential child care institutions each school day.";
  if (n.includes("CHIP") || n.includes("CHILDREN'S HEALTH")) return "The Children's Health Insurance Program provides health coverage to eligible children through both Medicaid and separate CHIP programs, covering uninsured children in families with incomes too high to qualify for Medicaid.";
  if (n.includes("TITLE I")) return "Title I provides financial assistance to schools with high percentages of children from low-income families to help ensure that all children meet challenging state academic standards.";
  if (n.includes("TANF") || n.includes("TEMPORARY ASSISTANCE")) return "TANF provides states with block grants to design and operate programs that help needy families achieve self-sufficiency, including cash assistance, work opportunities, and support services.";
  if (n.includes("BROADBAND")) return "This program funds the deployment of broadband infrastructure to unserved and underserved areas across the country, aiming to close the digital divide and ensure all Americans have access to high-speed internet.";
  if (n.includes("HEAD START")) return "Head Start provides comprehensive early childhood education, health, nutrition, and parent involvement services to low-income children and their families, promoting school readiness.";
  if (n.includes("SPECIAL EDUCATION")) return "This program provides formula grants to states to assist them in providing special education and related services to children with disabilities ages 3 through 21.";
  if (n.includes("SECTION 8") || n.includes("HOUSING CHOICE")) return "The Housing Choice Voucher program assists very low-income families, the elderly, and the disabled to afford decent, safe, and sanitary housing in the private market.";
  if (n.includes("SNAP") || n.includes("SUPPLEMENTAL NUTRITION ASSISTANCE")) return "SNAP provides nutrition benefits to supplement the food budget of low-income families so they can purchase healthy food and move toward self-sufficiency.";
  if (n.includes("TRANSIT")) return "This program provides federal funding to support public transportation, including buses, subways, light rail, and commuter rail systems across urban and rural communities.";
  if (n.includes("PELL")) return "Pell Grants provide need-based grants to low-income undergraduate students to promote access to postsecondary education, serving as the foundation of federal student financial aid.";
  if (n.includes("DISASTER")) return "This program provides federal assistance to state, tribal, and local governments and certain private nonprofit organizations for disaster relief, emergency response, and recovery operations.";
  if (n.includes("NIH") || n.includes("NATIONAL INSTITUTES OF HEALTH")) return "NIH research grants fund biomedical and public health research at universities, medical schools, and research institutions across the country, advancing our understanding of diseases and developing new treatments.";
  if (n.includes("FOSTER CARE")) return "This program provides federal matching funds to states for foster care maintenance payments on behalf of eligible children, supporting children who cannot safely remain in their own homes.";
  if (n.includes("NSF") || n.includes("NATIONAL SCIENCE FOUNDATION")) return "NSF research grants fund fundamental research and education across all fields of science and engineering, supporting the nation's scientific enterprise and innovation ecosystem.";
  if (n.includes("ARMY CORPS")) return "The Army Corps of Engineers Civil Works program manages water resources development, including flood control, navigation, and environmental restoration projects nationwide.";
  if (n.includes("CHILD CARE")) return "This program assists low-income families, families receiving temporary public assistance, and those transitioning from public assistance in obtaining child care.";
  if (n.includes("ENERGY SCIENCE") || n.includes("DEPARTMENT OF ENERGY SCIENCE")) return "DOE science grants fund research in physics, chemistry, biology, and environmental science at national laboratories and universities.";
  if (n.includes("INDIAN HEALTH")) return "The Indian Health Service provides health care services to American Indians and Alaska Natives, operating hospitals, clinics, and health programs across tribal communities.";
  if (n.includes("CDC") || n.includes("CENTERS FOR DISEASE CONTROL")) return "CDC prevention grants support state and local health departments in preventing and controlling infectious diseases, chronic diseases, injuries, and environmental health threats.";
  if (n.includes("WIC") || n.includes("WOMEN INFANTS")) return "WIC provides supplemental foods, health care referrals, and nutrition education for low-income pregnant, breastfeeding, and postpartum women, and to infants and children up to age five.";
  if (n.includes("FOREIGN MILITARY")) return "This program provides grants to foreign governments to finance the procurement of U.S. defense equipment, services, and training, supporting U.S. national security interests abroad.";
  if (n.includes("COMMUNITY HEALTH CENTER")) return "Community Health Centers provide comprehensive primary health care services to medically underserved populations regardless of ability to pay.";
  if (n.includes("BREAKFAST")) return "The School Breakfast Program provides nutritious breakfasts to children in schools and residential child care institutions, helping ensure students start the day ready to learn.";
  if (n.includes("PUBLIC HOUSING OPERATING")) return "This fund provides operating subsidies to public housing agencies to help them maintain and operate public housing developments for low-income residents.";
  if (n.includes("VETERANS HEALTH")) return "This program provides grants to support health care services for veterans, including medical care, mental health services, and long-term care.";
  if (n.includes("WEATHERIZATION")) return "The Weatherization Assistance Program reduces energy costs for low-income households by increasing the energy efficiency of their homes.";
  if (n.includes("ADOPTION")) return "This program provides federal matching funds to states for adoption assistance payments, helping families adopt children with special needs from foster care.";
  if (n.includes("LOW INCOME HOME ENERGY") || n.includes("LIHEAP")) return "LIHEAP assists low-income households with their heating and cooling energy costs, bill payment assistance, energy crisis assistance, and weatherization.";
  if (n.includes("REHABILITATION") || n.includes("VOCATIONAL REHABILITATION")) return "This program provides grants to states for vocational rehabilitation services to individuals with disabilities, helping them prepare for, obtain, and maintain employment.";
  if (n.includes("AIRPORT")) return "The Airport Improvement Program provides grants to public-use airports for planning and development projects that enhance safety, capacity, and environmental compatibility.";
  if (n.includes("AMTRAK")) return "Federal grants support Amtrak's intercity passenger rail operations and capital improvements, maintaining the national passenger rail network.";
  if (n.includes("COMMUNITY DEVELOPMENT BLOCK")) return "CDBG provides annual grants to states, cities, and counties for community development activities directed toward neighborhood revitalization and economic development.";
  if (n.includes("RENEWABLE ENERGY")) return "This program funds research, development, and deployment of renewable energy technologies including solar, wind, geothermal, and bioenergy.";
  if (n.includes("PUBLIC HOUSING CAPITAL")) return "The Public Housing Capital Fund provides formula grants to public housing agencies for capital and management activities of public housing developments.";
  if (n.includes("CONTINUUM OF CARE") || n.includes("HOMELESS")) return "This program provides funding to quickly rehouse homeless individuals and families, promote access to services, and reduce the overall length of homelessness.";
  if (n.includes("UNEMPLOYMENT")) return "This program provides administrative funding to state workforce agencies to operate the unemployment insurance system, ensuring timely benefit payments to eligible workers.";
  if (n.includes("NASA")) return "NASA research grants fund space exploration, aeronautics research, and scientific discovery at universities and research institutions.";
  if (n.includes("CLEAN WATER")) return "The Clean Water State Revolving Fund provides low-cost financing for water quality infrastructure projects including wastewater treatment facilities.";
  if (n.includes("DRINKING WATER")) return "This fund provides low-cost financing for drinking water infrastructure improvements, helping communities ensure safe and reliable drinking water.";
  if (n.includes("REFUGEE")) return "This program provides resettlement assistance, cash and medical assistance, and social services to refugees admitted to the United States.";
  if (n.includes("RAILROAD")) return "Federal Railroad Administration grants fund rail infrastructure improvements, safety enhancements, and development of intercity passenger and freight rail.";
  if (n.includes("RYAN WHITE") || n.includes("HIV/AIDS")) return "This program provides medical care, medications, and support services to people living with HIV/AIDS who are uninsured or underinsured.";
  if (n.includes("BRIDGE")) return "The Bridge Investment Program funds the repair, rehabilitation, and replacement of bridges across the country, addressing the backlog of structurally deficient bridges.";
  if (n.includes("CONSERVATION")) return "This conservation program provides financial and technical assistance to farmers and ranchers to address natural resource concerns on their land.";
  if (n.includes("TIGER") || n.includes("BUILD") || n.includes("RAISE")) return "This competitive grant program funds surface transportation infrastructure projects that have a significant impact on the nation, a metropolitan area, or a region.";
  if (n.includes("HAZARD MITIGATION")) return "This program provides grants to reduce the risk of future damage, hardship, loss, or suffering from natural disasters through pre- and post-disaster mitigation planning.";
  if (n.includes("BUREAU OF RECLAMATION")) return "Bureau of Reclamation water programs manage and develop water resources in the western United States, including dams, reservoirs, and water delivery systems.";
  if (n.includes("SMALL BUSINESS")) return "SBA programs provide loans, loan guarantees, and business development assistance to small businesses, helping them start, grow, and succeed.";
  if (n.includes("FEMA INDIVIDUAL")) return "This program provides financial assistance to individuals and households affected by disasters, including housing assistance and other disaster-related needs.";
  if (n.includes("DEFENSE EDUCATION") || n.includes("DOD EDUCATION")) return "DoDEA operates schools for military-connected children on military installations worldwide, providing high-quality education.";
  if (n.includes("RURAL")) return "This program supports rural communities through loans, grants, and technical assistance for infrastructure, housing, utilities, and economic development.";
  if (n.includes("SUPERFUND")) return "The Superfund program cleans up some of the nation's most contaminated land and responds to environmental emergencies, oil spills, and natural disasters.";
  if (n.includes("BUREAU OF INDIAN AFFAIRS") || n.includes("TRIBAL")) return "This program provides grants and services to federally recognized tribes, supporting tribal self-governance, education, social services, and natural resource management.";
  if (n.includes("HOMELAND SECURITY GRANT")) return "This program provides funding to state, local, tribal, and territorial governments to prevent, protect against, and respond to acts of terrorism.";
  if (n.includes("ELECTRIC VEHICLE")) return "This program funds the deployment of electric vehicle charging infrastructure along designated corridors, supporting the transition to electric transportation.";
  if (n.includes("OPIOID")) return "Opioid Response Grants provide funding to states and territories to address the opioid crisis through prevention, treatment, and recovery support services.";
  if (n.includes("IMPACT AID")) return "Impact Aid provides funding to school districts affected by federal activities, such as those with students living on military bases or Indian lands.";
  if (n.includes("WORK-STUDY")) return "The Federal Work-Study Program provides part-time employment to undergraduate and graduate students with financial need, encouraging community service work.";
  if (n.includes("CAREER AND TECHNICAL")) return "This program supports career and technical education programs at the secondary and postsecondary levels, preparing students for high-skill, high-wage careers.";
  if (n.includes("TRIO")) return "TRIO programs provide educational opportunity outreach programs to help disadvantaged students progress from middle school through college.";
  if (n.includes("JOB CORPS")) return "Job Corps is the nation's largest residential education and job training program for at-risk youth ages 16 through 24.";
  if (n.includes("WORKFORCE INNOVATION")) return "WIOA provides job training and employment services to adults, dislocated workers, and youth through a national network of American Job Centers.";
  if (n.includes("AMERICORPS") || n.includes("NATIONAL AND COMMUNITY SERVICE")) return "AmeriCorps engages Americans in intensive community service, providing education awards to members who complete their service.";
  if (n.includes("SAFE STREETS")) return "This program provides grants for road safety projects to prevent deaths and serious injuries on roads and streets, particularly for pedestrians and cyclists.";
  if (n.includes("FAA") || n.includes("FEDERAL AVIATION")) return "FAA NextGen funds modernize the national airspace system through advanced technologies, improving safety, efficiency, and environmental performance.";
  if (n.includes("NUCLEAR ENERGY")) return "This program funds research and development of advanced nuclear energy technologies, supporting the nation's clean energy goals.";
  if (n.includes("SOCIAL SERVICES BLOCK")) return "The Social Services Block Grant provides flexible funding to states for social services directed at achieving economic self-sufficiency and preventing abuse and neglect.";
  if (n.includes("SUBSTANCE ABUSE")) return "This block grant provides funding to states for substance abuse prevention and treatment services, addressing alcohol and drug abuse.";

  // Generic fallback based on keywords
  if (n.includes("HEALTH")) return "This federal health program provides funding for health care services, research, and public health infrastructure to improve health outcomes across the country.";
  if (n.includes("EDUCATION") || n.includes("SCHOOL")) return "This federal education program provides funding to improve educational opportunities and outcomes for students across the country.";
  if (n.includes("HOUSING")) return "This federal housing program provides assistance to ensure affordable, safe, and decent housing for American families.";
  if (n.includes("TRANSPORT") || n.includes("HIGHWAY") || n.includes("RAIL")) return "This federal transportation program funds infrastructure improvements to keep Americans connected and goods moving across the country.";
  if (n.includes("ENERGY")) return "This energy program supports research, development, and deployment of energy technologies to advance America's energy independence and sustainability.";
  if (n.includes("ENVIRONMENT") || n.includes("EPA") || n.includes("WATER") || n.includes("AIR")) return "This environmental program provides funding to protect public health and the environment through pollution prevention and control.";
  if (n.includes("AGRICULTURE") || n.includes("FARM") || n.includes("FOOD")) return "This agriculture program supports American farmers, ranchers, and food security through financial assistance and technical support.";
  if (n.includes("VETERAN")) return "This program provides services and support to America's veterans, honoring their service through health care, employment, and housing assistance.";
  if (n.includes("SECURITY") || n.includes("EMERGENCY") || n.includes("FIRE")) return "This program strengthens national security and emergency preparedness by supporting first responders and emergency management capabilities.";
  if (n.includes("JUSTICE") || n.includes("CRIME") || n.includes("LAW")) return "This justice program supports crime prevention, law enforcement, and the administration of justice across the country.";
  if (n.includes("INTERNATIONAL") || n.includes("FOREIGN") || n.includes("USAID")) return "This international program supports U.S. foreign policy objectives through development assistance, humanitarian aid, and diplomatic engagement.";
  return "This federal assistance program provides funding to support critical public services and infrastructure, administered through grants to state, local, and tribal governments and eligible organizations.";
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = slugMap.get(slug);
  if (!program) notFound();

  const pctOfTotal = ((program.amount / totalSpending) * 100);
  const description = getProgramDescription(program.name);

  // Find nearby programs for ranking context
  const nearbyAbove = programs.filter((p) => p.rank < program.rank && p.rank >= program.rank - 3).reverse();
  const nearbyBelow = programs.filter((p) => p.rank > program.rank && p.rank <= program.rank + 3);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: "Federal Programs", href: "/programs" },
        { label: program.name },
      ]} />

      <h1 className="text-4xl font-serif font-bold text-gray-900 mt-6">
        {program.name}
      </h1>
      <p className="text-gray-500 mt-2">CFDA Code: {program.code}</p>

      <ShareButtons title={`${program.name}: ${formatDollars(program.amount)} in Federal Spending — OpenSpending`} />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-indigo-700">{formatDollars(program.amount)}</div>
          <div className="text-sm text-gray-500 mt-1">Total Spending</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-indigo-700">#{program.rank}</div>
          <div className="text-sm text-gray-500 mt-1">of 200 Programs</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-indigo-700">{pctOfTotal.toFixed(1)}%</div>
          <div className="text-sm text-gray-500 mt-1">of All Grant Spending</div>
        </div>
      </div>

      {/* Description */}
      <section className="mt-10">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">About This Program</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
        <p className="text-gray-600 mt-4 text-sm">
          In dollar terms, {program.name} receives{" "}
          <strong>{formatDollarsLong(program.amount)}</strong> in federal grant funding annually.
        </p>
      </section>

      {/* Ranking Context */}
      <section className="mt-10">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">How This Program Ranks</h2>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Program</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {nearbyAbove.map((p) => (
                <tr key={p.rank} className="border-b border-gray-100">
                  <td className="py-2 px-4 text-gray-500">#{p.rank}</td>
                  <td className="py-2 px-4">
                    <Link href={`/programs/${slugify(p.name)}`} className="text-indigo-600 hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 text-right text-gray-600">{formatDollars(p.amount)}</td>
                </tr>
              ))}
              <tr className="bg-indigo-50 border-b border-indigo-200 font-semibold">
                <td className="py-3 px-4 text-indigo-700">#{program.rank}</td>
                <td className="py-3 px-4 text-indigo-900">{program.name}</td>
                <td className="py-3 px-4 text-right text-indigo-700">{formatDollars(program.amount)}</td>
              </tr>
              {nearbyBelow.map((p) => (
                <tr key={p.rank} className="border-b border-gray-100">
                  <td className="py-2 px-4 text-gray-500">#{p.rank}</td>
                  <td className="py-2 px-4">
                    <Link href={`/programs/${slugify(p.name)}`} className="text-indigo-600 hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 text-right text-gray-600">{formatDollars(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Links */}
      <section className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/programs" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="font-semibold text-indigo-700">All Programs →</div>
            <div className="text-sm text-gray-500 mt-1">200 federal programs ranked</div>
          </Link>
          <Link href="/grants" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="font-semibold text-indigo-700">Grant Recipients →</div>
            <div className="text-sm text-gray-500 mt-1">$1.24T to states & orgs</div>
          </Link>
          <Link href="/agencies" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="font-semibold text-indigo-700">Federal Agencies →</div>
            <div className="text-sm text-gray-500 mt-1">97 agency profiles</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
