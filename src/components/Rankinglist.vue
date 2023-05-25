<template>
  <div class="Rankinglist">
    <div class="top">
      <div style="width: 0.7rem">{{ $t("Home.Serial") }}</div>

      <div style="margin-left: 0.5rem; width: 2rem">
        {{ $t("Home.seriestitle") }}
      </div>
      <div style="margin-left: 1rem; width: 2rem">
        {{ $t("Home.floorPrice") }}
      </div>
      <div style="
          margin-left: 0.7rem;
          width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        ">
        24H{{ $t("Home.totalTransaction") }}
      </div>
    </div>

    <div v-for="(item,index) in nftlist.TopList" @click="go(item.address);" :key="item.address" style="
        padding: 0 0.33rem 0 0.3rem;
        justify-content: start;
        height: 1.22rem;
      ">
      <p style="margin-right: 0.2rem">{{ item.no || index+1}}</p>
      <div style="margin-right: 0.4rem" class="img_list" :class="item.isAuth != '2' ? 'img_list_no' : ''">
        <img class="portrait" :src="item.topImage" v-if="item.topImage" />
        <img class="portrait" src="@/assets/img/Defaultavatar.png" v-else />
        <img class="authentication" src="@/assets/img/authentication.png" v-if="item.isAuth == 2" />
        <!-- QWERTYUIOPLKJHGF -->
        <div style="width:1.7rem; white-space: nowrap;overflow: hidden;  text-overflow: ellipsis; text-align: left;">{{
        item.contractName
        || "--" }}</div>
      </div>
      <div class="san" style="width: 2.1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis">
        <img src="@/assets/img/WBNB.png" />{{ item.floor?numFilters(item.floor.toString()):'--' }}
      </div>
      <div style="width: 2.1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        ">
        <img src="@/assets/img/WBNB.png" />
        {{ item.changePrice?numFilters(item.changePrice.toString()):'--' }}
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { PropType } from "vue";
import { useRouter } from "vue-router";
import numFilters from '@/hooks/userNumFilters'

const router = useRouter();

const nftlist = defineProps({
  TopList: {
    type: Array as unknown as PropType<any[]>,
    default: () => [],
  },
});

const go = (address: string) => {
  router.push("/business?searchKey=" + address)
}
console.log("组件", nftlist.TopList);
</script>

<style scoped lang="scss">
.Rankinglist {
  width: $max-width;
  margin: 0 auto;
  font-size: 0.3rem;
  font-family: Source Han Sans CN;
  font-weight: bold;

  >div {
    justify-content: space-around;
    display: flex;
    height: 1.6rem;
    background: #121212;
    border: 2px solid #2b2b2b;
    border-radius: 10px;
    margin-bottom: 0.2rem;
    // border-bottom: 1px solid #E0E0E0;
    align-items: center;
    padding: 0 0.3rem;

    .san {
      margin-right: 0.6rem;
    }

    >p {
      width: 0.5rem;
      padding: 0 0.5rem 0 0;
    }

    >div {
      display: flex;
      align-items: center;
      color: #ffffff;
      // width: 25%;
    }

    img {
      width: 0.4rem;
      margin-right: 0.1rem;
      height: 0.4rem;
    }

    .portrait {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-right: 0.3rem;
    }

    .img_list {
      position: relative;
      width: 3rem;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .img_list_no {
      justify-content: flex-start;
    }

    .authentication {
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 0.4rem;
      right: 1.7rem;
    }

    >p {
      font-size: 0.31rem;
      // color: #101010;
      color: #ffffff;
    }
  }

  .top {
    border-bottom: none;
    height: 1rem;
    background-color: transparent;
    border: none;
    padding: 0;
    justify-content: start;

    >div {
      color: #7c7c7c;
    }
  }
}
</style>
