// models/ShortLink.js
const mongoose = require('mongoose');

const shortLinkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  customAlias: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  totalClicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('ShortLink', shortLinkSchema);
