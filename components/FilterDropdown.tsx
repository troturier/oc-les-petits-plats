/** Closed state of an advanced-search selector. Made interactive in step 6. */
export default function FilterDropdown({ label }: { label: string }) {
  return (
    <div className="w-full sm:w-[195px]">
      <button
        type="button"
        className="text-brand-black flex h-[56px] w-full items-center justify-between rounded-[11px] bg-white px-4 text-base font-medium"
      >
        {label}
        <svg
          viewBox="0 0 14 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-[13px]"
          aria-hidden="true"
        >
          <path d="M1 1l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
