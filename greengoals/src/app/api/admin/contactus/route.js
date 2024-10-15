import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import ContactUs from "../../../../models/contactUs";

// Named export for GET request
export async function GET() {
  await connectDB();

  try {
    const contacts = await ContactUs.find({}).sort({ date: -1 });
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
