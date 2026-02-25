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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Vendor Management</h1>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Active</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v._id}>
              <td className="border px-4 py-2">{v.name}</td>
              <td className="border px-4 py-2">{v.email}</td>
              <td className="border px-4 py-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    dispatch(toggleUserActive({ id: v._id, active: !v.isActive }))
                  }
                >
                  {v.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVendors;