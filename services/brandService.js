const Brands = require(`../model/brandmodel`),
  handlersFactory = require("./handlersFactory"),
  sharp = require("sharp"),
  { v4: uuidv4 } = require("uuid"),
  { uploadSingleImage } = require("../middleware/uploadimageMiddleware"),
  asynchandler = require("express-async-handler");

//upload image
exports.uploadBrandImage = uploadSingleImage("img");

//image processing
exports.resizeImage = asynchandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  //save image in db
  req.body.img = filename;
  next();
});
//get all Brands
exports.getBrands = handlersFactory.getAll(Brands);

//create brands
exports.createBrands = handlersFactory.createOne(Brands);

//get one brands by id
exports.getBrand = handlersFactory.getOne(Brands);

//update brand
exports.updateBrand = handlersFactory.ubdateOne(Brands);
//delete brand
exports.deleteBrand = handlersFactory.deleteOne(Brands);
