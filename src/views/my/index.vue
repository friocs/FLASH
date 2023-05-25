<template>
  <div class="home">
    <div class="bg">
      <search />
      <div class="head-box">
        <div class="topView">

        </div>
        <div class="head">
          <div class="top">
            <div class="portrait">
              <img alt="" v-if="userinfo.headPic != '' && userinfo.headPic != 'https://metapro.superswap.cool//image'"
                :src="userinfo.headPic">
              <img v-else :src="getPath('@/assets/img/Defaultavatar.png')" @click="connect_address">
              <img class="tu" src="../../assets/img/iconNew.png" alt="">
            </div>
            <div class="top-data" v-if="userinfo.isLogin">
              <div>
                <div>{{ userinfo.name }}</div>
                <div style="display: flex;align-items: center;">{{ updateaddress(userinfo.hexAddress) }}
                  <img style="width: 12px;height:12px; margin-left: 5px;cursor: pointer;" src="@/assets/img/copy2.png"
                    alt="" @click.stop="copy(userinfo.hexAddress)" />
                </div>
              </div>
              <!-- <div class="link">
                <img src="../../assets/img/business_icon.png" alt="">
                <img src="../../assets/img/business_icon2.png" alt="">
                <img src="../../assets/img/business_icon3.png" alt="">
                <span>40%</span>
              </div> -->
            </div>
            <div class="top-data" v-else>
              <div>{{ t('my.wallet') }}</div>
            </div>
          </div>
          <div class="personal" v-if="userinfo.introduction">
            <p v-if="text">{{ t('my.PersonalProfile') }}:&nbsp;{{ PersonalIntroduction }}</p>
            <p v-else>{{ t('my.PersonalProfile') }}:&nbsp;{{ userinfo.introduction.substring(0, 50) }}<br>{{
    userinfo.introduction.substring(50, 100)
}} </p>
            <span v-if="more" @click="Exhibition">{{ text ? t('my.Show_more') : t('my.Stow') }}</span>
          </div>
          <div class="personal" v-else>
            <p> {{ t('my.PersonalProfile') }}&nbsp;:&nbsp;{{ t('my.personal') }}</p>
          </div>
        </div>
      </div>
      <div class="bj">


        <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
          <!-- nft系列 -->
          <el-tab-pane :label="$t('my.nftseries')" name="first">
            <!-- <div style="display: flex;align-items: center;margin-bottom: .0625rem;">
              <div class="refresh">
                <img src="@/assets/img/Refresh2.png" alt="" :class="{ rotate: rotate }" @click="start">
              </div>
              <div
                style="font-size: 13.9968px;font-family: PingFang SC;font-weight: 500;margin-top:10.0032px;color: #23262F;">
                {{
                    marketList.length
                }}&nbsp;{{ t('my.result') }}</div>
            </div>
            <div style="display: flex;flex-wrap: wrap; ">
              <div class="nft" v-for="(item, index) in marketList" :key="index" @click="go(item.id, item.contractName)">
                <div class="nft-img">
                  <img :src="item.img" alt="" v-if="item.img">
                  <img src="@/assets/img/550550.png" alt="" v-else>
                </div>
                <div style="display: flex;align-items: center;
">
                  <div class="nft-name">
                    <span v-if="item.name && item.contractName">{{ `${item.name}
                                          (${item.contractName})`
                    }}</span>
                    <span v-else>{{ item.name }}{{ item.contractName }}</span>
                  </div> <img style="width: 15.9936px;height: 15.9936px; margin:0 .026rem;"
                    v-if="item.isAuth == 2 ? true : false" src="@/assets/img/authentication.png" alt="">
                </div>
                <div class="nft-num">NFT: <span style="font-size: .0729rem;font-family: PingFang SC;font-weight: bold;
