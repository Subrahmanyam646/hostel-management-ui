import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ToastContainer } from '@/components/common/ToastContainer';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { StudentsListPage } from '@/pages/students/StudentsListPage';
import { StudentFormPage } from '@/pages/students/StudentFormPage';
import { StudentProfilePage } from '@/pages/students/StudentProfilePage';
import { HostelsPage } from '@/pages/hostels/HostelsPage';
import { AllocationsPage } from '@/pages/allocations/AllocationsPage';
import { FeesPage } from '@/pages/fees/FeesPage';
import { ComplaintsPage } from '@/pages/complaints/ComplaintsPage';

export const AppRouter = () => (
  <ErrorBoundary>
    <ToastContainer />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsListPage />} />
          <Route path="/students/new" element={<StudentFormPage />} />
          <Route path="/students/:id/edit" element={<StudentFormPage />} />
          <Route path="/students/:id" element={<StudentProfilePage />} />
          <Route path="/hostels" element={<HostelsPage />} />
          <Route path="/allocations" element={<AllocationsPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </ErrorBoundary>
);
