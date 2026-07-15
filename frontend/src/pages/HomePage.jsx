import DashboardPage from './DashboardPage';
import VendorPortalPage from './VendorPortalPage';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { role } = useAuth();
  return role === 'VENDOR' ? <VendorPortalPage /> : <DashboardPage />;
}
