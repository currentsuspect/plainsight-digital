import { NextResponse } from "next/server";
import { addFinance, addInvoice, listInvoices, updateInvoice } from "@/lib/opsStore";

export async function GET() {
  return NextResponse.json({ rows: await listInvoices() });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const action = String(form.get("action") || "create");

  if (action === "update") {
    const id = String(form.get("id") || "");
    const status = String(form.get("status") || "") as "draft" | "sent" | "paid";
    const dueDate = String(form.get("dueDate") || "");

    const result = await updateInvoice(id, {
      ...(status ? { status } : {}),
      ...(dueDate ? { dueDate } : {}),
    });

    if (result?.prev && result?.next && result.prev.status !== "paid" && result.next.status === "paid") {
      await addFinance({
        type: "income",
        amount: result.next.amount,
        category: "invoice_payment",
        note: `Invoice paid: ${result.next.invoiceNumber} (${result.next.client})`,
      });
    }

    return NextResponse.redirect(new URL("/admin/ops", request.url), 303);
  }

  await addInvoice({
    client: String(form.get("client") || "Client"),
    item: String(form.get("item") || "Web development"),
    amount: Number(form.get("amount") || 0),
    status: String(form.get("status") || "draft") as "draft" | "sent" | "paid",
    dueDate: String(form.get("dueDate") || ""),
    paymentInstruction: String(form.get("paymentInstruction") || ""),
    note: String(form.get("note") || ""),
  });
  return NextResponse.redirect(new URL("/admin/ops", request.url), 303);
}
