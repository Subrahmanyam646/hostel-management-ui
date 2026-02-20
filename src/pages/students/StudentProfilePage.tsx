import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { hmsService } from '@/services/hms.service';
import { Student } from '@/types';

export const StudentProfilePage = () => {
  const { id = '' } = useParams();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    hmsService.getStudentById(id).then(setStudent);
  }, [id]);

  if (!student) return <div className="panel">Loading profile...</div>;

  return (
    <div className="space-y-4">
      <div className="panel">
        <h2 className="text-2xl font-semibold">{student.name}</h2>
        <p className="text-sm">Registration: {student.registrationNo}</p>
        <p className="text-sm">Email: {student.email}</p>
        <p className="text-sm">Current Room: {student.hostelName} / {student.roomNumber} / {student.bedNumber}</p>
        <div className="mt-3 flex gap-2">
          <Link className="btn-secondary" to={`/students/${student.id}/edit`}>Edit</Link>
          <button className="btn-primary" onClick={() => hmsService.allocateStudentRoom(student.id, 'r1', 'B2')}>Allocate Room</button>
        </div>
      </div>
    </div>
  );
};
