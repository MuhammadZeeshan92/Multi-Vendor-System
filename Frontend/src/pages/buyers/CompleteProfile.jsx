import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

const CompleteProfile = () => {
  const { user } = useSelector(s => s.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ address:'', phone:'' /* etc */ });

  useEffect(() => {
    if (!user) return;
    // optionally pre‑fill if server has a buyer record
    // api.get('/buyers/me').then(r => setForm({...r.data}));
  }, [user]);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put('/buyers/profile', form);    // new endpoint
      navigate('/buyer/dashboard', { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    }
  };

  

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <h2 className="text-xl font-semibold">Complete your profile</h2>
        <Input label="Address" name="address" value={form.address} onChange={handleChange} required />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        {/* more fields as needed */}
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default CompleteProfile;