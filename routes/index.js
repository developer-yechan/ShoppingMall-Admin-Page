const express = require("express");
const router = express();
const orderRouter = require("./order");

router.use("/order", orderRouter);
module.exports = router;
