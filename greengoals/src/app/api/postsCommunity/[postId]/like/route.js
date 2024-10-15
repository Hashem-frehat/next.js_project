import { connectDB } from '../../../../../lib/db'; // Connection to MongoDB
import Comunity from '@/models/postcomunity';
import { NextResponse } from 'next/server';
import Notification from '@/models/Notification';


export async function POST(req, { params }) {
  const { postId  } = params;
  const { userId } = await req.json(); // Extract userId from request body


  // Check if userId is defined
  if (!userId) {
    return NextResponse.json({ message: 'User not authenticated.' }, { status: 401 });
  }

  await connectDB(); // Ensure your database connection

  try {
    const post = await Comunity.findById(postId);

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Check if the user already liked the post
    if (post.likes.includes(userId)) {
      return NextResponse.json({ message: 'You already liked this post.' }, { status: 400 });
    }

    // Add user ID to likes array
    post.likes.push(userId);
    await post.save();

    // await Notification.create({
    //     recipient: post.author,
    //     sender: authorId,
    //     post: post._id,
    //     comment: newComment._id,
    //     type: 'comment_post'
    //   });

    return NextResponse.json({ message: 'Post liked successfully!', post }, { status: 200 });
  } catch (error) {
    console.error('Error liking post:', error); // Log the error for debugging
    return NextResponse.json({ message: 'Error liking post' }, { status: 500 });
  }
}



export async function GET(req, { params }) {
  const { postId } = params;

  await connectDB(); // Ensure your database connection

  try {
    const post = await Comunity.findById(postId)
      .populate('author', 'name') // Populate author username
      .populate('likes', 'name') // Populate likes with username
      .populate({
        path: 'comments.author',
        select: 'name' // Populate comment authors with username
      });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error); // Log the error for debugging
    return NextResponse.json({ message: 'Error fetching post' }, { status: 500 });
  }
}
