import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ links = [] }) => {
  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <nav className="flex flex-col p-4 space-y-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-gray-700 hover:text-gray-900"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;