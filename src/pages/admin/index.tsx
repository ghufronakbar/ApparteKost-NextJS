import SidebarAdmin from "@/components/SidebarAdmin";
import {
  FaUsers,
  FaHome,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";

const DashboardAdminPage = () => {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      <div className="w-full h-full flex flex-col gap-8 px-8 md:px-24 py-24 md:py-12">
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <FaUsers className="text-blue-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Total Pengguna</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <FaHome className="text-green-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Total Kos Terdaftar</h3>
            <p className="text-2xl font-bold">567</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <FaCheckCircle className="text-yellow-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Total Kos Aktif</h3>
            <p className="text-2xl font-bold">345</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <FaClipboardList className="text-red-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Total Permintaan Akun Kos</h3>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
