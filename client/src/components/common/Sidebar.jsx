import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import {
  FaUser,
  FaChalkboardTeacher,
  FaSchool,
  FaUserGraduate,
  FaBook,
  FaQuestionCircle,
  FaComments,
} from 'react-icons/fa';

const Sidebar = ({ expanded, setExpanded }) => {
  const { userType } = useSelector((state) => state.auth);
  const { profile: adminProfile } = useSelector((state) => state.admin);
  const { profile: teacherProfile } = useSelector((state) => state.teacher);
  const { profile: studentProfile } = useSelector((state) => state.student);

  const profile =
    userType === 'admin'
      ? adminProfile
      : userType === 'teacher'
        ? teacherProfile
        : studentProfile;
  const fullName = `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || userType || 'User';
  const initials = fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaBook /> },
    { name: 'Profile', path: '/admin/profile', icon: <FaUser /> },
    { name: 'Teachers', path: '/admin/teachers', icon: <FaChalkboardTeacher /> },
    { name: 'Students', path: '/admin/students', icon: <FaUserGraduate /> },
    { name: 'Classes', path: '/admin/classes', icon: <FaSchool /> },
    { name: 'Subjects', path: '/admin/subjects', icon: <FaBook /> },
  ];

  const teacherLinks = [
    { name: 'Profile', path: '/teacher/profile', icon: <FaUser /> },
    { name: 'Classes', path: '/teacher/classes', icon: <FaSchool /> },
    { name: 'Courses', path: '/teacher/courses', icon: <FaBook /> },
    { name: 'Quizzes', path: '/teacher/quizzes', icon: <FaQuestionCircle /> },
    { name: 'Chat', path: '/teacher/chat', icon: <FaComments /> },
  ];

  const studentLinks = [
    { name: 'Profile', path: '/student/profile', icon: <FaUser /> },
    { name: 'Courses', path: '/student/courses', icon: <FaBook /> },
    { name: 'Quizzes', path: '/student/quizzes', icon: <FaQuestionCircle /> },
    { name: 'Answered Quizzes', path: '/student/answered-quizzes', icon: <FaQuestionCircle /> },
    { name: 'Chat', path: '/student/chat', icon: <FaComments /> },
  ];

  const links = userType === 'admin' ? adminLinks : userType === 'teacher' ? teacherLinks : studentLinks;
  const closeDrawerOnMobile = () => {
    if (window.innerWidth < 1024) {
      setExpanded(false);
    }
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 max-w-[85vw] border-r border-slate-800/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10 transition-all duration-300 ease-in-out ${
          expanded ? 'translate-x-0 lg:w-64' : '-translate-x-full lg:w-16 lg:translate-x-0'
        }`}
      >
        <nav className="flex h-full flex-col px-3 py-5">
          <div className={`mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 ${expanded ? '' : 'lg:sr-only'}`}>
            Workspace
          </div>
          <ul className="flex-1 space-y-1.5 overflow-y-auto">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={closeDrawerOnMobile}
                  title={expanded ? undefined : link.name}
                  className={({ isActive }) =>
                    `group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/30'
                        : 'text-slate-400 hover:bg-white/10 hover:text-white'
                    } ${expanded ? '' : 'lg:justify-center lg:px-0'}`
                  }
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-base">
                    {link.icon}
                  </span>
                  <span className={`truncate ${expanded ? '' : 'lg:hidden'}`}>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to={`/${userType}/profile`}
            onClick={closeDrawerOnMobile}
            title={expanded ? undefined : fullName}
            className={`mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5 transition-colors hover:bg-white/10 ${
              expanded ? '' : 'lg:justify-center lg:px-1.5'
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-400/20 text-sm font-bold text-indigo-200">
              {initials}
            </span>
            <span className={`min-w-0 flex-1 ${expanded ? '' : 'lg:hidden'}`}>
              <span className="block truncate text-sm font-semibold text-white">{fullName}</span>
              <span className="mt-0.5 block truncate text-xs capitalize text-slate-400">{userType}</span>
            </span>
          </Link>
        </nav>
      </aside>

      {expanded && (
        <button
          type="button"
          className="fixed inset-x-0 bottom-0 top-16 z-30 bg-slate-950/55 backdrop-blur-[2px] lg:hidden"
          onClick={() => setExpanded(false)}
          aria-label="Close navigation menu"
        />
      )}
    </>
  );
};

export default Sidebar;
