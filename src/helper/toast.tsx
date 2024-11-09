import { toaster } from "@/components/ui/toaster";

export const toastLoading = () => {
  toaster.create({
    title: "Harap tunggu",
    type: "info",
  });
};

export const toastSuccess = (message: string) => {
  toaster.create({
    title: message,
    type: "success",
  });
};

export const toastError = (message?: string | null) => {
  toaster.create({
    title: message || "Terjadi kesalahan",
    type: "error",
  });
};
