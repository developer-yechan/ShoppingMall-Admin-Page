const createOrderDao = require("../dao/createOrderDao");
const orderRepo = require("../repos/order");
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
  let finalPrice = price;
  if (coupon_id) {
  }
  if (buyr_country !== "KR") {
  }
  const order = orderRepo.createOrder(
    await createOrderDao(
      pay_state,
      quantity,
      finalPrice,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name
    )
  );
  return order;
};
