const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];

const Coupon = require("./coupon");
const Order = require("./order");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Order = Order;
db.Coupon = Coupon;

Order.init(sequelize);
Coupon.init(sequelize);

Order.associate(db);
Coupon.associate(db);

module.exports = db;
