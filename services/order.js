const createOrderDao = require("../dao/createOrderDao");
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
  const order = orderRepo.createOrder(
    await createOrderDao(
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

module.exports = { createOrder };
