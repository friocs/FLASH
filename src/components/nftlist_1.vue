<template>
  <div style="background-color:#101010;  display: flex; height:100%;">

    <el-menu default-active="2" class="el-menu-vertical-demo" text-color="#fff">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span
            style="color: rgba(255, 255, 255, 1);font-size: 18px;text-align: left;font-family: PingFangSC-regular;font-weight: 700;">默认排序</span>
        </template>
        <el-menu-item v-for="(item, index ) in sortList" :key="index" index="1-1" @click="check(item.id)">{{ item.name
        }}
          <img v-if="item.check" style="width:15px;height:15px;" src="@/assets/img/Tick.png" alt="">
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu>
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span
            style="color: rgba(255, 255, 255, 1);font-size: 18px;text-align: left;font-family: PingFangSC-regular;font-weight: 700;">价格区间</span>
        </template>
        <el-menu-item index="1-1">
          <div>
            <div class="section">
              <div class="select">
                <el-select effect="dark" v-model="seachData.param.currency" class="m-2" disabled placeholder="Select"
                  size="small" @change="updateAccount">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    <van-image width="15%" style="margin-left: 0.2rem" fit="cover" :src="item.img" />&nbsp;<span
                      class="img_title">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="right">
                <input type="number" :placeholder="$t('browse.minimum_price')" @keyup="prohibited" @keyup.enter="search"
                  v-model="seachData.param.priceStartUn" />
                <span> &nbsp; 至 &nbsp;</span>
                <input type="number" :placeholder="$t('browse.Highest_price')" @keyup="prohibited" @keyup.enter="search"
                  v-model="seachData.param.priceEndUn" />
              </div>
            </div>
          </div>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <ul :infinite-scroll-immediate="false" v-infinite-scroll="load" infinite-scroll-delay="100" class="infinite-list"
      style="overflow: auto;background: #000;">

      <div class="main" ref="main">
        <!-- v-for="(item, index) in marketList"  :key="'marketList' + index"-->
        <div class="box" v-for="(item, index) in marketList" :key="index">
          <div class="imgBox" @click="gonftdetails(item.nftId, '1')">
            <img :src="item.nftImage" v-if="item.nftImage" alt="" />
            <img src="@/assets/img/250250.png" alt="" v-else />
          </div>
          <div class="bottom">
            <div>
              {{ item.nftName }} #{{ item.nftTokenId }}
            </div>
            <div class="Price">
              {{ numFilters(item.price.toString()) }}&nbsp;BNB
              <img src="@/assets/img/WBNB.png" alt="">
            </div>
          </div>
          <div class="btn" @click="buy(item)">立即购买</div>
        </div>
      </div>
      <el-dialog v-model="dialogVisible" width="645px" :align-center="true" :center="true" style="border-radius:30px ;">
        <template #header>
          <span class="dialog-header">
            购买详情
          </span>
        </template>
        <div class="contenr">token ID <span>#{{ nftdetails.nftTokenId }}</span></div>
        <div class="contenr">价格 <span>{{ nftdetails.nftPrice }}BNB</span></div>
        <div class="contenr">持有人 <span>{{ nftdetails.nftOwner }}</span></div>
        <div class="contenr">系列名称 <span>{{ nftdetails.nftName }}</span></div>
        <div class="contenr">合约地址 <span>{{ nftdetails.contractAddr }}</span></div>
        <div class="contenr">
          <div>版税
          </div>
          <span>{{ nftdetails.creatorIncome ? Number(nftdetails.creatorIncome * 100) : 0 }}%</span>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="sell" class="confirm">
              立即购买
            </el-button>
          </span>
        </template>
      </el-dialog>
    </ul>
  </div>
  <!-- <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li> -->

</template>

