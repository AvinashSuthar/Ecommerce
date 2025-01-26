const Product = require("../model/product");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature1 = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature1.query;

  let filteredProductsCount = products.length;
  const apiFeature2 = new ApiFeatures(Product.find(), req.query);

  apiFeature2.search().filter().pagination(resultPerPage);

  products = await apiFeature2.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});
// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Review Routes

// create a review or update a review
exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
    const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find((rev) => {
    if (rev.user.toString() === req.user.id.toString()) {
      return true;
    }
  });
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  product.rating = totalRating / product.numberOfReviews;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// get all reviews
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  console.log(reviews);
  let totalRating = 0;
  reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  const numberOfReviews = reviews.length;
  const rating = totalRating / product.numberOfReviews;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numberOfReviews,
      rating,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
  });
});
