const couponService = require("../services/coupon");

const createCoupon = async (req, res, next) => {
  try {
    const { type, state, discount } = req.body;
    const coupon = await couponService.createCoupon(type, state, discount);
    return res.status(201).json(coupon);
  } catch (err) {
    next(err);
  }
};

const findCoupon = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const findCoupons = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const updateCoupon = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const deleteCoupon = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { createCoupon };
