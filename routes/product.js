const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/product");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

router.route("/review").put(isAuthenticated , createReview);
router.route("/reviews").get(getAllReviews).delete(isAuthenticated, deleteReview);

module.exports = router;
