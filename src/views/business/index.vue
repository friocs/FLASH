<template>
  <div class="business_box">
    <search />
    <div class="business">
      <div class="business_new1">
        <div class="business-header">
          <div class="avatar-logo">
            <el-avatar fit="cover" class="business-logo" v-if="nftContract.contractLogo"
              :src="nftContract.contractLogo">
              <img src="https://www.superswap.cool/image/profilePhoto/A_236.png" />
            </el-avatar>
            <el-avatar fit="cover" class="business-logo" v-else
              src="https://www.superswap.cool/image/profilePhoto/A_236.png" />
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
      <div class="business-table-title">
        <h2>{{$t('business.Orders')}}</h2>
        <router-link :to="`/business/create_new?searchKey=${ searchKey.value || proxy.$common.DefaultUrl }`">
          {{$t('business.priceFixingtransaction')}}&nbsp;
          <el-icon>
            <DArrowRight />
          </el-icon>
        </router-link>
        <div class="line"></div>
      </div>
      <div class="business-table">
        <div class="select-NFT">
          <div class="nft-items">
            <div v-if="activeName == 'first'" class="title_nft">
              <span>{{selectNFT.length}}/{{updateLength(sellOrdersAll)}}</span>
            </div>
            <div v-else-if="activeName == 'second'" class="title_nft">
              <span>{{currency.length}}/{{options.length}}</span>
            </div>
            <!-- 买入筛选 -->
            <div class="content" v-if="activeName == 'first'">
              <!--  @click="addOrRemoveNFT(item.nftTokenId)" -->
              <el-card shadow="hover" v-for="item in sellOrdersAll" @click="addOrRemoveNFT(item.nftTokenId)"
                :key="item.nftTokenId" class="nft-item" :class="{isActive:selectNFT.includes(item.nftTokenId)}">
                <el-image :src="item.nftImage" fit="cover" lazy>
                  <template #error>
                    <div class="loading_img">
                      <el-icon style="width: 20px;height:20px">
                        <Picture />
                      </el-icon>
                    </div>
                  </template>
                  <template #placeholder>
                    <div class="loading_img">
                      <van-loading color="#1989fa" />
                      <!-- <div style="font-size:12px;margin-top:10px">loading<span class="dot">...</span></div> -->
                    </div>
                  </template>
                </el-image>
                <footer>
                  <div>#{{item.nftTokenId}}</div>
                  <span>
                    <img
                      src="@/assets/img/BNB.png" />
                    {{proxy.$filters.numFilters5(item.feePrice)}}
                  </span>
                </footer>
              </el-card>
              <el-empty style="position: absolute;left: 50%;transform: translateX(-50%);top: 10%;"
                v-if="(sellOrdersAll.length <= 0)" :image-size="120" description="No Data" />
            </div>
            <!-- 卖出筛选 -->
            <div class="content" v-else-if="activeName == 'second'">
              <el-card shadow="hover" @click="addOrRemoveNFTSell(item.value)" v-for="item in options" :key="item.value"
                class="nft-item" :class="{isActive:currency.includes(item.value)}">
                <el-image :src="item.metaDataImage" fit="cover" lazy>
                  <template #error>
                    <div class="loading_img">
                      <el-icon style="width: 20px;height:20px">
                        <Picture />
                      </el-icon>
                    </div>
                  </template>
                  <template #placeholder>
                    <div class="loading_img">
                      <van-loading color="#1989fa" />
                      <!-- <div style="font-size:12px;margin-top:10px">loading<span class="dot">...</span></div> -->
                    </div>
                  </template>
                </el-image>
                <footer>
                  <div>#{{item.value}}</div>
                </footer>
              </el-card>
              <el-empty style="position: absolute;left: 50%;transform: translateX(-50%);top: 10%;"
                v-if="(options.length <= 0)" :image-size="120" description="No Data" />
            </div>
          </div>
          <div class="table_list_left">
            <el-tabs v-model="activeName_1" class="demo-tabs">
              <el-tab-pane :label="$t('business.Whole_network_transaction')" name="first">
                <czTable :data="transactionlist" :active="22"></czTable>
                <el-pagination style="display: flex;justify-content: center;margin-top: 20px;"
                  v-model:current-page="pageDataAll.current" v-model:page-size="pageDataAll.size" small background
                  layout="total, prev, pager, next" :total="pageDataAll.total"
                  @current-change="(val)=>{pageDataAll.current = val;getAllTransactions()}" />
              </el-tab-pane>
              <el-tab-pane :label="t('business.Mydeal')" name="second">
                <!-- 表格 -->
                <div>
                  <czTable :data="Mytransactionlist" :active="2"></czTable>
                  <el-pagination style="display: flex;justify-content: center;margin-top: 20px;"
                    v-model:current-page="pageDataMy.current" v-model:page-size="pageDataMy.size" small background
                    layout="total, prev, pager, next" :total="pageDataMy.total"
                    @current-change="(val)=>{pageDataMy.current = val;getMyAllTransaction()}" />
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="businessNew_list">
          <div class="table-list newList">
            <div class="table-flex" style="justify-content: space-between;">
              <div class="number">{{ $t('business.number') }}</div>
              <div class="priceBNB">{{ $t('business.price') }}(ETC)</div>
            </div>
            <div class="table-flex left" style="justify-content: space-between;">
              <div class="number">{{ $t('business.Cumulative_depth') }}</div>
              <div class="priceBNB">
                {{ proxy.$filters.numFilters2(transactionDepth.sellOrderCount)}}{{ $t('business.single') }}
              </div>
              <div class="priceBNB"> {{Number(transactionDepth.sellTotalPrice).toFixed(4)}}</div>
            </div>
            <!-- --------- -->
            <template v-if="sellOrders.length != 0">
              <div class="table-flex left" style="justify-content: space-between;" v-for="item in sellOrders"
                :key="item.code">
                <div v-if="item.nftTokenId">#{{ item.nftTokenId }}</div>
                <div v-else>--</div>
                <div class="priceBNB"> {{ item.feePrice? numFilters(item.feePrice): "--" }}</div>
              </div>
            </template>
            <template v-else>
              <div class="table-flex left" style="justify-content: space-between;" v-for="item in orders"
                :key="item.code">
                <div class="number">--</div>
                <div class="priceBNB">
                  --
                </div>
              </div>
            </template>
            <!-- --------- -->
            <template v-if="buyOrders.length != 0">
              <div class="table-flex right_1" style="justify-content: space-between;" v-for="item in buyOrders"
                :key="item.code">
                <div v-if="item.nftTokenId">{{ item.nftTokenId }}</div>
                <div v-else>--</div>
                <div class="priceBNB"> {{ item.feePrice? numFilters(item.feePrice): "--" }}</div>
              </div>
            </template>
            <template v-else>
              <div class="table-flex right_1" style="justify-content: space-between;" v-for="item in orders"
                :key="item.code">
                <div class="number">--</div>
                <div class="priceBNB">
                  --
                </div>
              </div>
            </template>
            <div class="table-flex right_1" style="justify-content: space-between;">
              <div class="number">{{ $t('business.Cumulative_depth') }}</div>
              <div class="priceBNB"> {{ proxy.$filters.numFilters2(transactionDepth.buyOrderCount)
              }}{{ $t('business.single') }}</div>
              <div class="priceBNB"> {{
              numFilters(transactionDepth.buyTotalPrice) == 'null' ? '--' :
              numFilters(transactionDepth.buyTotalPrice)
              }}</div>
            </div>
          </div>
          <div></div>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane :label="$t('business.purchase')" name="first">
              <div class="right">
                <div class="right-title title_new">
                  <div>{{t("business.minimumprice")}}</div>
                  <span>
                    <img
                      src="@/assets/img/BNB.png" />
                    {{ updatePrice(sellOrders, "sell") }}
                  </span>
                </div>
                <div class="right-title">
                  {{ $t('business.quantity') }}
                </div>
                <van-stepper v-model="Purchase" @change="changePurchase" disable-input integer :min="0"
                  :max="updateLength(sellOrdersAll)" />
                <div class="right-title">
                  <div>{{ t("business.amount")}}</div>
                  <span
                    style="width: 100%;display: block;font-size: 13px;font-weight: bold;display: flex;align-items: center;justify-content: center;">
                    <img style="margin-right: 8px;" height="20"
                      src="@/assets/img/BNB.png" />
                    {{ businesslist_type === 1 ? buyPrice + " ETC" :currency.length}}
                  </span>
                </div>
                <div class="right-footer" @click="buy(1)">
                  <div style="display:flex;justify-content: center;">
                    <van-loading type="spinner" v-show="loadingShow" size="25px" style="padding-right: 10px;" />
                    <span v-show="loadingShow"> {{t("overall.Purchasing") }}</span>
                  </div>
                  <span v-show="!loadingShow">{{ t("business.purchase") }}</span>

                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('business.sellout')" name="second">
              <div class="right">
                <div class="right-title title_new">
                  <div>{{ t("business.Bestprice")}}</div>
                  <span>
                    <img
                      src="@/assets/img/BNB.png" />
                    {{ updatePrice(buyOrders, "buy") }}
                  </span>
                </div>
                <div class="right-title">
                  {{ $t('business.SelectNFT_1') }}
                </div>
                <div>
                  <el-select v-model="currency" disabled :no-data-text="t('overall.nonft')"
                    :placeholder="t('NFTdetails.SelectNFT')" multiple collapse-tags collapse-tags-tooltip>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <div class="right-title">
                  {{`${ t("business.Selected") }`}} :
                  <span style="padding-left:10px;color: #5a64e9;">{{ currency.length }} </span>
                </div>
                <div class="right-footer footer_btn" @click="buy(2, authorization)">
                  <div style="display:flex;justify-content: center;" v-show="loadingShow_1">
                    <van-loading type="spinner" size='25px' style="padding-right: 10px;" />
                    <span> {{ $t('overall.Selling') }}</span>
                  </div>
                  <span v-show="!loadingShow_1"> {{ $t('business.sellout') }}</span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <van-overlay :show="create_show_1" @click.stop="create_show_1 = false">
        <div class="wrapper_1" @click.stop>
          <div class="block">
            <div class="wrapper_1-title">
              <div>{{ t("business.Authorize") }}</div>
              <div @click="create_show_1 = false" style="cursor: pointer;">x</div>
            </div>
            <div class="wrapper_1-describe">
              <img src='@/assets/img/shouquan.png' />
            </div>
            <div style="text-align: center;">
              <van-loading color="#1989fa" />
            </div>
            <div style='padding-top: 10px;line-height: 25px;'>
              {{ t("overall.series") }} </div>
          </div>
        </div>
      </van-overlay>
      <!-- 购买成功的弹框 -->
      <van-overlay :show="buy_show_2">
        <div class="wrapper_1" @click.stop>
          <div
            style="width: 15%;  background: #FFFFFF;border-radius:15px; padding-bottom: 20px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
            <img style="margin-top:25px" src="../../assets/icon.png" width="45" height="45" />
            <div style="font-weight: 400;color: #0F0F0F;font-size: 16px;padding-top: 10px;">{{ t("overall.spSucceed") }}
            </div>
            <div style="display:flex;    align-items: center;justify-content: center;margin-top:20px">
              <div @click.stop="buy_show_2 = false" class=""
                style="height: 45px;background: #5A64E9;border-radius: 21px;width: 200px;line-height: 45px;font-size: 14px;color: #fff; text-align: center;">
                {{ t("business.confirm") }}
              </div>
            </div>

          </div>
        </div>

      </van-overlay>
      <!-- 出售成功 -->
      <van-overlay :show="buy_show">
        <div class="wrapper_1" @click.stop>
          <div
            style="width: 15%;  background: #FFFFFF;border-radius:15px; padding-bottom: 20px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
            <img style="margin-top:25px" src="../../assets/icon.png" width="45" height="45" />
            <div style="font-weight: 400;color: #0F0F0F;font-size: 16px;padding-top: 10px;">{{ t("overall.Succeed") }}
            </div>
            <div style="display:flex;    align-items: center;justify-content: center;margin-top:20px">
              <div @click.stop="buy_show = false" class=""
                style="height: 45px;background: #5A64E9;border-radius: 21px;width: 200px;line-height: 45px;font-size: 14px;color: #fff;    text-align: center;">
                {{ t("business.confirm") }}
              </div>
            </div>

          </div>
        </div>

      </van-overlay>
    </div>
    <connectBox :ConnectWallet="ConnectWallet" @change="changeConect"></connectBox>
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
} from "vue";
import { nftrecordType } from "@/utils/type";
import { useRoute } from "vue-router";
import search from "@/components/search.vue";
import { Picture } from '@element-plus/icons-vue'
import { useI18n } from "vue-i18n";
import { ethers } from "ethers";
import LSSVMRouter from "@/utils/contracts/LSSVMRouter.json";
import { copy } from "@/utils/copy";
import {
  getNftContractHandicap,
  buyNftForCurPrice,
  sellNftForCurPrice,
} from "@/api/business";
import { getMaketAllTransaction, getMaketMyTransaction } from "@/api/my";
import { getMyNft } from "@/api/my";
import { useStates, useActions } from "@/hooks/userStore";
import { initSigner } from "@/utils/thhersUtils";
import { mynftType } from "@/utils/type";
import { Toast } from "vant";
import czTable from "@/components/czTable.vue";
import NFT from "@/utils/contracts/NFT.json";
import Factory from "@/utils/contracts/Factory.json";
import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";
import AggregationJSON from "@/utils/contracts/Aggregation.json";
import "@/assets/css/vant2.scss"
import numFilters from '@/hooks/userNumFilters'
import { getNftTop } from "@/api/home";
import { ElLoading } from 'element-plus'
import { filterLogin } from '@/utils/DialogSwitchChain'
import { DArrowRight } from '@element-plus/icons-vue'
import { ElementSDK, Network } from "element-js-sdk";
let ConnectWallet = ref<boolean>(false)
const Actions: any = useActions(["setScreen"], "PageType");
const orders: any = reactive([1, 2, 3, 4, 5])

