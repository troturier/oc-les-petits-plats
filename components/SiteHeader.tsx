import Link from "next/link";

/**
 * Logo bar. It is absolutely positioned because every page of the site starts
 * with a full-width banner the logo has to sit on top of.
 */
export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="px-6 py-8 sm:px-[69px] sm:py-[51px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-xl tracking-wide text-white uppercase sm:text-2xl"
        >
          Les petits plats
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
