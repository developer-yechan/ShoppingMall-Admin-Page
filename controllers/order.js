const createOrder = async (req, res, next) => {
  try {
    const {
      pay_state,
      quantity,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name,
      coupon_id,
    } = req.body;
    const order = orderService.createOrder(
      pay_state,
      quantity,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name,
      coupon_id
    );
    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
