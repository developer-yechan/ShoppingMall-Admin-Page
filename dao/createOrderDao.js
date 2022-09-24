const { v4: uuidv4 } = require("uuid");

module.exports = (
  pay_state,
  quantity,
  price,
  buyr_city,
  buyr_country,
  buyr_zipx,
  buyr_name
) => {
  return {
    order_num: uuidv4(),
    pay_state,
    quantity,
    price,
    buyr_city,
    buyr_country,
    buyr_zipx,
    buyr_name,
  };
};
