// src/models/contactUs.js
import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  response: String,
});

export default mongoose.models.ContactUs || mongoose.model('ContactUs', contactUsSchema);
