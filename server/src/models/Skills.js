const { Schema, model } = require('mongoose');

const SkillItem = new Schema({
  name: String,
  level: Number, 
  category: String  
}, { _id: false });

const SkillsSchema = new Schema({
  technical: [SkillItem],
  creative: [SkillItem],
  certifications: [{ name: String, issuer: String, status: String }]
}, { timestamps: true });

module.exports = model('Skills', SkillsSchema);