color: #23262F;
background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%); -webkit-background-clip:text;
-webkit-text-fill-color:transparent; ">{{
    item.quantity
}}</span> </div>
              </div>
            </div> -->
            <div class="nftSeries">
              <!-- <div class="nftSeries_left">
                <h5><img src="@/assets/img/add.png" alt="">{{ $t('Home.seriestitle') }}</h5>
                <div v-for="(item, index) in marketList" :key="index" @click="myNFt(item.id, index)"
                  :class="nftindex == index ? 'dis' : ''">
                  <img :src="item.img" alt="" v-if="item.img">
                  <img src="@/assets/img/550550.png" alt="" v-else>
                  <div>
                    <div>{{ item.contractName || '---' }} <img src="@/assets/img/authentication.png" alt=""></div>
                    <div class="price"> <span>Highest</span> <img src="@/assets/img/BNB.png" alt="">{{proxy.$filters.numFilters6(item.highPrice) || '---'}}</div>
                  </div>
                  <div class="quantity">
                    {{ item.quantity || '---' }}
                  </div>
                </div>
              </div> -->
              <div class="nftSeries_left">
                <h5><img src="@/assets/img/add.png" alt="">{{ $t('Home.seriestitle') }}</h5>
                <div style="overflow-y: auto; width:288px;">
                  <div v-for="(item, index) in marketList" :key="index" @click="myNFt(item.id, index)">
                    <img :src="item.img" alt="" v-if="item.img">
                    <img src="@/assets/img/550550.png" alt="" v-else>
                    <div>
                      <div>
                        <span>{{ item.contractName || '---' }}</span>
                        <img src="@/assets/img/authentication.png"  v-if="item.isAuth==2" alt="">
                      </div>
                      <div class="price"> <span>{{ $t('Home.floorPrice') }}</span>
                        <SvgIcon name="bnb"></SvgIcon>
                        {{ proxy.$filters.numFilters6(item.highPrice) || '---' }}
                      </div>
                    </div>
                    <div class="quantity">

                      {{ item.quantity || '---' }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="nftSeries_right">
                <h5><img src="@/assets/img/Refresh2.png" alt="" :class="{ rotate: rotate }" @click="start">
                  {{ nftlist1.length }} {{ $t('my.result') }}</h5>
                <div class="nfts">
                  <div class="nft" v-for="(item, index) in nftlist1" :key="index">
                    <div class="tu">
                      <img :src="item.img" alt="" v-if="item.img">
                      <img src="@/assets/img/550550.png" alt="" v-else>
                    </div>
                    <div class="name">{{ item.name }} <img src="@/assets/img/token_logo.png" alt=""></div>
                    <p>{{ item.id }}</p>
                    <div class="btn" @click="gonftdetails(item.id, '0')">
                      <img src="../../assets/img/buyPc.png" alt="">
                      {{ $t('NFTdetails.sell') }}
                    </div>
                  </div>
                </div>
              </div>
              <div>

              </div>
            </div>
          </el-tab-pane>
          <!-- 池子 -->
          <el-tab-pane :label="$t('my.Consignment_order')" name="second">
            <div class="pond">
              <!-- <div class="compilations">
                <h5><img src="../../assets/img/add.png" alt="">{{ $t('Home.seriestitle') }}</h5>
                <div v-for="(item, index) in series" :key="index"
                  @click="updatepool({ contractAddr: item.contractAddr }, index)" :class="Condition == index ? 'dis' : ''">
                  <img :src="item.contractLogo" alt="" v-if="item.contractLogo">
                  <img src="@/assets/img/550550.png" alt="" v-else>
                  <div>
                    <div>{{ item.contractName || '---' }} <img src="../../assets/img/authentication.png" alt=""></div>
                    <div class="price"> <span>Highest</span> <img src="../../assets/img/BNB.png" alt="">{{proxy.$filters.numFilters6(item.floorPrice) || '---'}}</div>
                  </div>
                  <div class="quantity">
                    {{ item.nftCount || '---' }}
                  </div>
                </div>
              </div> -->

              <div class="nftSeries_left">
                <h5><img src="@/assets/img/add.png" alt="">{{ $t('Home.seriestitle') }}</h5>
                <div style="overflow-y: auto; width:288px;">
                  <div v-for="(item, index) in series" :key="index" @click="updatepool({ contractAddr: item.contractAddr }, index)" :class="Condition == index ? 'dis' : ''">
                    <img :src="item.contractLogo" alt="" v-if="item.contractLogo">
                    <img src="@/assets/img/550550.png" alt="" v-else>
                    <div>
                      <div>
                        <span>{{ item.contractName || '---' }}</span>
                        <img src="@/assets/img/authentication.png"  v-if="item.isAuth==2" alt="">
                      </div>
                      <div class="price"> <span>{{ $t('Home.floorPrice') }}</span>
                        <SvgIcon name="bnb"></SvgIcon>
                        {{ proxy.$filters.numFilters6(item.floorPrice) || '---' }}
                      </div>
                    </div>
                    <div class="quantity">

                      {{ item.nftCount || '---' }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mains">
                <h5><img src="../../assets/img/Refresh2.png" alt="" :class="{ rotate: rotate }">{{my_pool.length}} {{ $t('my.result') }}</h5>
                <div class="main">

                  <div class="box" v-for='(item, index) in my_pool' :key="index">
                    <div class="sell" @click="goBusiness(item.nftContractAddr)">
                      <!-- -->
                      <div style="display: flex;align-items: center;">
                        <img v-if="item.Pooltype === '0'"  src="@/assets/img/business_icon6.png"
                          style='margin-right: 5px;' />
                        <img v-if="item.Pooltype === '1'" src="@/assets/img/business_icon5.png"
                          style='margin-right: 5px;' />
                        <img v-if="item.Pooltype === '2'"  src="@/assets/img/bussiness_icon8.png"
                          style='margin-right: 5px;' />
                        <div style="border:none;">{{
    item.Pooltype === "0" ? t("NFTdetails.Buyapool") : item.Pooltype === "1" ?
      t("NFTdetails.Sellingpool") : t("NFTdetails.Tradingpool")
}}
                        </div>
                      </div>
                      <div class="withdraw" style="cursor: pointer;" v-if="item.type"
                        @click.stop="item.type ? setRevoke(item.id, item.Pooltype, item.poolAddr, item.nftContractAddr) : ''">
                        {{
    t("my.cancel_the_order")
}}</div>
                      <div style="border: none;" v-else> {{
    t("my.rescinded")
}}</div>
                    </div>
                    <div class="sell-box" @click="next(item.poolAddr)">
                      <div style=" display: flex;justify-content: space-between;" v-if="item.Pooltype == '2'">
                        <div>
                          <div class="sell-price">{{ t('my.Sellingprice') }}</div>
                          <div style='display:flex;margin-top: 0.625vw;'>
                            <img src='@/assets/img/chain_2.png' class="sell-img" />
                            <div class="sell-num">{{ item.price != '--' && Number(item.price).toFixed(4) }}</div>
                          </div>
                        </div>
                        <div>
                          <div class="sell-price">{{ t('my.Purchaseprice') }}</div>
                          <div style='display:flex;margin-top: 0.625vw;'>
                            <img src='@/assets/img/chain_2.png' class="sell-img" />
                            <div v-if="item.buyAmount" class="sell-num">{{ item.buyAmount != '--' &&
    Number(item.buyAmount).toFixed(4)
}}</div>
                            <div class="sell-num" v-else>0.0000</div>
                          </div>
                        </div>
                      </div>
                      <div style=" display: flex;justify-content: space-between;"
                        v-if="item.Pooltype == '1' || item.Pooltype == '0'">
                        <div class="sell-list"
                          style="display: flex; align-items: center; width: 100%; justify-content: space-between;">
                          <div class="sell-price">{{ item.Pooltype === "0" ? $t('my.Purchaseprice') :
    $t('my.Sellingprice')
}} </div>
                          <div style='display:flex;'>
                            <img src='@/assets/img/chain_2.png' class="sell-img" />
                            <div class="sell-num">{{ item.price != '--' && Number(item.price).toFixed(4) }}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                      </div>
                      <!-- <div style="display: flex;justify-content: space-between;">
                    <div class="sell-delta">
                      <div class="sell-left">Delta: </div>
                      <div style="display:flex;align-items: center;">
                        <img src="@/assets/img/xianshu.png" class="sell-icon" v-if="item.curvetype" />
                        <img src="@/assets/img/zhishu.png" class="sell-icon" v-else />

                        <div class="sell-right">{{ item.curvetquantity }}</div>
                      </div>
                    </div>
                    <div class="sell-delta">
                      <div class="sell-left">{{ t('my.Balance') }}: </div>
                      <div style="display:flex;">
                        <div style="display:flex;margin-right: 12px;align-items:center ;"
                          v-if="item.Pooltype == '1' || item.Pooltype == '2'">
                          <img :src="item.contractLogo" width="16" height="16"
                            style='margin-right: 8px;border-radius: 50%; object-fit: cover;' />
                          <div class="sell-right"> {{ item.sellNftCount }}111 </div>
                        </div>
                        <div style="display:flex" v-if="item.Pooltype != '1'">
                          <img src="@/assets/img/chain_2.png" width="12" class="sell-img"
                            style='margin-right: 8px;width: 14px;' />
                          <div class="sell-right">{{ item.Token }}</div>
                        </div>
                      </div>
                    </div>
                  </div> -->


                    </div>
                    <div class="price">
                      <div class="Pool">
                        <p>Pool NFT</p>
                        <div>
                          <p></p><span>{{item.id}}</span>
                        </div>
                      </div>
                      <div class="turnover">
                        <span>{{$t('business.Turnover')}}</span>
                        <div>{{proxy.$filters.numFilters6(item.swapNum)}}</div>
                      </div>
                      <div class="Turnover">
                        <span>{{$t('business.cje')}}</span>
                        <div>
                          <img src="../../assets/img/BNB.png" alt=""> <span>{{proxy.$filters.numFilters6(item.swapAmount)}}</span>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="sell-line"></div> -->
                    <div class="sell-delta1" v-if="item.Pooltype == '2'"
                      style="align-items: center; justify-content: space-between;position: relative;">
                      <div class="sell-left" style="font-size:0.833vw">{{ t('my.SwapFee') }}</div>
                      <div class="sell-right" style="font-size: 0.833vw;"> {{ item.Service }}</div>
                      <!-- </div> -->
                    </div>
                    <div class="sell-delta1" :style="{
  padding:
    item.Pooltype === '2'
      ? '0.26vw 0vw 0vw 0vw'
      : '1.042vw 0vw'
}" style="align-items: center; justify-content: space-between;   ">
                      <div class="sell-left" style="font-size:0.833vw">{{ t('my.Pool') }}</div>
                      <div style="display:flex">
                        <!-- <div class="sell-icon">EXP</div> -->
                        <div class="sell-right" style="    font-size: 0.833vw;">

                          {{ proxy.$filters.addressFilters(item.poolAddr, 6, 4) }}


                          <img  @click.stop="copy(item.poolAddr)" class="business-img"
                            src='@/assets/img/copy_3.png' style=" cursor: pointer;" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <czTable :data="my_pool" :active="1" /> -->
          </el-tab-pane>
          <!-- 成交记录 -->
          <!-- <el-tab-pane :label="$t('my.Transaction_record')" name="third">
            <czTable :data="nft_list3" :active="9" :class="nft_list3.length > 0 ? '' : 'none'" />
          </el-tab-pane> -->
          <!-- 邀请 -->
          <el-tab-pane :label="$t('my.Invitefriends')" name="fourth">
            <!-- 规则 -->
            <div class="rule">
              <div class="left">
                <p>{{ t('my.Integralrule') }}</p>
                <span>{{ t('my.Invitationcontent') }}<br>{{ t('my.content') }}</span>
                <div class="txt">{{ t('my.Invitationlink') }}:&nbsp;
                  <span class="link">
                    {{ InvitationLink }}
                    <img style="width: 20px;height:20px; margin-left: 5px;vertical-align: middle;cursor: pointer;"
                      src="@/assets/img/copy1.png" alt="" @click.stop="copy(InvitationLink)" />
                  </span>
                </div>
              </div>
            </div>
            <!-- 数据总览 -->
            <p style=" margin: 29px 0 19px 20px;font-size: 20px;
            font-family: PingFang SC; font-weight: bold;
            color: #23262F;
            line-height: 40px;">{{ t('my.datascreening') }}</p>
            <div class="data">
              <!-- <div style="display:flex"> -->
              <div class="box">
                <p>{{ $t('my.TotalPoints') }}(sus)</p>
                <p>{{ overviewData.totalInviter }}</p>
              </div>
              <div class="box">
                <p>{{ $t('my.pointsToday') }}</p>
                <p>{{ overviewData.todayInviter }}/100</p>
              </div>
              <div class="box">
                <p>{{ $t('my.NumberInvitees') }}</p>
                <p>{{ overviewData.totalNumber }}</p>
              </div>
              <!-- </div> -->
            </div>
            <!-- 邀请记录 -->
            <p
              style="margin: 29px 0 19px 20px;font-size: 20px;font-weight: bolder;text-align: left;font-family: SourceHanSansSC-bold;color: rgb(35, 38, 47);">
              {{ t('my.Invitationrecord') }}</p>
            <div class="table">
              <el-table :data="recordList" style="width:90%; margin:0 auto;" header-cell-class-name="header"
                v-if="recordList.length > 0">
                <el-table-column prop="date" :label="$t('NFTdetails.time')" align="center">
                  <template #default="scope">
                    <div>
                      {{ scope.row.createTime }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="name" :label="$t('NFTdetails.Contract_address')" align="center">
                  <template #default="scope">
                    <div>
                      {{ scope.row.inviteeAddr.toString() }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="address" :label="$t('my.Bonuspoints')">
                  <template #default="scope">
                    <div class="invitation-num">
                      +{{ scope.row.integralVal }}
                      <span class="mark">
                        <el-tooltip class="box-item" effect="dark" :content="$t(`my.${stateList[scope.row.state]}`)"
                          placement="top" manual v-if="scope.row.integralVal == 0">
                          <img src="../../assets/img/question.png" alt="" style="width:.0833rem;cursor: pointer;">
                        </el-tooltip>
                      </span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty description="No Data" v-else />
              <div class="more" @click="onAddItem" v-if="allRecordList.length != recordList.length">
                {{ t('my.Load_more') }}
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="foot">
      </div>
    </div>
    <!-- <Footer v-if="Index == 3"></Footer> -->
  </div>
  <van-overlay :show="nameType">
    <div class="wrapper_1" @click.stop>
      <div class="block">
        <div class="wrapper_1-title">
          <div> {{ $t('overall.withdrawal') }}</div>
          <div @click="nameType = false" style="cursor: pointer;">x</div>
        </div>
        <div class="wrapper_1-describe">
          <img src='@/assets/img/chexiao.png' />
        </div>
        <div style="    text-align: center;">
          <van-loading color="#1989fa" />
        </div>

        <div style='padding-top: 10px;line-height: 25px;text-align: center;'>
          {{ $t('overall.cancellation') }}
        </div>
      </div>
    </div>
  </van-overlay>
  <Bottom />
</template>
<script lang="ts" setup>
import {
  onMounted,
  ref,
  getCurrentInstance,
  reactive,
  onUnmounted,
  computed,
  provide,
} from "vue";
import { subS, mulS } from "@/utils/bignumberMath";
import search from "@/components/search.vue";
import czTable from "@/components/czTable.vue";
import nftlist from "@/components/nftserieslist.vue";
import nftrecord from "@/components/nftrecord.vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ethers } from "ethers";
import ERC20 from "@/utils/contracts/ERC20.json";
import { useStates, useActions } from "@/hooks/userStore";
import { initSigner } from "@/utils/thhersUtils";
// import Footer from '@/components/footer.vue'
import { nftType, nftrecordType, userMapType } from "@/utils/type";
import Bottom from "@/components/bottom.vue";
import {
  getNftContractListForUser,
  getNftContractListForMyPool,
  getMyPoolList,
  getMyTransaction,
  getOverview,
  getRecord
} from "@/api/my";
// import { type } from "os";
import { copy } from "@/utils/copy";
import { useI18n } from "vue-i18n";
import { getPath } from '@/utils'
import { getMyNft, getInviter } from "@/api/my";
import numFilters from '@/hooks/userNumFilters'
import { getNftListByMarket } from "@/api/browse";
import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";

const { proxy } = getCurrentInstance() as any;
let InvitationLink = ref('')
let overviewData = ref([])
let recordList: any = ref([])
let toSwitch = ref(1)
let recordList1: any = ref([1, 1, 1, 1, 1, 1])
let allRecordList: any = ref([])
// 显示更多
let more = ref(false)
let PersonalIntroduction = ref('')
let text = ref(true)
let nftID = ref('')
let nftindex = ref<any>(0)
const Exhibition = () => {
  text.value = !text.value
}
const stateList = ref(["", "didNot", "已消费", "hitsCap", "黑名单"])
let userinfoT: any = ref(null)

// 去盘口
const goBusiness = (Addr: string) => {
  router.push("/business?searchKey=" + Addr);
}
// 撤销
let nameType = ref(false);
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
const create_show = ref(false);
const setRevoke = async (id: any, pooltype: any, poolAddr: any, nftContractAddr: any) => {
  nameType.value = true;
  try {
    contracts.LSSVMPairETH = new ethers.Contract(
      poolAddr as string,
      LSSVMPairETH,
      providers
    ).connect(signers);
  } catch (e) {
    console.log(e);
    Toast.clear();
    nameType.value = false;
    Toast.fail(t('overall.Cancellationfailed'));
  }
  console.log(id, pooltype, poolAddr, nftContractAddr);
  if (pooltype === "0") {
    //撤销买池
    console.log(contracts.LSSVMPairETH);
    contracts.LSSVMPairETH.withdrawAllETH().then(async (res: any) => {
      await res.wait();
      Toast.clear();
      // create_show.value = false;
      nameType.value = false;
      setTimeout(() => {
        proxy.$message.success(t("overall.Cancellation"))

        // Toast.success(t('overall.Cancellation'));
        if (typeof updatepool == 'function') updatepool({ contractAddr: series.value[0]?series.value[0].contractAddr:'' }, 0)
        else emit("updatepool");
        revokedetail = {
          id: 0,
          pooltype: '',
          poolAddr: '',
          nftContractAddr: '',
        }
      }, 3500);
    }).catch((e: any) => {
      nameType.value = false;
      proxy.$message.error(t("overall.Cancellationfailed"))
      Toast.clear();
      console.log(e);
      // Toast.fail(t('overall.Cancellationfailed'));
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
        nameType.value = false;
        proxy.$message.success(t("overall.Cancellationfailed"))

        setTimeout(() => {
          // Toast.success(t('overall.Cancellation'));
          if (typeof updatepool == 'function') updatepool({ contractAddr: series.value[0]?series.value[0].contractAddr:'' }, 0)
          else emit("updatepool");
          revokedetail = {
            id: 0,
            pooltype: '',
            poolAddr: '',
            nftContractAddr: '',
          }
        }, 3500);
      }).catch((e: any) => {
        // create_show.value = false;
        nameType.value = false;
        proxy.$message.error(t("overall.Cancellationfailed"))

        Toast.clear();
        console.log(e);
        // Toast.fail(t('overall.Cancellationfailed'));
      });
    });
  } else {

    //撤销买卖池
    // contracts.LSSVMPairETH.balance()  查询当前池子中是否有币

    contracts.LSSVMPairETH.getAllHeldIds().then(async (res2: any) => {
      contracts.LSSVMPairETH.withdrawAll(nftContractAddr, res2).then(async (res3: any) => {
        await res3.wait();
        Toast.clear();
        create_show.value = false;
        nameType.value = false;

        setTimeout(() => {
          proxy.$message.success(t("overall.Cancellation"))

          // Toast.success(t('overall.Cancellation'));
          if (typeof updatepool == 'function') updatepool({ contractAddr: series.value[0]?series.value[0].contractAddr:'' }, 0)
          else emit("updatepool");
          revokedetail = {
            id: 0,
            pooltype: '',
            poolAddr: '',
            nftContractAddr: '',
          }
        }, 3500);
      }).catch((e: any) => {
        create_show.value = false;
        nameType.value = false;

        Toast.clear();
        console.log(e);
        proxy.$message.error(t("overall.Cancellationfailed"))

        // Toast.fail(t('overall.Cancellationfailed'));
      });
    });

  }
};

let nftlist1 = ref<nftType[]>([]);
const myNFt = (id, index) => {
  nftID.value = id
  nftindex.value = index
  getMyNft({ walletAddr: Address.value, contractAddr: id }).then(async (res: any) => {
    let nftlists: nftType[] = [];
    res.forEach((val: { id: number, nftTokenId: number; metaDataImage: string; }) => {
      nftlists.push({ id: val.id, name: `${name} #${val.nftTokenId}`, img: val.metaDataImage })
    })
    nftlist1.value = nftlists
    console.log(nftlist1.value, '我的nft,1111');

  })
}
onMounted(() => {
  // userinfoT.value = setTimeout(() => {  }, 1000)
  const userinfo = computed(() => storeState.userMap.userinfo);

  console.log('到了个人中心', userinfo);
  // 展开收起
  if (userinfo.value.introduction.length >= 50) {
    more.value = true
    PersonalIntroduction.value = userinfo.value.introduction.substring(0, 50)
    console.log(PersonalIntroduction.value.length, '======================s');
  } else {
    PersonalIntroduction.value = userinfo.value.introduction
  }
  // 邀请链接
  getInviter().then((res: any) => {
    InvitationLink.value = proxy.$common.httpUrl + "?invite=" + res
  })
  // 数据总览
  getOverview().then((res: any) => {
    overviewData.value = res
  })
  // 邀请记录
  getRecord().then((res => {
    recordList.value = res;
    console.log(res, '数据');

    recordList.value.forEach((item: any, inedx: any) => {
      item.isSelect = false
    })
    allRecordList.value = recordList.value
    recordList.value = recordList.value.slice(0, 5)
  }))
  let tries = 0;
  getNft()
  getNftset()
  setTimeout(function initTimer(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);

    else init();
  });

});

