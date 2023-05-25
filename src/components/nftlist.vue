<template>
    <el-container style="margin: 80px 0 0 0 ;">
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
            @close="handleClose" :collapse-transition="false">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;
            display: flex;justify-content: space-between;">
                <el-radio-button :label="false" @click="foldShowFn1">
                    <img src="@/assets/img/open.png" alt="" style="width: 13px; height: 13px;">
                </el-radio-button>
                <el-radio-button @click="foldShowFn">
                    <img v-if="foldShow" src="@/assets/img/fold.png" alt="" style="width: 18px; height: 15px;">
                </el-radio-button>
            </el-radio-group>
            <div class="menu-box" v-if="foldShow">
                <p class="Price">{{ t('business.price') }}</p>
                <div class="select">
                    <el-select effect="dark" v-model="seachData.param.currency" class="m-2" disabled
                        placeholder="Select" size="small" @change="updateAccount">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            <van-image width="15%" style="margin-left: 0.2rem" fit="cover" :src="item.img" />
                            &nbsp;<span class="img_title">{{ item.label }}</span>
                        </el-option>
                    </el-select>
                </div>
                <div class="section">
                    <div class="right">
                        <input type="number" :placeholder="$t('browse.minimum_price')" @keyup="search"
                            v-model="Start" /> <!-- seachData.param.priceStartUn -->
                        <span>to</span>
                        <input type="number" :placeholder="$t('browse.Highest_price')" @keyup="search" v-model="end" />
                        <!--seachData.param.priceEndUn  -->
                    </div>

                </div>
                <el-button @click="search1" round :disabled="disabled" class="button">{{ t('browse.confirm') }}
                </el-button>

                <div class="nftSeries_left">
                    <h5><img src="@/assets/img/add.png" alt="">{{ $t('Home.seriestitle') }}</h5>
                    <div v-infinite-scroll="load" style="overflow-y: auto; width:288px;">
                        <div v-for="(item, index) in NftSeries" :key="index" @click="series(item.contractAddr)">
                            <img :src="item.contractLogo" alt="" v-if="item.contractLogo">
                            <img src="@/assets/img/550550.png" alt="" v-else>
                            <div>
                                <div>
                                    <span>{{ item.contractName || '---' }}</span>
                                     <img src="@/assets/img/authentication.png" alt="" v-if="item.isAuth==2">
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

            </div>
        </el-menu>
        <el-container>
            <el-main style="padding-top:0px ;">
                <h5><img src="../assets/img/Refresh2.png" alt="" :class="{ rotate1: rotate1 }"
                        @click="series(seachData.param.contractAddr)">{{marketList.length}} {{ $t('my.result') }}</h5>
                <!-- 放大缩小筛选 -->
                <div style="display:flex; justify-content: flex-end; margin-right:57px;">
                    <!-- 筛选 -->
                    <el-dropdown trigger="click">
                        <div class="el-dropdown-link">
                            {{ t(label1) }}
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </div>

                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="(item, index) in sortList" :key="index" :label="item.name"
                                    @click="check(item.id, item.i18n)">
                                    <span v-if="item.check">{{t(item.i18n)}}</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <div @click="click = 1" class="img_box" :class="click == 1 ? 'click' : ''"
                        style="margin-left: 23px;">
                        <img src="@/assets/img/enlarge.png" alt="">
                    </div>
                    <div class="img_box" :class="click == 1 ? '' : 'click'" @click="click = 2"><img
                            src="@/assets/img/narrow.png" alt=""></div>
                </div>
                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto"
                    :infinite-scroll-immediate="false">
                    <div class="main">
                        <!-- v-for="(item, index) in marketList"  :key="'marketList' + index"-->
                        <!-- <div :class="click == 1 ? 'box' : 'small-box'" v-for="(item, index) in marketList" :key="index"> -->
                        <div class="box" v-for="(item, index) in marketList" :key="index">
                            <SvgIcon class="icon-type" :name="`type-${item.orderType}-icon`" />
                            <div class="imgBox" @click="gonftdetails(item.nftId, '1')">
                                <el-image fit="cover" :src="item.nftImage" v-if="item.nftImage" alt="" />
                                <el-image fit="cover" src="@/assets/img/250250.png" alt="" v-else />
                            </div>
                            <div class="bottom">
                                <div>
                                    <div class="name" v-if="item.name && nftlist.type != '1'"> {{ item.name }}({{
        item.nftName
}})</div>
                                    <div class="name" v-if="!item.name && nftlist.type != '1'"> {{ item.nftName }}</div>

                                    <img src="@/assets/img/iconNew.png" v-if="item.isAuth == 2 && nftlist.type != '1'"
                                        style="width: 16px;height: 16px;margin: 0 5px;">
                                </div>
                                <div>
                                    {{ item.nftName }} #{{ item.nftTokenId }}
                                    <!-- {{ marketList.length }} -->
                                </div>
                                <div class="Price">
                                    <img src="@/assets/img/BNB.png" alt=""
                                        style="margin-right:5px;width:12px;height:12px;">
                                    {{Number(item.price).toFixed(4)}}
                                </div>
                            </div>
                            <div style="border-radius: 0px 0px 8px 8px;">
                                <div class="btn" @click="buyNow(item.nftId, '1')">
                                    <img style=" width: 9px;height: 18px;vertical-align: middle;"
                                        src="@/assets/img/buyPc.png" alt="">
                                    {{ t('browse.Buy') }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom: 50px; display:flex;justify-content: center;align-items:center;">
                        <van-loading size="24px" style="margin:auto;" v-if="loading1">{{ t('browse.Loading') }}
                        </van-loading>
                    </div>
                    <el-dialog v-model="dialogVisible" width="560px" :align-center="true" :center="true"
                        style="border-radius:30px; height:400px;">
                        <template #header>
                            <span class="dialog-header">
                                {{ t('NFTdetails.Purchase_details') }}
                            </span>
                        </template>
                        <div class="contenr">token ID <span>{{ nftdetails.nftTokenId }}</span></div>
                        <div class="contenr">{{ t('NFTdetails.price') }} <span> {{
        Number(nftdetails.nftPrice).toFixed(4)
}}</span></div>
                        <div class="contenr">{{ t('NFTdetails.holder') }} <span> {{
        proxy.$filters.addressFilters(nftdetails.nftOwner.toString(), 5, 4)
}}</span></div>
                        <div class="contenr">{{ t('NFTdetails.SeriesName') }}<span>{{ nftdetails.nftContractName
}}</span></div>
                        <div class="contenr">{{ t('NFTdetails.Contract_address') }} <span style="color: #5a64e9;">
                                {{
        proxy.$filters.addressFilters(
            nftdetails.contractAddr.toString(),
            5,
            4
        )
}}</span></div>
                        <div class="contenr">
                            <div>{{ t('NFTdetails.Creator_income') }}
                            </div>
                            <span>{{ nftdetails.creatorIncome ? Number(nftdetails.creatorIncome * 100) : 0
}}%</span>
                        </div>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button type="primary" @click="sell2" class="confirm" v-if="!loadingShow">
                                    <span v-if="!loadingShow">{{ t('browse.Buy') }}</span>
                                </el-button>
                                <el-button v-else type="primary" loading class="confirm sell-btn">{{
        $t('overall.Purchasing')
}}
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
                </ul>
                <el-pagination v-model:current-page="seachData.current" v-model:page-size="seachData.size"
                    :page-sizes="[100, 200, 300, 400]" small="small" background="background"
                    layout="total, prev, pager, next" :total="total" @current-change="handleCurrentChange" />
            </el-main>
        </el-container>
    </el-container>
    <connectBox :ConnectWallet="ConnectWallet" @change="changeConect"></connectBox>
</template>
<script lang='ts' setup>
import { ArrowDown } from '@element-plus/icons-vue'
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
import { copy } from "@/utils/copy";
import { TransactionType } from "@/utils/type";
import { useRouter, useRoute } from "vue-router";
import { getNftDetail, getNftTransactionHistory, reloadNftMetadata, getNftContractListForMarket } from "@/api/browse";
import { BigNumber, ethers } from "ethers";
import { initSigner } from "@/utils/thhersUtils";
// import { ElSelect } from 'element-plus';
import { Dialog } from "vant";
import { useI18n } from "vue-i18n";
import LSSVMRouter from "@/utils/contracts/LSSVMRouter.json";
import { Toast } from "vant";
import { nftdetailsType } from "@/utils/type";
import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";
import NFT from "@/utils/contracts/NFT.json";
import { useStates, useActions } from "@/hooks/userStore";
import { getNftListByMarket } from "@/api/browse";
import { ElMessage } from 'element-plus'
import { filterLogin } from '@/utils/DialogSwitchChain'
import AggregationJSON from "@/utils/contracts/Aggregation.json";

import { getPath } from '@/utils'
import { ElementSDK, Network } from "element-js-sdk";

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
let ConnectWallet = ref<boolean>(false)


const menu: any = ref(null)
const main: any = ref(null)
// menu
const opensidemenu = () => {
    menu.value.style.width = '250px'
    main.value.style.marginLeft = '250px'
}
// /收回/
const closesidemenu = () => {
    menu.value.style.width = '0'
    main.value.style.marginLeft = '0'
}



const owner = ref<string>("");
let getName = ref<string>('');
let name_title = ref<HTMLParagraphElement | null>(null);
let nftdetails = ref<nftdetailsType | any>({
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
    searchKey: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "",
    },
    active_1: {
        type: String,
        default: "",
    },
    marketList: {
        type: Array as unknown as PropType<nftrecordType[]>,
        default: () => [],
    }
})

