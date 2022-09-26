const { Order } = require("../database/models");

const createOrder = async (createOrderDao) => {
  const order = await Order.create(createOrderDao);
  return order;
};

const findOrder = async (order_num) => {
  const order = await Order.findOne({
    attributes: {
      exclude: ["deletedAt"],
    },
    where: {
      order_num,
    },
  });
  return order;
};

const findOrders = async (order_num) => {
  const order = await orderRepo.findOrder(order_num);
  return order;
};

const updateOrder = async (updateOrderDao) => {
  const order = await Order.update(updateOrderDao.data, {
    where: updateOrderDao.order_num,
  });
  return order;
};

const deleteOrder = async (order_num) => {
  await Order.destroy({
    where: {
      order_num,
    },
  });
};

module.exports = { createOrder, updateOrder, deleteOrder, findOrder };
