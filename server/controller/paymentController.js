import User from "../models/userSchema.js";
import AppError from "../utils/error.utils.js";

const getRazorpayApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: " Razorpay Api Key",
    key: process.env.RAZORPAY_KEY_ID,
  });
};

const buySubscription = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("unauthenticated, please login again.", 403));
  }

  if (user.role === "ADMIN") {
    return next(new AppError("Admin can't buy courses", 403));
  }
};

const verifySubscription = async (req, res, next) => {};

const cancelSubscription = async (req, res, next) => {};

const allPayments = async (req, res, next) => {};
export {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
};
