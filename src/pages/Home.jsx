// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/homepage_image.jpg"; // <- imported from src/assets as requested

/* Small inline SVG check icon — keeps exact sizing/proportion across items.
   NOTHING ELSE in layout/markup was changed. */
function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <circle cx="12" cy="12" r="12" fill="#16A34A" />
      <path
        d="M6.8 12.2L10 15.2L17.2 8.2"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
           Managed Support Services 
          </h1>

          <p className="mt-4 text-gray-400 max-w-xl">
            Hybrid support: AI-powered automation for speed, with experienced technicians for complex issues.
            Cost efficient, fast resolution times, and reliable SLAs across South Africa.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            <li className="flex items-start gap-3 text-gray-200">
              <span className="mt-1 inline-flex items-center justify-center w-6 h-6 bg-green-700 text-white rounded-full text-xs">
                <CheckIcon />
              </span>
              <span>Faster resolution through AI-assisted workflows</span>
            </li>
            <li className="flex items-start gap-3 text-gray-200">
              <span className="mt-1 inline-flex items-center justify-center w-6 h-6 bg-green-700 text-white rounded-full text-xs">
                <CheckIcon />
              </span>
              <span>Local-language support options</span>
            </li>
            <li className="flex items-start gap-3 text-gray-200">
              <span className="mt-1 inline-flex items-center justify-center w-6 h-6 bg-green-700 text-white rounded-full text-xs">
                <CheckIcon />
              </span>
              <span>POPIA & industry compliance</span>
            </li>
            <li className="flex items-start gap-3 text-gray-200">
              <span className="mt-1 inline-flex items-center justify-center w-6 h-6 bg-green-700 text-white rounded-full text-xs">
                <CheckIcon />
              </span>
              <span>Clear SLAs and reporting</span>
            </li>
          </ul>

          <div className="mt-8 flex gap-3">
            <Link to="/contact" className="px-5 py-3 rounded-md bg-indigo-600 text-white font-medium">Get a Quote</Link>
            <Link to="/services" className="px-5 py-3 rounded-md border border-gray-700 text-gray-200">Our Services</Link>
          </div>

          <div className="mt-4 text-sm text-gray-500">Serving clients across South Africa</div>
        </div>

        {/* Right: replaced the big SVG with your imported image from src/assets */}
        <div className="flex items-center justify-center">
          <div
            className="rounded-xl p-6 shadow-lg w-full svg-wrap"
            style={{ background: "linear-gradient(180deg, rgba(10,12,16,0.6), rgba(8,10,14,0.45))", maxWidth: 720 }}
          >
            <style>{`
              .svg-wrap { transition: transform .16s ease, box-shadow .16s ease; }
              .svg-wrap:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(2,6,23,0.5); }
            `}</style>

            {/* Using imported asset from src/assets and center-cropping to the right area */}
            <img
              src={HeroImg}
              alt="Technician checking server rack with laptop — iBanati"
              loading="lazy"
              className="w-full h-[400px] rounded-md block object-cover"
              style={{ objectPosition: "right center", display: "block" }}
              onError={(e) => {
                // if import fails for some reason, hide the image so no broken icon shows
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentNode;
                const fallback = parent.querySelector('.fallback-caption');
                if (fallback) fallback.style.display = 'block';
              }}
            />

            <div className="mt-3 text-xs text-gray-400 text-center fallback-caption" style={{ display: 'none' }}>
              Technician diagnostics — friendly helpdesk illustration
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
