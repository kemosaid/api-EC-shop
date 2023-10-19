const Category = require(`../model/category.model`),
  sharp = require("sharp"),
  asyncHandler = require("express-async-handler"),
  { v4: uuidv4 } = require("uuid"),
  { uploadSingleImage } = require("../middleware/uploadimageMiddleware"),
  handlersFactory = require("./handlersFactory");

//upload image
exports.uploadCategoryImage = uploadSingleImage("img");

//image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  //save image in db
  req.body.img = filename;
  next();
});
//get all gategories
exports.getCategories = handlersFactory.getAll(Category);
//create gategory
exports.createGategory = handlersFactory.createOne(Category);

//get one gategory by id
exports.getCategory = handlersFactory.getOne(Category);

//update category
exports.updatecategory = handlersFactory.ubdateOne(Category);

//deletecategory
exports.deletecategory = handlersFactory.deleteOne(Category);
