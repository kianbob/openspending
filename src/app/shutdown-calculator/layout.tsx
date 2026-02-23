import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Shutdown Calculator 2025 | OpenSpending",
  description: "Each shutdown day costs taxpayers $400M and furloughs 800,000 workers. Enter any duration and see the real price of congressional dysfunction.",
  openGraph: {
    title: "Government Shutdown Calculator 2025 | OpenSpending",
    description: "Each shutdown day costs taxpayers $400M and furloughs 800,000 workers. Enter any duration and see the real price of congressional dysfunction.",
    url: "https://www.openspending.us/shutdown-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
