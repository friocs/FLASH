<template>
   <search />
   <div class="index">
    <div class="nav-box">
        <img src="@/assets/img/left.png" alt="" @click="router.back()">
        <div>{{ t("browse.Details") }}</div>
    </div>
        <div class="box" v-if="pricelist.poolType == 2" style="    justify-content: space-between;">
            <div class="box-item">
                <div> {{ t("browse.Type") }}</div>
                <div>
                    <img width="22" class="box-icon" height="26" src="@/assets/img/bussiness_icon8.png"/>
                    {{ t("NFTdetails.Tradingpool") }}</div>
            </div>
            <div class="box-item">
                <div> {{ t("NFTdetails.poolAddress") }}</div>
                <div>{{ proxy.$filters.addressFilters(pricelist.poolAddr, 6, 4) }}</div>
            </div>
            <div class="box-item">
                <div>{{ t("browse.initial") }}</div>
                <div v-if="pricelist.initialTokenAmount">
                    <img src="@/assets/img/chain_2.png" class="box-img"/>
                    {{ Number(pricelist.initialTokenAmount).toFixed(4) }}
                </div>
                <div class="sell-num" v-else>0.0000</div>

            </div>
            <div class="box-item">
                <div>{{ t("browse.quantity") }}</div>
                <div>{{ pricelist.initialNftCount || 0 }}</div>
            </div>
            <div class="box-item">
                <div>{{ t("browse.Current") }}</div>
                <div>
                    <img src="@/assets/img/chain_2.png" class="box-img"/>
                    {{ Number(pricelist.amount).toFixed(4) || 0.0000}}
                </div>
            </div>
            <div class="box-item">
                <div>{{ t("browse.currentNum") }}</div>
                <div>{{ pricelist.nftCount ||0}}</div>
            </div>
        </div>
        <div class="box" v-if="pricelist.poolType == 1">
            <div class="box-item">
                <div>{{ t("browse.Type") }}</div>
                <div>
                    <img width="22" class="box-icon" height="26" src="@/assets/img/business_icon5.png"/>

                    {{ t("business.sellout") }}</div>
            </div>
            <div class="box-item">
                <div>{{ t("NFTdetails.poolAddress") }}</div>
                <div>{{ proxy.$filters.addressFilters(pricelist.poolAddr, 6, 4) }}</div>
            </div>
            <div class="box-item">
                <div>{{ t("browse.initial") }}</div>
                <div>{{ pricelist.initialNftCount || 0  }}</div>
            </div>
            <div class="box-item">
                <div>{{ t("browse.Current") }}</div>
                <div>
                    <img src="@/assets/img/chain_2.png" class="box-img"/>
                    {{ pricelist.nftCount || 0 }}
                </div>
            </div>
        </div>
        <div class="box" v-if="pricelist.poolType == 0">
            <div class="box-item">
                <div>{{ t("browse.Type") }}</div>
                <div>
                <img width="22" class="box-icon"  height="26" src="@/assets/img/business_icon6.png"/>
                {{ t("my.purchase") }}</div>
            </div>
            <div class="box-item">
                <div>{{ t("NFTdetails.poolAddress") }}</div>
                <div>{{ proxy.$filters.addressFilters(pricelist.poolAddr, 6, 4) }}</div>
            </div>
            <div class="box-item">
                <div >{{ t("browse.initial") }}</div>
                <div v-if="pricelist.initialTokenAmount">   <img src="@/assets/img/chain_2.png" class="box-img"/> {{ Number(pricelist.initialTokenAmount).toFixed(4) }}</div>
                <div class="sell-num" v-else>0.0000</div>

            </div>
            <div class="box-item">
                <div>{{ t("browse.Current") }}</div>
                <div>
                    <img src="@/assets/img/business_icon4.png" class="box-img"/>
                    {{ Number(pricelist.amount).toFixed(4) ||0.0000}}
                </div>
            </div>
        </div>

        <el-tabs v-model="activeName_1" class="demo-tabs" v-if="transactionlist.length > 0">
            <el-tab-pane :label="t('browse.history')" name="first">

                </el-tab-pane>
         </el-tabs>
        <div v-if="transactionlist.length > 0">
                 <el-table
                            :data="transactionlist"
                            style="width: 100%"
                            
                            >
                            <el-table-column prop="name" :label="t('business.Transactiontype')">
                                <template #default="scope"> 
                                    <!-- {{
                                        scope.row.Pooltype=== "0"
                                        ? t("business.purchase")
                                        : t("business.sellout")
                                    }} -->
                                    <div v-if="scope.row.Pooltype==='1'" style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color: #20A886; ">{{ t("business.purchase")}}</div>
                                    <div  v-else  style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color:#F05D62 ">{{ t("business.sellout")}}</div>

                                </template>

                                </el-table-column>
                            <el-table-column prop="date" :label="t('my.number')"  >
                                <template #default="scope"> 
                                    <div>
                                    {{scope.row.code}}
                                    </div>
                                </template>

                                </el-table-column>

                          
                            <el-table-column prop="name" :label="t('business.price')" >
                                <template #default="scope"> 
                                    <div style="    font-weight: bold;color: rgb(35, 38, 47);">
                                        <img src='@/assets/img/chain_2.png' width="16" height="16" style="position:relative;top:2px" />

                                       {{  scope.row.price!='--'&&
                                        Number( scope.row.price).toFixed(4)
                                        }}
                                    </div>
                                </template>
                            
                                </el-table-column>
                                
                            <el-table-column prop="name" :label="t('my.Sender')" >
                                <template #default="scope">
                                    <div style="cursor: pointer;font-weight: bold;color:#47a182;" @click.stop="opens2(scope.row.to)"
                                        v-if="scope.row.type == 2">
                                        {{
                                            proxy.$filters.addressFilters(scope.row.to.toString(), 5, 4)
                                        
                                        }}
                                    </div>
                                    <div style="cursor: pointer;    font-weight: bold;color:#47a182;" @click.stop="opens2(scope.row.from)"
                                        v-if="scope.row.type == 1">
                                        {{
                                            proxy.$filters.addressFilters(scope.row.from.toString(), 5, 4)
                                        
                                        }}
                                    </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" :label="t('my.Receiver')" >

                                    <template #default="scope">
                                        <div style="cursor: pointer;    font-weight: bold;color: #f6465d" @click.stop="opens2(scope.row.from)"
                                            v-if="scope.row.type == 2">
                                            {{
                                                proxy.$filters.addressFilters(scope.row.from.toString(), 5, 4)
                                            
                                            }}
                                        </div>
                                        <div style="cursor: pointer;font-weight: bold;color:  #f6465d" @click.stop="opens2(scope.row.to)"
                                            v-if="scope.row.type == 1">
                                            {{
                                                proxy.$filters.addressFilters(scope.row.to.toString(), 5, 4)
                                            
                                            }}
                                        </div>
                                        </template>
                                </el-table-column>
                            <el-table-column prop="date" :label="t('my.date')">
                                <template #default="scope"> 
                                <div style="    display: flex;align-items: center;"  @click.stop="opens(scope.row.has)">
                                    <div style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color: #23262F;">
                                    {{setTime(webValue.timeNow,new Date( scope.row.time).getTime())}}{{t('browse.ago')}}

                                    </div>
                                    <img src="@/assets/img/time.png" width="16" height="16" style='margin-left:10px'/>
                                </div> 
                                    
                                </template>
                            </el-table-column>
                            
                </el-table>
        </div>
   </div>
