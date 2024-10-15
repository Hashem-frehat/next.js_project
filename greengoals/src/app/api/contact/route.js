import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';// Adjust the path if necessary
import ContactUs from "@/models/contactUs"; // Adjust the path to where your model is defined

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    console.log("Received data:", data);  // Log received data

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!data[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log("Invalid email format");
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const newContact = new ContactUs(data);
    await newContact.save();
    console.log("Contact saved successfully:", newContact);
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/contact:", error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const contacts = await ContactUs.find();
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const { id, ...data } = await request.json();
    const updatedContact = await ContactUs.findByIdAndUpdate(id, data, { new: true });
    if (!updatedContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();
    const deletedContact = await ContactUs.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}