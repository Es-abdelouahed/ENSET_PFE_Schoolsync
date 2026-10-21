import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { getAdminProfile } from '../../redux/actions/adminActions';
import { getTeacherProfile } from '../../redux/actions/teacherActions';
import { getStudentProfile } from '../../redux/actions/studentActions';
import { useNavigate, Link } from 'react-router-dom';
import { FaBars, FaChevronDown } from 'react-icons/fa';

const Header = ({ expanded, setExpanded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userType, isAuthenticated } = useSelector((state) => state.auth);
  const { profile: adminProfile } = useSelector((state) => state.admin);
  const { profile: teacherProfile } = useSelector((state) => state.teacher);
  const { profile: studentProfile } = useSelector((state) => state.student);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profile =
    userType === 'admin'
      ? adminProfile
      : userType === 'teacher'
        ? teacherProfile
        : userType === 'student'
          ? studentProfile
          : null;

  useEffect(() => {
    if (isAuthenticated && !profile) {
      if (userType === 'admin') {
        dispatch(getAdminProfile());
      } else if (userType === 'teacher') {
        dispatch(getTeacherProfile());
      } else if (userType === 'student') {
        dispatch(getStudentProfile());
      }
    }
  }, [dispatch, isAuthenticated, userType, profile]);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate('/login');
  };

  const profilePicUrl = profile?.profilePic
    ? `http://localhost:5000${profile.profilePic}`
    : '/not_login.png';
  const fullName = profile
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
    : userType || 'User';
  const email = profile?.email || '';
  const homePath = userType === 'admin' ? '/admin/dashboard' : userType ? `/${userType}/profile` : '/login';

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-800 bg-slate-950 text-white shadow-lg shadow-slate-950/10">
      <nav className="mx-auto flex h-full items-center justify-between px-3 sm:px-5 lg:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={expanded ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={expanded}
          >
            <FaBars className="h-5 w-5" />
          </button>
          <Link
            to={homePath}
            onClick={() => {
              if (window.innerWidth < 1024) {
                setExpanded(false);
              }
            }}
            className="flex min-w-0 items-center gap-2.5"
            aria-label="SchoolSync home"
          >
            <img src="/logo1.png" alt="" className="h-9 w-9 rounded-lg shadow-sm" />
            <span className="truncate text-lg font-bold tracking-tight sm:text-xl">
              <span className="text-white">chool</span>
              <span className="text-blue-300">Sync</span>
            </span>
          </Link>
        </div>

        {isAuthenticated && (
          <div className="relative ml-3">
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className="flex items-center gap-2 rounded-full p-1.5 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:gap-3 sm:pl-2"
              aria-label="Open user menu"
              aria-expanded={isProfileOpen}
            >
              <span className="hidden text-right sm:block">
                <span className="block max-w-40 truncate text-sm font-semibold text-white">{fullName}</span>
                <span className="block text-xs capitalize text-slate-400">{userType}</span>
              </span>
              <img
                className="h-9 w-9 rounded-full border-2 border-slate-700 bg-slate-700 object-cover"
                src={profilePicUrl}
                alt=""
                onError={(event) => {
                  event.currentTarget.src = '/not_login.png';
                }}
              />
              <FaChevronDown className={`hidden text-xs text-slate-400 transition-transform sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-40 cursor-default"
                  aria-label="Close user menu"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white text-slate-700 shadow-xl shadow-slate-900/15">
                  <div className="border-b border-slate-100 px-4 py-4">
                    <p className="truncate text-sm font-semibold text-slate-900">{fullName}</p>
                    {email && <p className="mt-1 truncate text-xs text-slate-500">{email}</p>}
                  </div>
                  <Link
                    to={`/${userType}/profile`}
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm transition-colors hover:bg-slate-50"
                  >
                    My profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full border-t border-slate-100 px-4 py-3 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
