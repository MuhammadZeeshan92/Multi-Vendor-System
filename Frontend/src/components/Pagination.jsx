import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;
  const { page, pages } = pagination;
  const pagesArr = [];
  for (let i = 1; i <= pages; i += 1) pagesArr.push(i);

  if (pagesArr.length <= 1) return null;

  return (
    <div className="flex justify-center mt-6 space-x-1 text-sm">
      {pagesArr.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 rounded-lg border ${
            p === page
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
