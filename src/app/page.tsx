"use client";
import React, { useEffect, useState } from "react";

// api
// import { getDashboard } from "@/api/Dashboard";

// Icon
import {
  IconPeople,
  IconInvoice,
  IconCalendar,
  IconArchive,
} from "justd-icons";

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Navbar from "@/components/Navbar";

// component
// import Navbar from "./../../components/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

export const data = {
  labels,
  datasets: [
    {
      label: "Event",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgb(239 68 68)",
    },
  ],
};
export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const labels2 = ["January", "February", "March", "April", "May", "June"];

export const data2 = {
  labels,
  datasets: [
    {
      label: "News",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgb(239 68 68)",
    },
  ],
};

export default function Dashboard() {
  const [total, setTotal] = useState({
    totalEvent: 0,
    totalNews: 0,
    totalUser: 0,
  });
  const getDataDashboard = async () => {
    // let result: any = await getDashboard();
    // if (result) {
    //   setTotal(result.data.data.total);
    // }
  };

  useEffect(() => {
    getDataDashboard();
  }, []);
  return (
    <>
      <Navbar active={1} />
      <section className="grid grid-cols-4 gap-10 px-20 mt-10">
        <div className="card bg-base-100 shadow rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="card-title text-lg font-bold">User</h1>
              <p className="font-semibold">{total.totalUser}</p>
            </div>
            <IconPeople className="w-14 h-14" />
          </div>
        </div>
        <div className="card bg-base-100 shadow rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="card-title text-lg font-bold">Writer</h1>
              <p className="font-semibold">10</p>
            </div>
            <IconInvoice className="w-14 h-14" />
          </div>
        </div>
        <div className="card bg-base-100 shadow rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="card-title text-lg font-bold">Event</h1>
              <p className="font-semibold">{total.totalEvent}</p>
            </div>
            <IconCalendar className="w-14 h-14" />
          </div>
        </div>
        <div className="card bg-base-100 shadow rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="card-title text-lg font-bold">News</h1>
              <p className="font-semibold">{total.totalNews}</p>
            </div>
            <IconArchive className="w-14 h-14" />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-10 px-20 mt-10">
        <div className="bg-white rounded-md p-5 shadow">
          <h2 className="font-semibold text-lg">Event</h2>
          <Bar options={options} data={data} />
        </div>
        <div className="bg-white rounded-md p-5 shadow">
          <h2 className="font-semibold text-lg">News</h2>
          <Bar options={options2} data={data2} />
        </div>
      </section>
    </>
  );
}
