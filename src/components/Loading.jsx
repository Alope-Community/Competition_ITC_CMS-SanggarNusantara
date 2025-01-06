import React from "react";

export default function Loading({ show }) {
  return show ? (
    <section className="bg-gray-900/10 fixed inset-0 z-10 flex items-center justify-center">
      <div class="loader relative z-20 w-[50px] p-[8px]"></div>
    </section>
  ) : (
    ""
  );
}