const { proxy } = getCurrentInstance() as any;
const buy_show = ref(false);
const buy_show_2 = ref(false);
const create_show_1 = ref(false);
const textShow_1 = ref(true);
const textShow = ref(false);
const Showmore_1 = ref(false);
const Showmore = ref(false);

let loadingShow = ref(false)
let loadingShow_1 = ref(false)
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
const route = useRoute();
const activeName = ref('first')
const activeName_1 = ref('first')

//选择NFT逻辑 start
let selectNFT = ref<string[]>([])
const addOrRemoveNFT = (id) => {
  let index = selectNFT.value.indexOf(id)
  if (index != -1) {
    selectNFT.value.splice(index, 1)
    Purchase.value--;
  } else {
    selectNFT.value.push(id)
    Purchase.value++;
  }
}

const addOrRemoveNFTSell = (id) => {
  let index = currency.value.indexOf(id)
  if (index != -1) {
    currency.value.splice(index, 1)
  } else {
    currency.value.push(id)
  }
}
const changePurchase = (val) => {
  if (selectNFT.value.length > val) {
    selectNFT.value.splice(val, selectNFT.value.length); //截取掉多余的
  } else if (selectNFT.value.length < val) { //小于
    let sub = val - selectNFT.value.length
    sellOrdersAll.value.forEach(val => {
      if (!selectNFT.value.includes(val.nftTokenId) && sub > 0) {
        selectNFT.value.push(val.nftTokenId)
        sub--;
      }
    })
  }
}
//选择NFT逻辑 end
let { t } = useI18n();
const { locale } = useI18n();

