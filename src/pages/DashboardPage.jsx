import { CheckCircle2, Clock3, CreditCard, FileText, XCircle } from 'lucide-react';
import { Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import LoadingState from '../components/LoadingState';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useAsync } from '../hooks/useAsync';
import { getDashboardSummary } from '../services/dashboardService';
import { getInvoices } from '../services/invoiceService';
import { currency, shortDate } from '../utils/formatters';

const colors = ['#2f9f8f', '#d4a72c', '#e76f51', '#9b5de5', '#3b82f6'];

export default function DashboardPage() {
  const summary = useAsync(getDashboardSummary, []);
  const invoices = useAsync(getInvoices, []);

  if (summary.loading || invoices.loading) return <LoadingState />;

  const stats = summary.data || {};
  const statusData = [
    { name: 'Pending', value: stats.pendingInvoices || 0 },
    { name: 'Approved', value: stats.approvedInvoices || 0 },
    { name: 'Rejected', value: stats.rejectedInvoices || 0 },
    { name: 'Paid', value: stats.paidInvoices || 0 },
  ];
  const trendData = buildMonthlyTrend(invoices.data || []);

  return (
    <>
      <SectionHeader title="Enterprise Dashboard" eyebrow="Workflow intelligence" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Invoices" value={stats.totalInvoices || 0} icon={FileText} />
        <StatCard label="Pending Reviews" value={stats.pendingInvoices || 0} icon={Clock3} tone="text-gold" />
        <StatCard label="Approved" value={stats.approvedInvoices || 0} icon={CheckCircle2} tone="text-emerald-600" />
        <StatCard label="Rejected" value={stats.rejectedInvoices || 0} icon={XCircle} tone="text-coral" />
        <StatCard label="Paid" value={stats.paidInvoices || 0} icon={CreditCard} tone="text-berry" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-5">
        <section className="rounded-lg border border-line bg-white p-5 shadow-soft xl:col-span-2">
          <h2 className="text-lg font-semibold text-ink">Invoice status</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>
                  {statusData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-line bg-white p-5 shadow-soft xl:col-span-3">
          <h2 className="text-lg font-semibold text-ink">Monthly invoice trend</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => (name === 'amount' ? currency(value) : value)} />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#2f9f8f" strokeWidth={3} />
                <Line type="monotone" dataKey="amount" stroke="#9b5de5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </>
  );
}

function buildMonthlyTrend(invoices) {
  const buckets = new Map();
  invoices.forEach((invoice) => {
    const month = shortDate(invoice.invoiceDate).split(' ').slice(1).join(' ');
    const current = buckets.get(month) || { month, count: 0, amount: 0 };
    current.count += 1;
    current.amount += Number(invoice.amount || 0);
    buckets.set(month, current);
  });
  return Array.from(buckets.values()).slice(-6);
}
