// src/components/Footer.jsx
import React from "react";

export default function Footer({
  company = "iBanati Digital",
  year = new Date().getFullYear(),
}) {
  return (
    <footer className="bg-white border-t mt-12">
      <style>{`
        /* ---------------------------------------
           ICON BASE ANIMATIONS & HOVER EFFECTS
        ----------------------------------------*/
        .social-icon {
          transition: transform .18s ease, filter .18s ease, box-shadow .18s ease, opacity .24s ease;
          will-change: transform, filter;
          display:inline-block;
          opacity: 0;
          animation: fadeIn 520ms ease forwards;
        }

        .social-icon:hover {
          transform: translateY(-4px) scale(1.06);
        }

        /* Neon pulse effect */
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { box-shadow: 0 10px 28px rgba(0,0,0,0.16); }
          100% { box-shadow: 0 0 0 rgba(0,0,0,0); }
        }
        .social-icon.pulse {
          animation: pulseGlow 5s ease-in-out infinite, fadeIn 520ms ease forwards;
        }

        /* Fade in animation */
        @keyframes fadeIn { to { opacity: 1; } }

        /* ---------------------------------------
           ICON SIZES (AS REQUESTED)
        ----------------------------------------*/
        .icon-desktop { width: 24px; height: 24px; }
        .icon-mobile  { width: 22px; height: 22px; }

        /* Slightly smaller X icon to match LinkedIn proportionally */
        .icon-desktop-x { width: 20px; height: 20px; }
        .icon-mobile-x  { width: 18px; height: 18px; }

        /* Brand-specific glow */
        .social-icon.linkedin:hover svg {
          filter: drop-shadow(0 8px 22px rgba(10,102,194,0.35));
        }
        .social-icon.x:hover svg {
          filter: drop-shadow(0 8px 22px rgba(255,255,255,0.32));
        }

        .footer-socials {
          gap: 12px;
          display:flex;
          align-items:center;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ------- DESKTOP LAYOUT ------- */}
        <div className="hidden md:flex items-center justify-between text-sm text-gray-600">

          {/* LEFT — Links */}
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:text-indigo-600">Terms & Conditions</a>
            <span className="text-gray-400">·</span>
            <a href="/privacy" className="hover:text-indigo-600">Privacy Policy</a>
          </div>

          {/* CENTER — Company Info */}
          <div className="text-gray-700 font-semibold">
            © {year} {company}. All rights reserved.
          </div>

          {/* RIGHT — Social Icons */}
          <div className="footer-socials">

            {/* LinkedIn (official mark) */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon pulse linkedin"
              title="Follow us on LinkedIn"
              aria-label="LinkedIn"
            >
              {/* Official LinkedIn mark (rounded box + 'in' shape) */}
              <svg className="icon-desktop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" role="img" aria-hidden="true" focusable="false">
                <path fill="#0A66C2" d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.1 108 0 83.9 0 53.6 0 23.3 24.1 0 53.84 0c29.74 0 53.84 23.3 53.84 53.6 0 30.3-24.1 54.4-53.84 54.4zM447.9 448h-92.4V302.4c0-34.7-12.4-58.4-43.4-58.4-23.6 0-37.6 15.9-43.8 31.3-2.3 5.6-2.9 13.4-2.9 21.2V448h-92.4s1.2-241.1 0-266.1h92.4v37.7c-.2.3-.5.7-.7 1h.7v-1c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.6 39.8 106.6 125.4V448z"/>
              </svg>
            </a>

            {/* X (Official full shape SVG) - slightly reduced size for proportional balance */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon x"
              title="Follow us on X"
              aria-label="X"
            >
              <svg className="icon-desktop-x" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
                <path
                  d="M714.163 545.167L1160 0H1051.65L668.388 460.219 357.84 0H0l468.948 681.64L0 1200h108.35l407.754-483.128L842.16 1200H1200L714.163 545.167z"
                  fill="#0F172A"
                />
              </svg>
            </a>

            {/* Hidden Icons (Saved for future use) */}
            {/*
              <a href="https://facebook.com">...</a>
              <a href="https://instagram.com">...</a>
              <a href="https://youtube.com">...</a>
            */}
          </div>
        </div>

        {/* ------- MOBILE LAYOUT ------- */}
        <div className="md:hidden flex flex-col items-center gap-6 text-sm text-gray-600">

          {/* TOP LINKS */}
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:text-indigo-600">Terms & Conditions</a>
            <span className="text-gray-400">·</span>
            <a href="/privacy" className="hover:text-indigo-600">Privacy Policy</a>
          </div>

          {/* MOBILE SOCIAL ICONS */}
          <div className="flex items-center justify-center gap-6">

            {/* LinkedIn mobile */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
              title="Follow us on LinkedIn"
              aria-label="LinkedIn"
            >
              <svg className="icon-mobile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" role="img" aria-hidden="true" focusable="false">
                <path fill="#0A66C2" d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.1 108 0 83.9 0 53.6 0 23.3 24.1 0 53.84 0c29.74 0 53.84 23.3 53.84 53.6 0 30.3-24.1 54.4-53.84 54.4zM447.9 448h-92.4V302.4c0-34.7-12.4-58.4-43.4-58.4-23.6 0-37.6 15.9-43.8 31.3-2.3 5.6-2.9 13.4-2.9 21.2V448h-92.4s1.2-241.1 0-266.1h92.4v37.7c-.2.3-.5.7-.7 1h.7v-1c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.6 39.8 106.6 125.4V448z"/>
              </svg>
            </a>

            {/* X mobile - slightly reduced for proportional balance */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon x"
              title="Follow us on X"
              aria-label="X"
            >
              <svg className="icon-mobile-x" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
                <path
                  d="M714.163 545.167L1160 0H1051.65L668.388 460.219 357.84 0H0l468.948 681.64L0 1200h108.35l407.754-483.128L842.16 1200H1200L714.163 545.167z"
                  fill="#0F172A"
                />
              </svg>
            </a>
          </div>

          {/* COPYRIGHT */}
          <div className="text-gray-700 font-semibold text-center">
            © {year} {company}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
