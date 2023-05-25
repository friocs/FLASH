<!-- Pooltype '0'买池 '1'卖池 '2'买卖池 -->
<template>
  <div class="create_Home" v-if="select === 0 && route.path != '/me/info'">
    <div @click="create('1')">
      {{ $t("NFTdetails.establish") }}{{ $t("NFTdetails.Buyapool") }}
    </div>
    <div @click="create('2')">
      {{ $t("NFTdetails.establish") }}{{ $t("NFTdetails.Sellingpool") }}
    </div>
    <div @click="create('3')">
      {{ $t("NFTdetails.establish") }}{{ $t("NFTdetails.Tradingpool") }}
    </div>
  </div>
  <div class="nft_list" :style="{ width: nftlist.width }">
    <div v-for="item in nftlist.data" :key="item.id" @click="item.code?'':go(item.nftContractAddr)">
      <div class="top tops" v-if="nftlist.active === 1">
        <div v-if="
          (item.Pooltype && nftlist.select == 0) || route.path === '/me/info'
        " :style="{
          color:
            item.Pooltype === '0'
              ? '#47A182'
              : item.Pooltype === '1'
              ? '#F6455D'
              : '#5A64E9',
        }">
          <img src="@/assets/img/buypool.png" v-if="item.Pooltype === '0'" />
          <img src="@/assets/img/sellpool.png" v-else-if="item.Pooltype === '1'" />
          <img src="@/assets/img/buy_sell.png" v-else />
          {{
          item.Pooltype === "0"
          ? t("NFTdetails.Buyapool")
          : item.Pooltype === "1"
          ? t("NFTdetails.Sellingpool")
          : t("NFTdetails.Tradingpool")
          }}
        </div>
        <div v-if="item.Pooltype && nftlist.select === 2" :style="{
          backgroundColor: item.Pooltype === '0' ? '#189F7A' : '#FF4848',
        }">
          {{
          item.Pooltype === "0"
          ? t("business.purchase")
          : t("business.sellout")
          }}
        </div>
        <div class="backimg" v-if="select === 1 && route.path != '/me/info'"
          :class="item.Pooltype === '0' ? 'BUYimg' : 'SELLimg'">
          {{
          item.Pooltype === "0"
          ? t("business.purchase")
          : t("business.sellout")
          }}
        </div>
        <!-- purchase: '买入',sellout: '卖出', -->

        <div class="servename" v-if="nftlist.select === 2 && nftlist.servename != ''">
          <p ref="servenameDiv">{{ servename
          }}</p>
          <img class="authentication" v-if="nftlist.isAuth == '2'" src="@/assets/img/authentication.png" />
        </div>

        <p style=" font-size: 0.24rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #7c7c7c;
          ">
          {{ item.time }}
        </p>
      </div>
      <!-- 我的页面 成交记录 -->
      <div class="top tops" v-else-if="nftlist.active === 2">
        <div>
          <img src="@/assets/img/buypool.png" v-if="item.type" />
          <img src="@/assets/img/sellpool.png" v-else />
          {{ item.type ? t("my.purchase") : t("my.sellout") }}
        </div>
        <p>{{ item.time }}</p>
      </div>
      <!-- 撤销 -->
      <p v-if="
        (route.path != '/business' || item.type != null) &&
        nftlist.active != 2 &&
        ((nftlist.select != 2 && nftlist.select != 1) || route.path=='/me/info')
      " @click.stop="item.type?setRevoke(item.id,item.Pooltype,item.poolAddr,item.nftContractAddr):''"
        class="btn_order" :style="{ backgroundColor: item.type ? '#5A64E9' : '#96959A' }">
        {{ item.type ? t("my.cancel_the_order") : t("my.rescinded") }}
      </p>

      <!--  撤销弹出-->
      <van-overlay :show="nameType" @click="cancel">
        <div class="wrapper" @click.stop>
          <p>{{$t('my.cancel_the_order')}}</p>
          <div class="btn">
            <div @click="cancel">{{$t('overall.cancel')}}</div>
            <div @click="
              revoke()
            ">
              {{$t('overall.confirm')}}
            </div>
          </div>
        </div>
      </van-overlay>

      <div class="details" v-if="
        (nftlist.active === 1 && nftlist.select == 0) ||
        (route.path === '/me/info' && active != 2)
      ">
        <!-- 买入的时候有gas费 -->
        <div v-if="active != 2">
          <p v-if="item.gas">gas: {{ item.gas }}</p>
          <p v-if="!item.img">
            {{ item.series }}<br />
            <span style="margin-top: 5.12rem">{{ t("my.series") }}</span>
            <!-- 
            <span style="margin-top:5.12rem;">{{ t("my.series") }}</span> -->
          </p>
          <p>
            <span class="img_list"><img src="@/assets/img/WBNB.png" style="margin-bottom: 0.12rem" />{{ item.price!='--'
            &&
            numFilters(item.price.toString())
            }}</span>
            <span>{{ t("my.offer") }}</span>
          </p>
        </div>
        <div v-if="item.Pooltype != '1' && active != 2">
          <p>
            <span class="img_list"><img src="@/assets/img/WBNB.png" style="margin-bottom: 0.12rem" />{{ item.Token
            }}</span>
            <span>{{ t("business.Token") }}</span>
          </p>
          <p>
            {{ item.quantity }}<br /><span>{{
            t("business.Purchasequantity")
            }}</span>
          </p>
        </div>
        <div>
          <p v-if="item.Pooltype != '0' && active != 2">
            {{ item.NFT_quantity }}<br /><span>NFT</span>
          </p>
          <p v-if="active != 2">
            {{ item.curvetype ? t("business.Finger") : t("business.linear")
            }}<span class="curvetquantity">{{ item.curvetquantity }}</span><br /><span>{{ t("business.curvetype")
            }}</span>
          </p>
        </div>
        <div v-if="item.Pooltype === '2'">
          <p>
            {{ item.Service }}<br /><span>{{
            t("business.ServiceCharge")
            }}</span>
          </p>
        </div>
      </div>
      <div class="details" v-if="
        nftlist.active === 1 &&
        (nftlist.select == 1 || nftlist.select === 2) &&
        route.path != '/me/info'
      ">
        <div>
          <p>
            {{ item.price!='--'&&
            numFilters(item.price.toString())
            }}BNB<br /><span>{{
            item.Delegation
            ? t("business.Transactionprice")
            : t("business.price")
            }}</span>
          </p>
          <p>
            {{ item.code }}<br /><span>{{ t("business.number") }}</span>
          </p>
        </div>
        <div>
          <p style="color: #5a64e9">
            <a @click.stop="opens(item.has)" target="_blank" href="javascript:;">{{ item.has }}</a><br /><span>TX</span>
          </p>
          <p v-if="item.Delegation">
            {{ item.Delegation }}<br /><span>{{
            t("business.Commissiontype")
            }}</span>
          </p>
        </div>
      </div>
      <div class="details" v-else-if="nftlist.active === 2">
        <!-- 买入的时候有gas费 -->
        <div>
          <p>
            {{ item.series }}<br /><span>{{ t("my.series") }}</span>
          </p>
          <p>
            <span class="img_list"><img src="@/assets/img/WBNB.png" />{{ item.price!='--'&&
            numFilters(item.price.toString()) }}</span>
            <span>{{ t("my.price") }}</span>
          </p>
        </div>
        <div>
          <p>
            {{ item.code }}<br /><span>{{ t("business.code") }}</span>
          </p>
          <p style="color: #5a64e9">
            <a @click.stop="opens(item.has)" target="_blank" href="javascript:;">{{ item.has }}</a><br /><span>TX</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <van-overlay :show="create_show" />
