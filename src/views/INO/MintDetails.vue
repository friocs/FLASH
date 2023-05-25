<template>
  <div class="box">
    <search />
    <div class="subject">
      <div class="particulars">
        <div class="content">
          <img @click="toEstablish" src="../../assets/img/fold1.png" alt="">
          <div>
            <h4>{{ name }}</h4>
            
          </div>
          <div class="mint">
            <div class="quantity">
              <div class="jg">
                <p>{{$t('INO.CurrentPrice')}}</p>
                <span>{{ $t('INO.mf') }}</span>
              </div>
              <div>
                <p>{{$t('INO.cast')}}</p>
                <span><span>{{ Quantity.totalSupply }}</span> / <span class="span1">{{ Quantity.maxMint }}</span></span>
              </div>
              <div></div>
            </div>
            <p v-if="finishTime == 1">{{$t('INO.timeLeft')}}</p>
            <p v-else-if="endTime">{{$t('INO.over')}}</p>
            <p v-else>{{ $t('INO.countdown') }}</p>
          </div>
          <div class="timeD" v-html="timeD">
          </div>
          <div v-if="status == 1">
            <div class="btn" @click="MINT" v-if="!(mintQuantity.userMint == mintQuantity.userQuantity)">
            <van-loading type="spinner" v-if="loading" />
            <span>MINT</span>
            </div>
            <div class="btn1" v-else>
              MINT
            </div>
          </div>
          <div class="btn1" @click="MINT" v-else-if="status == 2">
            MINT
          </div>
          <div class="describe">
            <h4>{{$t('INO.describe')}}</h4>
            <p class="introduce">{{ introduce }}</p>
          </div>
        </div>
        <div class="tu">
          <el-image fit="cover" :src="`${logo}`" alt="" />
        </div>
      </div>
      <div class="lists">
        <h4>{{ $t('INO.recent') }}</h4>
        <div class="head">
          <span>#</span>
          <span>{{ $t('INO.price') }}</span>
          <span>{{ $t('INO.useraddress') }}</span>
          <span>{{ $t('INO.hash') }}</span>

          <span>{{ $t('INO.date') }}</span>
        </div>
        <div class="list" v-for="(item, index) in mintList" :key="index">
          <span>{{ item.id }}</span>
          <span class="span1" v-if="item.price > 0"><img src="../../assets/img/BNB.png" alt="">{{ item.price }}</span>
          <span class="span1" v-else>{{$t('INO.mf')}}</span>
          <span>{{ proxy.$filters.addressFilters(item.useraddress, 6, 4) }}</span>
          <span>
            <a :href="`https://bscscan.com/tx/${item.hash}`" target="_blank"><img
                src="../../assets/img/forward2.png" alt=""></a>
          </span>

          <span>{{ dayjs(item.time * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
      </div>
      <div class="btn" @click="more" v-if="mintList.length > 0 && total != mintList.length">
        {{ $t('INO.displaymore') }}
      </div>
    </div>
  </div>
  <connectBox :ConnectWallet="ConnectWallet" @change="changeConect"></connectBox>
</template>
<script lang='ts' setup>
import {
  ref,
  computed,
  reactive,
  onMounted,
  getCurrentInstance,
  inject,
  onUnmounted,
} from "vue";
import "@/assets/css/vant1.scss";
import search from "@/components/search.vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { ethers } from "ethers";
import { MintRecord,Getinfoid} from "@/api/INO"
import { ElLoading } from "element-plus";
import LSSVMPairFactory from "@/utils/contracts/LSSVMPairFactory.json";
import { initSigner } from "@/utils/thhersUtils";
import SuperNFT721 from "@/utils/contracts/SuperNFT721.json"
import dayjs from "dayjs";
import { useStates, useActions } from "@/hooks/userStore";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const route = useRoute();
let { t } = useI18n();
let ConnectWallet = ref<boolean>(false)
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);

onMounted(() => {
  let tries = 0;
  setTimeout(function initTimer(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
    else init();
  });
});

let useraddress = ref("");
let loading = ref(false)
let contracts: {
  LSSVMPairFactory: any;
  SuperNFT721: any;
} = {
  LSSVMPairFactory: null,
  SuperNFT721: null,
};
let address1: any = route.query.address
let address2 = ref('')
let introduce = ref('')
let logo = ref('')
let name = ref('')
let BABT = ref('')
let status = ref<any>(1)
let startTime = ref<any>(0)
let orderid = ref<any>(0)
// let userMapX = reactive<{
//   startTime: any
// }>({
//   startTime: Number(startTime.value) - (Math.trunc(new Date().getTime() / 1000))
// })
const init = async () => {
 await Getinfoid1()
  if ((window as any).ethereum) {
    //第一步 ----  获取 当前钱包对象 和 provider
    let { provider, address, signer, Balance } = await initSigner();
    useraddress.value = address;
    //第二部 ----  创建合约对象              '合约地址'       'JSON'  这是上面的provider和signer
    contracts.LSSVMPairFactory = new ethers.Contract(proxy.$common.LSSVMPairFactory, LSSVMPairFactory, provider).connect(signer);
    contracts.SuperNFT721 = new ethers.Contract(address1, SuperNFT721, provider).connect(signer);
  }
  getQuantity()
  MintRecord1()
};
const toEstablish = () => {
  router.push("/ino/establish");
}
let Quantity = reactive<{
  maxMint: any;
  totalSupply: any
}>({
  maxMint: 0,
  totalSupply: 0

})
let ifNFT = ref(0)
let mintQuantity = reactive<{
  userMint: any;
  userQuantity: any
}>({
  userMint: 0,
  userQuantity: 0

})
let startMint = ref(false)
let endTime = ref(false)
const getQuantity = () => {
  contracts.SuperNFT721.maxMint().then((res) => {
    Quantity.maxMint = Number(res)
  });
  contracts.SuperNFT721.totalSupply().then((res) => {
    Quantity.totalSupply = Number(res)
  });
  contracts.SuperNFT721.balanceOf(useraddress.value).then((res) => {
    ifNFT.value = Number(res)

  });
  //获取用户已经mint了几个
  contracts.SuperNFT721.haveMint(useraddress.value).then((res) => {
    mintQuantity.userMint = Number(res)
  });
  //获取每个用户最多能mint几个
  contracts.SuperNFT721.oneUserMaxMint().then((res) => {
    mintQuantity.userQuantity = Number(res)
  });
  //获取开始mint时间
  contracts.SuperNFT721.startTime().then((res) => {
    if ((Number(res) - (Math.trunc(new Date().getTime() / 1000))) <= 0) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      startMint.value = true
    }
  });
  //获取结束时间
  contracts.SuperNFT721.endTime().then((res) => {
    if ((Number(res) - (Math.trunc(new Date().getTime() / 1000))) <= 0) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      endTime.value = true
    }
  });
  
}
onUnmounted(() => {
  clearInterval(timerDR)
})
let finishTime = ref(0) 
let timerDR = setInterval(() => {
  if(startTime.value>0){
    if (startTime.value > 0){
      startTime.value--
    }
  }else{
    if (orderid.value > 0){
      finishTime.value = 1
      orderid.value--
    }
  }
}, 1000)
//倒计时
let timeEnd = () => {
  startMint.value = true
  startTime.value = 0
  // clearInterval(timerDR)
}
let timeEnd1= () =>{
  orderid.value = 0
  // startMint.value = true
}
let timeEnd2 =()=>{
  startMint.value = false
}
let timeD = computed(() => {
  timeEnd2()
  let date = startTime.value
  if (Number(date) <= 0) {
   
    timeEnd()
    date = orderid.value
  }
  if(Number(orderid.value)<=0){
    
    timeEnd1()
    date = 0
  }
  let day: any = Math.floor(date / 60 / 60 / 24);
  let hour: any = Math.floor(date / 60 / 60 % 24);
  let min: any = Math.floor(date / 60 % 60);
  let sec: any = Math.floor(date % 60);
  if (day < 10) day = '0' + day;
  if (hour < 10) hour = '0' + hour;
  if (min < 10) min = '0' + min;
  if (sec < 10) sec = '0' + sec;
  return `<div class="time"><div><div>${day}</div><span>DAY</span></div>
   <div><div>${hour}</div><span>HOUR</span></div>
   <div><div>${min}</div><span>MIN</span></div>
  <div><div>${sec}</div><span>SEC</span></div></div>`
})
const MINT = () => {
  if (loading.value) return
  if (!userinfo.value.isLogin) return ConnectWallet.value = true
  if (!startMint.value) return proxy.$message.warning(t('INO.notopen'));
  if (endTime.value) return proxy.$message.warning(t('INO.over'));
  if (Quantity.totalSupply >= Quantity.maxMint) return proxy.$message.warning(t('INO.over'));
  if (mintQuantity.userMint >= mintQuantity.userQuantity) return proxy.$message.warning(t('INO.cannot'));
  loading.value = true
  contracts.SuperNFT721.mint()
    .then(async (tx) => {
      await tx.wait();
      proxy.$message.success(t('INO.success'));
      getQuantity()
      MintRecord1()
      loading.value = false
    })
    .catch((e) => {
      console.error(e);
      if (BABT.value) {
        proxy.$message.error(t('Home.babt'));
      } else {
        proxy.$message.error(t('INO.fail'));
      }

      loading.value = false
    });
}
let listParameter = reactive<any>({
  current: 1,
  size: 3,
  param: {
    nftAddress: address1//合约地址
  }
})
let mintList = ref<any>([])
let total = ref<any>(0)
//获取mint列表
const MintRecord1 = () => {
  MintRecord(listParameter).then((res: any) => {
    mintList.value = res.rows
    total.value = res.total
  });
}
let ids = reactive<any>({
  id: route.query.id,
})
//信息
const Getinfoid1 = () => {
  Getinfoid(ids).then((res: any) => {
        logo.value = res.logo
        name.value = res.name
        status.value = res.status
        introduce.value = res.introduce
        startTime.value = (Number(res.startTime ) - (Math.trunc(new Date().getTime() / 1000)))
        BABT.value = res.babt
        address2.value = res.address
        orderid.value = (Number(res.endTime) - (Math.trunc(new Date().getTime() / 1000)))
    });
}
const more = () => {
  listParameter.size = listParameter.size + 3
  MintRecord1()
}
const changeConect = () => {
  ConnectWallet.value = false
}
</script>
  
