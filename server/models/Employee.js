import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
  joinDate: Date,
  email: String
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
