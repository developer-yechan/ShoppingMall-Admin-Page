module.exports = (state, OrderId, couponCode) => {
  return {
    coupon_code: couponCode,
    data: {
      state,
      OrderId,
    },
  };
};
