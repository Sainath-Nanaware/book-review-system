const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "author", "genre"],
      default: "user",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
