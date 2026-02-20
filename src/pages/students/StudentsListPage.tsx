import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { hmsService } from '@/services/hms.service';
import { Student } from '@/types';

export const StudentsListPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    hmsService.getStudents().then(setStudents);
  }, []);

  const filtered = useMemo(() => students.filter((s) => `${s.name} ${s.registrationNo}`.toLowerCase().includes(query.toLowerCase())), [students, query]);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Student Management</h2>
        <Link className="btn-primary" to="/students/new">Add Student</Link>
      </div>
      <div className="panel">
        <input className="input mb-3" placeholder="Search by name or registration" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>Name</th><th>Registration</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {paginated.map((student) => (
              <tr key={student.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="py-2">{student.name}</td><td>{student.registrationNo}</td><td>{student.status}</td>
                <td><Link className="text-blue-600" to={`/students/${student.id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button className="btn-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
          <span>{page}/{totalPages}</span>
          <button className="btn-secondary" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
        </div>
      </div>
    </div>
  );
};