const activeName = ref('first')
// 跳转
let go = (address, name) => {
  router.push(`myNFT?contractAddr=${address}&name=${name}`)
}
const onAddItem = () => {
  recordList.value = allRecordList.value
}
// 我的nft
let seachData = reactive({
  param: {
    sort: 1, //排序：0,时间 1，低价优先；2，高价优先"
    sortUn: 1, //排序：0,时间 1，低价优先；2，高价优先"
    priceStart: "", //起始价格
    priceStartUn: "", //起始价格
    priceEnd: "", //结束价格
    priceEndUn: "", //结束价格
    transactionType: "", //"交易类型：0，买；1，卖"
    status: "", //"状态：0，未成交；1，已成交"
    currency: "BNB",
    currency_img: getPath("@/assets/img/WBNB.png"),
    contractAddr: "",
  },
  current: 1,
  size: 10

});

let marketList1 = ref([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
let marketList = ref<any>([]);
// const getMarketList = (loadingInstance?: any) => {
//   // loading.value=true

//   getNftListByMarket(seachData)
//     .then((res: any) => {
//       console.log(res);
//       // loading.value = true
//       marketList.value.push(...res.rows)
//       seachData.current++
//       // marketList.value = res.rows;
//       // loading.value = false;
//       loadingInstance && loadingInstance.close();
//       if (res.rows.length < seachData.size) {
//         // finished.value = true
//       }
//       // reset()
//     })
//     .catch((e) => {
//       console.error(e);
//       // loading.value = false
//       loadingInstance && loadingInstance.close();
//     });
// };
// 池子
let poorList = reactive([{ data: 0 }, { data: 1 }, { data: 2 }])
let { t } = useI18n();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const router = useRouter();
const userMap = useStore();

onUnmounted(() => {
  clearInterval(timer);
  clearInterval(userinfoT);
});
const my_pool: any = ref([]);
//     [
//     { id: 1, series: 'cs', time: '2022-01-01', price: 123, Pooltype: '0', type: true, Token: '10BNB', quantity: 5, curvetype: true, curvetquantity: '5%' },
//     { id: 12, series: 'cs2', time: '2022-01-20', price: 123, Pooltype: '1', type: true, NFT_quantity: 5, curvetype: true, curvetquantity: '5%' },
//     { id: 13, series: 'cs3', time: '2022-03-01', price: 123, Pooltype: '2', type: false, Token: '10BNB', quantity: 3, NFT_quantity: 3, curvetype: false, curvetquantity: '5%', Service: '5%' }
// ]
const nft_list3 = ref<nftrecordType[]>([]);
const nft_list31 = ref([]);
const storeState: any = useStates("userMap", ["userMap"]);
const Actions: any = useActions(["login", "setuserMap"], "userMap");
const userinfo = computed(() => storeState.userMap.userinfo);
const active = ref<number>(0);
let contracts = reactive<any>({
  USDT: "",
});

const themeVars = {
  vanTabsBottomBarColor: "#5A64E9",
};

type poolSet = {
  floorPrice: number;
  name: string;
  id: string;
};
let series = ref<any>([])
// 刷新
let rotate = ref(false);
let Loading: any = ref(null);
let timer1: any = ref(null);
const start = () => {
  if (timer1.value) {
    clearTimeout(timer1.value);
  }
  // marketList.value = []
  getNft()
  rotate.value = true;
  myNFt(nftID.value, nftindex.value)
  timer1.value = setTimeout(() => {
    rotate.value = !rotate.value;
  }, 1000);
};
let Address = ref('')
const init = async () => {
  //第一步 ----  获取 当前钱包对象 和 provider
  let { provider, address, signer } = await initSigner();
  Address.value = address
  // if (!address || !provider || !signer) return
  console.log(provider, '=======');
  console.log(signer, '=======+++++++');
  providers = provider
  signers = signer
  // console.log(provider, address, signer);
  // itemData.inviteURL = window.document.location.origin + '?referrer=' + address //邀请链接（可删）
  //这一步数储存用户地址 请求数据大部分需要该地址作为参数
  // userMaps.address = address;
  //第二部 ----  创建合约对象              '合约地址'       'JSON'  这是上面的provider和signer
  // contracts.USDT = new ethers.Contract(proxy.$common.USDT, ERC20, provider).connect(signer)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.contracts = contracts;
  //第三步（1） ---- 获取数据
  getData();
  //第三步（2） ---- 每20s重新拿数据
  timer = setInterval(() => {
    getData();
  }, 20000);
};
let Index = ref()
const handleClick = (tab: any) => {
  Index.value = tab.index
  if (tab.index == 1) {
    updatepool({ contractAddr: series.value[0]?series.value[0].contractAddr:'' }, 0);
    console.log(1212122);
  } else if (tab.index == 2) {
    getDate();
  } else if (tab.index == 0) {
    getNft()
  }
};
const getNft = async () => {
  const res: any = await getNftContractListForUser();
  let nft_list2: any = [];
  res.forEach((val: any) => {
    nft_list2.push({ id: val.contractAddr, contractName: val.contractName, img: val.topImage, quantity: val.nftCount, isAuth: val.isAuth, name: val.name, })
  })
  marketList.value = nft_list2;
  myNFt(marketList.value[0]?marketList.value[0].id:'', '0')
}
const getNftset = async () => {
  const res: any = await getNftContractListForMyPool();
  series.value = res
  console.log(res,'666');

}
const goupdatedetails = () => {
  router.push("/me/updatemydetail");
};
const navPersonal = () => {
  router.push("/me/updateintroduction");
}
const updateaddress = (address: string): string => {
  let newaddress = "";
  if (address) {
    newaddress =
      address.substring(0, 6) + "...." + address.substring(address.length - 4);
  }
  return newaddress;
};

const opens = (has: any) => {
  console.log(has)
  window.open(
    proxy.$common.bscscan + has
  );
};
let Condition = ref('0')
const updatepool = (nftadd, index) => {
  Condition.value = index
  // Pooltype '0'买池 '1'卖池 '2'买卖池
  // { id: 13, series: 'cs3', time: '2022-03-01', price: 123, Pooltype: '2', type: false, Token: '10BNB', quantity: 3, NFT_quantity: 3, curvetype: false, curvetquantity: '5%', Service: '5%' }
  // curvetype  0 指数 1 线性
  getMyPoolList(nftadd).then(async (res: any) => {
    console.log(res,'666661111');
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
        contractLogo: val.contractLogo,
        sellNftCount: val.sellNftCount,
        name: val.name,
        nftContractName: val.nftContractName,
        buyAmount: val.curAmountByBuy,
        swapNum: val.swapNum,
        swapAmount: val.swapAmount
      });
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
    }
    my_pool.value = old_nft_list2;
    console.log(my_pool.value, 'czczczc');

    // my_pool.value = my_pool.value.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    my_pool.value.forEach((val) => {
      val.time = val.time.replace(/-/g, "/").substring(0, 16);
    });
    console.log(old_nft_list2, 78);
    console.log(my_pool.value[0], '========');
  });
};
provide('updatepool', updatepool)
const getDate = () => {
  // 交易记录
  // id: 12,
  //   series: "cs2",
  //   time: "2022-01-20",
  //   price: 123,
  //   type: false,
  //   code: "#399",
  //   has: "1231231232323",
  getMyTransaction().then(async (res: any) => {
    let Transaction: nftrecordType[] = [];

    res.rows.forEach((val: any) => {
      Transaction.push({
        id: val.nftTokenId,
        series: val.contractName || "--",
        time: new Date(val.createTime).toLocaleString() || "--",
        price: val.nftPrice || "--",
        type: Number(val.type) == 1 ? true : false,
        code: "#" + val.nftTokenId,
        has: val.txHash,
        to: val.to,
        from: val.from
      });
    });
    nft_list3.value = Transaction;
    nft_list3.value = nft_list3.value.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  });
};