</template>

<script lang="ts" setup>
// //接收父组件传过来的值,需要注意defineProps只能在setup语法糖里面使用，不需要import引入
import {
  onMounted,
  PropType,
  computed,
  getCurrentInstance,
  ref,
  inject,
  reactive
} from "vue";
import { nftrecordType } from "@/utils/type";
import { Dialog } from "vant";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useStates } from "@/hooks/userStore";
import { Toast } from "vant";
import { number } from "@intlify/core-base";
import { initSigner } from "@/utils/thhersUtils";
import { BigNumber, ethers } from "ethers";
import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";
import { SetUp } from "@element-plus/icons-vue";
import numFilters from '@/hooks/userNumFilters'

const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const router = useRouter();
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
const create_show = ref(false);
const contracts: any = {};
let servenameDiv = ref<HTMLParagraphElement | null>(null);
let providers: any = "";
let signers: any = "";
const hexAddress: any = inject("hexAddress");
const emit = defineEmits(["updatepool"]);
interface revokedetailType {
  id: number | string,
  pooltype: string | undefined,
  poolAddr: string | undefined,
  nftContractAddr: string | undefined,
}

let revokedetail = reactive<revokedetailType>({
  id: 0,
  pooltype: '',
  poolAddr: '',
  nftContractAddr: '',
})
const setRevoke = (id: number,
  pooltype: string | undefined,
  poolAddr: string | undefined,
  nftContractAddr: string | undefined) => {
  revokedetail.id = id;
  revokedetail.pooltype = pooltype;
  revokedetail.poolAddr = poolAddr;
  revokedetail.nftContractAddr = nftContractAddr;
  nameType.value = true;
}

