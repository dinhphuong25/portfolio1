import { CardSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto py-6 px-6">
      <div className="mb-8 space-y-4">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-900 rounded-md animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
