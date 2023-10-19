const mongoose = require("mongoose");
const categoryschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    img: { type: String },
  },
  { timestamps: true }
);
const setImageUrl = (doc) => {
  if (doc.img) {
    const imgUrl = `${process.env.BASE_URL}/categories/${doc.img}`;
    doc.img = imgUrl;
  }
};
categoryschema.post("init", (doc) => {
  setImageUrl(doc);
});
categoryschema.post("save", (doc) => {
  setImageUrl(doc);
});
module.exports = mongoose.model("Category", categoryschema);
