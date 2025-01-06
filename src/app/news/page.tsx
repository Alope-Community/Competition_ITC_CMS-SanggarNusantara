"use client";

// import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// icons
import { IconPencilBox, IconPlus, IconTrashEmpty } from "justd-icons";

// components
import Navbar from "./../../components/Navbar";

// API
import { getNews } from "@/api/NewsAction";

//Models
import { ResultApiNews } from "@/models/News";

export default function News() {
  const {
    data: news,
    error,
    isLoading: loadingGetNews,
  } = useQuery<ResultApiNews>({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  return (
    <>
      <Navbar active={2} />

      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">NEWS</h2>

            <Link href={"/news/add"} className="btn btn-neutral">
              <IconPlus className="w-3" />
              Add News
            </Link>
          </div>

          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loadingGetNews ? (
                  <tr>
                    <td colSpan={4} className="text-center font-semibold">
                      Loading
                    </td>
                  </tr>
                ) : (
                  news?.data?.map((row) => (
                    <tr key={row.id} className="hover">
                      <td>
                        <div className="avatar">
                          <div className="w-24 rounded">
                            <img
                              src={row.cover}
                              width={60}
                              height={60}
                              alt="News Cover"
                              className="object-cover rounded"
                            />
                          </div>
                        </div>
                      </td>
                      <td>{row.title}</td>
                      <td>{row.description}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button className="btn btn-sm btn-primary text-white">
                            <IconPencilBox className="w-4" />
                          </button>
                          <button className="btn btn-sm btn-error text-white">
                            <IconTrashEmpty className="w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
