module.exports = (state, OrderId, orderNum, couponCode, discountAmount) => {
  return {
    coupon_code: couponCode,
    data: {
      state,
      discount_amount: discountAmount,
      OrderId,
      order_num: orderNum,
    },
  };
};
