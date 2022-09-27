const express = require("express");
const router = express();
const couponController = require("../controllers/coupon");

router.post("/", couponController.createCoupon);

module.exports = router;
