const Sequelize = require("sequelize");

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        order_num: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
        },
        pay_state: {
          type: Sequelize.ENUM("결제대기", "결제완료", "결제취소"),
          allowNull: false,
        },
        delivery_state: {
          type: Sequelize.ENUM("배송대기", "배송중", "배송완료"),
          defaultValue: "배송대기",
          allowNull: false,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        buyr_city: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        buyr_country: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        buyr_zipx: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        buyr_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        delivery_num: {
          type: Sequelize.UUID,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Order",
        tableName: "orders",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Order.hasMany(db.Coupon);
  }
};
