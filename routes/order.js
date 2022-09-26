const express = require("express");
const router = express();
const orderController = require("../controllers/order");

router.post("/", orderController.createOrder);
router.patch("/", orderController.updateOrder);
router.delete("/:order_num", orderController.deleteOrder);
router.get("/:order_num", orderController.findOrder);
router.get("/", orderController.findOrders);

module.exports = router;
