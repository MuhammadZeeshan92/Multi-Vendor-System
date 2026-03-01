import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productSlice';
import { fetchPublicVendors } from '../../features/vendors/vendorSlice';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import FiltersBar from '../../components/FiltersBar';
import ProductGrid from '../../components/ProductGrid';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, status, pagination } = useSelector((state) => state.products);
  const { list: vendors } = useSelector((state) => state.vendors);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    vendor: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    // ensure we have vendors for chips
    dispatch(fetchPublicVendors({ featured: true, limit: 24 }));
  }, [dispatch]);

  const handleFiltersChange = (next) => {
    setFilters(next);
  };

  if (status === 'loading' && !list.length) return <Spinner />;

  return (
    <div className="container py-6 space-y-4">
      <Helmet>
        <title>Products — Marketplace</title>
        <meta
          name="description"
          content="Browse all Marketplace products with advanced search, filters, categories, and vendor chips."
        />
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-sm text-gray-600">
            Browse all products with rich filters and vendor discovery.
          </p>
        </div>
      </div>

      <FiltersBar filters={filters} onChange={handleFiltersChange} vendors={vendors} />

      <ProductGrid products={list || []} />

      <Pagination
        pagination={pagination}
        onPageChange={(p) => setFilters({ ...filters, page: p })}
      />
    </div>
  );
};

export default ProductList;