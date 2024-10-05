const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.teacher || mongoose.model("teacher", teacherSchema);
