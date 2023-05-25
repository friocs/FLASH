
<template>
    <div style="position: relative;border-bottom: 1px solid #EEF0F2;;">
        <div class="header">
            <div class="header-flex">
                <div class="header-logo" @click="logoClick">
                    <!-- <img class="header-img" src="../assets/img/logo_3.png" /> -->
                    <svgIcon name="logo" class="logo_in"></svgIcon>
                    <!-- <img class="header-img" src="../assets/img/logo.png" /> -->
                    <!-- <img width="76" src="../assets/img/logotitle.png" /> -->
                </div>
                <div class="header-meu">
                    <router-link v-for="(item, index) in menuList" :key="'list1' + index" :to="item.path">
                        {{ $t(`Home.${item.name}`) }}
                    </router-link>
                </div>
                <div id="mask" ref="mask" @click="maskClick" v-if="dialogVisible">

                </div>
                <div class="autoInput-box">
                    <!-- <van-search @focus="searchClick" :placeholder="$t(`Home.Search`)" /> -->
                    <img src="" alt="">
                    <el-input v-model="addressInput" :placeholder="$t(`Home.Search`)" :prefix-icon="Search"  @input="searchChange"
                        @focus.stop="searchClick" clearable />
                    <div class="search-box" v-if="dialogVisible">
                        <div class="history-box" v-if="itemData.searchHistoryList.length > 0 && isSearch">
                            <span>{{ $t('top.Historical_search') }}</span>
                            <img src="../assets/img/trashcan.png" alt="" @click.stop="deleteHistory">
                        </div>
                        <div class="history-tgbox" v-if="itemData.searchHistoryList.length > 0 && isSearch">
                            <div class="history-tag" v-for="(item, index) in itemData.searchHistoryList" :key="index"
                                @click.stop="searchDetalis(item)">
                                {{
                                        proxy.$filters.addressFilters(item, 6, 4)
                                }}<img src="../assets/img/cha.png" alt="" @click.stop="deleteItem(item, index)">
                            </div>
                        </div>
                        <div class="history-box">
                            <span>{{ $t('top.Popular_search') }}</span>
                        </div>
                        <div class="search-content" v-loading="loading" element-loading-background="#FCFCFD">
                            <el-scrollbar class="search-d" v-if="itemData.searchList.length > 0">
                                <div class="">
                                    <div class="content-item" v-for="(item, index) in itemData.searchList" :key="index"
                                        @click.stop="searchDetalis(item.contractAddr)">
                                        <div class="item-left">
                                            <img class="token-icon" :src="item.contractLogo" alt=""
                                                v-if="item.contractLogo">
                                            <img class="token-icon" src="https://ave.ai/icon-default.png" alt="" v-else>
                                            <span class="token-symbol" v-if="item.name">{{
                                                    item.name + "(" + item.nftContractName + ")"
                                            }}</span>
                                            <span class="token-symbol" v-else>{{ item.nftContractName || "--" }}</span>
                                            <img v-if="item.isAuth == 2" src="../assets/img/token_logo.png" alt="">
                                        </div>
                                        <div class="item-right">
                                            <div> <img src="@/assets/img/price_logo.png" alt=""> {{ item.floorPrice
                                                    ?
                                                    proxy.$filters.numFilters4(item.floorPrice) : '--'
                                            }} </div>

                                            <div><img src="@/assets/img/price_logo.png" alt="">{{ item.highestOffer
                                                    ?
                                                    proxy.$filters.numFilters4(item.highestOffer) : '--'
                                            }} </div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                            <div class="search-empty" v-else>
                                <div>
                                    <span>{{ $t('overall.No') }}</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
            <div class="header-flex" style="margin-right:4.167vw">
                <div class="header-chain">
                    <!-- <img width="26" height="26" src="../assets/img/chain_2.png" /> -->
                    <svgIcon name="bnb" class="bnb_icon"></svgIcon>
                    <span style="font-size: 0.729vw;font-family: Arial;font-weight: bold;color: #777E90;">ETC Chain</span>
                </div>
                <img  @click="Language_switching"  src="../assets/img/chain.png"
                    style='margin-left: 1.042vw;cursor: pointer; width:1.302vw;height:1.302vw;"' />
                <div class="wallet_btn" v-if="!userinfo.isLogin" @click.stop="ConnectClick">
                    {{ $t('my.wallet') }}
                </div>

                <img @click="frame" ref="treeWrap_1" width="30"
                    v-else-if="userinfo.headPic === '' || userinfo.headPic === 'https://metapro.superswap.cool//image'"
                    src='@/assets/img/Defaultavatar.png'
                    style='margin-left: 1.042vw;border-radius: 50%;cursor: pointer;' />
                <img @click="frame"    v-else :src="userinfo.headPic" ref="treeWrap_1"
                    style='margin-left: 1.042vw;border-radius: 50%;cursor: pointer; width:1.302vw; height:1.302vw;"' />
                <!-- <img width="30"  v-if="!userinfo.isLogin" @click.stop="connect_address" height="30" src="../assets/img/wallet.png" style='margin-left: 20px;' /> -->
                <!-- <img @click="show_1=true" width="30" v-else-if="userinfo.headPic === '' ||  userinfo.headPic==='https://metapro.superswap.cool//image'" src='@/assets/img/Defaultavatar.png' style='margin-left: 20px;border-radius: 50%;cursor: pointer;' />
                 <img @click="show_1=true" width="30" v-else :src="userinfo.headPic" style='margin-left: 20px;border-radius: 50%;cursor: pointer;' /> -->
            </div>

        </div>

        <div class="header-item" v-if="show_1" style="z-index: 99;position: fixed;" ref="treeWrap">
            <div class="header-list" @click="info" style="padding-top:30px">
                {{ t('Home.Personal') }}
            </div>
            <div class="header-list" @click="updatemydetail">
                {{ t('Home.Edit') }}
            </div>
            <div class="header-list" style="border:none" @click="logout">
                {{ t('Home.out') }}
            </div>
        </div>
        <!-- <div class="search-box">
            <el-dialog v-model="dialogVisible" width="50%" :show-close="false" @close="dialogClose">
                <div class="header-dialog-container">
                    <div class="dialog-input">
                        <el-input v-model="addressInput" :placeholder="$t('top.Search')" size="large"
                            :prefix-icon="Search" clearable @input="searchChange"></el-input>
                    </div>
                    <div class="search-history-container" v-if="itemData.searchHistoryList.length > 0 && isSearch">
                        <div class="header-title">
                            <span>{{ $t('top.Historical_search') }}</span>
                            <el-icon @click="deleteHistory" color="#777E90" size="34">
                                <Delete />
                            </el-icon>
                        </div>
                        <div class="search-history">
                            <div class="history-tag" v-for="(item, index) in itemData.searchHistoryList" :key="index"
                                @click="historyBtn(item)">{{
                                proxy.$filters.addressFilters(item, 6, 4)
                                }} <img src="../assets/img/cha.png" alt="" @click.stop="deleteItem(index)"> </div>

                        </div>
                    </div>
                    <div class="header-title">{{ $t('top.Popular_search') }}</div>
                    <div class="search-content">
                        <div class="histrory">
                           
                            <el-scrollbar
                                :class="isSearch && itemData.searchHistoryList.length > 0 ? 'search-h' : 'search-d'"
                                v-if="itemData.searchList.length > 0">
                                <ul class="content" v-loading="loading" element-loading-background="#FCFCFD">
                                    <li v-for="(item, index) in itemData.searchList" :key="index"
                                        @click="searchDetalis(item.contractAddr)">
                                        <a class="flex">
                                            <div class="token-info">
                                                <div class="icon-token-container">
                                                    <img class="token-icon" :src="item.contractLogo" alt=""
                                                        v-if="item.contractLogo">
                                                    <img class="token-icon" src="https://ave.ai/icon-default.png" alt=""
                                                        v-else>

                                                </div>
                                                <span class="token-symbol">{{ item.nftContractName }}</span>
                                                <img src="../assets/img/token_logo.png" alt="">
                                            </div>
                                            <div class="flex-box">
                                                <div> <img src="@/assets/img/price_logo.png" alt=""> {{ item.floorPrice
                                                ?
                                                proxy.$filters.numFilters4(item.floorPrice) : '--'
                                                }} </div>

                                                <div><img src="@/assets/img/price_logo.png" alt="">{{ item.highestOffer
                                                ?
                                                proxy.$filters.numFilters4(item.highestOffer) : '--'
                                                }} </div>

                                            </div>
                                        </a>
                                    </li>

                                </ul>
                            </el-scrollbar>
                            <div class="search-empty" v-else>
                                <div>
                                    
                                    <span>{{ $t('overall.No') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </el-dialog>
        </div> -->


        <connectBox :ConnectWallet="ConnectWallet" @change="changeConect"></connectBox>


    </div>
</template>
<script lang='ts' setup>
import { computed, getCurrentInstance, onMounted, inject, ref, watch, reactive, PropType, provide } from 'vue'
import { Search, Delete, Message } from '@element-plus/icons-vue'
import { getNftContractListAll, getNftContractListAllSearch, getSearchInfo, clearHistorySearch } from "@/api/search"
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { initSigner } from "@/utils/thhersUtils";
import { useStates, useActions } from "@/hooks/userStore";
import { Toast } from "vant";
import { ElLoading, ElMessage } from 'element-plus'
import connectBox from '@/components/connectBox.vue'
import searchdetails from "@/views/browse/searchdetails.vue";
import {getPath} from '@/utils'
const loading = ref(false)
let { t } = useI18n();
let showNotice: boolean | any = inject('showNotice')
const noname = "business-nftlistseriesdetail";
let path = ref<string>("");
const show = ref(false);
const show_1 = ref(false);
const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const Actions: any = useActions(["login", "setuserMap"], "userMap");
const Actions1: any = useActions(["loginOut", "getuserinfo"], "userMap");
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
let menuList = [{
    name: 'home',
    path: '/'
}, {
    name: 'business',
    path: '/business'
},
{
    name: 'browse',
    path: '/browse'
},
{
    name: 'LaunchPad',
    path: '/ino/Establish'
}
]
let contentList = ref([
    { img: getPath('@/assets/img/MetaMask.png'), name: 'MetaMask' },
    { img: getPath('@/assets/img/tp.png'), name: 'TokenPocket ' },
    { img: getPath('@/assets/img/WalletConnect.png'), name: 'WalletConnect' },
    // { img: '@/assets/img/OneKeyWallet.png', name: ' OneKey Wallet' },
    { img: getPath('@/assets/img/BitKeep.png'), name: 'BitKeep' },
    // { img: '@/assets/img/imToken.png', name: 'imToken' }
])
const changeConect = () => {
  ConnectWallet.value = false
}

let current = ref(-1)
const { proxy } = getCurrentInstance() as any;
let itemData = reactive<{
    searchList: any,
    region: any,
    searchHistoryList: any
}>({
    region: 'EN',
    searchList: [],

    searchHistoryList: []
})
let isSearch = ref<boolean>(true)
const dialogVisible = ref(false)
let addressInput = ref<any>(null)
let ConnectWallet = ref<boolean>(false)
onMounted(() => {

    historyResult()

})

watch(() => dialogVisible.value, (newVal, oldVal) => {
    console.log(newVal, "dialogVisible")
})

const ConnectClick = () => {
    ConnectWallet.value = true
}
const frame = (() => {


    show_1.value = !show_1.value
});
// 退出登录
const logout = (): void => {
    Actions1.loginOut().then((res: any) => {
        onClickLeft();
    });
    show_1.value = false
};
const onClickLeft = (): void => {
    // if(route.path == '/me/info'){
    //     router.go(-1);
    // }


    router.push('/');



};
const info = (() => {

    router.push("/me/info");
    show_1.value = false
})
const updatemydetail = (() => {
    router.push("/me/updatemydetail");
    show_1.value = false

})
const logoClick = (() => {
    router.push("/");
    show_1.value = false

})
// 防抖
const debounce = (fun: any, delay: number) => {
    let t: any = ''
    return (args: any) => {
        let that: any = proxy
        let _args = args
        clearTimeout(t)
        t = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
const maskClick = () => {
    console.log("遮罩")
    dialogVisible.value = false
}
const searchChange = debounce(() => {
    console.log("111")
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    if (!addressInput.value || addressInput.value.length == 0 || re.test(addressInput.value)) {
        getHotSearch()
        setTimeout(() => {
            isSearch.value = true
        }, 200);



    } else {
        isSearch.value = false
        getListSearch()

    }

}, 500)
// 历史搜索
const historyResult = () => {
    getSearchInfo().then((res: any) => {
        console.log(res, "历史搜索")
        itemData.searchHistoryList = Array.isArray(res.historySearch) && res.historySearch.slice(0, 6);
    })
}
// 搜索结果
const getListSearch = (() => {
    loading.value = true
    getNftContractListAllSearch(addressInput.value).then((res: any) => {
        console.log(res, "搜索结果")

        loading.value = false
        itemData.searchList = res;
        // addSearchHistory()
    })
})
const editInfo = (() => {
    router.push("/me/updatemydetail");
})
// 添加搜索历史
const addSearchHistory = () => {
    console.log(itemData.searchHistoryList, "添加");

    let index = itemData.searchHistoryList.indexOf(addressInput.value)

    if (index > -1) {
        itemData.searchHistoryList.splice(index, 1)
    }


    itemData.searchHistoryList.unshift(addressInput.value)
    // 最多记录10个
    itemData.searchHistoryList.splice(7, itemData.searchHistoryList.length)

    console.log(itemData.searchHistoryList, "数组");
}
// 删除历史记录
const deleteHistory = () => {
    isSearch.value = false
    itemData.searchHistoryList = [];
    clearHistorySearch().then((res: any) => {
        console.log("删除成功", res)
        if (res.code == 200) {
            ElMessage({
                message: `${t('overall.delsucc')}`,
                type: 'success',
            })
        } else {
            ElMessage.error(t('overall.delerr'))
        }
    })
    console.log(123)
}
const deleteItem = (item: any, index: any) => {

    clearHistorySearch({ searchKey: item }).then((res: any) => {
        if(res.code==200){
            itemData.searchHistoryList.splice(index, 1);
            ElMessage({
                message: `${t('overall.delsucc')}`,
                type: 'success',
            })
        }else{
            ElMessage.error(t('overall.delerr'))
        }
        
    })
}
const searchDetalis = (contractAddr: string) => {

    if (route.path == "/business") {
        const query = JSON.parse(JSON.stringify(route.query));
        query.searchKey = contractAddr; //state 修改的参数
        query.type = 1
        router.push({ path: route.path, query });
        setTimeout(() => {
            router.go(0);
            addressInput.value = "";
            dialogVisible.value = false
        });
    } else {

        router.push("/business?searchKey=" + contractAddr + "&type=1");
        addressInput.value = "";
        dialogVisible.value = false
    }
}
// const searchBlur = () => {
//     setTimeout(() => {
//         dialogVisible.value = false;
//     }, 300);

// }
const searchClick = () => {
    if (!addressInput.value) {
        // 热门搜索
        getHotSearch();
    } else {
        getListSearch() //搜索结果
    }

    historyResult();
    setTimeout(() => {
        dialogVisible.value = true;
    }, 200);




    console.log(123)
}
// 热门搜索
const getHotSearch = (() => {
    loading.value = true
    getNftContractListAll().then((res: any) => {
        console.log(res, "搜索");
        loading.value = false
        itemData.searchList = res;
        itemData.searchList.forEach((val: any) => {
            if (val.floorPrice) val.floorPrice = Number(val.floorPrice).toFixed(4);
            if (val.highestOffer)
                val.highestOffer = Number(val.highestOffer).toFixed(4);
        }
        )
    })
})
// 点击历史记录
const historyBtn = (item: any) => {
    // addressInput.value = item;
    isSearch.value = false;
    // getListSearch()
    console.log(123)
}
// 关闭dialogClose
const dialogClose = () => {
    dialogVisible.value = false
}
const Language_switching = () => {
    locale.value === "CN" ? (locale.value = "EN") : (locale.value = "CN");
    // console.log(locale.value);
    localStorage.setItem("locale", locale.value);
};

defineProps({
    back_type: {
        type: Boolean as unknown as PropType<boolean>,
        default: () => false,
    },
});

const updateshow = (type: boolean) => {
    show.value = type;
};

const gomyindex = () => {
    router.push("/me/info");
};

const connect_address = async (index: any) => {
    current.value = index
    if (index == 0) {
        let { provider, address, signer } = await initSigner();
        Actions.login({ hexAddress: address, provider: provider })

            .then((res: any) => {

                ConnectWallet.value = false
            })
            .catch((err: any) => {
                if (err.name === "AxiosError") {
                    ElMessage.error(t('overall.Timeout'));
                } else {
                    ElMessage.error(t('overall.cancel'));
                }
            });

        try {
            ConnectWallet.value = false
        } catch (e) {
            console.log(e, "失败")
        }
    }


};

const back = (): void => {
    if (route.query.create_type) {
        console.log(123);
    } else {
        router.go(-1);
    }
};
const gosearchdetails = (): void => {
    show.value = true;
    // router.push('/browse/searchdetails');
};
const value = ref("");

const themeVars = {
    vanPopupBackgroundColor: "#000000",
};
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
    background-color: #FCFCFD;
}

:deep(.van-search) {
    width: 3.8485rem;
    border-bottom: 2px solid #858B9B;
    height: 2.292vw;
    // border-radius: 6px;
    // background-color: #252525;
    margin-left: .2875rem;
}
:deep(.van-search__field){
    .van-field__left-icon {
        color: #fff;
        .van-icon {
            font-size: 1.25vw;
        }
    }
}

.header {
    position: fixed;
    bottom: 0px;
    top: 0px;
    background: #fff;
    z-index: 999;
    width: 100%;
    height: 3.385vw;
    // line-height: 65px;
    // background-color: rgba(16, 16, 16, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2.083vw;

    &-item {
        width: .8125rem;
        // height: .8906rem;
        background: #FCFCFD;
        box-shadow: 0px 2px 5px 1px rgba(133, 139, 155, 0.25);
        border-radius: 0.417vw;
        position: absolute;
        right: 3.646vw;
        top: 3.75vw;
    }

    &-list {
        // height: 82px;
        // line-height: 82px;
        padding-bottom: 1.875vw;
        text-align: center;
        color: rgba(16, 16, 16, 1);
        font-size: .0844rem;
        font-weight: 600;
        font-size: 0.833vw;
        font-family: PingFang SC;
        font-weight: bold;
        color: #777E90;
        // border-bottom: 1px solid rgba(153, 153, 153, 1);
        cursor: pointer;
    }

    &-list:hover {
        font-weight: bold;
        color: #000004;
    }

    // padding-right: 40px;
    &-flex {
        display: flex;
        align-items: center;
    }

    &-logo {
        display: flex;
        align-items: center;
        margin-right: 10.417vw;
        .logo_in{
            width: 7.813vw;
            height: 2.344vw;
        }
    }

    &-img {
        width: 7.813vw;
        margin-right: 0.26vw;
        cursor: pointer;
    }

    &-meu a {
        color: rgba(153, 153, 153, 1);
        font-weight: bold;
        color: #777E90;
        padding-right: .2953rem;
        font-weight: bold;
        font-size: 0.833vw;
    }



    &-chain {
        // width: 200px;
        height: 2.292vw;
        border-radius: 0.521vw;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: rgba(49, 54, 59, 1);
        .bnb_icon{
            width: 1.302vw;
            height: 1.302vw;
        }
        // margin-left: 75px;
        span {
            color: rgba(255, 255, 255, 1);
            font-size: 1.042vw;
            font-weight: 600;
            padding-left: 0.521vw;
        }
    }

    &-dialog-container {
        height: 33.333vw;
        border: 1px solid rgba(255, 255, 255, 0.5);



        .header-title {
            font-size: .0833rem;
            color: #777E90;
            letter-spacing: 0;
            font-family: SourceHanSansSC-regular;
            font-weight: 400;
            padding: 0.781vw 0.781vw 0.521vw;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #EEF0F2;
        }

        .search-history-container {
            // border-top: 1px solid #EEF0F2;



            .search-history {
                display: flex;
                flex-wrap: wrap;
                padding: 0 0.781vw;

                .history-tag:last-child {
                    margin-right: 0
                }

                .history-tag {
                    // min-width: 40px;
                    background: #EBEEF2;
                    color: #777E90;
                    border-radius: .0208rem;
                    margin-right: .0521rem;
                    margin-bottom: 0.521vw;
                    border: none;
                    font-size: .0729rem;
                    padding: 0 .0469rem;
                    height: .2083rem;
                    margin-top: .0729rem;
                    display: flex;
                    line-height: .2083rem;
                    align-items: center;
                    cursor: pointer;

                    img {
                        width: .0521rem;
                        height: .0521rem;
                        margin-left: .0469rem;

                    }
                }
            }

        }








        .histrory {
            font-size: 0.625vw;
            padding-bottom: 0.521vw;

            .search-top {
                color: #787b86;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.521vw 1.042vw;
            }

            .search-empty {
                height: 26.042vw;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: #000004;
                font-size: .0781rem;

                img {
                    width: 2.604vw;
                    margin-bottom: 1.042vw;
                }
            }
        }


        .content {
            padding: 0 0.521vw 1.042vw;

            li {
                cursor: pointer;
            }

            a {
                color: #878fbc;
            }

            span {
                color: #c5cbce;
                padding: 0.521vw;
            }

            .token-symbol {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 0.521vw .0573rem;
                font-size: .0729rem;
                color: #000004;
                font-family: PingFang SC;
                font-weight: bold;
            }

            .flex {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: .1042rem;

            }

            .flex-box {
                display: flex;
                align-items: center;
                font-size: .0833rem;

                >div {
                    width: .4167rem;
                    display: flex;
                    align-items: center;
                    color: rgba(255, 72, 72, 1);
                }

                >div:first-child {
                    width: .6771rem;
                    color: rgba(24, 159, 122, 1);
                }

                img {
                    width: .0833rem;
                    height: .0833rem;
                    margin-right: .026rem;
                }
            }

            .token-info {
                display: flex;
                align-items: center;

                img {
                    width: .0833rem;
                    height: .0833rem;
                    margin-left: -0.026rem;
                }

                .icon-token-container {
                    position: relative;

                    .token-icon {
                        width: .1667rem;
                        height: .1667rem;
                        border-radius: 50%;
                    }

                    .icon-symbol {
                        position: absolute;
                        width: 0.781vw;
                        height: 0.781vw;
                        left: 0.677vw;
                        z-index: 1;
                        top: 0.781vw;
                        border-radius: 100%;
                        border: 1px solid #fff;
                    }

                    .icon-svg {
                        font-size: 2.083vw;
                        vertical-align: -0.15em;
                        fill: currentColor;
                        overflow: hidden;
                    }


                }
            }
        }

    }
}

.router-link-exact-active {
    color: #23262F !important;
}



.wallet_btn {
    width: .675rem;
    height: .1828rem;
    background: linear-gradient(45deg, #3772FF 0%, #9757D7 100%);
    border-radius: .0469rem;
    margin-left: .0938rem;
    font-size: .075rem;
    font-family: Arial;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: .1828rem;
    cursor: pointer;
}

.connect-box {
    // width: 3.3854rem;
    height: 1.0417rem;

}

.connect {
    .content {
        display: flex;
        flex-wrap: wrap;

        .connect-item {
            display: flex;
            width: 14.063vw;
            height: .3333rem;
            align-items: center;
            border-radius: .1667rem;
            padding: 0 .0625rem;
            box-sizing: border-box;
            margin-bottom: .125rem;
            cursor: pointer;

            img {
                width: .2083rem;
                height: .2083rem;
                margin-right: .0781rem;
            }

            span {
                color: #353945;
                font-size: .0833rem;
            }
        }

        .connect-item:nth-child(even) {
            margin-left: .0625rem;
        }

        .active {
            background-color: #EAEAEB;
        }
    }

    :deep(.el-dialog) {
        width: 3.3854rem;
        border-radius: .125rem;
    }

    :deep(.el-dialog__title) {
        color: #23262F;
        font-size: .1667rem;
    }

    :deep(.el-dialog__header) {
        padding: .1563rem;
    }

    :deep(.el-dialog__headerbtn) {
        top: .0833rem;
        right: .1302rem;
    }

    :deep(.el-dialog__headerbtn) {
        .el-dialog__close{
            font-size: .125rem;
        }
    }

    :deep(.el-dialog__body) {
        padding: 0 .1563rem;
    }



}

.autoInput-box {
    width: 31.25vw;
    position: relative;
    z-index: 21111;

    .el-input {
        border-bottom: .0104rem solid #858B9B;
    }

    :deep(.el-input__wrapper) {
        box-shadow: unset;
    }

    :deep(.el-input__wrapper) {
        .is-focus{
            box-shadow: unset;
        }
    }

    .search-box {
        z-index: 21111;
        position: absolute;
        width: 3.2rem;
        height: 2.4167rem;
        background: #FCFCFD;
        box-shadow: 0px 2px 5px 1px rgba(133, 139, 155, 0.25);
        border-radius: 0px 0px 8px 8px;
        top: .2604rem;

        .history-box {
            height: .2083rem;
            border-bottom: 1px solid #EEF0F2;
            display: flex;
            justify-content: space-between;
            padding: 0 .1198rem 0 .0729rem;
            color: #777E90;
            font-size: .0625rem;
            font-family: PingFang SC;
            font-weight: bold;
            align-items: center;

            img {
                width: .0625rem;
                height: .0781rem;
                cursor: pointer;
            }
        }

        .history-tgbox {
            height: .3125rem;
            display: flex;
            padding: 0 .0781rem;

            .history-tag {
                background: #EBEEF2;
                color: #777E90;
                border-radius: .0208rem;
                margin-right: .0521rem;
                margin-bottom: 10px;
                border: none;
                font-size: .0729rem;
                padding: 0 .0469rem;
                height: .2083rem;
                margin-top: .0729rem;
                display: flex;
                line-height: .2083rem;
                align-items: center;
                cursor: pointer;

                img {
                    width: .0521rem;
                    height: .0521rem;
                    margin-left: .0469rem;

                }
            }
        }

        .search-content {
            padding: .1042rem .0781rem;
            padding-right: .1198rem;
            height: 2.0833rem;

            .content-item:first-child {
                margin-top: 0;
            }

            .search-h {
                height: 22.396vw;
            }

            .search-d {
                height: 1.9792rem;
            }

            .content-item {
                display: flex;
                cursor: pointer;
                justify-content: space-between;
                margin-top: .1667rem;
                box-sizing: border-box;

                .item-left {
                    display: flex;
                    align-items: center;

                    img:first-child {
                        width: .1667rem;
                        height: .1667rem;
                        border-radius: 50%;
                    }

                    img:last-child {
                        width: .0833rem;
                        height: .0833rem;
                        margin-left: .026rem;
                    }

                    .token-symbol {
                        // margin: 0 .0469rem;
                        max-width: 2.6042rem;
                        margin-left: .0469rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: .0729rem;
                        color: #000004;
                        font-family: PingFang SC;
                        font-weight: 700;
                    }
                }

                .item-right {
                    display: flex;
                    align-items: center;
                    font-size: .0833rem;

                    img {
                        width: 0.0833rem;
                        height: 0.0833rem;
                        margin-right: 0.026rem;
                    }

                    >div {
                        width: 0.4167rem;
                        display: flex;
                        align-items: center;
                        color: #ff4848;
                    }

                    div:first-child {
                        width: 0.6771rem;
                        color: #189f7a;
                    }
                }
            }

            .search-empty {
                height: 1.8229rem;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: #000004;
                font-size: .0781rem;

                img {
                    width: 2.604vw;
                    margin-bottom: 1.042vw;
                }
            }
        }
    }


}

#mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    height: 100%;
    background-color: transparent;
    overflow: auto;

}
</style>