const create_show = ref(false);

let pricelist = reactive<any>({
  floorPrice: 0,
  highestOffer: 0,
  totalPrice: 0,
  totalTransaction: 0,
});
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
let transactionDepth = reactive<any>({
  sellOrderCount: 0,
  sellTotalPrice: 0,
  buyOrderCount: 0,
  buyTotalPrice: 0,
});

let useraddress = ref("");
let authorization = ref(false);

const contracts: any = {};
const webValue = reactive<any>({
  timeNow: new Date().getTime(),

})

const updateLength = (data: any) => {
  let arr = data.filter((val: any) => val.feePrice != "--");
  return arr.length;
};

let buyPrice = computed(() => {
  if (Purchase.value <= 0) {
    return 0;
  } else {
    let total = 0;
    sellOrdersAll.value.forEach((val: any) => {
      let newsellOrders = val.feePrice;
      if (selectNFT.value.includes(val.nftTokenId)) {
        if (newsellOrders && !newsellOrders.toString().includes("-")) total += newsellOrders;
      }
    });
    return total.toFixed(4);
  }
});
let buyOrders = ref<any[]>([]);
let sellOrders = ref<any[]>([]);
let sellOrdersAll = ref<any>([]);

let timeType = ref<any>("");
let active_1 = reactive<any>({
  value: '1',
});
const hexAddress: any = inject("hexAddress");
const transactionlist = ref<any>([]);
const Mytransactionlist = ref<any>([]);


