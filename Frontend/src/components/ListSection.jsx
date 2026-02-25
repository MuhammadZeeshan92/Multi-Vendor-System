import { useDispatch } from "react-redux";
import { fetchDashboard } from "../features/admin/adminSlice";
import { fetchActiveUsers } from "../features/admin/adminSlice";
import { fetchActiveSellers } from "../features/admin/adminSlice";

export const ListSection = ({ title, data, currentPage, totalPages, onPageChange, showBlockButton = false, onBlock }) => {
    const dispatch = useDispatch();
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
                            className="border-b py-2 flex justify-between items-center"
                        >
                            <div className="flex flex-col">
                                <span>{item.username}</span>
                                <span className="text-sm text-gray-500">{item.email}</span>
                            </div>

                            <div className="flex gap-2 items-center">

                                {/* If Blocked */}
                                {item.isBlocked ? (
                                    <span className="text-red-600 font-semibold">
                                        Permanently Blocked
                                    </span>
                                ) : (
                                    showBlockButton && (
                                        <button
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to permanently block this account?")) {
                                                    onBlock(item._id);
                                                    dispatch(fetchDashboard())
                                                    dispatch(fetchActiveUsers({ page: currentPage, limit: 5 }));
                                                    dispatch(fetchActiveSellers({ page: currentPage, limit: 5 }));
                                                }
                                            }}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Block
                                        </button>
                                    )
                                )}

                            </div>
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