const { v4: uuidv4 } = require("uuid");

module.exports = (order_num, delivery_state) => {
  return {
    order_num: {
      order_num,
    },
    data: {
      delivery_state,
      delivery_num: uuidv4(),
    },
  };
};
