import { ContentSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <ContentSkeleton />
    </div>
  );
}
