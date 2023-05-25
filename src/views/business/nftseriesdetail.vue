<template>
    <van-nav-bar :title="t('business.details')" left-arrow safe-area-inset-top @click-left="onClickLeft"
        :border="false" />
    <div class="Home">
        <div class="top">
            <div class="detail">
                <div class="left">
                    <van-image v-if="!nftContract.contractLogo && nftContract.contractLogo!=''" round width="2rem"
                        fit="cover" height="2rem" :src="getPath('@/assets/img/Defaultavatar.png')" />
                    <van-image v-else round width="2rem" fit="cover" height="2rem"
                        :src="(nftContract.contractLogo as string)" />
                </div>
                <div class="right">
                    <div class="upper">
                        <div style="
                            font-size: 0.36rem;
                            color: #fff;
                            font-family: Source Han Sans CN;
                            width: 7rem;
                            word-wrap: break-word;
                            word-break: break-all;
                            display: flex;
                            align-items: center;
              ">
                            <span style="font-size: 0.36rem;
              font-family: Source Han Sans CN;
              font-weight: bold;">
                                {{ nftContract.contractName || "--" }}
                                <img v-if="nftContract.isAuth == 2" class="authentication"
                                    src="@/assets/img/authentication.png"
                                    style="margin: 0 0 0 0.1rem; vertical-align: middle;width: 0.5rem;height: 0.5rem;" />
                            </span>
                        </div>

                        <!-- <img src="@/assets/img/leftarrow.png" /> -->
                    </div>
                    <div class="middle">
                        {{proxy.$filters.addressFilters(nftContract.contractAddr,6,8)}}
                        <img src="@/assets/img/copy.png" @click.stop="copy(nftContract.contractAddr)" />
                    </div>
                    <div class="lower" :style="{opacity:nftContract.isAuth == 2?'1':'0'}">
                        <img src="@/assets/img/homepage.png" @click="opnes('123')" />
                        <img src="@/assets/img/facebook.png" @click="opnes('123')" />
                        <div>
                            <!-- <img src="@/assets/img/Royalties.png" /><span>4%</span> -->
                            <img src="@/assets/img/Royalties.png" /><span>{{ nftContract.royaltyFee || 0 }}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <p class="profile" ref="profile">
                {{nftContract.description ||
                `No Description`}}
            </p>
            <p v-if="profileType" class="unfold" @click="unfold(unfold_type)">
                {{unfold_type?$t('overall.open'):$t('overall.Putaway')}}</p>
            <!-- <div class="five_data">
            <div v-for='item in five_data' :key="item.name">
                <div>{{ item.value }}</div>
                <div>{{ item.name }}</div>
            </div>
        </div> -->
            <nftlist :top="'0px'" :width="'100%'" />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, getCurrentInstance, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { copy } from "@/utils/copy";
import {getPath} from '@/utils'

import nftlist from '@/components/nftlist_1.vue';

const { proxy } = getCurrentInstance() as any;
let { t } = useI18n();
const router = useRouter();
const route = useRoute();

const profile = ref<HTMLDivElement | null>(null);
let profileType = ref(false);
let nftContract: any = route.query || {
    contractAddr: '',
    contractCreate: '',
    contractLogo: '',
    contractName: '',
    description: '',
    circulation: 0,
    isAuth: 0,
};

