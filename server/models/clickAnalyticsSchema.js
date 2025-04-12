// models/ClickAnalytics.js
const mongoose = require('mongoose');
const { type } = require('os');

const clickAnalyticsSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShortLink',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ip: String,
  deviceType: String,
  browser: String,
  location: String,
});

module.exports = mongoose.model('ClickAnalytics', clickAnalyticsSchema);