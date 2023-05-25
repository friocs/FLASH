<template>
    <div class="nft_list">
        <div v-for="item in nft_list" :key="item.id" @click="gonftlist(item.id,item.name)">
            <van-image width="100%" height="80%" :src="item.img" v-if="item.img!=''" />
            <van-image width="100%" height="80%" :src="getPath('@/assets/img/250250.png')" v-else />
            <div>
                <div class="img" v-if='item.logo'>
                    <van-image round width=".5rem" fit="cover" height=".5rem"
                        :src="getPath('@/assets/img/v2_rgi6sm.jpg')" />
                    Otograf
                </div>
                <p>{{ item.name || 'N/A'}}</p>
                <p>NFT: <span>{{item.quantity || 0}}</span></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// //接收父组件传过来的值,需要注意defineProps只能在setup语法糖里面使用，不需要import引入
import { ref, onMounted, PropType, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getNftContractListForUser } from '@/api/my'
import {getPath} from '@/utils'

import { nftType } from '@/utils/type';

let nft_list: any = ref([])


onMounted(() => {
    getData();
})

const getData = (async () => {
    const res: any = await getNftContractListForUser();
    let nft_list2: nftType[] = [];
    res.forEach((val: any) => {
        nft_list2.push({ id: val.contractAddr, name: val.contractName, img: val.topImage, quantity: val.nftCount })
    })
    nft_list.value = nft_list2;
})
const router = useRouter();
const gonftlist = (id: number, name: string): void => {
    if (router.currentRoute.value.path === '/') {
        router.push('/business/nftlistseriesdetail?id=' + id);
    } else {
        router.push('/me/nftlist?contractAddr=' + id + '&name=' + name);
    }
}
</script>
<style lang="scss" scoped>
.nft_list {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
    margin-bottom: 2rem;

    >div {
        overflow: hidden;
        border-radius: 10px;
        border: 2px solid #2B2B2B;
        width: 95%;
        height: 5.6rem;
        background-color: #121212;
        margin-bottom: .3rem;

        >div {
            justify-content: space-between;
            display: flex;
        }

        >div:nth-of-type(2) {
            flex-direction: column;
            margin-top: .1rem;

            margin-bottom: .3rem;
        }

        .img {
            display: flex;
            align-items: center;
            // color: rgba(16, 16, 16, 100);
            color: #5A64E9;
            font-size: .32rem;
            text-align: left;
            font-family: PingFangSC-regular;
        }

        p {
            font-size: .35rem;
            margin: 0;
            // color: black;
            color: #5A64E9;
            font-family: Source Han Sans CN;
            font-weight: 400;
            text-align: left;
            margin-left: .3rem;
            font-family: PingFangSC-regular;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        p:nth-of-type(2) {
            color: #7C7C7C;
            // margin-bottom: .3rem;

            span {
                color: white;
            }
        }
    }
}
</style>
