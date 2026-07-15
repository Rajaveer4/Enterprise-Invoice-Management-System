export default function SectionHeader({ title, eyebrow, actions }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wider text-mint">{eyebrow}</p> : null}
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
