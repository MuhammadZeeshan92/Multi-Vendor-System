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
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Commission Report</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
        <input
          type="date"
          name="start"
          value={filters.start}
          onChange={(e) => setFilters({ ...filters, start: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <input
          type="date"
          name="end"
          value={filters.end}
          onChange={(e) => setFilters({ ...filters, end: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Filter
        </button>
      </form>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <div className="card p-4 overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="border px-4 py-2 font-medium text-gray-700">Date</th>
                <th className="border px-4 py-2 font-medium text-gray-700">Amount</th>
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
        </div>
      )}
    </div>
  );
};

export default Commission;