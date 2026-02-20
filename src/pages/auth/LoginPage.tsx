import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type LoginForm = yup.InferType<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const { addToast } = useUiStore();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      await login(values);
      addToast('Login successful', 'success');
      navigate('/dashboard');
    } catch {
      addToast('Invalid credentials', 'error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="panel w-full max-w-md space-y-3">
        <h2 className="text-xl font-semibold">Login</h2>
        <input className="input" placeholder="Email" {...register('email')} />
        <p className="text-xs text-red-500">{errors.email?.message}</p>
        <input className="input" type="password" placeholder="Password" {...register('password')} />
        <p className="text-xs text-red-500">{errors.password?.message}</p>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        <p className="text-sm">New here? <Link className="text-blue-600" to="/register">Register</Link></p>
      </form>
    </div>
  );
};
