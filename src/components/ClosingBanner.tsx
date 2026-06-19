"use client";

// Shared closing banner + contact form (Figma node 147-834).
// Used identically on the homepage and the marketplace page.
const FIELDS = ["Name", "Last Name", "Phone No", "Role", "Company", "Country", "Company Email", "Subject"];

export default function ClosingBanner() {
  return (
    <section id="contact" className="bg-[#010510] px-4 py-16 sm:px-6">
      <div
        className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 overflow-hidden rounded-[20px] bg-[#0753ed] bg-cover bg-center p-10 sm:p-14 lg:grid-cols-2"
        style={{ backgroundImage: "url('/assets/marketplace/banner-bg.png')" }}
      >
        <h2 className="font-poppins text-[40px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[56px]">
          BUILT FOR TRUST
          <br />
          READY TO SCALE
        </h2>

        <form className="rounded-lg bg-white p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
          <p className="text-[15px] font-medium text-ink-2">
            Fill out the form below, and our Sales team will reach out soon.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <input
                key={f}
                placeholder={f}
                className="rounded border border-[#e6e8ee] bg-white px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-[#9aa3b2] focus:border-brand"
              />
            ))}
          </div>
          <textarea
            placeholder="What can we help you with?"
            rows={3}
            className="mt-3 w-full resize-none rounded border border-[#e6e8ee] bg-white px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-[#9aa3b2] focus:border-brand"
          />
          <div className="mt-5 flex justify-center">
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#0052d4] to-[#6fb1fc] px-10 py-2.5 text-[14px] font-semibold text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
