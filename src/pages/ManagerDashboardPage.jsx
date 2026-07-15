import { CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import ActionModal from '../components/ActionModal';
import EmptyState from '../components/EmptyState';
import InvoiceTable from '../components/InvoiceTable';
import LoadingState from '../components/LoadingState';
import SectionHeader from '../components/SectionHeader';
import { useAsync } from '../hooks/useAsync';
import { approveInvoice, getInvoices, rejectInvoice } from '../services/invoiceService';

export default function ManagerDashboardPage() {
  const { data, loading, error, reload } = useAsync(getInvoices, []);
  const [action, setAction] = useState(null);
  const approvalQueue = (data || []).filter((invoice) => invoice.status === 'UNDER_REVIEW');

  if (loading) return <LoadingState />;

  return (
    <>
      <SectionHeader title="Manager Approval" eyebrow="Decision workspace" />
      {error ? <EmptyState title="Could not load approval queue" message={error} /> : null}
      {!error && approvalQueue.length ? (
        <InvoiceTable
          invoices={approvalQueue}
          actions={(invoice) => (
            <>
              <button
                type="button"
                onClick={() => setAction({ type: 'approve', invoice })}
                className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line text-emerald-600 hover:bg-slate-100"
                aria-label={`Approve ${invoice.invoiceNumber}`}
                title="Approve"
              >
                <CheckCircle2 size={17} />
              </button>
              <button
                type="button"
                onClick={() => setAction({ type: 'reject', invoice })}
                className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line text-coral hover:bg-slate-100"
                aria-label={`Reject ${invoice.invoiceNumber}`}
                title="Reject"
              >
                <XCircle size={17} />
              </button>
            </>
          )}
        />
      ) : (
        !error && <EmptyState title="No invoices waiting for approval" message="Finance-reviewed invoices will appear here." />
      )}
      {action ? (
        <ActionModal
          title={`${action.type === 'approve' ? 'Approve' : 'Reject'} ${action.invoice.invoiceNumber}`}
          description="Your decision is recorded in approval history and audit logs."
          submitLabel={action.type === 'approve' ? 'Approve invoice' : 'Reject invoice'}
          fields={[{ name: 'remarks', label: 'Remarks', type: 'textarea', defaultValue: action.type === 'approve' ? 'Approved for payment.' : 'Rejected due to mismatch.' }]}
          onClose={() => setAction(null)}
          onSubmit={async ({ remarks }) => {
            if (action.type === 'approve') {
              await approveInvoice(action.invoice.id, remarks);
            } else {
              await rejectInvoice(action.invoice.id, remarks);
            }
            await reload();
          }}
        />
      ) : null}
    </>
  );
}
