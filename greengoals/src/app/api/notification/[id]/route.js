
// app/api/notifications/[id]/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db'
import Notification from '@/models/Notification';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  try {
    const { id } = params;
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    return NextResponse.json(updatedNotification);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 400 });
  }
}