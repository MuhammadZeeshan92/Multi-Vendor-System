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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2">

                {!u.isBlocked && (
                  <Button
                    variant="destructive"
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
                    {u.isActive ? "Deactivate" : "Activate"}
                  </Button>
                )}

                {u.isBlocked && (
                  <span className="text-red-600 font-bold">
                    Permanently Blocked
                  </span>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;