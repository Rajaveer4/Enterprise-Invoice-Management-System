import EmptyState from '../components/EmptyState';
import InvoiceTable from '../components/InvoiceTable';
import LoadingState from '../components/LoadingState';
import SectionHeader from '../components/SectionHeader';
import { useAsync } from '../hooks/useAsync';
import { getInvoices } from '../services/invoiceService';

export default function InvoicesPage() {
  const { data, loading, error } = useAsync(getInvoices, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SectionHeader title="Invoices" eyebrow="Searchable register" />
      {error ? <EmptyState title="Could not load invoices" message={error} /> : null}
      {!error && data?.length ? (
        <InvoiceTable invoices={data} />
      ) : (
        !error && <EmptyState title="No invoices yet" message="Upload an invoice from the vendor portal to start the workflow." />
      )}
    </>
  );
}
