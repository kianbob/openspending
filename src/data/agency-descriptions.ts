export type AgencyDescription = {
  slug: string;
  code: string;
  fullName: string;
  description: string;
  accountability: string;
  relatedSlugs: string[];
};

export const agencyDescriptions: AgencyDescription[] = [
  {
    slug: "department-of-defense",
    code: "DOD",
    fullName: "Department of Defense",
    description:
      "Provides military forces to deter war and protect national security. Manages the Army, Navy, Air Force, Marine Corps, and Space Force, along with intelligence agencies and combatant commands worldwide. DOD commands nearly half a trillion dollars in contracts alone — more than the next ten agencies combined.",
    accountability:
      "Defense spending has grown steadily regardless of which party controls Congress, raising questions about contractor dependency and whether the military-industrial complex is serving taxpayers or the other way around. Ten companies receive the majority of contract dollars, and cost overruns on major weapons programs are the norm, not the exception.",
    relatedSlugs: [
      "department-of-veterans-affairs",
      "department-of-homeland-security",
      "department-of-energy",
      "national-aeronautics-and-space-administration",
    ],
  },
  {
    slug: "department-of-health-and-human-services",
    code: "HHS",
    fullName: "Department of Health and Human Services",
    description:
      "Protects the health of Americans through Medicare, Medicaid, the CDC, FDA, and NIH. Administers health insurance programs covering over 150 million people and funds biomedical research. HHS is the single largest grant-making agency in the federal government, funneling over $825 billion to hospitals, insurers, and state health programs.",
    accountability:
      "The sheer scale of HHS spending makes meaningful oversight nearly impossible, and waste in Medicare and Medicaid remains a perennial concern. The Government Accountability Office has identified tens of billions in improper payments annually — money that goes out the door with little prospect of recovery.",
    relatedSlugs: [
      "department-of-veterans-affairs",
      "social-security-administration",
      "department-of-labor",
    ],
  },
  {
    slug: "department-of-veterans-affairs",
    code: "VA",
    fullName: "Department of Veterans Affairs",
    description:
      "Provides healthcare, disability benefits, education assistance, and home loan guarantees to military veterans. Operates the nation's largest integrated healthcare system with over 1,200 facilities and spends $78 billion in contracts, much of it on healthcare services and IT modernization.",
    accountability:
      "The VA's electronic health records overhaul alone has cost billions more than projected, with persistent delays and functionality issues. While veterans deserve first-rate care, the VA's track record of bureaucratic dysfunction — from appointment wait-time scandals to IT boondoggles — suggests that simply spending more money isn't the answer.",
    relatedSlugs: [
      "department-of-defense",
      "department-of-health-and-human-services",
      "department-of-labor",
    ],
  },
  {
    slug: "department-of-education",
    code: "ED",
    fullName: "Department of Education",
    description:
      "Distributes federal financial aid for higher education, enforces civil rights in schools, collects education data, and administers grants to K-12 schools serving disadvantaged students. Hands out $51 billion in grants while spending $2.5 billion on contracts.",
    accountability:
      "Created in 1979, the department has presided over stagnant test scores and soaring college costs, leading many to question whether federal education spending improves outcomes at all. The federal student loan portfolio now exceeds $1.7 trillion — a taxpayer liability that grows with every loan forgiveness proposal.",
    relatedSlugs: [
      "department-of-health-and-human-services",
      "department-of-labor",
      "social-security-administration",
    ],
  },
  {
    slug: "department-of-homeland-security",
    code: "DHS",
    fullName: "Department of Homeland Security",
    description:
      "Secures U.S. borders through CBP and ICE, manages disaster response through FEMA, screens airline passengers through TSA, and protects critical infrastructure from cyber threats. Created after 9/11, DHS has become a $61 billion spending behemoth.",
    accountability:
      "The department's rapid growth and sprawling mission have made it a magnet for contractor spending with limited accountability. DHS has never passed a clean financial audit, and its component agencies — from TSA's theatrical security to FEMA's disaster spending controversies — regularly demonstrate the pitfalls of government expansion.",
    relatedSlugs: [
      "department-of-defense",
      "department-of-justice",
      "department-of-state",
    ],
  },
  {
    slug: "department-of-energy",
    code: "DOE",
    fullName: "Department of Energy",
    description:
      "Oversees the nation's nuclear weapons stockpile, funds energy research and national laboratories, manages nuclear waste cleanup, and administers energy efficiency and renewable energy programs. Splits nearly equally between contracts ($48B) and grants ($29B).",
    accountability:
      "Whether billions in clean energy grants are producing results or lining the pockets of politically connected firms is an open question. The Solyndra debacle may be old news, but the pattern of subsidizing favored industries with taxpayer dollars continues, and DOE's nuclear cleanup liabilities stretch into the hundreds of billions.",
    relatedSlugs: [
      "department-of-defense",
      "environmental-protection-agency",
      "department-of-the-interior",
    ],
  },
  {
    slug: "department-of-agriculture",
    code: "USDA",
    fullName: "Department of Agriculture",
    description:
      "Administers food assistance programs including SNAP, provides crop insurance and farm subsidies, inspects food safety, manages national forests, and supports rural development. Spends $57 billion in grants — mostly food assistance and farm subsidies — dwarfing its $9.6 billion contract portfolio.",
    accountability:
      "Decades of farm subsidies have primarily benefited large agribusiness operations, not the small family farms politicians love to invoke. SNAP fraud, while a fraction of total spending, amounts to billions in waste, and the department's dual role as both industry promoter and safety regulator creates inherent conflicts of interest.",
    relatedSlugs: [
      "department-of-health-and-human-services",
      "department-of-the-interior",
      "environmental-protection-agency",
    ],
  },
  {
    slug: "department-of-transportation",
    code: "DOT",
    fullName: "Department of Transportation",
    description:
      "Funds highways, bridges, transit, and rail through grants to states and localities. Regulates aviation safety through the FAA and sets vehicle safety standards through NHTSA. Commands $124 billion in grants plus $9 billion in contracts.",
    accountability:
      "The Infrastructure Investment and Jobs Act supercharged DOT spending, but whether the money reaches actual infrastructure or gets consumed by bureaucratic overhead and politically motivated project selection remains to be seen. Highway projects routinely cost multiples of initial estimates, and transit boondoggles have become a fixture of American infrastructure spending.",
    relatedSlugs: [
      "department-of-energy",
      "department-of-commerce",
      "department-of-housing-and-urban-development",
    ],
  },
  {
    slug: "department-of-justice",
    code: "DOJ",
    fullName: "Department of Justice",
    description:
      "Enforces federal law through the FBI, DEA, ATF, and U.S. Marshals. Operates the federal prison system, prosecutes criminal cases, represents the government in civil litigation, and oversees immigration courts. Spends $8.5 billion in contracts covering everything from prison operations to IT systems.",
    accountability:
      "Federal prison costs alone consume billions, yet recidivism rates suggest the system isn't delivering on rehabilitation. The department's expanding surveillance capabilities and growing reliance on contractors for sensitive law enforcement functions raise questions about both cost-effectiveness and civil liberties.",
    relatedSlugs: [
      "department-of-homeland-security",
      "department-of-defense",
      "department-of-the-treasury",
    ],
  },
  {
    slug: "national-aeronautics-and-space-administration",
    code: "NASA",
    fullName: "National Aeronautics and Space Administration",
    description:
      "Conducts space exploration, aeronautics research, and Earth science missions. Manages human spaceflight programs, robotic planetary missions, and the development of next-generation space technologies. Its $15.8 billion in contracts flows heavily to legacy aerospace giants.",
    accountability:
      "While SpaceX has demonstrated that space access can be dramatically cheaper, NASA continues to pour billions into the over-budget, behind-schedule Space Launch System. The agency's cost-plus contracting model rewards delays and overruns, creating a system where contractors profit most when projects take longer and cost more.",
    relatedSlugs: [
      "department-of-defense",
      "department-of-energy",
      "department-of-commerce",
    ],
  },
  {
    slug: "department-of-state",
    code: "DOS",
    fullName: "Department of State",
    description:
      "Conducts U.S. foreign policy and diplomacy, operates embassies and consulates in nearly 200 countries, issues passports and visas, and negotiates international agreements. Its $9.8 billion contract portfolio funds embassy operations, diplomatic security, and overseas construction.",
    accountability:
      "State Department spending is modest by federal standards but notoriously difficult to audit given its global footprint. The department's close ties to foreign aid agencies like USAID — whose budget tripled to $50 billion with minimal oversight — raise questions about whether diplomatic priorities align with taxpayer interests.",
    relatedSlugs: [
      "department-of-defense",
      "department-of-homeland-security",
      "department-of-the-treasury",
    ],
  },
  {
    slug: "department-of-the-interior",
    code: "DOI",
    fullName: "Department of the Interior",
    description:
      "Manages 500 million acres of federal land including national parks, wildlife refuges, and Bureau of Land Management territory. Oversees natural resource extraction, water infrastructure, and tribal affairs with a $6.4B contracts / $7.7B grants split.",
    accountability:
      "Land management costs continue rising while the department sits on trillions in untapped energy resources that could generate revenue instead of consuming tax dollars. The federal government owns nearly 30% of all U.S. land — an arrangement that restricts economic development and local control, particularly in western states.",
    relatedSlugs: [
      "environmental-protection-agency",
      "department-of-energy",
      "department-of-agriculture",
    ],
  },
  {
    slug: "department-of-the-treasury",
    code: "TREAS",
    fullName: "Department of the Treasury",
    description:
      "Manages the nation's finances, collects taxes through the IRS, produces currency, enforces economic sanctions, and advises on domestic and international financial policy. Its spending footprint includes $8.5 billion in contracts.",
    accountability:
      "Treasury's role in IRS enforcement expansion and financial surveillance infrastructure deserves closer taxpayer scrutiny. The agency has pushed for more reporting requirements on ordinary bank transactions, and the IRS's $80 billion funding boost raises concerns about whether enforcement resources will target wealthy tax evaders or harass small businesses and middle-class filers.",
    relatedSlugs: [
      "social-security-administration",
      "department-of-justice",
      "department-of-commerce",
    ],
  },
  {
    slug: "environmental-protection-agency",
    code: "EPA",
    fullName: "Environmental Protection Agency",
    description:
      "Sets and enforces environmental regulations for air and water quality, manages Superfund toxic waste cleanup, regulates pesticides and chemicals, and administers environmental grants to states. Its $25.6 billion in grants dwarfs its $1.7 billion contract budget.",
    accountability:
      "Critics question whether the agency's ever-expanding regulatory reach delivers environmental results proportional to its cost. The cumulative burden of EPA regulations on businesses and consumers runs into the hundreds of billions annually, and Superfund cleanup sites linger for decades — a testament to bureaucratic inertia rather than environmental progress.",
    relatedSlugs: [
      "department-of-energy",
      "department-of-the-interior",
      "department-of-agriculture",
    ],
  },
  {
    slug: "department-of-commerce",
    code: "DOC",
    fullName: "Department of Commerce",
    description:
      "Conducts the decennial census, monitors weather and oceans through NOAA, issues patents and trademarks, promotes economic development, and sets industrial standards through NIST. Manages $4.2 billion in contracts and $21.2 billion in grants.",
    accountability:
      "The department's grant portfolio has ballooned with broadband subsidies and climate research funding — programs where political priorities often outweigh cost-effectiveness. Commerce is a sprawling collection of loosely related agencies whose combined mission creep has turned it into a vehicle for industrial policy that picks winners and losers with taxpayer money.",
    relatedSlugs: [
      "department-of-the-treasury",
      "department-of-labor",
      "small-business-administration",
    ],
  },
  {
    slug: "department-of-labor",
    code: "DOL",
    fullName: "Department of Labor",
    description:
      "Enforces workplace safety through OSHA, administers unemployment insurance, sets wage and hour standards, manages federal job training programs, and collects labor market statistics through BLS. Distributes $9.8 billion in grants plus $1.8 billion in contracts.",
    accountability:
      "Job training programs have been repeatedly found to produce minimal long-term earnings gains for participants — a poor return on taxpayer investment. The department's regulatory apparatus imposes significant compliance costs on businesses, and unemployment insurance fraud during COVID exposed systemic weaknesses that cost taxpayers an estimated $163 billion.",
    relatedSlugs: [
      "department-of-education",
      "department-of-health-and-human-services",
      "social-security-administration",
    ],
  },
  {
    slug: "department-of-housing-and-urban-development",
    code: "HUD",
    fullName: "Department of Housing and Urban Development",
    description:
      "Administers federal housing programs including Section 8 vouchers, FHA mortgage insurance, and Community Development Block Grants. Enforces fair housing laws and funds homelessness assistance, distributing $28 billion almost entirely through grants.",
    accountability:
      "Despite decades of spending, homelessness and housing affordability have only worsened, raising fundamental questions about whether HUD's approach works. Public housing projects have a long history of mismanagement, and the department's own Inspector General regularly identifies billions in waste and fraud across its programs.",
    relatedSlugs: [
      "department-of-transportation",
      "department-of-health-and-human-services",
      "department-of-the-treasury",
    ],
  },
  {
    slug: "small-business-administration",
    code: "SBA",
    fullName: "Small Business Administration",
    description:
      "Provides loan guarantees, disaster loans, and counseling to small businesses. Manages government contracting set-asides for small and disadvantaged firms. Combined spending is modest at $325 million, but its loan guarantee programs are far larger.",
    accountability:
      "SBA's loan guarantee programs expose taxpayers to billions in potential losses. The PPP debacle during COVID — rife with fraud estimated at over $200 billion — showed what happens when SBA scales up without adequate controls. Even in normal times, the agency's definition of 'small business' is surprisingly elastic, allowing firms with hundreds of employees and millions in revenue to qualify.",
    relatedSlugs: [
      "department-of-commerce",
      "department-of-the-treasury",
      "department-of-labor",
    ],
  },
  {
    slug: "social-security-administration",
    code: "SSA",
    fullName: "Social Security Administration",
    description:
      "Administers Social Security retirement and disability benefits for over 70 million Americans. Manages the Supplemental Security Income program for aged, blind, and disabled individuals. Spends $1.7 billion on contracts to run the nation's largest entitlement program.",
    accountability:
      "With the trust fund projected to be depleted by the mid-2030s, every dollar spent on administration rather than benefits draws increasing scrutiny. The disability determination process is plagued by backlogs and inconsistency, and Congress has repeatedly raided the trust fund for other spending — leaving future retirees to foot the bill.",
    relatedSlugs: [
      "department-of-health-and-human-services",
      "department-of-the-treasury",
      "department-of-labor",
    ],
  },
  {
    slug: "office-of-personnel-management",
    code: "OPM",
    fullName: "Office of Personnel Management",
    description:
      "Manages the federal civilian workforce including hiring policies, retirement and health benefits for federal employees, and background investigations for security clearances. Spends $198 million in contracts to administer benefits for millions of current and retired federal workers.",
    accountability:
      "OPM's massive 2015 data breach — which exposed 22 million personnel records — remains a cautionary tale about government IT competence. The agency oversees a federal benefits system that is far more generous than private-sector equivalents, and its hiring processes are so slow and bureaucratic that agencies struggle to attract top talent despite offering job security that private employers can't match.",
    relatedSlugs: [
      "department-of-defense",
      "department-of-the-treasury",
      "department-of-veterans-affairs",
    ],
  },
];

/** Lookup by agency code (e.g. "DOD") */
export const agencyDescriptionsByCode: Record<string, AgencyDescription> =
  Object.fromEntries(agencyDescriptions.map((a) => [a.code, a]));

/** Lookup by URL slug (e.g. "department-of-defense") */
export const agencyDescriptionsBySlug: Record<string, AgencyDescription> =
  Object.fromEntries(agencyDescriptions.map((a) => [a.slug, a]));
