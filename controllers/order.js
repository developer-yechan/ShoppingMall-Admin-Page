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
      coupon_code,
    } = req.body;
    const order = await orderService.createOrder(
      pay_state,
      quantity,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name,
      coupon_code
    );
    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const findOrder = async (req, res, next) => {
  try {
    const { order_num } = req.params;
    const order = await orderService.findOrder(order_num);
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const findOrders = async (req, res, next) => {
  try {
    const { name, state, start_date, end_date } = req.query;
    const orders = await orderService.findOrders(
      name,
      state,
      start_date,
      end_date
    );
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const {
      order_num,
      delivery_state,
      pay_state,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name,
    } = req.body;
    const order = await orderService.updateOrder(
      order_num,
      delivery_state,
      pay_state,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name
    );
    return res.status(200).json({ message: "주문 배송 상태 수정 완료" });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { order_num } = req.params;
    await orderService.deleteOrder(order_num);
    return res.status(200).json({ message: "주문 취소 완료" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  findOrder,
  findOrders,
};
