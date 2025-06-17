const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    // Foreign key ke user utama
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // pastikan 1 user hanya punya 1 profil
    },

    username: {
      type: String,
      trim: true,
    },

    image_url: {
      type: String,
      default: '',
      trim: true
    },

    date_of_birth: {
      type: Date
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other', ''],
      default: ''
    },

    phone_number: {
      type: String,
      trim: true
    },

    allow_phone_notifications: {
      type: Boolean,
      default: false
    },

    city: {
      type: String,
      trim: true,
      default: ''
    },

    education: {
      type: String,
      trim: true,
      default: ''
    },

    company: {
      type: String,
      trim: true,
      default: ''
    },

    role: {
      type: String,
      trim: true,
      default: ''
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ''
    },

    credit: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UserProfile', userProfileSchema);
