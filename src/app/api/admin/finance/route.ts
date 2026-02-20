import { NextResponse } from "next/server";
import { addFinance, listFinance } from "@/lib/opsStore";

export async function GET() {
  return NextResponse.json({ rows: await listFinance() });
}

export async function POST(request: Request) {
  const form = await request.formData();
  await addFinance({
    type: String(form.get("type") || "expense") as "income" | "expense",
    amount: Number(form.get("amount") || 0),
    category: String(form.get("category") || "general"),
    note: String(form.get("note") || ""),
  });
  return NextResponse.redirect(new URL("/admin/ops", request.url), 303);
}
