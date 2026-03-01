import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors, toggleUserActive } from '../../features/admin/adminSlice';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';

const AdminVendors = () => {
  const dispatch = useDispatch();
  const { vendors, status } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  if (status === 'loading') return <Spinner />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Vendor Management</h1>

      <div className="card p-4 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border px-4 py-2 font-medium text-gray-700">Name</th>
              <th className="border px-4 py-2 font-medium text-gray-700">Email</th>
              <th className="border px-4 py-2 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id}>
                <td className="border px-4 py-2">{v.name}</td>
                <td className="border px-4 py-2">{v.email}</td>
                <td className="border px-4 py-2 space-x-2">
                  {!v.isBlocked && (
                    <Button
                      variant="danger"
                      onClick={() => dispatch(blockUser(v._id))}
                    >
                      Block Permanently
                    </Button>
                  )}

                  {!v.isBlocked && (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        dispatch(toggleUserActive({ id: v._id, active: !v.isActive }))
                      }
                    >
                      {v.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  )}

                  {v.isBlocked && (
                    <span className="text-red-600 font-bold text-xs uppercase tracking-wide">
                      Permanently Blocked
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVendors;