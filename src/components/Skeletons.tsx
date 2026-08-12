"use client";

import { motion } from "framer-motion";

export const Skeleton = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
    className={`bg-slate-200 dark:bg-slate-800 rounded-md ${className}`}
  />
);

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4">
    <Skeleton className="w-full h-48 rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="w-16 h-6 rounded-full" />
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div className="max-w-3xl mx-auto space-y-6">
    <Skeleton className="w-1/2 h-10" />
    <div className="flex gap-4">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-24 h-4" />
    </div>
    <Skeleton className="w-full h-64 rounded-2xl" />
    <div className="space-y-4">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-2/3 h-4" />
    </div>
  </div>
);
