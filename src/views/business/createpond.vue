<template>
  <search />
  <div class="home">
    <div class="head" v-if="route.query.type == '1'" style="color:#20A886">{{ $t('createpond.createBuyPool') }}</div>
    <div class="head" v-if="route.query.type == '2'" style="color:#F05D62">{{ $t('createpond.createSellPool') }}</div>
    <div class="head three" v-if="route.query.type == '3'">{{ $t('createpond.createPoll1') }}</div>

    <div class="box">

      <!-- <div class="head" v-else-if="route.query.type == '2'">Create Sell Pool</div>
      <div class="head" v-else-if="route.query.type == '3'">Create Buy and Sell Pool</div> -->
      <div class="content">
        <div class="content-item">
          <div class="title-box">
            <img src="../../assets/img/title-logo2.png" alt="" v-if="route.query.type == '1'">
            <img src="../../assets/img/title-logo1.png" alt="" v-if="route.query.type == '2'">
            <img src="../../assets/img/title-logo.png" alt="" v-if="route.query.type == '3'">
            <div class="title-right">
              <p>{{ $t('createpond.poolPricing') }}</p>
              <p>{{ $t('createpond.setPrice') }}</p>
            </div>
          </div>
          <!-- <p class="title">Pool Pricing</p>
          <p class="Subheading">Set the initial price and how your pool's price changes</p> -->
          <p class="form-title" v-if="route.query.type == '3'">{{ $t('createpond.FeeAmount') }}
            <el-tooltip :content="t('createpond.top3')" placement="top"> <img src="@/assets/img/mark.png" alt="">
            </el-tooltip>
          </p>
          <div class="input-box" v-if="route.query.type == '3'">
            <input ref="Service" type="Number" v-model="date.Service" min="0" max="90"
              :placeholder="t('NFTdetails.Pleaseenter')" class="fee-input"
              @input="date.Service = lengthLimit(date.Service, 2, true, 'Service')">
            <div class="input-right">
              %
            </div>
          </div>
          <p class="form-title">{{ $t("NFTdetails.Initialprice") }}

            <el-tooltip :content="$t('createpond.top1')" placement="top"> <img src="@/assets/img/mark.png" alt="">
            </el-tooltip>
            <!-- <p>当前地板价为：{{Number(route.query.floorPrice).toFixed(4)}}</p> -->
            <span class="floor-price">{{ $t('createpond.floorPrice') }} {{ Number(route.query.floorPrice).toFixed(4) }}
              <img src="@/assets/img/chain_2.png" alt=""></span>
          </p>
          <div class="input-box">
            <input ref="price" type="Number" :placeholder="t('business.Tips')" v-model="date.price"
              @input="date.price = lengthLimit(date.price, 5)">
            <div class="input-right">
              <img src="@/assets/img/chain_2.png" alt="">
              ETC
            </div>
          </div>
          <p class="form-title">{{ $t('createpond.Bonding') }}

            <el-tooltip :content="$t('createpond.typePrice')" placement="top"> <img src="@/assets/img/mark_blue.png"
                alt="">
            </el-tooltip>
          </p>
          <div class="bnt-box">
            <div class="btn" @click="btnClick(0)" :class="date.checked == 0 ? 'active' : ''">{{ $t('createpond.linear')
            }}
            </div>
            <div class="btn" @click="btnClick(1)" :class="date.checked == 1 ? 'active' : ''">
              {{ $t('createpond.Exponemtial') }}</div>
          </div>
          <div class="form-title">Delta
            <el-tooltip :content="$t('createpond.rangePrice')" placement="top"> <img src="@/assets/img/mark.png" alt="">

            </el-tooltip>

            <p v-if="
              route.query.type != '2' &&
              date.price &&
              date.DeIta &&
              date.quantity &&
              typeof total == 'string'
            " style="color: red;" class="tips error-tips">
              {{ total }}
            </p>
          </div>
          <div class="input-box ">
            <input v-show="date.checked == 1" v-model="date.DeIta" ref="DeIta" type="Number" max="100" min="0"
              @input="oninputClick" :placeholder="DeItal_Tipe" />
            <input v-show="date.checked == 0" v-model="date.DeIta" ref="DeIta" type="Number" max="100" min="0"
              @input="date.DeIta = lengthLimit(date.DeIta, 7, true, 'DeIta')" :placeholder="DeItal_Tipe" />
            <div class="input-right">
              <img src="@/assets/img/chain_2.png" alt=""> {{ date.checked == 0 ? 'ETC' : '%' }}
            </div>
          </div>
          <div class="tips" style="margin-top:.0781rem">{{ $t('createpond.selectStart') }}<span> {{ date.price || 0
          }}</span> ETC</div>
          <div class="tips" v-if="route.query.type == '1'">{{ $t('createpond.tips') }} <span>{{ date.DeIta || 0
          }}</span>
            {{ date.checked == 0 ? 'ETC' : '%' }}.</div>
          <div class="tips" v-if="route.query.type == '2'">
            {{ $t('createpond.EachTime') }}<span> {{ date.DeIta || 0 }}</span> {{ date.checked == 0 ? 'ETC' : '%' }}.
          </div>
          <div class="tips" v-if="route.query.type == '3'">
            {{ $t('createpond.EachTime1') }}<span> {{ date.DeIta || 0 }}</span> {{ date.checked == 0 ? 'ETC' : '%' }}.
          </div>
        </div>
        <div class="content-item">
          <div class="title-box">
            <img src="../../assets/img/title-logo2.png" alt="" v-if="route.query.type == '1'">
            <img src="../../assets/img/title-logo1.png" alt="" v-if="route.query.type == '2'">
            <img src="../../assets/img/title-logo.png" alt="" v-if="route.query.type == '3'">
            <div class="title-right" v-if="route.query.type == '1'">
              <p>{{ $t('createpond.Asset') }}</p>
              <p>{{ $t('createpond.setTokens') }}</p>
            </div>
            <div class="title-right" v-if="route.query.type == '2'">
              <p>{{ $t('createpond.Asset') }}</p>
              <p>{{ $t('createpond.depositNFT') }}</p>
            </div>
            <div class="title-right" v-if="route.query.type == '3'">
              <p>{{ $t('createpond.Deposit') }}</p>
              <p class="deposit">{{ $t('createpond.setYour') }} <img src="@/assets/img/chain_2.png" alt="">
                {{ $t('createpond.depositAmounts') }}</p>
            </div>

          </div>



          <!-- <div class="title" v-if="route.query.type == '1'">Pool Pricing</div> -->
          <!-- <div class="title" v-if="route.query.type == '2'">Asset Amounts</div> -->
          <!-- <div class="title" v-if="route.query.type == '3'">Deposit Amounts</div> -->
          <!-- <div class="Subheading" v-if="route.query.type == '1'">Set how many tokens you deposit into the pool.</div> -->
          <!-- <div class="Subheading" v-if="route.query.type == '2'">Set how many NFTs you deposit into the pool.</div> -->
          <!-- <div class="Subheading" v-if="route.query.type == '3'">Set your <img src="@/assets/img/WBNB.png" alt=""> BNB
            and ZORB deposit amounts. </div> -->
          <div class="buy-box" v-if="route.query.type == '1'">
            <p class="form-title">{{ $t('createpond.ifBuy') }}</p>
            <div class="input-box1">
              <input type="number" v-model="date.quantity" :placeholder="t('NFTdetails.Pleaseenter')"
                v-on:input="oninputPrice" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))">
              <span class="Company">{{ route.query.contractName }}</span>
            </div>

          </div>
          <!-- <div class="buy-box" v-if="route.query.type == '2'">
            if you want to sell
            <div class="input-box1">
              <input type="number">
              <div class="Company">{{route.query.contractName}}</div>
            </div>

          </div> -->
          <div class="buy-box" v-if="route.query.type == '3'">
            <p class="form-title">{{ $t('createpond.ifBuy') }}</p>
            <div class="input-box1">
              <input type="number" v-model="date.quantity" :placeholder="t('NFTdetails.Pleaseenter')"
                v-on:input="oninputPrice" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))">
              <div class="Company">{{ route.query.contractName }}</div>
            </div>

          </div>
          <div v-if="route.query.type != '3'" style="text-align: left;"
            :style="{ top: route.query.type == '3' ? '12.5rem' : '' }">
            <!-- v-if="route.query.type != '2' && typeof total == 'number'" -->
            <div class="tips"
              v-if="route.query.type != '2' && date.price.length > 0 && date.quantity > 0 && typeof total != 'string'">
              {{ $t('createpond.allearn') }} <span>{{ Number(total).toFixed(4) }}</span> ETC.
            </div>



          </div>


          <div class="tips" v-if="route.query.type == '3'">
            <div class="total-box" v-if="date.price.length > 0 && date.quantity > 0 && typeof total == 'number'">
              <p>{{ t("createpond.allearn") }}</p>
              <p style="display: block;">{{ Number(total).toFixed(4) }}ETC</p>
            </div>
            <!-- route.query.type != '2' && -->
            <!-- <p v-if="
              date.price &&
              date.DeIta &&
              date.quantity &&
              typeof total == 'string'
            " style="color: red;text-align: center;" class="tips">
              {{ total }}
            </p> -->

          </div>
          <!-- <div class="buy-box" v-if="route.query.type == '3'">
            Sell up to
            <div class="input-box1">
              <input type="number">
              <div class="Company">{{ route.query.contractName }}</div>
            </div>
          </div> -->
          <!-- <div class="tips mini" v-if="route.query.type == '3'">Deposit 10 <span>{{ route.query.contractName }}</span>
            to
            sell for BNB</div> -->
          <!-- <div class="line spacing" v-if="route.query.type == '3' || route.query.type == '2'"></div> -->
          <div class="select-box" v-if="route.query.type == '3' || route.query.type == '2'">
            <div class="buy-box">
              <p class="form-title">{{ $t('createpond.selectNFT') }} </p>
              <div class="select-c">
                <el-select v-model="currency" class="m-2" :placeholder="$t('createpond.pleaseSelect')" size="large"
                  multiple collapse-tags collapse-tags-tooltip :no-data-text="t('overall.nonft')">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>
          </div>
          <div class="Deposit-box" v-show="currency.length > 0">
            <p class="form-title">{{ $t('createpond.DepositNFTs') }} {{ currency.length }}</p>
            <div class="item-box">
              <div class="Deposit-item" v-for="item in currency" :key="item">
                <div>#{{ item }}</div>
                <div @click="delNftlist(item)">{{ $t('NFTdetails.delete') }}</div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button class="btn-item" loading v-if="loading">{{ route.query.type != "1" && !authorization ?
          $t('createpond.UnderAuthorization') : $t('createpond.Creating')
      }}</el-button>
      <div class="btn-item" @click="create(authorization)" v-else>{{ route.query.type != "1" && !authorization ?
          t('overall.empower') : $t('createpond.' + title)
      }}</div>


      <div class="btn-item" @click="retrun">{{ $t('createpond.exit') }}</div>
    </div>
  </div>
  <!-- <Footer></Footer> -->
