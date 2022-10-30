const request = require("supertest");
const app = require("../app");
const { Coupon, sequelize } = require("../database/models");
const couponCode = "7b310af8-b06a-474f-be6f-f9e7a9a4019d";

describe("coupon CRUD test", () => {
  test("쿠폰 생성", (done) => {
    request(app)
      .post("/api/coupons")
      .send({
        CouponTypeId: 4,
        state: "미사용",
      })
      .expect((res) => {
        console.log(res.body);
      })
      .expect(201, done);
  });

  test("쿠폰 전체 조회 ", (done) => {
    request(app)
      .get("/api/coupons")
      .expect((res) => {
        console.log(res.body);
      })
      .expect(200, done);
  });

  test("특정 쿠폰 조회", (done) => {
    request(app)
      .get(`/api/coupons/${couponCode}`)
      .expect((res) => {
        console.log(res.body);
      })
      .expect(200, done);
  });

  test("쿠폰 정보 수정", (done) => {
    request(app)
      .patch(`/api/coupons`)
      .send({
        couponCode,
        state: "사용완료",
      })
      .expect((res) => {
        console.log(res.body);
      })
      .expect(200, done);
  });

  test("쿠폰 삭제", (done) => {
    request(app)
      .delete(`/api/coupons/${couponCode}`)
      .expect((res) => {
        console.log(res.body);
      })
      .expect(200, done);
  });
});
