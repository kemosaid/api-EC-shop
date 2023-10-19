const express = require("express"),
  router = express.Router(),
  productValidator = require("../utils/validators/productValidator"),
  productService = require("../services/productService");

router.get("/", productService.getProducts);
router.post(
  "/",
  productService.uploadProductImage,
  productService.resizeImages,
  productValidator.createProductValidator,
  productService.createProduct
);
router.get(
  "/:id",
  productValidator.getProductValidator,
  productService.getProduct
);
router.put(
  "/:id",
  productService.uploadProductImage,
  productService.resizeImages,
  productValidator.updateProductValidator,
  productService.updateProduct
);
router.delete(
  "/:id",
  productValidator.deleteProductValidator,
  productService.deleteProduct
);

module.exports = router;
