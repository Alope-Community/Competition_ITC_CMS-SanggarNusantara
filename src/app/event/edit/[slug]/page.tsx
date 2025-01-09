"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import moment from "moment";

//
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// icons
import { IconChevronLeft } from "@irsyadadl/paranoid";

// components
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

//api
import { getEventById, updateEvent } from "@/api/EventAction";
import uploadFile from "@/api/_UploadFile";

interface apiResponse {
  data: {
    status_code: string;
    fileName: string;
    data: any;
  };
}

export default function EditEvent({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [loading, isLoading] = useState(false);
  const [loadingGetData, setLoadingGetData] = useState(false);

  const dateFormat = moment();

  const [data, setData] = useState({
    title: "",
    description: "",
    banner: "",
    startedDate: "",
    startedTime: "",
    endedDate: "",
    endedTime: "",
    fee: 0,
    location: "",
    for: "",
  });

  const [validation, setValidation] = useState({
    title: "",
    description: "",
    banner: "",
    startedDate: "",
    startedTime: "",
    endedDate: "",
    endedTime: "",
    fee: "",
    location: "",
  });

  const getDataEventById = async () => {
    setLoadingGetData(true);

    let result = (await getEventById(params.slug)) as apiResponse;
    if (result) {
      setLoadingGetData(false);

      const res = result.data.data;

      const started = res.started;
      const ended = res.ended;

      setData({
        title: res.title,
        description: res.description,
        banner: res.banner,
        startedDate: String(moment(started).format("YYYY-MM-DD")),
        startedTime: String(moment(started).format("hh:mm:ss")),
        endedDate: String(moment(ended).format("YYYY-MM-DD")),
        endedTime: String(moment(ended).format("hh:mm:ss")),
        fee: res.fee,
        location: res.location,
        for: res.for,
      });

      setImagePlaceholder("http://127.0.0.1:8000/storage/images/" + res.banner);
    }
  };

  const [imagePlaceholder, setImagePlaceholder] = useState("");
  const [imageFile, setImageFile] = useState("");

  const handleChange = (e: any) => {
    setValidation({
      ...validation,
      banner: "",
    });

    setImageFile(e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e: { target: any }) => {
        setImagePlaceholder(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateDataEvent = async (fileName: String) => {
    isLoading(true);

    let result = await updateEvent(data, params.slug, fileName);
    if (result) {
      isLoading(false);
      router.push("/event");
    }
  };

  const uploadDataFile = async (formData: any) => {
    isLoading(true);

    let result = (await uploadFile(formData)) as apiResponse;
    if (result) {
      if (result.data.status_code == "WN-01") {
        setData({
          ...data,
          banner: result.data.fileName,
        });

        updateDataEvent(result.data.fileName);
      }
    }
  };

  const checkSubmit = (e: any) => {
    e.preventDefault();

    let validator = {
      title: "",
      description: "",
      banner: "",
      startedDate: "",
      startedTime: "",
      endedDate: "",
      endedTime: "",
      fee: "",
      location: "",
    };

    if (!data.title) validator.title = "Title is required!";
    if (!data.description) validator.description = "Description is required!";
    if (!data.startedDate) validator.startedDate = "Started Date is required!";
    if (!data.startedTime) validator.startedTime = "Started Time is required!";
    if (!data.endedDate) validator.endedDate = "Ended Date is required!";
    if (!data.endedTime) validator.endedTime = "Ended Time is required!";
    if (!data.fee) validator.fee = "Fee is required!";
    if (!data.location) validator.location = "Location is required!";
    if (!imagePlaceholder && !imageFile)
      validator.banner = "Banner is required!";

    // Periksa apakah semua nilai dari kunci-kunci di objek validator kosong
    const isAllEmpty = Object.values(validator).every((value) => value === "");

    if (isAllEmpty) {
      if (imagePlaceholder && imageFile) {
        const formData = new FormData();

        formData.append("image", imageFile);
        formData.append("id", params.slug);

        uploadDataFile(formData);
      } else {
        updateDataEvent(data.banner);
      }
    } else {
      setValidation(validator);
    }
  };

  useEffect(() => {
    getDataEventById();
  }, []);

  // loading get
  const LoadingGetData = () => {
    return (
      <div className="grid grid-cols-4 gap-10 mt-10 ">
        <div className="col-span-1">
          <Skeleton height={300} />
        </div>
        <div className="grid grid-cols-6 col-span-3 gap-5">
          <div className="mb-5 col-span-6">
            <Skeleton height={40} />
          </div>
          <div className="mb-5 col-span-6">
            <Skeleton height={40} />
          </div>
          <div className="mb-5  col-span-2">
            <Skeleton height={40} />
          </div>
          <div className="mb-5 col-span-2">
            <Skeleton height={40} />
          </div>
          <div className="mb-5 col-span-2">
            <Skeleton height={40} />
          </div>

          <div className="mb-5 col-span-2">
            <Skeleton height={40} />
          </div>
          <div className="mb-5 col-span-1">
            <Skeleton height={40} />
          </div>

          <div className="mb-5 col-span-2">
            <Skeleton height={40} />
          </div>
          <div className="mb-5 col-span-1">
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar active={3} />

      <Loading show={loading} />

      <main className="px-20 mt-10">
        <section className="shadow p-7 bg-white rounded mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">EDIT EVENT</h2>

            <Link href={"/event"} className="btn btn-neutral">
              <IconChevronLeft className="w-5" />
              Back
            </Link>
          </div>

          {loadingGetData ? (
            LoadingGetData()
          ) : (
            <form action="" onSubmit={checkSubmit}>
              <div className="grid grid-cols-4 gap-10 mt-10 ">
                <div className="col-span-1">
                  <label className="label-text" htmlFor="banner">
                    Banner
                  </label>
                  <label className="label-text" htmlFor="banner">
                    <img
                      src={
                        imagePlaceholder
                          ? imagePlaceholder
                          : "/img-placeholder.png"
                      }
                      alt="bannerEvent"
                      className="rounded cursor-pointer w-[700px] h-[300px] object-cover mx-auto"
                    />
                  </label>
                  <input
                    type="file"
                    className="border px-3 py-2 rounded w-full mt-5 hidden"
                    id="banner"
                    onChange={(e) => handleChange(e)}
                  />
                  {imagePlaceholder ? (
                    <div className="flex gap-2 mt-5 justify-center">
                      <label
                        htmlFor="banner"
                        className="btn btn-sm btn-neutral"
                      >
                        Change Banner
                      </label>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          setImagePlaceholder("");
                          setImageFile("");
                        }}
                      >
                        Delete Banner
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <small className="text-red-500 italic">
                    {validation.banner}
                  </small>
                </div>
                <div className="grid grid-cols-6 col-span-3 gap-5">
                  <div className="mb-5 col-span-6">
                    <label className="label-text" htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      id="title"
                      value={data.title}
                      onChange={(e) => {
                        setData({
                          ...data,
                          title: e.target.value,
                        });

                        setValidation({
                          ...validation,
                          title: "",
                        });
                      }}
                    />
                    <small className="text-red-500 italic">
                      {validation.title}
                    </small>
                  </div>
                  <div className="mb-5 col-span-6">
                    <label className="label-text" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24 w-full"
                      id="description"
                      value={data.description}
                      onChange={(e) => {
                        setData({
                          ...data,
                          description: e.target.value,
                        });

                        setValidation({
                          ...validation,
                          description: "",
                        });
                      }}
                    ></textarea>
                    <small className="text-red-500 italic">
                      {validation.description}
                    </small>
                  </div>
                  <div className="mb-5  col-span-2">
                    <label className="label-text" htmlFor="fee">
                      Fee
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      id="fee"
                      value={data.fee ? data.fee : ""}
                      onChange={(e) => {
                        setData({
                          ...data,
                          fee: parseInt(e.target.value),
                        });

                        setValidation({
                          ...validation,
                          fee: "",
                        });
                      }}
                    />
                    <small className="text-red-500 italic">
                      {validation.fee}
                    </small>
                  </div>
                  <div className="mb-5 col-span-2">
                    <label className="label-text" htmlFor="location">
                      Location
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      id="location"
                      value={data.location}
                      onChange={(e) => {
                        setData({
                          ...data,
                          location: e.target.value,
                        });

                        setValidation({
                          ...validation,
                          location: "",
                        });
                      }}
                    />
                    <small className="text-red-500 italic">
                      {validation.location}
                    </small>
                  </div>
                  <div className="mb-5 col-span-2">
                    <label className="label-text" htmlFor="for">
                      For
                    </label>
                    <select
                      id="for"
                      className="select select-bordered w-full"
                      value={data.for}
                      onChange={(e) => {
                        setData({
                          ...data,
                          for: e.target.value,
                        });
                      }}
                    >
                      <option value="all ages">All Ages</option>
                      <option value="mature">Mature</option>
                    </select>
                  </div>

                  <div className="mb-5 col-span-2">
                    <label className="label-text" htmlFor="for">
                      Started Date
                    </label>
                    <input
                      type="date"
                      value={data.startedDate}
                      onChange={(e) => {
                        setData({
                          ...data,
                          startedDate: e.target.value,
                        });

                        setValidation({
                          ...validation,
                          startedDate: "",
                        });
                      }}
                      className="input input-bordered w-full"
                    />
                    <small className="text-red-500 italic">
                      {validation.startedDate}
                    </small>
                  </div>
                  <div className="mb-5 col-span-1">
                    <label className="label-text" htmlFor="for">
                      Started Time
                    </label>
                    <input
                      type="time"
                      value={data.startedTime}
                      onChange={(e) => {
                        setData({
                          ...data,
                          startedTime: e.target.value,
                        });

                        setValidation({
                          ...validation,
                          startedTime: "",
                        });
                      }}
                      className="input input-bordered w-full"
                    />
                    <small className="text-red-500 italic">
                      {validation.startedTime}
                    </small>
                  </div>

                  <div className="mb-5 col-span-2">
                    <label className="label-text" htmlFor="for">
                      Ended Date
                    </label>
                    <input
                      type="date"
                      value={data.endedDate}
                      onChange={(e) => {
                        setData({
                          ...data,
                          endedDate: e.target.value,
                        });

                        setValidation({
                          ...validation,
                          endedDate: "",
                        });
                      }}
                      className="input input-bordered w-full"
                    />
                    <small className="text-red-500 italic">
                      {validation.endedDate}
                    </small>
                  </div>
                  <div className="mb-5 col-span-1">
                    <label className="label-text" htmlFor="for">
                      Ended Time
                    </label>
                    <input
                      type="time"
                      value={data.endedTime}
                      onChange={(e) => {
                        setData({
                          ...data,
                          endedTime: e.target.value,
                        });

                        setValidation({
                          ...validation,
                          endedTime: "",
                        });
                      }}
                      className="input input-bordered w-full"
                    />
                    <small className="text-red-500 italic">
                      {validation.endedTime}
                    </small>
                  </div>

                  <div className="flex justify-end col-span-6">
                    <button
                      className="btn btn-neutral"
                      type="submit"
                      onClick={() => {
                        checkSubmit;
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
