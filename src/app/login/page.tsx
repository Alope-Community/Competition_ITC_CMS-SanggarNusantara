"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { IconEye, IconKeyFill, IconMailFill } from "justd-icons";

import checkAuthToken from "@/lib/checkProtected";

const SECRET_KEY =
  "a3b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (email == "admin@sanggar-nusantara.com" && password == "password") {
      localStorage.setItem("authToken", SECRET_KEY);
      toast.success("Login Berhasil!");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      toast.error("Gagal Login!");
      localStorage.removeItem("authToken");
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (checkAuthToken()) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-center flex-col">
          <div className="w-3/4">
            <div className="mb-10">
              <h1 className="text-5xl font-semibold uppercase">
                Login <span className="text-8xl text-error -ml-3">.</span>
              </h1>
              <p className="mt-1 text-sm w-3/4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
                beatae, quam dolore nemo ex eaque perspiciatis mollitia libero
              </p>
            </div>

            <div className="mb-5">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <IconMailFill />
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-5 relative">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <IconKeyFill />
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button
                type="button"
                className="absolute top-1/2 right-3 translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <IconEye className="size-5" />
              </button>
            </div>
            <div className="mt-10 text-center">
              <button onClick={handleLogin} className="btn btn-error w-full">
                Login
              </button>
              {/* <p className="mt-4">
              Belum punya akun?{" "}
              <a href="" className="text-error font-medium">
                Daftar
              </a>
            </p> */}
            </div>
          </div>

          <p className="absolute bottom-10 italic text-sm">
            Copyright &copy; 2024 by ALOPE
          </p>
        </div>
        <div className="bg-[url(https://images.unsplash.com/photo-1720518816836-e351848c5357?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-screen bg-cover bg-center relative z-10 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:to-black/10 after:from-black/60 after:-z-10">
          <div className="border-l-4 border-error py-5 pl-5 w-1/2 absolute bottom-20 left-0">
            <h3 className="text-3xl font-semibold text-gray-50">
              Sanggar Nusantara
            </h3>
            <p className="text-gray-200 text-sm mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Aspernatur harum, ab dolorum quod nemo, recusandae quia
              perferendis eligendi unde maxime corporis odio, quam possimus
              tenetur velit illum repellendus eveniet aut?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
