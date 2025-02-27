const ProjectImagePlaceholder = () => {
  return (
    <div className="from-primary-base/5 via-background-base to-accent-base/5 dark:from-primary-base-dark/5 dark:via-background-base-dark dark:to-accent-base-dark/5 relative flex h-full w-full items-center justify-center bg-linear-to-br p-6">
      <div className="text-center">
        <div className="text-primary-base/60 dark:text-primary-base-dark/60 mb-3 font-mono text-sm">
          <div className="mb-2">$ image not found</div>
          <div className="flex items-center justify-center gap-1">
            <span className="bg-accent-base/60 dark:bg-accent-base-dark/60 h-1.5 w-1.5 animate-pulse rounded-full" />
            <span className="bg-accent-base/60 dark:bg-accent-base-dark/60 h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:150ms]" />
            <span className="bg-accent-base/60 dark:bg-accent-base-dark/60 h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:300ms]" />
          </div>
        </div>
        <div className="font-space-grotesk text-default-base/50 dark:text-default-base-dark/50 text-sm">
          404: Project preview unavailable
        </div>
      </div>

      {/* Terminal-style decorative elements */}
      <div className="absolute top-6 left-6 flex gap-1.5">
        <div className="bg-primary-base/20 dark:bg-primary-base-dark/20 h-2 w-2 rounded-full" />
        <div className="bg-primary-base/20 dark:bg-primary-base-dark/20 h-2 w-2 rounded-full" />
        <div className="bg-primary-base/20 dark:bg-primary-base-dark/20 h-2 w-2 rounded-full" />
      </div>
    </div>
  );
};

export default ProjectImagePlaceholder;
