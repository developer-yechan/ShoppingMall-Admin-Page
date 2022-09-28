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

const findCoupons = async () => {
  const coupons = await Coupon.findAll({
    attributes: { exclude: ["OrderId", "createdAt", "updatedAt", "deletedAt"] },
    include: {
      model: CouponType,
      attributes: ["type"],
      required: true,
    },
  });
  return coupons;
};

const updateCoupon = async (updateCouponDao) => {
  const coupon = await Coupon.update(updateCouponDao.data, {
    where: {
      coupon_code: updateCouponDao.coupon_code,
    },
  });
  return coupon;
};

const deleteCoupon = async (coupon_code) => {
  const coupon = await Coupon.destroy({
    where: {
      coupon_code,
    },
  });
  return coupon;
};

module.exports = {
  createCoupon,
  findCoupon,
  findCoupons,
  updateCoupon,
  deleteCoupon,
};
