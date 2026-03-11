import { useDispatch } from "react-redux";
import { fetchDashboard } from "../features/admin/adminSlice";
import { fetchActiveUsers } from "../features/admin/adminSlice";
import { fetchActiveSellers } from "../features/admin/adminSlice";

export const ListSection = ({ title, data, currentPage, totalPages, onPageChange, showBlockButton = false, onBlock }) => {
    const dispatch = useDispatch();
    return (
        <div className="mb-10">
            <div className="flex items-end justify-between gap-3 mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-600">Recent activity overview</p>
                </div>
                <div className="text-xs text-gray-500">
                    Page <span className="font-semibold text-gray-900">{currentPage}</span> / {totalPages}
                </div>
            </div>

            <div className="card p-4">
                {data.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-sm font-semibold text-gray-900">No data available</p>
                        <p className="text-sm text-gray-600 mt-1">Try again later.</p>
                    </div>
                ) : (
                    data.map((item) => (
                        <div
                            key={item._id}
                            className="border-b border-gray-100 py-3 flex justify-between items-center gap-3 last:border-none"
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">{item.username}</span>
                                <span className="text-xs text-gray-500">{item.email}</span>
                            </div>

                            <div className="flex gap-2 items-center">

                                {/* If Blocked */}
                                {item.isBlocked ? (
                                    <span className="text-red-600 font-semibold text-xs uppercase tracking-wide">
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
                                            className="px-3 py-1.5 bg-red-600 text-white rounded-xl hover:bg-red-700 text-xs font-semibold shadow-sm"
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
                <div className="flex justify-center mt-4 gap-2 text-sm">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50"
                    >
                        Prev
                    </button>

                    <span className="px-3 py-1.5 text-gray-600">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};