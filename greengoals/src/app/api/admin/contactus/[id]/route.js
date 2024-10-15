import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import ContactUs from "../../../../../models/contactUs";
import nodemailer from "nodemailer";

export async function PATCH(req, { params }) {
  const { id } = params; // Extract the `id` from the params
  await connectDB(); // Connect to the database

  try {
    const body = await req.json(); // Parse the JSON body from the request

    const updatedContact = await ContactUs.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedContact },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// Named export for POST request
export async function POST(req, { params }) {
  // تعديل هنا
  const id = params.id; // استخرج `id` من المعاملات
  const { response, email } = await req.json();

  await connectDB();

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"اسم موقعك" <${process.env.EMAIL}>`,
      to: email,
      subject: "الرد على استفسارك",
      text: response,
      html: `<div dir="rtl"><p>${response}</p></div>`,
    });

    const updatedContact = await ContactUs.findByIdAndUpdate(
      // استخدام findByIdAndUpdate
      id,
      { status: "resolved", response },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedContact },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
