import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { latitude, longitude } = await req.json();

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
      subject: "🚨 SOS EMERGENCY ALERT",
      html: `
        <h1 style="color:red">🚨 EMERGENCY SOS ALERT</h1>
        <p><b>Location:</b> <a href="https://www.google.com/maps?q=${latitude},${longitude}">Click to view on Google Maps</a></p>
        <p><b>Latitude:</b> ${latitude}</p>
        <p><b>Longitude:</b> ${longitude}</p>
        <p><b>Time:</b> ${new Date().toLocaleString()}</p>
        <p style="color:red"><b>Someone needs immediate help! Please respond urgently.</b></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SOS email error:", error);
    return NextResponse.json({ error: "Failed to send alert" }, { status: 500 });
  }
}
