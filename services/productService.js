const Products = require(`../model/productModel`),
  { uploadMixOfImages } = require("../middleware/uploadimageMiddleware");
(sharp = require("sharp")),
  ({ v4: uuidv4 } = require("uuid")),
  (handlersFactory = require("./handlersFactory")),
  (asynchandler = require("express-async-handler"));

exports.uploadProductImage = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);
exports.resizeImages = asynchandler(async (req, res, next) => {
  //1-image cover processing
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    //save image in db
    req.body.imageCover = imageCoverFileName;
  }

  //--------------------------//
  //2-images processing
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imageName}`);

        //save image in db
        req.body.images.push(imageName);
      })
    );
    next();
  }
});
//get all product
exports.getProducts = handlersFactory.getAll(Products, "products");

//create product
exports.createProduct = handlersFactory.createOne(Products);

//get one product by id
exports.getProduct = handlersFactory.getOne(Products);

//update product
exports.updateProduct = handlersFactory.ubdateOne(Products);

//delete product
exports.deleteProduct = handlersFactory.deleteOne(Products);
