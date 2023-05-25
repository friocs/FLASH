<template>
    <div class="box">
        <search />
        <div class="subject">
            <h2>{{ $t('INO.Popularity') }}</h2>
            <div class="head">
                <div class="list">
                    <img @click="all" src="../../assets/img/screen.png" alt="">
                    <span @click="filtrate(1)" :class="`${cut == 1 ? 'span1' : ''}`"><img
                            src="../../assets/img/fire.png" alt="">{{ $t('INO.popular') }}</span>
                    <span @click="filtrate(2)" :class="`${cut == 2 ? 'span1' : ''}`">BABT</span>
                    <span @click="filtrate(3)" :class="`${cut == 3 ? 'span1' : ''}`">{{ $t('INO.FREEMINT') }}</span>
                    <span @click="filtrate(4)" :class="`${cut == 4 ? 'span1' : ''}`">{{ $t('INO.Finish') }}</span>
                </div>
                <div class="btn" @click="toEstablish">
                    {{ $t('INO.create1') }}
                </div>
            </div>
            <div class="content">
                <div v-if="listData.length > 0">
                    <div class="list" v-for="(item, index) in listData" :key="index">
                    <el-image @click="toParticulars(item)" fit="cover" :src="item.logo" alt=""  style="cursor: pointer;"/>
                    <div>
                        <div class="particulars">
                            <div @click="toParticulars(item)" style="cursor: pointer;">
                                <h4>{{ item.name }}</h4>
                                <p>{{ item.introduce }}</p>
                            </div>
                            <div>
                                <h5>{{ $t('INO.MintPrice') }}</h5>
                                <span v-if="(item.price == 0)">{{ $t('INO.FREEMINT') }}</span>
                                <span v-else>{{ item.price }} <img :src="item.mintLogo" alt=""></span>
                            </div>
                            <div>
                                <h5>{{ $t('INO.TotalSupply') }}</h5>
                                <span>{{ item.maxmint }}</span>
                            </div>
                            <div>
                                <h5>{{ $t('INO.Time') }}</h5>
                                <div><span>{{ dayjs(item.startTime * 1000).format("MM-DD") }}</span> ~
                                    <span>{{ dayjs(item.endTime * 1000).format("MM-DD") }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="btns">
                            <div>
                                <a v-if="item.youtube" :href="item.youtube" target="_blank"><img src="../../assets/img/home_icon9.png" alt=""></a>
                                <a v-if="item.telegram" :href="item.telegram" target="_blank"><img src="../../assets/img/home_icon.png" alt=""></a>
                                <a v-if="item.twitter" :href="item.twitter" target="_blank"><img src="../../assets/img/home_icon6.png" alt=""></a>
                                <a v-if="item.discord" :href="item.discord" target="_blank"><img src="../../assets/img/home_icon7.png" alt=""></a>
                            </div>
                            <div>
                               <div v-if="item.status == 1"> 
                                <div class="btn" @click="toParticulars(item)" v-if="!item.website">
                                    Mint
                                </div>
                                <a :href="item.website" target="_blank" v-else>
                                    <div class="btn">
                                        Mint
                                    </div>
                                </a>
                               </div>
                               <div  v-if="item.status == 2">
                                    <div class="btn1" @click="toParticulars(item)" v-if="!item.website">
                                        Mint
                                    </div>
                                    <a :href="item.website" target="_blank" v-else>
                                        <div class="btn">
                                            Mint
                                        </div>
                                    </a>
                               </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div v-else class="dummy">
                    <el-empty :image-size="120" />
                </div>
            </div>
        </div>
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
import search from "@/components/search.vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { ethers } from "ethers";
import { Launchpads } from "@/api/INO"
import { ElLoading } from "element-plus";
import LSSVMPairFactory from "@/utils/contracts/LSSVMPairFactory.json";
import { initSigner } from "@/utils/thhersUtils";
import dayjs from "dayjs";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const route = useRoute();
let { t } = useI18n();
onMounted(() => {
    let tries = 0;
    setTimeout(function initTimer(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
        else init();
        Launchpads1(list)
    });
});

let useraddress = ref("");
let contracts: {
    LSSVMPairFactory: any;
} = {
    LSSVMPairFactory: null,
};
let list = reactive<any>({
    current: '1',
    size: '100',
    param: {
    }
})
const init = async () => {
    if ((window as any).ethereum) {
        //第一步 ----  获取 当前钱包对象 和 provider
        let { provider, address, signer, Balance } = await initSigner();
        useraddress.value = address;
        //第二部 ----  创建合约对象              '合约地址'       'JSON'  这是上面的provider和signer
        contracts.LSSVMPairFactory = new ethers.Contract(proxy.$common.LSSVMPairFactory, LSSVMPairFactory, provider).connect(signer);
    }
};
const toParticulars = (item) => {
    router.push("/ino/MintDetails?address=" + item.address + '&id=' + item.id);
}
const toEstablish = () => {
    router.push("/ino/LanchPad");
}


let listData = ref<any[]>([])
const Launchpads1 = (val) => {
    Launchpads(val).then((res: any) => {
        listData.value = res.rows
        
    });
}
const all = () => {
    cut.value = 0
    list = {
        current: '1',
        size: '100',
        param: {
        }
    }
    Launchpads1(list)
}
let cut = ref(0)
const filtrate = (val) => {
    if (val == 1) {
        cut.value = 1
        list = {
            current: '1',
            size: '100',
            param: {
                "status": 1,
                "hot": 1
            }
        }
    } else if (val == 2) {
        cut.value = 2
        list = {
            current: '1',
            size: '100',
            param: {
                "status": 1,
                "babt": 1
            }
        }
    } else if (val == 3) {
        cut.value = 3
        list = {
            current: '1',
            size: '100',
            param: {
                "status": 1,
                "price": 0
            }
        }

    } else if (val == 4) {
        cut.value = 4
        list = {
            current: '1',
            size: '100',
            param: {
                "status": 2,
            }
        }
    }
    Launchpads1(list)
}
</script>
  
  
<style scoped lang="scss">
.box {
    background-image: url("../../assets/img/bg.png");
    background-size: 100%;
    background-repeat: no-repeat;
    padding-bottom: 50px;
}

.subject {
    width: 67.708vw;
    margin: 0 auto;
    margin-top: 3.385vw;
    
    h2 {
        margin-top: 6.771vw;
        margin-bottom: 2.604vw;
    }

    .head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.042vw;

        .list {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            >img {
                width: 25px;
                cursor: pointer;
            }

            span {
                font-size: 0.833vw;
                font-weight: bold;
                color: #777E90;
                cursor: pointer;
                display: flex;
                width: 80px;
                height: 40px;
                align-items: center;
                justify-content: center;

                img {
                    width: 13px;
                    margin-right: 0.313vw;
                }
            }

            .span1 {
                color: #23262F !important;
                background: #f0f3f5;
                border-radius: 8px;
            }
        }

        .btn {
            width: 13.49vw;
            height: 2.5vw;
            background: #3743DB;
            border-radius: 0.417vw;
            font-size: 0.833vw;
            font-weight: bold;
            color: #FFFFFF;
            text-align: center;
            line-height: 2.5vw;
            cursor: pointer;
        }

    }

    .content {
        width: 100%;

        .list:hover {
            background-color: #eef0f2ab;
        }

        .list {
            width: 100%;
            height: 12.5vw;
            padding: 0 0.781vw;
            box-sizing: border-box;
            background-color: #eef0f23d;
            border-radius: 0.521vw;
            display: flex;
            align-items: center;
            margin-bottom: 0.521vw;

            :deep(.el-image) {
                width: 17.708vw;
                height: 10.417vw;
                border-radius: 0.521vw;
                padding: 0;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            >div {
                width: 70%;
                margin-left: 1.458vw;
                padding-top: 2vw;
                box-sizing: border-box;

                .particulars {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.521vw;

                    >div {
                        h4 {
                            font-size: 1.25vw;
                            font-weight: bold;
                            color: #23262F;
                            margin-bottom: 0.833vw;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            word-break: break-all;
                            width: 15.625vw;
                        }

                        >p {
                            width: 13.021vw;
                            height: 2.8vw;
                            font-size: 0.833vw;
                            color: #777E90;
                            overflow: hidden;
                            line-height: 0.938vw;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            word-break: break-all;
                        }

                        h5 {
                            font-size: 0.938vw;
                            color: #777E90;
                            margin-bottom: 1.146vw;
                        }

                        >span {
                            display: flex;
                            align-items: center;
                            font-size: 1.042vw;
                            font-weight: bold;
                            color: #353945;

                            img {
                                width: 18px;
                                height: 18px;
                                margin-left: 6px;
                            }
                        }

                        >div {
                            font-size: 1.042vw;
                            font-weight: bold;
                            color: #353945;
                            background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                        }
                    }
                }

                .btns {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    >div{
                        a{
                            margin-right: 1.042vw;
                            cursor: pointer;
                            >img{
                                width: 1.563vw;
                            }
                        }
                    }
                    .btn {
                        width: 7.813vw;
                        height: 2.5vw;
                        background: #3743DB;
                        border-radius: 0.417vw;
                        font-size: 0.938vw;
                        font-weight: bold;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 2.5vw;
                        cursor: pointer;
                    }

                    .btn1 {
                        width: 7.813vw;
                        height: 2.5vw;
                        background: #9e9e9e;
                        border-radius: 0.417vw;
                        font-size: 0.833vw;
                        font-weight: bold;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 2.5vw;
                        cursor: pointer;
                    }
                }
            }
        }

        .dummy {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 100px;

            >img {
                width: 400px;
            }
        }
    }
}
</style>
  