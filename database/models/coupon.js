const Sequelize = require("sequelize");

module.exports = class Coupon extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        coupon_code: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
        },
        type: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        state: {
          type: Sequelize.ENUM("미사용", "사용완료", "사용취소"),
          defaultValue: "미사용",
          allowNull: false,
        },
        discount: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Coupon",
        tableName: "coupons",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Coupon.belongsTo(db.Order);
  }
};
