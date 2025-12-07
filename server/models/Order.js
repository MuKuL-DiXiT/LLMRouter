import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  amount: Number,
  status: String,
  createdDate: Date,
  items: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