let sellType = ref<boolean>(false);
let buy_show = ref<boolean>(false);
let dialogVisible = ref<boolean>(false);
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
        contracts.Aggregation = new ethers.Contract(
            proxy.$common.Aggregation,
            AggregationJSON,
            provider
        ).connect(signer);
        try {
            if (nftdetails.value.contractAddr) contracts.NFT = new ethers.Contract(nftdetails.value.contractAddr, NFT, provider).connect(signer);
        } catch (e) {
            console.log(e);
        }
        contracts.NFT && contracts.NFT.totalSupply().then((res: any) => {
            nftdetails.value.nftCirculation = res;
            console.log("所有数量", res);
        })
            .catch((e: any) => {
                console.log("所有数量", e);
            });
        if (contracts.NFT) {
            let owners = await contracts.NFT.ownerOf(nftdetails.value.nftTokenId);
            owner.value = owners;
            console.log("所有者", owner.value);
        }
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
    console.log()
    getMarketList()
    gitNftSeries()


    let tries = 0;
    setTimeout(function initTimer(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
        else init();
    });
});
// 跳转nft详情
const gonftdetails = (id: number, type: string): void => {
    router.push("/browse/nftdetails?nftId=" + id + '&type=' + type);
};
// 侧边栏
const loading = ref(false);
let marketList = ref<any>([]);
const finished = ref(false);
const screen_type = computed(() => storeState.PageType.screen_type);
const Actions: any = useActions(["setScreen"], "PageType");
let more: any = ref(null)
let loading1 = ref(false)
const load = () => {
    if (more.value) {
        clearTimeout(more.value)
    }
    if (marketList.value.length < total.value) {
        loading1.value = true
    }
    more.value = setTimeout(async () => {
        await getMarketList();
        loading1.value = false
    }, 1000)
}
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
let disabled = ref(true)
let Start = ref()
let end = ref()
let search = () => {
    seachData.param.priceStartUn = Start.value
    seachData.param.priceEndUn = end.value
    let test = /^[0-9]+([.][0-9]{1,})?$/;
    if (test.test(seachData.param.priceEndUn) && test.test(seachData.param.priceStartUn)) {
        if (seachData.param.priceEndUn > seachData.param.priceStartUn && Number(seachData.param.priceEndUn) > 0 && seachData.param.priceEndUn != seachData.param.priceStartUn) {
            seachData.param.priceStart = seachData.param.priceStartUn;
            seachData.param.priceEnd = seachData.param.priceEndUn;
            seachData.current = 1
            disabled.value = false
        }
    } else {
        disabled.value = true
    }
}
let search1 = async () => {
    disabled.value = true
    Start.value = ''
    end.value = ''
    marketList.value = []
    await getMarketList();
    // await reset()
    updatescreen_type();
}