let secondCard: any = ref(false);
// 路由上的盘口与默认盘口
const searchKey = reactive<any>({
  value: '',
});

//监听切换
watch(() => activeName_1.value, (newValue) => {
  if (newValue == 'first') {
    getAllTransactions();
  } else if (newValue == 'second') {
    getMyAllTransaction();
  }
})
watch(() => activeName.value, (newValue) => {
  if (newValue == 'second') {
    secondCard.value = true;
    active_1.value = 1
  } else {
    secondCard.value = false;
  }
})
let timeType2: any;
onMounted(async () => {
  searchKey.value = route.query && route.query.searchKey || ''
  time()
  await getNftTopList()
  console.log(searchKey.value, 'searchKey.value');
  let tries = 0;
  setTimeout(function initTimer(): void {
    //@ts-ignore
    if (!window.ethereum && ++tries < 50) return setTimeout(initTimer, 20);
    else init();
  });
  timeType2 = setInterval(() => {
    webValue.timeNow = new Date().getTime();
  }, 1000)
  timeType.value = setInterval(() => {
    getDate();
  }, 30000);
});
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

onUnmounted(() => {
  clearInterval(timeType.value);
  clearInterval(timeType2);
});

function time() {
  transactionlist.value.forEach((val: any) => {
    setTime(new Date().getTime(), new Date(val.time).getTime())
  })
}
let type = route.query.type || 2
const getDate = () => {
  getAllTransactions();
  localStorage.setItem('chooseNFTAddress', searchKey.value)
  getNftContractHandicap({ searchKey: searchKey.value, type: type })
    .then((res: any) => {
      if (!res.buyOrders) res.buyOrders = []
      if (!res.sellOrders) res.sellOrders = []
      console.log('getNftContractHandicap', res);
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
      res.buyOrders = res.buyOrders.sort((a: any, b: any) => b.feePrice - a.feePrice);
      for (let i = 0; i < 5; i++) {
        buyOrders.value[i] = (res.buyOrders && res.buyOrders[i]) || {
          nftTokenId: "--",
          feePrice: "--",
        };
        sellOrders.value[i] = (res.sellOrders && res.sellOrders[i]) || {
          nftTokenId: "--",
          feePrice: "--",
        };
      }
      sellOrdersAll.value = res.sellOrders.sort((a, b) => a.feePrice - b.feePrice);
      sellOrders.value.sort((a, b) => a.feePrice - b.feePrice);
      sellOrders.value = sellOrders.value.reverse();
    })
    .catch((e) => {
      console.error(e);
    });
  if (userinfo.value.isLogin) {
    getMyNft({
      walletAddr:
        userinfo.value.hexAddress || hexAddress.value || useraddress.value,
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
          metaDataImage: val.metaDataImage,
        });
      });
      options.value = arr;
    });
  }
};

const updatePrice = (data: any, type: string) => {
  if (type === "sell") {
    let sellAll: any[] = [];
    data.forEach((val: { feePrice: string | number }) => {
      if (val.feePrice != "--") sellAll.push(val.feePrice);
    });
    let feePrice: any = Math.min(...sellAll);
    return feePrice.toString().includes("Infinity") ? "--" : feePrice.toFixed(4);
  } else {
    let buyAll: any[] = [];
    data.forEach((val: { feePrice: string | number }) => {
      if (val.feePrice != "--") buyAll.push(val.feePrice);
    });
    let feePrice: any = Math.max(...buyAll);
    return feePrice.toString().includes("Infinity") ? "--" : feePrice.toFixed(4);
  }
};

const options = ref<mynftType[]>([]);
let providers: any, signers: any;
const getNftTopList = async () => {
  let match = /^0x[a-fA-F0-9]{40}/
  let localAddr = String(localStorage.getItem('address'))
  if (!match.test(localAddr) && !match.test(searchKey.value)) {
    try {
      let res: any = await getNftTop({})
      console.log(res, 'toptoptop');
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
  } else if (!match.test(searchKey.value) && match.test(localAddr)) {
    searchKey.value = localStorage.getItem('address')
  }
  localStorage.setItem('address', searchKey.value)
}
const changeConect = () => {
  ConnectWallet.value = false
}
let balanceBNB = ref<string>('0')
const init = async () => {
  getDate()
  if ((window as any).ethereum && userinfo.value.isLogin) {
    //第一步 ----  获取 当前钱包对象 和 provider
    let { provider, address, signer } = await initSigner();
    providers = provider;
    signers = signer;
    useraddress.value = address;
    if (signer) signer.getBalance().then(res => balanceBNB.value = ethers.utils.formatUnits(res, 18))
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
    console.log(contracts.NFT, 'contracts.NFT');
    console.log(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );

    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );
    authorization.value = res || false;
    console.log("authorization", authorization.value);
  }
};


