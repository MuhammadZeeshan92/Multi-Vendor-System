import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';

import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';

const Register = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  // when registration succeeds clear the form and send user to login
  useEffect(() => {
    if (status === 'succeeded') {
      setForm({ name: '', email: '', password: '', role: 'buyer' });
      navigate('/auth/login');
    }
  }, [status, navigate]);


  // (we don't redirect based on user here; registration always goes to login)

  return (
    <Page className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-indigo-50 to-transparent -z-10" />

        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/60 overflow-hidden transform transition-all">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-700 h-2 w-full" />

          <div className="p-8 md:p-10 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Join Us</h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[260px] mx-auto">
                Create your account to start buying or selling on our Marketplace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="bg-gray-50/50"
                />
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
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="block w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
                    >
                      <svg 
                        className="w-5 h-5 transition-all duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        opacity={showPassword ? "1" : "0.6"}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        {!showPassword && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">I want to join as a</label>
                  <div className="relative">
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="buyer">🛍️ Buyer</option>
                      <option value="seller">🏪 Seller</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 ml-1 mt-1 font-medium italic">
                    {form.role === 'seller' 
                      ? "Sellers get a dedicated vendor dashboard and storefront." 
                      : "Buyers can browse products and manage their orders."}
                  </p>
                </div>
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
                    Creating Account...
                  </span>
                ) : 'Create Account'}
              </Button>
            </form>

            <div className="pt-6 border-t border-gray-50 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link 
                  to="/auth/login" 
                  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Register;