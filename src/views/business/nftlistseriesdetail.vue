<template>
    <search :back_type="true" />
    <div class="HOME">
        <div class="top">
            <div class="img">
                <van-image round width=".5rem" fit="cover" height=".5rem"
                    :src="getPath('@/assets/img/v2_rgi6sm.jpg')" />
                Otograf
            </div>
            <div>0x0000.00000</div>
            <div>{{ $t('NFTdetails.Royalties') }}:4%</div>
            <div @click="godetails">{{ $t('business.details') }}></div>
        </div>
        <div class="pricelist">
            <div v-for="item in 4" :key="item">
                <div>
                    <van-image width="20%" height="65%" :src="getPath('@/assets/img/WBNB.png')" />
                    9.95
                </div>
                <div>
                    {{ $t('Home.Floorprice') }}
                </div>
            </div>
        </div>
        <!-- <div class="select">
            <p>{{ $t('business.Transaction_currency') }}:</p>
            <el-select v-model="currency" class="m-1" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div> -->
        <div class="details_ewo">
            <div class="left">
                <div class="er_top">
                    <div>{{ $t('business.number') }}</div>
                    <div>{{ $t('business.price') }}(ETC)</div>
                </div>
                <div class="Cumulative_buy">
                    <div>
                        {{ $t('business.Cumulative_depth') }}:
                    </div>
                    <div>
                        200{{ $t('business.single') }}
                    </div>
                    <div>
                        300&nbsp;
                    </div>
                </div>
                <div class="price_list buy">
                    <div class="buydetails" v-for="item in Cumulative_buy" :key="item.code">
                        <div>{{ item.code }}</div>
                        <div>
                            {{ item.price }}
                        </div>
                    </div>
                </div>

                <div class="price_list sell">
                    <div class="selldetails" v-for="item in Cumulative_cell" :key="item.code">
                        <div>{{ item.code || '--' }}</div>
                        <div>
                            {{ item.price }}
                        </div>
                    </div>
                </div>
                <div class="Cumulative_sell">
                    <div>
                        {{ $t('business.Cumulative_depth') }}::
                    </div>
                    <div>
                        200{{ $t('business.single') }}
                    </div>
                    <div>
                        300&nbsp;

                    </div>
                </div>
            </div>
            <div class="right">
                <div>
                    {{ t('NFTdetails.quantity') }}
                    <van-stepper v-model="Purchase" integer min="1" />
                </div>
                <div @click="business('buy')">
                    {{ t('NFTdetails.Lowestmarketprice') }}
                    (1.25ETC)
                </div>
                <div class="select back_red">
                    <el-select popper-class="elptions" v-model="currency" class="m-1" multiple collapse-tags
                        collapse-tags-tooltip :placeholder="t('NFTdetails.SelectNFT')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="back_red" @click="business('sell')">
                    {{ t('NFTdetails.Bestpriceinthemarket') }}
                    (1.24ETC)
                </div>
                <div class="select back_white">
                    <el-select v-model="pond_type" class="m-1" :placeholder="t('NFTdetails.Pooltype')">
                        <el-option v-for="item in pondlist" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div @click="create" class="back_white">
                    {{ t('NFTdetails.establish') }}
                </div>
            </div>
        </div>

        <div class="san_select">
            <div class="san_select_top">
                <div v-for="item in selectoptions_san" :key="item.id" @click="select_san_name(item.id)"
                    :style="{ 'border-left': item.name === t('business.Mydeal') ? '1px solid #BBBBBB' : '', 'border-right': item.name === t('business.Mydeal') ? '1px solid #BBBBBB' : '', 'color': selectoptions_san_type === item.id ? 'red' : '' }">
                    {{ item.name }}
                </div>
            </div>
            <nftrecord :data="nft_list3" :active="active2" :select="selectoptions_san_type" :width="'100%'" />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, reactive, computed } from 'vue';
import { nftrecordType } from '@/utils/type';
import { useRouter } from 'vue-router';
import nftrecord from '@/components/nftrecord.vue';
import search from "@/components/searcha.vue";
import { useI18n } from 'vue-i18n';
import { useStates } from '@/hooks/userStore';
import {getPath} from '@/utils'
const storeState: any = useStates('userMap', ['userMap']);
const userinfo = computed(() => storeState.userMap.userinfo);

let { t } = useI18n();

