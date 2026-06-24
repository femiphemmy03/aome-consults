import { useAuth } from '../../context/AuthContext.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';

export default function AdminApp() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}
