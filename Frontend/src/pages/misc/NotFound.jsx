import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container mx-auto py-6 text-center">
    <h1 className="text-3xl font-semibold">404 - Page Not Found</h1>
    <p className="mt-4">
      Go back to <Link to="/" className="text-indigo-600">home</Link>.
    </p>
  </div>
);

export default NotFound;