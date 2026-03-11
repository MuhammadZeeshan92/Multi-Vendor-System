import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;
  const { page, pages } = pagination;
  const pagesArr = [];
  for (let i = 1; i <= pages; i += 1) pagesArr.push(i);

  if (pagesArr.length <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-8 gap-2 text-sm">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        Prev
      </button>

      <div className="flex items-center gap-1">
        {pagesArr.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`h-9 min-w-9 px-3 rounded-xl border transition ${
              p === page
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(pages, page + 1))}
        disabled={page >= pages}
        className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
