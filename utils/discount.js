const { CouponType, Coupon } = require("../database/models");
const getExchangePrice = require("./getExchangePrice");
const deliveryPriceDiscount = async (price, coupon, buyr_country) => {
  const result = await CouponType.findOne({
    attributes: ["discount"],
    where: {
      type: "배송비 할인",
    },
  });
  let discountedPrice = price - result.discount;
  if (buyr_country !== "KR") {
    discountedPrice = await getExchangePrice(discountedPrice);
  }
  const discountObject = { discountPrice: result.discount, discountedPrice };
  return discountObject;
};

const flatDiscount = async (price, coupon, buyr_country) => {
  const result = await CouponType.findOne({
    attributes: ["description", "discount"],
    where: {
      type: "정액 할인",
    },
  });
  const basePrice = result.description.split("원")[0];
  if (price < basePrice) {
    throw new Error(`${basePrice}원 이상 구매해야 사용할 수 있는 쿠폰입니다.`);
  }
  let discountedPrice = price - result.discount;
  if (buyr_country !== "KR") {
    discountedPrice = await getExchangePrice(discountedPrice);
  }
  const discountObject = { discountPrice: result.discount, discountedPrice };
  return discountObject;
};

const percentDiscount = async (price, coupon, buyr_country) => {
  const result = await CouponType.findOne({
    attributes: ["discount"],
    where: {
      type: "% 할인",
    },
  });
  const percent = result.discount.split("%")[0] * 0.01;
  const discountPrice = price * percent;
  let discountedPrice = price - discountPrice;
  if (buyr_country !== "KR") {
    discountedPrice = await getExchangePrice(discountedPrice);
  }
  const discountObject = { discountPrice, discountedPrice };
  return discountObject;
};

const getDiscountedPrice = async (price, coupon, buyr_country) => {
  if (coupon.state !== "미사용") {
    throw new Error("사용할 수 없는 쿠폰입니다.");
  }
  let discountedPrice = price;
  if (coupon.CouponType.type === "배송비 할인") {
    discountedPrice = await deliveryPriceDiscount(price, buyr_country);
  }
  if (coupon.CouponType.type === "정액 할인") {
    discountedPrice = await flatDiscount(price, buyr_country);
  }
  if (coupon.CouponType.type === "% 할인") {
    discountedPrice = await percentDiscount(price, buyr_country);
  }
  return discountedPrice;
};

module.exports = {
  deliveryPriceDiscount,
  flatDiscount,
  percentDiscount,
  getDiscountedPrice,
};
