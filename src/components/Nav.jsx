// src/components/Nav.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Close menu when route changes
  useEffect(() => setOpen(false), [loc.pathname]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Outside click handling
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (buttonRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  // Focus first link when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => firstLinkRef.current?.focus(), 60);
    }
  }, [open]);

  const isActive = (path) => loc.pathname === path;

  return (
    <header className="bg-white border-b relative z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Neon wordmark – links to home */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span
              className="text-lg md:text-xl font-semibold tracking-wide"
              style={{
                fontFamily: "'Exo 2', sans-serif",
                background:
                  "linear-gradient(90deg, #22d3ee 0%, #38bdf8 35%, #4f46e5 70%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow:
                  "0 0 10px rgba(34,211,238,0.8), 0 0 24px rgba(79,70,229,0.65), 0 0 40px rgba(24,24,27,0.9)",
              }}
            >
              iBanati Digital
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              AI-empowered · Human-driven
            </span>
          </div>
        </Link>

        {/* ⭐ Desktop nav — Apple-ish spacing, smooth hover, active underline */}
        <nav
          className="
            hidden md:flex flex-1 
            justify-center items-center 
            gap-16 text-sm
          "
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {/* About */}
          <Link
            to="/about"
            className="group relative flex flex-col items-center pb-1"
          >
            <span
              className={`
                transition-colors duration-200 ease-out
                ${isActive("/about")
                  ? "text-indigo-600 font-bold"
                  : "text-gray-700 hover:text-indigo-600 font-semibold"}
              `}
            >
              About
            </span>
            <span
              className={`
                pointer-events-none absolute -bottom-1 h-0.5 w-full rounded-full 
                bg-indigo-500 transition-transform duration-300 ease-out origin-center
                ${isActive("/about")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"}
              `}
            />
          </Link>

          {/* Services */}
          <Link
            to="/services"
            className="group relative flex flex-col items-center pb-1"
          >
            <span
              className={`
                transition-colors duration-200 ease-out
                ${isActive("/services")
                  ? "text-indigo-600 font-bold"
                  : "text-gray-700 hover:text-indigo-600 font-semibold"}
              `}
            >
              Services
            </span>
            <span
              className={`
                pointer-events-none absolute -bottom-1 h-0.5 w-full rounded-full 
                bg-indigo-500 transition-transform duration-300 ease-out origin-center
                ${isActive("/services")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"}
              `}
            />
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            className="group relative flex flex-col items-center pb-1"
          >
            <span
              className={`
                px-4 py-2 rounded-md transition-colors duration-200 ease-out
                ${
                  isActive("/contact")
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-gray-700 hover:text-indigo-600 font-semibold"
                }
              `}
            >
              Contact
            </span>
            <span
              className={`
                pointer-events-none absolute -bottom-1 h-0.5 w-full rounded-full 
                bg-indigo-500 transition-transform duration-300 ease-out origin-center
                ${isActive("/contact")
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"}
              `}
            />
          </Link>
        </nav>

        {/* Mobile hamburger toggle (unchanged) */}
        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-700 focus:ring-2 focus:ring-indigo-500 z-[60]"
        >
          {open ? (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile backdrop */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        style={{
          zIndex: 40,
          background: open ? "rgba(2,6,23,0.4)" : "transparent",
          backdropFilter: open ? "blur(6px) saturate(110%)" : "none",
          WebkitBackdropFilter: open ? "blur(6px) saturate(110%)" : "none",
        }}
      />

      {/* Mobile dropdown panel (unchanged) */}
      <div
        ref={panelRef}
        className={`md:hidden absolute left-0 right-0 top-full overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out z-50`}
        style={{
          maxHeight: open ? "520px" : "0px",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
        }}
        aria-hidden={!open}
      >
        <div
          className="border-t"
          style={{
            background: "rgba(8,10,12,0.62)",
            backdropFilter: "blur(8px) saturate(110%)",
            WebkitBackdropFilter: "blur(8px) saturate(110%)",
            borderColor: "rgba(255,255,255,0.04)",
          }}
        >
          <nav className="px-4 pb-6">
            <ul className="space-y-1 mt-4">
              <li>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  ref={firstLinkRef}
                  className={`block px-3 py-3 rounded-md ${
                    isActive("/")
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-200 hover:bg-indigo-900/40"
                  }`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 rounded-md ${
                    isActive("/about")
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-200 hover:bg-indigo-900/40"
                  }`}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 rounded-md ${
                    isActive("/services")
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-200 hover:bg-indigo-900/40"
                  }`}
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 rounded-md ${
                    isActive("/contact")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-200 hover:bg-indigo-900/40"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-4 px-3">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-center w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm"
              >
                Get a Quote
              </Link>
            </div>
          </nav>

          <div className="px-4 py-4 border-t text-xs text-gray-400">
            <div>Serving businesses across South Africa</div>
            <div className="mt-2">
              © {new Date().getFullYear()} iBanati Digital
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
