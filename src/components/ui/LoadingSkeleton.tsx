export const LoadingSkeleton = ({ rows = 3 }: { rows?: number }) => (
  <div className="animate-pulse space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-4 rounded bg-slate-200 dark:bg-slate-700" />
    ))}
  </div>
);
