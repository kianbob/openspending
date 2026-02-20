'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  title: string;
  desc: string;
}

interface DropdownSection {
  label: string;
  items: NavItem[];
}

const dropdowns: DropdownSection[] = [
  {
    label: 'Explore',
    items: [
      { href: '/agencies', title: 'Agencies', desc: '97 federal agency profiles' },
      { href: '/contractors', title: 'Contractors', desc: 'Top federal contractors' },
      { href: '/states', title: 'States', desc: 'Spending by state' },
      { href: '/contracts', title: 'Contracts', desc: 'Largest contracts' },
      { href: '/grants', title: 'Grants', desc: '$1.24T to states & orgs' },
      { href: '/industries', title: 'Industries', desc: 'By NAICS sector' },
      { href: '/what-they-buy', title: 'What They Buy', desc: 'Products & services purchased' },
      { href: '/local-spending', title: 'Local Spending', desc: 'County & district spending' },
    ],
  },
  {
    label: 'Analysis',
    items: [
      { href: '/trends', title: 'Spending Trends', desc: 'Year-over-year analysis' },
      { href: '/covid', title: 'COVID Spending', desc: '$1.46T pandemic response' },
      { href: '/usaid', title: 'USAID Deep Dive', desc: 'Foreign aid spending' },
      { href: '/foreign-aid', title: 'Foreign Aid', desc: 'Global spending map' },
      { href: '/efficiency', title: 'Government Efficiency', desc: 'Accountability tracker' },
      { href: '/doge-reality', title: 'DOGE Reality Check', desc: 'Claims vs actual spending data' },
      { href: '/your-tax-bill', title: 'Your Tax Bill', desc: '$33,135 per taxpayer breakdown' },
      { href: '/spending-explosion', title: 'Spending Explosion', desc: 'Which agencies grew fastest' },
      { href: '/global-comparison', title: 'US vs The World', desc: 'How American spending compares globally' },
      { href: '/national-debt', title: 'National Debt Clock', desc: 'The $36 trillion debt tracker' },
      { href: '/international-spending', title: 'International Spending', desc: 'Where US dollars go abroad' },
      { href: '/program-growth', title: 'Entitlement Explosion', desc: 'Programs that grew 100%+' },
      { href: '/federal-accounts', title: 'Federal Accounts', desc: 'Where your money actually goes' },
      { href: '/monthly-pulse', title: 'Monthly Pulse', desc: 'Real-time spending dashboard' },
    ],
  },
  {
    label: 'Investigations',
    items: [
      { href: '/investigations', title: 'All Investigations', desc: 'Editorial hub' },
      { href: '/spending-analysis', title: 'Spending Analysis', desc: 'Where the money goes' },
      { href: '/top-10', title: 'Top 10 Contractors', desc: 'Companies that run government' },
      { href: '/pentagon-spending', title: 'Pentagon Spending', desc: 'Defense budget deep dive' },
      { href: '/healthcare-spending', title: 'Healthcare Spending', desc: 'The healthcare machine' },
      { href: '/no-bid', title: 'No-Bid Nation', desc: 'When competition dies' },
      { href: '/waste', title: 'Waste & Fraud', desc: 'Tracking government waste' },
      { href: '/contractor-monopoly', title: 'Contractor Monopoly', desc: '10 companies, 64% of contracts' },
      { href: '/interest', title: 'Interest Time Bomb', desc: '$952B in debt interest' },
      { href: '/state-dependency', title: 'State Dependency', desc: 'Donors vs takers' },
      { href: '/how-it-works', title: 'How It Works', desc: 'Federal spending explained' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { href: '/tax-calculator', title: 'Tax Calculator', desc: 'Where your tax dollars go' },
      { href: '/compare', title: 'Compare', desc: 'Side-by-side analysis' },
      { href: '/search', title: 'Search', desc: 'Search everything' },
      { href: '/downloads', title: 'Downloads', desc: 'Data files' },
      { href: '/shutdown-calculator', title: 'Shutdown Calculator', desc: 'Cost of government shutdowns' },
      { href: '/spending-speed', title: 'Spending Speed', desc: '$169K every second' },
    ],
  },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className || 'w-3.5 h-3.5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DesktopDropdown({ section }: { section: DropdownSection }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {section.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-1 z-50">
          <div className="min-w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 hover:bg-indigo-50 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span className="block font-medium text-gray-900 text-sm">{item.title}</span>
                <span className="block text-xs text-gray-500">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({ section }: { section: DropdownSection }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {section.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-2">
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-6 py-2 hover:bg-indigo-50 transition-colors"
            >
              <span className="block text-sm font-medium text-gray-900">{item.title}</span>
              <span className="block text-xs text-gray-500">{item.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav aria-label="Main navigation" className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-indigo-700 tracking-tight"
          >
            OpenSpending
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {dropdowns.map((section) => (
              <DesktopDropdown key={section.label} section={section} />
            ))}
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
            >
              About
            </Link>
            <Link
              href="/search"
              className="ml-1 px-3 py-2 text-gray-600 hover:text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-indigo-700"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <Link
            href="/search"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 border-b border-gray-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Link>
          {dropdowns.map((section) => (
            <MobileAccordion key={section.label} section={section} />
          ))}
          <Link
            href="/about"
            className="block px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider hover:bg-indigo-50 transition-colors"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
