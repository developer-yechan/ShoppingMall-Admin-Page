const createOrderDao = require("../dao/createOrderDao");
const updateOrderDao = require("../dao/updateOrderDao");
const orderRepo = require("../repos/order");
const couponRepo = require("../repos/coupon");
const { getCountry, getPrice } = require("../utils/xlsx");
const queryBuilder = require("../utils/queryBuilder");
const getExchangePrice = require("../utils/getExchangePrice");
const { getDiscountedPrice } = require("../utils/discount");
const updateCouponDao = require("../dao/updateCouponDao");

const createOrder = async (
  pay_state,
  quantity,
  buyr_city,
  buyr_country,
  buyr_zipx,
  buyr_name,
  coupon_code
) => {
  const country = getCountry(buyr_country);
  let price = getPrice(country, quantity);
  let priceObject = {};
  if (buyr_country !== "KR" && !coupon_code) {
    price = await getExchangePrice(price);
  }
  if (coupon_code) {
    const coupon = await couponRepo.findCoupon(coupon_code);
    priceObject = await getDiscountedPrice(price, coupon, buyr_country);
    price = priceObject.discountedPrice;
  }
  const order = await orderRepo.createOrder(
    createOrderDao(
      pay_state,
      quantity,
      price,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name
    )
  );

  if (coupon_code) {
    const state = "사용완료";
    const discountAmount = priceObject.discountPrice;
    const orderId = order.id;
    const orderNum = order.order_num;
    const couponCode = coupon_code;
    await couponRepo.updateCoupon(
      updateCouponDao(state, orderId, orderNum, couponCode, discountAmount)
    );
  }

  return order;
};

const findOrder = async (order_num) => {
  const order = await orderRepo.findOrder(order_num);
  return order;
};

const findOrders = async (name, state, start_date, end_date) => {
  const query = queryBuilder(name, state, start_date, end_date);
  const orders = await orderRepo.findOrders(query);
  return orders;
};

const updateOrder = async (
  order_num,
  delivery_state,
  pay_state,
  buyr_city,
  buyr_country,
  buyr_zipx,
  buyr_name
) => {
  const isExistingOrder = await orderRepo.findOrder(order_num);
  if (!isExistingOrder) {
    throw new Error("이미 취소된 주문입니다.");
  }
  const order = await orderRepo.updateOrder(
    updateOrderDao(
      order_num,
      delivery_state,
      pay_state,
      buyr_city,
      buyr_country,
      buyr_zipx,
      buyr_name
    )
  );
  return order;
};

const deleteOrder = async (order_num) => {
  const isExistingOrder = await orderRepo.findOrder(order_num);
  if (!isExistingOrder) {
    throw new Error("이미 취소된 주문입니다.");
  }
  await orderRepo.deleteOrder(order_num);
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  findOrder,
  findOrders,
};
