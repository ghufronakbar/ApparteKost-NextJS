import axiosInstance from "@/config/axiosInstance";
import { ACCESS_TOKEN } from "@/constant";
import { toastError, toastLoading, toastSuccess } from "@/helper/toast";
import { LoginRes } from "@/models/Account";
import { AdminDashboard, BoardingHouse } from "@/models/Boarding";
import { ResponseFail, ResponseSuccess } from "@/models/Response";
import Cookies from "js-cookie";
import { NextRouter } from "next/router";

export const getAllBoardings = async () => {
  try {
    const { data } = await axiosInstance.get<ResponseSuccess<BoardingHouse[]>>(
      "/boardings"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
    return [];
  }
};

export const getAdminDashboard = async () => {
  try {
    const { data } = await axiosInstance.get<ResponseSuccess<AdminDashboard>>(
      "/boardings/dashboard"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  }
};

export const getBoardingById = async (
  id: string,
  router: NextRouter,
  role: string
) => {
  try {
    const { data } = await axiosInstance.get<ResponseSuccess<BoardingHouse>>(
      `/boardings/${id}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
    router.push(`/${role}/boarding`);
  }
};

export const confirmBoarding = async (
  id: string,
  isConfirmed: boolean,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterSuccess?: () => void
) => {
  if (loading) return;
  try {
    setLoading(true);
    toastLoading();
    const { data } = await axiosInstance.patch<ResponseSuccess<BoardingHouse>>(
      `/boardings/${id}/confirm`,
      {
        isConfirmed,
      }
    );
    toastSuccess(data.message);
    afterSuccess?.();
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const setActiveBoarding = async (
  id: string,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterSuccess?: () => void
) => {
  if (loading) return;
  try {
    setLoading(true);
    toastLoading();
    const { data } = await axiosInstance.patch<ResponseSuccess<BoardingHouse>>(
      `/boardings/${id}/active`
    );
    toastSuccess(data.message);
    afterSuccess?.();
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const uploadPanorama = async (
  id: string,
  file: File,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterSuccess?: () => void
) => {
  if (loading) return;
  toastLoading();
  const formData = new FormData();
  formData.append("panorama", file);
  try {
    setLoading(true);
    const { data } = await axiosInstance.patch<ResponseSuccess<BoardingHouse>>(
      `/boardings/${id}/panorama`,
      formData
    );
    toastSuccess(data.message);
    afterSuccess?.();
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const deletePanorama = async (
  id: number,  
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterSuccess?: () => void
) => {
  if (loading) return;
  toastLoading();    
  try {
    setLoading(true);
    const { data } = await axiosInstance.delete<ResponseSuccess<BoardingHouse>>(
      `/boardings/${id}/panorama`,      
    );
    toastSuccess(data.message);
    afterSuccess?.();
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const uploadOwnerPicture = async (
  file: File,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterSuccess?: () => void
) => {
  if (loading) return;
  toastLoading();
  const formData = new FormData();
  formData.append("ownerPicture", file);
  try {
    setLoading(true);
    const { data } = await axiosInstance.patch<ResponseSuccess<BoardingHouse>>(
      `/boardings/owner/picture`,
      formData
    );
    toastSuccess(data.message);
    afterSuccess?.();
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const editBoarding = async (
  item: BoardingHouse,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void
) => {
  if (isLoading) return;
  toastLoading();
  try {
    setIsLoading(true);
    const { data } = await axiosInstance.put<ResponseSuccess<BoardingHouse>>(
      `/boardings/${item.boardingHouseId}`,
      item
    );
    toastSuccess(data.message);
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
  } finally {
    setIsLoading(false);
  }
};
