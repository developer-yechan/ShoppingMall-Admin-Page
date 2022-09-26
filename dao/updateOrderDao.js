const { v4: uuidv4 } = require("uuid");

module.exports = (
  order_num,
  delivery_state,
  pay_state,
  buyr_city,
  buyr_country,
  buyr_zipx,
  buyr_name
) => {
  if (delivery_state !== "배송대기") {
    return {
      order_num: {
        order_num,
      },
      data: {
        delivery_state,
        delivery_num: uuidv4(),
        pay_state,
        buyr_city,
        buyr_country,
        buyr_zipx,
        buyr_name,
      },
    };
  }
  return {
    order_num: {
      order_num,
    },
    data: {
      delivery_state,
      delivery_num: null,
      pay_state,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name,
    },
  };
};
