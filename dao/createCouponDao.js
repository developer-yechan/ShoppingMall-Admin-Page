const { v4: uuidv4 } = require("uuid");

module.exports = (CouponTypeId, state) => {
  return {
    coupon_code: uuidv4(),
    CouponTypeId,
    state,
  };
};
