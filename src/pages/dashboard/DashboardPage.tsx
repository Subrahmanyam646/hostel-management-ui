import { useEffect, useState } from 'react';
import { hmsService } from '@/services/hms.service';
import { DashboardSummary } from '@/types';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

const MetricCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="panel">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-1 text-2xl font-semibold">{value}</p>
  </div>
);

export const DashboardPage = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    hmsService.getDashboardSummary().then(setSummary);
  }, []);

  if (!summary) return <LoadingSkeleton rows={6} />;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Students" value={summary.totalStudents} />
        <MetricCard label="Rooms Available" value={summary.roomsAvailable} />
        <MetricCard label="Pending Fees" value={`₹${summary.pendingFeesAmount.toLocaleString('en-IN')}`} />
        <MetricCard label="Open Complaints" value={summary.openComplaints} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="panel">
          <h3 className="mb-3 font-semibold">Occupancy Chart</h3>
          <div className="h-3 rounded bg-slate-200 dark:bg-slate-700">
            <div className="h-3 rounded bg-blue-600" style={{ width: `${summary.occupancyPercent}%` }} />
          </div>
          <p className="mt-2 text-sm">{summary.occupancyPercent}% occupied</p>
        </div>
        <div className="panel">
          <h3 className="mb-3 font-semibold">Revenue Chart</h3>
          <div className="h-3 rounded bg-slate-200 dark:bg-slate-700">
            <div className="h-3 rounded bg-emerald-600" style={{ width: `${Math.min((summary.monthlyRevenue / 1000000) * 100, 100)}%` }} />
          </div>
          <p className="mt-2 text-sm">₹{summary.monthlyRevenue.toLocaleString('en-IN')} this month</p>
        </div>
      </div>
    </div>
  );
};
