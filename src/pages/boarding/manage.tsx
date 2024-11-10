import SearchInput from "@/components/SearchInput";
import { DEFAULT_IMAGE } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import BoardingAuthPage from "@/utils/BoardingAuthPage";
import { Transaction } from "@/models/Transaction";
import { getAllTransactions, setInactive } from "@/services/transaction";
import formatDate from "@/helper/formatDate";
import NavBoarding from "@/components/NavBoarding";

const FIELDS = ["No", "", "Nama", "Status", "Tanggal Pemesanan", ""];

const ManagePage = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Transaction>();
  const [loading, setLoading] = useState<boolean>(false);
  const filteredData = data?.bookings?.filter(
    (item) =>
      item.user.name.toLowerCase().includes(search.toLowerCase()) ||
      item.user.email.toLowerCase().includes(search.toLowerCase()) ||
      item.user.phone.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    const res = await getAllTransactions(true);
    res && setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex">
      <NavBoarding />
      <div className="w-full h-full flex flex-col gap-8 px-8 md:px-24 py-24 md:py-12">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-4xl font-bold">Kelola Kamar Aktif</h2>
        </div>
        <SearchInput search={search} setSearch={setSearch} />
        <div className="flex flex-row gap-4 text-sm">
          <p>Total Kamar: {data?.room.total}</p>
          <p>Tersedia: {data?.room.available}</p>
          <p>Aktif: {data?.room.active}</p>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                {FIELDS.map((field) => (
                  <th key={field} scope="col" className="px-6 py-3">
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item, index) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 min-w-[100px]">
                    <Image
                      src={item.user.picture || DEFAULT_IMAGE}
                      alt={item.user.name}
                      width={50}
                      height={50}
                      className="w-10 h-10 rounded-lg"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 text-gray-900 whitespace-nowrap "
                  >
                    <div className="flex flex-col">
                      <p className="font-medium">{item.user.name}</p>
                      <p>{item.user.email}</p>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {item.isActive ? "Aktif" : "Tidak Aktif"}
                  </td>
                  <td className="px-6 py-4">{formatDate(item.bookedDate)}</td>
                  <td>
                    {item.isActive && (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          setInactive(
                            item.bookingId.toString(),
                            loading,
                            setLoading,
                            fetchData
                          )
                        }
                      >
                        Non Aktifkan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoardingAuthPage(ManagePage);