</template>
<script  lang='ts' setup>
import {
    ref,
    reactive,
    computed,
    getCurrentInstance,
    onMounted,
    inject,
    onUnmounted,
} from "vue";
import { nftrecordType } from "@/utils/type";
import { ElLoading } from 'element-plus'
import { initSigner } from "@/utils/thhersUtils";
import { BigNumber, ethers } from "ethers";
import search from "@/components/search.vue";

import { poolDetail } from "@/api/browse";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
let { t } = useI18n();
const transactionlist = ref<any>([]);
const activeName_1 = ref('first')

let pricelist = reactive<any>({
    poolAddr: "",
    poolType: null,
    initAmount: 0,
    curAmount: "",
    description: "",
    circulation: 0,
    isAuth: 0,
    royaltyFee: 0,
    topImage: '',
    name: '',
    officialUrl: '',
    twitterUrl: '',
    initialNftCount: '',
    nftCount: '',
    amount: ''
});
const webValue = reactive<any>({
  timeNow: new Date().getTime(),

})
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance() as any;
const orders: any = reactive([1, 2, 3, 4, 5])
let loadingInstance: any;
let providers: any, signers: any;

const onClickLeft = (): void => {
    console.log(route.query.active, "route")
    if (route.query.active == '2') {
        router.push('/me/info?active=2');
    } else {
        router.go(-1);
    }

    // router.push('/business/nftlistseriesdetail');
}
onMounted(async () => {
    time()
    poolData(loadingInstance)
    //第一步 ----  获取 当前钱包对象 和 provider
    let { provider, address, signer } = await initSigner();
    providers = provider;

    setInterval(() => {
    webValue.timeNow = new Date().getTime();
  }, 1000)
    // await providers.getBalance(val.poolAddr)
})
const opens2 = (has: any) => {
    console.log(has)
    window.open(
        proxy.$common.bscscanAddress + has
    );

};
function time() {
    transactionlist.value.forEach((val: any) => {
    let time = ''
    time = setTime(new Date().getTime(), new Date(val.time).getTime())
  })

}

