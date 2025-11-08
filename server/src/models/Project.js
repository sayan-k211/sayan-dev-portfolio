const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  technologies: { type: [String], default: [] },
  description:  { type: String, default: '' },
  imageUrl:     { type: String, default: '' },
  link:         { type: String, default: '' },
  github:       { type: String, default: '' },    
  featured:     { type: Boolean, default: true },  
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
