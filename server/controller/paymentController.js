import { razorpay } from "../index.js";
import Payment from "../models/paymentSchema.js";
import User from "../models/userSchema.js";
import AppError from "../utils/error.utils.js";
import crypto from "crypto";

const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: " Razorpay Api Key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("unauthenticated, please login again.", 403));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin can't buy courses", 403));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      costumer_notify: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "user subscribed successfully!",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("unauthenticated, please login again.", 403));
    }

    const subscriptionId = user.subscription.id;

    //now we create the signature using subscriptionId and razorpay_payment_id and check that razorpay_signature or this generated signature are same or not if it will same then payent will be verify
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not veryfied , Please try again", 400));
    }

    // if generatedSignature and razorpay_signature are same

    await Payment.create({
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    });

    user.subscription.status = "active";
    await user.save();

    res.status(200).json({
      success: true,
      message: "payment veryfied successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("unauthenticated, please login again.", 403));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin can't cancel subscription", 403));
    }
    //  now we get a subscription id from user data and then cancel the subscription

    const subscriptionId = user.subscription.id;
    const cancelSubscription = await razorpay.subscriptions.cancel({
      subscriptionId,
    });

    user.subscription.status = cancelSubscription.status;
    user.save();
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

 const allPayments = async (req, res, _next) => {
  const { count, skip } = req.query;

  // Find all subscriptions from razorpay
  const allPayments = await razorpay.subscriptions.all({
    count: count ? count : 10, // If count is sent then use that else default to 10
    skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
  });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const finalMonths = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  const monthlyWisePayments = allPayments.items.map((payment) => {
    // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
    const monthsInNumbers = new Date(payment.start_at * 1000);

    return monthNames[monthsInNumbers.getMonth()];
  });

  monthlyWisePayments.map((month) => {
    Object.keys(finalMonths).forEach((objMonth) => {
      if (month === objMonth) {
        finalMonths[month] += 1;
      }
    });
  });

  const monthlySalesRecord = [];

  Object.keys(finalMonths).forEach((monthName) => {
    monthlySalesRecord.push(finalMonths[monthName]);
  });

  res.status(200).json({
    success: true,
    message: 'All payments',
    allPayments,
    finalMonths,
    monthlySalesRecord,
  });
};
export {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
};