const buy = async (type: number, authorizationType?: boolean) => {
  console.log(userinfo.value.isLogin, 'userinfo.value.isLogin');
  if (!userinfo.value.isLogin) return ConnectWallet.value = true
  if (!filterLogin(userinfo.value.isLogin, useraddress.value || String(userinfo.value.hexAddress))) return
  if (!authorizationType && type === 2) { //卖出授权
    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );
    if (!res) {
      console.log('授权', 123)
      create_show_1.value = true;
      let res2;
      try {
        res2 = await contracts.NFT.setApprovalForAll(
          proxy.$common.LSSVMRouter,
          true
        );
      } catch (e) {
        proxy.$message.error(t("overall.privilegegrantfailed"))
        loadingShow.value = false

        // Toast.fail(t("overall.privilegegrantfailed"));
        console.log(e);
        create_show_1.value = false;
        setTimeout(() => {
          Toast.clear();
        }, 1000);
      }
      if (res2) {
        res2 && (await res2.wait());
        create_show_1.value = false;

        Toast.clear();
        proxy.$message.success(t("overall.Empowersucceeded"))
        loadingShow.value = false

        // Toast.success(t("overall.Empowersucceeded"));

        setTimeout(() => {
          Toast.clear();
        }, 1000);
        let res = await contracts.NFT.isApprovedForAll(
          useraddress.value,
          proxy.$common.LSSVMRouter
        );
        authorization.value = res || false;
      }
    }
    return;
  }
  let time = Date.parse(new Date() as unknown as string) / 1000;
  if (type === 1) { //购买
    if (Purchase.value <= 0) return proxy.$message.warning(t("overall.Tips"))
    loadingShow.value = true
    const loadingInstance = ElLoading.service({
      lock: false,
      text: '',
      background: 'rgba(0, 0, 0, 0.0)',
      spinner: 'spinner'
    })
    Actions.setScreen(false);
    console.log('sellOrdersAll', sellOrdersAll);
    try {
      let arr: any = [];
      // 接口
      let totals = 0;
      let pools: any = [];
      let ids: any[] = [];
      let prices: any = [];
      let positions: any = [];
      let types: any = [];
      let type1Totals = 0;
      let type2Totals = 0;
      let listUse: any = {};

      console.log(selectNFT.value);

      sellOrdersAll.value.forEach((val: any) => {
        if (selectNFT.value.includes(val.nftTokenId)) {
          val.poolAddr = String(val.poolAddr).toLocaleLowerCase()
          if (listUse[val.poolAddr] && val.type == 1) {
            listUse[val.poolAddr].ids.push(val.nftTokenId)
            listUse[val.poolAddr].buyPrice.push(val.feePrice)
          } else if (val.type == 1) {
            listUse[val.poolAddr] = {
              type: 1,
              poolAddr: val.poolAddr,
              ids: [val.nftTokenId],
              buyPrice: [val.feePrice],
              position: "0x"
            }
          } else if (val.type == 2) {
            listUse[val.poolAddr] = {
              type: 2,
              poolAddr: val.poolAddr,
              ids: [val.nftTokenId],
              buyPrice: [Number(val.price)],
              position: val.position
            }
          } else if (val.type == 4) {
            listUse[val.nftTokenId] = {
              type: 4,
              poolAddr: val.poolAddr,
              ids: [val.nftTokenId],
              buyPrice: [Number(val.price)],
              position: val.position
            }
          }
        }
      })
      console.log(Object.keys(listUse), 'listUse');
      let elmentIds = [];

      Object.keys(listUse).forEach((key: string) => {
        let val = listUse[key]
        console.log('val', val);

        if (val.type == 4)
        {
            console.log(val);
            elmentIds.push(val.ids[0])

        }else
        {

          if (val.type == 1) {
            arr.push([val.poolAddr, val.buyPrice.length]);
            pools.push(val.poolAddr);

          } else if (val.type == 2) {
            pools.push(searchKey.value);
          }
          positions.push(val.position);
          ids.push(val.ids)
          types.push(val.type);
          let poolPrice = 0;

          val.buyPrice.forEach((item: number) => {
            if (val.type == 1) {
              type1Totals += Number(item);
              poolPrice += Number(ethers.utils.parseUnits((Number(item) * 1.01).toFixed(18), 18));

            } else if (val.type == 2) {

              type2Totals += Number(item);
              poolPrice += Number(ethers.utils.parseUnits((Number(item) * 1).toFixed(18), 18));
            }
          });
          console.log("poolPrice",poolPrice);
          prices.push(poolPrice.toString());

        }

      });


      let contract_total = 0;
      for (let i = 0; i < arr.length; i++) {
        try {
          contracts.LSSVMPairETH = new ethers.Contract(
            arr[i][0],
            LSSVMPairETH,
            providers
          ).connect(signers);
        } catch (e) {
          console.log(e);
        }
        let res2 = await contracts.LSSVMPairETH.getBuyNFTQuote(
          arr[i][1]
        );
        console.log(res2[3]);
        prices[i] = ethers.utils.formatUnits( res2[3], 0).toString();
        contract_total += Number(ethers.utils.formatUnits(res2[3], 18));
      }

      let newtotal = totals > contract_total ? type1Totals + type2Totals : contract_total + type2Totals;

      if (Number(balanceBNB.value) < newtotal) {
        create_show.value = false;
        loadingInstance.close()
        Actions.setScreen(true);
        Toast.clear();
        proxy.$message.warning(t("overall.Balance"))
        loadingShow.value = false
        return;
      }

      if (elmentIds.length>0)
      {
        let { provider, address, signer, Balance } = await initSigner();
        const sdk = new ElementSDK({
          // Supported networks: Network.ETH, Network.BSC, Network.Polygon, Network.Avalanche
          networkName: Network.BSC,
          isTestnet: false,
          apiKey: "5a29e50ab0789f6d1a3351f61568dd28",
          signer: signer
        });
        const orders = await sdk.queryOrders({
          asset_contract_address: searchKey.value,
          token_ids: elmentIds
        });
        const tradeData = await sdk.encodeTradeData({
          orders: orders
        });
        pools.push(tradeData.toContract);
        ids.push(elmentIds);
        prices.push(ethers.utils.formatUnits(tradeData.payableValue, 0))
        positions.push(tradeData.data)
        types.push(4)
        newtotal = newtotal + Number(ethers.utils.formatUnits(tradeData.payableValue, 18))
        console.log(newtotal);
      }

      let total = ethers.utils.parseUnits((Number(newtotal) * 1.01).toFixed(18), 18);

      console.log(total.toString());

      console.log(
        pools,
        ids,
        prices,
        positions,
        types,
        { value: total.toString() }
      )

      contracts.Aggregation.buyNFTForIds(
        pools,
        ids,
        prices,
        positions,
        types,
        { value: total }
      ).then(async (res: any) => {
        await res.wait();
        create_show.value = false;
        loadingInstance.close()
        Actions.setScreen(true);
        Toast.clear();
        proxy.$message.success(t("overall.spSucceed"))
        loadingShow.value = false
      })
        .catch((e: any) => {
          console.log("购买失败的情况");
          console.log(e);
          Toast.clear();
          create_show.value = false;
          loadingShow.value = false
          loadingInstance.close()
          Actions.setScreen(true);
          if (e?.data?.message && e.data.message.includes('err: insufficient funds for gas * price + value'))
            proxy.$message.error(t("overall.Balance"))
          else proxy.$message.error(t("overall.spFailed"))
        });
    } catch (e) {
      console.log(e);
      Toast.clear();
      create_show.value = false;
      Actions.setScreen(true);
      loadingInstance.close()
      proxy.$message.error(t("overall.spFailed"))
    }
  } else { //出售
    if (currency.value.length <= 0) return proxy.$message.warning(t("business.choicenft"))
    loadingShow_1.value = true
    console.log("currency", currency.value.length);
    console.log('transactionDepth', Number(proxy.$filters.numFilters2(transactionDepth.buyOrderCount)))

    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );
    if (!res) {
      //没有授权
      create_show.value = true;
      Toast.loading({
        message: t("overall.empowering") + "...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      let res2;
      try {
        res2 = await contracts.NFT.setApprovalForAll(
          proxy.$common.LSSVMRouter,
          true
        );
      } catch (e) {
        proxy.$message.error(t("overall.privilegegrantfailed"))
        // Toast.fail(t("overall.privilegegrantfailed"));
        console.log(e);
        loadingShow_1.value = false;
        create_show.value = false;
        Toast.clear();
      }
      if (res2) {
        res2 && (await res2.wait());
        Toast.clear();
        proxy.$message.success(t("overall.Empowersucceeded"))
        loadingShow_1.value = false;

        // Toast.success(t("overall.Empowersucceeded"));
        setTimeout(() => {
          Toast.clear();
        }, 1000);
      }
    }
    const loadingInstance = ElLoading.service({
      lock: false,
      text: '',
      background: 'rgba(0, 0, 0, 0.0)',
      spinner: 'spinner'
    })
    Toast.clear();
    create_show.value = true;
    Actions.setScreen(false);
    let nfts_token_id = Object.values(currency.value);
    let token_ids = "";
    nfts_token_id.forEach((val) => (token_ids += val + ","));
    token_ids = token_ids.substring(0, token_ids.length - 1);
    sellNftForCurPrice({
      contractAddr: searchKey.value,
      nfts: token_ids.toString(),
      sellCount: currency.value.length,
    }).then(async (res: any) => {
      let arr: any[] = [];
      let arrLength: any[] = [];  //所有的单数
      res.forEach(async (val: any) => {
        arr.push([val.poolAddr, val.nftTokenId]);
        arrLength.push(...val.nftTokenId)
      });
      let contract_total = 0;
      if (arrLength.length != currency.value.length) {
        create_show.value = false;
        loadingShow_1.value = false
        proxy.$message.warning(`${t('overall.buylen')}${arrLength.length},${t('overall.sellleng')}${arrLength.length}`)
        return
      }
      for (let i = 0; i < arr.length; i++) {
        try {
          contracts.LSSVMPairETH = new ethers.Contract(
            arr[i][0],
            LSSVMPairETH,
            providers
          ).connect(signers);
        } catch (e) {
          console.log(e);
          Actions.setScreen(true);
        }
        console.log("arr[i][1]", arr[i][1]);
        let res2 = await contracts.LSSVMPairETH.getSellNFTQuote(
          arr[i][1].length
        );
        console.log("res2", res2[3]);
        contract_total += Number(ethers.utils.formatUnits(res2[3], 18));
      }
      let a1 = Number(buyOrders.value[0].feePrice);
      a1 = Number(buyOrders.value[0].feePrice);
      a1 = a1 * currency.value.length;
      console.log("这里是a1", a1);
      console.log("contract_total", contract_total);
      let newtotal = contract_total
      newtotal = newtotal * (99.99 / 100);  //上下浮动
      console.log("newtotal", newtotal);
      let total = ethers.utils.parseUnits((newtotal.toFixed(18)).toString(), 18);
      console.log("参数", arr, total, useraddress.value, time + 60);
      contracts.LSSVMRouter.swapNFTsForToken(
        arr,
        total,
        useraddress.value,
        time + 60
      )
        .then(async (res3: any) => {
          await res3.wait();
          Toast.clear();
          loadingShow_1.value = false
          loadingInstance.close()
          create_show.value = false;
          currency.value = [];
          getDate();
          proxy.$message.success(t("overall.Succeed"));
        })
        .catch((e: any) => {
          console.log(e);
          Toast.clear();
          create_show.value = false;
          loadingShow_1.value = false
          loadingInstance.close()
          proxy.$message.error(t("overall.Failed"));
        });
    }).catch((e) => {
      console.log(e);
      Toast.clear();
      create_show.value = false;
      loadingShow_1.value = false
      loadingInstance.close()


      if (e.toString().includes('当前该系列暂时没有用户挂买单')) proxy.$message.error(t("overall.nobuylist"));
      else proxy.$message.error(t("overall.Failed"));
    });
  }
};
let currency = ref<string[]>([]);

