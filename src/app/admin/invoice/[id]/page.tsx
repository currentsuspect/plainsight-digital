import { getInvoice } from "@/lib/opsStore";
import { PAYMENT_FULL_TEXT } from "@/lib/paymentConfig";
import { notFound } from "next/navigation";
import InvoicePrintButton from "./InvoicePrintButton";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await getInvoice(id);
  if (!invoice) return notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900 p-6 md:p-12">
      <style>{`@media print { .no-print { display: none !important; } main { padding: 0 !important; } .invoice-wrap { border: none !important; box-shadow: none !important; } }`}</style>
      <div className="max-w-3xl mx-auto border border-slate-200 rounded-xl p-6 invoice-wrap">
        <div className="no-print flex justify-end mb-4">
          <InvoicePrintButton />
        </div>
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <img src="/logo.png" alt="PlainSight Digital" className="h-12 w-12 rounded" />
            <h1 className="text-2xl font-bold mt-3">PlainSight Digital</h1>
            <p className="text-sm text-slate-600">Invoice #{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right text-sm">
            <p><strong>Issue date:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
            <p><strong>Due date:</strong> {invoice.dueDate || "Pending approval"}</p>
            <p><strong>Status:</strong> {invoice.status}</p>
          </div>
        </div>

        <section className="mb-6">
          <h2 className="text-sm uppercase tracking-wide text-slate-500">Bill To</h2>
          <p className="text-lg font-semibold">{invoice.client}</p>
        </section>

        <section className="mb-6">
          <table className="w-full text-sm border border-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3">Description</th>
                <th className="text-right p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">{invoice.item}</td>
                <td className="p-3 text-right">KES {invoice.amount.toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-50">
                <td className="p-3 font-semibold">Total</td>
                <td className="p-3 text-right font-semibold">KES {invoice.amount.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </section>

        <section className="text-sm text-slate-700 space-y-2">
          <p><strong>Payment instructions:</strong> {invoice.paymentInstruction || PAYMENT_FULL_TEXT}</p>
          {invoice.note && <p><strong>Note:</strong> {invoice.note}</p>}
          <p>Thank you for trusting PlainSight Digital.</p>
        </section>
      </div>
    </main>
  );
}
