const orderService = require("../services/order");
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
    const order = await orderService.createOrder(
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

const updateOrder = async (req, res, next) => {
  try {
    const { order_num, delivery_state } = req.body;
    const order = await orderService.updateOrder(order_num, delivery_state);
    return res.status(200).json({ message: "주문 배송 상태 수정 완료" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, updateOrder };
