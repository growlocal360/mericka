import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * The standard red CTA button used site-wide: links to /contact, says
 * "Get In Touch", and has the animated arrow (matches the footer button).
 */
export default function GetInTouchButton({
  size = "md",
  className = "",
  onClick,
}: {
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
}) {
  const pad = size === "sm" ? "px-5 py-2.5" : "px-6 py-3.5";
  return (
    <Link
      href="/contact"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg bg-brand-highlight ${pad} font-semibold text-white transition hover:brightness-110 ${className}`}
    >
      Get In Touch
      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