// const VanDialog = Dialog.Component;
const nftlist = defineProps({
  data: {
    type: Array as unknown as PropType<nftrecordType[]>,
    default: () => [],
  },
  active: {
    type: Number,
    default: 0,
  },
  width: {
    type: String,
    default: "90%",
  },
  select: {
    type: Number,
    default: 1,
  },
  servename: {
    type: String,
    default: "",
  },
  searchKey: {
    type: String,
    default: "",
  },
  isAuth: {
    type: String,
    default: "0",
  },
});
let nameType = ref(false);
let { t } = useI18n();

onMounted(() => {
  let tries = 0;
  setTimeout(function initTimer (): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
    else init();
    console.log('route', route.path);
    console.log('servenameDiv', Array.isArray(servenameDiv.value));
    if (Array.isArray(servenameDiv.value)) {
      (servenameDiv.value as unknown as []).forEach((val: HTMLParagraphElement) => {
        if (val.innerText.length > 15) val.style.width = '3rem';
      })
    }
  });
});


const init = async () => {
  //第一步 ----  获取 当前钱包对象 和 provider
  if ((window as any).ethereum && userinfo.value.isLogin) {
    let { provider, address, signer, Balance } = await initSigner();
    providers = provider;
    signers = signer;
  }
  // useraddress.value = address;
  // contracts.LSSVMPairETH = new ethers.Contract('0xa4e1cd0cd3e433c2e4fe5498e7faa136b0f6a4fd', LSSVMPairETH, providers.value).connect(signers.value);
  // console.log(contracts.LSSVMPairETH);
  //第二部 ----  创建合约对象              '合约地址'       'JSON'  这是上面的provider和signer
  // contracts.LSSVMPairFactory = new ethers.Contract(proxy.$common.LSSVMPairFactory, LSSVMPairFactory, provider).connect(signer);
  // try {
  //     contracts.LSSVMPairETH = new ethers.Contract('0xa4e1cd0cd3e433c2e4fe5498e7faa136b0f6a4fd', LSSVMPairETH, providers).connect(signers);
  // } catch (e) {
  //     console.log(e, 456)
  // }
};
// 取消按钮
const cancel = () => {
  nameType.value = false;
};

