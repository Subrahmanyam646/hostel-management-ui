import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  role: yup.mixed<'STUDENT' | 'WARDEN'>().oneOf(['STUDENT', 'WARDEN']).required(),
});

type RegisterForm = yup.InferType<typeof schema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuthStore();
  const { addToast } = useUiStore();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', password: '', role: 'STUDENT' },
  });

  const onSubmit = async (values: RegisterForm) => {
    try {
      await registerUser(values);
      addToast('Registration successful', 'success');
      navigate('/dashboard');
    } catch {
      addToast('Registration failed', 'error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="panel w-full max-w-md space-y-3">
        <h2 className="text-xl font-semibold">Register</h2>
        <input className="input" placeholder="Full name" {...register('name')} />
        <p className="text-xs text-red-500">{errors.name?.message}</p>
        <input className="input" placeholder="Email" {...register('email')} />
        <p className="text-xs text-red-500">{errors.email?.message}</p>
        <input className="input" type="password" placeholder="Password" {...register('password')} />
        <p className="text-xs text-red-500">{errors.password?.message}</p>
        <select className="input" {...register('role')}>
          <option value="STUDENT">Student</option>
          <option value="WARDEN">Warden</option>
        </select>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
        <p className="text-sm">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
};
