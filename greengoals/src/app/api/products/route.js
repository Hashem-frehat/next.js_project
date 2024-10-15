
import { connectDB } from '../../../lib/db';

import Product from '../../../models/product';
import { NextResponse } from 'next/server';

// GET: Fetch all products
export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json(products);
}

// POST: Add a new product (Admin only)
export async function POST(req) {
    await connectDB();
    const body = await req.json();

  const product = new Product({
    name: body.name,
    description: body.description,
    price: body.price,
    stock: body.stock,
    category: body.category,
    images: body.images,
  });

  await product.save();
  return NextResponse.json({ message: 'Product added successfully!' });
}



