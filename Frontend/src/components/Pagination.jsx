import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;
  const { page, pages } = pagination;
  const pagesArr = [];
  for (let i = 1; i <= pages; i++) pagesArr.push(i);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pagesArr.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-md border ${
            p === page ? 'bg-indigo-600 text-white' : 'bg-white'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;