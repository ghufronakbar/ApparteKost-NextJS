import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  FormRegisterBoarding,
  initFormRegisterBoarding,
  registerBoarding,
} from "@/services/auth";
import Copyright from "@/components/Copyright";
import Link from "next/link";
import { LuX } from "react-icons/lu";

const RegisterPage = () => {
  const [form, setForm] = useState<FormRegisterBoarding>(
    initFormRegisterBoarding
  );
  const [pictures, setPictures] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerBoarding(form, pictures, router, isLoading, setIsLoading);
  };

  const onChange = (
    key: keyof FormRegisterBoarding,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPictures([...pictures, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setPictures(pictures.filter((_, i) => i !== index));
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
              Register <span className="text-primary">ApparteKost</span>
            </h1>
          </div>
          <form className="space-y-6" onSubmit={handleRegister}>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Nama Kos"
              value={form.name}
              onChange={(e) => onChange("name", e)}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Pemilik"
              value={form.owner}
              onChange={(e) => onChange("owner", e)}
            />
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Email"
              value={form.email}
              onChange={(e) => onChange("email", e)}
            />
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Nomor Telepon"
              value={form.phone}
              onChange={(e) => onChange("phone", e)}              
            />
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Deskripsi"
              value={form.description}
              onChange={(e) => onChange("description", e)}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Kabupaten/Kota"
              value={form.district}
              onChange={(e) => onChange("district", e)}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Kecamatan"
              value={form.subdistrict}
              onChange={(e) => onChange("subdistrict", e)}
            />
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Detail Lokasi"
              value={form.location}
              onChange={(e) => onChange("location", e)}
              rows={4}
            />
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Kapasitas Kamar"
              value={form.maxCapacity}
              onChange={(e) => onChange("maxCapacity", e)}
            />
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Biaya"
              value={form.price}
              onChange={(e) => onChange("price", e)}
            />
            <input
              type="file"
              multiple
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleFileChange}
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {pictures.map((file, index) => (
                <div key={index} className="relative w-24 h-24">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="object-cover w-full h-full rounded"
                    width={200}
                    height={200}
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 overflow-hidden flex items-center justify-center"
                    onClick={() => removeFile(index)}
                  >
                    <LuX className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition duration-300"
              disabled={isLoading}
            >
              Register
            </button>
            <p className="text-center text-sm mt-4">
              Sudah memiliki akun?{" "}
              <Link href="/login" className="text-primary underline">
                Masuk!
              </Link>
            </p>
          </form>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