const updatescreen_type = () => {
    let type;
    if (screen_type.value) type = false;
    else type = true;
    Actions.setScreen(type);
    seachData.param.sort = seachData.param.sortUn = 1
    // reset();
};
let total = ref<any>(0)
let seachData = reactive({
    param: {
        sort: 1, //排序：0,时间 1，低价优先；2，高价优先"
        sortUn: 0, //排序：0,时间 1，低价优先；2，高价优先"
        priceStart: "", //起始价格
        priceStartUn: "", //起始价格
        priceEnd: "", //结束价格
        priceEndUn: "", //结束价格
        transactionType: "", //"交易类型：0，买；1，卖"
        status: "", //"状态：0，未成交；1，已成交"
        currency: "ETC",
        currency_img: getPath("@/assets/img/WBNB.png"),
        contractAddr: nftlist.searchKey || route.query.searchKey,
    },
    current: 1,
    size: 18
});

const handleCurrentChange = (val: number) => {
    seachData.current = val;
    console.log(val,'6666-----');
    getMarketList()
}

const getMarketList = (loadingInstance?: any) => {
    if (!seachData.param.contractAddr && nftlist.type == 1) {
        seachData.param.contractAddr = localStorage.getItem('addressNFT')
    }
    // seachData.param.contractAddr  =nftlist.searchKey ||  route.query.searchKey
    // loading.value=true

    getNftListByMarket(seachData)
        .then((res: any) => {
            console.log(res);
            loading.value = true
            marketList.value = res.rows
            // marketList.value = res.rows;
            loading.value = false;
            loadingInstance && loadingInstance.close();
            if (res.rows.length < seachData.size) {
                finished.value = true
            }
            // reset()
            total.value = res.total
        })
        .catch((e) => {
            console.error(e);
            loading.value = false
            loadingInstance && loadingInstance.close();
        });
    localStorage.setItem('addressNFT', seachData.param.contractAddr)

};
//
let NftSeries = ref<any>([])
const gitNftSeries = () => {
    getNftContractListForMarket({
        current: 1,
        size: 100,
        param: {}
    }).then((res: any) => {
        console.log(res, 666661111);
        NftSeries.value = res.rows
        console.log(NftSeries.value, 11111166666);


    }).catch((e) => {
        console.error(e);
    });
}
let rotate1 = ref(false);
let timer1: any = ref(null);
const series = (value) => {
    seachData.param.contractAddr = value
    getMarketList()
    rotate1.value = true;
    timer1.value = setTimeout(() => {
        rotate1.value = !rotate1.value;
    }, 1000);
}
let sortList = ref([
    {
        id: 0,
        name: "最近上市",
        i18n: "browse.Recently_listed",
        check: true
    },
    {
        id: 1,
        name: "价格升序",
        i18n: "browse.Low_price_first",
        check: false

    },
    {
        id: 2,
        name: "价格降序",
        check: true,
        i18n: "browse.High_price_first",
    },
])
let check = (id1: number, name: string) => {
    seachData.param.sortUn = id1;
    sortList.value.forEach(val => {
        if (val.id == id1) {
            val.check = false
            label1.value = name
        } else {
            val.check = true
        }
    });
    marketList.value = []
    seachData.current = 1
    seachData.param.sort = seachData.param.sortUn;
    seachData.param.priceStart = "";
    seachData.param.priceStartUn = "";
    seachData.param.priceEnd = "";
    seachData.param.priceEndUn = "";
    // let test = /^[0-9]+([.][0-9]{1,})?$/;
    // if (
    //     (seachData.param.priceEndUn != "" && seachData.sparam.priceStartUn === "") ||
    //     (seachData.param.priceEndUn === "" && seachData.param.priceStartUn != "")
    // )
    //     return Toast.fail(t('overall.minandmax'));
    // if (test.test(seachData.param.priceEndUn) && test.test(seachData.param.priceEndUn)) {
    //     if (seachData.param.priceEndUn > seachData.param.priceStartUn) {
    //         seachData.param.priceStart = seachData.param.priceStartUn;
    //         seachData.param.priceEnd = seachData.param.priceEndUn;
    //     }
    //     if (seachData.param.priceEndUn < seachData.param.priceStartUn) {
    //         seachData.param.priceStart = seachData.param.priceEndUn;
    //         seachData.param.priceEnd = seachData.param.priceStartUn;
    //     }
    // }
    getMarketList();
    updatescreen_type();
    // }
}
let showView = ref<boolean>(false);
// nftdetails.value = []
async function getDataNFT() {
    // console.log(route.query.nftId,'=784574518');
    if (!route.query.nftId) return;
    let res: any = await getNftDetail(route.query.nftId as unknown as number)
    nftdetails.value = res;
    console.log(nftdetails, '=====111111======');
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
    try {
        let History: any = await getNftTransactionHistory({ nftTokenId: res.nftTokenId, nftContractAddr: res.contractAddr });
        console.log('History', History.rows)
        History.rows.forEach((val: any) => {
            nftdetails.value.transactionHistoryVOList.push({ ts: val?.txHash ? val?.txHash : '--', price: val?.nftPrice ? val?.nftPrice : '--', time: val?.createTime ? val?.createTime : '--' })
        })
    } catch (e) {

    }
    nextTick(() => {
        // let text = (name_title.value as HTMLParagraphElement).innerHTML;
        // if (text.length > 15) (name_title.value as HTMLParagraphElement).style.width = '3rem';
    })
}
// 登录弹窗
// let loginShow = ref(false)
let loadingShow = ref(false)
const sell2 = async () => {
    if (
        nftdetails.value.nftOwner.toLocaleLowerCase() !=
        userinfo.value.hexAddress.toLocaleLowerCase() || route.query.type === '1'
    ) {
        // if (nftdetails.value.nftOwner.toLocaleLowerCase() != owner.value.toLocaleLowerCase()) return Toast.fail("购买失败");

        //没有登录
        if (!userinfo.value.isLogin) {
            ElMessage({
                message: t('overall.logTips'),
                type: 'warning',
            })
            return
        }
        if (!userinfo.value.isLogin || !useraddress.value || !signers || !providers) {
            return
        }
        loadingShow.value = true
        let userBalance = await providers.getBalance(useraddress.value)
        console.log(ethers.utils.formatUnits(userBalance, 18) + 'bnb余额');
        if (nftPriceNew > ethers.utils.formatUnits(userBalance, 18)) {
            loadingShow.value = false
            dialogVisible.value = false
            ElMessage.error(t("overall.Balance"))
            return
        }
        create_show.value = true;
        // 合约
        let newtotal = nftdetails.value.nftPrice;
        let pools:string[] = [nftdetails.value.poolAddr];
        let ids:string[][] = [[nftdetails.value.nftTokenId]]
        let position:string[]= [nftdetails.value.position]
        if (nftdetails.value.orderType==1) {
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
          contract_total += Number(ethers.utils.formatUnits(res2[3], 18));
          position = ["0x00"];
          contract_total = Number(contract_total) > Number(nftdetails.value.nftPrice) ? Number(contract_total) : Number(nftdetails.value.nftPrice)
          newtotal = ethers.utils.parseUnits((contract_total * 1.01).toFixed(18), 18);

        }else if (nftdetails.value.orderType==4)
        {
          let { provider, address, signer, Balance } = await initSigner();
          const sdk = new ElementSDK({
            networkName: Network.BSC,
            isTestnet: false,
            apiKey: "5a29e50ab0789f6d1a3351f61568dd28",
            signer: signer
          });
          const orders = await sdk.queryOrders({
            asset_contract_address: nftdetails.value.contractAddr,
            token_ids: [nftdetails.value.nftTokenId]
          });
          const tradeData = await sdk.encodeTradeData({
            orders: orders
          });
          pools = [tradeData.toContract];
          position = [tradeData.data];
          newtotal = tradeData.payableValue;
        }

        try {
          console.log("聚合够吗")
          console.log(   pools,
            ids,
            [newtotal],
            position,
            [nftdetails.value.orderType],
            { value: newtotal }
          );
            let res: any = await contracts.Aggregation.buyNFTForIds(
              pools,
              ids,
              [newtotal],
              position,
              [nftdetails.value.orderType],
              { value: newtotal }
            )
            await res.wait();
            create_show.value = false;
            Toast.clear();
            dialogVisible.value = false
            marketList.value = []
            seachData.current = 1
            getMarketList()
            ElMessage({
                message: t('overall.spSucceed'),
                type: 'success',
            })
            onClickLeft();
            loadingShow.value = false
        } catch (e) {
            console.log(e);
            Toast.clear();
            loadingShow.value = false
            dialogVisible.value = false
            ElMessage.error(t('overall.spFailed'))
            // Toast.fail(t('overall.spFailed'));
        }
    } else {
        loadingShow.value = false
        router.push("/business?searchKey=" + nftdetails.value.contractAddr);
    }
};

