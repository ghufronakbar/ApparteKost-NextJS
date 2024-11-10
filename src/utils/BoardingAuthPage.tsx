import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { ACCESS_TOKEN } from "@/constant";
import { ResponseFail, ResponseSuccess } from "@/models/Response";
import { Decoded } from "@/models/Account";
import { toastError } from "@/helper/toast";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";

const BoardingAuthPage = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (props: any) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      if (router.isReady) {
        const fetchData = async () => {
          const path = router.asPath;
          const accessToken = Cookie.get(ACCESS_TOKEN);
          if (!accessToken) {
            router.push(`/login?redirect=${path}`);
            toastError("Login terlebih dahulu!");
            return;
          }
          try {
            const { data } = await axios.get<ResponseSuccess<Decoded>>(
              "/api/check-auth",
              {
                params: {
                  auth: accessToken,
                },
              }
            );
            setLoading(false);
            if (data.data.role !== "BOARDING_HOUSE") {
              toastError("Login terlebih dahulu!");
              router.push(`/login?redirect=${path}`);
            }
          } catch (error) {
            console.log(error);
            const err = error as ResponseFail;
            toastError("Login terlebih dahulu!");
            if (err?.status === 401) {
              router.push(`/login?redirect=${path}`);
            }
          }
        };

        fetchData();
      }
    }, [router]);

    if (loading) {
      return (
        <div className="flex h-screen w-screens items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    return (
      <>
        <WrappedComponent {...props} />
        <Toaster />
      </>
    );
  };

  return WithAuthComponent;
};

export default BoardingAuthPage;
