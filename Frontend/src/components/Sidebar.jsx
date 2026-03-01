import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links = [] }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)]">
      <div className="px-4 pt-5 pb-3 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Dashboard
        </p>
      </div>
      <nav className="flex flex-col p-3 space-y-1 text-sm">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center text-[11px] font-semibold text-gray-500">
              {l.label[0]}
            </span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;