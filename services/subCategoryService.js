const SubCategory = require(`../model/subCategoryModel`),
  slugify = require("slugify"),
  apiFeatures = require("../utils/apiFeatures"),
  ApiError = require("../utils/Apierror"),
  handlersFactory = require("./handlersFactory"),
  asynchandler = require("express-async-handler");

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
//create subgategories
exports.createSubGategory = handlersFactory.createOne(SubCategory);

//get all subgategories
exports.getSubCategories = handlersFactory.getAll(SubCategory);

//get one subgategory by id
exports.SubgetCategory = handlersFactory.getOne(SubCategory);

//update subCategory
exports.updateSubCategory = handlersFactory.ubdateOne(SubCategory);

//delete subCategory
exports.deleteSubCategory = handlersFactory.deleteOne(SubCategory);
