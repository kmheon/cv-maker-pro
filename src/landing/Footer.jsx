import { useState } from "react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const manualNumber = "01688-966983";

  const handleCopy = () => {
    navigator.clipboard.writeText(manualNumber.replace(/[- ]/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t bg-white py-10">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
        <p className="font-semibold">
          Made with ❤️ to help people land their next opportunity.
        </p>

        <p className="mt-2">
          CV Maker Pro will always let you create and download a professional CV
          for free.
        </p>

        {/* Donation Trigger Button */}
        <div className="mt-8 border-t border-slate-100 pt-6 max-w-md mx-auto">
          <p className="text-xs font-medium text-slate-600 mb-3">
            Want to support our mission? 🚀
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors cursor-pointer"
          >
            ☕ Support / Donate Code
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          Built by{" "}
          <a
            href="https://camnexbd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:underline font-medium"
          >
            CamneX Bangladesh
          </a>
        </p>
      </div>

      {/* Bangla QR Code Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          {/* Modal Box */}
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-slate-800">Support Our Work</h3>
            <p className="mt-1 text-xs text-slate-500 px-2 font-medium">
              Scan via Bangla QR using bKash, Nagad, Rocket, Upay, or any bank app
            </p>

            {/* Bangla QR Image Window */}
            <div className="my-5 mx-auto flex h-52 w-52 items-center justify-center overflow-hidden rounded-3xl shadow-md">
              <img
                src="/bangla-qr-code-camnexbd.svg" 
                alt="Bangla QR Code"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold tracking-wider">
                OR MANUAL SEND MONEY
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Unified Personal Number Layout */}
            <div className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-100 text-left">
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                  Personal Account
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  bKash / Nagad / Rocket / Upay
                </span>
              </div>
              
              <div className="flex items-center justify-between bg-white px-2.5 py-2 rounded-lg border border-slate-200/60">
                <span className="font-mono font-bold text-sm text-slate-800 tracking-wider">
                  {manualNumber}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-orange-600 hover:text-orange-700 font-bold cursor-pointer underline min-w-[50px] text-right"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 w-full rounded-xl bg-slate-950 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
