const express = require("express");
const router = express();
const orderRouter = require("./order");
const couponRouter = require("./coupon");

router.use("/api/orders", orderRouter);
router.use("/api/coupons", couponRouter);

module.exports = router;
