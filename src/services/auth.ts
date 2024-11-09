import axiosInstance from "@/config/axiosInstance";
import { ACCESS_TOKEN } from "@/constant";
import { toastError, toastLoading, toastSuccess } from "@/helper/toast";
import { LoginRes } from "@/models/Account";
import { ResponseFail, ResponseSuccess } from "@/models/Response";
import Cookies from "js-cookie";
import { NextRouter } from "next/router";

export interface FormLogin {
  email: string;
  password: string;
}

export const initFormLogin: FormLogin = {
  email: "",
  password: "",
};

export const login = async (
  form: FormLogin,
  router: NextRouter,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void
) => {
  if (isLoading) return;
  try {
    toastLoading();
    const { data } = await axiosInstance.post<ResponseSuccess<LoginRes>>(
      "/auth/login",
      form
    );
    Cookies.set(ACCESS_TOKEN, data.data.accessToken);
    toastSuccess(data.message);
    if (data.data.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/boarding");
    }
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  } finally {
    setIsLoading(false);
  }
};

export interface FormRegisterBoarding {
  name: string;
  owner: string;
  email: string;
  phone: string;
  description: string;
  district: string;
  subdistrict: string;
  location: string;
  panoramaPicture: string;
  maxCapacity?: number;
  price?: number;
}

export const initFormRegisterBoarding: FormRegisterBoarding = {
  name: "",
  owner: "",
  email: "",
  phone: "",
  description: "",
  district: "",
  subdistrict: "",
  location: "",
  panoramaPicture: "",
  maxCapacity: undefined,
  price: undefined,
};

export const registerBoarding = async (
  form: FormRegisterBoarding,
  pictures: File[],
  router: NextRouter,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void
) => {
  if (isLoading) return;
  if (!form.phone.startsWith("62")) {
    toastError("Nomor telepon harus dimulai dengan 62");
    return;
  }
  if (form.maxCapacity === undefined || form.price === undefined) {
    toastError("Kapasistas dan biaya harus diisi");
    return;
  }
  if (pictures.length === 0) {
    toastError("Foto harus diisi");
    return;
  }
  try {
    const formData = new FormData();
    if (form) {
      Object.keys(form).forEach((key) => {
        formData.append(
          key,
          form[key as keyof FormRegisterBoarding]?.toString() ?? ""
        );
      });
    }
    pictures.forEach((picture, index) => {
      formData.append(`pictures`, picture, `picture_${index}`);
    });
    toastLoading();
    const { data } = await axiosInstance.post<ResponseSuccess>(
      "/auth/register-boarding",
      formData
    );
    toastSuccess(data.message);
    router.push("/login");
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  } finally {
    setIsLoading(false);
  }
};
