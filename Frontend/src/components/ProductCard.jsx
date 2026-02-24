import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ProductCard = ({ _id, name, price, images, stock, isActive, vendorId }) => {
  const disabled = stock === 0 || isActive === false;
  return (
    <div className="card scale-hover">
      <Link to={`/products/${_id}`}>
        <img
          src={images?.[0] || 'https://via.placeholder.com/600x400?text=Product'}
          alt={name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">by {vendorId || 'Vendor'}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${price}</p>
          <span className={`px-2 py-1 rounded-full text-sm ${stock > 5 ? 'bg-emerald-100 text-emerald-700' : stock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
            {stock > 0 ? stock : 'Out'}
          </span>
        </div>

        <div className="mt-3">
          <Button onClick={() => (window.location.href = `/products/${_id}`)} disabled={disabled} className="w-full">
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;