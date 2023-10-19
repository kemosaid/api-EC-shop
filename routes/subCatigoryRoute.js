const express = require("express");
// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });
const {
  createSubGategory,
  getSubCategories,
  SubgetCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubGategory)
  .get(createFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, SubgetCategory)
  .put(updateCategoryValidator, updateSubCategory)
  .delete(deleteCategoryValidator, deleteSubCategory);

module.exports = router;