<style scoped lang="scss">
.box {
  padding-bottom: 5.208vw;
  .subject {
    width: 67.708vw;
    margin: 0 auto;
    margin-top: 4.948vw;

    .particulars {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3.125vw;
      .content {
        >img {
          width: 1.042vw;
          height: 0.781vw;
          margin-bottom: 1.042vw;
          cursor: pointer;
        }
        .timeD{
          width: 100%;
          padding: 1.406vw 0;
          background-color:#EBEEF2;
          border-radius: 0.521vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        >div {
          // margin-bottom: 30px;
          >h4 {
            width: 17.708vw;
            font-size: 2.083vw;
            font-weight: bold;
            color: #23262F;
            margin-bottom: 1.042vw;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            word-break: break-all;
          }

          .introduce {
            font-size: 0.833vw;
            color: #777E90;
            line-height: 1.2vw;
            width: 17.625vw;
            height: 5vw;
            word-break: break-all;
            overflow-y: scroll;
            cursor: pointer;
          }
        }

        .mint {
          margin-bottom: 1.042vw;
          .quantity{
            width: 100%;
            background-color: #EBEEF2;
            padding:1.042vw 1.563vw;
            border-radius: 0.313vw;
            margin-bottom: 1.042vw;
            .jg{
              margin-bottom: 1.563vw;
            }
            p{
              font-size: 0.729vw;
              color: #777E90;
              margin-bottom: 0.313vw;
            }
            span{
              font-size: 1.25vw;
              font-weight: bold;
              color: #23262F;
            }
          }
          // >div {
          //   display: flex;
          //   align-items: center;
          //   font-size: 1.25vw;
          //   font-weight: bold;
          //   color: #777E90;
          //   margin-bottom: 1.146vw;
          //   background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
          //   -webkit-background-clip: text;
          //   -webkit-text-fill-color: transparent;

          //   p {
          //     width: 0.256vw;
          //     height: 1.042vw;
          //     background-color: #777E90;
          //     margin-left: 0.521vw;
          //     margin-right: 1.563vw;

          //   }

          //   >div {
          //     span {
          //       font-size: 1.25vw;
          //       font-weight: bold;
          //       color: #23262F;
          //     }

          //     .span1 {
          //       background: linear-gradient(62deg, #23262F 0%, #23262F 100%);
          //       -webkit-background-clip: text;
          //       -webkit-text-fill-color: transparent;
          //     }
          //   }
          // }

          >p {
            font-size: 0.833vw;
            font-weight: bold;
            color: #23262F;
          }
        }

        :deep(.time) {
          display: flex;
          // margin-bottom: 1.563vw;

          >div {
            margin-right: 0.521vw;
            display: flex;
            flex-direction: column;
            align-items: center;

            >div {
              width: 3.125vw;
              height: 3.125vw;
              text-align: center;
              line-height: 3.125vw;
              background-color: #F5F6F8;
              border-radius: 0.313vw;
              font-size: 0.833vw;
              font-weight: bold;
              color: #777E90;
              margin-bottom: 0.521vw;
            }

            span {
              font-size: 0.833vw;
              font-weight: bold;
              color: #777E90
            }
          }
        }
        .describe{
          h4{
            font-size: 0.833vw;
            font-weight: bold;
            color: #23262F;
            margin-bottom: 0.521vw;
          }
          p{
            font-size: 0.833vw;
            color: #777E90;
          }
        }
        .btn {
          width: 13.49vw;
          height: 2.5vw;
          margin: 0;
          background: #3743DB;
          text-align: center;
          line-height: 2.5vw;
          border-radius: 0.417vw;
          font-size: 0.833vw;
          font-weight: bold;
          color: #FFFFFF;
          margin-top: 1.042vw;
          margin-bottom: 1.563vw;
        }

        .btn1 {
          width: 13.49vw;
          height: 2.5vw;
          margin: 0;
          background: #9e9e9e;
          text-align: center;
          line-height: 2.5vw;
          border-radius: 0.417vw;
          font-size: 0.833vw;
          font-weight: bold;
          color: #FFFFFF;
          margin-top: 1.042vw;
          cursor: pointer;
          margin-bottom: 1.563vw;
        }
      }

      .tu {
        width: 46.354vw;
        height: 38.542vw;
        border-radius: 0.313vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #EBEEF2;

        :deep(.el-image) {
          width: 30vw;
          height: 30vw;
          border-radius: 0.313vw;
        }
      }
    }

    .lists {
      h4 {
        font-size: 1.25vw;
        font-weight: bold;
        color: #23262F;
        margin-bottom: 2.083vw;
      }

      .head {
        width: 100%;
        margin-bottom: 1.563vw;

        span {
          display: inline-block;
          width: 20%;
          font-size: 0.729vw;
          color: #777E90;
          text-align: center;
        }

        .span1 {}
      }

      .list:hover {
        background-color: #EBEEF2;
        border-radius: 0.521vw;
      }

      .list {
        height: 4.167vw;
        display: flex;
        align-items: center;
        border-bottom: 0.052vw solid #EEF0F2;

        span {
          display: inline-block;
          width: 20%;
          text-align: center;
          font-size: 0.833vw;
          font-weight: bold;
          color: #23262F;

          a {
            img {
              width: 1.042vw;
            }
          }
        }

        .span1 {
          display: flex;
          align-items: center;
          justify-content: center;

          >img {
            width: 1.042vw;
            margin-right: 0.313vw;
          }
        }
      }
    }

    .btn {
      margin: 0 auto;
      margin-top: 2.604vw;
      width: 6.042vw;
      height: 2.5vw;
      text-align: center;
      line-height: 2.5vw;
      border: 0.052vw solid #EEF0F2;
      border-radius: 0.417vw;
      font-size: 0.833vw;
      font-weight: bold;
      color: #353945;
      cursor: pointer;
    }
  }
}
</style>
  