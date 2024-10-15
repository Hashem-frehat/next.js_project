import { connectDB } from "../../../lib/db"; // Connection to MongoDB
import Comunity from "@/models/postcomunity";
import User from "@/models/User"; // Ensure this path is correct
import { NextResponse } from "next/server";

// export async function GET() {
//   await connectDB(); // Ensures MongoDB connection
//   const posts = await Post.find({}).populate("author"); // Corrected to use "author"
//   return NextResponse.json(posts); // Returning posts as JSON response
// }

// export async function GET(request) {
//   try {
//     await connectDB(); // Ensures MongoDB connection

//     // Get the category from the query parameters
//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get('category');

//     let query = {};
//     if (category) {
//       query.category = category;
//     }

//     const posts = await Comunity.find(query).populate("author");
//     console.log(posts);
//         return NextResponse.json(posts);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

export async function GET(request) {
  try {
    await connectDB(); // Ensures MongoDB connection

    // Get the category from the query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = {};
    if (category) {
      query.category = category;
    }

    const posts = await Comunity.find({}).populate("author");
    console.log("Fetched posts:", posts); // Log the fetched posts

    // Check if posts are found
    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found for the given category." },
        { status: 404 }
      );
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST: Add a new community post (user-generated content)
export async function POST(req) {
  await connectDB(); // Ensure DB is connected
  const body = await req.json(); // Get request body

  // Create a new post based on the request data
  const newPost = new Comunity({
    author: body.author,
    content: body.content,
    images: body.images || [],
    tags: body.tags || [],
    visibility: body.visibility || "public",
    category: body.category,
  });

  // Save the new post to the database
  await newPost.save();
  return NextResponse.json({ message: "Community post added successfully!" });
}

// DELETE: Remove a community post by the author
export async function DELETE(req) {
  try {
    await connectDB(); // Ensure MongoDB connection

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id"); // Get the post ID from the query parameters
    const authorId = searchParams.get("authorId"); // Get the author's ID from the query parameters (or from token/session)

    // Ensure postId and authorId are provided
    if (!postId || !authorId) {
      return NextResponse.json(
        { error: "Post ID and Author ID are required." },
        { status: 400 }
      );
    }

    // Find the post by ID
    const post = await Comunity.findById(postId);

    // Check if the post exists and the author matches
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    if (post.author.toString() !== authorId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this post." },
        { status: 403 }
      );
    }

    // Delete the post
    await Comunity.findByIdAndDelete(postId);

    return NextResponse.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
