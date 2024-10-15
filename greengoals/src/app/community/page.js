"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  PlusCircle,
  MessageCircle,
  Heart,
  XCircle,
  Send,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
  Flag,
} from "lucide-react";

const categories = [
  "sustainability",
  "recycling",
  "environmental protection",
  "eco-friendly",
  "green initiatives",
  "environmental awareness",
  "waste management",
];
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${
        type === "success"
          ? "bg-green-100 border-green-400 text-green-700"
          : type === "error"
          ? "bg-red-100 border-red-400 text-red-700"
          : "bg-blue-100 border-blue-400 text-blue-700"
      }`}
    >
      {getIcon()}
      <span className="ml-2">{message}</span>
      <button onClick={onClose} className="ml-4">
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState("");
  const [likedUsers, setLikedUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    author: "",
    content: "",
    images: [],
    tags: "",
    category: "sustainability",
    visibility: "public",
  });

  useEffect(() => {
    const userInfo = sessionStorage.getItem("user");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setUserId(parsedUserInfo.id);
      setFormData((prev) => ({
        ...prev,
        author: parsedUserInfo.id || "",
      }));
    }
    fetchPosts();
  }, []);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/postsCommunity");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      showNotification("Failed to fetch posts", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/postsCommunity",
        formData
      );
      showNotification(res.data.message, "success");
      fetchPosts();
      setFormData({
        author: "",
        content: "",
        images: [],
        tags: "",
        category: "sustainability",
        visibility: "public",
      });
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error submitting post:", error);
      showNotification("Failed to create post", "error");
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/postsCommunity?id=${postId}&authorId=${userId}`
        );
        showNotification(res.data.message, "success");
        fetchPosts();
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(null);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        showNotification("Failed to delete post", "error");
      }
    }
  };
  const MySwal = withReactContent(Swal);

  const handlePostClick = async (post) => {
    setSelectedPost(post);
    await fetchLikes(post._id);
    await fetchComments(post._id);
  };

  const handleLike = async () => {
    if (selectedPost && !selectedPost.likes.includes(userId)) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/postsCommunity/${selectedPost._id}/like`,
          { userId }
        );
        const updatedPost = response.data.post;
        setPosts(
          posts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
        setSelectedPost(updatedPost);
        await fetchLikes(selectedPost._id);
        showNotification("Post liked successfully", "success");
      } catch (error) {
        console.error("Error liking post:", error);
        showNotification("Failed to like post", "error");
      }
    }
  };

  const fetchLikes = async (postId) => {
    if (!postId) {
      console.error("Post ID is null or undefined.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/postsCommunity/${postId}/like`
      );
      if (response.data && response.data.likes) {
        setLikedUsers(response.data.likes);
      } else {
        console.error("Error: Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
      showNotification("Failed to fetch likes", "error");
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/postsCommunity/${postId}/comments`
      );
      setSelectedPost((prevPost) => ({
        ...prevPost,
        comments: response.data.comments,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
      showNotification("Failed to fetch comments", "error");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    try {
      await axios.post(
        `http://localhost:3000/api/postsCommunity/${selectedPost._id}/comments`,
        {
          authorId: userId,
          content: newComment,
        }
      );
      setNewComment("");
      await fetchComments(selectedPost._id);
      const updatedPosts = await axios.get(
        "http://localhost:3000/api/postsCommunity"
      );
      setPosts(updatedPosts.data);
      showNotification("Comment added successfully", "success");
    } catch (error) {
      console.error("Error submitting comment:", error);
      showNotification("Failed to add comment", "error");
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/postsCommunity/${selectedPost._id}/comments`,
        {
          data: { commentId },
        }
      );
      await fetchComments(selectedPost._id);
      showNotification("Comment deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting comment:", error);
      showNotification("Failed to delete comment", "error");
    }
  };
  const handleReport = () => {
    MySwal.fire({
      title: "الإبلاغ عن هذا المنشور",
      input: "select",
      inputOptions: {
        inappropriate: "غير لائق",
        offensive: "مسيء",
        spam: "محتوى مزعج",
        other: "سبب آخر",
      },
      inputPlaceholder: "اختر سببًا",
      showCancelButton: true,
      confirmButtonText: "إرسال البلاغ",
      showLoaderOnConfirm: true,
      preConfirm: async (reason) => {
        if (!reason) {
          Swal.showValidationMessage("الرجاء اختيار سبب للإبلاغ");
          return false;
        }
        try {
          const response = await axios.patch(
            `/api/postsCommunity/${selectedPost._id}/report`, // تأكد من أن هذا هو المسار الصحيح
            { reason, userId },
            { withCredentials: true }
          );

          if (response.status !== 200) {
            throw new Error(response.data.message || "حدث خطأ أثناء الإبلاغ");
          }

          return response.data;
        } catch (error) {
          Swal.showValidationMessage(`فشل الطلب: ${error.message}`);
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          icon: "success",
          title: "شكرًا لك على الإبلاغ!",
          text: "سنراجع هذا المنشور بناءً على ملاحظاتك.",
        });
      }
    });
  };

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="bg-gray-100 min-h-screen">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="relative h-64 mb-12 rounded-lg overflow-hidden">
        <img
          src="https://i.pinimg.com/564x/1c/66/80/1c66800eea169d05e7586fe8a5929f26.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-[#c9d3cbb5]">Community</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center mb-12 hover:bg-green-700 transition duration-300"
        >
          <PlusCircle className="mr-2" /> Create New Post
        </button>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 relative">
              <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>

              <form onSubmit={handleSubmit}>
                <textarea
                  name="content"
                  placeholder="Write your post here..."
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 border rounded"
                  rows="4"
                  required
                ></textarea>
                <input
                  type="text"
                  name="images"
                  placeholder="Image URLs (comma separated)"
                  value={formData.images}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 border rounded"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 border rounded"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="private">Private</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center hover:bg-green-700 transition duration-300"
                >
                  <PlusCircle className="mr-2" /> Create Post
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            className={`px-6 py-2 rounded-full transition duration-300 ${
              selectedCategory === "All"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition duration-300 ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer relative"
            >
              {post.images && post.images.length > 0 && (
                <img
                  src={post.images[0]}
                  alt={post.content}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {post.author?.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{post.category}</p>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <Heart size={18} className="mr-1" />{" "}
                    {post.likes?.length || 0}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle size={18} className="mr-1" />{" "}
                    {post.comments?.length || 0}
                  </span>
                </div>
              </div>
              {userId === post.author?._id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post._id);
                  }}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1 z-50"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <div
                className="absolute inset-0"
                onClick={() => handlePostClick(post)}
              ></div>
            </div>
          ))}
        </div>

        {selectedPost && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>
              {selectedPost.images && selectedPost.images.length > 0 && (
                <img
                  src={selectedPost.images[0]}
                  alt={selectedPost.content}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-3xl font-semibold mb-2">
                {selectedPost.author?.name || "Unknown"}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Category: {selectedPost.category}
              </p>
              <p className="text-gray-800 mb-4">{selectedPost.content}</p>
              <div className="flex items-center mb-6">
                <button
                  onClick={handleLike}
                  className="flex items-center text-red-500 hover:text-red-600 transition-colors"
                >
                  <Heart size={24} className="mr-2" fill="currentColor" />
                  <span className="text-lg font-semibold">
                    {selectedPost.likes?.length || 0}
                  </span>
                </button>
                <span className="mx-4 text-gray-300">|</span>
                <div className="flex items-center text-blue-500">
                  <MessageCircle size={24} className="mr-2" />
                  <span className="text-lg font-semibold">
                    {selectedPost.comments?.length || 0} Comments
                  </span>
                </div>
                <button
                  onClick={handleReport}
                  className="text-gray-600 hover:text-red-500 transition"
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Liked by:</h3>
                <div className="flex flex-wrap gap-2">
                  {likedUsers.map((user) => (
                    <span
                      key={user._id}
                      className="bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center"
                    >
                      <User size={16} className="mr-1" />
                      {user.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                {selectedPost.comments?.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-50 rounded-lg p-3 flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold text-sm text-gray-700 flex items-center">
                        <User size={16} className="mr-1" />
                        {comment.author?.name || "Unknown"}
                      </p>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                    {userId === comment.author?._id && (
                      <button
                        onClick={() => handleCommentDelete(comment._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleCommentSubmit}
                className="flex items-center"
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
                >
                  <Send size={24} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
