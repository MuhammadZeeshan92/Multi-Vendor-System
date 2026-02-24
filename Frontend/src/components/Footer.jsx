import React from 'react';

const Footer = () => (
  <footer className="bg-white border-t mt-12">
    <div className="container mx-auto px-4 py-6 text-center text-gray-600">
      &copy; {new Date().getFullYear()} Marketplace. All rights reserved.
    </div>
  </footer>
);

export default Footer;