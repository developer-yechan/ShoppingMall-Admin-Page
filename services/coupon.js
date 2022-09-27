const createCouponDao = require("../dao/createCouponDao");
const couponRepo = require("../repos/coupon");

const createCoupon = async (type, state, discount) => {
  const coupon = couponRepo.createCoupon(
    createCouponDao(type, state, discount)
  );
  return coupon;
};

const findCoupon = async () => {};

const findCoupons = async () => {};

const updateCoupon = async () => {};

const deleteCoupon = async () => {};

module.exports = { createCoupon };
