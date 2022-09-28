module.exports = (state, OrderId, couponCode, discountAmount) => {
  return {
    coupon_code: couponCode,
    data: {
      state,
      OrderId,
      discount_amount: discountAmount,
    },
  };
};
