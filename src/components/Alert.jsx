export default function Alert({ children, tone = 'error' }) {
  const styles = tone === 'success'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : 'border-rose-200 bg-rose-50 text-rose-700';
  return <div className={`rounded-md border px-4 py-3 text-sm ${styles}`}>{children}</div>;
}