function sell() {
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
let label1: any = ref('browse.Low_price_first')

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
    buy_show.value = true

};
const onClickLeft_1 = () => {
    router.go(-1);
}
const submit = () => {
    router.go(-1);
}
let rotate = ref(false);
let timer: any = ref(null);
const start = () => {
    if (timer.value) {
        clearTimeout(timer.value);
        clearTimeout(timeT.value);
        clearTimeout(timeF.value);
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
const changeConect = () => {
    ConnectWallet.value = false
}
const buyNow = async (item, val) => {

    if (nftlist.type == '1') {
        await proxy.$router.push({
            path: "/business",
            query: { nftId: item, type: val, searchKey: nftlist.searchKey }
        })
    } else {
        await proxy.$router.push({
            path: "/browse",
            query: { nftId: item, type: val, searchKey: nftlist.searchKey }
        })
    }
    if (!userinfo.value.isLogin) return ConnectWallet.value = true;
    if (!filterLogin(userinfo.value.isLogin, useraddress.value || String(userinfo.value.hexAddress))) return;
    dialogVisible.value = true
    await getDataNFT()
}

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath, 1111111111111)
    foldShow.value = true
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath, 222222222)
    foldShow.value = false

}

// 图片大小切换
let imgList = ref([{
    url: '@/assets/img/enlarge.png'
},
{
    url: '@/assets/img/narrow.png'
}])
let click = ref(2)
let timeT: any = ref(null)
let timeF: any = ref(null)
let foldShow = ref(false)
let foldShowFn1 = () => {
    foldShow.value = true
    console.log(foldShow.value, '==============true');
    click.value = 1
}
let foldShowFn = async () => {
    foldShow.value = false
    click.value = 2
    console.log(foldShow.value, '==============false');
}
// 登录弹窗
let walletList = ref([
    { img: '@/assets/img/MetaMask.png', name: 'MetaMask' },
    { img: '@/assets/img/tp.png', name: 'TokenPocket ' },
    { img: '@/assets/img/WalletConnect.png', name: 'WalletConnect' },
    { img: '@/assets/img/OneKeyWallet.png', name: ' OneKey Wallet' },
    { img: '@/assets/img/BitKeep.png', name: 'BitKeep' },
    { img: '@/assets/img/imToken.png', name: 'imToken' },
])
const Actions1: any = useActions(["login", "setuserMap"], "userMap");
const connect_address = async () => {
    console.log(1111111111111111);
    let { provider, address, signer } = await initSigner();
    Actions1.login({ hexAddress: address, provider: provider })
        .then((res: any) => {
            console.log(res);
            // loginShow.value = false
        })
        .catch((err: any) => {
            if (err.name === "AxiosError") {
                Toast.fail(t('overall.Timeout'));
            } else {
                Toast.fail(t('overall.cancel'));
            }
        });
};


