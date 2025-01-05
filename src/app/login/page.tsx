import { IconKeyFill, IconMailFill } from "justd-icons";
import React from "react";

export default function Login() {
  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center justify-center flex-col">
        <div className="w-3/4">
          <div className="mb-10">
            <h1 className="text-5xl font-semibold uppercase">
              Login <span className="text-8xl text-error -ml-3">.</span>
            </h1>
            <p className="mt-1 text-sm text-gray-800 w-3/4">
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
              <input type="text" className="grow" placeholder="Email" />
            </label>
          </div>
          <div className="mb-5">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <IconKeyFill />
              <input type="text" className="grow" placeholder="Password" />
            </label>
          </div>
          <div className="mt-10 text-center">
            <button className="btn btn-error w-full">Login</button>
            <p className="mt-4">
              Belum punya akun?{" "}
              <a href="" className="text-error font-medium">
                Daftar
              </a>
            </p>
          </div>
        </div>

        <p className="absolute bottom-10 text-gray-700 italic text-sm">
          Copyright &copy; 2024 by ALOPE
        </p>
      </div>
      <div className="bg-[url(https://images.unsplash.com/photo-1720518816836-e351848c5357?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-screen bg-cover bg-center relative z-10 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:to-black/10 after:from-black/60 after:-z-10">
        <div className="border-l-4 border-error py-5 pl-5 w-1/2 absolute bottom-20 left-0">
          <h3 className="text-3xl font-semibold text-gray-50">
            Sanggar Nusantara
          </h3>
          <p className="text-gray-200 text-sm mt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
            harum, ab dolorum quod nemo, recusandae quia perferendis eligendi
            unde maxime corporis odio, quam possimus tenetur velit illum
            repellendus eveniet aut?
          </p>
        </div>
      </div>
    </div>
  );
}
