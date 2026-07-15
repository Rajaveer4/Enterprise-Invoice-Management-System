import { CheckCircle2, Clock3 } from 'lucide-react';
import { shortDate, titleCase } from '../utils/formatters';

const steps = ['UPLOADED', 'UNDER_REVIEW', 'APPROVED', 'PAID'];

export default function Timeline({ invoice, approvals }) {
  const currentIndex = invoice?.status === 'REJECTED'
    ? steps.indexOf('UNDER_REVIEW')
    : steps.indexOf(invoice?.status);

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">Approval timeline</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => {
          const complete = index <= currentIndex;
          const approval = approvals.find((item) => item.action === step.replace('UNDER_REVIEW', 'REVIEWED'));
          return (
            <div key={step} className="relative rounded-md border border-line p-4">
              <div className={`mb-3 grid h-9 w-9 place-items-center rounded-full ${complete ? 'bg-mint text-white' : 'bg-slate-100 text-slate-400'}`}>
                {complete ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}
              </div>
              <p className="font-semibold text-ink">{titleCase(step)}</p>
              <p className="mt-1 text-xs text-slate-500">{approval ? shortDate(approval.actionTime) : complete ? 'Completed' : 'Waiting'}</p>
            </div>
          );
        })}
      </div>
      {invoice?.status === 'REJECTED' ? (
        <div className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Rejected: {approvals.find((item) => item.action === 'REJECTED')?.remarks || 'No remarks provided'}
        </div>
      ) : null}
    </div>
  );
}
