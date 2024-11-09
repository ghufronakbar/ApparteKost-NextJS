import { BoardingHouse } from "@/models/Boarding";

const statusText = (item: BoardingHouse): string => {
  console.log({
    isPending: item.isPending,
    isConfirmed: item.isConfirmed,
    isActive: item.isActive,
  });
  if (item.isPending) {
    return "Menunggu Konfirmasi";
  } else if (item.isConfirmed && !item.isActive) {
    return "Tidak Aktif";
  } else if (item.isConfirmed && item.isActive) {
    return "Aktif";
  } else if (!item.isPending && !item.isConfirmed) {
    return "Pengajuan Ditolak";
  } else {
    return "";
  }
};

export default statusText;
