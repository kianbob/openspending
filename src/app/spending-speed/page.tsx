import { SpendingCounter } from "@/components/SpendingCounter";

export const metadata = {
  title: "Spending by the Second: The Speed of Government Money — OpenSpending",
  description:
    "The US government spends $169,013 every second. Watch it tick in real-time and see how fast $5.33 trillion/year really moves.",
  openGraph: {
    title: "Spending by the Second: The Speed of Government Money",
    description:
      "Every second, the US government spends enough to buy a house. Watch the counter tick in real-time.",
  },
};

const comparisons = [
  {
    emoji: "☕",
    activity: "Brewing coffee",
    duration: "5 minutes",
    amount: "$50.7 million",
  },
  {
    emoji: "📺",
    activity: "Watching a TV show",
    duration: "30 minutes",
    amount: "$304 million",
  },
  {
    emoji: "💼",
    activity: "An 8-hour workday",
    duration: "8 hours",
    amount: "$4.9 billion",
  },
  {
    emoji: "😴",
    activity: "While you sleep",
    duration: "8 hours",
    amount: "$4.9 billion",
  },
  {
    emoji: "🍕",
    activity: "Ordering and eating lunch",
    duration: "45 minutes",
    amount: "$456 million",
  },
  {
    emoji: "🏃",
    activity: "Running a marathon",
    duration: "~4 hours",
    amount: "$2.4 billion",
  },
  {
    emoji: "✈️",
    activity: "Flying NYC → LA",
    duration: "5.5 hours",
    amount: "$3.3 billion",
  },
  {
    emoji: "🎬",
    activity: "Watching a movie",
    duration: "2 hours",
    amount: "$1.2 billion",
  },
];

export default function SpendingSpeedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Spending by the Second
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        The speed of government money — $5.33 trillion per year, visualized in
        real time.
      </p>

      {/* Live counter */}
      <SpendingCounter />

      {/* Viral comparison */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
        <p className="text-amber-900 text-sm">
          <span className="font-bold">Put it this way:</span> Every single
          second, the federal government spends enough to buy a house. Every
          minute, it spends more than most Americans earn in a lifetime.
        </p>
      </div>

      {/* Time comparisons */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        How Much Gets Spent While You...
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {comparisons.map((c) => (
          <div
            key={c.activity}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">{c.emoji}</div>
            <div className="font-semibold text-gray-900">{c.activity}</div>
            <div className="text-xs text-gray-500 mb-2">{c.duration}</div>
            <div className="text-xl font-bold text-green-600">{c.amount}</div>
          </div>
        ))}
      </div>

      {/* Breakdown */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Breaking Down $5.33 Trillion
      </h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-3 font-medium text-gray-600">
                Time Period
              </th>
              <th className="text-right p-3 font-medium text-gray-600">
                Amount Spent
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Per second", "$169,013"],
              ["Per minute", "$10,140,791"],
              ["Per hour", "$608,447,489"],
              ["Per day", "$14.6 billion"],
              ["Per week", "$102.3 billion"],
              ["Per month", "$444.2 billion"],
              ["Per year", "$5.33 trillion"],
            ].map(([period, amount]) => (
              <tr key={period} className="border-b border-gray-100">
                <td className="p-3 text-gray-900">{period}</td>
                <td className="p-3 text-right font-mono font-medium text-gray-900">
                  {amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Share CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 text-center">
        <p className="text-lg font-semibold text-gray-900 mb-1">
          Share this with someone who doesn&apos;t know
        </p>
        <p className="text-sm text-gray-500">
          The government spends $169,013 every second. Most people have no idea.
        </p>
      </div>
    </div>
  );
}
