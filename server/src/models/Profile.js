const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
  name: String,
  tagline: String,
  bio: String,
  contact: { email: String },
  social: {
    linkedin: String,
    github: String,
    youtube: String,
    instagram: String,
    facebook: String
  },
  profileImage: String,  
  resumeFile: String     
}, { timestamps: true });

module.exports = model('Profile', ProfileSchema);
