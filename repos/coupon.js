const { Coupon, CouponType } = require("../database/models");

const createCoupon = async (createCouponDao) => {
  const coupon = await Coupon.create(createCouponDao);
  return coupon;
};

const findCoupon = async (couponCode) => {
  const coupon = await Coupon.findOne({
    attributes: { exclude: ["deletedAt"] },
    include: {
      model: CouponType,
      attributes: ["type"],
      required: true,
    },
    where: {
      coupon_code: couponCode,
    },
  });
  return coupon;
};

const findCoupons = async () => {};

const updateCoupon = async () => {};

const deleteCoupon = async () => {};

module.exports = { createCoupon, findCoupon };