</script>
<style lang="scss" scoped>
:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
    margin-right: 32px;
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

:deep(.el-select .el-input.is-disabled .el-select__caret) {
    display: none;
}

:deep(.el-dialog__headerbtn) {
    font-size: 40px !important;
}

.el-main {
    padding-top: 0 !important;
}

.dialog-header1 {
    color: rgba(16, 16, 16, 1);
    font-size: 28px;
    font-weight: 700;
    text-align: left;
    font-family: SourceHanSansSC-bold;
    padding-bottom: 0 !important;
}

.wallet-box {
    display: flex;
    flex-wrap: wrap;

    div {
        padding-left: 12px;
        width: 298px;
        height: 64px;
        border-radius: 32px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;

        &:hover {
            background: #EAEAEB;
        }

        img {
            width: 40px;
            height: 40px;
            margin-right: 15px;
        }

        &:nth-child(odd) {
            margin-right: 4px;

        }
    }
}





.footer {
    // position: relative;
    // bottom: 0;
    // left: 0;
    width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
    padding-top: 50px;

    &-left div:nth-child(1) {
        font-size: 24px;
        font-family: FZCuQian-M17S;
        font-weight: 400;
        color: #23262F;
    }

    &-left div:nth-child(2) {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #777E90;
        padding-top: 18px;
    }

    &-img {
        width: 24px;
        height: 20px;
        object-fit: contain;
        margin-right: 15px;
    }

    &-text {
        text-align: center;
        padding-top: 18px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #777E90;
    }

    &-text span:nth-child(2) {
        padding-left: 10px;

    }
}

