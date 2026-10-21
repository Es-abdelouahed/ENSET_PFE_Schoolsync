import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardStats } from '../../redux/actions/adminActions';
import { FaChalkboardTeacher, FaUserGraduate, FaSchool, FaBook } from 'react-icons/fa';

const DashboardStats = () => {
  const dispatch = useDispatch();
  const { dashboard, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  if (error) {
    return <div className="text-red-500 p-4 rounded-lg bg-red-50">Error: {error}</div>;
  }

  if (!dashboard) {
    return <div className="text-center py-8">Loading dashboard data...</div>;
  }

  const stats = [
    {
      title: 'Total Teachers',
      value: dashboard.teachersCount,
      icon: <FaChalkboardTeacher />,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      accent: 'bg-indigo-500'
    },
    {
      title: 'Total Students',
      value: dashboard.studentsCount,
      icon: <FaUserGraduate />,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      accent: 'bg-blue-500'
    },
    {
      title: 'Total Classes',
      value: dashboard.classesCount,
      icon: <FaSchool />,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      accent: 'bg-emerald-500'
    },
    {
      title: 'Total Subjects',
      value: dashboard.SubjectCount,
      icon: <FaBook />,
      iconColor: 'text-violet-600',
      iconBg: 'bg-violet-50',
      accent: 'bg-violet-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.title}
          className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/70"
        >
          <div className={`absolute inset-x-0 top-0 h-1 ${stat.accent}`} />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 tabular-nums">
                {stat.value}
              </p>
            </div>
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} text-xl transition-transform duration-200 group-hover:scale-110`}>
              {stat.icon}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default DashboardStats;