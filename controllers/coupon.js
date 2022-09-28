const couponService = require("../services/coupon");

const createCoupon = async (req, res, next) => {
  try {
    const { CouponTypeId, state, discount } = req.body;
    const coupon = await couponService.createCoupon(
      CouponTypeId,
      state,
      discount
    );
    return res.status(201).json(coupon);
  } catch (err) {
    next(err);
  }
};

const findCoupon = async (req, res, next) => {
  try {
    const { couponCode } = req.params;
    const coupon = await couponService.findCoupon(couponCode);
    return res.status(200).json(coupon);
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
    const { state, OrderId, couponCode } = req.body;
    const coupon = await couponService.updateCoupon(state, OrderId, couponCode);
    return res.status(200).json({ message: "쿠폰 정보 수정 완료" });
  } catch (err) {
    next(err);
  }
};

const deleteCoupon = async (req, res, next) => {
  try {
    const { couponCode } = req.params;
    const coupon = await couponService.deleteCoupon(couponCode);
    return res.status(200).json({ message: "쿠폰 삭제 완료" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCoupon,
  findCoupon,
  findCoupons,
  updateCoupon,
  deleteCoupon,
};
