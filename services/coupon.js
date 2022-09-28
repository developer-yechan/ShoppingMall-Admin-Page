const createCouponDao = require("../dao/createCouponDao");
const updateCouponDao = require("../dao/updateCouponDao");
const couponRepo = require("../repos/coupon");

const createCoupon = async (CouponTypeId, state, discount) => {
  const coupon = await couponRepo.createCoupon(
    createCouponDao(CouponTypeId, state, discount)
  );
  return coupon;
};

const findCoupon = async (couponCode) => {
  const coupons = await couponRepo.findCoupon(couponCode);
  return coupons;
};

const findCoupons = async () => {
  const coupons = await couponRepo.findCoupons();
  return coupons;
};

const updateCoupon = async (state, OrderId, couponCode) => {
  const isExistingCoupon = await couponRepo.findCoupon(couponCode);
  if (!isExistingCoupon) {
    throw new Error("존재하지 않는 쿠폰입니다.");
  }
  const coupon = await couponRepo.updateCoupon(
    updateCouponDao(state, OrderId, couponCode)
  );
  return coupon;
};

const deleteCoupon = async (couponCode) => {
  const isExistingCoupon = await couponRepo.findCoupon(couponCode);
  if (!isExistingCoupon) {
    throw new Error("존재하지 않는 쿠폰입니다.");
  }
  const coupon = await couponRepo.deleteCoupon(couponCode);
  return coupon;
};

module.exports = {
  createCoupon,
  findCoupon,
  findCoupons,
  updateCoupon,
  deleteCoupon,
};
