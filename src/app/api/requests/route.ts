import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const requests = await prisma.helpRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: { requester: true }
    });
    
    const mappedRequests = requests.map(req => ({
      ...req, // Keep original fields for backward compatibility (Map.tsx)
      latitude: req.lat,
      longitude: req.lng,
      location: req.locationName,
      helpType: req.type,
      name: req.requester?.name || "Unknown User",
      message: req.description
    }));
    
    return NextResponse.json(mappedRequests);
  } catch (error) {
    console.error("Failed to fetch requests:", error);
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const data = await req.json();

    // Smart Priority Scoring (Initial Logic)
    let priorityScore = 0;
    if (data.urgency === "CRITICAL") priorityScore += 50;
    if (data.urgency === "HIGH") priorityScore += 30;
    priorityScore += Math.min(data.peopleAffected * 5, 50);

    const helpRequest = await prisma.helpRequest.create({
      data: {
        requesterId: session?.user?.id || null,
        lat: data.lat,
        lng: data.lng,
        type: data.type,
        description: data.description,
        urgency: data.urgency,
        peopleAffected: data.peopleAffected,
        priorityScore: priorityScore,
        status: "PENDING",
      },
    });

    return NextResponse.json(helpRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
  }
}