</template>

<script lang='ts' setup>
import {
  ref,
  computed,
  reactive,
  onMounted,
  getCurrentInstance,
  inject,
  watch
} from "vue";
import "@/assets/css/vant1.scss";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { number } from "@intlify/core-base";
import { ethers } from "ethers";
import ERC20 from "@/utils/contracts/ERC20.json";
// import { Toast } from "vant";
import { getMyNft } from "@/api/my";
import { useStates } from "@/hooks/userStore";
import { ElLoading, ElMessage } from "element-plus";
import LSSVMPairFactory from "@/utils/contracts/LSSVMPairFactory.json";
import NFT from "@/utils/contracts/NFT.json";
import { mynftType } from "@/utils/type";
import { initSigner } from "@/utils/thhersUtils";
import lengthLimit from '@/hooks/userLengthLimit'
import BigNumber from 'bignumber.js'
import Footer from '@/components/footer.vue'
import { Right } from "@element-plus/icons-vue";
const { proxy } = getCurrentInstance() as any;
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
const router = useRouter();
const route = useRoute();
let { t } = useI18n();
const hexAddress: any = inject("hexAddress");

const showPopover = reactive({
  price: false,
  DeItaType: false,
  Delta: false,
  Service: false,
});

const Tips = computed(() => {
  if (route.query.type === "1") {
    return t('overall.Tips1');
  } else if (route.query.type === "2") {
    return t('overall.Tips2');
  } else {
    return t('overall.Tips3');
  }
});
let authorization = ref(false);
let loading = ref<boolean>(false)
const options = ref<mynftType[]>(
  [{
    value: "string",
    label: "string",
    nftContractAddr: "string",
    id: 1,
  }, {
    value: "string1",
    label: "string1",
    nftContractAddr: "string1",
    id: 2,
  }]
);
let { ethereum } = window;
onMounted(() => {

  getMyNft({
    walletAddr:
      userinfo.value.hexAddress || hexAddress.value || useraddress.value,
    contractAddr: route.query.searchKey,
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
  let tries = 0;
  setTimeout(function initTimer(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
    else init();
  });
});
const btnClick = (index: any) => {
  date.checked = index
}
const retrun = () => {
  // proxy.router.go(-1)
  router.push({
    path: "/business",
    query: { searchKey: route.query.searchKey }
  });

}
const DeItal_Tipe = computed(
  () => `${t('NFTdetails.Pleaseenter')}${date.checked === 1 ? "(%)" : "(ETC)"}`
);
let useraddress = ref("");
const balance = ref(0);
const create_show = ref(false);
const contracts: any = {};
const init = async () => {
  if ((window as any).ethereum) {
    //第一步 ----  获取 当前钱包对象 和 provider
    let { provider, address, signer, Balance } = await initSigner();
    useraddress.value = address;
    //第二部 ----  创建合约对象              '合约地址'       'JSON'  这是上面的provider和signer
    contracts.LSSVMPairFactory = new ethers.Contract(
      proxy.$common.LSSVMPairFactory,
      LSSVMPairFactory,
      provider
    ).connect(signer);
    try {
      contracts.NFT = new ethers.Contract(
        route.query.searchKey as string,
        NFT,
        provider
      ).connect(signer);
    } catch (e) {
      console.log(e);
    }
    balance.value = Number(ethers.utils.formatUnits(Balance, 18));
    console.log(balance.value);

    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMPairFactory
    );
    authorization.value = res || false;
    console.log("authorization", authorization.value);
  }
};

const total = computed(() => {

  let { quantity, Service, price, DeIta } = date;
  let total;
  Service = Number(Service) / 100;
  quantity = Number(quantity);
  price = Number(price);
  DeIta = Number(DeIta);
  if (route.query.type != "1") {
    if (date.checked === 1) price = price / (1 + DeIta / 100);
    else price = price - DeIta;
  }
  console.log("当前价格", price);
  if (date.checked === 1) {
    console.log(DeIta, "DeIta", "指数")
    //指数
    if (DeIta != 0) {

      total = Number(
        (price * (1 - 1 / (DeIta / 100 + 1) ** quantity)) /
        (1 - 1 / (DeIta / 100 + 1))
      );
      console.log("指数-》", total)
    } else {
      total = price * quantity;
    }
  } else {
    console.log("线性")
    //线性
    // price = price - DeIta
    let total2 = price;
    for (let i = 1; i < quantity; i++) {
      if (total2 < 0) break;
      total2 = total2 - DeIta;
    }
    total2 = Number(total2.toFixed(10)) //避免出现 1e-20和1e-17的数据
    total = quantity * price - (DeIta * (quantity * (quantity - 1))) / 2;
    if (total2 <= 0) {
      total = `${t('overall.buysum')}${quantity}`;
    }
    console.log(total2, 'total2-**************');
    console.log(total, 'total-**************');
  }
  return typeof total === "number" ? Number(total.toFixed(18)) : total;
});
interface dateType {
  quantity: string | number | BigNumber;
  Service: any;
  price: any;
  DeIta: any;
  checked: string | number;
}

const date = reactive<dateType>({
  quantity: "",
  Service: "",
  price: "",
  DeIta: null,
  checked: 0,
});

let currency = ref<string>("");

const themeVars = {
  navBarIconColor: "#101010",
  navBarTextColor: "#101010",
};
let title = ref<string>("");
watch(() => date.checked, (newValue, oldValue) => {
  console.log(newValue, "newValue")

  date.DeIta = null

})
const delmsg = () => {
  // if (date.quantity.toString().includes('.')) if (date.quantity.toString().length > 6) date.quantity = date.quantity.toString().slice(0, 6);
  if (date.quantity.toString().length > 6) date.quantity = Number(date.quantity.toString().slice(0, 6));
  date.quantity = (date.quantity as string).replace(/\.\-\+/gi, "1"); // eslint-disable-line
  if (date.quantity.includes("-")) {
    let quantity = date.quantity.split("-");
    date.quantity = quantity.join("");
  }
  if (date.quantity.includes(".")) {
    let quantity = date.quantity.split(".");
    date.quantity = quantity.join("");
  }
};

const price = ref<HTMLInputElement | null>(null);
const Service = ref<HTMLInputElement | null>(null);
const quantity = ref<HTMLInputElement | null>(null);
const DeIta = ref<HTMLInputElement | null>(null);

const Getcursor = (dom: string) => {
  if (dom === "price") {
    price.value?.focus();
  } else if (dom === "Service") {
    Service.value?.focus();
  } else if (dom === "quantity") {
    quantity.value?.focus();
  } else {
    DeIta.value?.focus();
  }
};
if (route.query.type === "1") {
  title.value = "Buyapool";
} else if (route.query.type === "2") {
  title.value = "Sellingpool";
} else {
  title.value = "Tradingpool";
}
const onClickLeft = (): void => {
  router.back();
  // router.push('/business/nftlistseriesdetail?create_type=' + true);
};
const delNftlist = (val: string) => {
  (currency.value as unknown as []).forEach((item: string, index: number) => {
    if (item === val) {
      (currency.value as unknown as []).splice(index, 1);
    }
  });
};


// const maxLength = (sum: any) => {
//   if (sum.toString().includes('.')) {
//     let left = String(sum).substring(0, sum.toString().indexOf('.'));
//     let right = String(sum).substring(sum.toString().indexOf('.') + 1, sum.toString().length);
//     if (right.length > 5) return left + '.' + right.substring(0, 5);
//   }
// }
const create = async (authorizationType: boolean) => {
  //由于 info 都为 大数(绝大部分为精度为18位)  合约拿到有关 info 的值都需要 除1e18 展示到页面。反之，传给后台的也需要乘1e18（具体需要和后端确认）
  //ethers.utils.formatUnits(res, 18) 这方法为除 1e18
  //ethers.utils.parseUnits(res, 18)  这方法为乘 1e18




  if (
    route.query.type != "2" &&
    (typeof total.value != "number" || Number(date.quantity) < 0)
  )
    return ElMessage.error(t('overall.Creationfailed'));

  if (route.query.type === "1" && (!date.price || Number(date.DeIta) < 0))
    return ElMessage.warning(`${date.price ? "DeIta" : `${t('overall.csjg')}`}${t('overall.Required')}`);

  if (
    route.query.type === "2" &&
    (!date.price || Number(date.DeIta) < 0 || currency.value.length === 0)
  )
    return ElMessage.warning(
      `${date.price ? (date.DeIta ? `${t('overall.cssl')}` : "DeIta") : `${t('overall.csjg')}`
      }${t('overall.Required')}`
    );
  if (
    route.query.type === "3" &&
    (!date.price ||
      Number(date.DeIta) < 0 ||
      !date.Service ||
      !date.quantity ||
      currency.value.length === 0)
  ) {
    if (date.Service) {
      return ElMessage.warning(
        `${date.price ? (date.DeIta ? `${t('overall.cssl')}` : "DeIta") : `${t('overall.csjg')}`
        }${t('overall.Required')}`
      );

    } else {
      return ElMessage.warning(t('overall.pricerequireed3'));
    }
  }
  if (Number(date.price) < 0) return ElMessage.warning(t("overall.minprice"));
  if (
    date.price.toString().includes(".") &&
    String(date.price).substring(String(date.price).indexOf(".")).length > 6
  )
    return ElMessage.warning(t("overall.pricelength"));
  if (
    date.DeIta &&
    date.DeIta.toString().includes(".") &&
    String(date.DeIta).substring(String(date.DeIta).indexOf(".")).length > 6
  )
    return ElMessage.warning(t("overall.DeItalength"));
  if (
    date.Service.toString().includes(".") &&
    String(date.Service).substring(String(date.Service).indexOf(".")).length > 6
  )
    return ElMessage.warning(t("overall.servewrlength"));
  if (Number(date.Service) < 0 || Number(date.Service) > 79)
    return ElMessage.warning(t("overall.minmaxserve"));
  if (Number(date.quantity) <= 0 && route.query.type != "2")
    return ElMessage.warning(t("overall.minunmert"));
  if (
    (date.DeIta as string)?.toString().includes("-") ||
    (date.DeIta as string)?.toString().includes("+") ||
    date.DeIta === "" ||
    date.DeIta == null
  )
    return ElMessage.warning(t("overall.DeItaType"));
  let { price, DeIta, Service, checked } = date;

  console.log("Number(price as string)", price);

  price = Number(price as string);
  DeIta = Number(DeIta as string);
  if (total.value > balance.value && route.query.type != "2")
    return ElMessage.warning(t("overall.Balance"));
  if (
    String(DeIta).includes(".") ||
    String(Service).includes(".") ||
    String(price).includes(".")
  ) {
    let pricelength =
      price &&
      String(price).includes(".") &&
      String(Number(String(price).split(".")[1])).length;
    let DeItalength =
      DeIta &&
      String(DeIta).includes(".") &&
      String(Number(String(DeIta).split(".")[1])).length;
    let servicelength =
      Service &&
      String(Service).includes(".") &&
      String(Number(String(Service).split(".")[1])).length;
    if ((DeItalength as number) > 5 || servicelength > 5 || pricelength > 5)
      return ElMessage.warning(t('overall.length'));
  }
  DeIta = checked === 1 ? 1 + Number(DeIta) / 100 : DeIta;
  // 交易池类型分别为"Token","NFT","TRADE"
  //   0 1 2   // 买 卖  买卖
  // 如若创建“TRADE"池，接收方地址为0x00。
  if (checked == 0 && price < DeIta) {
    return ElMessage.warning(t('overall.pricedad'));
  }
  if (route.query.type != "1") {
    if (checked === 1) {
      //指数
      price = price / DeIta;
      price = price.toFixed(10)
    } else {
      //线性
      price = price - DeIta;
      price = price.toFixed(10)
    }
  }


  console.log(price);
  // if (checked === '1' && price < DeIta / 100) return console.log('初始值必须大于DeIta');
  price = ethers.utils.parseUnits(String(price), 18);
  console.log(ethers.utils.formatUnits(price, 18));

  DeIta = ethers.utils.parseUnits(String(DeIta), 18);

  let totals =
    total.value &&
    ethers.utils.parseUnits(
      route.query.type != "2" ? Number(total.value).toFixed(18) : "0",
      18
    );

  // Service = checked === '1' ? Number(Service) / 100 : Number(Service);
  Service = Number(Service) / 100;
  Service = ethers.utils.parseUnits(String(Service.toFixed(18)), 18);
  let Priceaddress =
    checked === 1
      ? proxy.$common.ExponentialCurve
      : proxy.$common.LinearCurve;

  let type = route.query.type === "1" ? 0 : route.query.type === "2" ? 1 : 2;
  let receive_address =
    route.query.type === "3"
      ? "0x0000000000000000000000000000000000000000"
      : useraddress.value;
  let nftaddress = route.query.searchKey;
  if (!authorizationType && route.query.type != '1') {
    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMPairFactory
    );
    if (!res) {
      //没有授权
      create_show.value = true;
      // Toast.loading({
      //   message: t('overall.empowering') + "...",
      //   forbidClick: true,
      //   loadingType: "spinner",
      //   duration: 0,
      // });
      loading.value = true;
      const loadingInstance = ElLoading.service({
        lock: false,
        text: '',
        background: 'rgba(0, 0, 0, 0.0)',
        spinner:'spinner'
      })
      let res2;
      try {
        res2 = await contracts.NFT.setApprovalForAll(
          proxy.$common.LSSVMPairFactory,
          true
        );
      } catch (e) {
        ElMessage.error(t('overall.privilegegrantfailed'));
        loadingInstance.close()
        console.log(e);
        create_show.value = false;
        // Toast.clear();
        loading.value = false
      }
      if (res2) {
        res2 && (await res2.wait());
        // Toast.clear();
        loading.value = false
        ElMessage.success(t("overall.Empowersucceeded"));
        loadingInstance.close()
        setTimeout(() => {
          // Toast.clear();
          loading.value = false
        }, 1000);
        create_show.value = false;
        let res = await contracts.NFT.isApprovedForAll(
          useraddress.value,
          proxy.$common.LSSVMRouter
        );
        authorization.value = res || false;
        authorization.value = true;
      }
    }
    return;
  }
  let token_ids: any = [];
  if (currency.value.length > 0) {
    //有nft出售
    token_ids = Object.values(currency.value);
    let res;
    try {
      res = await contracts.NFT.isApprovedForAll(
        useraddress.value,
        proxy.$common.LSSVMPairFactory
      );
    } catch (e) {
      create_show.value = false;
      console.log(e);
      // Toast.clear();
      loading.value = false
      ElMessage.error(t('overall.privilegegrantfailed'));
    }
    console.log("授权", res);
    if (!res) {
      //没有授权
      create_show.value = true;
      // Toast.loading({
      //   message: t('overall.empowering') + "...",
      //   forbidClick: true,
      //   loadingType: "spinner",
      //   duration: 0,
      // });
      loading.value = true;
      const loadingInstance = ElLoading.service({
        lock: false,
        text: '',
        background: 'rgba(0, 0, 0, 0.0)',
        spinner:'spinner'
      })
      let res2;
      try {
        res2 = await contracts.NFT.setApprovalForAll(
          proxy.$common.LSSVMPairFactory,
          true
        );
      } catch (e) {
        ElMessage.error(t('overall.privilegegrantfailed'));
        console.log(e);
        create_show.value = false;
        // Toast.clear();
        loading.value = false;
        loadingInstance.close()
      }
      if (res2) {
        res2 && (await res2.wait());
        // Toast.clear();
        loading.value = false
        ElMessage.success(t("overall.Empowersucceeded"));
        setTimeout(() => {
          // Toast.clear();
          loading.value = false;
          loadingInstance.close()
        }, 1000);
        create_show.value = false;
      }
    }
  }
  // Toast.clear();
  loading.value = false
  create_show.value = true;
  // Toast.loading({
  //   message: t('overall.Creating') + "...",
  //   forbidClick: true,
  //   loadingType: "spinner",
  //   duration: 0,
  // });
  loading.value = true;
  const loadingInstance = ElLoading.service({
    lock: false,
    text: '',
    background: 'rgba(0, 0, 0, 0.0)',
    spinner:'spinner'
  })
  console.log(
    nftaddress,
    Priceaddress,
    receive_address,
    type,
    ethers.utils.formatUnits(DeIta, 18),
    ethers.utils.formatUnits(Service, 18),
    ethers.utils.formatUnits(price, 18),
    token_ids,
    { value: totals }, "-----------------------------"
  );
  contracts.LSSVMPairFactory.createPairETH &&
    contracts.LSSVMPairFactory.createPairETH(
      nftaddress,
      Priceaddress,
      receive_address,
      type,
      DeIta,
      Service,
      price,
      token_ids,
      { value: totals }
    )
      .then(async (res: any) => {

        if (ethereum && !ethereum.isBitKeep) {
          await res.wait();
        }

        // Toast.clear();
        loading.value = false
        loadingInstance.close()
        create_show.value = false;
        ElMessage.success(t('overall.Createdsuccessfully'));
        setTimeout(() => {
          router.push({
            path: "/business",
            query: { searchKey: route.query.searchKey }
          });
        }, 2000);
      })
      .catch((e: any) => {
        create_show.value = false;
        // Toast.clear();
        loading.value = false
        loadingInstance.close()
        if (e.toString().includes('execution reverted: Trade fee must be less than 90%')) {
          ElMessage.warning(t('overall.minmaxserve'));
        } else {
          ElMessage.error(t('overall.Creationfailed'));
        }
        console.log(e);
      });
};
const oninputClick = () => {
  console.log("线性")
  if (date.DeIta > 50) {
    date.DeIta = 50
  } else {
    date.DeIta = date.DeIta.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3")
  }
  console.log(date.DeIta.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3"))

  //  if(!date.DeIta.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")){
  //  }
}
const oninputPrice = () => {
  console.log("指数")

  if (date.quantity > 50) {
    date.quantity = 50
  } else {
    // date.quantity=date.quantity.replace(/^(-)*(\d+)\.(\d\d).*$/,"")

    // date.quantity=date.quantity.replace(/[^0-9]/g,'')
  }


}
</script>



<style  lang="scss" scoped>
.head {
  height: .5729rem;
  line-height: .5729rem;
  text-align: center;
  font-size: .1042rem;
}

.three {

  background: linear-gradient(62deg, #905EEA 0%, #47B0E7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.box {
  min-height: 2.5417rem;
  width: 6.1667rem;
  margin: 0 auto;
  padding-top: .1406rem;
  padding-bottom: .1042rem;
  // margin-bottom: .151rem;
  background: rgba(235, 238, 242, 0.2);
  // border: .0052rem solid #DADADA;
  border-radius: .0417rem;


  .content {
    display: flex;
    padding: 0 .1823rem;

    .title-box {
      display: flex;
      align-items: center;
      height: .3646rem;
      border-bottom: .0052rem solid rgba(218, 218, 218, 0.2);

      img {
        width: .1146rem;
        height: .1354rem;
      }

      .title-right {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-left: .0521rem;

        p:nth-child(1) {
          font-size: .0833rem;
          color: #23262F;
          font-family: PingFang SC;
          font-weight: 500;
        }

        p:nth-child(2) {
          font-size: .0729rem;
          color: #777E90;
          font-family: PingFang SC;
          font-weight: bold;
          margin-top: .026rem;
        }

        .deposit {
          display: flex;
          align-items: center;

          img {
            width: .1042rem;
            height: .1042rem;
            margin: 0 .026rem;
          }
        }
      }


    }

    .content-item {
      width: 2.8646rem;
      min-height: 2.2396rem;
      border: .0052rem solid rgba(218, 218, 218, 0.2);
      padding: .0521rem .1198rem;
      // padding: 0 .1198rem .1563rem;
      box-sizing: border-box;



      .title {
        text-align: center;
        font-size: .1042rem;
        line-height: .2865rem;
        margin-top: .0156rem
      }

      .Subheading {
        font-size: .0833rem;
        line-height: .125rem;
        text-align: center;
        margin-bottom: .0521rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: .1042rem;
          height: .1042rem;
          margin: 0 .026rem;
        }
      }

      .form-title {
        font-size: .0833rem;
        display: flex;
        align-items: center;
        margin-top: .0677rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #23262F;

        img {
          width: .0938rem;
          height: .0938rem;
          margin-left: .0417rem;
        }

        .floor-price {
          color: #777E90;
          font-size: .0729rem;
          font-family: PingFang SC;
          font-weight: bold;
          margin-left: .0417rem;
          display: flex;
          align-items: center;
        }
      }

      .fee-input {
        width: 50%;
      }

      .input-box {
        height: .2344rem;
        border: 1px solid rgba(218, 218, 218, 0.2);
        font-size: .0833rem;
        margin-top: .0885rem;
        display: flex;

        input {
          flex: 3.8;
          padding-left: .125rem;
          color: #353945;
          border: none;
          background-color: transparent;
          margin-right: .0521rem;
          font-family: PingFang SC;
          font-weight: bold;
        }


        .second {
          flex: 7.5;
        }

        .input-right {
          // flex: 1;
          display: flex;
          align-items: center;
          font-size: .0833rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #353945;
          padding-right: .1563rem;

          img {
            width: .1042rem;
            height: .1042rem;
            margin-right: .0521rem;
            border-radius: 50%;
          }
        }
      }

      .tips {
        font-size: .0729rem;
        // margin-top: .0781rem;
        line-height: .1563rem;
        font-family: PingFang SC;
        font-weight: 500;
        text-align: left;
        color: #777E90;
        width: 2.3438rem;
        white-space: wrap;
      }

      .error-tips {
        margin-top: 0;
        margin-left: .1333rem;
      }

      .bnt-box {
        display: flex;
        justify-content: space-between;
        color: #3B82F6;

        .active {
          background-color: #3B82F6;
          color: #fff;
        }

        .btn {
          width: 1.2813rem;
          height: .2344rem;
          border: 1px solid #3B82F6;
          font-size: .0833rem;
          text-align: center;
          line-height: .2344rem;
          margin-top: .0885rem;
          font-family: PingFang SC;
          font-weight: bold;
          border-radius: .0417rem;
          cursor: pointer;
        }
      }
    }


    .content-item:first-child {
      margin-right: .0521rem;
      box-sizing: border-box;
    }

    .content-item:last-child {
      margin-left: .0521rem;
      // text-align: center;
      // padding: 0 .2865rem;  
      box-sizing: border-box;

      .line {
        width: 100%;
        height: .0052rem;
        background-color: rgba(187, 187, 187, 0.5);
        margin-top: .1042rem;
      }

      .spacing {
        margin-top: .1667rem;
      }

      .tips {
        font-size: .0833rem;
        color: #23262F;
        margin-top: .0677rem;
        font-family: PingFang SC;
        font-weight: bold;
      }

      .mini {
        font-size: .0833rem;
        margin-top: -0.1302rem;
        text-align: right;
        // padding-right: .625rem;
      }

      .buy-box {
        // display: flex;
        font-size: .1042rem;
        // align-items: center;
        // margin-top: .1563rem;

        // justify-content: center;


        .select-c {
          // width: 1.625rem;
          // border: 1px solid rgba(187, 187, 187, 1);
          height: .2344rem;
          color: rgba(16, 16, 16, 1);
          border-radius: .026rem;
          margin-right: -0.0521rem;
          // margin-left: .0781rem;
          margin-top: .0365rem;
        }

        .input-box1 {
          display: flex;
          height: .2344rem;
          font-size: .0833rem;
          margin-top: .0313rem;

          input {
            width: 1.2813rem;
            height: .2344rem;
            background-color: transparent;
            padding-left: .0521rem;
            color: #353945;
            font-size: .0833rem;
            border: 1px solid #EEF0F2;
            border-radius: .0417rem;
            font-family: PingFang SC;
            font-weight: bold;
          }

          .Company {
            font-size: .0833rem;
            font-family: PingFang SC;
            font-weight: bold;
            line-height: .2344rem;
            margin-left: .0625rem;
            width: 1.1458rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .select-box {
        // padding: .099rem 0 .0365rem 0;
      }

      .Deposit-box {

        // padding: 0 .1458rem .0365rem .1458rem;
        p {
          font-size: .0833rem;
          display: flex;
          align-items: center;
          margin-top: .0677rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #23262F;
        }

        .item-box {
          overflow-x: hidden;
          overflow-y: scroll;
          max-height: 1.3021rem;
          .Deposit-item {
            display: flex;
            justify-content: space-between;
            height: .2188rem;
            font-size: .0677rem;
            line-height: .2188rem;

            div:nth-child(2) {
              width: .3958rem;
              height: .1458rem;
              border-radius: .0208rem;
              line-height: .1458rem;
              text-align: center;
              background-color: #3B82F6;
              color: #fff;
              cursor: pointer;
            }
          }

        }

        .item-box::-webkit-scrollbar {
          display: none;
        }



      }


    }
  }

  .total-box {
    display: flex;
    justify-content: left;
    font-size: .0833rem;


    p:first-child {
      margin-right: .026rem;
    }
  }


}

.footer {
  width: 6.1667rem;
  margin: 0 auto;
  display: flex;
  justify-content: right;
  padding-right: .151rem;
  margin-bottom: .3177rem;

  .btn-item {
    width: 1.2813rem;
    height: .2344rem;
    text-align: center;
    font-size: .0833rem;
    line-height: .2344rem;
    border-radius: .0417rem;
    background: #3B82F6;
    color: #fff;
    cursor: pointer;
  }

  .btn-item:last-child {
    border: 1px solid #3B82F6;
    margin-left: .0625rem;
    background-color: #fff;
    color: #3B82F6;

  }
}

:deep(.el-select) {
  .el-input{
    width: 2.625rem;
    height: .2344rem;
    border: none;
  }
}

:deep(.el-select-dropdown__item) {
  padding: 0 32px 0 20px !important;
}

:deep(.el-select__popper) {
  &.el-popper{
    background-color: #fff !important;
  }
}

:deep(.el-loading-spinner){
  .circular{
    display: none !important;
  }
}

:deep(.el-loading-mask) {
  .is-fullscreen .el-loading-spinner{
    display: none !important;
  }
}

.home {
  margin-top: .2604rem;
}
.spinner{
  display: none;
}
</style>
