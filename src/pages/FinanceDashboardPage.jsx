import { ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import ActionModal from '../components/ActionModal';
import EmptyState from '../components/EmptyState';
import InvoiceTable from '../components/InvoiceTable';
import LoadingState from '../components/LoadingState';
import SectionHeader from '../components/SectionHeader';
import { useAsync } from '../hooks/useAsync';
import { getInvoices, reviewInvoice } from '../services/invoiceService';

export default function FinanceDashboardPage() {
  const { data, loading, error, reload } = useAsync(getInvoices, []);
  const [selected, setSelected] = useState(null);
  const reviewQueue = (data || []).filter((invoice) => invoice.status === 'UPLOADED');

  if (loading) return <LoadingState />;

  return (
    <>
      <SectionHeader title="Finance Review" eyebrow="GST validation and forwarding" />
      {error ? <EmptyState title="Could not load review queue" message={error} /> : null}
      {!error && reviewQueue.length ? (
        <InvoiceTable
          invoices={reviewQueue}
          actions={(invoice) => (
            <button
              type="button"
              onClick={() => setSelected(invoice)}
              className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line text-mint hover:bg-slate-100"
              aria-label={`Review ${invoice.invoiceNumber}`}
              title="Move to review"
            >
              <ClipboardCheck size={17} />
            </button>
          )}
        />
      ) : (
        !error && <EmptyState title="No invoices waiting for finance" message="Uploaded invoices will enter this queue first." />
      )}
      {selected ? (
        <ActionModal
          title={`Review ${selected.invoiceNumber}`}
          description="Add GST validation notes and move this invoice to manager review."
          submitLabel="Mark under review"
          fields={[{ name: 'remarks', label: 'Remarks', type: 'textarea', defaultValue: 'GST and invoice amount validated.' }]}
          onClose={() => setSelected(null)}
          onSubmit={async ({ remarks }) => {
            await reviewInvoice(selected.id, remarks);
            await reload();
          }}
        />
      ) : null}
    </>
  );
}
