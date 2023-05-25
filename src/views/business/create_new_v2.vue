<template>
  <div class="business_box">
    <search />
    <div class="business">
      <div class="business_new1">
        <div class="business-header">
          <div class="avatar-logo">
            <el-avatar fit="cover" class="business-logo" v-if="nftContract.contractLogo" :src="nftContract.contractLogo" >
              <img src="https://www.superswap.cool/image/profilePhoto/A_236.png"/>
            </el-avatar>
            <el-avatar fit="cover" class="business-logo" v-else src="https://www.superswap.cool/image/profilePhoto/A_236.png" />
            <img width="28" class="business-img" v-if="nftContract.isAuth == 2"
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA51JREFUSEvtl0loE1EYx//fNNPMtGPS2B5E64ZSEBRxPYjg1mL1ZlXc8CS4b61V0SqKWBfcFxTFg5dSt+rFSwy1Rw9K3REFF7QKYmKbdmqsSfzkjZl2pk2aidabc33z3u/9v/d9//c9wh9+zDwUQBMRxf9kCcp0EjNLAI4GQ/Hy/r4sSBJOAThPRC8zWSsjMDMPB7Ax0BDZXHNdh6oQpkxWsHBeLhQ3jSai507hjsHMPALA+tob+mZ/fQTRGHcySmaoWDJfgzsDeFIwM68CsAbAGAAitMYnVAbu2qHmmAVuFd0sjgHAXiKKWgd6gJm5+N37WODC5VZ8aIqBu4Q5jWLnf7k5hBXLPZg4zo2sLGRb4cnAdSfPh8saH3Ug/jNjVo8JikI4Xp0Pr0caQESfzR+Sgb+sLg8WtOl9QE1Qzh4pgC9PKiSij//BRgSYeSSAe/8o1GOI6FmPUCeg62uu6ZvuNEQQs9TpptVeTBCZKQGnL4TxoNGeeIMHubBrax60XAkfPsaw/0gL9PauHCmZrmLxAk2YTCfcSC5mlgEcqrmmV3SHivGcHMKJA/nGwu+bxMLNaP/WVWcbVnowabwiSgZnLrbifuN3xLs5uAGfr0FRaCwRPTHB+/z1kd1X6nT8iCYv3GULNZTMVCG7yKZ6SKELVZW/1T580oFzl1rxLZJ8jVnTVCwVyhXymOC0JZRK9cZVXtMgsOdgM16/jaY0HcVNOFadjzyvNJCYediXUPxt1b6vtvAls47Zs1QsLtOQnU04cS6MYCiOnVt8EA6VTq253p7tPhSNlKeaiqv99ZGdvYXaPGvhQv00Ca9eR9HRwRhVJMPlIqyrDKIl3LvpLJqnobRERbZMObbk8tdHKtLBx491Y+0KD1S1y/Rq63QYN1aK/BCbXlSmobTYgPqIqKVztpnZ6eAirDsqfBg2xAUiGIm0pSqE1rbUagV0TrEKWaY8IgqLjdi8OgH/lM5ArKprb+jwi6uyF7V96tXla70oyM/CgWP2mk6WlH0KLhohi44DL15FbS73z8GZ3NROFfdpI1A4yIXdwtk0qYCIQr3dx8Vv3sUCt2634/HTv+tCMmp9EpdGaaLZmwvAZe5SZO/Vm7phHN0/0WUKZ5NlW6E4b/ZSnR0ziw0cDDREKoVhWOEWqIeI2pycv+O+OhEJ0eoetsKXLNAwW9xaMjmG9jAQJztNPGEOB0PxysQTRvTN24hIdzI/ZXI5nfy3j7ZfvezyjGOz3EUAAAAASUVORK5CYII=' />
          </div>
          <div class="business-header-new">
            <div class="business-flex" v-if="nftContract.contractName">
              <div class="title" v-if="nftContract.name"> {{ nftContract.name }} ({{ nftContract.contractName }})</div>
              <span v-else class="title"> {{ nftContract.contractName }}</span>
              <div class="business-flex newFlex" v-if="nftContract.contractAddr">
                <div class="title" style="font-size: 12px;color: #353945;font-weight: 500;"> {{
                    proxy.$filters.addressFilters(nftContract.contractAddr, 6, 4)
                }}</div>
                <img width="15" height="13" class="business-img" style="cursor: pointer;"
                  @click.stop="copy(nftContract.contractAddr)" src='../../assets/img/copy_2.png' />
              </div>
            </div>
            <div>
              <div class="business-right" style="display:flex;align-items: center;">
                <img width="20" height="20"
                  v-if="nftContract.twitterUrl && nftContract.isAuth == 2 || nftContract.twitterUrl && nftContract.isAuth == 1"
                  style="cursor: pointer;" @click="opnes(nftContract.twitterUrl)"
                  src="../../assets/img/business_icon.png" />
                <img width="20" height="20"
                  v-if="nftContract.officialUrl && nftContract.isAuth == 2 || nftContract.officialUrl && nftContract.isAuth == 1"
                  style="cursor: pointer;" @click="opnes(nftContract.officialUrl)"
                  src="../../assets/img/business_icon2.png" />
                <div v-if="nftContract.officialUrl && nftContract.twitterUrl && nftContract.isAuth == 2">
                  <img width="20" height="20" src="../../assets/img/business_icon3.png" />
                  <span style="color: #353945;">{{ Number(nftContract.royaltyFee) * 100 || 0 }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if='nftContract.description && nftContract.isAuth == 1 || nftContract.description && nftContract.isAuth == 2'>
        <div class="business-Introduction" v-if="textShow_1">
          {{ nftContract.description || "No Description" }}
        </div>
        <div class="business-Introduction2" v-if="textShow">
          {{ nftContract.description || "No Description" }}
        </div>
        <span v-if='textShow_1 && nftContract.description.length > 15' @click="moreText()"
          style="color: #3B82F6;cursor: pointer;">{{ $t('overall.Showmore') }}</span>
        <span v-if='Showmore_1 && nftContract.description.length > 15' @click="moreText_1()"
          style="color: #3B82F6;cursor: pointer;">{{ $t('overall.Stow') }}</span>
      </div>
      <div class="business-item">
        <div>
            <div class="business-list" v-for="key in Object.keys(pricelist)" :key="key">
            <div class="Floor"> {{ $t(`Home.${key}`) }}</div>
            <div style="display:flex">
              <img width="16" src="../../assets/img/chain_2.png" style="object-fit: contain;" />
              <div class="price"> {{
                  Number(pricelist[key]).toFixed(4) == "null"
                    ? 0
                    : Number(pricelist[key]).toFixed(4)
              }}</div>
            </div>
        </div>
        </div>
      </div>
      <div class="content-all">
        <!-- 我的池子 我的成交 全网成交 -->
        <div class="content_new">
          <aside>
            <div class="make">
              <div class="make-btn" :class="{active:queryData.type == 1}" @click="createPool(1)">
                <span>{{ $t('business.CreatingBuying') }}</span>
              </div>
              <div class="make-btn" :class="{active:queryData.type == 2}" @click="createPool(2)">
                <span>{{ $t('business.CreatingSelling') }}</span>
              </div>
              <div class="make-btn" :class="{active:queryData.type == 3}" @click="createPool(3)">
                <span>{{ $t('business.CreatingTrading') }}</span>
              </div>
            </div>
            <createpond_v2 />
          </aside>
          <div>
            <!-- 表格 -->
            <div style="margin-top:20px;">
              <div class="business-table-title">
                <h2>{{$t('business.priceFixingorder')}}</h2>
                <router-link 
                  :to="`/business`">
                   {{$t('business.Orders')}}&nbsp;
                    <el-icon><DArrowRight /></el-icon>
                  </router-link>
                <div class="line"></div>
              </div>
              <czTable style="margin-top:20px;" :data="Mypool" :active="11" :contractLogo='nftContract.contractLogo'></czTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  ref,
  reactive,
  computed,
  getCurrentInstance,
  onMounted,
  inject,
  onUnmounted,
  watch,
  onActivated,
  provide
} from "vue";

