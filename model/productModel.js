const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "product title can`t be empty"],
      minlength: [3, "too short title"],
      maxlength: [100, "too short title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, `product description must be written`],
      minlength: [20, "too short description"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, `product price can't be empty`],
      trim: true,
      max: 200000,
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: { type: String, required: true },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: [{ type: mongoose.Schema.ObjectId, ref: "SubCategory" }],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingAverage: {
      type: Number,
      min: [1, `rating must be above 1`],
      max: [5, `rating must be below 5`],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});

const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imgUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imgUrl;
  }
  if (doc.images) {
    const imageList = [];
    doc.images.forEach((image) => {
      const imgUrl = `${process.env.BASE_URL}/products/${image}`;
      imageList.push(imgUrl);
    });
    doc.images = imageList;
  }
};
productSchema.post("init", (doc) => {
  setImageUrl(doc);
});
productSchema.post("save", (doc) => {
  setImageUrl(doc);
});
module.exports = mongoose.model("Product", productSchema);
