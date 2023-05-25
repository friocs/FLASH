<template>
  <div style="margin-bottom: 3rem ">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar :title="title" left-arrow safe-area-inset-top :border="false" @click-left="onClickLeft" />
    </van-config-provider>
    <div class="detailslist" style="margin-bottom: .3rem;">
      <div class="Tips">
        <p>{{ t("NFTdetails.Initialprice") }}</p>
        <van-popover v-model:show="showPopover.price" placement="top-start" :offset="[-8,10]">
          {{t('createpond.top1')}}
          <template #reference>
            <van-image width="30%" height="30%" fit="cover" :src="getPath('@/assets/img/questions.png')" />
          </template>
        </van-popover>
      </div>
      <div class="details" @click="Getcursor('price')">
        <div>
          <!--  @keyup="pricelength(date.price)" -->
          <input ref="price" v-model="date.price" type="Number" @input="date.price=lengthLimit(date.price,5)"
            :placeholder=" t('business.Tips')" />
          <van-image width="5%" height="5%" fit="cover" :src="getPath('@/assets/img/WBNB.png')" />
        </div>
      </div>
      <div class="Tips" v-if="route.query.type != '2'">
        <p>{{ t("NFTdetails.quantity") }}</p>
      </div>
      <!-- @input="delmsg" -->
      <div class="details" style="margin-bottom: 0;" @click="Getcursor('quantity')" v-if="route.query.type != '2'">
        <input ref="quantity" v-model="date.quantity" type="Number" @input="date.quantity=lengthLimit(date.quantity,5)"
          :placeholder="t('NFTdetails.Pleaseenter')" />
      </div>
      <!-- <div class="details details_selected" v-if="route.query.type != '1'"> -->


      <div class="Tips">
        <p style="margin-top: 0.2rem;">{{ t("NFTdetails.Curvetype") }}</p>
        <van-popover v-model:show="showPopover.DeItaType" placement="top-start" :offset="[-8, 10]">
          {{t('createpond.top2')}}
          <template #reference>
            <van-image width="30%" height="30%" fit="cover" :src="getPath('@/assets/img/questions.png')" />
          </template>
        </van-popover>
      </div>
      <div class="details Line" :style="{ 'margin-bottom': date.DeIta === null ? '.5rem' : '0' }">
        <div>
          <el-radio-group v-model="date.checked" class="ml-4">
            <el-radio label="0" size="large">{{
            t("NFTdetails.Linearcurve")
            }}</el-radio>
            <el-radio label="1" size="large">{{
            t("NFTdetails.Exponentialcurve")
            }}</el-radio>
          </el-radio-group>
        </div>
        <div class="Details" @click="Getcursor('DeIta')">
          <div>
            <!-- @keyup="DeItalength(date.DeIta)" -->
            <input v-model="date.DeIta" ref="DeIta" type="number" max="100"
              @input="date.DeIta=lengthLimit(date.DeIta.toString(),5)" min="0" :placeholder="DeItal_Tipe" />
            <p>DeIta</p>
          </div>
        </div>
      </div>
      <p class="tips" v-show="date.DeIta != null">
        {{ Tips }} {{ date.DeIta }} {{ date.checked === "1" ? "%" : "ETC" }}
      </p>
      <div class="Tips" v-if="route.query.type === '3'">
        <p>{{ t("NFTdetails.ServiceCharge")}}</p>
        <van-popover v-model:show="showPopover.Service" placement="top-start" :offset="[-8, 10]">
          {{t('createpond.top3')}}
          <template #reference>
            <van-image width="30%" height="30%" fit="cover" :src="getPath('@/assets/img/questions.png')" />
          </template>
        </van-popover>
      </div>

      <div class="details" @click="Getcursor('Service')" v-if="route.query.type === '3'">
        <!-- @keyup="servelength" -->
        <input class="service" ref="Service" v-model="date.Service" min="0" max="90"
          @input="date.Service = lengthLimit(date.Service,5)" type="Number"
          :placeholder="t('NFTdetails.Pleaseenter')" /><span>%</span>
      </div>

      <div v-if="route.query.type=='3'" style="text-align: left;" :style="{top:route.query.type=='3'?'12.5rem':''}">
        <!-- route.query.type != '2' &&  -->
        <div class="total" style=" margin-bottom: 0.4rem;  padding:0 " v-if="typeof total == 'number'">
          <p>{{ t("NFTdetails.total") }}</p>
          <p style="display: block;">{{ total }}ETC</p>
        </div>
        <!-- route.query.type != '2' && -->
        <p v-if="
          date.price &&
          date.DeIta &&
          date.quantity &&
          typeof total == 'string'
        " style="color: red; margin-bottom: 0.4rem;font-size: 0.28rem;">
          {{ total }}
        </p>
        <!-- <div class="total">
    <p>总量</p>
    <p>10BNB</p> -->
      </div>
      <div class="select create_pond" v-if="route.query.type != '1'">
        <el-select effect="dark" popper-class="create_elptions" v-model="currency" size="large" class="m-3" multiple
          collapse-tags collapse-tags-tooltip :placeholder="t('NFTdetails.SelectNFT')">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="nftlist" v-show="currency.length > 0">
        <p>{{ t("NFTdetails.NFTselected") }}:</p>
        <div>
          <p v-for="item in currency" :key="item">
            {{ item }}
            <span @click="delNftlist(item)">{{ t("NFTdetails.delete") }}</span>
          </p>
        </div>
      </div>

    </div>

    <div v-if="route.query.type!='3'" style="text-align: left;" :style="{top:route.query.type=='3'?'12.5rem':''}">
      <div class="total" v-if="route.query.type != '2' && typeof total == 'number'">
        <p>{{ t("NFTdetails.total") }}</p>
        <p style="display: block;">{{ total }}ETC</p>
      </div>
      <p v-if="
        route.query.type != '2' &&
        date.price &&
        date.DeIta &&
        date.quantity &&
        typeof total == 'string'
      " style="color: red; padding:0 0.65rem; margin-bottom: 2.5rem;font-size: 0.28rem;">
        {{ total }}
      </p>
      <!-- <div class="total">
    <p>总量</p>
    <p>10BNB</p> -->
    </div>

    <div class="btn" @click="create(authorization)">
      <div>
        {{ route.query.type != "1" && !authorization ? t('overall.empower') : title }}
      </div>
    </div>
    <van-overlay :show="create_show" />
  </div>
