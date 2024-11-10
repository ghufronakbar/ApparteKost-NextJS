import NavBoarding from "@/components/NavBoarding";
import BoardingAuthPage from "@/utils/BoardingAuthPage";
import { FaHome, FaExchangeAlt, FaBed } from "react-icons/fa";
import { FaBedPulse } from "react-icons/fa6";

const DashboardBoardingPage = () => {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex">
      <NavBoarding />
      <div className="w-full h-full flex flex-col gap-8 px-8 md:px-24 py-24 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <FaExchangeAlt className="text-blue-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Total Transaksi</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <FaBed className="text-green-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Jumlah Kamar</h3>
            <p className="text-2xl font-bold">567</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <FaBedPulse className="text-yellow-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Total Kamar Terisi</h3>
            <p className="text-2xl font-bold">345</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <FaHome className="text-red-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Total Kamar Kosong</h3>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingAuthPage(DashboardBoardingPage);
