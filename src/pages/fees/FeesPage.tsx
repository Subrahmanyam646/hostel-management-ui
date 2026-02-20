import { useEffect, useMemo, useState } from 'react';
import { hmsService } from '@/services/hms.service';
import { FeeRecord } from '@/types';

export const FeesPage = () => {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [pendingOnly, setPendingOnly] = useState(false);

  useEffect(() => {
    hmsService.getFees().then(setFees);
  }, []);

  const filtered = useMemo(() => (pendingOnly ? fees.filter((f) => f.status !== 'PAID') : fees), [fees, pendingOnly]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Fees Management</h2>
      <div className="panel flex items-center justify-between">
        <label className="flex items-center gap-2"><input type="checkbox" checked={pendingOnly} onChange={() => setPendingOnly((v) => !v)} /> Pending dues only</label>
      </div>
      <div className="panel">
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>Student</th><th>Amount</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((fee) => (
              <tr key={fee.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="py-2">{fee.studentName}</td><td>₹{fee.amount}</td><td>{fee.dueDate}</td><td>{fee.status}</td>
                <td className="space-x-2">
                  <button className="btn-primary" onClick={() => hmsService.payFee({ feeId: fee.id, amount: fee.amount, mode: 'UPI' })}>Pay</button>
                  <button className="btn-secondary" onClick={() => hmsService.getInvoice(fee.id)}>Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
