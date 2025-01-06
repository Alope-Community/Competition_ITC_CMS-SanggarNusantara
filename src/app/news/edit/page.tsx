import React from "react";
import Link from "next/link";

// components
import Navbar from "@/components/Navbar";

// icons
import { IconArrowLeft } from "justd-icons";

export default function NewsAdd() {
  return (
    <>
      <Navbar active={2} />
      <main className="px-20 mt-10">
        <section className="shadow-xl p-7 bg-white rounded mb-10">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">EDIT</h2>
            <Link
              href={"/news"}
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-none flex gap-2"
            >
              <IconArrowLeft />
              back
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <h2 className="mb-2">Banner</h2>
              <img src="/img-placeholder.png" alt="" className="w" />
            </div>
            <div className="col-span-2">
              <div className="mb-5">
                <label htmlFor="title">Title</label>
                <input
                  className="w-full py-3 px-5 rounded border"
                  type="text"
                  id="title"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="content">Content</label>
                <textarea
                  className="w-full max-h-44 min-h-44 py-3 px-5 rounded border"
                  name=""
                  id="content"
                ></textarea>
              </div>
              <div className="mb-5">
                <label htmlFor="writer">Writer</label>
                <input
                  className="w-full py-3 px-5 rounded border"
                  type="text"
                  id="writer"
                />
              </div>
              <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                submit
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
