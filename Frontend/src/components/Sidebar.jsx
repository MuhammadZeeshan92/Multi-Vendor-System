import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links = [], onClose }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)] sticky top-16 self-start">
      <div className="px-4 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-gray-100 shadow-sm flex items-center justify-center">
            <span className="text-indigo-600 font-semibold text-sm">M</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              Securely
            </p>
            <p className="text-xs text-gray-500 truncate">
              Manage your account
            </p>
          </div>
        </div>
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex flex-col p-3 space-y-1 text-sm">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={onClose}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:rounded-full ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm before:bg-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 before:bg-transparent'
              }`
            }
          >
            <span className="h-8 w-8 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[11px] font-semibold text-gray-500">
              {l.label[0]}
            </span>
            <span className="truncate">{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;