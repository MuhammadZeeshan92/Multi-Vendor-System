import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links = [] }) => {
  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <nav className="flex flex-col p-4 space-y-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${isActive ? 'bg-gray-100 text-[var(--primary)]' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;