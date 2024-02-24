import React from 'react'

const LoaderSkeleton = () => {
  return (
    <div className="relative flex w-full animate-pulse gap-x-3 rounded-sxl border bg-neutral-200 p-2.5">
      <div className="h-44 w-2/5 shrink-0 rounded-md bg-neutral-300" />

      <div className="flex grow flex-col justify-end gap-y-1.5">
        <div className="mb-auto space-y-1">
          <div className="h-7 w-full rounded-lg bg-neutral-300" />
          <div className="h-7 w-3/4 rounded-lg bg-neutral-300" />
        </div>

        <div className="flex gap-x-3">
          <div className="flex h-5 w-8 items-center rounded-md bg-neutral-300" />
          <div className="flex h-5 w-8 items-center rounded-md bg-neutral-300" />
        </div>

        <div className="flex h-4 w-[3/4] items-center rounded-md bg-neutral-300" />

        <div className="flex items-center gap-x-2 overflow-hidden">
          <div className="h-5 w-5 rounded-md bg-neutral-300" />
          <div className="h-5 w-5 rounded-md bg-neutral-300" />
          <div className="h-5 w-5 rounded-md bg-neutral-300" />
          <div className="h-5 w-5 rounded-md bg-neutral-300" />
          <div className="h-5 w-5 rounded-md bg-neutral-300" />
        </div>

        <div className="mt-1 flex items-center justify-end gap-x-2">
          <div className="h-7 w-14 rounded-md bg-neutral-300" />
          <div className="h-7 w-14 rounded-md bg-neutral-300" />
        </div>
      </div>
    </div>
  );
};

export default LoaderSkeleton;