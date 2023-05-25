<template>
    <search />
    <div class="home">

      <!-- <div style="height: 100vh;overflow: hidden; cursor: default;"> -->
      <div>
        <div class="box">
          <div class="right">
            <div class="nav-box">
              <img src="@/assets/img/left.png" alt="" @click="router.back()">
              <img :src="nftdetails.contractLogo" alt="">
              {{ nftdetails.name? nftdetails.name+"("+nftdetails.nftContractName+")" : nftdetails.nftContractName}} <img src="@/assets/img/authentication.png"   v-if="item.isAuth==2" alt=""
                v-if="nftdetails.isAuth == 2">
            </div>

            <div class="top">
              <div>{{ nftdetails.nftContractName }}
                <br>
                #{{ nftdetails.nftTokenId
                }}
              </div>
            </div>
            <div class="holder"><span>{{$t('NFTdetails.holder')}}</span>&nbsp;{{ proxy.$filters.addressFilters(
                nftdetails.nftOwner.toString(),
                5,
                4
              )
            }}</div>

            <div class="buy-box" v-if="nftdetails.poolAddr">
              <p>{{$t('NFTdetails.currentPrice')}}</p>
              <p><img src="@/assets/img/chain_2.png" alt="">{{proxy.$filters.numFilters4(poolDeatil.curAmount)}}</p>
              <p>{{$t('Home.floorPrice')}}(ETC)：<img src="@/assets/img/chain_2.png" alt=""><span>{{ proxy.$filters.numFilters4(poolDeatil.floorPrice)  || '--' }}</span></p>
              <!-- <div class="buy-btn" @click="sell"><img src="../assets/img/buyPc1.png" alt="">{{ getName }}</div> -->
              <div>
                <el-button type="primary" loading v-if="loading" class="buy-btn">{{$t('overall.Purchasing')}}</el-button>
                <div v-else class="buy-btn" @click="sell"><img src="@/assets/img/buyPc1.png" alt="">{{ getName }}</div>
              </div>
            </div>
            <div v-else>
              <el-button type="primary" loading v-if="loading" class="buy-btn">{{$t('overall.Purchasing')}}</el-button>
              <div v-else class="buy-btn" @click="sell"><img src="@/assets/img/buyPc1.png" alt="">{{ getName }}</div>
            </div>

            <div class="table-box">
              <p class="title">{{$t('NFTdetails.information')}}</p>
              <div class="line"></div>
              <div class="table-list" v-if="nftdetails.poolAddr">
                <span>{{$t('NFTdetails.poolAddress')}}</span>
                <div class="table-right" style="color:#3B82F6" @click="open1(nftdetails.poolAddr)">
                  <span @click.stop="open(nftdetails.poolAddr)" class="go-pool"> {{$t('NFTdetails.goPool')}}<img src="@/assets/img/forward-icon.png" alt=""> </span>
                {{
                    proxy.$filters.addressFilters(nftdetails.poolAddr.toString(), 5, 4)
                }} </div>
              </div>
              <div class="table-list">
                <span>{{$t('NFTdetails.Contract_address')}}</span>
                <div class="table-right" style="color:#3B82F6" @click.stop="open1(nftdetails.contractAddr)">{{
                    proxy.$filters.addressFilters(nftdetails.contractAddr.toString(), 5, 4)
                }}</div>
              </div>
              <div class="table-list">
                <span>{{ t('NFTdetails.Blockchain') }}</span>
                <div class="table-right">{{ nftdetails.blockChain }}</div>
              </div>
              <div class="table-list">
                <span>{{ t('NFTdetails.Creator_income') }}</span>
                <div class="table-right">{{ nftdetails.creatorIncome ? Number(nftdetails.creatorIncome * 100) : 0 }}%
                </div>
              </div>
              <div class="table-list">
                <span>{{ t('NFTdetails.Protocol_standard') }}</span>
                <div class="table-right">{{ nftdetails.protocolStandard }}</div>
              </div>
              <div class="table-list">
                <span>Token ID </span>
                <div class="table-right">{{ nftdetails.nftTokenId }}</div>
              </div>
            </div>
          </div>

          <div class="left">
            <div class="imgBox">
              <img :src="nftdetails.nftImage" alt="" v-if="nftdetails.nftImage">
              <img src="@/assets/img/550550.png" alt="" v-else>
            </div>
          </div>
        </div>



        <div class="bottom">
          <!-- <czTable :data1="nftdetails.transactionHistoryVOList" :active="9" /> -->
          <div class="bottom-title">{{$t('NFTdetails.Transaction_history')}}</div>
          <el-table :data="nftdetails.partData" style="width: 100%" >
            <template #empty>
              <div></div>
            </template>
            <el-table-column prop="type" :label="$t('my.type')" align="center" width="200">
              <template #default="scope">
                <div v-if="scope.row.type == 1" style="color:#20A886">{{$t('business.purchase')}}</div>
                <div v-if="scope.row.type == 2" style="color:#F05D62">{{$t('business.sellout')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="price" :label="$t('my.price')" align="center">
              <template #default="scope">
                <div class="table-price"><img src="@/assets/img/chain_2.png" alt=""> {{ proxy.$filters.numFilters4(scope.row.price) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('NFTdetails.Sender')" align="center">
              <template #default="scope">
                <div style="color:#3B82F6;cursor: pointer;" @click="open1(scope.row.type == 1 ?scope.row.to:scope.row.from)">{{ scope.row.type == 1 ?
                    proxy.$filters.addressFilters(scope.row.to, 4, 4) : proxy.$filters.addressFilters(scope.row.from, 4, 4)
                }}
                </div>

              </template>
            </el-table-column>
            <el-table-column :label="$t('NFTdetails.Recipient')" align="center">
              <template #default="scope">
                <div style="color:#3B82F6;cursor: pointer;" @click="open1(scope.row.type == 1 ?scope.row.from:scope.row.to)">{{ scope.row.type == 1 ?
                    proxy.$filters.addressFilters(scope.row.from, 4, 4) : proxy.$filters.addressFilters(scope.row.to, 4, 4)
                }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('my.date')" align="center">
              <template #default="scope">
                <div class="table-time" style="color:#3B82F6;cursor: pointer;" @click="open2(scope.row.ts)">{{ setTime(new Date().getTime(), new Date(scope.row.time).getTime()) }} {{
                    $t('browse.ago')
                }} <img src="@/assets/img/time.png" alt=""></div>
              </template>
            </el-table-column>

          </el-table>
          <div class="more" @click="onAddItem"
            v-if="nftdetails.partData.length != nftdetails.transactionHistoryVOList.length">{{ $t('my.Load_more') }}</div>

        </div>

      </div>

    </div>
    <Bottom></Bottom>
  </template>


  <script lang='ts' setup>
  import {
    ref,
    reactive,
    onMounted,
    getCurrentInstance,
    inject,
    computed,
    nextTick
  } from "vue";
  import { copy } from "@/utils/copy";
  import { TransactionType } from "@/utils/type";
  import { useRouter, useRoute } from "vue-router";
  import { getNftDetail, getNftTransactionHistory, reloadNftMetadata, poolDetail } from "@/api/browse";
  import { getNftContractHandicap } from "@/api/business"
  import { BigNumber, ethers } from "ethers";
  import { initSigner } from "@/utils/thhersUtils";
  // import { ElSelect } from 'element-plus';
  import { Dialog } from "vant";
  import { useI18n } from "vue-i18n";
  import Bottom from "../../components/bottom.vue"
  import LSSVMRouter from "@/utils/contracts/LSSVMRouter.json";
  import { buyNftForCurPrice } from "@/api/business";
  import { nftdetailsType } from "@/utils/type";
  import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";
  import NFT from "@/utils/contracts/NFT.json";
  import { useStates, useActions } from "@/hooks/userStore";
  import numFilters from '@/hooks/userNumFilters'
  import { ElLoading,ElMessage } from 'element-plus'
  import { switchChainNoArgs } from '@/utils/DialogSwitchChain'
  import {getPath} from '@/utils'
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
    partData: [],
    isAuth: -1,
    contractLogo: "",
    name:""
  });

  const create_show = ref(false);
  let poolDeatil = ref({ curAmount: "", floorPrice: "" })
  let sellType = ref<boolean>(false);
  let buy_show = ref<boolean>(false);
  let sellsuccessType = ref<boolean>(false);
  let loading = ref<boolean>(false)
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

  const onAddItem = () => {
    nftdetails.value.partData = nftdetails.value.transactionHistoryVOList
  }
  onMounted(() => {
    let tries = 0;
    setTimeout(function initTimer(): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
      else init();
    });
  });
  const getPoolDetails = (poolAddr: any) => {
    poolDetail({ poolAddr: poolAddr }).then((res: any) => {

      poolDeatil.value = res

    })
  }
  let showView = ref<boolean>(false);
  async function getDataNFT() {
    const loadingInstance = ElLoading.service({
      lock: true,
      text: t("overall.Loading"),
      background: 'rgba(0, 0, 0, 0.7)',
    })
    let res: any = await getNftDetail(route.query.nftId as unknown as number)
    nftdetails.value = res;
    nftPriceNew = res.nftPrice
    console.log(nftPriceNew, nftdetails.value, "nftdetailsnftdetails")
    if (nftdetails.value.poolAddr) {
      getPoolDetails(nftdetails.value.poolAddr)
    }

    showView.value = true;
    loadingInstance.close();

    if (route.query.type === '1') {
      getName.value = t('NFTdetails.buy')
      console.log(1234564);
    } else {
      if (nftdetails.value.nftOwner.toLocaleLowerCase() === userinfo.value.hexAddress.toLocaleLowerCase()) getName.value = t('NFTdetails.sell')
      else getName.value = t('NFTdetails.buy')
    }
    let History: any = await getNftTransactionHistory({ nftTokenId: res.nftTokenId, nftContractAddr: res.contractAddr });
    console.log('History', History.rows, nftdetails.value.transactionHistoryVOList)
    History.rows.forEach((val: any) => {
      nftdetails.value.transactionHistoryVOList.push({ ts: val?.txHash ? val?.txHash : '--', price: val?.nftPrice ? val?.nftPrice : '--', time: val?.createTime ? val?.createTime : '--', type: val?.type ? val?.type : '--', to: val?.to ? val?.to : '--', from: val?.from ? val?.from : '--', })
    })
    nftdetails.value.partData = nftdetails.value.transactionHistoryVOList.slice(0, 5)


    nextTick(() => {
      let text = (name_title.value as HTMLParagraphElement).innerHTML;
      if (text.length > 15) (name_title.value as HTMLParagraphElement).style.width = '3rem';
    })
  }
  const open = (contractAddr: string) => {
    router.push("/business?searchKey=" + contractAddr + "&type=1");
  }
  const open1 = (contractAddr: string) => {
    window.open(
      proxy.$common.bscscanAddress + contractAddr
    );
  }
  const open2 = (contractAddr: string)=>{
    window.open(
      proxy.$common.bscscan + contractAddr
    );
  }

  const sell2 = async () => {

    console.log(nftPriceNew);
    let userBalance = await providers.getBalance(useraddress.value)
    console.log(ethers.utils.formatUnits(userBalance, 18) + 'ETC余额');


    if (
      nftdetails.value.nftOwner.toLocaleLowerCase() !=
      userinfo.value.hexAddress.toLocaleLowerCase() || route.query.type === '1'
    ) {

      // if (nftdetails.value.nftOwner.toLocaleLowerCase() != owner.value.toLocaleLowerCase()) return Toast.fail("购买失败");
      //没有登录
      if (!userinfo.value.isLogin || !useraddress.value || !signers || !providers) return ElMessage.error(t("overall.logTips"));
      if (nftPriceNew > ethers.utils.formatUnits(userBalance, 18)) {
        ElMessage.error(t("overall.Balance"));
        return
      }
      create_show.value = true;
      // Toast.loading({
      //   message: t('overall.Purchasing') + "...",
      //   forbidClick: true,
      //   loadingType: "spinner",
      //   duration: 0,
      // });
      loading.value = true
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
        // Toast.clear();
        loading.value = false
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
        // Toast.clear();
        loading.value = false
        console.log("-----------------1")

        // Toast.success(t('overall.spSucceed'));
        onClickLeft();
      } catch (e) {
        console.log(e);
        // Toast.clear();
        loading.value = false
        console.log("-----------------2")
        create_show.value = false;
        // Toast.fail(t('overall.spFailed'));
        ElMessage.error(t('overall.spFailed'))
      }
    } else {
      router.push("/business?searchKey=" + nftdetails.value.contractAddr);
    }
  };

  function sell() {
    switchChainNoArgs(sell2, userinfo.value.isLogin, useraddress.value || String(userinfo.value.hexAddress))
  }

  const confirmsell = (): void => {
    console.log(123);
    sellsuccessType.value = true;
  };
  const opens = (has: any) => {
    window.open(
      proxy.$common.bscscan + has
    );
  }
  const opens2 = (has: any) => {
    window.open(
      proxy.$common.bscscanAddress + has
    );
  }
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
    // buy_show.value = true
    ElMessage({
      message: '购买成功',
      type: 'success',
    })
    setTimeout(() => {
      router.go(-1);
    }, 2000);
  };
  const onClickLeft_1 = () => {
    router.go(-1);
  }
  const submit = () => {
    router.go(-1);
  }
  let rotate = ref(false);
  let timer: any = ref(null);


  function setTime(newtime: any, usedtime: any) {

  let time = newtime - usedtime
  let days = parseInt(time / (1000 * 60 * 60 * 24));
  let hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) > 0 ? parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) : 1;
  let times = ''
  if (minutes > 0) {
    times = minutes + ` ${t('browse.minutes')}`
  }
  if (hours > 0 && hours < 24) {
    times = hours + ` ${t('browse.hours')}`
  }
  if (days > 0 && days < 30) {
    times = days + ` ${t('browse.day')}`
  }
  if (days > 30) {
    times = 1 + `${t('browse.month')}`
  }
  // if(hours>0){
  //     times =  hours + " hour " + minutes + " minute ";
  // }
  // if(days>0){
  //     times = days + " day " + hours + " hour " + minutes + " minute ";
  // }
  return times;
  }
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
        ElMessage(t('overall.renew'));

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
  </script>

  <style scoped lang="scss">
  a {
    // color: rgba(21, 79, 240, 100);
    color: #5a64e9;
    font-family: Source Han Sans CN;
    font-weight: bold;
  }

  .box {
    // margin-top:20px;
    display: flex;

    .left {
      width: 4.6667rem;
      height: 3.849rem;
      margin-left: .1667rem;
      background-color: rgba(235, 238, 242, 0.5);
      padding-top: .2552rem;

      .imgBox {
        width: 2.5rem;
        height: 3.3333rem;
        margin: 0 auto;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .detail {
        width: 100%;
        height: 354px;
        line-height: 20px;
        border-radius: 10px;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: center;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
        font-family: Roboto;
        border: 1px solid rgba(153, 153, 153, 0.6);

        .details {
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          height: 59px;
          line-height: 59px;
          color: rgba(255, 255, 255, 1);
          font-size: 20px;
          font-family: Roboto;
          border-bottom: 1px solid rgba(187, 187, 187, 0.4);
        }

        .details:nth-child(1),
        .details:nth-child(6) {
          border-bottom: none;
        }
      }
    }

    .right {
      width: 2.3333rem;
      border-bottom: 1px solid #EEF0F2;

      span {
        color: #777E90;
        font-family: PingFang-SC-Medium;
        font-size: 16px;

      }

      .detail {
        width: 100%;
        // height: 608px;
        line-height: 20px;
        border-radius: 10px;
        color: #000;
        font-size: 14px;
        text-align: center;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
        font-family: Roboto;
        // border: 1px solid rgba(153, 153, 153, 0.6);

        .details {
          cursor: default;
          padding: 0 44px 0 25px;
          display: flex;
          justify-content: space-between;
          height: 59px;
          line-height: 59px;
          font-size: 20px;
          font-family: Roboto;
          border-bottom: 1px solid rgba(187, 187, 187, 0.4);

          span:nth-child(odd) {
            width: 200px;
            color: rgba(255, 255, 255, 1);
            font-size: 20px;
            text-align: left;
            font-family: PingFangSC-regular;
          }

          span:nth-child(even) {
            width: 200px;
            color: rgba(255, 255, 255, 1);
            font-size: 20px;
            text-align: left;
            font-family: PingFangSC-regular;
          }
        }
      }

      .top {
        display: flex;
        flex-wrap: wrap;
        margin-top: .099rem;

        >div {
          width: 50% !important;
          left: 760px;
          top: 89px;
          font-size: .2083rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #23262F;
          line-height: .2604rem;
        }
      }
    }
  }

  .bottom {
    margin-bottom: 1.0417rem;

    .table-price {
      color: #23262F;

      img {
        width: .0833rem;
        height: .0833rem;
      }
    }

    .table-time {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #23262F;

      img {
        width: .0833rem;
        height: .0833rem;
        margin-left: .0573rem;
      }
    }

    .more {
      width: .6042rem;
      height: .25rem;
      line-height: .25rem;
      text-align: center;
      font-size: .0833rem;
      color: #353945;
      font-family: PingFang SC;
      font-weight: bold;
      margin: 0 auto;
      border: 1px solid #EEF0F2;
      border-radius: .0417rem;
      margin-top: .1563rem;
    }

    .bottom-title {
      color: #23262F;
      font-size: .125rem;
      margin-top: .2083rem;
      margin-bottom: .1042rem;
    }
  }

  .home {
    width: 7.0052rem;
    margin: 0 auto;
    padding-top: .1406rem;

    .nav-box {
      margin-top: .099rem;
      display: flex;
      align-items: center;
      font-size: .0833rem;
      color: #23262F;
      font-family: PingFang SC;
      font-weight: 500;

      img:nth-child(1) {
        width: .0938rem;
        height: .0781rem;
        margin-right: .0833rem;
      }

      img:nth-child(2) {
        width: .125rem;
        height: .125rem;
        margin-right: .0313rem;
        border-radius: 50%;
      }

      img:nth-child(3) {
        width: .1146rem;
        height: .1146rem;
        margin-left: .0365rem;
      }

    }

    .holder {
      margin: .1302rem 0;
      font-size: .0833rem;
      color: #23262F;

      span {
        color: #777E90;

      }
    }

    .buy-box {
      height: .9896rem;
      background: rgba(235, 238, 242, 0.5);
      // border: 1px solid rgba(218,218,218, 0.5);
      padding: .1198rem .125rem;
      border-radius: .0417rem;
      margin-top: .0938rem;

      p:nth-child(1) {
        color: #777E90;
        font-family: PingFang SC;
        font-weight: 500;
        font-size: .0729rem;
        margin-bottom: .0417rem;
      }

      p:nth-child(2) {
        color: #23262F;
        font-size: .125rem;
        font-family: PingFang SC;
        font-weight: bold;
        margin-bottom: .026rem;

        img {
          width: .0833rem;
          height: .0833rem;
          margin-right: .0417rem;
        }
      }

      p:nth-child(3) {
        color: #777E90;
        font-size: .0625rem;

        img {
          width: .0625rem;
          height: .0625rem;
          margin-right: .026rem;
        }

        span {
          color: #23262F;
        }
      }


    }

    .buy-btn {
      width: 1.349rem;
      height: .25rem;
      line-height: .25rem;
      background-color: #3B82F6;
      color: #fff;
      text-align: center;
      border: .0417rem;
      font-size: .0833rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: .0417rem;
      margin-top: .0885rem;
      cursor: pointer;

      img {
        width: .0469rem;
        height: .0938rem;
        margin-right: .0729rem;

      }
    }

    .table-box {
      margin-top: .0833rem;

      .title {
        color: #141416;
        margin-left: .1302rem;
        font-size: .0833rem;
        font-family: PingFang SC;
        font-weight: bold;
      }

      .line {
        height: 1px;
        background: #EEF0F2;
        margin-top: .0625rem;
      }

      .table-list {
        display: flex;
        justify-content: space-between;
        margin-top: .1042rem;
        font-size: .0729rem;

        span {

          color: #777E90;
          font-family: PingFang SC;
          font-weight: 500;
        }

        .table-right {
          color: #23262F;
          display: flex;
          align-items: center;
          cursor: pointer;
          .go-pool{
            display: flex;
            align-items: center;
            color:#3B82F6;
            margin-right: .0521rem;
            img{
              margin-right: .0104rem;
              margin-top: .0104rem;
            }
          }
          img {
            width: .0833rem;
            height: .0833rem;
            margin-left: .026rem;

          }
        }
      }
    }
  }

  :deep(.el-table) {
    th.el-table__cell.is-leaf{
      border: none;
    }
  }

  :deep(.el-table){
    tr{
      height: .4167rem;
      font-size: .0833rem;
    }
  }

  :deep(.el-table thead) {
    thead {
      font-size: .0729rem;
      color: #777E90;
    }
  }

  :deep(.el-table__inner-wrapper) {
    &::before{
      content: none;
    }
  }

  :deep(.el-table) {
    .td.el-table__cell:last-child{
      border: none;
    }
  }
  </style>

