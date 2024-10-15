import mongoose, { Schema } from "mongoose";

const ComunitySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  images: [String], // Array of images attached to the post
  tags: [String], // Tags for categorization
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users who liked the post
  comments: [
    {
      author: { type: Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  visibility: {
    type: String,
    enum: ["public", "friends", "private"],
    default: "public",
  },
  category: {
    type: String,
    enum: [
      "sustainability",
      "recycling",
      "environmental protection",
      "eco-friendly",
      "green initiatives",
      "environmental awareness",
      "waste management",
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  reportFlag: {
    isReported: { type: Boolean, default: false },
    reports: [
      {
        reason: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
  },
});

// Check if the model is already defined, if not, create it
const Comunity =
  mongoose.models.Comunity || mongoose.model("Comunity", ComunitySchema);

export default Comunity;
