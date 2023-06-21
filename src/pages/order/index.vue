<template>
  <div class="order-container">
    <div class="order-title">提交成功</div>
    <div>
      <span>钱包地址：</span><span class="wallet-address">{{ walletAddress }}</span> <br /><a @click="handleCopy"
        >点击复制</a
      ><br />
    </div>
    <div class="order-qrcode-box">
      <img :src="QrCodeImg" />
    </div>

    <CellGroup inset class="order-box">
      <Cell title="订单号" :value="order.order_no" />
      <Cell title="应付usdt" :value="order.usdt" />
      <Cell title="可兑换cny" :value="order.cny" />
      <Cell title="订单状态" :value="orderStatus" />
      <Loading v-if="order.status === 'to_be_paid'" type="spinner" size="22" class="order-status-icon" />
      <Icon
        v-if="['paid', 'completed'].includes(order.status)"
        name="checked"
        :color="order.status === 'paid' ? '#1989fa' : '#07c160'"
        size="22"
        class="order-status-icon"
      />
    </CellGroup>
    <div class="question">对订单有疑问？请联系客服</div>
    <div class="order-btn-box">
      <Button size="small" block type="primary" @click="handleMoreExchange">兑换更多</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { Button, showFailToast, CellGroup, Cell, showToast, Loading, Icon } from "vant";
import api from "@/request/api";
import QrCodeImg from "@/assets/img/order-qrcode.png";
import useClipboard from "vue-clipboard3";

const router = useRouter();
const { toClipboard } = useClipboard();

interface IOrderStatus {
  [to_be_paid: string]: string;
}

const walletAddress = "TFRLjgHVEGqFCPmGTRYfeRvAKoG6Z66666";

const orderStatusEnum: IOrderStatus = {
  to_be_paid: "待付款",
  paid: "已支付",
  completed: "已完成"
};

const orderStatus = ref("");

let order = reactive({
  address: "",
  hash: "",
  order_no: "",
  usdt: "",
  receive_usdt: "",
  cny: "",
  price_usd: "",
  status: "",
  expired_at: "",
  bank_name: "",
  bank_account: "",
  bank_user_name: ""
});
let timer: any;

onMounted(async () => {
  const order_no = router.currentRoute.value.query?.order_no?.toString();
  if (order_no) {
    const { code, data } = await api.getOrder(order_no);
    if (code === 0) {
      order = {
        ...data.list[0]
      };
      orderStatus.value = orderStatusEnum[data.list[0].status];
      if (data.staus === "completed") {
        clearInterval(timer);
      } else {
        timer = setInterval(() => {
          getOrder(order_no);
        }, 2000);
      }
    }
  } else {
    showFailToast("参数非法");
  }
});

onBeforeRouteLeave(() => {
  if (timer) {
    clearInterval(timer);
  }
});

/**
 * 点击兑换更多
 */
const handleMoreExchange = () => {
  router.push({
    path: "/",
    query: { tabIndex: 1 }
  });
};

/**
 * 复制钱包地址
 */
const handleCopy = async () => {
  await toClipboard(walletAddress).then(() => {
    showToast("复制成功");
  });
};

/**
 * 获取订单
 * @param order_no 订单号
 */
const getOrder = async (order_no: string) => {
  const { code, data } = await api.getOrder(order_no);
  if (code === 0) {
    order = {
      ...data.list[0]
    };
    orderStatus.value = orderStatusEnum[data.list[0].status];
    if (data.staus === "completed") {
      clearInterval(timer);
    }
  }
};
</script>

<style lang="scss" scoped>
:deep(.van-cell) {
  background-color: rgba(52, 52, 67, 1);
  color: rgba(255, 255, 255, 1);
}

:deep(.van-cell:after) {
  border: none;
}

:deep(.van-cell__value) {
  color: rgba(255, 255, 255, 1);
}

:deep(.van-cell__title) {
  text-align: left;
}
.order-container {
  background-color: rgba(43, 43, 55, 1);
  color: rgba(255, 255, 255, 1);
  min-height: 100%;
  box-sizing: border-box;
}

.order-title {
  font-size: 2rem;
  font-weight: bold;
  padding: 2rem 0;
}

.wallet-address {
  font-size: 0.8rem;
}
.order-box {
  background-color: rgba(43, 43, 55, 1);
  border-radius: 0.5rem;
  margin-top: 1rem;
  position: relative;

  .order-status-icon {
    position: absolute;
    right: 4rem;
    bottom: 0.6rem;
  }
}

.order-qrcode-box {
  margin-top: 1rem;
  img {
    width: 10rem;
  }
}

.question {
  text-align: right;
  font-size: 0.5rem;
  padding: 1rem;
}

.order-btn-box {
  width: 100%;
  text-align: center;
  margin-top: 2rem;

  button {
    width: 50%;
    max-width: 300px;
    margin: 0 auto;
  }
}
.customer-service {
  position: fixed;
  bottom: 5rem;
  right: 1rem;
}
</style>
