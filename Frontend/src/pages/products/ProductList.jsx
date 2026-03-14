import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productSlice';
import { fetchPublicVendors } from '../../features/vendors/vendorSlice';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import FiltersBar from '../../components/FiltersBar';
import ProductGrid from '../../components/ProductGrid';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import PageHero from '../../components/PageHero';

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
    // only fetch if we don't have vendors or to ensure we have them
    dispatch(fetchPublicVendors({ featured: true, limit: 24 }));
  }, [dispatch]);

  const handleFiltersChange = (next) => {
    setFilters(next);
  };

  if (status === 'loading' && !list.length) return <Spinner />;

  return (
    <Page className="container py-6 space-y-4">
      <Helmet>
        <title>Products — Marketplace</title>
        <meta
          name="description"
          content="Browse all Marketplace products with advanced search, filters, categories, and vendor chips."
        />
      </Helmet>
      <PageHero 
        title="Discover Premium Products" 
        subtitle="Explore our vast marketplace of curated items from trusted vendors around the world."
        gradient="from-indigo-600 via-indigo-700 to-purple-800"
      />
      <PageHeader
        title="Products"
        subtitle="Browse all products with rich filters and vendor discovery."
      />

      <FiltersBar filters={filters} onChange={handleFiltersChange} vendors={vendors} />

      <ProductGrid products={list || []} />

      {pagination && pagination.pages > 1 && (
        <Pagination
          pagination={pagination}
          onPageChange={(p) => setFilters({ ...filters, page: p })}
        />
      )}
    </Page>
  );
};

export default ProductList;