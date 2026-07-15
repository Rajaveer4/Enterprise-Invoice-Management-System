import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import SectionHeader from '../components/SectionHeader';
import { useAsync } from '../hooks/useAsync';
import { getVendors } from '../services/vendorService';

export default function VendorsPage() {
  const { data, loading, error } = useAsync(getVendors, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SectionHeader title="Vendors" eyebrow="Master data" />
      {error ? <EmptyState title="Could not load vendors" message={error} /> : null}
      {!error && data?.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.map((vendor) => (
            <section key={vendor.id} className="rounded-lg border border-line bg-white p-5 shadow-soft">
              <p className="text-lg font-semibold text-ink">{vendor.vendorName}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="GST" value={vendor.gstNumber} />
                <Row label="PAN" value={vendor.panNumber} />
                <Row label="Email" value={vendor.email} />
                <Row label="Bank" value={vendor.bankAccount} />
              </dl>
            </section>
          ))}
        </div>
      ) : (
        !error && <EmptyState title="No vendors yet" message="Finance can create vendors before invoice upload." />
      )}
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
