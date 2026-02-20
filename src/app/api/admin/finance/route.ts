import { NextResponse } from "next/server";
import { addFinance, listFinance } from "@/lib/opsStore";
import { validateFinanceEntry, errorResponse } from "@/lib/validation";
import { appendAuditLog } from "@/lib/store";

export async function GET() {
  try {
    const rows = await listFinance();
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching finance entries:", error);
    return NextResponse.json({ error: "Failed to fetch finance entries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const validation = validateFinanceEntry(formData);

    if (!validation.valid) {
      return errorResponse(validation.errors, 400);
    }

    const { type, amount, category, note } = validation.data as {
      type: "income" | "expense";
      amount: number;
      category: string;
      note: string;
    };

    const entry = await addFinance({ type, amount, category, note });

    // Audit log
    await appendAuditLog({
      action: "create",
      entity: "finance",
      entityId: entry.id,
      changes: { type, amount, category, note },
    });

    return NextResponse.redirect(new URL("/admin/ops", request.url), 303);
  } catch (error) {
    console.error("Error adding finance entry:", error);
    return NextResponse.json({ error: "Failed to add finance entry" }, { status: 500 });
  }
}
