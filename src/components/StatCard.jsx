export default function StatCard({ label, value, icon: Icon, tone = 'text-mint', detail }) {
  return (
    <section className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
        </div>
        {Icon ? (
          <div className={`grid h-10 w-10 place-items-center rounded-md bg-slate-50 ${tone}`}>
            <Icon size={21} />
          </div>
        ) : null}
      </div>
      {detail ? <p className="mt-3 text-sm text-slate-500">{detail}</p> : null}
    </section>
  );
}
