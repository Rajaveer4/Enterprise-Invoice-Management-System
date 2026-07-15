import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { useAuth } from '../context/AuthContext';
import { AuthShell, Field } from './LoginPage';

const roles = ['ADMIN', 'FINANCE_EXECUTIVE', 'MANAGER', 'VENDOR'];

export default function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'VENDOR',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signUp(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Create account" subtitle="Choose the role you want to test in the workflow.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? <Alert>{error}</Alert> : null}
        <Field label="Name" value={form.name} onChange={(name) => setForm((current) => ({ ...current, name }))} />
        <Field label="Email" type="email" value={form.email} onChange={(email) => setForm((current) => ({ ...current, email }))} />
        <Field label="Password" type="password" value={form.password} onChange={(password) => setForm((current) => ({ ...current, password }))} />
        <Field label="Role" as="select" value={form.role} onChange={(role) => setForm((current) => ({ ...current, role }))}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.replaceAll('_', ' ')}
            </option>
          ))}
        </Field>
        <button
          type="submit"
          disabled={loading}
          className="focus-ring w-full rounded-md bg-mint px-4 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-500">
        Already registered?{' '}
        <Link className="font-semibold text-mint hover:text-teal-700" to="/login">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
