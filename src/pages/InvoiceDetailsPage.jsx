import { CreditCard, ExternalLink, FileText } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ActionModal from '../components/ActionModal';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import SectionHeader from '../components/SectionHeader';
import StatusBadge from '../components/StatusBadge';
import Timeline from '../components/Timeline';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { completePayment, getApprovalHistory, getAuditLogs, getInvoice } from '../services/invoiceService';
import { currency, shortDate } from '../utils/formatters';

export default function InvoiceDetailsPage() {
  const { id } = useParams();
  const { role } = useAuth();
  const invoice = useAsync(() => getInvoice(id), [id]);
  const approvals = useAsync(() => getApprovalHistory(id), [id]);
  const auditLogs = useAsync(() => getAuditLogs(id), [id]);
  const [paymentOpen, setPaymentOpen] = useState(false);

  if (invoice.loading || approvals.loading || auditLogs.loading) return <LoadingState />;
  if (invoice.error) return <EmptyState title="Invoice not found" message={invoice.error} />;

  const item = invoice.data;
  const canPay = ['ADMIN', 'FINANCE_EXECUTIVE'].includes(role) && item.status === 'APPROVED';

  return (
    <>
      <SectionHeader
        title={`Invoice ${item.invoiceNumber}`}
        eyebrow="Lifecycle details"
        actions={
          <>
            <Link className="focus-ring rounded-md border border-line bg-white px-4 py-2 font-medium text-slate-700" to="/invoices">
              Back
            </Link>
            {canPay ? (
              <button
                type="button"
                onClick={() => setPaymentOpen(true)}
                className="focus-ring inline-flex items-center gap-2 rounded-md bg-mint px-4 py-2 font-semibold text-white"
              >
                <CreditCard size={17} />
                Mark paid
              </button>
            ) : null}
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-lg border border-line bg-white p-5 shadow-soft xl:col-span-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Current status</p>
              <div className="mt-2"><StatusBadge status={item.status} /></div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-50 text-mint">
              <FileText size={20} />
            </div>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Vendor" value={item.vendorName} />
            <Row label="Invoice date" value={shortDate(item.invoiceDate)} />
            <Row label="Amount" value={currency(item.amount)} />
            <Row label="GST" value={currency(item.gstAmount)} />
            <Row label="Created" value={shortDate(item.createdAt)} />
          </dl>
          {item.pdfUrl ? (
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-slate-700"
            >
              <ExternalLink size={16} />
              Open PDF
            </a>
          ) : null}
        </section>

        <div className="space-y-6 xl:col-span-2">
          <Timeline invoice={item} approvals={approvals.data || []} />
          <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-ink">Approval history</h2>
            <div className="mt-4 space-y-3">
              {(approvals.data || []).length ? approvals.data.map((approval) => (
                <div key={approval.id} className="rounded-md border border-line p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-ink">{approval.action}</p>
                    <p className="text-xs text-slate-500">{shortDate(approval.actionTime)}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{approval.remarks}</p>
                  <p className="mt-2 text-xs text-slate-500">By {approval.approvedByName || 'System'}</p>
                </div>
              )) : <EmptyState title="No approval events" message="The workflow timeline will populate as roles act on this invoice." />}
            </div>
          </section>

          <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-ink">Audit trail</h2>
            <div className="mt-4 space-y-3">
              {(auditLogs.data || []).length ? auditLogs.data.map((log) => (
                <div key={log.id} className="rounded-md border border-line p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-ink">{log.action}</p>
                    <p className="text-xs text-slate-500">{shortDate(log.timestamp)}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{log.details}</p>
                  <p className="mt-2 text-xs text-slate-500">Performed by {log.performedBy}</p>
                </div>
              )) : <EmptyState title="No audit logs" message="Audit records are generated automatically by workflow actions." />}
            </div>
          </section>
        </div>
      </div>

      {paymentOpen ? (
        <ActionModal
          title={`Mark ${item.invoiceNumber} as paid`}
          description="Payment completion moves the invoice from APPROVED to PAID."
          submitLabel="Save payment"
          fields={[
            { name: 'amount', label: 'Payment amount', type: 'number', defaultValue: item.amount },
            { name: 'paymentReference', label: 'Payment reference' },
            { name: 'paymentDate', label: 'Payment date', type: 'date', defaultValue: new Date().toISOString().slice(0, 10) },
          ]}
          onClose={() => setPaymentOpen(false)}
          onSubmit={async (payload) => {
            await completePayment(id, { ...payload, amount: Number(payload.amount) });
            await invoice.reload();
            await auditLogs.reload();
          }}
        />
      ) : null}
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