const connect_address = async () => {
  let { provider, address, signer } = await initSigner();
  Actions.login({ hexAddress: address, provider: provider })
    .then((res: any) => {
      router.go(0);
    })
    .catch((err: any) => {
      if (err.name === "AxiosError") {
        Toast.fail(t("overall.Timeout"));
      } else {
        Toast.fail(t("overall.cancel"));
      }
    });
};
let timer: any;
let providers: any, signers: any;

const getData = () => {
  //第四步 ---- 调用合约方法使用第二步定义的合约对象 去调用方法 （这里方法为合约提供的方法 ）如下获取余额
  //获取USDT余额  调用USDT合约的balanceOf方法  参数为 用户地址（userMap.address）
  // contracts.USDT.balanceOf(userMaps.address).then((res: ethers.BigNumberish) => {
  //     console.log('拿到的USDT余额原数据：', res);
  //     console.log('拿到的USDT余额转换数字：', Number(res));
  //     userMaps.balanceUSDT = ethers.utils.formatUnits(res, 18)
  //     console.log('拿到的USDT余额转换正确格式：', userMaps.balanceUSDT);
  //     //let info = 代币数量、代币价格有关的数或者后台定义的其他有精度位的数   (用变量代替这句话)
  //     //由于 info 都为 大数(绝大部分为精度为18位)  合约拿到有关 info 的值都需要 除1e18 展示到页面。反之，传给后台的也需要乘1e18（具体需要和后端确认）
  //     //ethers.utils.formatUnits(res, 18) 这方法为除 1e18
  //     //ethers.utils.parseUnits(res, 18)  这方法为乘 1e18
  // })
};

