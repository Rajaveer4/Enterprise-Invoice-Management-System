import { X } from 'lucide-react';
import { useState } from 'react';
import Alert from './Alert';

export default function ActionModal({ title, description, fields, submitLabel, onClose, onSubmit }) {
  const [form, setForm] = useState(
    Object.fromEntries(fields.map((field) => [field.name, field.defaultValue || ''])),
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4">
      <section className="w-full max-w-lg rounded-lg border border-line bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-line text-slate-600"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {error ? <Alert>{error}</Alert> : null}
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-1 block text-sm font-medium text-slate-600">{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea
                  required={field.required !== false}
                  value={form[field.name]}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  rows={4}
                  className="focus-ring w-full rounded-md border border-line px-3 py-2"
                />
              ) : (
                <input
                  required={field.required !== false}
                  type={field.type || 'text'}
                  value={form[field.name]}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  className="focus-ring w-full rounded-md border border-line px-3 py-2"
                />
              )}
            </label>
          ))}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="focus-ring rounded-md border border-line px-4 py-2 font-medium">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="focus-ring rounded-md bg-mint px-4 py-2 font-semibold text-white disabled:opacity-60">
              {loading ? 'Saving...' : submitLabel}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
