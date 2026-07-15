import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signIn(form);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue your invoice workflow.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? <Alert>{error}</Alert> : null}
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(email) => setForm((current) => ({ ...current, email }))}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(password) => setForm((current) => ({ ...current, password }))}
        />
        <button
          type="submit"
          disabled={loading}
          className="focus-ring w-full rounded-md bg-mint px-4 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-500">
        New workspace?{' '}
        <Link className="font-semibold text-mint hover:text-teal-700" to="/register">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}

export function Field({ label, value, onChange, type = 'text', as = 'input', children, required = true }) {
  const Component = as;
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600">{label}</span>
      {as === 'select' ? (
        <select
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-ink"
        >
          {children}
        </select>
      ) : (
        <input
          required={required}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-ink"
        />
      )}
    </label>
  );
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-line bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wider text-mint">InvoiceFlow</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
