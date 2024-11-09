import SearchInput from "@/components/SearchInput";
import SidebarAdmin from "@/components/SidebarAdmin";
import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/constant";
import formatPhone from "@/helper/formatPhone";
import formatRupiah from "@/helper/formatRupiah";
import statusText from "@/helper/statusText";
import { BoardingHouse } from "@/models/Boarding";
import {
  confirmBoarding,
  getAllBoardings,
  getBoardingById,
  uploadPanorama,
} from "@/services/boarding";
import AdminAuthPage from "@/utils/AdminAuthPage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const [data, setData] = useState<BoardingHouse>();
  const [image, setImage] = useState<string>(DEFAULT_IMAGE);
  const [panoramaPicture, setPanoramaPicture] = useState<File>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query as { id: string };

  const fetchData = async () => {
    const res = await getBoardingById(id, router, "admin");
    if (res) {
      setData(res);
      res.pictures &&
        res.pictures.length > 0 &&
        setImage(res.pictures[0].picture);
    }
  };

  const onSuccessConfirm = async () => {
    if (data) {
      setData({ ...data, isPending: false });
    }
    await fetchData();
  };

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [id, router]);

  const handlePictureChange = (picture: string) => setImage(picture);

  const handleSelectPanorama = () => {
    const panorama = document.getElementById("panorama") as HTMLInputElement;
    if (panorama) {
      panorama.click();
    }
  };

  const handlePanoramaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPanoramaPicture(e.target.files[0]);
    }
  };

  const handleConfirm = async (isConfirmed: boolean) => {
    await confirmBoarding(
      id,
      isConfirmed,
      loading,
      setLoading,
      onSuccessConfirm
    );
  };

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      <div className="w-full h-full flex flex-col gap-8 px-8 md:px-24 py-24 md:py-12">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-4xl font-bold">{data?.name}</h2>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 overflow-hidden">
          <div className="w-full md:w-1/2 lg:w-2/3 border rounded-lg shadow-md p-4 flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row w-full gap-2">
              <div className="w-full lg:w-1/3 flex flex-col gap-2">
                <h4 className="font-medium">Foto Kos</h4>
                <Image
                  src={image}
                  alt="Gambar Kos"
                  width={500}
                  height={500}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="flex flex-row gap-2 w-full overflow-auto hide-scrollbar">
                  {data?.pictures?.map((picture, index) => (
                    <Image
                      key={index}
                      src={picture.picture}
                      alt="Gambar Kos"
                      width={500}
                      height={500}
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                      onClick={() => handlePictureChange(picture.picture)}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full aspect-video lg:w-2/3 flex flex-col gap-2">
                <h4 className="font-medium">Gambar Panorama (AR)</h4>
                <Image
                  src={
                    panoramaPicture
                      ? URL.createObjectURL(panoramaPicture)
                      : data?.panoramaPicture ||
                        data?.panoramaPicture ||
                        DEFAULT_IMAGE
                  }
                  alt="Gambar Kos"
                  width={500}
                  height={500}
                  className="h-60 object-cover rounded-lg"
                />
                {!data?.panoramaPicture && (
                  <p className="text-gray-500 text-xs">
                    Belum ada gambar panorama
                  </p>
                )}
                <div className="flex flex-row gap-2">
                  <input
                    type="file"
                    className="hidden"
                    id="panorama"
                    onChange={handlePanoramaChange}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSelectPanorama}
                  >
                    Pilih Gambar
                  </button>
                  {panoramaPicture && (
                    <>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setPanoramaPicture(undefined)}
                      >
                        Batalkan
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          uploadPanorama(
                            id,
                            panoramaPicture,
                            loading,
                            setLoading,
                            () => {
                              setPanoramaPicture(undefined);
                              fetchData();
                            }
                          )
                        }
                      >
                        Unggah Gambar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 bg-gray-50">
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold ">Alamat</th>
                    <td className="px-6 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-1">
                          <div className="flex">
                            <span>Kabupaten/Kota: </span>
                            <span> {data?.district}</span>
                          </div>
                          <div className="flex">
                            <span>Kecamatan: </span>
                            <span> {data?.subdistrict}</span>
                          </div>
                          <div className="flex">
                            <span>Lokasi: </span>
                            <span> {data?.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">
                      Deskripsi
                    </th>
                    <td className="px-6 py-3">{data?.description}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">
                      Kapasitas
                    </th>
                    <td className="px-6 py-3">{data?.maxCapacity} kamar</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">
                      Biaya
                    </th>
                    <td className="px-6 py-3">
                      {formatRupiah(data?.price || 0)}/bulan
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">
                      Status
                    </th>
                    <td className="px-6 py-3">{data && statusText(data)}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">
                      Rating
                    </th>
                    <td className="px-6 py-3">
                      <div className="flex items-center">
                        {data?.averageRating}
                        <FaStar className="inline-block ml-1 text-yellow-400" />
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-md p-4 flex flex-col gap-4">
            <h4 className="text-lg font-bold text-center">Detail Pemilik</h4>
            <Image
              src={data?.ownerPicture || DEFAULT_PROFILE}
              alt="Pemilik Kos"
              width={100}
              height={100}
              className="mx-auto rounded-full object-cover w-20 h-20"
            />
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 bg-gray-50  ">
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">Nama</th>
                    <td className="px-6 py-3">{data?.owner}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold ">Email</th>
                    <td className="px-6 py-3">{data?.email}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-bold  min-w-[150px]">
                      Nomor Telepon
                    </th>
                    <td className="px-6 py-3">{formatPhone(data?.phone)}</td>
                  </tr>
                </thead>
              </table>
              <div className="flex flex-row gap-2 mt-4 mx-auto w-full items-center justify-center">
                {data?.isPending && (
                  <>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md text-md"
                      onClick={() => handleConfirm(true)}
                    >
                      Konfirmasi
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md text-md"
                      onClick={() => handleConfirm(false)}
                    >
                      Tangguhkan
                    </button>
                  </>
                )}
                {!data?.isPending && (
                  <>
                    {!data?.isConfirmed ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md text-md"
                        onClick={() => handleConfirm(true)}
                      >
                        Konfirmasi
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md text-md"
                        onClick={() => handleConfirm(false)}
                      >
                        Tangguhkan
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthPage(BoardingPage);
