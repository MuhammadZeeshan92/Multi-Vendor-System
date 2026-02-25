import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboard,
  fetchActiveUsers,
  fetchActiveSellers,
} from "../../features/admin/adminSlice";

import { StatCard } from "../../components/StatCard";
import { ListSection } from "../../components/ListSection";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    dashboard,
    activeUsersList,
    activeSellersList,
    userTotalPages,
    sellerTotalPages,
  } = useSelector((state) => state.admin);

  const [userPage, setUserPage] = useState(1);
  const [sellerPage, setSellerPage] = useState(1);

  // Fetch dashboard stats once
  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // Fetch users when page changes
  useEffect(() => {
    dispatch(fetchActiveUsers({ page: userPage, limit: 5 }));
  }, [dispatch, userPage]);

  // Fetch sellers when page changes
  useEffect(() => {
    dispatch(fetchActiveSellers({ page: sellerPage, limit: 5 }));
  }, [dispatch, sellerPage]);

  if (!dashboard) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <StatCard title="Total Users" value={dashboard.totalUsers} />
        <StatCard title="Total Vendors" value={dashboard.totalVendors} />
        <StatCard title="Active Users" value={dashboard.activeUsers} />
        <StatCard title="Active Vendors" value={dashboard.activeVendors} />
        <StatCard title="Blocked Accounts" value={dashboard.blockedUsers} />
        <StatCard title="Revenue" value={`$${dashboard.revenue}`} />
      </div>

      {/* ACTIVE USERS */}
      <ListSection
        title="Active Users"
        data={activeUsersList}
        currentPage={userPage}
        totalPages={userTotalPages}
        onPageChange={setUserPage}
      />

      {/* ACTIVE SELLERS */}
      <ListSection
        title="Active Sellers"
        data={activeSellersList}
        currentPage={sellerPage}
        totalPages={sellerTotalPages}
        onPageChange={setSellerPage}
      />
    </div>
  );
};

export default AdminDashboard;