const express = require("express");
const router = express();
const orderController = require("../controllers/order");

router.post("/", orderController.createOrder);
router.patch("/", orderController.updateOrder);
router.delete("/:order_num", orderController.deleteOrder);
router.get("/:order_num", orderController.findOrder);
router.get("/", orderController.findOrders);

/**
 * @swagger
 * paths:
 *   /api/orders:
 *    post:
 *      summary:  "주문 생성"
 *      description: "주문 생성 시 원-달러 환율 API를 사용해 배송비를 환전하고 쿠폰 타입에 따라 할인을 제공합니다."
 *      tags: [Order]
 *      parameters :
 *         - in : body
 *           name : data
 *           required : true
 *           description : 생성할 데이터
 *           schema :
 *              type : object
 *              example :
 *                       {
 *                           "pay_state" : "결제완료",
 *                           "quantity" : 30,
 *                           "buyr_city" : "베이징",
 *                           "buyr_country" : "CN",
 *                           "buyr_zipx" :  12345,
 *                           "buyr_name" : "민수",
 *                           "coupon_code" : "663a0a5c-fc99-457f-9f40-52bedd838a4b"
 *                       }
 *      responses:
 *        "201":
 *          description: "주문 생성 시 쿠폰을 사용했다면 쿠폰 데이터를 수정하고 생성된 주문 객체를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                           {
 *                               "delivery_state": "배송대기",
 *                               "id": 16,
 *                               "order_num": "ee8815af-d453-40aa-b70a-1784464ed06a",
 *                               "pay_state": "결제완료",
 *                               "quantity": 30,
 *                               "price": "70.63",
 *                               "buyr_city": "베이징",
 *                               "buyr_country": "CN",
 *                               "buyr_zipx": 12345,
 *                               "buyr_name": "민수",
 *                               "updatedAt": "2022-10-10T07:37:12.345Z",
 *                               "createdAt": "2022-10-10T07:37:12.345Z"
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
 *   /api/orders/:order_num:
 *    get:
 *      summary:  "주문 조회"
 *      description: "주문 번호를 사용해 해당 주문을 조회합니다."
 *      tags: [Order]
 *      parameters :
 *         - in : path
 *           name : order_num
 *           required : true
 *           description : 주문번호
 *           schema :
 *              type : uuid
 *      responses:
 *        "200":
 *          description: "주문 번호에 해당하는 주문 객체를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                           {
 *                               "date": "2022-09-26T07:50:31.000Z",
 *                               "order_num": "f238486b-bf39-4dcc-9a96-e3b4c404ee60",
 *                               "pay_state": "결제완료",
 *                               "delivery_state": "배송중",
 *                                "quantity": 2,
 *                               "price": 20.7,
 *                               "buyr_city": "베이징",
 *                               "buyr_country": "CN",
 *                               "buyr_zipx": 12345,
 *                               "buyr_name": "민수",
 *                               "delivery_num": "ddd360de-2b33-41b6-8cdd-84cbfca496b0"
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
 *   /api/orders/?start_date&end_date&name&state:
 *    get:
 *      summary:  "주문 전체 조회"
 *      description: "기간별, 주문 상태별로 필터가 가능하고 주문자 명으로 검색이 가능합니다."
 *      tags: [Order]
 *      parameters :
 *         - in : path
 *           name : start_date
 *           required : false
 *           description : 검색 시작 일자
 *           schema :
 *              type : String
 *         - in : path
 *           name : end_date
 *           required : false
 *           description : 검색 끝 일자
 *           schema :
 *              type : String
 *         - in : path
 *           name : name
 *           required : false
 *           description : 주문자 이름
 *           schema :
 *              type : String
 *         - in : path
 *           name : state
 *           required : false
 *           description : 주문 상태
 *           schema :
 *              type : String
 *      responses:
 *        "200":
 *          description: "조건에 해당하는 주문 객체들을 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : array
 *                  example:
 *                           [
 *                               {
 *                                   "id": 2,
 *                                   "date": "2022-09-26T07:50:31.000Z",
 *                                   "order_num": "f238486b-bf39-4dcc-9a96-e3b4c404ee60",
 *                                   "pay_state": "결제완료",
 *                                   "delivery_state": "배송중",
 *                                   "quantity": 2,
 *                                   "price": 20.7,
 *                                   "buyr_name": "민수",
 *                                   "delivery_num": "ddd360de-2b33-41b6-8cdd-84cbfca496b0"
 *                               },
 *                               {
 *                                   "id": 4,
 *                                   "date": "2022-09-26T08:21:12.000Z",
 *                                   "order_num": "92c81880-3607-4aed-b10e-c042b4da31ef",
 *                                   "pay_state": "결제대기",
 *                                   "delivery_state": "배송대기",
 *                                   "quantity": 3,
 *                                   "price": 45.96,
 *                                   "buyr_name": "민수",
 *                                   "delivery_num": null
 *                               },
 *                               {
 *                                   "id": 6,
 *                                   "date": "2022-09-29T02:03:19.000Z",
 *                                   "order_num": "806e025d-1965-4024-97f9-dadd14d5e768",
 *                                   "pay_state": "결제완료",
 *                                   "delivery_state": "배송대기",
 *                                   "quantity": 2,
 *                                   "price": 26.77,
 *                                   "buyr_name": "민수",
 *                                   "delivery_num": null
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
 *   /api/orders:
 *    patch:
 *      summary:  "주문 수정"
 *      description: "주문 번호에 해당하는 주문의 데이터를 수정합니다. 배송중, 배송완료라면 송장번호가 추가됩니다."
 *      tags: [Order]
 *      parameters :
 *         - in : body
 *           name : data
 *           required : true
 *           description : 수정할 데이터
 *           schema :
 *              type : object
 *              example :
 *                       {
 *                           "order_num" : "c9e390a3-3f98-4f04-9390-8e8efc6208ca",
 *                           "pay_state" : "결제완료",
 *                           "delivery_state" : "배송대기",
 *                           "buyr_city" : "베이징",
 *                           "buyr_country" : "CN",
 *                           "buyr_zipx" :  12345,
 *                           "buyr_name" : "민정"
 *                       }
 *      responses:
 *        "200":
 *          description: "주문 배송 수정 완료"
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                          { message: "주문 배송 상태 수정 완료" }
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
 *   /api/orders/:order_num:
 *    delete:
 *      summary:  "주문 취소"
 *      description: "주문 번호에 해당하는 주문을 취소합니다."
 *      tags: [Order]
 *      parameters :
 *         - in : path
 *           name : order_num
 *           required : true
 *           description : 주문 번호
 *           schema :
 *              type : uuid
 *      responses:
 *        "200":
 *          description: "주문 취소 완료."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                          {
 *                              "message": "주문 취소 완료"
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

module.exports = router;
