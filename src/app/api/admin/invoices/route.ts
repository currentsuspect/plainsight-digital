import { NextResponse } from "next/server";
import { addFinance, addInvoice, listInvoices, updateInvoice } from "@/lib/opsStore";
import { notifyTelegramInvoiceStatus } from "@/lib/notify";
import { validateInvoiceEntry, validateInvoiceUpdate, errorResponse } from "@/lib/validation";
import { appendAuditLog } from "@/lib/store";
import { reportError } from "@/lib/errorHandler";

export async function GET() {
  try {
    const rows = await listInvoices();
    return NextResponse.json({ rows });
  } catch (error) {
    reportError(error instanceof Error ? error : new Error(String(error)), "error", {
      path: "/api/admin/invoices",
      method: "GET",
    });
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const action = String(formData.get("action") || "create");

    if (action === "update") {
      const validation = validateInvoiceUpdate(formData);

      if (!validation.valid) {
        return errorResponse(validation.errors, 400);
      }

      const { id, status, dueDate, note } = validation.data as {
        id: string;
        status?: "draft" | "sent" | "paid";
        dueDate?: string;
        note?: string;
      };

      const patch: Record<string, unknown> = {};
      if (status) patch.status = status;
      if (dueDate) patch.dueDate = dueDate;
      if (note) patch.note = note;

      const result = await updateInvoice(id, patch);

      if (!result) {
        return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
      }

      // Audit log
      await appendAuditLog({
        action: "update",
        entity: "invoice",
        entityId: id,
        changes: { prev: result.prev, next: result.next },
      });

      if (result?.next) {
        await notifyTelegramInvoiceStatus({
          invoiceNumber: result.next.invoiceNumber,
          client: result.next.client,
          status: result.next.status,
          dueDate: result.next.dueDate,
          amount: result.next.amount,
        });
      }

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

    // Create new invoice
    const validation = validateInvoiceEntry(formData);

    if (!validation.valid) {
      return errorResponse(validation.errors, 400);
    }

    const { client, item, amount, status, dueDate, paymentInstruction, note } = validation.data as {
      client: string;
      item: string;
      amount: number;
      status: "draft" | "sent" | "paid";
      dueDate?: string;
      paymentInstruction?: string;
      note?: string;
    };

    const invoice = await addInvoice({
      client,
      item,
      amount,
      status,
      dueDate,
      paymentInstruction,
      note,
    });

    // Audit log
    await appendAuditLog({
      action: "create",
      entity: "invoice",
      entityId: invoice.id,
      changes: { client, item, amount, status },
    });

    return NextResponse.redirect(new URL("/admin/ops", request.url), 303);
  } catch (error) {
    reportError(error instanceof Error ? error : new Error(String(error)), "error", {
      path: "/api/admin/invoices",
      method: "POST",
    });
    return NextResponse.json({ error: "Failed to process invoice" }, { status: 500 });
  }
}
