import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../features/auth/authSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLocation } from 'react-router-dom'

import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';


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
    <Page className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50 to-transparent -z-10" />
        
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/60 overflow-hidden transform transition-all">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-700 h-2 w-full" />
          
          <div className="p-8 md:p-10 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[240px] mx-auto">
                Sign in to manage your orders and access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="bg-gray-50/50"
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="bg-gray-50/50"
                />
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs py-3 px-4 rounded-xl animate-shake">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={status === 'loading'} 
                className="w-full py-3.5 text-sm font-bold shadow-lg shadow-indigo-600/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'Sign In'}
              </Button>
            </form>

            <div className="pt-6 border-t border-gray-50 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link 
                  to="/auth/register" 
                  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Login;