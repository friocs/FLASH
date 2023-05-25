<template>
  <!-- 搜索框 -->
  <div class="box">
    <div class="SearchBox">
      <van-cell-group inset>
        <van-field :autofocus="true" v-model="search_value2.queryText" :placeholder="$t('top.Search')"
          left-icon="search" :center="true">
        </van-field>
      </van-cell-group>
      <img src="@/assets/img/Deepclosing.png" @click="updateshow" />
      <!-- <div class="wallet" @click="updateshow">{{ $t('overall.cancel') }}</div> -->
    </div>
  </div>
  <div class="HOME" v-if="!search_value2.queryText.trim()">
    <!-- 历史记录 -->
    <div class="history">
      <div class="txt">{{ $t("top.Historical_search") }}</div>
      <div class="img_Box" @click="clean('')" v-show="historyList.value.length > 0">
        <img src="@/assets/img/trashcan.png" alt="" />
      </div>
    </div>
    <!-- 历史搜索内容 -->
    <div class="hot">
      <div v-for="(item, index) in historyList.value" :key="index" @click="switeRoute(item)" class="his">
        <div class="his2">
          <!-- {{ item }} -->
          {{proxy.$filters.addressFilters((item as any).toString(),5,4)}}
        </div>
        <img src="@/assets/img/closing.png" @click.stop="clean(item)" />
      </div>
    </div>

    <div style="text-align: left;
        font-size: 0.3rem;
        margin: 0.2rem 0;
        color: #7c7c7c;
      ">
      {{ $t("top.Popular_search") }}
    </div>
    <!-- 热搜 -->
    <div class="hot">
      <van-loading type="spinner" v-show="Hotlist.length == 0" />
      <div class="hotspot" @click="switeRoute(item.contractAddr)" v-for="item in Hotlist" :key="item.id">
        <div class="left">
          <div class="img_box">
            <img :src="item.contractLogo" alt="" v-if="item.contractLogo != null" />
            <img src="@/assets/img/Defaultavatar.png" alt="" v-if="item.contractLogo == null" />
            <img class="authentication" v-if="item.isAuth == 2" src="@/assets/img/authentication.png" />
          </div>
          <!-- <div class="hook"></div> -->
          <div class="words" :style="{'right':item.isAuth == 2?'.6rem':''}">
            {{ item.nftContractName || "--"
            }}<span>({{
            item.contractAddr
            ? "**" +
            item.contractAddr.substring(item.contractAddr.length - 4)
            : "**----"
            }})</span>
          </div>
        </div>

        <div class="green">
          <img src="@/assets/img/WBNB.png" />
          {{ item.floorPrice || "--" }}
        </div>

        <div class="red">
          <img src="@/assets/img/WBNB.png" />
          {{ item.highestOffer || "--" }}
        </div>
      </div>
    </div>
  </div>
  <div class="HOME" v-else>
    <van-loading type="spinner" v-show="loadingType" />
    <div class="noresult" v-if="!loadingType && search_list.length === 0">{{$t('overall.No')}}</div>
    <!-- 模糊搜索 -->
    <div class="hot" v-else>
      <div class="hotspot" @click="switeRoute(item.contractAddr)" v-for="item in search_list" :key="item.id">
        <div class="left">
          <div class="img_box">
            <img :src="item.contractLogo" alt="" v-if="item.contractLogo != null" />
            <img src="@/assets/img/Defaultavatar.png" alt="" v-if="item.contractLogo == null" />
            <img class="authentication" v-if="item.isAuth === 2" src="@/assets/img/authentication.png" />
          </div>
          <!-- <div class="hook"></div> -->
          <div class="words" :style="{'right':item.isAuth == 2?'.6rem':''}">
            <div v-html="getHTML(item.nftContractName)"></div>
            ({{
            item.contractAddr
            ? "**" +
            item.contractAddr.substring(item.contractAddr.length - 4)
            : "**----"
            }})
          </div>
        </div>
        <div class="right">
          <div class="green">
            <img src="@/assets/img/WBNB.png" />
            {{ item.floorPrice || "--" }}
          </div>
          <div class="red">
            <img src="@/assets/img/WBNB.png" />
            {{ item.highestOffer || "--" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Fuse from "fuse.js";
import {
  reactive,
  ref,
  computed,
  getCurrentInstance,
  onMounted,
  watch,
} from "vue";
import {
  getSearchInfo,
  getContractListByHot,
  getNftContractListAll,
  clearHistorySearch,
  getNftContractListAllRedis,
  getNftContractListAllSearch,
} from "@/api/search";
import { Toast } from "vant";
import { debounce, thorttle } from "@/hooks/usermethod";
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from "vue-router";
import "@/assets/css/searchpopup.scss"
const router = useRouter();
let { t } = useI18n();
const route = useRoute();
const { proxy } = getCurrentInstance() as any;
let historyList = reactive({ value: [] });
let search_value = ref("");
let search_value2 = reactive({ queryText: "" });
let Allsearches = ref(""); //所有搜索
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["updateshow"]);

const updateshow = () => {
  // let msg = debounce(() => console.log(123), 1000)
  // console.log(msg());
  emit("updateshow", false);
  console.log(search_value.value);
  search_value2.queryText = "";
};

const themeVars = {
  vanFieldInputTextColor: "white",
};

const Hotlist: any = ref([]);
const loadingType = ref<boolean>(false);
const Allsearchlist: any = ref([]);
const search_list = ref<any[]>([]);
const list = computed(() => {
  if (search_value.value.trim()) {
    // return (new Fuse(data, { findAllMatches: true, isCaseSensitive: true, keys: ['series'] })).search(search_value.value.trim().replace(/\s*/g, '')).map(e => e.item)
    // return data.map(e => e)
    let test = new RegExp(search_value.value, "i");
    return (Allsearchlist.value as any).filter((e: any) =>
      test.test(e.contractAddr)
    );
  } else {
    return Hotlist;
  }
});

watch(
  () => search_value2.queryText,
  (newValue, oldValue) => {
    // let msg = debounce(() => getNftContractListAllSearchs(newValue), 1000)
    // msg();
    loadingType.value = true;
    getNftContractListAllSearchs(newValue);
  }
);

let time: any = ref("");

const getNftContractListAllSearchs = (newValue: string) => {
  if (time.value) clearTimeout(time.value);
  time.value = setTimeout(() => {
    console.log('newValue', newValue)
    getNftContractListAllSearch(newValue).then((res: any) => {
      loadingType.value = false;
      search_list.value = res;
      search_list.value.forEach((val: any) => {
        if (val.floorPrice) val.floorPrice = Number(val.floorPrice).toFixed(4);
        if (val.highestOffer)
          val.highestOffer = Number(val.highestOffer).toFixed(4);
      });
    });
  }, 1000);
};

const switeRoute = (contractAddr: string) => {
  if (route.path.includes("/business")) {
    const query = JSON.parse(JSON.stringify(route.query));
    query.searchKey = contractAddr; //state 修改的参数
    router.push({ path: route.path, query });
    setTimeout(() => {
      router.go(0);
    });
  } else {
    router.push("/business?searchKey=" + contractAddr);
  }
  updateshow();
};

onMounted(() => {
  // 历史搜索
  getSearchInfo().then((res: any) => {
    historyList.value = Array.isArray(res.historySearch) && res.historySearch.slice(0, 3);
    // historyList.value = historyList.value.reverse();
  });
  // getNftContractListAllRedis().then((res: any) => {
  //   console.log(res);
  // });
  // 热门搜索
  // getContractListByHot().then((res: any) => {
  //   let history: any = [];
  //   res.forEach((val: any) => {
  //     history.push({ id: val.id, img: val.contractLogo, series: val.nftContractName, address: val.contractAddr, highprice: val.highestOffer, lowprice: val.floorPrice })
  //   })
  //   console.log(history);
  // })
  // 所有
  getNftContractListAll().then((res: any) => {
    let history: any = [];
    // res.forEach((val: any) => {
    //   history.push({
    //     id: val.id || '--',
    //     img: val.contractLogo || '--',
    //     series: val.nftContractName || '--',
    //     isAuth: val.isAuth,
    //     contractAddr: val.contractAddr || '--',
    //     address: "***" + val.contractAddr.substring(val.contractAddr.length - 6) || '--',
    //     highprice: val.highestOffer || '--',
    //     lowprice: val.floorPrice || '--',
    //   });
    // });
    Hotlist.value = res.slice(0, 5);
    Hotlist.value.forEach((val: any) => {
      if (val.floorPrice) val.floorPrice = Number(val.floorPrice).toFixed(4);
      if (val.highestOffer)
        val.highestOffer = Number(val.highestOffer).toFixed(4);
    });
    // Allsearchlist.value = history;
    console.log(Hotlist.value);
  });
});

const getHTML = computed(() => {
  return (text: any) => {
    console.log(text);
    let test = new RegExp(search_value2.queryText, "i");
    // if (search_value.value.trim()) {
    //   // if (text.includes(search_value.value)) {
    //   //   let newdom = text.indexOf(search_value.value)
    //   //   console.log(newdom);
    //   // }
    //   // const words = text.split('');   //data.series
    //   // const keys = search_value.value.trim().replace(/\s*/g, '').split(''); //输入框中的
    //   // let beforekeys: { id: number; value: string; sum: number; }[] = [];
    //   // keys.forEach((item, index) => {
    //   //   beforekeys.push({ id: index, value: item, sum: 0 })
    //   // })
    //   // beforekeys.forEach((key, index, arr) => {
    //   //   for (let i = 0; i < words.length; i++) {
    //   //     let key_type;
    //   //     65 <= words[i].charCodeAt(0) && words[i].charCodeAt(0) <= 90 ? key_type = 'da' : key_type = 'xi';
    //   //     if (words[i].toLowerCase() === key.value.toLowerCase() && key?.sum === 0) {
    //   //       key_type === 'xi' ? key.value = key.value.toLocaleLowerCase() : key.value = key.value.toLocaleUpperCase();
    //   //       words[i] = `<span class='spanlist' style="color: #1684FC; font-weight: bolder;">${key.value}</span>`;
    //   //       key.sum++;
    //   //     }
    //   //   }
    //   //   text = words.join('')
    //   // })
    // }
    return text.replace(
      test,
      (val: any) => `<span style='color:#1684FC'>${val}</span>`
    );
  };
});

// 垃圾桶
const clean = (name: string | number) => {
  clearHistorySearch({ searchKey: name }).then((res: any) => {
    if (res.code === 200) {
      Toast.success(t('overall.delsucc'));
      getSearchInfo().then((res: any) => {
        if (res.historySearch === null) {
          historyList.value = [];
        } else {
          historyList.value = res.historySearch;
        }
      });
    } else {
      Toast.fail(t('overall.delerr'));
    }
  });
};
</script>

<style lang="scss" scoped>
  :deep(.van-loading) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

img {
  width: 100%;
  height: 100%;
}

:deep(.van-cell) {
  width: 8.5rem;
}

.van-field__control {
  color: white !important;
}

  :deep(.van-cell) {
    padding-left: 0.3rem;
    height: 0.8rem;
    // background-color: rgba(247, 247, 247, 100);
    background-color: #252525;
    color: #89898b;
  }

  :deep(.van-cell-group--inset) {
    width: 100%;
    border-radius: 0.15rem;
    background-color: #252525 !important;
    background: #252525 !important;
    margin: 0;
  }

.HOME {
  width: $max-width;
  margin: 0.2rem auto;
}

.box {
  // position: fixed;
  // top: 0;
  width: $max-width;
  margin: 0 auto;
  height: 1.25rem;
  // padding: 8px 15px 9px 19px;

  .imgbox {
    height: 0.48rem;
    width: 0.48rem;
  }

  .SearchBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    text-align: left;
    position: relative;

    .wallet {
      color: rgba(153, 153, 153, 100);
      font-size: 0.3rem;
      text-align: center;
      font-family: SourceHanSansSC-regular;
    }

    img {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      right: 0.2rem;
    }
  }
}