// 成交记录获取更多
// const dealMore = () => {
//   console.log(111111);
// }
// 池子详情
const next = (address: any) => {
  router.push("/business/detail?hash=" + address);
}
//跳转
const gonftdetails = (id: number, type: string): void => {
  // console.log(id);
  router.push("/browse/nftdetails?nftId=" + id + '&type=' + type);
}
</script>
<style lang="scss" scoped>
.home {
  background-image: url("../../assets/img/topView.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.none {
  :deep(.el-table) {
    --el-table-border-color: rgba(0, 0, 0, 0) !important;
  }
}


:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background: #EEF0F2;
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
    font-size: 0.938vw;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #0F0F0F;
  }

  &-describe {
    font-size: 0.729vw;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #B2B2B4;
    padding-top: 0.781vw;
    text-align: center;
  }

  &-btn {
    width: 4.688vw;
    height: 2.344vw;
    background: #FEFEFE;
    border: 1px solid #7C7C7C;
    border-radius: 1.094vw;
    line-height: 2.344vw;
    text-align: center;
    cursor: pointer;
  }

  .block {
    width: 20.833vw;
    background: #FFFFFF;
    border-radius: 0.781vw;
    padding: 1.042vw 2.083vw 2.083vw 2.083vw;
  }
}

:deep(.el-table__inner-wrapper::before) {
  display: none !important;
  content: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
}

