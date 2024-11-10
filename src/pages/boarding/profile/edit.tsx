import { DEFAULT_IMAGE } from "@/constant";
import { BoardingHouse } from "@/models/Boarding";
import {
  editBoarding,
  getBoardingById,
  uploadOwnerPicture,
} from "@/services/boarding";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BoardingAuthPage from "@/utils/BoardingAuthPage";
import NavBoarding from "@/components/NavBoarding";

const EditProfilePage = () => {
  const [data, setData] = useState<BoardingHouse>();
  const [profilePicture, setProfilePicture] = useState<File>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    const res = await getBoardingById("id", router, "admin");
    res && setData(res);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router]);

  const handleSelectProfile = () => {
    const profile = document.getElementById("profile") as HTMLInputElement;
    if (profile) {
      profile.click();
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof BoardingHouse
  ) => {
    if (data) {
      setData({ ...data, [key]: e.target.value });
    }
  };

  if (!data) {
    return (
      <div className="w-full h-full min-h-screen bg-gray-50 flex">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex">
      <NavBoarding />
      <div className="w-full h-full flex flex-col gap-8 px-8 md:px-24 py-24 md:py-12">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-4xl font-bold">Edit Profil Kos</h2>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 lg:w-2/3 border rounded-lg shadow-md p-4 flex flex-col gap-8">
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 bg-gray-50">
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold min-w-[150px]">
                      Nama Kos
                    </th>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={data?.name || ""}
                        onChange={(e) => onChange(e, "name")}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 px-4 py-2"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold min-w-[150px]">
                      Kabupaten/Kota
                    </th>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={data?.district || ""}
                        onChange={(e) => onChange(e, "district")}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 px-4 py-2"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold min-w-[150px]">
                      Kecamatan
                    </th>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={data?.subdistrict || ""}
                        onChange={(e) => onChange(e, "subdistrict")}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 px-4 py-2"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold min-w-[150px]">
                      Detail Lokasi
                    </th>
                    <td className="px-6 py-3">
                      <textarea
                        value={data?.location || ""}
                        onChange={(e) => onChange(e, "location")}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 px-4 py-2"
                        rows={3}
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold min-w-[150px]">
                      Deskripsi
                    </th>
                    <td className="px-6 py-3">
                      <textarea
                        value={data?.description || ""}
                        onChange={(e) => onChange(e, "description")}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 px-4 py-2"
                        rows={3}
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold min-w-[150px]">
                      Kapasitas
                    </th>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        value={data?.maxCapacity || 0}
                        onChange={(e) => onChange(e, "maxCapacity")}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 px-4 py-2"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold min-w-[150px]">Biaya</th>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        value={data?.price || 0}
                        onChange={(e) => onChange(e, "price")}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 px-4 py-2"
                      />
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 border rounded-lg shadow-md p-4 flex flex-col gap-4">
            <h4 className="text-lg font-bold text-center">Detail Pemilik</h4>
            <Image
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : data?.ownerPicture || data?.ownerPicture || DEFAULT_IMAGE
              }
              alt="Pemilik Kos"
              width={100}
              height={100}
              className="mx-auto rounded-full object-cover w-20 h-20"
            />
            <div className="flex flex-row gap-2 items-center justify-center">
              <input
                type="file"
                className="hidden"
                id="profile"
                onChange={handleProfilePictureChange}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 text-sm  rounded"
                onClick={handleSelectProfile}
              >
                Pilih Gambar
              </button>
              {profilePicture && (
                <>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 text-sm  rounded"
                    onClick={() => setProfilePicture(undefined)}
                  >
                    Batalkan
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 text-sm  rounded"
                    onClick={() =>
                      uploadOwnerPicture(
                        profilePicture,
                        loading,
                        setLoading,
                        () => {
                          setProfilePicture(undefined);
                          fetchData();
                        }
                      )
                    }
                  >
                    Ganti Foto Profile
                  </button>
                </>
              )}
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 bg-gray-50  ">
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">Nama</th>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        className="border rounded-md px-2 py-1 w-full"
                        value={data?.owner}
                        onChange={(e) => onChange(e, "owner")}
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold ">Email</th>
                    <td className="px-6 py-3">
                      <input
                        type="email"
                        className="border rounded-md px-2 py-1 w-full"
                        value={data?.email}
                        onChange={(e) => onChange(e, "email")}
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">
                      Nomor Telepon
                    </th>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        className="border rounded-md px-2 py-1 w-full"
                        value={data?.phone}
                        onChange={(e) => onChange(e, "phone")}
                      />
                    </td>
                  </tr>
                </thead>
              </table>
              <div className="flex flex-row gap-2 mt-4 mx-auto w-full items-center justify-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-md"
                  onClick={() => editBoarding(data, loading, setLoading)}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingAuthPage(EditProfilePage);
