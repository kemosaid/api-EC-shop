const { check, body } = require("express-validator"),
  slugify = require("slugify"),
  validatorMiddleware = require("../../middleware/validatorMiddleware");
//get specific subCeategory validator
exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  validatorMiddleware,
];

//craete subCeategory validator
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid category id"),
  validatorMiddleware,
];

//update subCeategory validator
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

//delete subCeategory validator
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