const router = useRouter();
// 当前委托
// const nft_list3 = reactive<nftrecordType[]>([
//     { id: 1, series: 'cs', time: '2022-01-01 11:10', price: 123, Pooltype: '0', type: true, Token: '10BNB', quantity: 5, curvetype: true, curvetquantity: '5%' },
//     { id: 12, series: 'cs2', time: '2022-01-20 11:10', price: 123, Pooltype: '1', type: true, NFT_quantity: 5, curvetype: true, curvetquantity: '5%' },
//     { id: 13, series: 'cs3', time: '2022-03-01 11:10', price: 123, Pooltype: '2', type: false, Token: '10BNB', quantity: 3, NFT_quantity: 3, curvetype: false, curvetquantity: '5%', Service: '5%' }
// ]);
// 我的成交
const nft_list3 = reactive<nftrecordType[]>([
    { id: 1, time: '2022-01-01 11:10', Pooltype: '1', price: 123, code: '#0', has: '121212', Delegation: '市价' },
    { id: 12, time: '2022-01-20 11:10', Pooltype: '1', price: 123, code: '#1', has: '232323', Delegation: '买池' },
    { id: 13, time: '2022-03-01 11:10', Pooltype: '0', price: 123, code: '#2', has: '2323232', Delegation: '卖池' }
]);
// 全网成交
// const nft_list3 = reactive<nftrecordType[]>([
//     { id: 1, time: '2022-01-01 11:10', price: 123, code: '#0', has: '121212', },
//     { id: 12, time: '2022-01-20 11:10', price: 123, code: '#1', has: '232323' },
//     { id: 13, time: '2022-03-01 11:10', price: 123, code: '#2', has: '2323232' }
// ]);
let currency = ref<string>('BNB');
let active = ref('1');
let active2 = ref(1);
let pond_type = ref<string>('');
const Cumulative_buy = reactive([{ code: '#12', price: 123, type: 'BNB' }, { code: '#12', price: 123, type: 'BNB' }, { code: '#12', price: 123, type: 'BNB' }, { code: '#12', price: 123, type: 'BNB' }, { code: '#12', price: 123, type: 'BNB' }])
const Cumulative_cell = reactive([{ code: '', price: 123, type: 'BNB' }, { code: '', price: 123, type: 'BNB' }, { code: '', price: 123, type: 'BNB' }, { code: '', price: 123, type: 'BNB' }, { code: '', price: 123, type: 'BNB' }])
const pondlist = [
    {
        value: '1',
        label: t('NFTdetails.Buyapool'),
    },
    {
        value: '2',
        label: t('NFTdetails.Sellingpool'),
    }
    ,
    {
        value: '3',
        label: t('NFTdetails.Tradingpool'),
    }
]
const options = [
    {
        value: 'BNB',
        label: 'BNB',
    },
    {
        value: 'USDT',
        label: 'USDT',
    }, {
        value: 'BNB',
        label: 'BNB',
    },
    {
        value: 'USDT',
        label: 'USDT',
    }, {
        value: 'BNB',
        label: 'BNB',
    },
    {
        value: 'USDT',
        label: 'USDT',
    }
]
const selectoptions = [
    {
        id: '1',
        name: t('business.purchase')
    },
    {
        id: '2',
        name: t('business.sellout')
    }
]
let selectoptions_san_type = ref<number>(1)
const selectoptions_san = [
    {
        id: 1,
        // name: t('business.Currententrustment')
        name: '我的池子'
    },
    {
        id: 2,
        name: t('business.Mydeal')
    },
    {
        id: 3,
        name: t('business.Whole_network_transaction')
    }
]

const business = (type: string) => {
    if (!userinfo.value.isLogin) return console.log(t('overall.logTips'));
    if (type === 'sell') {
        console.log('卖');
    } else {
        console.log('买');
    }
}

const create = () => {
    if (!userinfo.value.isLogin) return console.log(t('overall.logTips'));
    router.push('/business/createpond?type=' + pond_type.value)
}

let Purchase = ref<number>(1);
let disabled_type = ref<boolean>(false);
let btn_name = ref<string>(t('business.buy'));
const Single_type = ref<string>(t('business.Market_single'));
let number = ref<number | string>('');
const selectoptions_dom = (id: string): void => {
    active.value = id;
    active.value === '1' ? btn_name.value = t('business.buy') : btn_name.value = t('business.determine');
}
let currency_nft_type = ref<string>('');
const options_nft_type = [
    {
        value: 'USDT',
        label: 'USDT',
        img: getPath('@/assets/img/USDT-icons.png')
    },
    {
        value: 'WBNB',
        label: 'WBNB',
        img: getPath('@/assets/img/WBNB.png')
    },
    {
        value: 'ETH',
        label: 'ETH',
        img: getPath('@/assets/img/WETH-icons.png')
    },
    {
        value: 'BNB',
        label: 'BNB',
        img: getPath('@/assets/img/WBNB.png')

    },
]
const updateAccount = (val: string): void => {
    let obj = options_nft_type.find(item => item.value === val);
    currency_img.img = obj?.img;
}
let currency_img = reactive({ img: '' });
const select_san_name = (id: number): void => {
    selectoptions_san_type.value = id
    console.log(id);
}
const Single_type_list = [
    {
        id: '1',
        name: t('business.Market_single')
    },
    {
        id: '2',
        name: t('business.limit_single')
    }

]
const godetails = (): void => {
    router.push('/business/nftseriesdetail')
}

