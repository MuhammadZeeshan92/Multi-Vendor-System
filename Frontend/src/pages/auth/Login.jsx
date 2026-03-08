import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../features/auth/authSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLocation } from 'react-router-dom'


const Login = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const location = useLocation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  const navigate = useNavigate();

  // redirect user immediately after login based on their role
  useEffect(() => {
    if (!user) return;
    console.log('Logged in user:', user);
    // SELLER without store -> force create store
    if (user.role === 'seller' && !user.hasCompletedProfile) {
      navigate('/vendor/create-store', { replace: true });
      return;
    }

    if (user.role === 'buyer' && !user.hasCompletedProfile) {
      navigate('/buyer/complete-profile', { replace: true });
      return;
    }

    // Redirect to previous protected page if exists
    const from = location.state?.from;
    if (from) {
      navigate(from, { replace: true });
      return;
    }

    // Role-based dashboard redirects
    if (user.role === 'seller') navigate('/vendor/dashboard', { replace: true });
    else if (user.role === 'admin') navigate('/admin/dashboard', { replace: true });
    else if (user.role === 'buyer') navigate('/buyer/dashboard', { replace: true });
    else navigate('/', { replace: true });
  }, [user, navigate, location]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-10">
      <div className="w-full max-w-md card p-6 space-y-6">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-600">
            Sign in to manage your orders, cart, or vendor dashboard.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button type="submit" disabled={status === 'loading'} className="w-full">
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="text-xs text-gray-500 text-center">
          New here?{' '}
          <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;