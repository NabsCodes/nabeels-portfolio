import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CustomToastProps {
  title: string;
  message: string;
  variant: "success" | "error";
}

export function CustomToast({ title, message, variant }: CustomToastProps) {
  return (
    <Alert
      variant={variant === "success" ? "default" : "destructive"}
      className={`z-50 w-[356px] border ${
        variant === "success"
          ? "border-emerald-500 bg-emerald-100 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-900 dark:text-emerald-100"
          : "border-red-500 bg-red-100 text-red-800 dark:border-red-500 dark:bg-red-900 dark:text-red-100"
      }`}
    >
      <div className="flex items-start gap-2">
        {variant === "success" ? (
          <CheckCircle2 className="mt-[2px] h-4 w-4 shrink-0" />
        ) : (
          <AlertCircle className="mt-[2px] h-4 w-4 shrink-0" />
        )}
        <div>
          <AlertTitle className="text-sm leading-none font-medium">
            {title}
          </AlertTitle>
          <AlertDescription className="mt-1 text-xs">
            {message}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
