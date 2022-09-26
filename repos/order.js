const { Order } = require("../database/models");

const createOrder = async (createOrderDao) => {
  const order = await Order.create(createOrderDao);
  return order;
};

const updateOrder = async (updateOrderDao) => {
  const order = await Order.update(updateOrderDao.data, {
    where: updateOrderDao.order_num,
  });
  return order;
};

module.exports = { createOrder, updateOrder };
