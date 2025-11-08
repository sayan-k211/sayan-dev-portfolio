const { Schema, model } = require('mongoose');

const FeaturedVideo = new Schema({
  videoId: String,
  title: String,
  thumbnailUrl: String,
  featured: Boolean
}, { _id: false });

const MediaSchema = new Schema({
  platform: String,          
  channelName: String,
  statistics: {
    subscribers: Number,
    totalViews: Number
  },
  featuredVideos: [FeaturedVideo]
}, { timestamps: true });

module.exports = model('Media', MediaSchema);
