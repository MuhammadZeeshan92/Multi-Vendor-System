import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import VendorCardSmall from './VendorCardSmall';

const formatCurrency = (value) => {
  if (typeof value !== 'number') return value;
  return `$${value.toFixed(2)}`;
};

const ProductCard = ({
  _id,
  name,
  price,
  images,
  stock,
  isActive,
  vendorId,
  vendor,
  hideVendor = false,
}) => {
  const disabled = stock === 0 || isActive === false;
  const inStock = stock > 0;
  const lowStock = stock > 0 && stock <= 5;

  let stockLabel = 'Out of stock';
  if (inStock && !lowStock) stockLabel = 'In stock';
  if (lowStock) stockLabel = `Only ${stock} left`;

  const stockClasses = inStock
    ? lowStock
      ? 'bg-amber-100 text-amber-700'
      : 'bg-emerald-100 text-emerald-700'
    : 'bg-red-100 text-red-700';

  const primaryImage =
    images?.[0] || 'https://via.placeholder.com/600x400?text=Product';

  return (
    <div className="card scale-hover flex flex-col h-full">
      <Link to={`/products/${_id}`} className="block overflow-hidden">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
          <img
            src={primaryImage}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
          {!hideVendor && (vendor || vendorId) && (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <span className="uppercase tracking-wide">Sold by</span>
              {vendor ? (
                <VendorCardSmall vendor={vendor} />
              ) : (
                <span className="font-medium text-gray-700">
                  {vendorId || 'Vendor'}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(price)}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-[11px] font-medium ${stockClasses}`}
          >
            {inStock ? stockLabel : 'Out of stock'}
          </span>
        </div>

        <div className="mt-3">
          <Button
            onClick={() => (window.location.href = `/products/${_id}`)}
            disabled={disabled}
            className="w-full"
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;