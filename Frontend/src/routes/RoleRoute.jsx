import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RoleRoute = ({ allowedRoles = [], redirectPath = '/forbidden' }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default RoleRoute;