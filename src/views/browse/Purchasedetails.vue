<template>
    <van-nav-bar :title="t('NFTdetails.Purchase_details')" left-arrow safe-area-inset-top @click-left="onClickLeft"
        :border="false" />
    <div class="shopping_details">
        <div v-for="item in list" :key="item.name">
            <div>{{ item.name }}

                <van-popover v-if="item.name === t('NFTdetails.Royalties')" v-model:show="showPopover"
                    placement="top-start" :offset="[-7, 8]">
                    {{t('overall.pricerequireed4')}}
                    <template #reference>
                        <van-image round width=".45rem" fit="cover" height=".45rem"
                            :src="getPath('@/assets/img/questions.png')" />
                    </template>
                </van-popover>
            </div>
            <div>{{ item.value }}</div>
        </div>
    </div>

    <div class="btns" @click="purchase">{{ t('NFTdetails.Confirm_purchase') }}</div>

    <!-- 确认购买 -->
    <van-overlay :show="sellsuccessType" @click="sellsuccessType = false">
        <template v-slot:default>
            <div class="sellsuccessType">
                <van-image width="30%" fit="cover" :src="getPath('@/assets/img/purchase.png')" />
                <p>{{ t('NFTdetails.Purchase_request_submitted') }}</p>
                <div class="btn">
                    <div @click.stop="determine">{{ t('overall.confirm') }}</div>
                </div>
            </div>
        </template>
    </van-overlay>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {getPath} from '@/utils'
let { t } = useI18n();
const router = useRouter();

const list = reactive([{ name: 'token ID', value: '#4178' }, { name: t('NFTdetails.price'), value: '10BNB' },
{ name: t('NFTdetails.holder'), value: '240E92' }, { name: t('NFTdetails.SeriesName'), value: 'Azuki God V2' },
{ name: t('NFTdetails.Contract_Name'), value: '0xc7F9...3a86' }, { name: t('NFTdetails.Royalties'), value: '4%' }])
let sellsuccessType = ref<boolean>(false);

const showPopover = ref(false);

const onClickLeft = (): void => {
    router.go(-1);
    // router.push('/browse/nftdetails?id=1');
}

const purchase = (): void => {
    sellsuccessType.value = true;
}
const determine = (): void => {
    // console.log(123);
    onClickLeft();
    // /browse/nftdetails?id=1
}
</script>

<style scoped lang="scss">
.shopping_details {
    width: 90%;
    margin: 0 auto;
    // border-top: 1px solid #bbb;
    margin-top: .5rem;
    border-radius: 10px;
    background-color: #171717;

    >div {
        display: flex;
        justify-content: space-between;
        // border-left: 1px solid #bbb;
        // border-right: 1px solid #bbb;
        width: 100%;
        border-bottom: 1px solid #373737;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 .5rem;
        box-sizing: border-box;

        >div {
            color: #FFFFFF;
            font-size: .35rem;
            display: flex;
            align-items: center;
            text-align: left;
            font-family: PingFangSC-regular;

            >div {
                margin-left: .2rem;
            }
        }
    }
}

.btns {
    width: 6rem;
    height: 1rem;
    border-radius: 19px;
    // background-color: rgba(255, 255, 255, 100);
    background-color: #1C1C24;
    // color: rgba(16, 16, 16, 100);
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #7C7C7C;
    font-size: .3rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 2rem;
    line-height: 1rem;
    font-family: Microsoft Yahei;
    // border: 1px solid rgba(187, 187, 187, 100);
}

.sellsuccessType {
    width: 85%;
    height: 5.5rem;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: .3rem 0;
    border-radius: .3rem;

    >p {
        color: rgba(16, 16, 16, 100);
        font-size: .4rem;
        text-align: text;
        font-family: PingFangSC-regular;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #0F0F0F;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: relative;
        top: .5rem;

        >div {
            width: 5rem;
            height: 1rem;
            line-height: 1rem;
            border-radius: 35px;
            background-color: #5A64E9;
            color: rgba(16, 16, 16, 100);
            font-size: .3rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            text-align: center;
            font-family: Microsoft Yahei;
            color: white;
            // border: 1px solid rgba(187, 187, 187, 100);
        }
    }
}
</style>
