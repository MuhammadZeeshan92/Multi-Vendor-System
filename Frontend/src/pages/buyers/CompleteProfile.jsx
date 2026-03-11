import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

import Page from '../../components/Page';

const CompleteProfile = () => {
  const { user } = useSelector(s => s.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ address:'', phone:'' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
  }, [user]);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/buyers/profile', form);
      navigate('/buyer/dashboard', { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Page className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-fadeIn">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Setup Your Profile</h1>
          <p className="text-gray-500">Just a few more details to get started with your buyer account.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Input 
                label="Delivery Address" 
                name="address" 
                placeholder="e.g. 123 Luxury St, Apt 4B"
                value={form.address} 
                onChange={handleChange} 
                required 
                className="pl-4"
              />
              <div className="absolute top-[26px] right-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <Input 
                label="Phone Number" 
                name="phone" 
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone} 
                onChange={handleChange}
                className="pl-4"
              />
              <div className="absolute top-[26px] right-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              disabled={saving}
              className="w-full py-4 text-base font-semibold shadow-xl shadow-indigo-600/20 rounded-2xl tracking-wide uppercase transition-all hover:scale-[1.01] active:scale-[0.99] disabled:scale-100"
            >
              {saving ? (
                 <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving Your Info...
                </span>
              ) : "Complete Setup →"}
            </Button>
          </div>
          
          <p className="text-center text-xs text-gray-400">
            By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span>
          </p>
        </form>
      </div>
    </Page>
  );
};

export default CompleteProfile;