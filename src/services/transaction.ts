import axiosInstance from "@/config/axiosInstance";
import { ACCESS_TOKEN } from "@/constant";
import { toastError, toastLoading, toastSuccess } from "@/helper/toast";
import { LoginRes } from "@/models/Account";
import { BoardingHouse } from "@/models/Boarding";
import { ResponseFail, ResponseSuccess } from "@/models/Response";
import {
  Booking,
  initTransaction,
  Room,
  Transaction,
} from "@/models/Transaction";
import Cookies from "js-cookie";
import { NextRouter } from "next/router";

export const getAllTransactions = async (active = false) => {
  try {
    const { data } = await axiosInstance.get<ResponseSuccess<Transaction>>(
      "/transactions",
      {
        params: {
          active,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResponseFail;
    toastError(err.response?.data.message);
    return initTransaction;
  }
};

export const setInactive = async (
  id: string,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  afterSuccess?: () => void
) => {
  if (isLoading) return;
  toastLoading();
  try {
    setIsLoading(true);
    const { data } = await axiosInstance.patch<ResponseSuccess<Transaction>>(
      `/transactions/${id}`,
      {
        active: false,
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
    setIsLoading(false);
  }
};
