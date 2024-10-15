// src/middleware/auth.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function auth(handler) {
  return async (request) => {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded;
      return handler(request);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  };
}