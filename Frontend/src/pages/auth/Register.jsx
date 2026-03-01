import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Register = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-10">
      <div className="w-full max-w-md card p-6 space-y-6">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Create your account</h2>
          <p className="text-sm text-gray-600">
            Join as a buyer or seller and start using the Marketplace.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
          <div className="flex flex-col gap-1 text-sm">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            <p className="text-xs text-gray-500">
              Sellers get access to the vendor dashboard, storefront, and sales reporting.
            </p>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button type="submit" disabled={status === 'loading'} className="w-full">
            {status === 'loading' ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="text-xs text-gray-500 text-center">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;