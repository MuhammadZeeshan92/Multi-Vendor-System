import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
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
  images = [],
  stock,
  isActive,
  vendorId,
  vendor,
  hideVendor = false,
}) => {
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

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

  const hasImages = images && images.length > 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    dispatch(
      addItem({
        productId: _id,
        name,
        price,
        qty: 1,
        image: images[0] || '',
        vendorId: vendor?._id || vendorId,
        vendorName: vendor?.name || 'Vendor',
        stock,
      })
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card scale-hover flex flex-col h-full group">
      <div className="relative">
        <Link to={`/products/${_id}`} className="block overflow-hidden">
          <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 flex items-center justify-center">
            {hasImages ? (
              <img
                src={images[currentImageIndex]}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            ) : (
              <div className="text-gray-400 text-sm">No image</div>
            )}
          </div>
        </Link>

        {/* Stock badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${stockClasses} shadow-sm border border-white/60`}
          >
            {inStock ? stockLabel : 'Out of stock'}
          </span>
        </div>

        {/* Slider Controls */}
        {hasImages && images.length > 1 && (
          <>
            {/* Prev */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImageIndex((prev) =>
                  prev - 1 < 0 ? images.length - 1 : prev - 1
                );
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImageIndex((prev) =>
                  (prev + 1) % images.length
                );
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === idx
                      ? 'bg-indigo-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="space-y-1">
          <Link to={`/products/${_id}`} className="hover:no-underline">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 min-h-[2.5rem] hover:text-indigo-600 transition-colors">
              {name}
            </h3>
          </Link>

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
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(price)}
          </p>
        </div>

        <div className="mt-3 flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={disabled}
            className={`flex-1 text-xs py-2 px-0 shadow-none hover:shadow-sm transition-all duration-300 ${added ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {added ? '✓ Added' : 'Add to cart'}
          </Button>
          <Link
            to={`/products/${_id}`}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
            title="View Details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;