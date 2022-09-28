const express = require("express");
const router = express();
const couponController = require("../controllers/coupon");

router.post("/", couponController.createCoupon);
router.get("/:couponCode", couponController.findCoupon);
router.get("/", couponController.findCoupons);
router.patch("/", couponController.updateCoupon);
router.delete("/:couponCode", couponController.deleteCoupon);

module.exports = router;
