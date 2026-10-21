import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Notification from '../../components/common/Notification';
import DashboardStats from '../../components/admin/DashboardStats';

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${expanded ? 'lg:ml-64' : 'lg:ml-16'
          }`}
      >
        <Header expanded={expanded} setExpanded={setExpanded} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 pt-4 sm:pt-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Admin dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                School overview
              </h1>
              <p className="mt-2 text-gray-500">
                A quick look at the people and learning resources in your school.
              </p>
            </div>
            <DashboardStats />
          </div>
        </main>
      </div>
      <Notification />
    </div>
  );
};

export default Dashboard;