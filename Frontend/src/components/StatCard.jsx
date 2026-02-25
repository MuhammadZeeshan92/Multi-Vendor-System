export const StatCard = ({ title, value }) => (
  <div className="bg-white shadow p-4 rounded">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl">{value}</p>
  </div>
);