.pond {
  display: flex;
  margin-top: 3.646vw;

  .compilations {
    width: 14.271vw;
    margin-right: 1.354vw;

    h5 {
      font-size: 0.833vw;
      font-weight: bold;
      color: #000004;
      display: flex;
      align-items: center;
      margin-bottom: 1.354vw;

      >img {
        width: 0.833vw;
        height: 0.833vw;
        margin-right: 0.417vw;
      }
    }

    >div:hover {
      background: #E7E8EA;
    }

    .dis {
      background: #E7E8EA;
    }

    >div {
      width: 14.271vw;
      height: 4.167vw;
      // background: #E7E8EA;
      border: 1px solid #E7E8EA;
      border-radius: 0.417vw;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-bottom: 1.042vw;
      cursor: pointer;

      >img {
        width: 2.344vw;
        height: 2.344vw;
        border-radius: 50%;
      }

      .quantity {
        font-size: 0.833vw;
        font-weight: bold;
        color: #23262F;
      }

      >div {
        >div {
          display: flex;
          align-items: center;
          font-size: 0.833vw;
          font-weight: bold;
          color: #23262F;

          >img {
            margin-left: 0.521vw;
            margin-right: 0.521vw;
            width: 0.833vw;
            height: 0.833vw;
          }

        }

        .price {
          font-size: 0.729vw;
          font-weight: bold;
          color: #353945;

          span {
            font-size: 0.677vw;
            color: #777E90;
          }
        }

      }

    }
  }
  .nftSeries_left {
          width: 14.271vw;
          margin-right: 1.354vw;

          h5 {
            font-size: 0.833vw;
            font-weight: bold;
            color: #000004;
            display: flex;
            align-items: center;
            margin-bottom: 1.354vw;

            >img {
              width: 0.833vw;
              height: 0.833vw;
              margin-right: 0.417vw;
            }
          }

          >div {
            max-height: calc(80px * 4 + 20px * 3);
            overflow-y: auto;
            overflow-x: hidden;

            >div:hover {
              background: #E7E8EA;
            }

            .dis {
              background: #E7E8EA;
            }

            >div {
              width: 14.271vw;
              height: 4.167vw;
              // background: #E7E8EA;
              border: 1px solid #E7E8EA;
              border-radius: 0.417vw;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              margin-bottom: 1.042vw;
              cursor: pointer;

              &:last-child {
                margin-bottom: 0;
              }

              >img {
                width: 2.344vw;
                height: 2.344vw;
                border-radius: 50%;
              }

              .quantity {
                font-size: 0.833vw;
                font-weight: bold;
                color: #23262F;
              }

              >div {
                max-width: 7.813vw;

                >div {
                  display: flex;
                  align-items: center;
                  font-size: 0.833vw;
                  font-weight: bold;
                  color: #23262F;

                  >span {
                    max-width: 5.208vw;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                  }

                  >img {
                    margin-left: 0.521vw;
                    margin-right: 0.521vw;
                    width: 0.833vw;
                    height: 0.833vw;
                  }

                }

                .price {
                  width: 8.333vw;
                  font-size: 0.729vw;
                  font-weight: bold;
                  color: #353945;

                  span {
                    width: px;
                    font-size: 0.625vw;
                    color: #777E90;
                    margin-right: 0.781vw;
                  }
                }

              }

            }
          }
        }
}

.mains {
  h5 {
    display: flex;
    align-items: center;
    margin-bottom: 1.354vw;
    font-size: 0.833vw;
    font-weight: bold;
    background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    >img {
      width: 1.146vw;
      height: 0.938vw;
      margin-right: 1.042vw;
      cursor: pointer;
    }
  }
}

