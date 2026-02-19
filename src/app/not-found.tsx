import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-indigo-600 mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
          This page doesn&apos;t exist
        </h1>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for may have been moved or removed.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
