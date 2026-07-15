export function currency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function shortDate(value) {
  if (!value) return 'Not set';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function titleCase(value) {
  return String(value || '')
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function statusTone(status) {
  const tones = {
    UPLOADED: 'bg-sky-50 text-sky-700 border-sky-200',
    UNDER_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
    APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
    PAID: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };
  return tones[status] || 'bg-slate-50 text-slate-700 border-slate-200';
}