.footer_line {
    width: 100%;
    height: 1px;
    background: #EEF0F2;
}

.menu-box {
    margin: 0 0 0 22px;
    width: 260px;
    border-top: 1px solid #EEF0F2;

    .Price {
        margin: 33px 0 33px 26px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000004;
    }

    :deep(.el-input--small) {
        width: 260px !important;
        height: 45px;
        border-radius: 8px;
        margin-bottom: 9px;
    }

    :deep(.el-input__wrapper) {
        color: #353945 !important;
        font-size: 14px;
        padding-left: 41px;
        font-family: Roboto;
        // border: 1px solid rgba(187, 187, 187, 1);
        background-color: rgba(0, 0, 0, 0) !important;
        border: none !important;
        box-shadow: none;
        width: 260px;
        height: 45px;
        border-radius: 8px;
        border: 1px solid #EEF0F2 !important;
    }

    .right {
        color: #353945;
        font-size: 14px;
        margin-bottom: 12px;
        font-family: SourceHanSansSC-regular;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        span {
            margin: 0 15px;
        }

        input {
            width: 108px;
            height: 45px;
            border: 1px solid #EEF0F2;
            border-radius: 8px;
            font-size: 14px;
            font-family: Roboto;
            background-color: rgba(0, 0, 0, 0) !important;
            box-shadow: none;
            text-align: center;
        }
    }

    .button {
        width: 260px;
        height: 48px;
        background: #3B82F6;
        border-radius: 8px;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;

        &:hover {
            background: #3743DB;
        }
    }


}

