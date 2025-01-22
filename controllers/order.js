const Order = require("../model/order");
const Product = require("../model/product");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name  email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found"), 404);
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// my orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// get all order -- admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name  email");
  if (!orders) {
    return next(new ErrorHandler("Order not found"), 404);
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order -- admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found"), 404);
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order is Delivered"), 400);
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  order.orderStatus = req.body.status;

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
});

//delete order -- admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});

// updateStock function
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
