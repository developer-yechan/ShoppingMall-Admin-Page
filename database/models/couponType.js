const Sequelize = require("sequelize");

module.exports = class CouponType extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        discount: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "CouponType",
        tableName: "couponTypes",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.CouponType.hasMany(db.Coupon);
  }
};
