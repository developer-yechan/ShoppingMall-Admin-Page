import { describe, expect, test } from "@jest/globals";
import * as couponService from "../services/coupon";
import * as couponRepo from "../repos/coupon";
import * as createCouponDao from "../dao/createCouponDao";
import * as updateCouponDao from "../dao/updateCouponDao";

jest.mock("../repos/coupon");
jest.mock("../dao/createCouponDao");
jest.mock("../dao/updateCouponDao");

beforeAll(async () => {
  let couponArray = [];
  createCouponDao.mockImplementation((couponTypeId, state) => {
    return { coupon_code: couponArray.length + 1, couponTypeId, state };
  });
  updateCouponDao.mockImplementation(
    (state, orderId, orderNum, couponCode, discountAmount) => {
      return { couponCode, data: { state, orderId, orderNum, discountAmount } };
    }
  );
  couponRepo.createCoupon.mockImplementation((createCouponDao) => {
    couponArray.push(createCouponDao);
    return couponArray[couponArray.length - 1];
  });
  couponRepo.findCoupons.mockImplementation(() => {
    return couponArray;
  });
  couponRepo.findCoupon.mockImplementation((couponCode) => {
    const targetCoupon = couponArray.find(
      (coupon) => coupon.coupon_code === couponCode
    );
    return targetCoupon;
  });

  couponRepo.updateCoupon.mockImplementation((updateCouponDao) => {
    const targetCoupon = couponArray.find(
      (coupon) => coupon.coupon_code === updateCouponDao.couponCode
    );
    targetCoupon.state = updateCouponDao.data.state;
    targetCoupon.discountAmount = updateCouponDao.data.discountAmount;
    targetCoupon.orderId = updateCouponDao.data.orderId;
    targetCoupon.orderNum = updateCouponDao.data.orderNum;
    return targetCoupon;
  });

  couponRepo.deleteCoupon.mockImplementation((couponCode) => {
    couponArray = couponArray.filter(
      (coupon) => coupon.coupon_code !== couponCode
    );
    return couponArray;
  });
  await couponService.createCoupon(2, "사용");
});

describe("create coupon", () => {
  test("create a coupon", async () => {
    const beforeCreate = (await couponService.findCoupons()).length;
    await couponService.createCoupon(1, "미사용");
    const afterCreate = (await couponService.findCoupons()).length;
    expect(couponRepo.createCoupon).toBeCalledTimes(2);
    expect(afterCreate).toBeGreaterThan(beforeCreate);
  });
});

describe("find All coupons", () => {
  test("return coupon Array", async () => {
    const findCoupons = await couponService.findCoupons();
    expect(couponRepo.findCoupons).toBeCalledTimes(3);
    expect(findCoupons).toEqual([
      {
        coupon_code: 1,
        couponTypeId: 2,
        state: "사용",
      },
      {
        coupon_code: 2,
        couponTypeId: 1,
        state: "미사용",
      },
    ]);
  });
});

describe("find one coupon", () => {
  test("return a coupon object", async () => {
    const findCoupon = await couponService.findCoupon(1);
    expect(couponRepo.findCoupon).toBeCalledTimes(1);
    expect(findCoupon).toEqual({
      coupon_code: 1,
      couponTypeId: 2,
      state: "사용",
    });
  });

  test("return undefined", async () => {
    const findCoupon = await couponService.findCoupon(3);
    expect(findCoupon).toBeUndefined();
  });
});

describe("update coupon", () => {
  test("update a coupon", async () => {
    const coupon = await couponService.updateCoupon(
      "사용완료",
      1,
      "abc",
      2,
      3000
    );
    expect(couponRepo.updateCoupon).toBeCalledTimes(1);
    expect(coupon).toEqual({
      coupon_code: 2,
      couponTypeId: 1,
      state: "사용완료",
      discountAmount: 3000,
      orderId: 1,
      orderNum: "abc",
    });
  });
});

describe("delete coupon", () => {
  test("delete one coupon", async () => {
    const couponArray = await couponService.deleteCoupon(2);
    const afterCoupons = await couponService.findCoupons();
    expect(couponRepo.deleteCoupon).toBeCalledTimes(1);
    expect(couponArray).toEqual([
      {
        coupon_code: 1,
        couponTypeId: 2,
        state: "사용",
      },
    ]);
  });
});
