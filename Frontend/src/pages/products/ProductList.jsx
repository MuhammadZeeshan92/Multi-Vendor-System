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
  // console.log('Products:', list);
  // console.log('Vendors:', vendors);

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


  const allProducts = useSelector((s) => s.products.list);

const filtered = React.useMemo(() => {
  return allProducts.filter((p) => {
    if (filters.search && !p.name.match(new RegExp(filters.search, 'i'))) return false;
    if (filters.category && p.category !== filters.category) return false;
    // if (filters.vendor) {
    //     const vid = typeof p.vendor === 'string'
    //       ? p.vendor
    //       : p.vendor?._id;
    //     if (vid !== filters.vendor) return false;
    //   }
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    return true;
  }).sort((a, b) => {
    // add sort logic based on filters.sort
    if (!filters.sort) return 0;
    const dir = filters.sort.startsWith('-') ? -1 : 1;
    const key = filters.sort.replace(/^-/, '');
    return dir * (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
  });
}, [allProducts, filters]);

const paginated = React.useMemo(() => {
  const start = (filters.page - 1) * filters.limit;
  return filtered.slice(start, start + filters.limit);
}, [filtered, filters.page, filters.limit]);

const localPagination = {
  total: filtered.length,
  page: filters.page,
  pages: Math.ceil(filtered.length / filters.limit),
  limit: filters.limit,
};

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

      <ProductGrid products={paginated || []} />

      <Pagination
        pagination={localPagination}
        onPageChange={(p) => setFilters({ ...filters, page: p })}
      />
    </div>
  );
};

export default ProductList;