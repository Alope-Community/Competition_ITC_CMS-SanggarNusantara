"use client";

// import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// icons
import { IconPencilBox, IconPlus, IconTrashEmpty } from "justd-icons";

// components
import Navbar from "./../../components/Navbar";

// API
import { getEvent } from "@/api/EventAction";

//Models
import { useDeleteNews } from "@/hooks/useNews";
import { ResultApiEvent } from "@/models/Event";

export default function NewsPage() {
  const [selectedSlug, setSelectedSlug] = useState("");

  const { data: event, isLoading: loadingGetEvent } = useQuery<ResultApiEvent>({
    queryKey: ["event"],
    queryFn: () => getEvent(),
  });

  const mutationDeleteNews = useDeleteNews();

  const handleDelete = () => {
    // setShowDeleteConfirmation(false);
    mutationDeleteNews.mutate(selectedSlug || "");
  };

  return (
    <>
      <Navbar active={3} />

      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">EVENT</h2>

            <Link href={"/news/add"} className="btn btn-error">
              <IconPlus className="w-3" />
              Add Event
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
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loadingGetEvent ? (
                  <tr>
                    <td colSpan={4} className="text-center font-semibold">
                      Loading
                    </td>
                  </tr>
                ) : event?.data?.length ? (
                  event?.data?.map((row) => (
                    <tr key={row.id} className="hover">
                      <td>
                        <div className="avatar">
                          <div className="w-24 rounded">
                            <img
                              src={row.banner}
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
                      <td>{row.location}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/news/${row.slug}/edit`}
                            className="btn btn-sm btn-neutral text-white"
                          >
                            <IconPencilBox className="w-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedSlug(row.slug);
                              const modal = document.getElementById(
                                "modalConfirmationDelete"
                              ) as HTMLDialogElement | null;

                              if (modal) {
                                modal.showModal();
                              } else {
                                console.error("Modal element not found");
                              }
                            }}
                            className="btn btn-sm btn-error btn-outline"
                          >
                            <IconTrashEmpty className="w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center font-semibold">
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <dialog id="modalConfirmationDelete" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Yakin!</h3>
          <p className="py-4">Apakah Yakin ingin hapus?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
              <button
                className="btn btn-primary ml-3"
                onClick={() => handleDelete()}
              >
                Yakin
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
