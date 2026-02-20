import { NextResponse } from "next/server";
import { listLeads, updateLeadStatus, updateLead, appendAuditLog } from "@/lib/store";
import { validateLeadUpdate, errorResponse, sanitizeString, isValidUUID } from "@/lib/validation";

export async function GET() {
  try {
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    
    // Handle JSON requests (for advanced updates)
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { id, status, ...additionalFields } = body;

      if (!id || !isValidUUID(id)) {
        return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });
      }

      if (status) {
        const result = await updateLeadStatus(id, status, additionalFields);
        if (!result) {
          return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }
        return NextResponse.json({ lead: result });
      }

      const result = await updateLead(id, additionalFields);
      if (!result) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      }
      return NextResponse.json({ lead: result });
    }

    // Handle form data (traditional form submission)
    const formData = await request.formData();
    const validation = validateLeadUpdate(formData);

    if (!validation.valid) {
      return errorResponse(validation.errors, 400);
    }

    const { id, status, loss_reason, won_value, source_confidence } = validation.data as {
      id: string;
      status: string;
      loss_reason?: string;
      won_value?: number;
      source_confidence?: string;
    };

    const additionalFields: Record<string, unknown> = {};
    if (loss_reason) additionalFields.loss_reason = loss_reason;
    if (won_value) additionalFields.won_value = won_value;
    if (source_confidence) additionalFields.source_confidence = source_confidence;

    const result = await updateLeadStatus(id, status as any, additionalFields);
    
    if (!result) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Redirect back to admin for form submissions
    return NextResponse.redirect(new URL("/admin", request.url), 303);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

// PATCH endpoint for partial updates
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...patch } = body;

    if (!id || !isValidUUID(id)) {
      return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });
    }

    // Sanitize patch data
    const sanitizedPatch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(patch)) {
      if (typeof value === "string") {
        sanitizedPatch[key] = sanitizeString(value, 500);
      } else if (typeof value === "number") {
        sanitizedPatch[key] = value;
      }
    }

    const result = await updateLead(id, sanitizedPatch);
    
    if (!result) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead: result });
  } catch (error) {
    console.error("Error patching lead:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