function setTime(newtime: any, usedtime: any) {

  let time = newtime - usedtime
  let days = parseInt(time / (1000 * 60 * 60 * 24));
  let hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) > 0 ? parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) : 1;
  let seconds = parseInt(time/1000);
  let times = ''

  if (seconds>0) {
    times = seconds + ` ${t('browse.seconds')}`
  }
  if (minutes > 0 && seconds>60) {
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

const opens = (has: any) => {
    console.log(has)
    window.open(
        proxy.$common.bscscan + has
    );

};
import NFT from "@/utils/contracts/NFT.json";
const contracts: any = {};

const poolData = async (loadingInstance?: any) => {
//   loadingInstance = ElLoading.service({
//     lock: true,
//     text: t("overall.Loading"),
//     background: 'rgba(0, 0, 0, 0.7)',
//   })
  let { provider, address, signer } = await initSigner();
  // route.query.searchKey
  poolDetail({ poolAddr: route.query.hash }).then(async (res: any) => {
    loadingInstance && loadingInstance.close();
    pricelist.poolAddr = res.poolAddr
    pricelist.poolType = res.poolType
    pricelist.initAmount = res.initAmount
    pricelist.curAmount = res.curAmount
    contracts.NFTContracts = new ethers.Contract(
      res.nftContractAddr,
      NFT,
      provider
    ).connect(signer);
    pricelist.nftCount = await contracts.NFTContracts.balanceOf(res.poolAddr)
    pricelist.initialTokenAmount = res.initialTokenAmount
    let amount = await providers.getBalance(pricelist.poolAddr)
    pricelist.amount = ethers.utils.formatUnits(amount, 18)
    console.log(pricelist.amount)
    pricelist.initialNftCount = res.initialNftCount
    let Transaction: nftrecordType[] = [];
    
    res.transactionList.forEach((val: any) => {

      // val.txHash = val.txHash.substring(0, 10) + '...'
      Transaction.push({

        id: "#" + val.nftTokenId,
        series: val.contractName || "--",
        time: new Date(val.createTime).toLocaleString() || "--",
        price: val.nftPrice || "--",
        type: val.type,
        code: "#" + val.nftTokenId,
        has: val.txHash,
        from: val.from,
        to: val.to
      });
    });
    transactionlist.value = Transaction;
    transactionlist.value = transactionlist.value.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
    console.log(transactionlist.value)
  })
}

</script>
<style lang="scss" scoped>
.index{
    padding: 100px 30px 0px 30px;
    width: 1520px;
    margin: 0 auto;
}
 .box{
    display: flex;
    &-item{
        width: 200px;
        height: 88.875px;
        border-radius: .0375rem;
        background-color: #F5F6F8;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
    
        div:nth-child(1){
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #777E90;
        }
        div:nth-child(2){
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #23262F;
            padding-top: 10px;
        }
    }
    &-img{
        width: 20px;
       height: 20px;
    }
    &-icon{
        position: relative;
        top: 5px;
    }
 }
 .nav-box{
    display: flex;
    align-items: center;
    padding-bottom: 40px;
    img{
        cursor: pointer;
        width: 0.0938rem;
        height: 0.0781rem;
        margin-right: 0.0833rem;
        
        
    }
    div{
        font-size: 20px;
    }
 }
 .el-tabs__item.is-active {
    color: #23262F !important;
    font-weight: 600;
}
</style>
