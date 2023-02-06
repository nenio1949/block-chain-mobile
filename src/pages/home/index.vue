<template>
  <div class="home-container" :style="{ 'padding-bottom': tabActive === 0 ? '260px' : '0px' }">
    <div class="header-box">
      <img src="@/assets/img/logo.png" />
    </div>

    <div class="tab-box">
      <Tabs
        sticky
        animated
        type="card"
        color="#2b2b37"
        background="#2b2b37"
        v-model:active="tabActive"
        @change="handleTabChange"
      >
        <Tab title="USDT换TRX">
          <div class="rate-box">
            <div class="rate-item">
              1 USDT<img src="@/assets/svg/usdterc20_01c09cad36.svg" />可兑换
              <span class="rate-number">{{
                trxRate.symbol === "TRX-USDT"
                  ? (1 / Number(trxRate.price)).toFixed(2)
                  : Number(trxRate.price).toFixed(2)
              }}</span>
              TRX<img src="@/assets/svg/trx_f14430166e.svg" />
            </div>
            <div class="rate-item">
              1 TRX<img src="@/assets/svg/trx_f14430166e.svg" />可兑换
              <span class="rate-number">{{
                trxRate.symbol === "TRX-USDT"
                  ? Number(trxRate.price).toFixed(2)
                  : (1 / Number(trxRate.price)).toFixed(2)
              }}</span>
              USDT<img src="@/assets/svg/usdterc20_01c09cad36.svg" />
            </div>
            <div class="rate-desc">*因为实时性的关系，实际价格和公布价格可能会有细微差别</div>
          </div>
          <div class="rule-box">
            <span>钱包地址:</span>
            {{ walletAddress }} <br /><a @click="handleCopy">点击复制</a><br />
            规则: <br />
            1.向钱包地址转账USDT<br />
            2.根据转账金额自动向转账地址发送对应金额的TRX<br />
            3.等待10秒内到账trx。<br />
            4.usdt换trx：1u起换，trx换usdt：1000trx起换。没有上限。<br />
            5.如遇到问题，可联系客服到您的转账钱包。
          </div>
        </Tab>
        <Tab title="哈希">
          <Tabs sticky animated background="#2b2b37" v-model:active="hashTabActive" @change="handleHashTabChange">
            <Tab v-for="(item, index) in hashData" :key="index" :title="item.title">
              <div class="introduction-box" v-for="(item2, index2) in item.children" :key="index2">
                <h3>{{ item2.title }}</h3>
                <ul :style="{ 'padding-left': item2.title === '中奖实例' ? '0' : '1.5rem' }">
                  <li
                    v-for="(item3, index3) in item2.children"
                    :key="index3"
                    :class="item2.title === '中奖实例' ? 'hash-rule-item' : 'hash-item'"
                  >
                    <span v-if="!item3.children" class="">{{ item3 }}</span>
                    <h5 v-if="item3.children">{{ item3.title }}</h5>
                    <ul v-if="item3.children">
                      <li v-for="(item4, index4) in item3.children" :key="index4">
                        {{ item4 }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </Tab>
          </Tabs>
        </Tab>
        <!-- <Tab title="USDT换RMB">
          <Form @submit="handleSubmit" validate-trigger="onSubmit" class="home-form">
            <CellGroup inset>
              <Field
                v-model="dataForm.cny_amount"
                name="cny_amount"
                label="兑换金额"
                placeholder="请输入兑换金额"
                :rules="[{ required: true, message: '请填写兑换金额' }]"
              />
              <Field
                v-model="dataForm.bank_name"
                name="bank_name"
                label="收款渠道"
                placeholder="支付宝/微信/银行名字"
                :rules="[{ required: true, message: '请填写收款银行' }]"
              />
              <Field
                v-model="dataForm.bank_account"
                name="bank_account"
                label="收款账户"
                placeholder="请输入银行账户"
                :rules="[{ required: true, message: '请填写银行账户' }]"
              />
              <Field
                v-model="dataForm.bank_user_name"
                name="bank_user_name"
                label="收款人姓名"
                placeholder="请输入收款人姓名"
                :rules="[{ required: true, message: '请填写收款人' }]"
              />
            </CellGroup>
            <div class="form-submit-box">
              <Button size="small" block type="primary" native-type="submit"> 提交 </Button>
            </div>
          </Form>
        </Tab> -->
        <Tab title="USDT换RMB">
          <div class="rate-box">
            <!-- <div class="rate-item">
              1 USDT<img src="@/assets/svg/usdterc20_01c09cad36.svg" />可兑换
              <span class="rate-number">{{
                cnyRate.symbol === "CNY-USDT"
                  ? (1 / Number(cnyRate.price)).toFixed(2)
                  : Number(cnyRate.price).toFixed(2)
              }}</span>
              RMB<img src="@/assets/svg/cny.svg" />
            </div> -->
            <div class="rate-item">
              1 RMB<img src="@/assets/svg/cny.svg" />可兑换
              <span class="rate-number">{{
                cnyRate.symbol === "CNY-USDT"
                  ? Number(cnyRate.price).toFixed(2)
                  : (1 / Number(cnyRate.price)).toFixed(2)
              }}</span>
              USDT<img src="@/assets/svg/usdterc20_01c09cad36.svg" />
            </div>
            <div class="rate-desc">*因为实时性的关系，实际价格和公布价格可能会有细微差别</div>
          </div>
          <div class="rule-box">
            规则: <br />
            1.向钱包地址转账USDT<br />
            2.根据转账金额自动向转账地址发送对应金额的TRX<br />
            3.等待10秒内到账trx。<br />
            4.usdt换trx：1u起换，trx换usdt：1000trx起换。没有上限。<br />
            5.如遇到问题，可联系客服到您的转账钱包。
          </div>
          <Form @submit="handleSubmit" validate-trigger="onSubmit" class="home-form">
            <CellGroup inset>
              <Field
                v-model="dataForm.cny_amount"
                name="cny_amount"
                label="兑换金额"
                placeholder="请输入兑换金额"
                :rules="[{ required: true, message: '请填写兑换金额' }]"
              />
              <Field
                v-model="dataForm.bank_name"
                name="bank_name"
                label="收款渠道"
                placeholder="支付宝/微信/银行名字"
                :rules="[{ required: true, message: '请填写收款银行' }]"
              />
              <Field
                v-model="dataForm.bank_account"
                name="bank_account"
                label="收款账户"
                placeholder="请输入银行账户"
                :rules="[{ required: true, message: '请填写银行账户' }]"
              />
              <Field
                v-model="dataForm.bank_user_name"
                name="bank_user_name"
                label="收款人姓名"
                placeholder="请输入收款人姓名"
                :rules="[{ required: true, message: '请填写收款人' }]"
              />
              <Field type="textarea" v-model="dataForm.tips" name="tips" label="备注" placeholder="请输入备注" />
            </CellGroup>
            <div class="form-submit-box">
              <Button size="small" block type="primary" native-type="submit"> 提交 </Button>
            </div>
          </Form>
        </Tab>
      </Tabs>
    </div>

    <div class="platform-box">
      <ul class="platform-title">
        <li>平台</li>
        <li>官网</li>
        <li>教程</li>
      </ul>

      <List v-for="platForm in platForms" :key="platForm.url">
        <ul class="platform-item">
          <li>{{ platForm.name }}</li>
          <li>
            <a :href="platForm.url" class="platform-link">{{ platForm.name }}</a>
          </li>
          <li><a class="tutorial-btn" @click="handleViewTutorial(platForm.img)">查看教程</a></li>
        </ul>
      </List>
    </div>
    <div class="footer-box">
      <div class="footer-copyright">© changeNOW – 2023 CHN Group Limited</div>
      <div>
        <a class="footer-item">使用条款</a>
        <a class="footer-item">隐私政策</a>
        <a class="footer-item">Risk Disclosure Statement</a>
        <a class="footer-item">Hard Fork Policy</a>
      </div>
    </div>
    <div v-if="tabActive === 1" class="hash-bottom-box">
      <img src="@/assets/img/bottom-title.png" />
      <div>
        买 <span style="color: yellow">【{{ hashData[hashTabActive].title }}】</span> 投注地址
      </div>
      <div class="hash-bottom-key-box">
        <div class="hash-bottom-key-item">{{ hashData[hashTabActive].key }}</div>
        <div class="hash-bottom-key-item" @click="handleCopyHash(hashData[hashTabActive].key)">
          <Icon name="description" /> 一键复制·转账投注
        </div>
      </div>
      <div style="color: #abfe53"><Icon name="checked" />请务必使用【去中心化钱包】投注</div>
      <div style="color: #f44336; text-shadow: white 0px 1px, white 1px 0px, white -1px 0px, white 0px -1px">
        <Icon name="clear" />禁止使用交易所投注，如：币安/欧易/火币等
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from "vue";
  import { Tab, Tabs, Form, Field, CellGroup, Button, List, showToast, Icon } from "vant";
  import imTokenImg from "@/assets/img/tutorial/imtoken_t.jpg";
  import ownbitImg from "@/assets/img/tutorial/ownbit_t.jpg";
  import trustImg from "@/assets/img/tutorial/trustwallet_t.jpg";
  import tronlinkImg from "@/assets/img/tutorial/tronlink_t.jpg";
  import bitpleImg from "@/assets/img/tutorial/bitpie_t.jpg";
  import { useRouter } from "vue-router"; // 传递参数用 useRouter
  import useClipboard from "vue-clipboard3";
  import hashData from "./hashData";
  import api from "@/request/api";
  const router = useRouter();
  const { toClipboard } = useClipboard();

  const walletAddress = "TS3wxaJDy5pWtEA3Gcpa8e5at3bVrHuuuu";

  interface ICreateOrder {
    cny_amount: object;
    bank_name: string;
    bank_account: string;
    bank_user_name: string;
  }

  interface IRate {
    fee_rate: string;
    price: string;
    symbol: string;
  }

  // form表单
  const dataForm = reactive({
    cny_amount: "",
    bank_name: "",
    bank_account: "",
    bank_user_name: "",
    tips: ""
  });

  const trxRate: IRate = reactive({
    fee_rate: "",
    price: "",
    symbol: "TRX-USDT"
  });

  const cnyRate: IRate = reactive({
    fee_rate: "",
    price: "",
    symbol: "CNY-USDT"
  });

  let tabActive = ref(0);
  let hashTabActive = ref(0);

  // 平台
  const platForms = [
    {
      name: "imToken",
      url: "https://token.im/",
      img: imTokenImg
    },
    {
      name: "ownbit",
      url: "https://ownbit.io/",
      img: ownbitImg
    },
    {
      name: "Trust Wallet",
      url: "https://trustwallet.com/",
      img: trustImg
    },
    {
      name: "TronLink",
      url: "https://tronlink.org/",
      img: tronlinkImg
    },
    {
      name: "Bitple Wallet",
      url: "https://bitpie.com/",
      img: bitpleImg
    }
  ];

  onMounted(() => {
    const tabIndex = router.currentRoute.value?.query?.tabIndex;
    if (tabIndex) {
      tabActive.value = parseInt(tabIndex.toString());
    }
    handleGetRate();
  });

  /**
   * 获取汇率
   */
  const handleGetRate = async () => {
    const { code, data } = await api.getRate("trx");
    const { code: code1, data: data1 } = await api.getRate("cny");
    if (code === 0) {
      trxRate.fee_rate = data.fee_rate;
      trxRate.price = data.price;
      trxRate.symbol = data.symbol;
    }
    if (code1 === 0) {
      cnyRate.fee_rate = data1.fee_rate;
      cnyRate.price = data1.price;
      cnyRate.symbol = data1.symbol;
    }
  };

  /**
   * 提交
   * @param values
   */
  const handleSubmit = async (values: ICreateOrder) => {
    const { code, data } = await api.createOrder(values);
    if (code === 0) {
      router.push({
        path: "/order",
        query: { order_no: data.order_no }
      });
    }
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
   * 复制hash key
   */
  const handleCopyHash = async (key: string) => {
    await toClipboard(key).then(() => {
      showToast("复制成功");
    });
  };

  /**
   * 切换tab
   * @param index 序号
   */
  const handleTabChange = (index: number) => {
    tabActive.value = index;
  };

  /**
   * 切换hash tab
   * @param index 序号
   */
  const handleHashTabChange = (index: number) => {
    hashTabActive.value = index;
  };

  /** 查看教程 */
  const handleViewTutorial = (img: string) => {
    router.push({
      path: "/tutorial",
      query: { img: img }
    });
  };
</script>

<style lang="scss" scoped>
  :deep(.van-tab--card.van-tab--active) {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  :deep(.van-tab--card) {
    color: rgba(238, 238, 238, 1) !important;
  }

  :deep(.van-tab__text--ellipsis) {
    color: rgba(238, 238, 238, 1) !important;
  }

  :deep(.van-cell) {
    background: rgba(52, 52, 67, 1);
    color: rgba(255, 255, 255, 1);
  }

  :deep(.van-field__label) {
    color: rgba(255, 255, 255, 1);
  }

  :deep(.van-field__control) {
    color: rgba(255, 255, 255, 1);
  }

  :deep(.van-cell:after) {
    border: none;
  }

  :deep(.van-tab__panel) {
    margin: 0 auto;
    max-width: 800px;
  }

  :deep(input:-internal-autofill-previewe)d,
  input:-internal-autofill-selected {
    -webkit-text-fill-color: #807c7c;
    transition: background-color 5000s ease-out 0.5s;
  }

  .home-container {
    background-color: rgba(43, 43, 55, 1);
    color: rgba(255, 255, 255, 1);
    min-height: 100%;
  }
  .header-box {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: rgba(43, 43, 55, 1);
    padding: 1rem;
    text-align: left;

    img {
      width: 50%;
      max-width: 200px;
      background-color: rgba(43, 43, 55, 1);
    }
  }

  .rate-box {
    padding: 1rem;

    .rate-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .rate-desc {
      font-size: 0.5rem;
      margin-top: 1rem;
      text-align: right;
    }

    .rate-number {
      font-size: 2rem;
      margin: 0.5rem;
      font-weight: bold;
    }
  }

  .tab-box {
    padding: 1rem 0 0;
  }

  .form-submit-box {
    padding: 2rem;
  }

  .introduction-box {
    text-align: left;
    line-height: 2rem;
    border-radius: 0.5rem;
    margin: 0.5rem;
    padding: 0.5rem;
    background-color: rgba(52, 52, 67, 1);

    ul {
      padding-left: 1.5rem;
      box-sizing: border-box;
    }

    ul li {
      font-size: 0.8rem;
      display: list-item;
      list-style-type: circle;

      h5 {
        padding: 1rem 1rem 0 1rem;
        margin: 0;
      }
    }

    ul li::marker {
      color: rgba(25, 137, 250, 1);
    }
  }

  .hash-rule-item {
    list-style-type: none !important;
    background-color: rgba(36, 36, 57, 1);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .hash-item {
    background-color: rgba(52, 52, 67, 1);
  }

  .rule-box {
    text-align: left;
    font-size: 0.8rem;
    line-height: 2rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background-color: rgba(52, 52, 67, 1);
  }

  .platform-box {
    margin: 0.5rem 0.5rem 0;
    padding: 0.5rem;
    background-color: rgba(52, 52, 67, 1);
    .platform-title {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;
      line-height: 3rem;
      font-weight: bold;
    }

    .platform-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .platform-link {
        color: #8b86af;
      }

      .tutorial-btn {
        color: rgba(25, 137, 250, 1);
        cursor: pointer;
      }
    }
  }

  .home-form {
    padding-top: 1rem;
  }

  .customer-service {
    position: fixed;
    bottom: 7rem;
    right: 1rem;
  }

  .footer-box {
    margin: 0.5rem;
    padding: 0.5rem;
    text-align: center;

    .footer-copyright {
      font-size: 0.8rem;
      line-height: 1rem;
    }

    .footer-item {
      margin: 0;
      display: inline-block;
      font-size: 0.8rem;
      line-height: 1rem;
      padding: 2px 8px;
      border-right: 1px solid #3d3d4b;
      color: #8b86af;
    }

    .footer-item:last-child {
      border: none;
    }
  }

  .hash-bottom-box {
    padding: 1rem;
    position: fixed;
    bottom: 0;
    background-color: rgba(25, 137, 250, 1);
    width: 100%;
    box-sizing: border-box;
    font-size: 0.8rem;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;

    img {
      width: 60%;
      max-width: 500px;
    }

    .hash-bottom-key-box {
      display: flex;
      flex-flow: wrap;
      justify-content: center;
      align-items: center;
      padding-left: 0.5rem;
      .hash-bottom-key-item {
        background-color: rgba(255, 255, 255, 1);
        color: rgba(25, 137, 250, 1);
        margin-bottom: 1rem;
        margin-right: 0.5rem;
        border-radius: 1rem;
        padding: 0.2rem 0.5rem;
      }

      .hash-bottom-key-item:last-child {
        cursor: pointer;
      }
    }
  }
</style>