const revoke = async () => {
  
  let { id, pooltype, poolAddr, nftContractAddr } = revokedetail;
  try {
    contracts.LSSVMPairETH = new ethers.Contract(
      poolAddr as string,
      LSSVMPairETH,
      providers
    ).connect(signers);
    create_show.value = true;
  } catch (e) {
    console.log(e);
    Toast.clear();
    Toast.fail(t('overall.Cancellationfailed'));
  }
  console.log(id, pooltype, poolAddr, nftContractAddr);
  Toast.loading({
    message: t('overall.Cancelling') + "...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 0,
  });
  cancel();
  if (pooltype === "0") {
    //撤销买池
    console.log(contracts.LSSVMPairETH);
    contracts.LSSVMPairETH.withdrawAllETH().then(async (res: any) => {
      await res.wait();
      Toast.clear();
      create_show.value = false;
      setTimeout(() => {
        Toast.success(t('overall.Cancellation'));
        emit("updatepool");
        revokedetail = {
          id: 0,
          pooltype: '',
          poolAddr: '',
          nftContractAddr: '',
        }
      }, 1000);
    }).catch((e: any) => {
      create_show.value = false;
      Toast.clear();
      console.log(e);
      Toast.fail(t('overall.Cancellationfailed'));
    });
  } else if (pooltype === "1") {
    //撤销卖池
    // 声明合约的时候用当前池子的地址，撤销nft的时候用当前池子下nft的地址
    contracts.LSSVMPairETH.getAllHeldIds().then(async (res: any) => {
      console.log(res);
      contracts.LSSVMPairETH.withdrawERC721(nftContractAddr, res).then(async (res2: any) => {
        await res2.wait();
        Toast.clear();
        create_show.value = false;
        setTimeout(() => {
          Toast.success(t('overall.Cancellation'));
          emit("updatepool");
          revokedetail = {
            id: 0,
            pooltype: '',
            poolAddr: '',
            nftContractAddr: '',
          }
        }, 1000);
      }).catch((e: any) => {
        create_show.value = false;
        Toast.clear();
        console.log(e);
        Toast.fail(t('overall.Cancellationfailed'));
      });
    });
  } else {
    //撤销买卖池
   
    contracts.LSSVMPairETH.getAllHeldIds().then(async (res2: any) => {
      contracts.LSSVMPairETH.withdrawAll(nftContractAddr, res2).then(async (res3: any) => {
        await res3.wait();
        Toast.clear();
        create_show.value = false;
        setTimeout(() => {
          Toast.success(t('overall.Cancellation'));
          emit("updatepool");
          revokedetail = {
            id: 0,
            pooltype: '',
            poolAddr: '',
            nftContractAddr: '',
          }
        }, 3500);
      }).catch((e: any) => {
        create_show.value = false;
        Toast.clear();
        console.log(e);
        Toast.fail(t('overall.Cancellationfailed'));
      });
    });
    // let res, res2, res3
  
  }
};

const create = (type: string) => {
  if (!userinfo.value.isLogin || !hexAddress) return Toast.fail(t('overall.logTips'));
  router.push(
    "/business/createpond?type=" + type + "&searchKey=" + nftlist.searchKey
  );
};

const go = (address: string | undefined) => {
  if (!route.path.includes('/business')) router.push("/business?searchKey=" + address);
};

const opens = (has: any) => {
  open(
    proxy.$common.bscscan + has
  );
  return false;
};
</script>
<style lang="scss" scoped>
.price {
  width: 2.2rem !important;
  // background-color: pink;
}

.create_Home {
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;

  >div {
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    width: 2.12rem;
    height: 0.72rem;
    overflow: hidden;
    background-color: #f6455d;
    width: 30%;
    border-radius: 0.08rem;
    line-height: 0.72rem;
    text-align: center;
    overflow: hidden;
    // border-radius: .2rem;
  }

  >div:nth-of-type(1) {
    background-color: #47a182;
  }

  >div:nth-of-type(3) {
    background-color: #5a64e9;
  }
}

