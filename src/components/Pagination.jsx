import React from "react";

export default function Pagination({ links, getDataEvent, active }) {
  return (
    links.length > 3 && (
      <section>
        <div className="flex flex-wrap items-center gap-2">
          {links.map((link, key) =>
            link.label === "&laquo; Previous" ||
            link.label === "Next &raquo;" ? (
              // <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
              //   {/* {link.label} */}
              // </div>
              ""
            ) : key == active ? (
              <button
                key={key}
                className="btn btn-sm btn-neutral"
                onClick={() => {
                  getDataEvent(parseInt(link.label));
                }}
              >
                {link.label}
              </button>
            ) : (
              <button
                key={key}
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  getDataEvent(parseInt(link.label));
                }}
              >
                {link.label}
              </button>
            )
          )}
        </div>
      </section>
    )
  );
}
