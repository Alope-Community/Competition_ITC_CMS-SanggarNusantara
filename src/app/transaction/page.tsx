"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

// icons
import { IconCheck, IconLoader, IconX } from "justd-icons";

// components
import Navbar from "./../../components/Navbar";

// API
import { getTransaction } from "@/api/TransactionActive";
import { useUpdateTransaction } from "@/hooks/useTransaction";

//Models
import { ResultApiResource } from "@/models/Transaction";

// tools
import formatRupiah from "@/tools/formatToRupiah";

export default function TransactionPage() {
  const { data: event, isLoading: loadingGetEvent } =
    useQuery<ResultApiResource>({
      queryKey: ["transaction"],
      queryFn: () => getTransaction(),
    });

  const mutationUpdateTransaction = useUpdateTransaction();

  const updateStatusInvoice = (formData: {
    invoice: string;
    status: string;
  }) => {
    // setShowDeleteConfirmation(false);
    mutationUpdateTransaction.mutate(formData);
  };

  return (
    <>
      <Navbar active={4} />

      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">
              Transaction Event
            </h2>
          </div>

          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Event</th>
                  <th>User Data</th>
                  <th>Purhaced Ticket</th>
                  <th>Total Pay</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loadingGetEvent ? (
                  <tr>
                    <td colSpan={6} className="text-center font-semibold">
                      Loading
                    </td>
                  </tr>
                ) : event?.data?.length ? (
                  event?.data?.map((row) => (
                    <tr key={row.id} className="hover">
                      <td>{row.event.title}</td>
                      <td>
                        <p>{`${row.orderer_name} (${row.user.name})`}</p>
                        <p className="font-medium">{row.user.email}</p>
                      </td>
                      <td>{row.purhaced_ticket}</td>
                      <td>{formatRupiah(row.total_pay)}</td>
                      <td
                        className={
                          row.status == "pending"
                            ? "text-warning"
                            : row.status == "failed"
                            ? "text-error"
                            : "text-success"
                        }
                      >
                        {row.status}
                      </td>
                      <td>
                        {row.status == "pending" ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    "Yakin mengubah status menjadi sukses?"
                                  )
                                ) {
                                  updateStatusInvoice({
                                    invoice: row.invoice,
                                    status: "success",
                                  });
                                }
                              }}
                              className="btn btn-sm btn-success text-white"
                            >
                              <IconCheck className="w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    "Yakin mengubah status menjadi failed?"
                                  )
                                ) {
                                  updateStatusInvoice({
                                    invoice: row.invoice,
                                    status: "failed",
                                  });
                                }
                              }}
                              className="btn btn-sm btn-error"
                            >
                              <IconX className="w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Yakin mengubah status menjadi pending kembali?"
                                )
                              ) {
                                updateStatusInvoice({
                                  invoice: row.invoice,
                                  status: "pending",
                                });
                              }
                            }}
                            className="btn btn-sm btn-warning"
                          >
                            <IconLoader className="w-4" />
                            Batalkan
                          </button>
                        )}
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

      {/* <dialog id="modalConfirmationDelete" className="modal">
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
      </dialog> */}
    </>
  );
}
