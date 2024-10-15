import { NextResponse } from "next/server"; // Add this import
import { connectDB } from "../../../../../lib/db";
import Product from "../../../../../models/product";



// دالة PUT لتحديث منتج
export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const body = await req.json();

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    {
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      category: body.category,
      images: body.images,
    },
    { new: true }
  );

  if (!updatedProduct) {
    return new Response(JSON.stringify({ message: "Product not found!" }), {
      status: 404,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Product updated successfully!",
      product: updatedProduct,
    }),
    { status: 200 }
  );
}

// يمكنك إضافة دالة GET إذا كنت بحاجة لاسترجاع منتج
export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  const product = await Product.findById(id);

  if (!product) {
    return new Response(JSON.stringify({ message: "Product not found!" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(product), { status: 200 });
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
