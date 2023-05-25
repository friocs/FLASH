<template>
    <search />
    <div class="TOP">
        <p>TOP10</p>
        <div class="select">
            <van-image width="10%" fit="cover" :src="currency_img.img" />
            <el-select v-model="currency" class="m-2" placeholder="Select" size="large" @change="updateAccount">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    <van-image width="10%" fit="cover" :src="item.img" />&nbsp;{{
                            item.value
                    }}
                </el-option>
            </el-select>
        </div>
    </div>
    <div class='TOP-list'>
        <div class="history_top">
            <div>{{ $t('business.Serial') }}</div>
            <div>{{ $t('business.SeriesName') }}</div>
            <div>{{ $t('business.transaction') }}(24H)</div>
        </div>
        <div class="history_list">
            <div class="history_Home" v-for="(item, index) in Transaction" :key="item.name"
                @click="gonftseriesdetail(item.name)"
                :style="{ 'border-bottom': index != Transaction.length - 1 ? '1px solid rgba(187, 187, 187, 40)' : '' }">
                <div><a href="#">{{ index + 1 }}</a></div>
                <div>
                    <van-image round width=".6rem" fit="cover" height=".6rem" :src="item.img" />{{ item.name }}
                </div>
                <div>{{ item.price.toLocaleString() }}</div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue';
import search from "@/components/searcha.vue";
import { businessType } from '@/utils/type'
import { useRouter } from 'vue-router';
import { getTokenList } from '@/api/NFT'
import {getPath} from '@/utils'
const router = useRouter();
const gonftseriesdetail = (name: string): void => {
    console.log(name)
    router.push('/business/nftlistseriesdetail');
}
let currency_img = reactive({ img: getPath("@/assets/img/USDT-icons.png") });
let currency = ref<string>("USDT");

onMounted(() => {
    getTokenList({}).then(res => {
        console.log(res);
    })
})

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
const updateAccount = (val: string): void => {
    let obj = options.find((item) => item.value === val);
    currency_img.img = obj?.img;
};
const Transaction = reactive<businessType[]>([{ name: 'Otograf', price: 1231, img: getPath('@/assets/img/v2_rgi6sm.jpg') }, { name: 'Otograf2', price: 1231, img: getPath('@/assets/img/v2_rgi6sm.jpg') }])
</script>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
    padding-left: 1rem;
}

.el-select-dropdown__item :deep() {
    display: flex;
    align-items: center;
    padding: 0 10px;
}

.TOP {
    color: rgba(16, 16, 16, 100);
    font-size: .32rem;
    text-align: left;
    font-family: PingFangSC-regular;
    border-bottom: 2px solid rgba(187, 187, 187, 60);
    padding: 0 .3rem;
    padding-bottom: .2rem;
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select {
        position: relative;
        display: flex;
        align-items: center;

        .van-image {
            z-index: 10;
            left: 5px;
            position: absolute;
        }

    }
}

.history_list {
    width: 95%;
    margin: 0 auto;
    border: 1px solid rgba(187, 187, 187, 40);
}

.history_top,
.history_Home {
    display: grid;
    height: 1.5rem;
    grid-template-columns: 33% 33% 33%;
    align-items: center;
    padding: 0 .3rem;

    >div {
        color: rgba(16, 16, 16, 100);
        font-size: .32rem;
        text-align: left;
        font-family: PingFangSC-semiBold;
    }
}

.history_Home {
    >div {
        color: rgba(16, 16, 16, 100);
        font-size: .32rem;
        text-align: left;
        font-family: PingFangSC-regular;

        >a {
            color: rgba(21, 79, 240, 100);
        }
    }
}
</style>
