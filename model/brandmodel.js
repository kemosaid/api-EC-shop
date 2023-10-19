const mongoose = require("mongoose");
const brandschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
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
    const imgUrl = `${process.env.BASE_URL}/brands/${doc.img}`;
    doc.img = imgUrl;
  }
};
brandschema.post("init", (doc) => {
  setImageUrl(doc);
});
brandschema.post("save", (doc) => {
  setImageUrl(doc);
});
module.exports = mongoose.model("Brand", brandschema);
