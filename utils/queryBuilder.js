const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//주문자명으로 검색 결제 상태, 주문 날짜로 필터

const queryBuilder = (name, state, start_date, end_date) => {
  if (name && state && start_date && end_date) {
    return {
      attributes: [
        "id",
        ["createdAt", "date"],
        "pay_state",
        "delivery_state",
        "quantity",
        "price",
        "buyr_name",
        "delivery_num",
      ],
      where: {
        buyr_name: {
          [Op.like]: `%${name}%`,
        },
        pay_state: `${state}`,
        createdAt: {
          [Op.between]: [`${start_date}`, `${end_date}`],
        },
      },
    };
  }
  if (name && start_date && end_date) {
    return {
      attributes: [
        "id",
        ["createdAt", "date"],
        "pay_state",
        "delivery_state",
        "quantity",
        "price",
        "buyr_name",
        "delivery_num",
      ],
      where: {
        buyr_name: {
          [Op.like]: `%${name}%`,
        },
        createdAt: {
          [Op.between]: [`${start_date}`, `${end_date}`],
        },
      },
    };
  }
  if (state && start_date && end_date) {
    return {
      attributes: [
        "id",
        ["createdAt", "date"],
        "order_num",
        "pay_state",
        "delivery_state",
        "quantity",
        "price",
        "buyr_name",
        "delivery_num",
      ],
      where: {
        pay_state: `${state}`,
        createdAt: {
          [Op.between]: [`${start_date}`, `${end_date}`],
        },
      },
    };
  }
  if (name && state) {
    return {
      attributes: [
        "id",
        ["createdAt", "date"],
        "order_num",
        "pay_state",
        "delivery_state",
        "quantity",
        "price",
        "buyr_name",
        "delivery_num",
      ],
      where: {
        pay_state: `${state}`,
        buyr_name: {
          [Op.like]: `%${name}%`,
        },
      },
    };
  }
  if (name) {
    return {
      attributes: [
        "id",
        ["createdAt", "date"],
        "order_num",
        "pay_state",
        "delivery_state",
        "quantity",
        "price",
        "buyr_name",
        "delivery_num",
      ],
      where: {
        buyr_name: {
          [Op.like]: `%${name}%`,
        },
      },
    };
  }
  if (state) {
    return {
      attributes: [
        "id",
        ["createdAt", "date"],
        "order_num",
        "pay_state",
        "delivery_state",
        "quantity",
        "price",
        "buyr_name",
        "delivery_num",
      ],
      where: {
        pay_state: `${state}`,
      },
    };
  }
  if (start_date && end_date) {
    return {
      attributes: [
        "id",
        ["createdAt", "date"],
        "order_num",
        "pay_state",
        "delivery_state",
        "quantity",
        "price",
        "buyr_name",
        "delivery_num",
      ],
      where: {
        createdAt: {
          [Op.between]: [`${start_date}`, `${end_date}`],
        },
      },
    };
  }
  return {
    attributes: [
      "id",
      ["createdAt", "date"],
      "order_num",
      "pay_state",
      "delivery_state",
      "quantity",
      "price",
      "buyr_name",
      "delivery_num",
    ],
  };
};

module.exports = queryBuilder;
