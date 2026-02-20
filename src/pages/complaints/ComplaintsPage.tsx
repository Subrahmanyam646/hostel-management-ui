import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { hmsService } from '@/services/hms.service';
import { Complaint } from '@/types';

const schema = yup.object({
  category: yup.string().required(),
  description: yup.string().required(),
});

type ComplaintForm = yup.InferType<typeof schema>;

export const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const { register, handleSubmit, reset } = useForm<ComplaintForm>({ resolver: yupResolver(schema) });

  useEffect(() => {
    hmsService.getComplaints().then(setComplaints);
  }, []);

  const onSubmit = async (values: ComplaintForm) => {
    await hmsService.raiseComplaint(values);
    reset();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Complaint Management</h2>
      <form className="panel space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold">Raise complaint</h3>
        <input className="input" placeholder="Category" {...register('category')} />
        <textarea className="input" placeholder="Description" rows={3} {...register('description')} />
        <button className="btn-primary">Submit</button>
      </form>
      <div className="panel">
        <h3 className="mb-2 font-semibold">Complaints list</h3>
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>Student</th><th>Category</th><th>Description</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {complaints.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="py-2">{item.studentName}</td><td>{item.category}</td><td>{item.description}</td><td>{item.status}</td>
                <td><button className="btn-secondary" onClick={() => hmsService.updateComplaintStatus(item.id, 'RESOLVED')}>Mark resolved</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
