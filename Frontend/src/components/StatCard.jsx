export const StatCard = ({ title, value }) => (
  <div className="card p-4">
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {title}
    </p>
    <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);