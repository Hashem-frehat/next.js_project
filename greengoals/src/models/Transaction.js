import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  
  amount: {
    type: Number,
    required: true,
  },

  paymentMethodNonce: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
    type: String,
    default: 'pending',
    enum: ['pending', 'completed', 'failed']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Check if the model already exists before compiling it
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;