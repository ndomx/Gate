import { activateNode } from "@/utils/gate-client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const body = await req.json();
  await activateNode(body.userId, body.nodeId);

  return new NextResponse();
}
