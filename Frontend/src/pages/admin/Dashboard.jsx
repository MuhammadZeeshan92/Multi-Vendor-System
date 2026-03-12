import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboard,
  fetchActiveUsers,
  fetchActiveSellers,
} from "../../features/admin/adminSlice";

import { blockUser } from "../../features/admin/adminSlice";
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

  console.log(dashboard);

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

  if (!dashboard) return <div className="py-10 text-sm text-gray-500">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Admin
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            Overview of users, vendors, and platform performance.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live stats
          </span>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={dashboard?.totalUsers} />
        <StatCard title="Total Vendors" value={dashboard?.totalVendors} />
        <StatCard title="Active Users" value={dashboard?.activeUsers} />
        <StatCard title="Active Vendors" value={dashboard?.activeVendors} />
        <StatCard title="Blocked Accounts" value={dashboard?.blockedUsers} />
        <StatCard title="Revenue" value={`$${dashboard?.commision?.amount}`} />
      </div>

      {/* ACTIVE USERS */}
      <div className="card p-4 md:p-5">
        <ListSection
          title="Active Users"
          data={activeUsersList}
          currentPage={userPage}
          totalPages={userTotalPages}
          onPageChange={setUserPage}
          showBlockButton={true}
          onBlock={(id) => dispatch(blockUser(id))}
        />
      </div>

      {/* ACTIVE SELLERS */}
      <div className="card p-4 md:p-5">
        <ListSection
          title="Active Sellers"
          data={activeSellersList}
          currentPage={sellerPage}
          totalPages={sellerTotalPages}
          onPageChange={setSellerPage}
          showBlockButton={true}
          onBlock={(id) => dispatch(blockUser(id))}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;