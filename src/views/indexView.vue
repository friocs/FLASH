<template>
    <div class="div1">{{ a }}
        <p @click="goHome">{{ useMap.state.userMap.isLogin }}</p>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { initSigner } from '@/utils/thhersUtils'
let a: string = '123';
const router = useRouter();
const useMap = useStore();
const goHome = () => {
    router.push('/');
}
onMounted(() => {
    // const { ctx } = getCurrentInstance(); //获取上下文实例，ctx=vue2的this  但是ctx只在开发环境有效
    const { proxy } = getCurrentInstance() as any;
    let tries = 0;
    setTimeout(function initTimer (): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
        else init()
    })
})
const init = async () => {
    //第一步 ----  获取 当前钱包对象 和 provider
    let { provider, address, signer } = await initSigner();
    console.log(provider, address, signer)
}
</script>
<style lang="scss" scoped>
div {
    background: rgb(148, 0, 0);
    width: 3rem;
    height: 3rem;

    p {
        color: black;
        font-size: 50px;
    }
}

.div1 {
    background-color: black;
}
</style>
