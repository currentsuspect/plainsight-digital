"use client";

export default function InvoicePrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="px-3 py-2 rounded bg-slate-900 text-white text-sm"
    >
      Print / Save PDF
    </button>
  );
}
