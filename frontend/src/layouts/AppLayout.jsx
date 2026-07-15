import {
  BarChart3,
  Building2,
  ClipboardCheck,
  FileText,
  LogOut,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: BarChart3, roles: ['ADMIN', 'FINANCE_EXECUTIVE', 'MANAGER'] },
  { to: '/vendor', label: 'Vendor Portal', icon: UploadCloud, roles: ['ADMIN', 'VENDOR'] },
  { to: '/finance', label: 'Finance Review', icon: ClipboardCheck, roles: ['ADMIN', 'FINANCE_EXECUTIVE'] },
  { to: '/manager', label: 'Manager Approval', icon: ShieldCheck, roles: ['ADMIN', 'MANAGER'] },
  { to: '/invoices', label: 'Invoices', icon: FileText, roles: ['ADMIN', 'FINANCE_EXECUTIVE', 'MANAGER', 'VENDOR'] },
  { to: '/vendors', label: 'Vendors', icon: Building2, roles: ['ADMIN', 'FINANCE_EXECUTIVE', 'MANAGER'] },
];

export default function AppLayout() {
  const { user, role, signOut } = useAuth();
  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-line px-5 py-5">
            <p className="text-xl font-semibold text-ink">InvoiceFlow</p>
            <p className="text-sm text-slate-500">Enterprise finance workflow</p>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {visibleItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>
          <div className="border-t border-line p-4">
            <div className="mb-3">
              <p className="truncate text-sm font-semibold text-ink">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{role?.replaceAll('_', ' ')}</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="focus-ring flex w-full items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <LogOut size={17} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-10 border-b border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-ink">InvoiceFlow</p>
            <p className="text-xs text-slate-500">{role?.replaceAll('_', ' ')}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-line text-slate-700"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {visibleItems.map((item) => (
            <NavItem key={item.to} item={item} compact />
          ))}
        </nav>
      </header>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavItem({ item, compact = false }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        [
          'focus-ring flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
          compact ? 'shrink-0 border border-line bg-white' : '',
          isActive ? 'bg-mint text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink',
        ].join(' ')
      }
    >
      <Icon size={18} />
      <span>{item.label}</span>
    </NavLink>
  );
}
