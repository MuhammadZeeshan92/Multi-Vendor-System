import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productSlice';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, status, pagination } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({ search: '', category: '', page: 1, limit: 12 });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  // Category, price filters etc follow similar pattern

  if (status === 'loading') return <Spinner />;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-4">Products</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(list || []).map((p) => (
          <ProductCard key={p._id} {...p} />
        ))}
      </div>
      <Pagination
        pagination={pagination}
        onPageChange={(p) => setFilters({ ...filters, page: p })}
      />
    </div>
  );
};

export default ProductList;