import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";

export function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform group-hover:-rotate-6">
        <FlaskConical className="h-5 w-5" />
      </span>
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          light ? "text-primary-foreground" : "text-brand-navy"
        }`}
      >
        Bright<span className="text-brand-red">Spark</span>
      </span>
    </Link>
  );
}