</script>

<style scoped lang="scss">
.el-select-dropdown__item :deep() {
    display: flex;
    align-items: center;
    padding: 0 10px;
}


    :deep(.van-stepper__input) {
        background: transparent;
        color: white;
    }

    :deep(.van-tabs__nav--card) {
        margin: 0;
    }

    :deep(.el-select) {
        width: 100%;
        height: 100%;

        .select-trigger,
        .el-input {
            height: 100%;
        }
    }

    :deep(.details_ewo) {
        .van-cell {
            height: 1.5rem;
            line-height: 1rem;
            background-color: rgba(255, 255, 255, 100);
            color: rgba(16, 16, 16, 100);
            font-size: .3rem;
            text-align: center;
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
            font-family: Arial;
            border: 1px solid rgba(187, 187, 187, 70);
        }
    }


    :deep(.nft_type_list) {
        .el-select.el-select--large.m-2.m-4 {
            .el-input__wrapper {
                padding-left: 1rem;
            }
        }
    }

    :deep(.van-stepper__minus),
    :deep(.van-stepper__plus) {
        width: .8rem;
        height: .8rem;
    }



    :deep(.back_red) {
        .el-input__wrapper {
            // background: #FF4848;

            ::-webkit-input-placeholder,
            :-moz-placeholder,
            ::-moz-placeholder,
            :-ms-input-placeholder {
                color: white;

            }
        }

        .el-select__icon {
            // color: white;
        }

        .el-input {
            // --el-input-placeholder-color: white;
        }
    }


    :deep(.el-input__inner) {
        text-align: center;
    }


.HOME {
    width: 95%;
    margin: 0 auto;
    // margin-top: 1.5rem;

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        // border-bottom: 1px solid #bbb;
        .img {
            display: flex;
            align-items: center;
            color: rgba(16, 16, 16, 100);
            font-size: .32rem;
            text-align: left;
            font-family: PingFangSC-regular;
        }

        >div {
            color: rgba(16, 16, 16, 100);
            font-size: .32rem;
            text-align: left;
            font-family: PingFangSC-regular;
        }
    }

    >.pricelist {
        margin-top: .2rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #bbb;
        padding-bottom: .2rem;
        width: 100%;

        >div {
            text-align: center;
            font-size: .32rem;
            font-family: PingFangSC-regular;

            >div {
                max-width: 2rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    >.select {
        margin-top: .2rem;
        color: rgba(16, 16, 16, 100);
        font-size: .32rem;
        text-align: left;
        font-family: PingFangSC-regular;
        padding-bottom: 5px;
        // border-bottom: 1px solid rgba(187, 187, 187, 40);
        display: flex;
        align-items: center;
        width: 60%;

        >p {
            margin: 0;
            width: 2.5rem;
        }
    }

    .details_ewo {
        width: 100%;
        margin-top: .2rem;
        display: flex;
        height: 7rem;

        >div {
            height: 100%;
        }

        .left {
            width: 45%;

            .er_top {
                display: flex;

                >div {
                    color: rgba(16, 16, 16, 100);
                    font-size: .28rem;
                    width: 50%;
                    text-align: left;
                    font-family: PingFangSC-regular;
                }

                >div:nth-of-type(2) {
                    text-align: right;
                }
            }

            .price_list {
                width: 100%;

                >div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    >div {
                        height: 0.53rem;

                        >div {
                            display: flex;
                            align-items: center;
                            color: rgba(255, 72, 72, 100);
                            font-size: .28rem;
                            text-align: left;
                            font-family: PingFangSC-regular;
                        }
                    }
                }

                .buydetails {
                    color: red;
                }

                .selldetails {
                    color: green;
                }
            }

            .Cumulative_buy {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 5px 0;
                flex-direction: row;

                >div {
                    color: red;
                    display: flex;
                    align-items: center;
                }
            }

            .Cumulative_sell {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 5px 0;

                >div {
                    color: green;
                    display: flex;
                    align-items: center;
                }
            }
        }

        .right {
            width: 70%;
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            >div {
                border-radius: 5px;
                background-color: rgba(24, 159, 122, 100);
                color: white;
                font-size: .3rem;
                text-align: center;
                font-family: Arial;
                height: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-around;
            }

            .back_red {
                background-color: #FF4848;
            }

            .back_white {
                // background-color: white;
                color: black;
            }

            // .select {
            //     width: 100%;
            //     height: 100%;
            // }
        }
    }

    .san_select {
        margin-top: .5rem;

        .san_select_top {
            display: flex;
            // height: 38px;
            height: 1rem;
            line-height: 1rem;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 100);
            border: 1px solid rgba(153, 153, 153, 100);
            margin-bottom: .2rem;

            >div {
                width: 33%;
                font-size: .32rem;
            }

            >div:nth-of-type(1) {
                border-right: 1px solid rgb(187, 187, 187);
            }
        }
    }
}
</style>
