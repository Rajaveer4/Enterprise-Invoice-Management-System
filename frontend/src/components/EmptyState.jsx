export default function EmptyState({ title, message }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
      <p className="font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
    </div>
  );
}
