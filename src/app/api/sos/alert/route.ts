import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { lat, lng } = await req.json();

    const alert = await prisma.emergencyAlert.create({
      data: {
        lat,
        lng,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Emergency Alert Sent", 
      alert 
    });

  } catch (error) {
    console.error("SOS alert error:", error);
    return NextResponse.json({ success: false, error: "Failed to send SOS alert" }, { status: 500 });
  }
}
