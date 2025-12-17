export const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center justify-between bg-[#1F2937] p-4 rounded-xl shadow-xl">
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-gray-200 font-semibold">{value}</p>
    </div>
    {icon}
  </div>
);