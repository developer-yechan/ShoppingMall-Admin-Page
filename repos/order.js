const { Order } = require("../database/models");

const createOrder = async (createOrderDao) => {
  const order = await Order.create(createOrderDao);
  return order;
};

const findOrder = async (order_num) => {
  const order = await Order.findOne({
    attributes: [
      ["createdAt", "date"],
      "order_num",
      "pay_state",
      "delivery_state",
      "quantity",
      "price",
      "buyr_city",
      "buyr_country",
      "buyr_zipx",
      "buyr_name",
      "delivery_num",
    ],
    where: {
      order_num,
    },
  });
  return order;
};

const findOrders = async (query) => {
  const orders = await Order.findAll(query);
  return orders;
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

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  findOrder,
  findOrders,
};
