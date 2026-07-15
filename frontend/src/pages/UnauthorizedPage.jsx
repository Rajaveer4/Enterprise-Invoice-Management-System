import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4">
      <section className="max-w-md rounded-lg border border-line bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wider text-coral">Access blocked</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Unauthorized</h1>
        <p className="mt-3 text-slate-500">Your current role cannot open that workspace area.</p>
        <Link className="focus-ring mt-6 inline-flex rounded-md bg-mint px-4 py-2 font-semibold text-white" to="/">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
