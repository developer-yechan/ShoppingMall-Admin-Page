const { Coupon } = require("../database/models");

const createCoupon = async (createCouponDao) => {
  const coupon = await Coupon.create(createCouponDao);
  return coupon;
};

const findCoupon = async () => {};

const findCoupons = async () => {};

const updateCoupon = async () => {};

const deleteCoupon = async () => {};

module.exports = { createCoupon };
