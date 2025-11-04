import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "border-primary-base/10 text-default-base/90 placeholder:text-default-base/50 focus-visible:ring-primary-base/30 dark:border-primary-base-dark/10 dark:text-default-base-dark/90 dark:placeholder:text-default-base-dark/50 dark:focus-visible:ring-primary-base-dark/30 flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
