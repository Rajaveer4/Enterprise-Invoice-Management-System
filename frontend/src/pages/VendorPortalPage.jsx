import { UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import EmptyState from '../components/EmptyState';
import InvoiceTable from '../components/InvoiceTable';
import LoadingState from '../components/LoadingState';
import SectionHeader from '../components/SectionHeader';
import { createInvoice, getInvoices } from '../services/invoiceService';
import { getVendors } from '../services/vendorService';

export default function VendorPortalPage() {
  const [vendors, setVendors] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    vendorId: '',
    amount: '',
    gstAmount: '',
    pdfUrl: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [vendorData, invoiceData] = await Promise.all([getVendors(), getInvoices()]);
      setVendors(vendorData);
      setInvoices(invoiceData);
      if (!form.vendorId && vendorData[0]) {
        setForm((current) => ({ ...current, vendorId: String(vendorData[0].id) }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load vendor portal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await createInvoice({
        ...form,
        vendorId: Number(form.vendorId),
        amount: Number(form.amount),
        gstAmount: Number(form.gstAmount),
      });
      setMessage('Invoice uploaded and placed in UPLOADED status.');
      setForm((current) => ({ ...current, invoiceNumber: '', amount: '', gstAmount: '', pdfUrl: '' }));
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not upload invoice');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <>
      <SectionHeader title="Vendor Portal" eyebrow="Upload and track" />
      <div className="grid gap-6 xl:grid-cols-5">
        <section className="rounded-lg border border-line bg-white p-5 shadow-soft xl:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-50 text-mint">
              <UploadCloud size={20} />
            </div>
            <h2 className="text-lg font-semibold text-ink">Upload invoice</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {message ? <Alert tone="success">{message}</Alert> : null}
            {error ? <Alert>{error}</Alert> : null}
            <Field label="Invoice number" value={form.invoiceNumber} onChange={(invoiceNumber) => setForm((c) => ({ ...c, invoiceNumber }))} />
            <Field label="Invoice date" type="date" value={form.invoiceDate} onChange={(invoiceDate) => setForm((c) => ({ ...c, invoiceDate }))} />
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-600">Vendor</span>
              <select
                required
                value={form.vendorId}
                onChange={(event) => setForm((c) => ({ ...c, vendorId: event.target.value }))}
                className="focus-ring w-full rounded-md border border-line px-3 py-2"
              >
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>{vendor.vendorName}</option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Amount" type="number" value={form.amount} onChange={(amount) => setForm((c) => ({ ...c, amount }))} />
              <Field label="GST amount" type="number" value={form.gstAmount} onChange={(gstAmount) => setForm((c) => ({ ...c, gstAmount }))} />
            </div>
            <Field label="PDF URL" required={false} value={form.pdfUrl} onChange={(pdfUrl) => setForm((c) => ({ ...c, pdfUrl }))} />
            <button type="submit" disabled={saving} className="focus-ring w-full rounded-md bg-mint px-4 py-3 font-semibold text-white disabled:opacity-60">
              {saving ? 'Uploading...' : 'Upload invoice'}
            </button>
          </form>
        </section>

        <section className="xl:col-span-3">
          <h2 className="mb-4 text-lg font-semibold text-ink">Status tracking</h2>
          {invoices.length ? (
            <InvoiceTable invoices={invoices} />
          ) : (
            <EmptyState title="No invoice history" message="Uploaded invoices will appear here with current status." />
          )}
        </section>
      </div>
    </>
  );
}

function Field({ label, value, onChange, type = 'text', required = true }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring w-full rounded-md border border-line px-3 py-2"
      />
    </label>
  );
}
