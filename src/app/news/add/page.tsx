"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

// components
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/components/TipTap"), {
  ssr: false,
});

// icons
import { IconArrowLeft } from "justd-icons";

export default function NewsAdd() {
  const editorRef = useRef<{ getContent: () => string } | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log("Editor Content from Parent:", content);
      alert("Editor Content: " + content);
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result as string); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar active={2} />
      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">ADD NEWS</h2>
            <Link href={"/news"} className="btn btn-neutral">
              <IconArrowLeft className="w-5" />
              back
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-7">
            <div className="relative">
              <div className="sticky top-0">
                <div className="mb-10">
                  <label className="label-text" htmlFor="banner">
                    Banner
                  </label>
                  <label htmlFor="banner">
                    <img
                      src={bannerPreview || "/img-placeholder.png"}
                      alt="bannerPreview"
                      className="rounded cursor-pointer w-[700px] h-[300px] object-cover mx-auto"
                    />
                    <input
                      id="banner"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleBannerChange}
                    />
                  </label>
                </div>
                <hr className="my-5" />
                <div className="mb-5">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Title</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Description</span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Bio"
                    ></textarea>
                  </label>
                </div>
                <div>
                  <button
                    className="btn btn-neutral"
                    onClick={() => handleGetContent()}
                  >
                    submit
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-5">
                <label htmlFor="content">Content</label>

                <TiptapEditor ref={editorRef} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
