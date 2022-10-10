const express = require("express");
const router = express();
const couponController = require("../controllers/coupon");

router.post("/", couponController.createCoupon);
router.get("/statistics", couponController.couponStatistics);
router.get("/:couponCode", couponController.findCoupon);
router.get("/", couponController.findCoupons);
router.patch("/", couponController.updateCoupon);
router.delete("/:couponCode", couponController.deleteCoupon);

/**
 * @swagger
 * paths:
 *   /api/coupons:
 *    post:
 *      summary:  "쿠폰 생성"
 *      description: "쿠폰을 생성합니다."
 *      tags: [Coupon]
 *      parameters :
 *         - in : body
 *           name : data
 *           required : true
 *           description : 생성할 데이터
 *           schema :
 *              type : object
 *              example :
 *                       {
 *                           "CouponTypeId" : 5,
 *                           "state" : "미사용"
 *                       }
 *      responses:
 *        "201":
 *          description: "생성된 쿠폰 객체를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                           {
 *                               "id": 11,
 *                               "coupon_code": "663a0a5c-fc99-457f-9f40-52bedd838a4b",
 *                               "CouponTypeId": 5,
 *                               "state": "미사용",
 *                               "updatedAt": "2022-10-10T06:19:44.706Z",
 *                               "createdAt": "2022-10-10T06:19:44.706Z"
 *                           }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/coupons/:couponCode:
 *    get:
 *      summary:  "쿠폰 조회"
 *      description: "쿠폰 코드를 사용해 해당 쿠폰을 조회합니다."
 *      tags: [Coupon]
 *      parameters :
 *         - in : path
 *           name : couponCode
 *           required : true
 *           description : 쿠폰 코드
 *           schema :
 *              type : uuid
 *      responses:
 *        "200":
 *          description: "쿠폰 코드에 해당하는 쿠폰 객체를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                           {
 *                               "id": 11,
 *                               "coupon_code": "663a0a5c-fc99-457f-9f40-52bedd838a4b",
 *                               "state": "미사용",
 *                               "discount_amount": null,
 *                               "order_num": null,
 *                               "createdAt": "2022-10-10T06:19:44.000Z",
 *                               "updatedAt": "2022-10-10T06:19:44.000Z",
 *                               "OrderId": null,
 *                               "CouponTypeId": 5,
 *                               "CouponType": {
 *                                   "type": "정액 할인"
 *                               }
 *                           }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/coupons:
 *    get:
 *      summary:  "쿠폰 전체 조회"
 *      description: "생성된 쿠폰 전체를 조회합니다."
 *      tags: [Coupon]
 *      responses:
 *        "200":
 *          description: "생성된 쿠폰 전체를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : array
 *                  example:
 *                           [
 *                               {
 *                                   "id": 2,
 *                                   "coupon_code": "7b310af8-b06a-474f-be6f-f9e7a9a4019d",
 *                                   "state": "사용완료",
 *                                   "discount_amount": "4262",
 *                                   "order_num": "8d7a344c-cc35-4c80-ba23-7cab7f5cbd84",
 *                                   "CouponTypeId": 4,
 *                                   "CouponType": {
 *                                       "type": "% 할인"
 *                                   }
 *                               },
 *                               {
 *                                   "id": 4,
 *                                   "coupon_code": "37e0058c-83d8-4d3c-a18f-46c505e6b0ff",
 *                                   "state": "사용완료",
 *                                   "discount_amount": "10000",
 *                                   "order_num": "12822e18-fddd-4725-8e90-802fda7edfa4",
 *                                   "CouponTypeId": 5,
 *                                   "CouponType": {
 *                                       "type": "정액 할인"
 *                                   }
 *                               },
 *                           ]
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/coupons:
 *    patch:
 *      summary:  "쿠폰 수정"
 *      description: "쿠폰 코드에 해당하는 쿠폰의 데이터를 수정합니다."
 *      tags: [Coupon]
 *      parameters :
 *         - in : body
 *           name : data
 *           required : true
 *           description : 수정할 데이터
 *           schema :
 *              type : object
 *              example :
 *                       {
 *                           "state": "사용완료",
 *                           "couponCode":"7b9d046c-9963-45ff-a19a-79b099a27c8c"
 *                       }
 *      responses:
 *        "200":
 *          description: "쿠폰 정보 수정완료."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                           {
 *                               "message": "쿠폰 정보 수정 완료"
 *                           }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/coupons/:couponCode:
 *    delete:
 *      summary:  "쿠폰 삭제"
 *      description: "해당 쿠폰 코드에 해당하는 쿠폰을 삭제합니다."
 *      tags: [Coupon]
 *      parameters :
 *         - in : path
 *           name : couponCode
 *           required : true
 *           description : 쿠폰 코드
 *           schema :
 *              type : uuid
 *      responses:
 *        "200":
 *          description: "쿠폰 삭제 완료"
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                          {
 *                              "message": "쿠폰 삭제 완료"
 *                          }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/coupons/statistics:
 *    get:
 *      summary:  "쿠폰 사용 통계"
 *      description: "쿠폰 타입 당 총 할인액 및 쿠폰 사용 횟수를 조회합니다."
 *      tags: [Coupon]
 *      responses:
 *        "200":
 *          description: "쿠폰 타입 당 총 할인액 및 쿠폰 사용 횟수를반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : array
 *                  example:
 *                           [
 *                               {
 *                                   "CouponTypeId": 4,
 *                                   "state": "사용완료",
 *                                   "totalDiscount": 7987,
 *                                   "count": 2,
 *                                   "CouponType": {
 *                                       "type": "% 할인"
 *                                   }
 *                               },
 *                               {
 *                                   "CouponTypeId": 5,
 *                                   "state": "사용완료",
 *                                   "totalDiscount": 20000,
 *                                   "count": 2,
 *                                   "CouponType": {
 *                                       "type": "정액 할인"
 *                                   }
 *                               },
 *                               {
 *                                   "CouponTypeId": 6,
 *                                   "state": "사용완료",
 *                                   "totalDiscount": 6000,
 *                                   "count": 2,
 *                                   "CouponType": {
 *                                       "type": "배송비 할인"
 *                                   }
 *                               }
 *                           ]
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

module.exports = router;