</template>

<script lang='ts' setup>
import {
  ref,
  computed,
  reactive,
  onMounted,
  getCurrentInstance,
  inject,
} from "vue";
import "@/assets/css/vant1.scss";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { number } from "@intlify/core-base";
import { ethers } from "ethers";
import ERC20 from "@/utils/contracts/ERC20.json";
import { Toast } from "vant";
import {getPath} from '@/utils'
import { getMyNft } from "@/api/my";
import { useStates } from "@/hooks/userStore";
import { ElLoading } from "element-plus";
import LSSVMPairFactory from "@/utils/contracts/LSSVMPairFactory.json";
import NFT from "@/utils/contracts/NFT.json";
import { mynftType } from "@/utils/type";
import { initSigner } from "@/utils/thhersUtils";
import lengthLimit from '@/hooks/userLengthLimit'
import BigNumber from 'bignumber.js'
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

const options = ref<mynftType[]>();
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
  setTimeout(function initTimer (): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
    else init();
  });
});

const DeItal_Tipe = computed(
  () => `${t('NFTdetails.Pleaseenter')}${date.checked === "1" ? "(%)" : "(ETC)"}`
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
    if (date.checked === "1") price = price / (1 + DeIta / 100);
    else price = price - DeIta;
  }
  console.log("当前价格", price);
  if (date.checked === "1") {
    //指数
    if (DeIta != 0) {
      // let bigprice = new BigNumber(price);
      // let bigDeIta = new BigNumber(DeIta);
      // let yi = new BigNumber(1);
      // let yib = new BigNumber(100);
      // let bigquantity = new BigNumber(quantity);
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // //@ts-ignore
      // let left = bigprice.multipliedBy(yi.minus(yi.dividedBy(bigDeIta.dividedBy(yib).plus(yi)))).toNumber() ** quantity;
      // let righy = yi.minus(yi.dividedBy(bigDeIta.dividedBy(yib).plus(yi)))
      // console.log('bigNumber', new BigNumber(left).dividedBy(righy).toString())
      // // total = bigprice.multipliedBy(yi.minus(yi.dividedBy(bigDeIta.dividedBy(yib.plus(yi))))).toNumber() ** bigquantity.toNumber().dividedBy(yi.minus(yi).dividedBy(bigDeIta.dividedBy(yib).plus(yi))).toNUmber());
      // console.log('Number', Number(
      //   (price * (1 - 1 / (DeIta / 100 + 1) ** quantity)) /
      //   (1 - 1 / (DeIta / 100 + 1))))
      total = Number(
        (price * (1 - 1 / (DeIta / 100 + 1) ** quantity)) /
        (1 - 1 / (DeIta / 100 + 1))
      );
    } else {
      total = price * quantity;
    }
  } else {
    //线性
    // price = price - DeIta
    let total2 = price;
    for (let i = 1; i < quantity; i++) {
      if (total2 < 0) break;
      total2 = total2 - DeIta;
    }
    console.log(total2);
    total = quantity * price - (DeIta * (quantity * (quantity - 1))) / 2;
    if (total2 <= 0) {
      total = `${t('overall.buysum')}${quantity}`;
    }
  }
  console.log(total);
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
  checked: "0",
});

