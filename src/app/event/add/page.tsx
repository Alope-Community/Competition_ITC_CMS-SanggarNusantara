"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// icons
import { IconChevronLeft } from "justd-icons";

// components
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

//api
import { insertEvent } from "@/api/EventAction";
import uploadImage from "@/api/_UploadImage";

// GOOGLE MAPS
import {
  LoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

// tools
import { formatDateD_FM_FY_mmss } from "@/tools/dateFormatter";
import formatRupiah from "@/tools/formatToRupiah";
import { toast, ToastContainer } from "react-toastify";

interface apiResponse {
  code: string;
  data: {
    banner: string;
  };
  message: string;
  success: boolean;
}
export default function AddEvent() {
  const router = useRouter();

  const [loading, isLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    banner: "",
    startedDate: "",
    startedTime: "",
    endedDate: "",
    endedTime: "",
    fee: "",
    maximumVisitor: "",
    location: "",
    for: "all ages",
    marker: {
      lat: -6.1754,
      lng: 106.8272,
    },
  });

  const [imagePlaceholder, setImagePlaceholder] = useState("");
  const [imageFile, setImageFile] = useState<File | string | Blob>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidation({
      ...validation,
      banner: "",
    });

    const file = e.target.files?.[0]; // Ambil file pertama dari input
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        if (readerEvent.target) {
          setImagePlaceholder(readerEvent.target.result as string); // Pastikan ini adalah string
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const checkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validator = {
      title: "",
      description: "",
      banner: "",
      startedDate: "",
      startedTime: "",
      endedDate: "",
      endedTime: "",
      fee: "",
      maximumVisitor: "",
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
      const formData = new FormData();

      if (imageFile instanceof Blob) {
        formData.append("banner", imageFile);
      }

      uploadDataFile(formData);
    } else {
      setValidation(validator);
    }
  };

  const uploadDataFile = async (formData: FormData) => {
    isLoading(true);
    const result = (await uploadImage(formData)) as apiResponse;
    if (result) {
      setData({
        ...data,
        banner: result.data.banner,
      });
      insertDataEvent(result.data.banner);
    }
  };

  const insertDataEvent = async (fileName: string) => {
    isLoading(true);
    const result = await insertEvent(data, fileName);
    if (result) {
      isLoading(false);

      toast.success("Berhasil Tambah Event!");

      setTimeout(() => {
        router.push("/event");
      }, 1000);
    }
  };

  const resetForm = () => {
    setData({
      title: "",
      description: "",
      banner: "",
      startedDate: "",
      startedTime: "",
      endedDate: "",
      endedTime: "",
      fee: "",
      maximumVisitor: "",
      location: "",
      for: "all ages",
      marker: {
        lat: 0,
        lng: 0,
      },
    });

    setImagePlaceholder("");
    setImageFile("");
  };

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

  //
  // const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  // const [center, setCenter] = useState<google.maps.LatLngLiteral>({
  //   lat: -6.1754,
  //   lng: 106.8272,
  // });
  // const [markerPosition, setMarkerPosition] =
  //   useState<google.maps.LatLngLiteral | null>(null);

  // const handleLoadMap = (mapInstance: google.maps.Map) => {
  //   setMap(mapInstance);
  // };

  const handleLoadAutocomplete = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setData({
          ...data,
          marker: {
            lat: location.lat(),
            lng: location.lng(),
          },
        });
        // setMarkerPosition({ lat: location.lat(), lng: location.lng() });
      }
    }
  };

  const mapContainerStyle = {
    height: "550px",
    width: "100%",
  };

  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const checkNextForm = () => {
    const validator = {
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
      setShowSubmitButton(true);
    } else {
      setValidation(validator);
    }
  };

  return (
    <>
      <Navbar active={3} />

      <ToastContainer theme="dark" />

      <Loading show={loading} />

      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">ADD EVENT</h2>

            <Link href={"/event"} className="btn btn-neutral">
              <IconChevronLeft className="w-5" />
              Back
            </Link>
          </div>

          <form onSubmit={checkSubmit}>
            <div className="grid grid-cols-4 gap-10 mt-10 ">
              <div className="grid-cols-1">
                <div className="mb-5 col-span-6">
                  <label className="label-text" htmlFor="banner">
                    Banner
                  </label>
                  <label htmlFor="banner">
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
                    name="banner"
                    onChange={(e) => handleChange(e)}
                  />
                  {!showSubmitButton ? (
                    imagePlaceholder ? (
                      <div className="flex gap-2 mt-5 justify-center">
                        <label
                          htmlFor="banner"
                          className="btn btn-neutral btn-sm"
                        >
                          Change Banner
                        </label>
                        <button
                          className="btn btn-error btn-sm"
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
                    )
                  ) : (
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th colSpan={3}>Informasi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Title</td>
                          <td>{data.title}</td>
                        </tr>
                        <tr>
                          <td>Description</td>
                          <td>{data.description}</td>
                        </tr>
                        <tr>
                          <td>Waktu Event</td>
                          <td>{formatDateD_FM_FY_mmss(data.startedDate)}</td>
                        </tr>
                        <tr>
                          <td>Event Untuk</td>
                          <td>{data.for}</td>
                        </tr>
                        <tr>
                          <td>Lokasi Event</td>
                          <td>{data.location}</td>
                        </tr>
                        <tr>
                          <td>Tiket Masuk</td>
                          <td>{formatRupiah(parseInt(data.fee))}</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  <small className="text-red-500 italic">
                    {validation.banner}
                  </small>
                </div>
              </div>
              <div className="grid gap-5 grid-cols-8 col-span-3">
                {!showSubmitButton ? (
                  <>
                    <div className="form-control col-span-8">
                      <label htmlFor="title" className="label-text">
                        Title
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        id="title"
                        onBlur={(e) => {
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
                    <div className="mb-5 col-span-8">
                      <label htmlFor="description" className="label-text">
                        Description
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-24 w-full"
                        id="description"
                        onBlur={(e) => {
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
                        onBlur={(e) => {
                          setData({
                            ...data,
                            fee: e.target.value,
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
                        onBlur={(e) => {
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
                      <label className="label-text" htmlFor="location">
                        Maksimal Pengunjung
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        id="maximumVisitor"
                        onBlur={(e) => {
                          setData({
                            ...data,
                            maximumVisitor: e.target.value,
                          });
                        }}
                      />
                      {/* <small className="text-red-500 italic">
                        {validation.maximumVisitor}
                      </small> */}
                    </div>
                    <div className="mb-5 col-span-2">
                      <label className="label-text" htmlFor="for">
                        For
                      </label>
                      <select
                        id="for"
                        className="select select-bordered w-full"
                        onBlur={(e) => {
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

                    <div className="mb-5 col-span-3">
                      <label className="label-text" htmlFor="for">
                        Started Date
                      </label>
                      <input
                        type="date"
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

                    <div className="mb-5 col-span-3">
                      <label className="label-text" htmlFor="for">
                        Ended Date
                      </label>
                      <input
                        type="date"
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
                  </>
                ) : (
                  <div className="rounded-md overflow-hidden w-full col-span-8">
                    <LoadScript
                      googleMapsApiKey="AIzaSyBKDtW47ZKzT5JPduQvi3gUFNHNZmXk-FU"
                      libraries={["places"]}
                    >
                      <label className="label-text" htmlFor="for">
                        Location Mark
                      </label>
                      <div className="w-full mb-5">
                        <Autocomplete
                          onLoad={handleLoadAutocomplete}
                          onPlaceChanged={handlePlaceChanged}
                        >
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Search for a place"
                          />
                        </Autocomplete>
                      </div>
                      <GoogleMap
                        options={{
                          zoomControl: false,
                          disableDefaultUI: true,
                        }}
                        mapContainerStyle={mapContainerStyle}
                        center={data.marker}
                        zoom={10}
                      >
                        <Marker
                          draggable={true}
                          position={data.marker}
                          onDragEnd={(e) => {
                            setData({
                              ...data,
                              marker: {
                                lat: e.latLng?.lat() ?? 0,
                                lng: e.latLng?.lng() ?? 0,
                              },
                            });
                          }}
                        />
                      </GoogleMap>
                    </LoadScript>
                  </div>
                )}

                <div className="flex gap-3 mt-10 justify-end col-span-8">
                  <button
                    className="btn btn-ghost"
                    type="reset"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Reset
                  </button>
                  {!showSubmitButton ? (
                    <span
                      className="btn btn-error"
                      onClick={() => {
                        checkNextForm();
                      }}
                    >
                      Next
                    </span>
                  ) : (
                    <button
                      className="btn btn-error"
                      type="submit"
                      // onClick={(e) => {
                      //   checkSubmit(e);
                      // }}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
