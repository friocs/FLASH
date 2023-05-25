<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-if="$route.meta.keepAlive" :is="Component" :key="$router.name" />
    </keep-alive>
    <component v-if="!$route.meta.keepAlive" :is="Component" :key="!$router.name" />
  </router-view>
</template>



<script lang="ts" setup>
import { ref, watch, reactive, computed, onMounted, provide, getCurrentInstance, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { initSigner } from "@/utils/thhersUtils";
import { useStates, useActions } from "@/hooks/userStore";
import { useI18n } from "vue-i18n";
import cacheStore from "@/hooks/CacheStore";
import { ElLoading, ElMessage } from "element-plus";
import {getPath} from '@/utils/index'
const storeState: any = useStates("userMap", ["userMap"]);
const storeState2: any = useStates("PageType", ["PageType"]);
const Actions: any = useActions(["getuserinfo", "setUserMap", "loginOut"], "userMap");
const userinfo = computed(() => storeState.userMap.userinfo);
const screen_type = computed(() => storeState2.PageType.screen_type);
const { t } = useI18n();
const { proxy } = getCurrentInstance() as any;

const active = ref<number>(0);


const router = useRouter();
const route = useRoute();
const index_icon = {
  active: getPath("@/assets/img/index_choice.png"),
  inactive: getPath("@/assets/img/index.png"),
};
const business_icon = {
  active: getPath("@/assets/img/business_choice.png"),
  inactive: getPath("@/assets/img/business.png"),
};
const browse_icon = {
  active: getPath("@/assets/img/browse_choice.png"),
  inactive: getPath("@/assets/img/browse.png"),
};
const my_icon = {
  active: getPath("@/assets/img/my_choice.png"),
  inactive: getPath("@/assets/img/my.png"),
};
let showNotice = ref<boolean>(false)


const hexAddress = ref(null);
provide("hexAddress", hexAddress);
watch(() => router.currentRoute.value.path, (toPath) => {
  nextTick(() => {
    console.log(toPath, "toPath")
    if (toPath == "/") {
      history.pushState(null, '', document.URL);

      window.addEventListener("popstate", function (e) {
        console.log(e, "回退")
        history.pushState(null, '', document.URL);

      }, false);
    }
  })
}, { immediate: true, deep: true })
onMounted(() => {
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    // 当前设备是移动设备

    window.location.href = proxy.$common.httpUrl
  }
  if (cacheStore.getLocal("token") && (window as any).ethereum) {
    if (cacheStore.getLocal("userinfo")) Actions.setUserMap(JSON.parse((cacheStore.getLocal("userinfo") as string)));
    initSigner().then(async (res) => {
      hexAddress.value = res.address;
      await Actions.getuserinfo({ hexAddress: res.address });
    });
  }
});

const notab = reactive<string[]>([
  "/me/updatemydetail",
  "/browse/nftdetails",
  "/me/updateintroduction",
  "/business/nftlistseriesdetail",
  "/business/nftseriesdetail",
  "/browse/Purchasedetails",
  "/me/updatelanguage",
  "/business/createpond",
  "/browse/searchdetails",
  "/home/Rankinglist",
]);


onMounted(() => {
  if ((window as any).ethereum !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    let { ethereum } = window;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore  切换链 刷新页面
    ethereum && ethereum.on('chainChanged', handleChainChanged);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore  监听切换账户
    ethereum && ethereum.on('accountsChanged', handleAccountsChanged);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore  监听断开钱包
    ethereum && ethereum.on('disconnect', handleDisconnect);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore  监听连接钱包
    ethereum && ethereum.on('connect', handleConnect);
  }
})

function handleAccountsChanged(accounts: any) {
  Actions.loginOut().then((res: any) => {
    location.reload();
  });
}
function handleChainChanged(chainId: number) {
  location.reload();
}

function handleDisconnect(error: any) {
  // location.reload();
  //console.log("钱包已经断开");
}

function handleConnect(accounts: Array<string>) {
  // location.reload();
  //console.log("钱包已经连接");
}

let current_route = ref<string>("");

const go = (url: string) => {
  router.push(url);
};
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    current_route.value = newValue;
    switch (current_route.value) {
      case "/":
        active.value = 0;
        break;
      case "/business":
        active.value = 1;
        break;
      case "/browse":
        active.value = 2;
        break;
      case "/me/info":
        active.value = 3;
        break;
      case "/me/nftlist":
        active.value = 3;
        break;
      default:
        active.value = 0;
    }
  }
);
</script>


<style lang="scss">
* {
  box-sizing: border-box;
}

body,
html,
#app {
  font-family: Poppins-Light !important;
  position: fixed;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;

  background-size: 100% 100%;
  background-size: cover;
  font-size: 14px;
  background: #fff;

  @media screen and (max-width: 750px) {
    // background: url(@/assets/img/app-bg.png) no-repeat;
    background-size: 100% 100%;
    font-size: 16px;
  }

  padding: 0;
  margin: 0;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  // 滚动条
  overflow: -moz-scrollbars-none; //Firefox
  -ms-overflow-style: none; //IE 10+

  &::-webkit-scrollbar {
    display: none;
  }
}


</style>
