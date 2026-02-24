import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ProductCard = ({ _id, name, price, images, stock, isActive }) => {
  const disabled = stock === 0 || isActive === false;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <Link to={`/products/${_id}`}>
        <img
          src={images?.[0]}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-700 mb-2">${price}</p>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            stock > 5
              ? 'bg-emerald-100 text-emerald-700'
              : stock > 0
              ? 'bg-amber-100 text-amber-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {stock > 0 ? stock : 'Out of stock'}
        </span>
        <Button
          onClick={() => window.location.href = `/products/${_id}`}
          disabled={disabled}
          className="mt-4 w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;