let unfold_type = ref(true);
const unfold = (type: boolean) => {
    unfold_type.value = !type;
    console.log(type);
    if (type) {
        (profile.value as HTMLDivElement).style.overflow = 'visible';
        (profile.value as HTMLDivElement).style.whiteSpace = 'normal';
        (profile.value as HTMLDivElement).style.wordBreak = 'break-all';

    } else {
        (profile.value as HTMLDivElement).style.overflow = 'hidden';
        (profile.value as HTMLDivElement).style.whiteSpace = 'nowrap';
    }
}
const opnes = (url: string) => {
    open('https://fanyi.baidu.com/#en/zh/unfold');
}
const onClickLeft = (): void => {
    router.go(-1);
    // router.push('/business/nftlistseriesdetail');
}
onMounted(() => {
    console.log((profile.value as HTMLDivElement).clientWidth, (profile.value as HTMLDivElement).scrollWidth);
    if ((profile.value as HTMLDivElement).clientWidth >= (profile.value as HTMLDivElement).scrollWidth) profileType.value = false;
    else profileType.value = true;
    console.log(profileType.value)
})
let five_data = reactive([{ name: t('business.circulation'), value: '10.0K' }, { name: t('business.Holdings'), value: '10.0K' }, { name: t('business.Turnover'), value: '10.0BNB' }, { name: t('business.Highest_quotation'), value: '10.0BNB' }, { name: t('business.Lowest_transaction_price'), value: '10.0BNB' }])
</script>

<style scoped lang="scss">
.Home {
    width: 95%;
    margin: 0 auto;
    margin-top: .3rem;

    // .top {
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-between;
    //     margin: .3rem 0;

    //     .img {
    //         display: flex;
    //         align-items: center;
    //         color: rgba(16, 16, 16, 100);
    //         font-size: .32rem;
    //         text-align: left;
    //         font-family: PingFangSC-regular;
    //     }

    //     >div {
    //         color: rgba(16, 16, 16, 100);
    //         font-size: .32rem;
    //         text-align: left;
    //         font-family: PingFangSC-regular;
    //     }
    // }
    >.top {
        // height: 2rem;
        width: 100%;

        >.detail {
            display: flex;

            .right {
                margin-left: .2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;

                >div {
                    display: flex;
                    align-items: center;
                }

                .upper {
                    font-size: .45rem;
                    text-align: left;
                    color: white;

                    // justify-content: space-between;
                    >p {
                        color: white;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        overflow-wrap: break-word;
                        word-break: break-all;
                    }

                    >img {
                        width: .45rem;
                        height: .45rem;
                        position: relative;
                        top: 2px;
                        // left: .2rem;
                    }

                    >span {
                        font-size: .35rem;
                        text-align: left;
                        font-family: PingFangSC-regular;
                        color: #999;

                        >img {
                            display: inline-block;
                            width: .2rem;
                            height: .2rem;
                            transform: rotate(180deg);
                        }
                    }
                }

                .middle {
                    font-size: .35rem;
                    text-align: left;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #7C7C7C;
                    display: flex;
                    align-items: center;

                    img {
                        margin-left: .3rem;
                        width: .4rem;
                        height: .4rem;
                    }
                }

                .lower {
                    img {
                        width: .5rem;
                        height: .5rem;
                    }

                    img:nth-of-type(2) {
                        margin: 0 .3rem;
                    }

                    >div {
                        >img {
                            margin-right: .1rem;
                        }

                        display: flex;
                        align-items: center;
                        font-size: .35rem;
                        text-align: left;
                        color: #999;
                        font-family: PingFangSC-regular;
                    }

                    span {
                        color: #5A64E9;
                    }
                }
            }
        }

        .profile {
            // margin-bottom: 1rem;
            width: 100%;
            white-space: nowrap;
            font-size: .35rem;
            color: #888;
            text-align: left;
            font-family: PingFangSC-regular;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: .15rem 0;
        }

        .unfold {
            font-size: .35rem;
            color: #1684fc;
            text-align: left;
            width: 1rem;

        }
    }

    .five_data {
        margin-top: .5rem;
        display: grid;
        grid-template-columns: 33% 33% 33%;
        justify-items: center;

        >div {
            color: rgba(16, 16, 16, 100);
            font-size: .32rem;
            text-align: left;
            font-family: PingFangSC-regular;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: .25rem;
        }
    }

    >p {
        color: rgba(16, 16, 16, 100);
        font-size: .32rem;
        text-align: left;
        font-family: PingFangSC-regular;
        border-bottom: 1px solid rgba(187, 187, 187, 50);
        padding-bottom: .5rem;

        >a {
            text-decoration: underline;
        }
    }
}
</style>
