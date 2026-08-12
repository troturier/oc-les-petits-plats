export default function SelectedTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Retirer le filtre ${label}`}
      onClick={onRemove}
      className="bg-brand-yellow flex h-[53px] min-w-[195px] items-center justify-between gap-4 rounded-[11px] px-[18px] text-left text-sm"
    >
      {label}
      <span aria-hidden="true" className="text-base">
        ✕
      </span>
    </button>
  );
}
