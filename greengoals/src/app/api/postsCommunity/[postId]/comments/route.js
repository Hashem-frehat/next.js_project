import { connectDB } from '../../../../../lib/db'; // Connection to MongoDB
import Comunity from '@/models/postcomunity';
import Notification from '@/models/Notification';
import { NextResponse } from 'next/server';



// POST /api/posts/[postId]/comments
export async function POST(request, { params }) {
    const { postId } = params; // Extract postId from the URL
  
    try {
      // Connect to MongoDB
      await connectDB();
  
      // Parse the request body to get the new comment content
      const { authorId, content } = await request.json();
  
      if (!authorId || !content) {
        return NextResponse.json(
          { message: 'Author ID and content are required.' },
          { status: 400 }
        );
      }
  
      // Find the post by postId
      const post = await Comunity.findById(postId);
  
      if (!post) {
        return NextResponse.json(
          { message: 'Post not found.' },
          { status: 404 }
        );
      }
  
      // Add the new comment to the post
      post.comments.push({
        author: authorId,
        content: content,
        createdAt: new Date(),
      });
  
      // Save the post with the new comment
      await post.save();

      // await Notification.create({
      //   recipient: post.author,
      //   sender: authorId,
      //   post: post._id,
      //   comment: newComment._id,
      //   type: 'comment_post'
      // });
  
      // Respond with the updated post data
      return NextResponse.json({ message: 'Comment added successfully!', post });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Failed to add comment.' },
        { status: 500 }
      );
    }
  }
  



// GET /api/posts/[postId]/comments - Get all comments for the post
export async function GET(request, { params }) {
  const { postId } = params;

  try {
    // Connect to MongoDB
    await connectDB();

    // Find the post by postId and populate the comments
    const post = await Comunity.findById(postId).populate('comments.author');

    if (!post) {
      return NextResponse.json({ message: 'Post not found.' }, { status: 404 });
    }

    // Respond with the list of comments
    return NextResponse.json({ comments: post.comments });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to retrieve comments.' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[postId]/comments - Delete a specific comment by its commentId
export async function DELETE(request, { params }) {
  const { postId } = params;
  const { commentId } = await request.json(); // Assuming commentId is passed in the request body

  try {
    // Connect to MongoDB
    await connectDB();

    // Find the post by postId
    const post = await Comunity.findById(postId);

    if (!post) {
      return NextResponse.json({ message: 'Post not found.' }, { status: 404 });
    }

    // Find and remove the comment by commentId
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return NextResponse.json(
        { message: 'Comment not found.' },
        { status: 404 }
      );
    }

    // Remove the comment
    post.comments.splice(commentIndex, 1);

    // Save the post without the deleted comment
    await post.save();

    // Respond with success message
    return NextResponse.json({ message: 'Comment deleted successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to delete comment.' },
      { status: 500 }
    );
  }
}
