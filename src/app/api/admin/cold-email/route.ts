// API Route: /api/admin/cold-email
// Cold email management endpoints

import { NextRequest, NextResponse } from "next/server";
import { 
  listTargets, 
  addTarget, 
  updateTarget, 
  deleteTarget,
  listHistory,
  addHistory,
  getColdEmailStats
} from "@/lib/coldEmailStore";
import { revalidatePath } from "next/cache";

// GET — List targets, history, or stats
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "targets";

  try {
    if (action === "stats") {
      const stats = await getColdEmailStats();
      return NextResponse.json(stats);
    }
    
    if (action === "history") {
      const history = await listHistory();
      return NextResponse.json(history);
    }
    
    const targets = await listTargets();
    return NextResponse.json(targets);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST — Add target
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const target = await addTarget(body);
    revalidatePath("/admin/cold-email");
    return NextResponse.json(target, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add target" },
      { status: 500 }
    );
  }
}

// PUT — Update target
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const target = await updateTarget(id, updates);
    if (!target) {
      return NextResponse.json(
        { error: "Target not found" },
        { status: 404 }
      );
    }
    revalidatePath("/admin/cold-email");
    return NextResponse.json(target);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update target" },
      { status: 500 }
    );
  }
}

// DELETE — Delete target
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "ID required" },
        { status: 400 }
      );
    }
    
    const success = await deleteTarget(id);
    if (!success) {
      return NextResponse.json(
        { error: "Target not found" },
        { status: 404 }
      );
    }
    revalidatePath("/admin/cold-email");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete target" },
      { status: 500 }
    );
  }
}
