import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function BrandMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <rect x="4.5" y="4.75" width="5.25" height="10.5" rx="2.625" />
      <path d="M9.75 7.375H15.5" />
      <path d="M9.75 12.625V12.625C9.75 14.6961 11.4289 16.375 13.5 16.375H14.625" />
      <circle cx="17.5" cy="7.5" r="1.65" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="16.5" r="1.65" fill="currentColor" stroke="none" />
    </svg>
  );
}
