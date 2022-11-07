const ROWS = Array.from({ length: 4 }).map((_x, index) => index);

export default function LoadingIndicator({ fromSuspense }: { fromSuspense?: boolean }) {
  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        Loading GitHub repositories...
      </div>
      <div
        className="my-5 w-1/3 animate-pulse rounded-md bg-slate-300/20 px-3 text-xl font-medium text-slate-300/50"
        aria-hidden="true"
      >
        {fromSuspense ? "Using suspense boundary..." : "Using loading conditional..."}
      </div>
      <p
        className="w-2/3 animate-pulse rounded-md bg-slate-300/20 indent-[-9999px]"
        aria-hidden="true"
      >
        Description
      </p>
      <div className="mt-20 space-y-3">
        {ROWS.map((rowId) => (
          <div
            key={rowId}
            className="h-[70px] animate-pulse rounded-md bg-darkmode-600 indent-[-9999px]"
            aria-hidden="true"
          >
            Row
          </div>
        ))}
      </div>
    </>
  );
}