.nft_list {
  margin: 0 auto;
  margin-bottom: 2rem;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;

  >div {
    overflow: hidden;
    border-radius: 10px;
    // border: 1px solid rgba(187, 187, 187, 40);
    width: 100%;
    background-color: #121212;
    margin-bottom: 0.3rem;
    padding: 0.3rem;
    position: relative;

    .top {
      display: flex;
      justify-content: space-between;
      margin: 0.2rem 0.3rem 0 0;

      >div {
        display: flex;
        align-items: center;

        img {
          width: 0.6rem;
          margin-right: 0.2rem;
          height: 0.6rem;
        }
      }

      .backimg {
        width: 1.7rem;
        height: 0.7rem;
        // background-color: red;
        color: white;
        background-size: 100% 100%;
        padding-left: 0.3rem;
      }

      .servename {
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #5a64e9;
        display: flex;
        align-items: center;
        font-size: 0.35rem;

        >p {
          color: #5a64e9;
          overflow: hidden;
          // width: 3rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }

        >img {
          width: 0.4rem;
          height: 0.4rem;
          position: relative;
          left: 0.2rem;
          top: 1px;
        }
      }

      .BUYimg {
        background-image: url("@/assets/img/BUY.png");
      }

      .SELLimg {
        background-image: url("@/assets/img/SELL.png");
      }

      p {
        margin: 0;
        color: rgba(153, 153, 153, 100);
        font-size: 14px;
        font-family: PingFangSC-regular;
      }
    }

    .tops {
      // justify-content: flex-start;
      align-items: center;

      >div {
        display: flex;
        color: rgba(255, 255, 255, 100);
        font-size: 0.3rem;
        padding: 0 2px;
        margin-right: 0.2rem;
      }
    }

    .btn_order {
      margin-bottom: 0.34rem;
      position: absolute;
      color: white;
      padding: 4px 0.5rem;
      right: 0.52rem;
      font-size: 0.3rem;
      border-radius: 8px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      bottom: 0rem;
    }

    .details {
      display: flex;
      flex-direction: column;
      margin-top: 0.2rem;

      >div {
        margin: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        padding: 0 1.5rem 0 0.1rem;
      }

      p {
        // color: rgba(16, 16, 16, 100);
        color: white;
        font-size: 0.35rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        width: 50%;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        span {
          color: #7c7c7c;
        }

        .curvetquantity {
          color: #5660df;
          margin-left: 0.1rem;
        }

        .img_list {
          display: flex;
          align-items: center;
          color: white;
        }

        img {
          width: 0.4rem;
          height: 0.4rem;
          margin-right: 0.2rem;
        }

        >a {
          color: #5a64e9;
        }
      }

      p:nth-of-type(2) {
        padding-left: 0.5rem;
      }
    }

    .details_img {
      display: flex;

      >div {

        p,
        a {
          margin: 0;
          color: rgba(16, 16, 16, 100);
          font-size: 0.3rem;
          text-align: left;
          font-family: PingFangSC-regular;
          margin-bottom: 0.3rem;
          overflow: hidden;
          width: 3rem;
          text-overflow: ellipsis;
          white-space: nowrap;

          span {
            color: blue;
          }
        }
      }

      div:nth-of-type(1) {
        margin-right: 2.5rem;
      }
    }
  }
}

.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  // width: 580px;
  width: 7.5rem;
  height: 4rem;
  border-radius: 10px;
  padding: 0.6rem;

  p {
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #0f0f0f;
    font-size: 0.4rem;
    margin-bottom: 0.3rem;
  }

  input {
    background-color: #f6f6f6;
    border-radius: 30px;
    border: none;
    outline: none;
    width: 95%;
    text-align: center;
    height: 1rem;
  }

  >div {
    display: flex;
    margin-top: 1.3rem;
    justify-content: space-between;

    >div {
      width: 40%;
      height: 1rem;
      line-height: 1rem;
      border-radius: 0.5rem;
    }

    >div:nth-of-type(1) {
      border: 2px solid #7c7c7c;
      color: #7c7c7c;
      text-align: center;
    }

    >div:nth-of-type(2) {
      background-color: #5a64e9;
      color: white;
    }
  }
}
</style>
