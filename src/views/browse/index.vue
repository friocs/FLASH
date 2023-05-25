<template>
  <search />
  <nftlist style="margin-top: 94px;"/>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  computed,
  getCurrentInstance,
  onMounted,
  inject,
  onUnmounted,
  watch
} from "vue";
import search from "@/components/search.vue";
import nftlist from "@/components/nftlist.vue";
import { getNftListByMarket } from "@/api/browse";
import {getPath} from '@/utils'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
// menu
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
let seachData = reactive({
  param: {
    sort: 1, //排序：0,时间 1，低价优先；2，高价优先"
    sortUn: 1, //排序：0,时间 1，低价优先；2，高价优先"
    priceStart: "", //起始价格
    priceStartUn: "", //起始价格
    priceEnd: "", //结束价格
    priceEndUn: "", //结束价格
    transactionType: "", //"交易类型：0，买；1，卖"
    status: "", //"状态：0，未成交；1，已成交"
    currency: "BNB",
    currency_img: getPath("@/assets/img/WBNB.png"),
    contractAddr: '',
  },

  current: 1,
  size: 10

});
let marketList = ref<any>([]);
onMounted(() => {
  getMarketlist()
})

const getMarketlist = () => {
  // loading.value=true
  seachData.param.contractAddr = ''

  getNftListByMarket(seachData)
    .then((res: any) => {

      marketList.value = res.rows;
      console.log(marketList.value);
    })
    .catch((e) => {
      console.error(e);
    });
};

</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
