import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import FinanceDashboardPage from './pages/FinanceDashboardPage';
import HomePage from './pages/HomePage';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import RegisterPage from './pages/RegisterPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import VendorPortalPage from './pages/VendorPortalPage';
import VendorsPage from './pages/VendorsPage';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="invoices/:id" element={<InvoiceDetailsPage />} />
          <Route path="vendor" element={<VendorPortalPage />} />
          <Route element={<ProtectedRoute roles={['ADMIN', 'FINANCE_EXECUTIVE', 'MANAGER']} />}>
            <Route path="vendors" element={<VendorsPage />} />
          </Route>
          <Route element={<ProtectedRoute roles={['ADMIN', 'FINANCE_EXECUTIVE']} />}>
            <Route path="finance" element={<FinanceDashboardPage />} />
          </Route>
          <Route element={<ProtectedRoute roles={['ADMIN', 'MANAGER']} />}>
            <Route path="manager" element={<ManagerDashboardPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
