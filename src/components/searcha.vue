<template>
  <div class="da">
    <div class="Search_box">
      <van-image class="fuan" round width=".5rem" fit="cover" height=".5rem" :src="getPath('@/assets/img/forward.png')"
        @click="back()" v-if="back_type" />
      <div class="logo">
        <van-image width=".83rem" height=".92rem" :src="getPath('@/assets/img/logo.png')"
          v-if="$route.name != noname" />
        <van-image width="2.02rem" height=".45rem" :src="getPath('@/assets/img/logotitle.png')"
          v-if="$route.name != noname" />
      </div>
      <div class="right" v-if="$route.name != noname">
        <van-search :disabled="true" v-model="value" @click="gosearchdetails" :placeholder="$t('top.search')" />
        <div>
          <van-image round width=".6rem" fit="cover" height=".6rem" :src="getPath('@/assets/img/chain.png')" />
          <van-image round width=".6rem" @click="Language_switching" fit="cover" height=".6rem"
            :src="getPath('@/assets/img/earth.png')" />
        
          <van-image v-if="!userinfo.isLogin" width=".6rem" height=".6rem" @click.stop="connect_address"
            :src="getPath('@/assets/img/wallet.png')" />
          <van-image round
            v-else-if="userinfo.headPic === '' ||  userinfo.headPic==='https://metapro.superswap.cool//image'"
            width=".6rem" height=".6rem" @click.stop="gomyindex" :src="getPath('@/assets/img/Defaultavatar.png')" />
          <van-image round v-else width=".6rem" height=".6rem" @click.stop="gomyindex" :src="userinfo.headPic" />
        </div>
        
      </div>
    </div>
  </div>
  <van-config-provider :theme-vars="themeVars">

    <van-popup v-model:show="show" position="top" :style="{ height: '61%' }" duration=0>
      <searchdetails @updateshow="updateshow" />
    </van-popup>
  </van-config-provider>

</template>

<script setup lang="ts">
import { ref, PropType, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { initSigner } from "@/utils/thhersUtils";
import { useStates, useActions } from "@/hooks/userStore";
import { Toast } from "vant";
import searchdetails from "@/views/browse/searchdetails.vue";
import {getPath} from '@/utils'
let { t } = useI18n();

const noname = "business-nftlistseriesdetail";
let path = ref<string>("");
const show = ref(false);
const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const Actions: any = useActions(["login", "setuserMap"], "userMap");
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);

const Language_switching = () => {
  locale.value === "CN" ? (locale.value = "EN") : (locale.value = "CN");
  console.log(locale.value);
  localStorage.setItem("locale", locale.value);
};

defineProps({
  back_type: {
    type: Boolean as unknown as PropType<boolean>,
    default: () => false,
  },
});

const updateshow = (type: boolean) => {
  show.value = type;
};

const gomyindex = () => {
  router.push("/me/info");
};
const connect_address = async () => {
  let { provider, address, signer } = await initSigner();
  Actions.login({ hexAddress: address, provider: provider })
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      if (err.name === "AxiosError") {
        Toast.fail(t('overall.Timeout'));
      } else {
        Toast.fail(t('overall.cancel'));
      }
    });
};

const back = (): void => {
  if (route.query.create_type) {
    console.log(123);
  } else {
    router.go(-1);
  }
};
const gosearchdetails = (): void => {
  show.value = true;
  // router.push('/browse/searchdetails');
};
const value = ref("");

const themeVars = {
  vanPopupBackgroundColor: "#000000",
};
</script>

<style scoped lang="scss">
  :deep(.van-popup) {
    &.van-popup--top{
      background: #000000;
    }
  }

  :deep(.van-search__content) {
    // background: transparent;
    background-color: #252525 !important;
    .van-field__left-icon {
      color: #5c5c5d;
    }
    input {
      color: #89898b;
    }
  }

.da {
  width: 100%;
  height: 1.7rem;
  background-color: $background-color-theme;
}

.Search_box {
  z-index: 9999;
  background-color: $background-color-theme;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 10rem;
  position: fixed;
  height: 1.7rem;
  line-height: 1rem;
  top: 0;
  z-index: 999;
  padding-top: 5px;
  // margin: .2rem auto;
  // padding: 0px 0.3rem 0.2rem;
  padding: 0px 0.3rem;

  .logo {
    display: flex;
    align-items: center;
    // margin-top: 0.2rem;

    >div:nth-of-type(2) {
      margin-left: 0.2rem;
    }
  }

  .right {
    display: flex;
    width: 60%;
    justify-content: space-between;
    align-items: center;
    padding-left: .2rem;

    >div:nth-of-type(2) {
      display: flex;
      align-items: center;

      >div:nth-of-type(2) {
        margin: 0 .35rem;
      }
    }
  }

  .earth {
    display: flex;
    align-items: center;
    width: 20%;
    justify-content: space-around;

    p {
      color: rgba(16, 16, 16, 100);
      font-size: 0.32rem;
      text-align: left;
      font-family: PingFangSC-regular;
    }
  }

  .fuan {
    transform: rotate(180deg);
  }

  .van-search {
    height: 0.74rem;
    // width: 2.5rem;
    margin-right: .2rem;
    border-radius: 0.14rem;
    // background-color: rgba(247, 247, 247, 100);
    color: rgba(223, 219, 219, 100);
    font-size: 0.3rem;
    padding: 0;
    overflow: hidden;
    // margin: 0 .3rem 0 0;
    background-color: transparent;
    position: relative;
    right: 0.15rem;

  }
}

.height {
  position: relative;
  height: 1.7rem;
  margin-bottom: 5px;
}
</style>