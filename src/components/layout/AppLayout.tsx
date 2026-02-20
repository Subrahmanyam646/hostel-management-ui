import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/students', label: 'Students' },
  { to: '/hostels', label: 'Hostels & Rooms' },
  { to: '/allocations', label: 'Allocations' },
  { to: '/fees', label: 'Fees' },
  { to: '/complaints', label: 'Complaints' },
];

export const AppLayout = () => {
  const { user, logout } = useAuthStore();
  const { toggleTheme, theme } = useUiStore();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">Hostel Management System</h1>
          <div className="flex items-center gap-2">
            <button className="btn-secondary" onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'} mode</button>
            <button className="btn-secondary" onClick={logout}>Logout ({user?.role})</button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[220px_1fr]">
        <aside className="panel h-fit">
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `block rounded px-3 py-2 text-sm ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
