const Sequelize = require("sequelize");

module.exports = class Coupon extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        coupon_id: {
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
          type: Sequelize.ENUM("사용 대기", "사용 완료", "사용 취소"),
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
