import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';

const ProtectedRoute = ({ redirectPath = '/auth/login' }) => {
  const { user, status } = useSelector((state) => state.auth);

  // while we are restoring the current user from the server, don't redirect — show a spinner
  if (status === 'idle' || status === 'loading') {
    return <div className="flex items-center justify-center py-20"><Spinner /></div>;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;