import { nftrecordType } from "@/utils/type";
import { useRoute } from "vue-router";
import czTable from "@/components/czTable.vue";
import search from "@/components/search.vue";
import { useI18n } from "vue-i18n";
import { ethers } from "ethers";
import LSSVMRouter from "@/utils/contracts/LSSVMRouter.json";
import { copy } from "@/utils/copy";
import {
  getNftContractHandicap,
} from "@/api/business";
import { getMyTransaction } from "@/api/my";
import { getMyNft, getMyPoolList } from "@/api/my";
import { useStates } from "@/hooks/userStore";
import { initSigner } from "@/utils/thhersUtils";
import { mynftType } from "@/utils/type";
import NFT from "@/utils/contracts/NFT.json";
import Factory from "@/utils/contracts/Factory.json";
import AggregationJSON from "@/utils/contracts/Aggregation.json";
import "@/assets/css/vant2.scss"
import numFilters from '@/hooks/userNumFilters'
import { getNftTop } from "@/api/home";
import { subS, mulS } from "@/utils/bignumberMath";
import { filterLogin } from '@/utils/DialogSwitchChain'
import createpond_v2 from './createpond_v2.vue'
import { DArrowRight } from '@element-plus/icons-vue'
let ConnectWallet = ref<boolean>(false)
const { proxy } = getCurrentInstance() as any;
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
const route = useRoute();
let { t } = useI18n();

let queryData = reactive<any>({
  searchKey: proxy.$common.DefaultUrl,
  type: 1,
  floorPrice: '',
})
if (route.query.searchKey) queryData.searchKey = route.query.searchKey;
provide('queryData', queryData)

const textShow_1 = ref(true);
const textShow = ref(false);
const Showmore_1 = ref(false);
const Showmore = ref(false);
const moreText = () => {
  textShow.value = true
  textShow_1.value = false
  Showmore.value = false
  Showmore_1.value = true
}
const moreText_1 = () => {
  textShow.value = false
  textShow_1.value = true
  Showmore.value = true
  Showmore_1.value = false
}

// 当前委托
let Mypool = ref<nftrecordType[]>([]);

let pricelist = reactive<any>({
  floorPrice: 0,
  highestOffer: 0,
  totalPrice: 0,
  totalTransaction: 0,
});
provide('pricelist', pricelist)
let nftContract = reactive<any>({
  contractAddr: "",
  contractCreate: "",
  contractLogo: "",
  contractName: "",
  description: "",
  circulation: 0,
  isAuth: 0,
  officialUrl: '',
  twitterUrl: '',
  royaltyFee: '',
  name: ''
});

provide('nftContract', nftContract)

let transactionDepth = reactive<any>({
  sellOrderCount: 0,
  sellTotalPrice: 0,
  buyOrderCount: 0,
  buyTotalPrice: 0,
});

let useraddress = ref("");
let authorization = ref(false);

const contracts: any = {};

let sellOrders = ref<any[]>([]);
let sellOrdersAll = ref<any>([]);
let timeType = ref<any>("");
const hexAddress: any = inject("hexAddress");
// 路由上的盘口与默认盘口
const searchKey = reactive<any>({
  value: '',
});

onMounted(async () => {
  searchKey.value = route.query.searchKey
  await getNftTopList()
  let tries = 0;
  setTimeout(function initTimer(): void {
    //@ts-ignore
    if (!userinfo.value.hexAddress && ++tries < 50) return setTimeout(initTimer, 100);
    else init();
  });
  timeType.value = setInterval(() => {
    getDate();
  }, 30000);
});
onActivated(async () => {
  searchKey.value = route.query.searchKey
  await getNftTopList()
  let tries = 0;
  setTimeout(function initTimer(): void {
    //@ts-ignore
    if (!userinfo.value.hexAddress && ++tries < 50) return setTimeout(initTimer, 100);
    else init();
  });

  timeType.value = setInterval(() => {
    getDate();
  }, 30000);
})

onUnmounted(() => {
  clearInterval(timeType.value);
});

let type = route.query.type || 2
const getDate = () => {
  localStorage.setItem('chooseNFTAddress', searchKey.value)
  getNftContractHandicap({ searchKey: searchKey.value, type: type })
    .then((res: any) => {
      if (!res.sellOrders) res.sellOrders = []
      console.log(res);
      Object.keys(transactionDepth).forEach((key) => {
        transactionDepth[key] = res.transactionDepth[key];
      });
      Object.keys(nftContract).forEach((key) => {
        nftContract[key] = res.nftContract[key];
      });
      Object.keys(pricelist).forEach((key) => {
        pricelist[key] = res[key];
      });
      pricelist.floorPrice = res.floorPrice
      sellOrdersAll.value = res.sellOrders;
      res.sellOrders = res.sellOrders.sort(
        (a: any, b: any) => a.feePrice - b.feePrice
      );
      for (let i = 0; i < 5; i++) {
        sellOrders.value[i] = (res.sellOrders && res.sellOrders[i]) || {
          nftTokenId: "--",
          feePrice: "--",
        };
      }
      sellOrders.value.sort((a, b) => a.feePrice - b.feePrice);
      sellOrders.value = sellOrders.value.reverse();
    })
    .catch((e) => {
      console.error(e);
    });
  if (userinfo.value.isLogin) {
    updatepool();
    // 当前系列下我的nft
    console.log("个人中心", userinfo.value.hexAddress);
    console.log("inject", hexAddress.value);
    console.log("当前钱包", useraddress.value);
    getMyNft({
      walletAddr: userinfo.value.hexAddress || hexAddress.value || useraddress.value,
      contractAddr: searchKey.value,
      isSell: 0,
    }).then(async (res: any) => {
      let arr: any = [];
      res.forEach((val: any) => {
        arr.push({
          value: val.nftTokenId,
          label: "#" + val.nftTokenId,
          nftContractAddr: val.nftContractAddr,
          id: val.id,
        });
      });
      options.value = arr;
      console.log(options.value);
    });
  }
};


const options = ref<mynftType[]>([]);
let providers: any, signers: any;
const getNftTopList = async () => {
  if (!localStorage.getItem('address') && !searchKey.value) {
    try {
      let res: any = await getNftTop({})
      if (res) {
        let top = [...JSON.parse(res)];
        searchKey.value = top[0].address
      } else {
        searchKey.value = proxy.$common.DefaultUrl
      }
    } catch (e: any) {
      console.error(e);
      searchKey.value = proxy.$common.DefaultUrl
    }
  }
  else if (!searchKey.value && localStorage.getItem('address')) {
    searchKey.value = localStorage.getItem('address')
  }
  localStorage.setItem('address', searchKey.value)
}

const init = async () => {
  getDate()
  if ((window as any).ethereum && userinfo.value.isLogin) {
    let { provider, address, signer } = await initSigner();
    providers = provider;
    signers = signer;
    useraddress.value = address;
    contracts.LSSVMRouter = new ethers.Contract(
      proxy.$common.LSSVMRouter,
      LSSVMRouter,
      provider
    ).connect(signer);

    contracts.Factory = new ethers.Contract(
      proxy.$common.Factory,
      Factory,
      provider
    ).connect(signer);

    contracts.Aggregation = new ethers.Contract(
      proxy.$common.Aggregation,
      AggregationJSON,
      provider
    ).connect(signer);
    try {
      contracts.NFT = new ethers.Contract(
        searchKey.value as string,
        NFT,
        provider
      ).connect(signer);
    } catch (e) {
      console.log(e);
    }

    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );
    authorization.value = res || false;
    console.log("authorization", authorization.value);
  }
};

const updatepool = () => {
  getMyPoolList({ contractAddr: searchKey.value }).then(async (res: any) => {
    let old_nft_list2: nftrecordType[] = [];
    for (const val of res) {
      let amount = val.tokenAmount;
      if (val.poolType == 2) {
        amount
        try {
          amount = await providers.getBalance(val.poolAddr)
        } catch (e) {
          amount = null;
        }
        if (amount) amount = ethers.utils.formatUnits(amount, 18)
        console.log('合约与接口token', amount, val.tokenAmount, val.poolAddr, val.curAmount)
      }
      old_nft_list2.push({
        id: val.id,
        series: val.nftContractName || "--",
        time: val.createTime,
        price: val.poolType == 2 || val.poolType == 1 ? Number(val.curAmountBySell) : Number(val.curAmountByBuy),
        Pooltype: val.poolType + "",
        type: val.status === 0 ? true : false,
        Token: amount ? numFilters(amount) : numFilters(val.tokenAmount),
        quantity: val.buyNftCount || 0,
        NFT_quantity: val.sellNftCount || 0,
        curvetype: val.rateType === 0 ? false : true,
        curvetquantity:
          val.rateType === 1
            ? proxy.$filters.numFilters5(mulS(subS(val.delta, 1), 100)) + "%"
            : val.delta,
        Service: proxy.$filters.numFilters5(val.fee * 100) + "%",

        poolAddr: val.poolAddr,
        nftContractAddr: val.nftContractAddr,

        sellNftCount: val.sellNftCount,

        buyAmount: val.curAmountByBuy
      });
    }
    Mypool.value = old_nft_list2;
    Mypool.value.forEach((val) => {
      val.time = val.time.replace(/-/g, "/").substring(0, 16);
    });
  });
};
const createPool = (type: any) => {
  if (!userinfo.value.isLogin) return ConnectWallet.value = true
  if (filterLogin(userinfo.value.isLogin, useraddress.value || String(userinfo.value.hexAddress))) {
    queryData.type = type;
    queryData.searchKey = searchKey.value;
  }
}
let businesslist_type = ref(1);
const opnes = (url: string) => {
  open(url);
};

</script>

<style scoped lang="scss">
.content-all{
  width: 100%;
  margin: 20px auto 0; 
  box-sizing: border-box;
  max-width: 1800px;
  background: #fff;
  border-radius: 20px 20px 0 0;
  justify-content: space-between;
}
.business_box {
  background: url(@/assets/img/topView.png) no-repeat;
  background-size: 100% 100%;
  background-size: contain;
  padding-top: 3.646vw;
}

//新加的样式
.business_new1 {
  display: flex;
  justify-content: space-between;
}

.newFlex {
  align-items: center;
  border: 1px solid #EBEEF2;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 12px;
}

.businessNew_list {
  display: flex;
  margin-top: 10px;
  align-items: stretch;
  padding-left: 30px;
  padding-right: 30px;
}

.max_box {
  // background: #fff;
  // background: url(@/assets/img/home_3.png) no-repeat;
  // background-size: 100% 100%;
  // background-size: contain;
}

.business {
  width:80vw;
  max-width: 1800px;
  margin: 0 auto;
  padding: 30px 0px 0px 0px;
  margin-top: 80px;
  .business-header-new{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .main {
    height: 450px;
    position: relative;
    top: 0px;
    margin-left: 35px;
    width: 100%;
  }
  .avatar-logo{
    position: relative;
    .business-img{
      right: 10%;
      bottom: 0;
      position: absolute;
    }
  }

  &-logo {
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }

  &-right {
    margin-left: 20px;

    img {
      margin-right: 15px;
    }

    div img {
      margin-right: 5px;
    }

    span {
      color: #999;
      font-size: 14px;
      position: relative;
      top: -4px;
    }

  }

  &-flex {
    display: flex;
    align-items: center;
  }
  .title {
    font-family: PingFang SC;
    font-weight: bold;
    color: #23262F;
    font-size: 30px;
  }

  &-img {
    object-fit: contain;
    margin-left: 3px;
  }

  &-Introduction2 {
    font-size: 14px;
    font-family: PingFangSC-regular;
    padding-top: 10px;
    //  overflow: hidden;
    // text-overflow: ellipsis;
    width: 50%;
    // white-space: nowrap;
  }

  &-Introduction {
    // color: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-family: PingFangSC-regular;
    padding-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 50%;
    white-space: nowrap;
  }

  &-item {
    display: flex;
    >div{
      display: flex;
      margin-top: 17px;
      border: 1px solid #EBEEF2;
      border-radius: 12px;
      >div{
        padding: 15px 0 15px 15px;
        border-left: 1px solid #EBEEF2;
        &:first-child{
          border-left: none;
        }
      }
    }
  }


  &-list {
    margin-right: 35px;
  }

  .price {
    color: #23262F;
    font-size: 30px;
    padding-left: 5px;

  }

  .Floor {
    color: #777E90;
    font-size: 14px;
    text-align: left;
    padding-top: 3px;
  }

  &-table {
    padding-top: 20px;
    background: #fff;
  }

  .table-list {
    width: 25%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
  }

  .table-flex {
    font-weight: bold;
    color: #777E90;
    font-size: 14px;
    display: flex;
    // justify-content: space-between;
    padding-bottom: 5px;
  }

  .echarts {
    color: #949494;

    span {
      padding-right: 10px;
      cursor: pointer;
      font-weight: 600;
    }
  }

  .buyorder {
    width: 30px;
    height: 20px;
    ;
    line-height: 20px;
    background-color: rgba(24, 159, 122, 1);
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    margin-right: 10px;

    span {
      color: #fff;
    }
  }

  .buyorderSpn {
    color: #949494;
    padding-right: 10px;
    cursor: pointer;
  }

  .activeSpn {
    color: #fff;
  }

  .active {
    color: #fff;
  }

  // 中间部分
  .right {
    width: 25%;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &-flex {
      display: flex;
    }

    &-btn {
      width: 50%;
      height: 45px;
      border-radius: 4px;
      line-height: 45px;
      background-color: rgba(153, 153, 153, 1);
      color: #000;
      font-size: 14px;
      text-align: center;
      font-family: Microsoft Yahei;
      border: 1px solid rgba(187, 187, 187, 1);
      margin-right: 5px;
      cursor: pointer;
    }

    .spn {
      color: #fff;
      background-color: v-bind('businesslist_type===1 ? "#189F7A" : "#FF4848"'
        );

    }

    .right-title {
      font-weight: bold;
      color: #23262F;
      font-size: 16px;
      text-align: left;
      font-family: PingFangSC-regular;
      padding: 10px 0px 10px 0px;
      // padding: 22px 0px 25px 0px;
    }

    &-flex_1 {
      position: absolute;
      right: 10px;
      top: 13px;
      display: flex;

      img {
        width: 15px;
        object-fit: contain;

      }

      div {
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        padding-left: 5px;
      }
    }

    &-footer {
      width: 100%;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
      border-radius: 5px;
      background-color: v-bind('businesslist_type===1 ? "#189F7A" : "#FF4848"'
        );
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      text-align: center;
      font-family: Roboto;
      margin-top: .0938rem
    }
  }

  // 我的成交
  .make {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
    &-btn {
      width: 28%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #838B92;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
    .active{
      background: #F4F7F9;
      border-radius: 4px;
      >span{
        font-size: 16px;
        color: #838B92;
        background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

}

.content_new {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  >aside {
    width: 400px;
  }

  >div {
    flex: 1;
    margin-left: 1.5vw;
    display: flex;
    flex-direction: column;
    .business-table-title{
      width: 100%;
      font-size: 16px;
      border-radius: 20px 20px 0 0;
      box-sizing: border-box;
      max-width: 1800px;
      background: #fff;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      position: relative;
      h2{
        font-size: 20px;
        padding: 5px 20px;
        z-index: 2;
        border-bottom: 2px solid #23262F;
      }
      .line{
        position: absolute;
        height: 2px;
        background: #EEF0F2;
        width: calc(100% - 100px);
      }
      a{
          padding: 0 10px;
          height: 40px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #3B82F6;
          border-radius: 8px;
        
      }
    }
  }
}

@media screen and (min-width: 1280px) {
  .newFlex {
    // width: 790px !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .echarts {
    padding-top: 20px;
  }
}

@media screen and (min-width: 1366px) {
  .newFlex {
    display: flex;
    flex-direction: column;
    justify-content: center;

  }
}

@media screen and (min-width: 1440px) {
  .newFlex {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

  }

  .echarts {
    padding-top: 0px;
  }
}

.more {
  background-color: rgba(244, 247, 249, 1);
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #353945;
  font-family: Roboto;
  // padding: 34px 0px 34px 0px;
  cursor: pointer;
  width: 100px;
  height: 48px;
  border: 1px solid #EEF0F2;
  border-radius: 8px;
  text-align: center;
  line-height: 48px;
  margin-bottom: 30px;
}

.more:hover {
  background: #23262F;
  color: #fff;
}

.newFlex {
  // display: flex;
  //   justify-content: space-between;
}

.left {
  color: #f6465d !important;
}

.right_1 {
  color: #47a182 !important;
}

.el-select__popper.el-popper {
  background: red !important;
}

.newList {
  border-right: 1px solid #EEF0F2;
  padding-right: 30px;
}
</style>
<style lang="scss">
.business .el-tabs--top .el-tabs__item.is-top {
  font-size: 18px;
  color: #777E90;
}

.el-tabs__item.is-active {
  color: #23262F !important;
  font-weight: 600
}

.business .el-input {
  height: 48px;
}

.business .el-select {
  width: 100%;
}

.business .el-input__inner {
  text-align: center;
}

.business .el-tabs__nav-wrap::after {
  background-color: rgba(153, 153, 153, 0.2);
  ;
}

.business {
  .el-table td.el-table__cell {
    border-bottom: 1px solid rgba(153, 153, 153, 0.2) !important;
  }

  .el-table__row {
    height: 80px;
  }

  .el-table__body-wrapper {
    border: 1px solid
  }

  .el-table th.el-table__cell.is-leaf {
    border-bottom: 1px solid rgba(153, 153, 153, 0.2) !important;

  }

  .cell {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #777E90;
  }

  .van-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 5px;
    height: 48px;
  }

  .van-stepper__minus {
    width: 35px;
    height: 30px;

  }

  .van-stepper__input {
    width: 30px;
    height: 30px;
  }

  .van-stepper__plus {
    width: 35px;
    height: 30px;

  }

  .el-table__body-wrapper {
    border: none;

  }

}


.wrapper_1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  &-title {
    display: flex;
    justify-content: space-between;
    text-align: center;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #0F0F0F;
  }

  &-describe {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #B2B2B4;
    padding-top: 15px;
    text-align: center;
  }

  &-btn {
    width: 90px;
    height: 45px;
    background: #FEFEFE;
    border: 1px solid #7C7C7C;
    border-radius: 21px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
  }

  .block {
    width: 400px;
    background: #FFFFFF;
    border-radius: 15px;
    padding: 20px 40px 40px 40px;
  }
}

.make .el-tab-pane {
  padding-left: 30px;
  padding-right: 30px;
}

.el-select-dropdown__wrap {
  max-height: 140px;
}

.footer_btn {
  background-color: rgb(246, 69, 93) !important;
}

.van-overlay {
  background-color: rgba(0, 0, 0, .3) !important;
}

.spinner {
  display: none;
}

// @media screen and (min-width: 1366px){
//      .dateNew{
//        width: 55% !important;
//       }
//   }
// @media screen and (min-width: 1400px){
//      .dateNew{
//        width: 55% !important;
//       }
//   }
//   @media screen and (min-width: 1680px){
//      .dateNew{
//        width: 50% !important;
//       }
//   }
</style>
