'use client';

import UserTable from '@/components/dashboard/UserTable';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <UserTable />
    </div>
  );
}