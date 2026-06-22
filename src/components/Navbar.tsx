"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";

const links = [
  { label: "How it works", href: "/#how" },
  { label: "Platform", href: "/#platform" },
  { label: "Ask an agent", href: "/#interact" },
  { label: "Security", href: "/#security" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eef0f5] bg-white/85 backdrop-blur-md">
      <div className="container-px flex h-[72px] items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Logo size={30} />
          <span className="font-poppins text-[22px] font-medium text-[#101010]">
            Praveg.ai
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13.5px] text-[#101020] transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}

          {/* Products Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-[13.5px] text-[#101020] transition-colors hover:text-brand focus:outline-none cursor-pointer"
            >
              Products
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
              >
                <path
                  d="M2.5 4.5L6 8l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-1/2 mt-2.5 w-[220px] -translate-x-1/2 rounded-xl border border-[#e6e8ee] bg-white p-2.5 shadow-[0_12px_30px_-8px_rgba(20,40,90,0.12)]">
                <a
                  href="/marketplace"
                  onClick={() => setDropdownOpen(false)}
                  className="flex flex-col rounded-lg p-2.5 hover:bg-[#f6f9ff] transition-colors group"
                >
                  <span className="text-[13px] font-semibold text-[#18202f] group-hover:text-brand transition-colors">
                    Data Marketplace
                  </span>
                  <span className="text-[11px] text-muted mt-0.5 font-light">
                    Connect reviewed datasets in one click
                  </span>
                </a>
                <a
                  href="/data-operations"
                  onClick={() => setDropdownOpen(false)}
                  className="flex flex-col rounded-lg p-2.5 hover:bg-[#f6f9ff] transition-colors group mt-0.5"
                >
                  <span className="text-[13px] font-semibold text-[#18202f] group-hover:text-brand transition-colors">
                    Data Operations
                  </span>
                  <span className="text-[11px] text-muted mt-0.5 font-light">
                    Structured datasets from raw docs
                  </span>
                </a>
              </div>
            )}
          </div>
        </nav>

        <a
          href="/#contact"
          className="font-grotesk text-[15px] font-bold text-white bg-brand hover:bg-[#1b5ce0] transition-colors rounded-full px-5 py-2.5"
        >
          Contact us
        </a>
      </div>
    </header>
  );
}
