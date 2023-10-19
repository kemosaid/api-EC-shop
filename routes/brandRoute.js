const express = require("express"),
  router = express.Router(),
  brandVallidator = require("../utils/validators/brandValidator"),
  brandService = require("../services/brandService");
// const { validationResult}=require('express-validator');

router.get("/", brandService.getBrands);
router.post(
  "/",
  brandService.uploadBrandImage,
  brandService.resizeImage,
  brandVallidator.createBrandValidator,
  brandService.createBrands
);
router.get("/:id", brandVallidator.getBrandValidator, brandService.getBrand);
router.put(
  "/:id",
  brandService.uploadBrandImage,
  brandService.resizeImage,
  brandVallidator.updateBrandValidator,
  brandService.updateBrand
);
router.delete(
  "/:id",
  brandVallidator.deleteBrandValidator,
  brandService.deleteBrand
);

module.exports = router;
