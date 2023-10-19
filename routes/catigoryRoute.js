const express = require("express"),
  router = express.Router();

const {
  getCategories,
  getCategory,
  createGategory,
  updatecategory,
  deletecategory,
  uploadCategoryImage,
  resizeImage,
} = require("../services/catigory");

const {
  getGategoryValidator,
  createGategoryValidator,
  updateGategoryValidator,
  deleteGategoryValidator,
} = require("../utils/validators/categoryValidator.js");

// this route is used to get subCategories for a specific category
const subCategoriesRoute = require("./subCatigoryRoute");
router.use("/:categoryId/subcategories", subCategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeImage,
    createGategoryValidator,
    createGategory
  );

router
  .route("/:id")
  .get(getGategoryValidator, getCategory)
  .put(
    uploadCategoryImage,
    resizeImage,
    updateGategoryValidator,
    updatecategory
  )
  .delete(deleteGategoryValidator, deletecategory);

module.exports = router;
