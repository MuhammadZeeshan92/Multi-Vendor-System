import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Page from '../../components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../features/products/productSlice';
import { addItem } from '../../features/cart/cartSlice';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import VendorProfileCard from '../../components/VendorProfileCard';
import MoreFromSellerCarousel from '../../components/MoreFromSellerCarousel';
import PageHeader from '../../components/PageHeader';

const formatCurrency = (value) => {
  if (typeof value !== 'number') return value;
  return `$${value.toFixed(2)}`;
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, status } = useSelector((state) => state.products);
  const [added, setAdded] = useState(false);

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setQty(1);
    setSelectedImage(0);
  }, [id]);

  if (status === 'loading' || !current) {
    return (
      <div className="container py-10">
        <Spinner />
      </div>
    );
  }

  const images = current.images || [];
  const mainImage =
    images[selectedImage] ||
    'https://via.placeholder.com/800x600?text=Product';

  const inStock = current.stock > 0;
  const lowStock = current.stock > 0 && current.stock <= 5;

  const stockClasses = inStock
    ? lowStock
      ? 'bg-amber-100 text-amber-700'
      : 'bg-emerald-100 text-emerald-700'
    : 'bg-red-100 text-red-700';

  const stockLabel = !inStock
    ? 'Out of stock'
    : lowStock
      ? `Only ${current.stock} left`
      : 'In stock';

  const handleAddToCart = () => {
    if (!inStock) return;

    dispatch(
      addItem({
        productId: current._id,
        name: current.name,
        price: current.price,
        qty,
        image: current.images?.[0] || '',
        vendorId: current.vendor?._id || current.vendorId,
        vendorName: current.vendor?.name,
        vendor: current.vendor || undefined,
        stock: current.stock,
      })
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const vendor = current.vendor
    ? current.vendor
    : current.vendorId
      ? { _id: current.vendorId, name: 'Vendor' }
      : null;

  const pageTitle = current.name ? `${current.name} — Marketplace` : 'Product — Marketplace';
  const ogImage = current.images?.[0];

  return (
    <Page className="container py-6 lg:py-8 space-y-10">
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={current.shortDescription || current.description || 'Product detail page.'}
        />
        {ogImage && <meta property="og:image" content={ogImage} />}
      </Helmet>
      <PageHeader title={current.name || 'Product'} />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Gallery */}
        <div className="flex-1 space-y-4">
          <div className="card overflow-hidden">
            <div className="aspect-[4/3] w-full bg-gray-50">
              <img
                src={mainImage}
                alt={current.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`h-16 w-20 rounded-md overflow-hidden border ${idx === selectedImage
                    ? 'border-indigo-600 ring-2 ring-indigo-100'
                    : 'border-gray-200'
                    }`}
                >
                  <img
                    src={img}
                    alt={`${current.name} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-5">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {current.name}
            </h1>
            {typeof current.rating === 'number' && (
              <p className="text-sm text-gray-600">
                ⭐ {current.rating.toFixed(1)} · {current.numReviews || 0} reviews
              </p>
            )}
          </div>

          <div className="card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(current.price)}
              </p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockClasses}`}>
                {stockLabel}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              {current.shortDescription || current.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Quantity</span>
                <input
                  type="number"
                  min="1"
                  max={current.stock}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.min(current.stock, Math.max(1, Number(e.target.value) || 1)))
                  }
                  className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm"
                  aria-label="Quantity"
                />
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`w-full
    h-12
    rounded-xl
    text-base
    font-semibold
    transition-all
    duration-200
    shadow-sm
    hover:shadow-md
    active:scale-[0.98]
  ${added ? 'bg-green-600 hover:bg-green-600' : ''}`}
              >
                {!inStock
                  ? 'Out of stock'
                  : added
                    ? '✓ Added'
                    : 'Add to cart'}
              </Button>
            </div>
          </div>

          {/* <VendorProfileCard vendor={vendor} /> */}
        </div>
      </div>

      {/* Tabs */}
      <section className="card p-4 md:p-6 space-y-4">
        <div className="border-b border-gray-100 flex gap-4 text-sm">
          {['description', 'specs', 'reviews'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 border-b-2 -mb-px font-medium ${activeTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'description'
                ? 'Description'
                : tab === 'specs'
                  ? 'Specifications'
                  : 'Reviews'}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="text-sm text-gray-700 space-y-2">
            <p>{current.description || 'No description available.'}</p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="text-sm text-gray-700">
            <p className="text-gray-500">Specifications coming soon.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="text-sm text-gray-700">
            <p className="text-gray-500">Reviews integration not available yet.</p>
          </div>
        )}
      </section>

      <MoreFromSellerCarousel
        vendorId={current.vendor?._id || current.vendorId}
        currentProductId={current._id}
      />

      {/* Mobile sticky CTA */}
      {inStock && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_12px_rgba(15,23,42,0.06)] lg:hidden">
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(current.price * qty)}
            </p>
          </div>
          <Button onClick={handleAddToCart} disabled={!inStock} className="flex-1">
            Add to cart
          </Button>
        </div>
      )}
    </Page>
  );
};

export default ProductDetail;
