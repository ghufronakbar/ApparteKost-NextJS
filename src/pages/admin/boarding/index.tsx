import SearchInput from "@/components/SearchInput";
import SidebarAdmin from "@/components/SidebarAdmin";
import { DEFAULT_IMAGE } from "@/constant";
import statusText from "@/helper/statusText";
import { BoardingHouse } from "@/models/Boarding";
import { getAllBoardings } from "@/services/boarding";
import AdminAuthPage from "@/utils/AdminAuthPage";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const FIELDS = [
  "No",
  "",
  "Nama Kos",
  "Pemilik",
  "Alamat",
  "Rating",
  "Status",
  "",
];

const BoardingPage = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<BoardingHouse[]>([]);
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.owner.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase()) ||
      item.subdistrict.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    getAllBoardings().then((res) => {
      res && setData(res);
    });
  }, []);
  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      <div className="w-full h-full flex flex-col gap-8 px-8 md:px-24 py-24 md:py-12">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-4xl font-bold">Daftar Kos</h2>
        </div>
        <SearchInput search={search} setSearch={setSearch} />
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
              {filteredData.map((item, index) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 min-w-[100px]">
                    <Image
                      src={
                        (item.pictures.length > 0 &&
                          item.pictures[0].picture) ||
                        DEFAULT_IMAGE
                      }
                      alt={item.name}
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
                      <p className="font-medium">{item.name}</p>
                      <p>{item.email}</p>
                    </div>
                  </th>
                  <td className="px-6 py-4">{item.owner}</td>
                  <td className="px-6 py-4">
                    {`${item.subdistrict}, ${item.district}, ${item.location}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {item.averageRating}
                      <FaStar className="inline-block ml-1 text-yellow-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4">{statusText(item)}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/boarding/${item.boardingHouseId}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Detail
                    </Link>
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

export default AdminAuthPage(BoardingPage);
