import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute = ({ roles }: { roles?: UserRole[] }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && role && !roles.includes(role)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};
