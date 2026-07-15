import { statusTone, titleCase } from '../utils/formatters';

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded border px-2 py-1 text-xs font-semibold ${statusTone(status)}`}>
      {titleCase(status)}
    </span>
  );
}