<script lang="ts" setup>
import { switchChainNoArgs } from '@/utils/DialogSwitchChain'
import { ArrowDown } from "@element-plus/icons-vue";
import {
  ref,
  PropType,
  onMounted,
  reactive,
  computed,
  nextTick,
  inject,
  getCurrentInstance,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { getTokenList } from "@/api/NFT";
import { useStates, useActions } from "@/hooks/userStore";
import { useI18n } from "vue-i18n";
import { Toast } from "vant";
import { getNftListByMarket } from "@/api/browse";
import { ElLoading } from 'element-plus'
import numFilters from '@/hooks/userNumFilters'
import { getNftDetail, getNftTransactionHistory, reloadNftMetadata } from "@/api/browse";
import { initSigner } from "@/utils/thhersUtils";
import { BigNumber, ethers } from "ethers";
import LSSVMRouter from "@/utils/contracts/LSSVMRouter.json";
import { nftdetailsType } from "@/utils/type";
import NFT from "@/utils/contracts/NFT.json";
import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";
import { TransactionType } from "@/utils/type";
import {getPath} from '@/utils'
let { t } = useI18n();
const router = useRouter();
const route = useRoute();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let { proxy } = getCurrentInstance();
const loading = ref(false);
const finished = ref(false);
const storeState: any = useStates("PageType", ["PageType"]);
const Actions: any = useActions(["setScreen"], "PageType");
const screen_type = computed(() => storeState.PageType.screen_type);
const updatescreen_type = () => {
  let type;
  if (screen_type.value) type = false;
  else type = true;
  Actions.setScreen(type);
  seachData.param.sort = seachData.param.sortUn = 1
  // reset();
};
// 购买

// let getName = ref<string>('');
//   let name_title = ref<HTMLParagraphElement | null>(null);
// let providers: any, signers: any;
// let useraddress = ref<string>("");
// const contracts: any = {};
let nftdetails = ref<nftdetailsType>({
  poolAddr: "",
  blockChain: "",
  contractAddr: "",
  creatorIncome: "",
  nftCirculation: "",
  nftContractName: "",
  nftImage: "",
  nftOwner: "",
  nftPrice: "",
  nftTokenId: "",
  protocolStandard: "",
  tokenList: "",
  transactionHistoryVOList: [],
});
// const owner = ref<string>("");
//   const hexAddress: any = inject("hexAddress");

let dialogVisible = ref(false)
// let dialogList = ref()
let buy = async (data: any) => {
  await getNftDetail(data.nftId).then(res => {
    nftdetails.value = res
  })
  dialogVisible.value = true
}
// const userinfo = computed(() => storeState.userMap.userinfo);
// const create_show = ref(false);
// let sellType = ref<boolean>(false);
// let sellsuccessType = ref<boolean>(false);
// const onClickLeft = () => {
//   router.go(-1);
// };
// const init = async () => {
//   if ((window as any).ethereum) {
//     console.log('init')
//     //第一步 ----  获取 当前钱包对象 和 provider
//     let { provider, address, signer, Balance } = await initSigner();
//     providers = provider;
//     signers = signer;
//     useraddress.value = address;
//     contracts.LSSVMRouter = new ethers.Contract(
//       proxy.$common.LSSVMRouter,
//       LSSVMRouter,
//       provider
//     ).connect(signer);
//     try {
//       contracts.NFT = new ethers.Contract(
//         nftdetails.value.contractAddr,
//         NFT,
//         provider
//       ).connect(signer);
//     } catch (e) {
//       console.log(e);
//     }
//     contracts.NFT.totalSupply()
//       .then((res: any) => {
//         nftdetails.value.nftCirculation = res;
//         console.log("所有数量", res);
//       })
//       .catch((e: any) => {
//         console.log("所有数量", e);
//       });

//     let owners = await contracts.NFT.ownerOf(nftdetails.value.nftTokenId);
//     owner.value = owners;
//     console.log("所有者", owner.value);
//   }
// };
// const sell = async () => {
//   console.log(useraddress.value);
//   if (
//     nftdetails.value.nftOwner.toLocaleLowerCase() !=
//     userinfo.value.hexAddress.toLocaleLowerCase() || route.query.type === '1'
//   ) {
//     // if (nftdetails.value.nftOwner.toLocaleLowerCase() != owner.value.toLocaleLowerCase()) return Toast.fail("购买失败");
//     create_show.value = true;
//     Toast.loading({
//       message: t('overall.Purchasing') + "...",
//       forbidClick: true,
//       loadingType: "spinner",
//       duration: 0,
//     });
//     let time = Date.parse(new Date() as unknown as string) / 1000;
//     let arr: any = [[nftdetails.value.poolAddr, [nftdetails.value.nftTokenId]]];
//     // 合约
//     let contract_total = 0;
//     try {
//       contracts.LSSVMPairETH = new ethers.Contract(
//         nftdetails.value.poolAddr,
//         LSSVMPairETH,
//         providers
//       ).connect(signers);
//     } catch (e) {
//       console.log(e);
//       Toast.clear();
//       create_show.value = false;
//     }
//     let res2 = await contracts.LSSVMPairETH.getBuyNFTQuote(1);
//     console.log("res2", res2);
//     contract_total += Number(ethers.utils.formatUnits(res2[3], 18));
//     console.log("contract_total", contract_total);
//     contract_total = Number(contract_total) > Number(nftdetails.value.nftPrice) ? Number(contract_total) : Number(nftdetails.value.nftPrice)
//     let newtotal = ethers.utils.parseUnits((contract_total * 1.01).toFixed(18), 18);
//     console.log(arr, useraddress.value, useraddress.value, time + 60, {
//       value: newtotal,
//     });
//     console.log(121212)
//     contracts.LSSVMRouter.swapETHForSpecificNFTs(
//       arr,
//       useraddress.value,
//       useraddress.value,
//       time + 60,
//       { value: newtotal }
//     ).then(async (res: any) => {
//       await res.wait();
//       create_show.value = false;
//       Toast.clear();
//       Toast.success(t('overall.spSucceed'));
//       onClickLeft();
//     }).catch((e: any) => {
//       console.log(e);
//       Toast.clear();
//       create_show.value = false;
//       Toast.fail(t('overall.spFailed'));
//     });
//   } else {
//     router.push("/business?searchKey=" + nftdetails.value.contractAddr);
//   }
// };

// let sortShow = ref(false)
let sortList = reactive([
  {
    id: 0,
    name: "最近上市",
    // i18n: "browse.Low_price_first",
    check: false
  },
  {
    id: 1,
    name: "价格升序",
    // i18n: "browse.High_price_first",
    check: false

  },
  {
    id: 2,
    name: "价格降序",
    check: false,
    // i18n: "browse.High_price_first",
  },
])


let check = (id1: number) => {
  seachData.param.sortUn = id1;
  if (id1 == null) {
    seachData.current = 1
    getMarketList();
    sortList.forEach(val => {
      val.check = false
      if (val.id == id1) {
        val.check = true
      }
    });
  } else {
    sortList.forEach(val => {
      val.check = false
      if (val.id == id1) {
        val.check = true
      }
    });
    marketList.value = []
    seachData.current = 1
    seachData.param.sort = seachData.param.sortUn;
    let test = /^[0-9]+([.][0-9]{1,})?$/;
    if (
      (seachData.param.priceEndUn != "" && seachData.param.priceStartUn === "") ||
      (seachData.param.priceEndUn === "" && seachData.param.priceStartUn != "")
    )
      return Toast.fail(t('overall.minandmax'));
    if (test.test(seachData.param.priceEndUn) && test.test(seachData.param.priceEndUn)) {
      if (seachData.param.priceEndUn > seachData.param.priceStartUn) {
        seachData.param.priceStart = seachData.param.priceStartUn;
        seachData.param.priceEnd = seachData.param.priceEndUn;
      }
      if (seachData.param.priceEndUn < seachData.param.priceStartUn) {
        seachData.param.priceStart = seachData.param.priceEndUn;
        seachData.param.priceEnd = seachData.param.priceStartUn;
      }
    }
    getMarketList();
    updatescreen_type();
  }

}
// const confirm = () => {

//   // reset();
// };

interface Type {
  code: number;
  msg: string;
  rows: [];
  total: number;
}

onMounted(async () => {
  getData();
});
// 刷新
let rotate = ref(false);
let Loading: any = ref(null);
let timer: any = ref(null);
const start = () => {
  seachData.current = 1
  updatescreen_type()
  if (timer.value) {
    clearTimeout(timer.value);
  }
  seachData.param.sort = seachData.param.sortUn = 0;
  marketList.value = []
  getData();
  rotate.value = true;
  timer.value = setTimeout(() => {
    rotate.value = !rotate.value;
  }, 1000);
};

// 遮罩层
let overlay = ref(false);
// 币种
let dropdown = ref(["bnb"]);
defineProps({
  top: {
    type: String as unknown as PropType<string>,
    default: () => "1.25rem",
  },
  width: {
    type: String,
    default: "90%",
  },
});
let loadingInstance: any;

// const onLoad = () => {
//   setTimeout(() => {
//     // loading.value=true
//     getData();
//   }, 1000)

// };
const getData = () => {
  loading.value = true
  finished.value = false;
  // loadingInstance = ElLoading.service({
  //   lock: true,
  //   text: t("overall.Loading"),
  //   background: 'rgba(0, 0, 0, 0.7)',
  // })
  getTokenList({}).then(async (res: unknown | Type) => {
    console.log((res as Type).rows);
    getMarketList(loadingInstance);
  }).catch(e => {
    console.log(e);
    loading.value = false;
    loadingInstance && loadingInstance.close();
  })
};

let marketList = ref<any>([]);

const getMarketList = (loadingInstance?: any) => {
  // loading.value=true
  getNftListByMarket(seachData)
    .then((res: any) => {
      console.log(res);
      loading.value = true
      marketList.value.push(...res.rows)
      console.log(marketList);
      
      seachData.current++
      // marketList.value = res.rows;
      loading.value = false;
      loadingInstance && loadingInstance.close();
      if (res.rows.length < seachData.size) {
        finished.value = true
      }
      // reset()
    })
    .catch((e) => {
      console.error(e);
      loading.value = false
      loadingInstance && loadingInstance.close();
    });
};
// const sortList = [
//   {
//     id: 1,
//     name: "低价优先",
//     i18n: "browse.Low_price_first",
//   },
//   {
//     id: 2,
//     name: "高价优先",
//     i18n: "browse.High_price_first",
//   },
// ];
// const count = ref(0)
const load = () => {
  getMarketList();
}
// let main = ref(null)
// let scroll = async()=>{
//   console.log('=======');
// }
// scroll()
let seachData = reactive({
  param: {
    sort: 0, //排序：0,时间 1，低价优先；2，高价优先"
    sortUn: 0, //排序：0,时间 1，低价优先；2，高价优先"
    priceStart: "", //起始价格
    priceStartUn: "", //起始价格
    priceEnd: "", //结束价格
    priceEndUn: "", //结束价格
    transactionType: "", //"交易类型：0，买；1，卖"
    status: "", //"状态：0，未成交；1，已成交"
    currency: "BNB",
    currency_img: getPath("@/assets/img/WBNB.png"),
    contractAddr: route.query.contractAddr || "",
  },

  current: 1,
  size: 10

});
const switchprice = (id: number) => {
  seachData.param.sortUn = id;
};
// 重置
const reset = () => {
  seachData.param.sort = 1;
  seachData.param.sortUn = 1;
  seachData.param.priceStart = "";
  seachData.param.priceStartUn = "";
  seachData.param.priceEnd = "";
  seachData.param.priceEndUn = "";
  seachData.param.currency_img = getPath("@/assets/img/WBNB.png");
  seachData.param.currency = "BNB";

  // getMarketList();
  // updatescreen_type()
};


const option1 = computed(() => [
  { text: t("browse.Recently_listed"), value: 0 },
  { text: t("browse.Low_price_first"), value: 1 },
  { text: t("browse.High_price_first"), value: 2 },
]);
const options2 = [{ text: "bnb", value: "a" }];
const item = ref<HTMLDivElement | any>(null);
const value = ref(0);
// 确定
const onConfirm = () => {
  item.value?.toggle();
};
const gonftdetails = (id: number, type: string): void => {
  router.push("/browse/nftdetails?nftId=" + id + '&type=' + type);
};

const options = [
  {
    value: "BNB",
    label: "BNB",
    img: getPath("@/assets/img/WBNB.png"),
  },
  {
    value: "USDT",
    label: "USDT",
    img: getPath("@/assets/img/USDT-icons.png"),
  },
  {
    value: "WBNB",
    label: "WBNB",
    img: getPath("@/assets/img/WBNB.png"),
  },
  {
    value: "ETH",
    label: "ETH",
    img: getPath("@/assets/img/WETH-icons.png"),
  },
];
const updateAccount = (val: string): void => {
  let obj = options.find((item) => item.value === val);
  seachData.param.currency_img = obj?.img;
};

const prohibited = (e: any) => {
  let evt = e || event;
  let code = evt.keyCode || evt.which;
  if (code < 48 || code > 57) {
    return false;
  }
  seachData.param.priceStartUn = seachData.param.priceStartUn.toString();
  seachData.param.priceEndUn = seachData.param.priceEndUn.toString();
  // if (seachData.priceStartUn.includes(".")) {
  //   let priceStartUn = seachData.priceStartUn.split(".");
  //   seachData.priceStartUn = priceStartUn.join("");
  // }
  if (seachData.param.priceStartUn.includes("-")) {
    let priceStartUn = seachData.param.priceStartUn.split("-");
    seachData.param.priceStartUn = priceStartUn.join("");
  }
  if (seachData.param.priceEndUn.includes("-")) {
    let priceEndUn = seachData.param.priceEndUn.split("-");
    seachData.param.priceEndUn = priceEndUn.join("");
  }
  // if (seachData.priceEndUn.includes(".")) {
  //   let priceEndUn = seachData.priceEndUn.split(".");
  //   seachData.priceEndUn = priceEndUn.join("");
  // }
};
let search = () => {
  let test = /^[0-9]+([.][0-9]{1,})?$/;
  if (
    (seachData.param.priceEndUn != "" && seachData.param.priceStartUn === "") ||
    (seachData.param.priceEndUn === "" && seachData.param.priceStartUn != "")
  )
    return Toast.fail(t('overall.minandmax'));
  if (test.test(seachData.param.priceEndUn) && test.test(seachData.param.priceEndUn)) {
    if (seachData.param.priceEndUn > seachData.param.priceStartUn) {
      seachData.param.priceStart = seachData.param.priceStartUn;
      seachData.param.priceEnd = seachData.param.priceEndUn;
    }
    if (seachData.param.priceEndUn < seachData.param.priceStartUn) {
      seachData.param.priceStart = seachData.param.priceEndUn;
      seachData.param.priceEnd = seachData.param.priceStartUn;
    }
  }
  marketList.value = []
  getMarketList();
  updatescreen_type();
  reset()
}
</script>


<style lang="scss" scoped>
// body,html{
//   height: 100%;
// }select
.infinite-list {
  width: 81%;
  height: 100vh;
  padding: 0;
  margin: 0;
  list-style: none;
  scrollbar-width: none !important;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}

:deep(.el-menu) {
  background-color: #101010 !important;
  border-right: none;
  width: 360px !important;
}

:deep(.el-sub-menu__title){
  &:hover {
    background-color: rgba(0, 0, 0, 0) !important;
  }
}

:deep(.el-menu-item) {
  margin-left: 8px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: rgba(0, 0, 0, 0) !important;
  }
}

