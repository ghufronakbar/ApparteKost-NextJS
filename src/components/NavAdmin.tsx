import Link from "next/link";
import { useState } from "react";
import {
  HiChartPie,
  HiViewBoards,
  HiLogout,
  HiMenu,
  HiX,
} from "react-icons/hi";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constant";

const LIST_MENU = [
  { href: "/admin", icon: HiChartPie, label: "Dashboard" },
  { href: "/admin/boarding", icon: HiViewBoards, label: "Daftar Kos" },
  { href: "/login", icon: HiLogout, label: "Log Out" },
];

interface NavDesktopProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}
const NavDesktop = ({ isOpen, setIsOpen, handleLogout }: NavDesktopProps) => (
  <div
    className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 z-50 ${
      isOpen ? "w-64 px-2" : "w-16"
    } hidden md:flex flex-col items-center py-6`}
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
  >
    <h2 className="text-2xl font-bold font-sans mb-6">
      {isOpen ? (
        <span className="opacity-100 transition-opacity duration-300">
          ApparteKost
        </span>
      ) : (
        <span className="opacity-100">A</span>
      )}
    </h2>
    <div className="flex flex-col gap-4 w-full">
      {LIST_MENU.map((menu, index) => (
        <Link
          key={index}
          href={menu.href}
          onClick={() => {
            if (menu.href === "/login") {
              handleLogout();
            }
          }}
        >
          <div className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-700 rounded-lg cursor-pointer">
            <menu.icon className="w-6 h-6" />
            <span
              className={`font-medium transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              } ${isOpen ? "block" : "hidden"}`}
            >
              {menu.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const NavMobile = ({ handleLogout }: { handleLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">A</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 p-4 bg-gray-700">
          {LIST_MENU.map((menu, index) => (
            <Link
              key={index}
              href={menu.href}
              onClick={() => {
                if (menu.href === "/login") {
                  handleLogout();
                }
              }}
            >
              <div className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded-lg">
                <menu.icon className="w-5 h-5" />
                <span className="font-medium">{menu.label}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const NavAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN);
  };

  return (
    <div className="z-50">
      <NavDesktop
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
      />
      <NavMobile handleLogout={handleLogout} />
    </div>
  );
};

export default NavAdmin;
