import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FormLogin, initFormLogin, login } from "@/services/auth";
import Copyright from "@/components/Copyright";
import Link from "next/link";

const LoginPage = () => {
  const [form, setForm] = useState<FormLogin>(initFormLogin);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form, router, isLoading, setIsLoading);
  };

  const onChange = (
    key: keyof FormLogin,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [key]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="hidden md:block md:fixed inset-y-0 left-0 w-1/2 h-screen overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dga0wmldp/image/upload/v1731071022/indekos/panorama/OYz1CtPK.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="fixed inset-0 w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 p-8 ml-auto">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 20c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9z"></path>
                <path d="M15 11h-2V9a2 2 0 0 0-4 0v2H7v4h2v2a2 2 0 0 0 4 0v-2h2v-4zm-4-2h2v2h-2z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-6">
              Login <span className="text-primary">ApparteKost</span>
            </h1>
          </div>
          <form className="space-y-6" onSubmit={handleClick}>
            <div>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Email"
                value={form.email}
                onChange={(e) => onChange("email", e)}
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
                value={form.password}
                onChange={(e) => onChange("password", e)}
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="rememberMe" className="mr-2" />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
            >
              Login
            </button>
            <p className="text-center text-sm mt-4">
              Belum memiliki akun?{" "}
              <Link href="/register" className="text-primary underline">
                Daftar disini
              </Link>
            </p>
          </form>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
