import Image from "next/image";
import Link from "next/link";
import React from "react";

// icons
import { IconPencilBox, IconPlus, IconTrashEmpty } from "justd-icons";

// components
import Navbar from "./../../components/Navbar";

export default function News() {
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
                  <th>Content</th>
                  <th>Writter</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover">
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded">
                        {" "}
                        <Image
                          src={"/img-placeholder.png"}
                          width={60}
                          height={60}
                          alt="Avatar"
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  </td>
                  <td>seren taun cigugur</td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Similique aut, praesentium voluptatum dignissimos temporibus
                    error?
                  </td>
                  <td>Ilham Hafidz</td>
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
                {/* row 2 */}
                <tr className="hover">
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded">
                        {" "}
                        <Image
                          src={"/img-placeholder.png"}
                          width={60}
                          height={60}
                          alt="Avatar"
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  </td>
                  <td>seren taun cigugur</td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Similique aut, praesentium voluptatum dignissimos temporibus
                    error?
                  </td>
                  <td>Ilham Hafidz</td>
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
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
