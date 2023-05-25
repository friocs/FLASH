<template>
    <van-nav-bar :title="t('my.mynft')" left-arrow safe-area-inset-top @click-left="onClickLeft" :border="false" />
    <van-list v-model:loading="loading" :finished="finished" :finished-text="t('my.Nomore')" @load="onLoad"
        offset="20px">
        <div class="nft_list">
            <div v-for="item in nftlist" :key="item.id" @click="gonftdetails(item.id,'0')">
                <van-image width="100%" height="80%" :src="item.img" v-if="item.img!=''" />
                <van-image width="100%" height="80%" :src="getPath('@/assets/img/250250.png')" v-else />
                <p>{{ item.name }}</p>
            </div>
        </div>
    </van-list>

</template>

<script lang='ts' setup>
import { reactive, ref, onMounted, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { nftType } from '@/utils/type'
import { useI18n } from 'vue-i18n';
import { getMyNft } from '@/api/my'
import { useStates, useActions } from '@/hooks/userStore';
import {getPath} from '@/utils'
const storeState: any = useStates('userMap', ['userMap']);
const userinfo = computed(() => storeState.userMap.userinfo);
let { t } = useI18n();
const router = useRouter();
const route = useRoute();
const contractAddr = computed(() => route.query.contractAddr);
const name = computed(() => route.query.name);
const onClickLeft = (): void => {
    router.push('/me/info');
}

let nftlist = ref<nftType[]>([]);
const hexAddress: any = inject('hexAddress');
onMounted(() => {
    setTimeout(function initTimer (): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (!userinfo.value.isLogin) return setTimeout(initTimer, 50);
        else getDate()
    })
})
const getDate = () => {
    getMyNft({ walletAddr: userinfo.value.hexAddress || hexAddress.value, contractAddr: contractAddr.value }).then(async (res: any) => {
        let nftlists: nftType[] = [];
        res.forEach((val: { id: number, nftTokenId: number; metaDataImage: string; }) => {
            nftlists.push({ id: val.id, name: `${name.value} #${val.nftTokenId}`, img: val.metaDataImage })
        })
        nftlist.value = nftlists
    })
}

const loading = ref<boolean>(false); //滚动到底部时
const finished = ref<boolean>(false); //数据是否全部加载完成
const onLoad = () => {
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    // finished.value = true;
};

const gonftdetails = (id: number, type: string): void => {
    // console.log(id);
    router.push("/browse/nftdetails?nftId=" + id + '&type=' + type);

}
</script>

<style scoped lang="scss">
.nft_list {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
    margin-top: .4rem;
    margin-bottom: 2rem;

    >div {
        overflow: hidden;
        border-radius: 10px;
        border: 2px solid #2B2B2B;
        width: 95%;
        height: 5.6rem;
        background-color: #121212;
        margin-bottom: 5px;

        p {
            position: relative;
            top: 0.2rem;
            font-size: .45rem;
            margin: 0;
            // color: black;
            color: #5A64E9;
            font-family: Source Han Sans CN;
            font-weight: 400;
            text-align: left;
            padding-left: 10px;
            line-height: .65rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // font-family: PingFangSC-regular;
        }
    }
}
</style>
