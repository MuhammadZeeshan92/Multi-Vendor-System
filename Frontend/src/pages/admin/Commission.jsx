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
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Admin
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
          Commission Report
        </h1>
        <p className="text-sm text-gray-600">
          Filter and review commission totals across a date range.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="card p-4 md:p-5 flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Start
          </label>
          <input
            type="date"
            name="start"
            value={filters.start}
            onChange={(e) => setFilters({ ...filters, start: e.target.value })}
            className="border border-gray-300 rounded-xl px-3 py-2.5 text-sm bg-white"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            End
          </label>
          <input
            type="date"
            name="end"
            value={filters.end}
            onChange={(e) => setFilters({ ...filters, end: e.target.value })}
            className="border border-gray-300 rounded-xl px-3 py-2.5 text-sm bg-white"
          />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-sm hover:shadow">
          Apply filter
        </button>
      </form>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {commission.length > 0 ? (
                commission.map((c, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(c.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">Rs {c.amount.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-4 py-10 text-center text-gray-500">
                    No commission records found for the selected range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Commission;