.main {
  margin: 0 auto;
  margin-top: 0.469vw;
  display: flex;
  flex-wrap: wrap;
  padding: 0.521vw;
  background: linear-gradient(0deg, rgba(224, 221, 255, 0) 0%, #DEF1FD 100%);
  border-radius: 0.417vw;


  .box {
    width: 20.833vw;
    margin: 0 1.302vw;
    margin-bottom: .0703rem;
    background-color: #fff;
    // padding: .0844rem .1078rem .0844rem .1078rem;
    padding: 0 1.094vw 0.781vw 1.146vw;
    border-radius: .0469rem;

  }

  .sell {
    height: 2.708vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #DADADA;
    >div{
      img{
        width: 1.146vw;
        height: 1.354vw;
      }
    }
    div:nth-child(1) {
      font-weight: 500;
      color: #23262F;
      text-align: center;
      line-height: .1406rem;

      div {
        cursor: pointer;
        width: 11.458vw;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    div:nth-child(2) {
      width: .4563rem;
      height: .1813rem;
      border: 1px solid #3699FF;
      border-radius: .0188rem;
      text-align: center;
      line-height: .1813rem;
      font-size: 0.729vw;
      color: #3B82F6;
      // cursor: pointer;

    }

    .withdraw:hover {
      color: #fff;
      background: #3699FF;
    }
  }

  .sell-box {
    margin-top: 0.781vw;

  }

  .price {
    margin-top: 1.042vw;
    padding: 0.938vw 1.042vw;
    background: linear-gradient(45deg, #DEF1FD 0%, rgba(224, 221, 255, 0) 100%);
    border-radius: 0.417vw;

    .turnover,
    .Turnover {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.729vw;
    }

    .Pool {
      >p {
        font-size: 0.729vw;
        color: #777E90;
      }

      >div {
        display: flex;
        align-items: center;
        padding-bottom: 0.26vw;
        border-bottom: 0.052vw solid #fff;

        p {
          width: 0.833vw;
          height: 0.833vw;
          border-radius: 50%;
          background-color: #5869F1;
          margin-right: 0.313vw;
        }

        span {
          font-size: 0.833vw;
          font-weight: bold;
          color: #23262F;
        }
      }
    }

    .turnover {
      margin-top: 0.781vw;
    }

    .Turnover {
      margin-top: 0.521vw;

      >div {
        display: flex;
        align-items: center;

        >img {
          width: 0.833vw;
          height: 0.833vw;
          margin-right: 0.313vw;
        }
      }
    }
  }

  .sell-list {
    padding: 0.729vw 1.146vw;
    background: linear-gradient(45deg, #DEF1FD 0%, rgba(224, 221, 255, 0) 100%);
    border-radius: 0.417vw;

    .sell-price {
      font-size: 0.729vw;
      color: #777E90;
    }

    .sell-num {
      font-size: 0.833vw;
      font-weight: bold;
      color: #23262F;
    }
  }

  .sell-price {
    font-size: 0.729vw;
    font-family: PingFang SC;
    font-weight: 500;
    color: #777E90;
  }

  .sell-img {
    object-fit: contain;
    width: .1172rem;
    margin-right: .0703rem;
  }

  .sell-line {
    width: 100%;
    height: 0.052vw;
    background: #DADADA; // margin-left: .0938rem;
    margin-right: .0938rem;
    margin-bottom: 0.417vw;
  }

  .sell-delta {
    display: flex;
    margin: 0.938vw 0;
  }

  .sell-delta1 {
    display: flex;
  }

  .sell-left {
    font-size: 0.625vw;
    font-family: PingFang SC;
    font-weight: 500;
    color: #777E90;
    padding-top: 0.104vw;
    padding-right: 0.417vw;
  }

  .sell-right {
    font-size: 0.833vw;
    font-family: PingFang SC;
    font-weight: 500;
    color: #23262F;
    >img{
      width: 0.729vw;
      height: 0.729vw;
    }
  }

  .sell-icon {
    width: .1406rem;
    height: .0563rem;
    object-fit: contain;
    margin-right: 0.521vw;
  }
}

.bj {
  width: 87%;
  margin: 0 auto;
  word-wrap: break-word;
  word-break: normal;
}

.more {
  margin: 0 auto;
  width: 6.042vw;
  height: 2.5vw;
  border: 1px solid #EEF0F2;
  border-radius: 0.417vw;
  text-align: center;
  line-height: 2.5vw;
  font-size: 0.833vw;
  font-family: PingFang SC;
  font-weight: bold;
  color: #353945;

  &:hover {
    color: #FFFFFF;
    background: #23262F;
  }
}

.table {
  margin: 0 2.604vw;

  :deep(.el-table th.el-table__cell) {
    height: 4.167vw !important;
    font-size: 0.833vw;
    font-family: PingFang SC;
    font-weight: 500;
    color: #777E90;
  }

  :deep(.el-table__body) {
    font-size: 0.833vw;
    font-family: PingFang SC;
    font-weight: bold;
    color: #23262F;
  }

  :deep(.el-table) {
    --el-table-header-bg-color: none !important;
    --el-table-bg-color: none !important;
  }

  :deep(.el-table .el-table__cell) {
    padding: 0 !important;
  }

}

.rule {
  display: flex;

  .left {
    flex: 1;
    color: rgba(16, 16, 16, 1);
    font-size: 1.042vw;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    margin: 1.146vw 0 0 0vw;

    p {
      font-size: 1.042vw;
      font-family: PingFang SC;
      font-weight: bold;
      color: #23262F;
      line-height: 2.083vw;
    }

    span {
      font-size: 0.833vw;
      font-family: PingFang SC;
      font-weight: 500;
      color: #777E90;
    }
  }

  .txt {
    width: 26vw;
    height: 2.5vw;
    background: linear-gradient(45deg, #DEF1FD 0%, rgba(224, 221, 255, 0) 100%);
    border-radius: 0.417vw;
    font-size: 0.833vw;
    font-family: PingFang SC;
    font-weight: 500;
    color: #777E90;
    margin-top: 1.146vw;
    display: flex;
    align-items: center;
    padding: 0 1.042vw;
  }

  .link {
    font-size: 0.833vw;
    color: #23262F;
  }
}

.data {
  display: flex;
  justify-content: space-between;

  .box {
    width: 30%;
    height: 6.25vw;
    opacity: 0.8;
    border-radius: 0.417vw;
    line-height: 1.042vw;
    background: #EBEEF2;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 1.042vw;
    border: none;
    background: linear-gradient(45deg, #DEF1FD 0%, rgba(224, 221, 255, 0) 100%);
    border-radius: 0.417vw;

    p:nth-child(1) {
      font-size: 0.729vw;
      font-family: PingFang SC;
      font-weight: 500;
      color: #777E90;
    }

    p:nth-child(2) {
      font-size: 1.25vw;
      font-family: PingFang SC;
      font-weight: bold;
      color: #23262F;
      margin-top: 0.625vw;
    }
  }
}



.rotate {
  transform: rotate(180deg);
  transition: all 0.9s;
}

:deep(.van-overlay) {
  z-index: 999;
}

:deep(.cell) {
  height: 4.167vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-table__empty-text) {

  opacity: 0 !important; // display: nene !important;
}

.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  // width: 580px;
  width: 26.042vw;
  height: 18.229vw;
  border-radius: 0.521vw;
  padding: 5.208vw;

  p {
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #0f0f0f;
    font-size: 0.833vw;
    text-align: center;
    margin-bottom: 4.167vw;
  }

  input {
    background-color: #f6f6f6;
    border-radius: 1.563vw;
    border: none;
    outline: none;
    width: 95%;
    text-align: center;
    height: 1rem;
  }

  >div {
    display: flex;
    // margin-top: 1.3rem;
    justify-content: space-between;

    >div {
      width: 5.208vw;
      height: 2.604vw;
      text-align: center;
      line-height: 2.604vw;
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

:deep(.is-active) {
  color: #101010 !important;
}

:deep(.el-tabs__item) {
  text-align: left;
  font-size: 0.833vw;
  font-family: PingFang SC;
  color: #777E90;
  line-height: 2.083vw;
}

// :deep(#tab-first) {
//   margin-left: 18px !important;
// }

:deep(.el-tabs__active-bar) {
  background-color: #3772FF !important;
}

.personal {
  margin-top: 1.042vw;
  margin-bottom: 1.667vw;
  color: #777E90;
  font-size: 0.833vw;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 1.302vw;

  span {
    cursor: pointer;
    font-size: 0.625vw;
    font-size: 0.833vw;
    font-family: PingFang SC;
    color: #3B82F6;
    display: block;
    margin: 0.625vw 0 0 0;
  }
}

.top {
  // transform: translateY(-100px);
  margin-top: 4.167vw;

  .portrait {
    width: 6.667vw;
    height: 6.667vw;
    border-radius: 50%;
    border: 0.208vw solid #fff;
    box-sizing: border-box;
    box-shadow: 0px 1px 9px 1px #8399ef !important;
    position: relative;
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .tu {
      width: 1.563vw;
      height: 1.563vw;
      right: 0;
      bottom: 0;
      position: absolute;
    }
  }

  &-data {
    display: flex;
    align-items: center;
    margin-top: 2.604vw;

    >div {
      width: 50%;
      color: rgba(16, 16, 16, 1);
      font-size: 0.833vw;
      display: flex;
      align-items: center;
      border: none !important;

      >div {
        img {
          width: 0.625vw;
          height: 0.625vw;
        }
      }
    }

    .link {
      img {
        width: 1.25vw;
        height: 1.25vw;
        margin-right: 0.521vw;
      }

      span {
        font-size: 0.625vw;
        color: #353945;
      }
    }

    div:nth-child(1) {
      font-size: 1.667vw;
      font-weight: bold;
      color: #23262F;
      margin-right: 1.563vw;

      img {
        width: 1.458vw;
        height: 1.458vw;
      }

      span {
        font-size: 0.833vw;
        margin-left: 0.521vw;
        font-family: PingFang SC;
        font-weight: 500;
        color: #23262F;
      }
    }

    div:nth-child(2) {
      border: 1px solid #EBEEF2;
      height: 100%;
      padding: 0.104vw 0.208vw;
      border-radius: 0.313vw;
      font-size: 0.625vw;
      font-family: PingFang SC;
      font-weight: 500;
      color: #353945;
    }
  }
}

.tabs {
  margin-bottom: .5208rem;

  :deep(.el-tabs__content) {
    .el-tab-pane {
      .nftSeries {
        display: flex;
        margin-top: 3.646vw;

        .nftSeries_left {
          width: 274px;
          margin-right: 26px;

          h5 {
            font-size: 16px;
            font-weight: bold;
            color: #000004;
            display: flex;
            align-items: center;
            margin-bottom: 26px;

            >img {
              width: 16px;
              height: 16px;
              margin-right: 8px;
            }
          }

          >div {
            max-height: calc(80px * 4 + 20px * 3);
            overflow-y: auto;
            overflow-x: hidden;

            >div:hover {
              background: #E7E8EA;
            }

            .dis {
              background: #E7E8EA;
            }

            >div {
              width: 274px;
              height: 80px;
              // background: #E7E8EA;
              border: 1px solid #E7E8EA;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              margin-bottom: 20px;
              cursor: pointer;

              &:last-child {
                margin-bottom: 0;
              }

              >img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
              }

              .quantity {
                font-size: 16px;
                font-weight: bold;
                color: #23262F;
              }

              >div {
                max-width: 150px;

                >div {
                  display: flex;
                  align-items: center;
                  font-size: 16px;
                  font-weight: bold;
                  color: #23262F;

                  >span {
                    max-width: 100px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                  }

                  >img {
                    margin-left: 10px;
                    margin-right: 10px;
                    width: 16px;
                    height: 16px;
                  }

                }

                .price {
                  width: 160px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #353945;

                  span {
                    width: px;
                    font-size: 12px;
                    color: #777E90;
                    margin-right: 15px;
                  }
                }

              }

            }
          }
        }

        .nftSeries_right {
          h5 {
            display: flex;
            align-items: center;
            margin-bottom: 1.354vw;
            font-size: 0.833vw;
            font-weight: bold;
            background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            >img {
              width: 1.146vw;
              height: 0.938vw;
              margin-right: 1.042vw;
              cursor: pointer;
            }
          }

          .nfts {
            display: flex;
            flex-wrap: wrap;

            .nft:hover {
              box-shadow: 0px 1px 9px 1px #8399ef;
              border: 1px solid #6098f5;
            }

            .nft {
              width: 15.625vw;
              height: 21.094vw;
              border: 1px solid #EBEEF2;
              background-color: #ffffff;
              border-radius: 0.417vw;
              margin: 0 1.042vw 1.042vw 0;
              overflow: hidden;
              cursor: pointer;

              .tu {
                width: 100%;
                height: 15.625vw;

                // border-radius: 8px;
                >img {
                  width: 100%;
                  height: 100%;
                  border-radius: 0.417vw 0.417vw 0 0;
                }
              }

              .name {
                display: flex;
                align-items: center;
                font-size: 0.625vw;
                font-weight: 500;
                color: #777E90;
                margin-top: 0.885vw;
                padding-left: 1.042vw;

                >img {
                  width: 0.833vw;
                  height: 0.833vw;
                  margin-left: 0.26vw;
                }
              }

              p {
                font-size: 0.625vw;
                font-weight: bold;
                color: #23262F;
                margin-bottom: 0.521vw;
                margin-top: 0.26vw;
                padding-left: 1.042vw;
              }

              .btn {
                height: 2.083vw;
                background-color: #f5f6f8;
                display: flex;
                align-items: center;
                font-size: 0.833vw;
                font-weight: bold;
                color: #353945;
                padding-left: 1.042vw;

                >img {
                  width: 0.521vw;
                  height: 0.938vw;
                  margin-right: 0.521vw;
                }
              }
            }
          }
        }
      }
    }
  }

  .refresh {
    margin: 0.521vw 0.521vw 0 0.677vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(187, 187, 187, 0.4);
    width: 2.083vw;
    height: 2.083vw;
    border: 1px solid #EBEEF2;
    border-radius: 8px;

    &:hover {
      background-color: #EBEEF2;
      cursor: pointer;
    }

    img {
      width: 22px;
      height: 18px;
    }
  }

  .nft {
    // width: 215px;
    // height: 292.992px;
    // background: #FFFFFF;
    // border: 1px solid #EBEEF2;
    // box-shadow: 0px 2px 5px 1px rgba(133, 139, 155, 0.25);
    // border-radius: 0px 0px 8px 8px;
    // margin: 0 20px 20px 0;

    // &-img {
    //   width: 215.0016px;
    //   height: 215.0016px;
    //   border-radius: 8px 8px 0px 0px;
    //   border-radius: 8px 8px 0px 0px;

    //   img {
    //     width: 99%;
    //     height: 100%;
    //     border-radius: 8px 8px 0px 0px;
    //   }
    // }

    // &-name {
    //   height: 15.9936px;
    //   margin: 11.0016px 0 14.9952px 11.0016px;
    //   text-align: left;
    //   font-size: 12px;
    //   font-family: PingFang SC;
    //   font-weight: 500;
    //   color: #777E90;
    //   white-space: nowrap;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    // }

    // &-num {
    //   margin: 0 0 12.9984px 11.0016px;
    //   text-align: left;
    //   font-size: .0729rem;
    //   font-family: PingFang SC;
    //   font-weight: bold;
    //   color: #23262F;
    // }
  }

  .title {
    width: 83.854vw;
    display: flex;
    margin: 1.823vw 0 2.083vw 0;
    height: 1.458vw;
    color: rgba(93, 101, 108, 1);
    font-size: 1.198vw;
    text-align: left;
    font-family: Roboto-regular;
    // justify-content: space-between;
  }

  .content {
    width: 83.854vw;
    height: 5.156vw;
    line-height: 5.156vw;
    text-align: center;
    border: 1px solid rgba(153, 153, 153, 0.3);
    display: flex;
    // justify-content: space-between;

    div {
      text-align: left;
      color: rgba(16, 16, 16, 1);
      font-size: 22px;
      font-family: SourceHanSansSC-regular;
    }

    .business {
      color: rgba(90, 100, 233, 1);
    }

    .buy {
      color: rgba(71, 161, 130, 1);
    }

    .sell {
      color: rgba(246, 69, 93, 1);
    }
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
  margin: .1563rem auto;
  border: 1px solid #EEF0F2;
  border-radius: .0417rem;
  cursor: pointer;
}

.head {
  cursor: default;
  width: 88%;
  margin: 0 auto;

}

.invitation-num {

  position: relative;


  .mark {
    position: absolute;
    left: .1354rem;
  }

}

.head-box {
  padding-top: .5208rem;

  padding-bottom: .1042rem;
}

:deep(.el-tabs__item) {
  &.is-active {
    font-family: PingFang SC;
    font-weight: bold;
  }
}
</style>

