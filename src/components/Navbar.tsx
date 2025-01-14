import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// icons
import {
  IconArchive,
  IconCalendar,
  IconDashboard,
  IconLogout,
  IconTicketFill,
} from "justd-icons";

export default function Navbar({ active }: { active: number }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <>
      <nav className="flex justify-between items-center px-20 py-3 shadow bg-base-200">
        <div className="flex items-center">
          <div className="mr-10">
            <h1 className="font-semibold text-xl text-gray-30">
              Sanggar Nusantara
            </h1>
          </div>
          <div className="text-sm">
            <ul className="flex gap-8">
              <li className={active == 1 ? "font-bold text-error" : ""}>
                <Link href={"/"} className="flex items-center gap-1">
                  <IconDashboard className="w-5" />
                  Dashboard
                </Link>
              </li>
              <li className={active == 2 ? "font-bold text-error" : ""}>
                <Link href={"/news"} className="flex items-center gap-1">
                  <IconArchive className="w-5" />
                  News
                </Link>
              </li>
              <li className={active == 3 ? "font-bold text-error" : ""}>
                <Link href={"/event"} className="flex items-center gap-1">
                  <IconCalendar className="w-5" />
                  Event
                </Link>
              </li>
              <li className={active == 4 ? "font-bold text-error" : ""}>
                <Link href={"/transaction"} className="flex items-center gap-1">
                  <IconTicketFill className="w-5" />
                  Transaction
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <details className="dropdown dropdown-end">
            <summary className="m-1 btn">
              <Image
                src={"/2.jpg"}
                width={40}
                height={40}
                alt="Avatar"
                className="object-cover rounded-full"
              />
              <p>Admin</p>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li className="text-error">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                >
                  <IconLogout className="w-5" />
                  Logout
                </button>
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </>
  );
}
