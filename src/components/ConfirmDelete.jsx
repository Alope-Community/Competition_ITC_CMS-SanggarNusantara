import React from "react";

export default function ConfirmDelete({ data, cancelDelete, deleteData }) {
  return data.title && data.id ? (
    <section className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white py-6 px-7 rounded  w-[400px]">
        <h4 className="text-xl font-bold mb-3">Are you sure?</h4>
        <p className="text-sm">
          The <span className="font-semibold">"{data.title}"</span> event data
          will be deleted permanently!
        </p>
        <div className="mt-7 flex gap-2 justify-end">
          <button
            className="border border-gray-900 hover:bg-gray-800 text-gray-900 hover:text-white rounded px-5 py-2 text-xs"
            onClick={() => {
              cancelDelete();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white rounded px-5 py-2 text-xs"
            onClick={() => {
              deleteData();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </section>
  ) : (
    ""
  );
}
