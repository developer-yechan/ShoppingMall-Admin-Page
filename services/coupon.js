const createCouponDao = require("../dao/createCouponDao");
const updateCouponDao = require("../dao/updateCouponDao");
const couponRepo = require("../repos/coupon");

const createCoupon = async (CouponTypeId, state) => {
  const coupon = await couponRepo.createCoupon(
    createCouponDao(CouponTypeId, state)
  );
  return coupon;
};

const findCoupon = async (couponCode) => {
  const coupon = await couponRepo.findCoupon(couponCode);
  return coupon;
};

const findCoupons = async () => {
  const coupons = await couponRepo.findCoupons();
  return coupons;
};

const updateCoupon = async (
  state,
  OrderId,
  orderNum,
  couponCode,
  discountAmount
) => {
  const isExistingCoupon = await couponRepo.findCoupon(couponCode);
  if (!isExistingCoupon) {
    throw new Error("존재하지 않는 쿠폰입니다.");
  }
  const coupon = await couponRepo.updateCoupon(
    updateCouponDao(state, OrderId, orderNum, couponCode, discountAmount)
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

const couponStatistics = async () => {
  const coupons = await couponRepo.couponStatistics();
  return coupons;
};

module.exports = {
  createCoupon,
  findCoupon,
  findCoupons,
  updateCoupon,
  deleteCoupon,
  couponStatistics,
};
