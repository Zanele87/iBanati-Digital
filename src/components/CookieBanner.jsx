// src/components/CookieBanner.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "ibanati_cookie_ack_v1";

export default function CookieBanner() {
  const [showPanel, setShowPanel] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [view, setView] = useState("simple"); // "simple" | "details"

  const [prefs, setPrefs] = useState({
    analytics: true,
    performance: true,
    marketing: false,
  });

  // ---- Load from localStorage on mount (self-healing) ----
  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }

    if (!stored) {
      // No record at all → show banner
      setHasInteracted(false);
      setShowPanel(true);
      return;
    }

    // Try to parse as JSON (new format). If it's old/invalid, treat as "no consent".
    try {
      const parsed = JSON.parse(stored);

      if (parsed && typeof parsed === "object" && parsed.status) {
        setHasInteracted(true);
        setShowPanel(false);

        if (parsed.categories) {
          setPrefs({
            analytics:
              typeof parsed.categories.analytics === "boolean"
                ? parsed.categories.analytics
                : true,
            performance:
              typeof parsed.categories.performance === "boolean"
                ? parsed.categories.performance
                : true,
            marketing:
              typeof parsed.categories.marketing === "boolean"
                ? parsed.categories.marketing
                : false,
          });
        }
      } else {
        // Not in our expected shape → clear and behave like first visit
        localStorage.removeItem(STORAGE_KEY);
        setHasInteracted(false);
        setShowPanel(true);
      }
    } catch {
      // Was likely "accepted"/"essential"/"rejected" string → reset
      localStorage.removeItem(STORAGE_KEY);
      setHasInteracted(false);
      setShowPanel(true);
    }
  }, []);

  // ---- Auto-hide after 20s if no interaction yet ----
  useEffect(() => {
    if (!showPanel || hasInteracted) return;

    const timer = setTimeout(() => {
      setShowPanel(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, [showPanel, hasInteracted]);

  // ---- Persist helper ----
  const saveChoice = (status, categories = prefs) => {
    const payload = JSON.stringify({
      status,
      categories,
      timestamp: new Date().toISOString(),
    });

    try {
      localStorage.setItem(STORAGE_KEY, payload);
    } catch {
      // ignore storage errors
    }

    setHasInteracted(true);
    setShowPanel(false);
  };

  const handleAcceptAll = () => {
    const allOn = { analytics: true, performance: true, marketing: true };
    setPrefs(allOn);
    saveChoice("accepted", allOn);
  };

  const handleEssentialOnly = () => {
    const essentials = {
      analytics: false,
      performance: true,
      marketing: false,
    };
    setPrefs(essentials);
    saveChoice("essential", essentials);
  };

  const handleRejectAll = () => {
    const none = { analytics: false, performance: false, marketing: false };
    setPrefs(none);
    saveChoice("rejected", none);
  };

  const handleSavePreferences = () => {
    saveChoice("custom", prefs);
  };

  const handleClose = () => {
    setShowPanel(false);
  };

  const openPanel = () => {
    setView("simple");
    setShowPanel(true);
  };

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* COOKIE PANEL */}
      <div
        className={`fixed bottom-5 right-5 z-[69] max-w-md w-[90vw] sm:w-96 transition-all duration-300 transform
        ${
          showPanel
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur-xl px-4 py-4 flex flex-col gap-3">
          {/* header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 justify-center items-center text-[13px]">
                ⓘ
              </span>
              <p className="text-sm font-semibold">
                We use cookies to enhance your experience.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close cookie banner"
              className="text-slate-400 hover:text-slate-200 text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            iBanati Digital uses essential and analytics cookies to improve
            performance, secure the platform, and understand usage patterns.
            You can adjust your choices at any time using the Cookies control.
            Learn more in our{" "}
            <Link
              to="/privacy-info"
              className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>

          {view === "simple" ? (
            <>
              {/* SIMPLE VIEW BUTTONS */}
              <div className="flex flex-col gap-2 mt-1">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500
                  text-white text-sm font-medium shadow hover:from-cyan-400 hover:to-indigo-400"
                >
                  Accept cookies
                </button>

                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="w-full px-4 py-2 rounded-md border border-slate-600/60 
                  text-slate-200 text-sm hover:bg-slate-800/80"
                >
                  Only essential
                </button>

                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="w-full px-4 py-2 rounded-md border border-red-500/60 text-red-300 text-sm
                  hover:bg-red-900/40 hover:text-red-200 transition"
                >
                  Reject all
                </button>
              </div>

              <button
                type="button"
                onClick={() => setView("details")}
                className="mt-1 text-[11px] text-cyan-300 hover:text-cyan-200 self-start underline underline-offset-4"
              >
                Manage preferences
              </button>
            </>
          ) : (
            <>
              {/* ADVANCED / DETAILS VIEW */}
              <div className="mt-1 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-100">
                      Analytics cookies
                    </div>
                    <p className="text-slate-400">
                      Help us understand how visitors use the site.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={() => togglePref("analytics")}
                      className="accent-cyan-400"
                    />
                    <span>On</span>
                  </label>
                </div>

                <div className="flex items-start justify-between gap-3 pt-2 border-t border-slate-700/60">
                  <div>
                    <div className="font-semibold text-slate-100">
                      Performance cookies
                    </div>
                    <p className="text-slate-400">
                      Keep the site fast, secure and reliable.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={prefs.performance}
                      onChange={() => togglePref("performance")}
                      className="accent-cyan-400"
                    />
                    <span>On</span>
                  </label>
                </div>

                <div className="flex items-start justify-between gap-3 pt-2 border-t border-slate-700/60">
                  <div>
                    <div className="font-semibold text-slate-100">
                      Marketing cookies
                    </div>
                    <p className="text-slate-400">
                      Used for personalised marketing and outreach.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={prefs.marketing}
                      onChange={() => togglePref("marketing")}
                      className="accent-cyan-400"
                    />
                    <span>On</span>
                  </label>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500
                  text-white text-sm font-medium shadow hover:from-cyan-400 hover:to-indigo-400"
                >
                  Save preferences
                </button>

                <button
                  type="button"
                  onClick={() => setView("simple")}
                  className="px-4 py-2 rounded-md border border-slate-600/60 text-slate-200 text-xs hover:bg-slate-800/80"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* MINI PILL TO REOPEN */}
      {!showPanel && (
        <button
          type="button"
          onClick={openPanel}
          className="fixed bottom-5 right-5 z-[70] rounded-full shadow-lg border border-cyan-400/40
          bg-slate-900/80 text-cyan-300 hover:text-cyan-100 hover:bg-slate-900/95 backdrop-blur-md transition-all duration-200"
        >
          <div className="px-3 py-2 flex items-center gap-2 text-xs font-medium">
            <span className="inline-flex w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 justify-center items-center text-[11px]">
              ⚙
            </span>
            <span>Cookies</span>
          </div>
        </button>
      )}
    </>
  );
}