:deep(.el-select) {
  .el-input.is-focus .el-input__wrapper{
    box-shadow: none !important;
    &:hover {
      box-shadow: none !important;
      border: none;
    }
  }
}

:deep(.el-input__wrapper) {
  width: 72px;
  height: 32px;
  border-radius: 10px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: Roboto;
  border: 1px solid rgba(187, 187, 187, 1);
  background-color: rgba(0, 0, 0, 0) !important;
  border: none !important;
  box-shadow: none;
}

:deep(.el-input--small) {
  width: 80px !important;

}

:deep(.section) {
  .select-trigger{
    border: none !important;
    background-color: rgba(0, 0, 0, 0) !important;
  }
}

:deep(.el-input){
  .el-input--small .is-disabled .el-input--suffix{
    border: none !important;
  }
}

.right {
  margin-left: 12px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 72px;
    height: 32px;
    border-radius: 10px;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-family: Roboto;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: rgba(0, 0, 0, 0) !important;
    box-shadow: none;
    text-align: center;
  }
}


.section {
  // width: 100%;
  // height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  // margin-bottom: 5px;
  :deep(.select-trigger) {
    margin-bottom: 3.5px;
    width: 72px !important;
    height: 32px !important;
    border-radius: 10px !important;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-family: Roboto;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: rgba(0, 0, 0, 0) !important;
  }
}

