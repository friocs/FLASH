<template>
    <search />
    <div style="margin:100px 145px">
        <img src="@/assets/img/left.png" alt="" @click="router.push('/me/info')" class="back">
        <div class="nft-box">
            <div class="nft" v-for="(item, index) in nftlist" :key="index" @click="gonftdetails(item.id, '0')">
                <div class="nft-img">
                    <img :src="item.img" v-if="item.img != ''">
                    <img src="@/assets/img/550550.png" alt="" v-else>
                </div>
                <div class="nft-name">{{ item.contractName }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import search from '@/components/search.vue'
import { reactive, ref, onMounted, computed, inject, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { nftType } from '@/utils/type'
import { useI18n } from 'vue-i18n';
import { getMyNft } from '@/api/my'
import { useStates, useActions } from '@/hooks/userStore';
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
let nftlist1 = ref([1, 1, 1, 1, 1, 1, 1,]);

const hexAddress: any = inject('hexAddress');
let initTimer1 = ref()
onMounted(() => {
    initTimer1.value = setTimeout(function initTimer(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (!userinfo.value.isLogin) return setTimeout(initTimer, 50);
        else getDate()
    })
})
onUnmounted(() => {
    clearTimeout(initTimer1.value)
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
.back {
    width: 15px;
    height: 15px;
    margin-bottom: 30px;
    cursor: pointer;
}

.nft-box {
    display: flex;
    flex-wrap: wrap;
}

.nft {
    width: 215px;
    height: 260px;
    background: #FFFFFF;
    border: 1px solid #EBEEF2;
    box-shadow: 0px 2px 5px 1px rgba(133, 139, 155, 0.25);
    border-radius: 0px 0px 8px 8px;
    margin: 0 17.5px 20px 0;

    &-img {
        width: 215px;
        height: 215px;
        border-radius: 8px 8px 0px 0px;
        background: #3772FF;
        box-shadow: 0px 2px 5px 1px rgba(133, 139, 155, 0.25);
        border-radius: 8px 8px 0px 0px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 8px 8px 0px 0px;
        }
    }


    &-name {
        height: 16px;
        margin: 11px 0 15px 11px;
        text-align: left;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #777E90;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &-num {
        margin: 0 0 13px 11px;
        text-align: left;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #23262F;
    }
}
</style>
