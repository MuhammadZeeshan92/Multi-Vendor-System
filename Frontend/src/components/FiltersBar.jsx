import React, { useState, useEffect } from 'react';

const defaultCategories = ['All', 'Furniture', 'Decor', 'Electronics', 'Fashion'];

const FiltersBar = ({ filters, onChange, vendors = [] }) => {
  const [search, setSearch] = useState(filters.search || '');

  // debounce search input -> notify parent after 300ms
  useEffect(() => {
    const id = setTimeout(() => {
      onChange({ ...filters, search, page: 1 });
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleCategory = (value) => {
    onChange({
      ...filters,
      category: value === 'All' ? '' : value,
      page: 1,
    });
  };

  const handleSort = (e) => {
    onChange({
      ...filters,
      sort: e.target.value,
      page: 1,
    });
  };

  const handlePrice = (key, value) => {
    onChange({
      ...filters,
      [key]: value ? Number(value) : '',
      page: 1,
    });
  };

  const handleVendor = (id) => {
    onChange({
      ...filters,
      vendor: filters.vendor === id ? '' : id,
      page: 1,
    });
  };

  return (
    <section className="card p-4 space-y-3 mb-4">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Search products"
        />

        <div className="flex gap-2">
          <select
            value={filters.sort || ''}
            onChange={handleSort}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
            aria-label="Sort products"
          >
            <option value="">Sort</option>
            <option value="-createdAt">Newest</option>
            <option value="-price">Price: High to low</option>
            <option value="price">Price: Low to high</option>
            <option value="-rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center text-xs">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {defaultCategories.map((cat) => {
            const isActive = (filters.category || '') === (cat === 'All' ? '' : cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategory(cat)}
                className={`px-3 py-1.5 rounded-full border text-xs ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Price range */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-gray-500">Price</span>
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handlePrice('minPrice', e.target.value)}
            className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-xs"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePrice('maxPrice', e.target.value)}
            className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-xs"
          />
        </div>
      </div>

      {/* Vendor chips */}
      {vendors.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 whitespace-nowrap">All Vendor</span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {vendors.map((v) => {
              const active = filters.vendor === v._id;
              return (
                <button
                  key={v._id}
                  type="button"
                  onClick={() => handleVendor(v._id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden">
                    {v.logo ? (
                      <img
                        src={v.logo}
                        alt={v.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-semibold text-indigo-600">
                        {v.name?.[0] || 'V'}
                      </span>
                    )}
                  </div>
                  <span className="font-medium max-w-[120px] truncate">{v.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default FiltersBar;

