import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Reminder: Plain password for hackathon demo. Use bcrypt in production.
        role,
      },
    });

    return NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message || "Failed to create account" }, { status: 500 });
  }
}
