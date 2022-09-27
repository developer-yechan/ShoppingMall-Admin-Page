const createCouponDao = require("../dao/createCouponDao");
const couponRepo = require("../repos/coupon");

const createCoupon = async (CouponTypeId, state, discount) => {
  const coupon = await couponRepo.createCoupon(
    createCouponDao(CouponTypeId, state, discount)
  );
  return coupon;
};

const findCoupon = async (couponCode) => {
  const coupon = await couponRepo.findCoupon(couponCode);
  return coupon;
};

const findCoupons = async () => {};

const updateCoupon = async () => {};

const deleteCoupon = async () => {};

module.exports = { createCoupon, findCoupon };
