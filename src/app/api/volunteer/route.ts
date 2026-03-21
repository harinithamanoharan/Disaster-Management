import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, phone, location, role, availability } = await req.json();

    if (!name || !email || !phone || !location) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "harinithamg03@gmail.com",
      subject: "New Volunteer Registration",
      html: `
        <h2>New Volunteer Registration</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Role:</b> ${role}</p>
        <p><b>Availability:</b> ${availability}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Volunteer registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