.hot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0.35rem 0 0 0;

  .hotspot {
    // width: 3.09rem;
    // height: 1.04rem;
    position: relative;
    display: flex;
    // border-bottom: 1px solid rgba(153, 153, 153, .2);
    background-color: #121212;
    color: white;
    border-radius: 10px;
    // margin-right: 0.1rem;
    border: 2px solid #2b2b2b;
    margin-bottom: 0.2rem;
    padding: 0.1rem 0.3rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .left {
      width: 3.5rem;
      display: flex;
      justify-content: start;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .img_box {
      // width: 0.8rem;
      // height: 0.72rem;
      // position: absolute;
      // top: 50%;
      // transform: translateY(-50%);
      // left: 0.24rem;
      // border-radius: 50%;
      display: flex;
      align-items: flex-end;
      position: relative;

      >img:nth-of-type(1) {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }

      >img:nth-of-type(2) {
        width: 0.4rem;
        height: 0.4rem;
        position: relative;
        right: 0.45rem;
      }
    }

    .hook {
      position: absolute;
      width: 0.48rem;
      height: 0.48rem;
      // background-color: pink;
      opacity: 0.7;
      top: 45%;
      left: 0.8rem;
      border-radius: 50%;
    }

    .words {
      height: 1.04rem;
      // padding-left: 1.3rem;
      line-height: 1.04rem;
      text-align: left;
      font-size: 0.3rem;
      display: flex;
      position: relative;

      >div {
        margin-right: 0.1rem;
      }
    }

    >div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.32rem;
      text-align: left;
      font-family: PingFangSC-regular;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      >img {
        margin-right: 0.1rem;
      }
    }

    .green {
      // color: #189F7A;
      // background-color: pink;
      width: 2rem;
      justify-content: flex-start;
      display: flex;
      align-items: center;
    }

    .red {
      // background-color: pink;
      width: 2rem;
      // color: #FF4848;
      display: flex;
      align-items: center;
      justify-content: start;
    }

    img {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.2rem;
    }
  }
}

.history {
  display: flex;
  justify-content: space-between;
  text-align: left;
  font-size: 0.3rem;

  .txt {
    color: #7c7c7c;
  }

  .img_Box {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 6px;
    color: #89898b;
  }
}

.his:nth-child(3) {
  margin: 0 0rem 0.2rem 0;
}

.his {
  max-width: 43%;
  // width: 2.5rem;
  height: 0.8rem;
  // border: 1px solid #bbb;
  line-height: 0.8rem;
  padding: 0 0.45rem;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  background: #252525;
  color: white;
  margin: 0 0.15rem 0.2rem 0;
  position: relative;

  .his2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    right: -0.2rem;
    top: -0.15rem;
  }
}

.noresult {
  font-size: 0.3rem;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: PingFangSC-regular;
}
</style>