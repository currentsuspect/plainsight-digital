import { NextResponse } from "next/server";
import { addInvoice, listInvoices } from "@/lib/opsStore";

export async function GET() {
  return NextResponse.json({ rows: await listInvoices() });
}

export async function POST(request: Request) {
  const form = await request.formData();
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
