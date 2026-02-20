import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { hmsService } from '@/services/hms.service';
import { useUiStore } from '@/store/uiStore';

const schema = yup.object({
  name: yup.string().required(),
  registrationNo: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

type FormValues = yup.InferType<typeof schema>;

export const StudentFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToast } = useUiStore();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', registrationNo: '', email: '', phone: '' },
  });

  const onSubmit = async (values: FormValues) => {
    await hmsService.saveStudent(values);
    addToast(`Student ${id ? 'updated' : 'created'} successfully`, 'success');
    navigate('/students');
  };

  return (
    <form className="panel space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold">{id ? 'Edit Student' : 'Add Student'}</h2>
      <input className="input" placeholder="Name" {...register('name')} /><p className="text-xs text-red-500">{errors.name?.message}</p>
      <input className="input" placeholder="Registration No" {...register('registrationNo')} /><p className="text-xs text-red-500">{errors.registrationNo?.message}</p>
      <input className="input" placeholder="Email" {...register('email')} /><p className="text-xs text-red-500">{errors.email?.message}</p>
      <input className="input" placeholder="Phone" {...register('phone')} /><p className="text-xs text-red-500">{errors.phone?.message}</p>
      <button className="btn-primary">Save</button>
    </form>
  );
};
