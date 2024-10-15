import { connectDB } from '../../../../lib/db';
import Product from '../../../../models/product';
import { NextResponse } from 'next/server';
import { isValidObjectId } from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    console.log(`Attempting to fetch product with ID: ${id}`);

    if (!id || !isValidObjectId(id)) {
      console.log(`Invalid product ID: ${id}`);
      return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
    }

    const product = await Product.findById(id);
    
    if (!product) {
      console.log(`Product not found for ID: ${id}`);
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    console.log(`Successfully fetched product: ${product.name}`);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in GET /api/products/[id]:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}