let currency = ref<string>("");

const themeVars = {
  navBarIconColor: "#101010",
  navBarTextColor: "#101010",
};
let title = ref<string>("");

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
  title.value = t("NFTdetails.establish") + t("NFTdetails.Buyapool");
} else if (route.query.type === "2") {
  title.value = t("NFTdetails.establish") + t("NFTdetails.Sellingpool");
} else {
  title.value = t("NFTdetails.establish") + t("NFTdetails.Tradingpool");
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
    return Toast.fail(t('overall.Creationfailed'));
  if (route.query.type === "1" && (!date.price || Number(date.DeIta) < 0))
    return Toast.fail(`${date.price ? "DeIta" : `${t('overall.csjg')}`}${t('overall.Required')}`);
  if (
    route.query.type === "2" &&
    (!date.price || Number(date.DeIta) < 0 || currency.value.length === 0)
  )
    return Toast.fail(
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
      return Toast.fail(
        `${date.price ? (date.DeIta ? `${t('overall.cssl')}` : "DeIta") : `${t('overall.csjg')}`
        }${t('overall.Required')}`
      );
    } else {
      return Toast.fail(t('overall.pricerequireed3'));
    }
  }
  if (Number(date.price) < 0) return Toast.fail(t("overall.minprice"));
  if (
    date.price.toString().includes(".") &&
    String(date.price).substring(String(date.price).indexOf(".")).length > 6
  )
    return Toast.fail(t("overall.pricelength"));
  if (
    date.DeIta &&
    date.DeIta.toString().includes(".") &&
    String(date.DeIta).substring(String(date.DeIta).indexOf(".")).length > 6
  )
    return Toast.fail(t("overall.DeItalength"));
  if (
    date.Service.toString().includes(".") &&
    String(date.Service).substring(String(date.Service).indexOf(".")).length > 6
  )
    return Toast.fail(t("overall.servewrlength"));
  if (Number(date.Service) < 0 || Number(date.Service) > 90)
    return Toast.fail(t("overall.minmaxserve"));
  if (Number(date.quantity) <= 0 && route.query.type != "2")
    return Toast.fail(t("overall.minunmert"));
  if (
    (date.DeIta as string)?.toString().includes("-") ||
    (date.DeIta as string)?.toString().includes("+") ||
    date.DeIta === "" ||
    date.DeIta == null
  )
    return Toast.fail(t("overall.DeItaType"));
  let { price, DeIta, Service, checked } = date;
  price = Number(price as string);
  DeIta = Number(DeIta as string);
  if (total.value > balance.value && route.query.type != "2")
    return Toast.fail(t("overall.Balance"));
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
      return Toast.fail(t('overall.length'));
  }
  DeIta = checked === "1" ? 1 + Number(DeIta) / 100 : DeIta;
  // 交易池类型分别为"Token","NFT","TRADE"
  //   0 1 2   // 买 卖  买卖
  // 如若创建“TRADE"池，接收方地址为0x00。

  if (route.query.type != "1") {
    if (checked === "1") {
      //指数
      price = price / DeIta;
    } else {
      //线性
      price = price - DeIta;
    }
  }
  // if (checked === '1' && price < DeIta / 100) return console.log('初始值必须大于DeIta');
  if (checked === "0" && price < DeIta && route.query.type != "1")
    return Toast.fail(t('overall.pricedad'));
  price = ethers.utils.parseUnits(price.toFixed(18), 18);
  DeIta = ethers.utils.parseUnits(DeIta.toFixed(18), 18);
  let totals =
    total.value &&
    ethers.utils.parseUnits(
      route.query.type != "2" ? Number(total.value).toFixed(18) : "0",
      18
    );
  // Service = checked === '1' ? Number(Service) / 100 : Number(Service);
  Service = Number(Service) / 100;
  Service = ethers.utils.parseUnits(Service.toFixed(18), 18);
  let Priceaddress =
    checked === "1"
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
      Toast.loading({
        message: t('overall.empowering') + "...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      let res2;
      try {
        res2 = await contracts.NFT.setApprovalForAll(
          proxy.$common.LSSVMPairFactory,
          true
        );
      } catch (e) {
        Toast.fail(t('overall.privilegegrantfailed'));
        console.log(e);
        create_show.value = false;
        Toast.clear();
      }
      if (res2) {
        res2 && (await res2.wait());
        Toast.clear();
        Toast.success(t("overall.Empowersucceeded"));
        setTimeout(() => {
          Toast.clear();
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
      Toast.clear();
      Toast.fail(t('overall.privilegegrantfailed'));
    }
    console.log("授权", res);
    if (!res) {
      //没有授权
      create_show.value = true;
      Toast.loading({
        message: t('overall.empowering') + "...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      let res2;
      try {
        res2 = await contracts.NFT.setApprovalForAll(
          proxy.$common.LSSVMPairFactory,
          true
        );
      } catch (e) {
        Toast.fail(t('overall.privilegegrantfailed'));
        console.log(e);
        create_show.value = false;
        Toast.clear();
      }
      if (res2) {
        res2 && (await res2.wait());
        Toast.clear();
        Toast.success(t("overall.Empowersucceeded"));
        setTimeout(() => {
          Toast.clear();
        }, 1000);
        create_show.value = false;
      }
    }
  }
  Toast.clear();
  create_show.value = true;
  Toast.loading({
    message: t('overall.Creating') + "...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 0,
  });
  console.log(
    nftaddress,
    Priceaddress,
    receive_address,
    type,
    DeIta,
    Service,
    price,
    token_ids,
    { value: totals }
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
        await res.wait();
        Toast.clear();
        create_show.value = false;
        Toast.success(t('overall.Createdsuccessfully'));
        setTimeout(() => {
          router.go(-1);
        }, 2000);
      })
      .catch((e: any) => {
        create_show.value = false;
        Toast.clear();
        if (e.toString().includes('execution reverted: Trade fee must be less than 90%')) {
          Toast.fail(t('overall.minmaxserve'));
        } else {
          Toast.fail(t('overall.Creationfailed'));
        }
        console.log(e);
      });
};
</script>


<style scoped lang="scss">

</style>
