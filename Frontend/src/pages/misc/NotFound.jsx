import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
    <div className="card p-8 text-center space-y-3 max-w-md">
      <p className="text-xs font-semibold text-indigo-600 tracking-wide uppercase">
        404 Not Found
      </p>
      <h1 className="text-2xl font-semibold text-gray-900">
        We couldn&apos;t find that page.
      </h1>
      <p className="text-sm text-gray-600">
        The link might be broken or the page may have been removed.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center bg-indigo-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-indigo-700"
      >
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFound;