<template>

    <div class="main">
      <!-- v-for="(item, index) in marketList"  :key="'marketList' + index"-->
      <div class="box" v-for="(item, index) in nftlist.data" :key="index">
        <div class="imgBox"  @click="gonftdetails(item.nftId, '1')">
          <!-- <img :src="item.nftImage" v-if="item.nftImage" alt="" />  v-else -->
          <img :src="item.nftImage" v-if="item.nftImage" alt="" />

          <img src="@/assets/img/250250.png" v-else alt="" />
        </div>
        <div class="bottom">
          <div>
            {{ item.nftName }} #{{ item.nftTokenId }}
          </div>
          <div class="Price">
            {{ Number(item.price).toFixed(4) }}
            <img src="@/assets/img/WBNB.png" alt="">
          </div>
        </div>
        <div class="btn" @click="buyNow(item.nftId,'1')">立即购买</div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" width="645px" :align-center="true" :center="true" style="border-radius:30px ;">
      <template #header>
        <span class="dialog-header">
          购买详情
        </span>
      </template>
      <div class="contenr">token ID <span>{{ nftdetails.nftTokenId }}</span></div>
      <div class="contenr">价格 <span>  {{ Number(nftdetails.nftPrice).toFixed(4) }}</span></div>
      <div class="contenr">持有人 <span> {{
              proxy.$filters.addressFilters(nftdetails.nftOwner.toString(), 5, 4)
          }}</span></div>
      <div class="contenr">系列名称 <span>{{ nftdetails.nftContractName }}</span></div>
      <div class="contenr">合约地址 <span  style="color: #5a64e9;"> {{
                proxy.$filters.addressFilters(
                  nftdetails.contractAddr.toString(),
                  5,
                  4
                )
            }}</span></div>
      <div class="contenr">
        <div>版税
          <!-- <van-popover placement="top" :offset="[0,0]"  :show="true">
            <template #reference>
              <van-image width="30%" height="30%" fit="cover" :src="getPath('@/assets/img/questions.png')" />
            </template>
          </van-popover>  -->
          </div>
          <span>{{ nftdetails.creatorIncome ? Number(nftdetails.creatorIncome * 100) : 0 }}%</span></div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="sell2" class="confirm">
              立即购买
            </el-button>
          </span>
        </template>
    </el-dialog>
  </template>


<script lang='ts' setup>
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  inject,
  computed,
  nextTick,
  PropType,

} from "vue";
import { nftrecordType } from "@/utils/type";
import {getPath} from '@/utils'

import { copy } from "@/utils/copy";
import { TransactionType } from "@/utils/type";
import { useRouter, useRoute } from "vue-router";
import { getNftDetail, getNftTransactionHistory, reloadNftMetadata } from "@/api/browse";
import { BigNumber, ethers } from "ethers";
import { initSigner } from "@/utils/thhersUtils";
// import { ElSelect } from 'element-plus';
import { Dialog } from "vant";
import { useI18n } from "vue-i18n";
import LSSVMRouter from "@/utils/contracts/LSSVMRouter.json";
import { buyNftForCurPrice } from "@/api/business";
import { Toast } from "vant";
import { nftdetailsType } from "@/utils/type";
import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";
import NFT from "@/utils/contracts/NFT.json";
import { useStates, useActions } from "@/hooks/userStore";
import numFilters from '@/hooks/userNumFilters'
import { ElLoading } from 'element-plus'
import { anyTypeAnnotation } from "@babel/types";
import {getPath} from '@/utils'
// import { switchChainNoArgs } from '@/utils/DialogSwitchChain'
let { t } = useI18n();
const router = useRouter();
const route = useRoute();
const VanDialog = Dialog.Component;
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
// const name = ref<string>(t('NFTdetails.sell'));
const { proxy } = getCurrentInstance() as any;
const hexAddress: any = inject("hexAddress");
const details = ref(["1"]);
const history = ref(["1"]);
let price_value = ref<string | number>("");
const gonftlist = (): void => {
  router.push("/me/nftlist");
};
let useraddress = ref<string>("");
// tab
const active = ref(0);
const contracts: any = {};
let providers: any, signers: any;
let userBalance: any;
let nftPriceNew: any;
let nftId: any;

const owner = ref<string>("");
let getName = ref<string>('');
let name_title = ref<HTMLParagraphElement | null>(null);
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

const create_show = ref(false);
const nftlist = defineProps({

    data: {
    type: Array as unknown as PropType<nftrecordType[]>,
    default: () => [],
  },
  searchKey:{
    type:String,
    default: "",
  }
})
let sellType = ref<boolean>(false);
  let  buy_show= ref<boolean>(false);
    let  dialogVisible= ref<boolean>(false);
let sellsuccessType = ref<boolean>(false);
const init = async () => {
  await getDataNFT()

  if ((window as any).ethereum) {
    console.log('init')
    //第一步 ----  获取 当前钱包对象 和 provider
    let { provider, address, signer } = await initSigner();
    providers = provider;
    signers = signer;
    useraddress.value = address;
    contracts.LSSVMRouter = new ethers.Contract(
      proxy.$common.LSSVMRouter,
      LSSVMRouter,
      provider
    ).connect(signer);
    try {
      contracts.NFT = new ethers.Contract(
        nftdetails.value.contractAddr,
        NFT,
        provider
      ).connect(signer);
    } catch (e) {
      console.log(e);
    }
    console.log('contracts.NFT', contracts.NFT);
    contracts.NFT.totalSupply()
      .then((res: any) => {
        nftdetails.value.nftCirculation = res;
        console.log("所有数量", res);
      })
      .catch((e: any) => {
        console.log("所有数量", e);
      });

    let owners = await contracts.NFT.ownerOf(nftdetails.value.nftTokenId);
    owner.value = owners;
    console.log("所有者", owner.value);
    console.log("Balance: " + useraddress.value);
    // UserBalance()
    //   providers.getBalance(useraddress.value ).then(async (res: any) =>  {
    // debugger
    //       // 余额是 BigNumber (in wei); 格式化为 ether 字符串
    //       let etherString = ethers.utils.formatEther(res);

    //       console.log("Balance: " + etherString);
    //       });
  }
};


//获取用户地址
const UserBalance = async () => {


  providers.getBalance(useraddress.value).then(async (res: any) => {

    // 余额是 BigNumber (in wei); 格式化为 ether 字符串
    userBalance = ethers.utils.formatEther(res);

    console.log("Balance: " + userBalance);

  });
}


onMounted(() => {

  console.log('1212')
  console.log(nftlist.data)
  console.log('1212')

  let tries = 0;
  setTimeout(function initTimer(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
    else init();
  });
});
const gonftdetails = (id: number, type: string): void => {
    router.push("/browse/nftdetails?nftId=" + id + '&type=' + type);
};
let showView = ref<boolean>(false);
async function getDataNFT() {
  // const loadingInstance = ElLoading.service({
  //   lock: true,
  //   text: t("overall.Loading"),
  //   background: 'rgba(0, 0, 0, 0.7)',
  // })
  let res: any = await getNftDetail(route.query.nftId as unknown as number)
  nftdetails.value = res;
  nftPriceNew = res.nftPrice
  console.log(nftPriceNew)
  showView.value = true;
  // loadingInstance.close();

  if (route.query.type === '1') {
    getName.value = t('NFTdetails.buy')
    console.log(1234564);
  } else {
    if (nftdetails.value.nftOwner.toLocaleLowerCase() === userinfo.value.hexAddress.toLocaleLowerCase()) getName.value = t('NFTdetails.sell')
    else getName.value = t('NFTdetails.buy')
  }
  let History: any = await getNftTransactionHistory({ nftTokenId: res.nftTokenId, nftContractAddr: res.contractAddr });
  console.log('History', History.rows)
  History.rows.forEach((val: any) => {
    nftdetails.value.transactionHistoryVOList.push({ ts: val?.txHash ? val?.txHash : '--', price: val?.nftPrice ? val?.nftPrice : '--', time: val?.createTime ? val?.createTime : '--' })
  })
  nextTick(() => {
    let text = (name_title.value as HTMLParagraphElement).innerHTML;
    if (text.length > 15) (name_title.value as HTMLParagraphElement).style.width = '3rem';
  })
}
const sell2 = async () => {
  dialogVisible.value=false
  console.log(nftPriceNew);
  let userBalance = await providers.getBalance(useraddress.value)
  console.log(ethers.utils.formatUnits(userBalance, 18) + 'bnb余额');


  if (
    nftdetails.value.nftOwner.toLocaleLowerCase() !=
    userinfo.value.hexAddress.toLocaleLowerCase() || route.query.type === '1'
  ) {

    // if (nftdetails.value.nftOwner.toLocaleLowerCase() != owner.value.toLocaleLowerCase()) return Toast.fail("购买失败");
    //没有登录
    if (!userinfo.value.isLogin || !useraddress.value || !signers || !providers) return Toast.fail(t("overall.logTips"));
    if (nftPriceNew > ethers.utils.formatUnits(userBalance, 18)) {
      Toast.fail(t("overall.Balance"));
      return
    }
    create_show.value = true;
    Toast.loading({
      message: t('overall.Purchasing') + "...",
      forbidClick: true,
      loadingType: "spinner",
      duration: 0,
    });
    let time = Date.parse(new Date() as unknown as string) / 1000;
    let arr: any = [[nftdetails.value.poolAddr, [nftdetails.value.nftTokenId]]];
    // 合约
    let contract_total = 0;
    try {
      contracts.LSSVMPairETH = new ethers.Contract(
        nftdetails.value.poolAddr,
        LSSVMPairETH,
        providers
      ).connect(signers);
    } catch (e) {
      console.log(e);
      Toast.clear();
      create_show.value = false;
    }
    let res2 = await contracts.LSSVMPairETH.getBuyNFTQuote(1);
    console.log("res2", res2);
    contract_total += Number(ethers.utils.formatUnits(res2[3], 18));
    console.log("contract_total", contract_total);
    contract_total = Number(contract_total) > Number(nftdetails.value.nftPrice) ? Number(contract_total) : Number(nftdetails.value.nftPrice)
    let newtotal = ethers.utils.parseUnits((contract_total * 1.01).toFixed(18), 18);
    console.log(arr, useraddress.value, useraddress.value, time + 60, {
      value: newtotal,
    });
    console.log(121212)

    try {
      // let res:any =  await ethers.utils.poll(()=>contracts.LSSVMRouter.swapETHForSpecificNFTs(
      //   arr,
      //   useraddress.value,
      //   useraddress.value,
      //   time + 60,
      //   { value: newtotal }
      // ),{timeout:20000})
      let res: any = await contracts.LSSVMRouter.swapETHForSpecificNFTs(
        arr,
        useraddress.value,
        useraddress.value,
        time + 60,
        { value: newtotal }
      )
      await res.wait();
      create_show.value = false;
      Toast.clear();

      // Toast.success(t('overall.spSucceed'));
      onClickLeft();
    } catch (e) {
      console.log(e);
      Toast.clear();
      create_show.value = false;
      Toast.fail(t('overall.spFailed'));
    }
  } else {
    router.push("/business?searchKey=" + nftdetails.value.contractAddr);
  }
};

function sell(){
  // switchChainNoArgs(sell2,userinfo.value.isLogin,useraddress.value || String(userinfo.value.hexAddress))
}

const confirmsell = (): void => {
  console.log(123);
  sellsuccessType.value = true;
};

const updateAccount = (val: string): void => {
  let obj = options.find((item) => item.value === val);
  currency_img.img = obj?.img;
};
let currency = ref<string>("USDT");
let currency_img = reactive({ img: getPath("@/assets/img/USDT-icons.png") });
const options = [
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
  {
    value: "BNB",
    label: "BNB",
    img: getPath("@/assets/img/WBNB.png"),
  },
];
const Transaction = reactive<TransactionType[]>([
  { ts: "123132", price: "1BNB", time: "2022/08/12 10:57" },
  { ts: "123132", price: "1BNB", time: "2022/08/12 10:57" },
  { ts: "123132", price: "1BNB", time: "2022/08/12 10:57" },
  { ts: "123132", price: "1BNB", time: "2022/08/12 10:57" },
  { ts: "123132", price: "1BNB", time: "2022/08/12 10:57" },
  { ts: "123132", price: "1BNB", time: "2022/08/12 10:57" },
]);

const themeVars = {
  navBarIconColor: "#101010",
  navBarTextColor: "white",
};

const onClickLeft = () => {
  buy_show.value=true

};
const onClickLeft_1= () => {
  router.go(-1);
}
const submit= () => {
  router.go(-1);
}
let rotate = ref(false);
let timer: any = ref(null);
const start = () => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  // address:'0xaE1f4307758ef9ae5b14d31f9258E9FEE180EE4E',
  //   tokenId:'3129'
  let data = {
    address: nftdetails.value.contractAddr,
    tokenId: nftdetails.value.nftTokenId
  }
  reloadNftMetadata(data).then((res: any) => {
    if (res.code == 200) {
      Toast(t('overall.renew'));

    }
  })
  //  console.log('http://13.229.120.156:3000/nftsAPi/reloadNftMetadata?address='+nftdetails.value.contractAddr+"&tokenId="+nftdetails.value.nftTokenId)
  // var obj = {  address:'0xaE1f4307758ef9ae5b14d31f9258E9FEE180EE4E',
  //   tokenId:'3129'}; //要传的参数
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('GET', 'http://13.229.120.156:3000/nftsAPi/reloadNftMetadata?address='+nftdetails.value.contractAddr+"&tokenId="+nftdetails.value.nftTokenId,true);
  //   xhr.send(JSON.stringify(obj));//这里要是没有参数传，就写null
  //   xhr.onreadystatechange = function () {
  //       if (xhr.status === 200 && xhr.readyState === 4) {
  //           //js处理数据
  //           Toast(t('overall.renew'));
  //       }
  //     }


  // axiosGet('/v1/pair-kline',data)
  // seachData.sort = seachData.sortUn = 0;
  // getData();
  rotate.value = true;
  timer.value = setTimeout(() => {
    rotate.value = !rotate.value;
  }, 1000);
};
 const  buyNow= async (item,val) => {
    proxy.$router.push({
          path: "/business",
          query: { nftId: item,  type:val,searchKey:nftlist.searchKey }
      })
      dialogVisible.value=true
     await getDataNFT()
   }
</script>
  <style lang="scss" scoped>

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
    margin: 0 auto;
    margin-top: 9px;
    // padding: 0 20px;
    // width: v-bind(width);
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    margin-bottom: 2rem;
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