let businesslist_type = ref(1);

const opnes = (url: string) => {
  open(url);
};

let Purchase = ref<number>(0);

let pageDataMy = reactive({
  current: 1,
  size: 10,
  total: 0,
})
// 我的成交
const getMyAllTransaction = () => {
  getMaketMyTransaction({
    current: pageDataMy.current,
    size: pageDataMy.size,
    param: {
      contractAddr: searchKey.value,
    }
  }).then((res: any) => {
    let Transaction: nftrecordType[] = [];
    res.rows.forEach((val: any) => {
      Transaction.push({
        id: val.nftTokenId,
        series: val.contractName || "--",
        time: new Date(val.createTime).toLocaleString() || "--",
        price: val.nftPrice || "--",
        type: Number(val.type) == 1 ? true : false,
        Pooltype: Number(val.type) == 1 ? '0' : '1',
        code: "#" + val.nftTokenId,
        has: val.txHash,
        from: val.from,
        to: val.to,
        newType: val.type
      });
    });
    pageDataMy.total = res.total;
    Mytransactionlist.value = Transaction;
  });
};
let pageDataAll = reactive({
  current: 1,
  size: 10,
  total: 0,
})
// 全网成交
const getAllTransactions = () => {
  getMaketAllTransaction({
    current: pageDataAll.current,
    size: pageDataAll.size,
    param: {
      contractAddr: searchKey.value,
    }
  }).then((res: any) => {
    console.log(res, 'resresres');
    let Transaction: nftrecordType[] = [];
    res.rows.forEach((val: any) => {
      Transaction.push({
        id: val.nftTokenId,
        from: val.from,
        to: val.to,
        series: val.contractName || "--",
        time: new Date(val.createTime).toLocaleString() || "--",
        price: val.nftPrice || "--",
        type: Number(val.type) == 1 ? true : false,
        code: "#" + val.nftTokenId,
        has: val.txHash,
        newType: val.type,
      });
    });
    pageDataAll.total = res.total;
    transactionlist.value = Transaction;
    transactionlist.value = transactionlist.value.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
  });
};
function setTime(newtime: any, usedtime: any) {
  let time = newtime - usedtime
  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) > 0 ? Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) : 1;
  let seconds = Math.floor(time / 1000);
  let times = ''

  if (seconds > 0) {
    times = seconds + ` ${t('browse.seconds')}`
  }
  if (minutes > 0 && seconds > 60) {
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
  return times;
}
</script>

