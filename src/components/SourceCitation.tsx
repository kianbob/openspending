export function SourceCitation() {
  return (
    <div className="border-t border-gray-200 mt-8 pt-4">
      <p className="text-sm text-gray-500">
        Source:{" "}
        <a
          href="https://usaspending.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          USASpending.gov
        </a>{" "}
        &middot; U.S. Department of the Treasury
      </p>
    </div>
  );
}
