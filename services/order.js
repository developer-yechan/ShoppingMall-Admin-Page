const createOrderDao = require("../dao/createOrderDao");
const updateOrderDao = require("../dao/updateOrderDao");
const orderRepo = require("../repos/order");
const { getCountry, getPrice } = require("../utils/xlsx");
const getExchangePrice = require("../utils/getExchangePrice");

const createOrder = async (
  pay_state,
  quantity,
  buyr_city,
  buyr_country,
  buyr_zipx,
  buyr_name,
  coupon_id
) => {
  const country = getCountry(buyr_country);
  let price = getPrice(country, quantity);
  if (buyr_country !== "KR") {
    price = await getExchangePrice(price);
  }
  if (coupon_id) {
  }
  const order = await orderRepo.createOrder(
    createOrderDao(
      pay_state,
      quantity,
      price,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name
    )
  );
  return order;
};

const findOrder = async (order_num) => {
  const order = await orderRepo.findOrder(order_num);
  return order;
};

const findOrders = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (order_num, delivery_state) => {
  const isExistingOrder = await orderRepo.findOrder(order_num);
  if (!isExistingOrder) {
    throw new Error("이미 취소된 주문입니다.");
  }
  const order = await orderRepo.updateOrder(
    updateOrderDao(order_num, delivery_state)
  );
  return order;
};

const deleteOrder = async (order_num) => {
  const isExistingOrder = await orderRepo.findOrder(order_num);
  if (!isExistingOrder) {
    throw new Error("이미 취소된 주문입니다.");
  }
  await orderRepo.deleteOrder(order_num);
};

module.exports = { createOrder, updateOrder, deleteOrder, findOrder };
