import Link from "next/link";

type RelatedPageItem = {
  href: string;
  title: string;
  description: string;
};

export function RelatedPages({ items }: { items: RelatedPageItem[] }) {
  return (
    <section className="border-t border-gray-200 pt-8 mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm hover:bg-indigo-50/30 transition-all"
          >
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            <span className="text-indigo-600 text-sm mt-2 inline-block">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
