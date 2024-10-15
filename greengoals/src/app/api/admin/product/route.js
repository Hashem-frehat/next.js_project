// Get all products (GET)
import { NextResponse } from "next/server"; // Add this import
import { connectDB } from "../../../../lib/db";
import Product from "../../../../models/product";
export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json(products);
}
export async function DELETE(req) {
  await connectDB();
  const id = req.nextUrl.pathname.split("/").pop(); // استخراج المعرف من URL

  const deletedProduct = await Product.findByIdAndDelete(id); // حذف المنتج

  if (!deletedProduct) {
    return NextResponse.json(
      { message: "لم يتم العثور على المنتج!" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "تم حذف المنتج بنجاح!" });
}
// Add new product (POST)
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
  return NextResponse.json({ message: "Product added successfully!" });
}
