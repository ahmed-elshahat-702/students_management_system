const mongoose = require("mongoose");
const moderatorSchema = new mongoose.Schema({
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
});

module.exports =
  mongoose.models.moderator || mongoose.model("moderator", moderatorSchema);
