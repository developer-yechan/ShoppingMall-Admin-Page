const express = require("express");
const router = express();
const orderRouter = require("./order");
const couponRouter = require("./coupon");

router.use("/api/order", orderRouter);
router.use("/api/coupon", couponRouter);

module.exports = router;
