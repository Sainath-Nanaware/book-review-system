const mongoose=require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", bookSchema);
