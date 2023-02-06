import request from "@/request/index";

interface createOrderData {
  cny_amount: object;
  bank_name: string;
  bank_account: string;
  bank_user_name: string;
}

/**
 * 创建订单
 * @param data
 * @returns
 */
const createOrder = async (data: createOrderData) => {
  return request({
    url: "/admin/order/post",
    method: "post",
    data
  });
};

/**
 * 获取订单
 * @param order_no 订单号
 * @returns
 */
const getOrder = async (order_no: string) => {
  return request({
    url: `/admin/order/get?order_no=${order_no}`,
    method: "get"
  });
};

/**
 * 获取汇率
 * @returns
 */
const getRate = async (token: string = "trx") => {
  return request({
    url: `/admin/order/price?token=${token}`,
    method: "get"
  });
};

export default {
  createOrder,
  getOrder,
  getRate
};
