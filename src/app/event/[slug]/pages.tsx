"use client";
import React, { useEffect, useState } from "react";
import {
  IconChevronLeft,
  IconDateTime,
  IconLocation,
  IconTicket,
  IconUnlocked,
} from "justd-icons";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";

// api
import { getEventById } from "@/api/EventAction";

// tools
import { formatDateD_FM_FY_mmss } from "./../../../tools/dateFormatter";
import formatRupiah from "@/tools/formatToRupiah";

// models
import { Event } from "@/models/Event";

interface apiResponse {
  data: {
    status_code: string;
    banner: string;
    data: Event;
  };
}

export default function DetailEvent({ params }: { params: { slug: string } }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    banner: "",
    started: "",
    ended: "",
    fee: 0,
    location: "",
    for: "",
    latitude: "",
    longitude: "",
  });

  const getDataEventById = async () => {
    const result = (await getEventById(params.slug)) as apiResponse;
    if (result) {
      setData(result.data.data);
    }
  };

  useEffect(() => {
    getDataEventById();
  }, [params.slug]);

  return (
    <>
      <Navbar active={3} />

      {/* <button onClick={notify}>Notify!</button>
      <ToastContainer /> */}

      <main className="px-20 mt-10 pb-1 mb-10">
        <section className="card mb-10 bg-base-100 shadow-md p-7">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider uppercase">
              Detail Event
            </h2>

            <Link href={"/event"} className="btn btn-neutral">
              <IconChevronLeft />
              Back
            </Link>
          </div>
          <section className="mt-10">
            <div className="grid grid-cols-3 gap-10">
              <div className="col-span-2">
                <Image
                  alt="banner"
                  src={
                    data.banner && data.banner != "-"
                      ? `http://127.0.0.1:8000/storage/images/${data.banner}`
                      : "/img-placeholder.png"
                  }
                  width={100}
                  height={100}
                  className="!w-full !h-[400px] object-cover rounded-lg"
                />
                <h2 className="text-2xl font-semibold mt-5 mb-3">
                  {data.title}
                </h2>
                <p>{data.description}</p>
              </div>
              <div>
                <div className="rounded-md overflow-hidden w-full col-span-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63368.913786928504!2d108.4005254933701!3d-6.943412765018405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1631a2e8c157%3A0x4170001fab845472!2sKec.%20Cigugur%2C%20Kabupaten%20Kuningan%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1717921383604!5m2!1sid!2sid"
                    width="600"
                    height="400"
                    loading="lazy"
                  ></iframe>
                </div>
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th colSpan={3}>Informasi Singkat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <IconDateTime />
                      </th>
                      <td>Waktu Event</td>
                      <td>{formatDateD_FM_FY_mmss(data.started)}</td>
                    </tr>
                    <tr>
                      <th>
                        <IconUnlocked />
                      </th>
                      <td>Event Untuk</td>
                      <td>{data.for}</td>
                    </tr>
                    <tr>
                      <th>
                        <IconLocation />
                      </th>
                      <td>Lokasi Event</td>
                      <td>{data.location}</td>
                    </tr>
                    <tr>
                      <th>
                        <IconTicket />
                      </th>
                      <td>Tiket Masuk</td>
                      <td>{formatRupiah(data.fee)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
