import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { currency, shortDate } from '../utils/formatters';

export default function InvoiceTable({ invoices, actions }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line">
          <thead className="bg-slate-50">
            <tr>
              {['Invoice', 'Vendor', 'Date', 'Amount', 'Status', ''].map((heading) => (
                <th key={heading} className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">{invoice.invoiceNumber}</p>
                  <p className="text-xs text-slate-500">ID {invoice.id}</p>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{invoice.vendorName}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{shortDate(invoice.invoiceDate)}</td>
                <td className="px-4 py-3 text-sm font-semibold text-ink">{currency(invoice.amount)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {actions ? actions(invoice) : null}
                    <Link
                      to={`/invoices/${invoice.id}`}
                      className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line text-slate-600 hover:bg-slate-100"
                      aria-label={`View ${invoice.invoiceNumber}`}
                      title="View invoice"
                    >
                      <Eye size={17} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
