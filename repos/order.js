const { Order } = require("../database/models");

const createOrder = async (createOrderDao) => {
  const order = await Order.create(createOrderDao);
  return order;
};

module.exports = { createOrder };
