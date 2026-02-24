import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommissionReport } from '../../features/admin/adminSlice';
import Spinner from '../../components/Spinner';

const Commission = () => {
  const dispatch = useDispatch();
  const { commission, status } = useSelector((state) => state.admin);
  const [filters, setFilters] = useState({ start: '', end: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCommissionReport(filters));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Commission Report</h1>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
        <input
          type="date"
          name="start"
          value={filters.start}
          onChange={(e) => setFilters({ ...filters, start: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="date"
          name="end"
          value={filters.end}
          onChange={(e) => setFilters({ ...filters, end: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Filter
        </button>
      </form>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {commission.map((c, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{c.date}</td>
                <td className="border px-4 py-2">${c.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Commission;