.el-btn {
    background-color: rgba(0, 0, 0, 0) !important;
}

:deep(.el-radio-button__inner) {
    border: none !important;
    background-color: rgba(0, 0, 0, 0) !important;
}

// 筛选
.el-dropdown-link {
    padding: 0 20px 0 12px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

// 图标切换
.img_box {
    width: 47px;
    height: 45px;
    border: 1px solid #EEF0F2;
    opacity: 0.5;
    // border-radius: 8px 0px 0px 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 21px;
        height: 21px;
    }
}

.click {
    background: #EBEEF2;
}

:deep(.el-dropdown-menu__item) {
    width: 186px !important;
    border-radius: 8px;
}

:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
    background: #EBEEF2;
    color: #777E90;
    border-radius: 0px;

}

:deep(.el-dropdown) {
    display: flex;
    align-items: center;
    width: 186px;
    height: 45px;
    line-height: 45px;
    text-align: center !important;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    // background: #EBEEF2;
    border: 1px solid #EEF0F2;
    opacity: 0.5;
    border-radius: 8px;
    color: #777E90;
}

:deep(.el-dropdown-link .el-tooltip__trigger .el-tooltip__trigger) {
    width: 186px !important;
    text-align: center !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

:deep(.el-menu) {
    background-color: #101010 !important;
    border-right: none;
    background: #FFFFFF !important;
}

:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
    width: 312px !important;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

h5 {
    display: flex;
    align-items: center;
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

.rotate1 {
    transform: rotate(180deg);
    transition: all 0.9s;
}

.infinite-list {
    // width: 100vw;
    padding: 0;
    margin: 0;
    list-style: none;
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
    margin-top: 0.469vw;
    // display: flex;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(auto-fill, 220px);
    grid-gap: 25px;
    justify-content: space-between;

    // margin-bottom: 0.3rem;
    >div {
        position: relative;
        .icon-type {
            z-index: 2001;
            position: absolute;
            left: 10px;
            top: 10px;
            height: 30px;
            width: 30px;
        }
    }

    .btn {
        cursor: pointer;
        padding: 10px 0 0px 10px;
        border-radius: 0px 0px 8px 8px;
        text-align: left;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #353945;
        background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .small-box {
        cursor: default;
        width: 100%;
        height: 370px;
        border-radius: 10px;
        padding: 0 0px 0 0;
        margin-bottom: 21px;
        margin-right: 15px;
        box-shadow: 0vw 2px 5px 1px rgba(133, 139, 155, 0.25);
        color: rgba(16, 16, 16, 1);
        background-color: #FFFFFF;

        .imgBox {
            width: 100%;
            height: 250px;
            padding: 0;
            border-top-left-radius: 0.26rem;
            border-top-right-radius: 0.26rem;
        }

        img {
            width: 100%;
            height: 100%;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .bottom {
            height: 82px;
            text-align: left;
            font-size: 16px;
            padding: 11px 10px 17px 19px;

            >div:nth-of-type(1) {
                .name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                display: flex;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #777E90;
                margin-bottom: 8px;
            }

            >div:nth-of-type(2) {
                width: 100%;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #23262F;
                margin-bottom: 8px;
            }

            .Price {
                display: flex;
                align-items: center;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #23262F;



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

    .box {
        cursor: default;
        width: 100%;
        padding-bottom: 5px;
        box-shadow: 0px 2px 5px 1px rgba(133, 139, 155, 0.25);
        color: rgba(16, 16, 16, 1);
        background-color: #FFFFFF;
        border-radius: 0px 0px 8px 8px;
        img {
            width: 100%;
            height: 100%;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .imgBox {
            width: 100%;
            height: 200px;
            padding: 0;
            border-top-left-radius: 0.26rem;
            border-top-right-radius: 0.26rem;
            :deep(.el-image){
                width: 100%;
                height: 100%;
            }
        }

        .bottom {
            text-align: left;
            font-size: 14px;
            padding:5px 0px 0px 10px;

            >div:nth-of-type(1) {
                .name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                display: flex;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #777E90;
                margin-bottom: 5px;
            }

            >div:nth-of-type(2) {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #23262F;
                margin-bottom: 5px;
            }

            .Price {
                display: flex;
                align-items: center;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #23262F;



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


:deep(.el-select .el-input.is-focus .el-input__wrapper) {
    box-shadow: none !important;

    &:hover {
        box-shadow: none !important;
        border: none;
    }
}




// :deep(select){
//     background-color: pink;
//     width: 900px !important;
// }
:deep(.section .select-trigger) {
    border: none !important;
    background-color: rgba(0, 0, 0, 0) !important;
    // width: 1000px;
}

:deep(.el-input .el-input--small .is-disabled .el-input--suffix) {
    border: none !important;
}




.section {
    // width: 100%;
    // height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .select {
        width: 80px !important;
        // background-color: #fff;
    }

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

.nftSeries_left {
    width: 274px;
    margin-right: 26px;
    margin-top: 70px;

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
            &:last-child{
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
                    >span{
                        max-width: 100px;
                        overflow:hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        -o-text-overflow:ellipsis;
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
                        font-size:12px;
                        color: #777E90;
                        margin-right: 15px;
                    }
                }

            }

        }
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



    // .select{
    //   // clip:rect(2px 90px 30px 2px);
    //   border: none;
    // }
    :deep(.el-select) {
        border: none !important;

    }




}

.dialog-header {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #23262F;
    line-height: 40px;
    padding-bottom: 0 !important;
}

:deep(.el-dialog__body) {
    padding-bottom: 0;
}

:deep(.confirm) {
    width: 213px;
    height: 55px;
    border-radius: 20px;
    background-color: rgba(22, 132, 252, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    text-align: center;
    font-family: Microsoft Yahei;
    // border: 1px solid rgba(187, 187, 187, 1);
}

.contenr {
    border: none;
    height: 14px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #777E90;
    line-height: 14px;
    display: flex;
    justify-content: space-between;
    margin: 0 9px;
    margin-bottom: 23px;

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
</style>
