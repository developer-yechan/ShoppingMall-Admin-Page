const { v4: uuidv4 } = require("uuid");

module.exports = (type, state, discount) => {
  return {
    coupon_code: uuidv4(),
    type,
    state,
    discount,
  };
};
