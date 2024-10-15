// app/api/notifications/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Notification from '@/models/Notification';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const notifications = await Notification.find({ recipient: session.user.id })
      .populate('sender', 'name')
      .populate('post', 'content')
      .sort({ createdAt: -1 })
      .limit(20);
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 400 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { recipient, sender, post, comment, type } = await request.json();
    const notification = await Notification.create({
      recipient,
      sender,
      post,
      comment,
      type
    });
    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 400 });
  }
}
