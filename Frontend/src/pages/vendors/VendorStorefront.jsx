import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVendorProfile, fetchVendorProducts } from '../../features/vendors/vendorSlice';
import Spinner from '../../components/Spinner';
import VendorProfileCard from '../../components/VendorProfileCard';
import ProductGrid from '../../components/ProductGrid';

const VendorStorefront = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, products, status, productsPagination } = useSelector((state) => state.vendors);
  console.log("Vendor",current,"Products", products);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchVendorProfile(id));
    dispatch(fetchVendorProducts({ id, params: { page: 1, limit: 12 } }));
  }, [dispatch, id]);

  if (status === 'loading' && !current) {
    return (
      <div className="container py-10">
        <Spinner />
      </div>
    );
  }

  if (!current) {
    return (
      <div className="container py-10">
        <Helmet>
          <title>Vendor — Marketplace</title>
        </Helmet>
        <p className="text-gray-700">Vendor not found.</p>
      </div>
    );
  }

  const vendorTitle = current.name ? `${current.name} — Storefront — Marketplace` : 'Vendor — Marketplace';

  return (
    <div className="container py-8 space-y-8">
      <Helmet>
        <title>{vendorTitle}</title>
        {current.banner && <meta property="og:image" content={current.banner} />}
      </Helmet>
      <VendorProfileCard vendor={current} />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          {products && (
            <p className="text-sm text-gray-500">
              {products.length} items
            </p>
          )}
        </div>

        <ProductGrid products={products} hideVendor />
      </section>
    </div>
  );
};

export default VendorStorefront;