.sidebar {
  padding: 31px 0 0 39px;
  width: 352px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansSC-regular;

  div {
    margin-bottom: 36px;
    cursor: pointer;
  }

  .default {
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    text-align: left;
    font-weight: 700;
    font-family: PingFangSC-regular;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sort {
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }



  .select{
    // // clip:rect(2px 90px 30px 2px);
    // border: none;、
    width: 100px;
  }
  :deep(.el-select) {
    border: none !important;

  }
}

.dialog-header {
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  font-weight: 700;
  font-family: SourceHanSansSC-bold;
  padding-bottom: 0 !important;
}

:deep(.confirm) {
  width: 413px;
  height: 65px;
  border-radius: 20px;
  background-color: rgba(22, 132, 252, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}

.contenr {
  height: 49px;
  line-height: 49px;
  color: rgba(16, 16, 16, 1);
  border-bottom: 1px solid rgba(187, 187, 187, 0.4);
  font-size: 14px;
  font-family: PingFangSC-regular;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  margin: 0 9px;

  img {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }

  span {
    font-weight: 400;
    color: rgba(16, 16, 16, 1);
    font-family: PingFangSC-regular;
  }
}



.main {
  width: 90%;
  margin: 0 auto;
  margin-top: 9px;
  // padding: 0 20px;
  // width: v-bind(width);
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  margin-bottom: 0.1rem;
  display: grid !important;
  grid-template-columns: 17.5% 17.5% 17.5% 17.5% 17.5%;
  grid-column-gap: 1.875%;

  @media screen and (max-width: 2030px) {
    //400 * 4 + 160 = 1760
    grid-template-columns: 23.5% 23.5% 23.5% 23.5%;
    grid-column-gap: 2%;
  }

  @media screen and (max-width: 1630px) {
    //400 * 3 + 160 = 1360
    grid-template-columns: 32% 32% 32%;
    grid-column-gap: 2%;
  }

  @media screen and (max-width: 1330px) {
    //400 * 2 + 160 = 960
    grid-template-columns: 48% 48%;
    grid-column-gap: 4%;
  }

  .btn {
    height: 47px;
    width: 100%;
    border-radius: 0px 0px 10px 10px;
    background-color: rgba(22, 132, 252, 1);
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    font-family: Microsoft Yahei;
    line-height: 47px;
  }

  .box {
    width: 100%;
    height: 458px;
    padding: 13px 0 0;
    border: 2px solid #2b2b2b;
    border: 1px solid rgba(187, 187, 187, 1);
    border-radius: 10px;
    margin-bottom: 15px;
    margin-right: 15px;
    color: rgba(16, 16, 16, 1);
    background-color: #FFFFFF;

    img {
      width: 100%;
      height: 100%;
    }

    .imgBox {
      width: 100%;
      height: 300px;
      padding: 0 19px;
      border-top-left-radius: 0.26rem;
      border-top-right-radius: 0.26rem;
    }

    .bottom {
      padding: 18px 19px 0px;
      height: 98px;
      text-align: left;
      font-size: 16px;

      >div:nth-of-type(1) {
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .Price {
        display: flex;
        // justify-content: space-between;
        margin-top: 22px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        justify-content: space-between;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
        }

        >div {
          margin-right: 0.15rem;
        }
      }
    }
  }
}
</style>