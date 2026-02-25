export const ListSection = ({ title, data, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="bg-white shadow rounded p-4">
        {data.length === 0 ? (
          <p>No data available</p>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className="border-b py-2 flex justify-between"
            >
              <span>{item.username}</span>
              <span>{item.email}</span>
            </div>
          ))
        )}

        {/* PAGINATION BUTTONS */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};