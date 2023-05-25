<template>
    <!-- <van-config-provider :theme-vars="themeVars">
        <van-nav-bar :title="$t('Home.Dataranking')" left-arrow safe-area-inset-top @click-left="onClickLeft"
            :border="false" />
    </van-config-provider> -->
    <Rankinglist :data="TopList" v-if="TopListType" />
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { getNftTop } from "@/api/home";
import Rankinglist from '@/components/homTable.vue'
const router = useRouter();
const themeVars = {
    navBarIconColor: '#101010',
    navBarTextColor: 'white'
}
const TopList = ref<any[]>([{ no: '-' }, { no: '-' }, { no: '-' }]);
const TopListType = ref(false);

const onClickLeft = () => {
    router.go(-1);
}

onMounted(() => {
    getNftTop().then(async (res: any) => {
        let top = [...JSON.parse(res)];
        console.log('top', top);
        TopList.value = top;
        console.log('toplist', TopList.value);
        TopListType.value = true;
    }).catch(e => {
        console.log(e);
        TopListType.value = true;
    })
})
</script>

<style scoped lang="scss">

</style>
