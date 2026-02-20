import { useEffect, useState } from 'react';
import AdvancedSearchPage from './pages/AdvancedSearchPage';
import ConfigurationPage from './pages/ConfigurationPage';
import DashboardPage from './pages/DashboardPage';
import { fetchDashboardSummary, fetchMonthlyPayments, fetchRooms } from './api';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'configuration', label: 'Configure Floors/Rooms' },
  { id: 'search', label: 'Advanced Room Search' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [summary, setSummary] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [monthlyPayments, setMonthlyPayments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [summaryData, roomData, paymentData] = await Promise.all([
        fetchDashboardSummary(),
        fetchRooms(),
        fetchMonthlyPayments(),
      ]);

      setSummary(summaryData);
      setRooms(roomData);
      setMonthlyPayments(paymentData);
    };

    loadData();
  }, []);

  if (!summary) {
    return <main className="app-shell">Loading hostel dashboard...</main>;
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <h1>Hostel Management System</h1>
          <p>UI starter with backend contracts for room allocation and payment tracking.</p>
        </div>
      </header>

      <nav className="tab-bar" aria-label="Main sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'dashboard' ? (
        <DashboardPage summary={summary} rooms={rooms} monthlyPayments={monthlyPayments} />
      ) : null}
      {activeTab === 'configuration' ? <ConfigurationPage /> : null}
      {activeTab === 'search' ? <AdvancedSearchPage rooms={rooms} /> : null}
    </main>
  );
}
