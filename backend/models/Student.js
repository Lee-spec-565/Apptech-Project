const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    yearLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['enrolled', 'inactive'],
      default: 'enrolled',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
