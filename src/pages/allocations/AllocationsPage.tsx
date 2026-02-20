import { useEffect, useState } from 'react';
import { hmsService } from '@/services/hms.service';
import { Allocation } from '@/types';

export const AllocationsPage = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);

  useEffect(() => {
    hmsService.getAllocations().then(setAllocations);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Allocation Management</h2>
      <div className="panel flex flex-wrap gap-2">
        <button className="btn-primary" onClick={() => hmsService.allocateBed({ studentId: 's1', roomId: 'r1', bedNumber: 'B1' })}>Allocate Bed</button>
        <button className="btn-secondary" onClick={() => hmsService.transferRoom({ allocationId: 'a1', toRoomId: 'r3', toBedNumber: 'B2' })}>Transfer Room</button>
        <button className="btn-secondary" onClick={() => hmsService.vacateRoom('a1')}>Vacate Room</button>
      </div>
      <div className="panel">
        <h3 className="mb-2 font-semibold">Allocation History</h3>
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>Student</th><th>Room</th><th>Bed</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {allocations.map((a) => (
              <tr key={a.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="py-2">{a.studentName}</td><td>{a.hostelName} {a.roomNumber}</td><td>{a.bedNumber}</td><td>{a.status}</td><td>{a.allocatedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