<style scoped lang="scss">
:deep(.el-tabs__active-bar) {
  height: 3px;
  background: linear-gradient(-62deg, #3772FF 0%, #9757D7 100%);
}

.business_box {
  background: url(@/assets/img/buiness_icon.png) no-repeat;
  background-size: 100% 100%;
  background-size: contain;
}

//新加的样式
.business_new1 {
  display: flex;
  justify-content: space-between;
}

.newFlex {
  align-items: center;
  border: 1px solid #EBEEF2;
  padding: 0 10px;
  border-radius: 12px;
  height: 28px;
  border: 1px solid #EBEEF2;
  border-radius: 12px;
}

.business {
  width: 80vw;
  max-width: 1800px;
  margin: 0 auto;
  padding: 30px 0px 0px 0px;
  margin-top: 80px;

  .business-header-new {
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

  .avatar-logo {
    position: relative;

    .business-img {
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

    >div {
      display: flex;
      margin-top: 17px;
      border: 1px solid #EBEEF2;
      border-radius: 12px;

      >div {
        padding: 15px 0 15px 15px;
        border-left: 1px solid #EBEEF2;

        &:first-child {
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

  .business-table-title {
    margin: 20px auto 0;
    font-size: 16px;
    border-radius: 20px 20px 0 0;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;

    h2 {
      font-size: 20px;
      padding: 5px 20px;
      z-index: 2;
      border-bottom: 2px solid #23262F;
    }

    .line {
      position: absolute;
      height: 2px;
      background: #EEF0F2;
      width: calc(100% - 105px);
    }

    a {
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

  .business-table {
    padding-top: 20px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .select-NFT {
      margin-right: 70px;

      @media screen and (max-width:1280px) {
        margin-right: 30px;
      }

      flex: 1;

      .nft-items {
        display: flex;
        flex-direction: column;
        background: linear-gradient(-135deg, #DEF1FD 0%, rgba(224, 221, 255, 0) 100%);
        padding: 5px;

        .content {
          display: grid;
          overflow-y: scroll;
          position: relative;
          padding: 0 10px;
          height: calc(660px + 3*5px);
          grid-template-columns: repeat(auto-fill, 200px);
          grid-gap: 25px;
          grid-auto-rows: 230px;
          justify-content: space-between;

          @media screen and (max-width:1380px) {
            height: calc(3*180px + 7*3px);
            grid-template-columns: repeat(auto-fill, 150px);
            grid-gap: 7px;
            grid-auto-rows: 180px;
            justify-content: space-around;
          }

          .el-image {
            height: 190px;
            width: 100%;

            @media screen and (max-width:1380px) {
              height: 150px;
            }
          }

          footer {
            display: flex;
            justify-content: space-between;
            height: 30px;
            font-size: 12px;
            font-weight: bold;
            padding: 0 5px;
            align-items: center;
          }

          footer {
            font-size: 12px;
            height: 30px;
            line-height: 30px;

            >span {
              display: flex;
              align-items: center;

              img {
                margin-right: 3px;
                height: 14px;
              }
            }
          }

          :deep(.el-card) {
            --el-card-border-radius: 8px !important;
          }

          .nft-item {
            cursor: pointer;
            position: relative;

            &::after {
              position: absolute;
              right: 10px;
              top: 10px;
              color: #189F7A;
              font-size: 18px;
              font-weight: bold;
              content: '';
              text-align: center;
              line-height: 25px;
              box-sizing: border-box;
              background: #EBEEF2dd;
              border: 2px solid #fff;
              width: 25px;
              height: 25px;
              border-radius: 8px;
            }

            :deep(.el-card__body) {
              padding: 0;
              text-align: center;
            }

            .loading_img {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
            }

            &.isActive {
              box-sizing: border-box;
              transform: scale(1.05);
              position: relative;

              &::after {
                position: absolute;
                right: 10px;
                top: 10px;
                background: #3B82F6;
                color: #fff;
                border: none;
                font-size: 18px;
                font-weight: bold;
                content: '✔';
              }
            }
          }
        }
      }

      .title_nft {
        font-size: 16px;
        font-weight: bold;
        line-height: 40px;
        display: flex;

        >span {
          color: #23262F;
          background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .table_list_left {
        display: flex;
        flex-direction: column;

        :deep(.demo-tabs) {
          font-size: 16px;
        }

        .table_flex {
          display: flex;
          font-size: 16px;

          >div {
            flex: 1;
          }
        }
      }
    }

    .businessNew_list {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      max-width: 375px;
      width: 35%;
      min-width: 250px;

      .table-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        background: linear-gradient(-135deg, #DEF1FD 0%, rgba(224, 221, 255, 0) 100%);
        // justify-content: space-between;
      }

      // 中间部分
      .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #DEF1FD;
        justify-content: space-around;
        padding: 10px;

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
          background-color: v-bind('businesslist_type===1 ? "#189F7A" : "#FF4848"');
        }

        .right-title {
          font-weight: bold;
          color: #23262F;
          font-size: 14px;
          text-align: left;
          font-family: PingFangSC-regular;
          padding: 10px 0px 10px 0px;
          // padding: 22px 0px 25px 0px;
        }

        .title_new {
          display: flex;
          align-items: center;
          justify-content: space-between;

          >div {
            color: #777E90;
          }

          >span {
            display: flex;
            align-items: center;

            img {
              margin-right: 8px;
              height: 20px;
            }
          }
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
    }
  }


  .table-flex {
    font-weight: bold;
    color: #777E90;
    font-size: 14px;

    @media screen and (max-width:1280px) {
      font-size: 12px;
    }

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


  // 我的成交
  .make {
    margin-top: 20px;
    padding-right: 120px;

    &-btn {
      width: 20%;
      // margin-right: 15px;
      height: 50px;
      line-height: 50px;
      background-color: rgba(24, 159, 122, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      text-align: center;
      font-family: Microsoft Yahei;
      border-radius: 8px;
      cursor: pointer;
    }

    &-btn:nth-child(1) {
      margin-right: 15px;
    }

    &-btn:nth-child(2) {
      margin-right: 15px;
    }
  }

}

@media screen and (min-width: 1280px) {

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
}
</style>
<style lang="scss">
.business .el-tabs--top .el-tabs__item.is-top {
  font-size: 14px;
  color: #838B92;
}

.el-tabs__item.is-active {
  font-size: 14px;
  font-weight: bold;
  color: #23262F;
  line-height: 40px;
  background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
    padding: 0 10px;
    border-radius: 5px;
    height: 48px;

    .van-stepper__input {
      background-color: rgba(0, 0, 0, 0);
    }
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
