import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, helpType, message, location, lat, lng } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const coordinatesStr = lat && lng ? `${lat}, ${lng}` : 'Not provided';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "harinithamg03@gmail.com",
      subject: "New Disaster Help Request",
      text: `New Disaster Help Request\n\nName: ${name}\nPhone: ${phone}\nHelp Needed: ${helpType}\nLocation: ${location}\nMessage: ${message}\nCoordinates: ${coordinatesStr}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ef4444;">New Disaster Help Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Help Needed:</strong> ${helpType}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Coordinates:</strong> ${coordinatesStr}</p>
        </div>
      `,
    };

    // Ensure the email is sent using Nodemailer. 
    // In development without credentials, this will throw an error caught below.
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.log("Email error:", error);
      return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Your help request has been sent. Rescue team will contact you soon." 
    });

  } catch (error) {
    console.error("Help request error:", error);
    return NextResponse.json({ success: false, error: "Failed to send help request" }, { status: 500 });
  }
}
