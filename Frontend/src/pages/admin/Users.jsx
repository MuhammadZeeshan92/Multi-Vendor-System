import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleUserActive } from '../../features/admin/adminSlice';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') return <Spinner />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
      <div className="card p-4 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border px-4 py-2 font-medium text-gray-700">Name</th>
              <th className="border px-4 py-2 font-medium text-gray-700">Email</th>
              <th className="border px-4 py-2 font-medium text-gray-700">Role</th>
              <th className="border px-4 py-2 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="align-middle">
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2 capitalize">{u.role}</td>
                <td className="border px-4 py-2 space-x-2">
                  {!u.isBlocked && (
                    <Button
                      variant="danger"
                      onClick={() => dispatch(blockUser(u._id))}
                    >
                      Block Permanently
                    </Button>
                  )}

                  {!u.isBlocked && (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        dispatch(toggleUserActive({ id: u._id, active: !u.isActive }))
                      }
                    >
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  )}

                  {u.isBlocked && (
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

export default AdminUsers;