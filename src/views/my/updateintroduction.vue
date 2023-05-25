<template>
  <van-nav-bar :title="t('my.Editor_introduction')" left-arrow safe-area-inset-top @click-left="onClickLeft"
    :right-text="$t('overall.preservation')" @click-right="onClickRight" :border="false" />
  <van-cell-group inset>
    <van-field v-model="introduction" autosize rows="2" type="textarea" maxlength="100" :placeholder="$t('my.Tips')"
      show-word-limit />
  </van-cell-group>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { useI18n } from "vue-i18n";
import { modifyUserInfo } from "@/api/my";
import { useStates, useActions } from "@/hooks/userStore";
const storeState: any = useStates("userMap", ["userMap"]);
const Actions: any = useActions(["getuserinfo"], "userMap");
const userinfo = computed(() => storeState.userMap.userinfo);
let { t } = useI18n();
const router = useRouter();
let introduction = ref<string>("");

const onClickRight = () => {
  if (!introduction.value || introduction.value.trim() == "") {
    introduction.value = ''
    return Toast.fail(t('overall.Please'));
  }
  modifyUserInfo({
    description: introduction.value,
    walletAddr: userinfo.value.hexAddress,
  }).then((res: any) => {
    if (res.description === introduction.value) {
      Toast.success(t('overall.Modification'));
      Actions.getuserinfo({ hexAddress: userinfo.value.hexAddress }).then(
        (res: any) => {
          introduction.value = "";
          setTimeout(() => {
            onClickLeft();
          }, 1000);
        }
      );
    } else {
      Toast.fail(t('overall.fail'));
    }
  });
};
const onClickLeft = (): void => {
  router.go(-1);
  // router.push('/me/info');
  // router.push('/me/updatemydetail');
};
</script>
<style lang="scss" scoped>
.van-cell-group {
  width: $max-width;
  margin: 0 auto;
  padding: 5px;
  margin-top: 0.8rem;
  height: 5rem;
  background-color: #414345;
  color: rgba(16, 16, 16, 100);
  font-size: 0.3rem;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  font-family: Arial;
}

:deep(.van-field__word-limit) {
    color: #fff;
  }

  :deep(.van-cell) {
    height: 100%;
    background-color: #414345;

    .van-field__body {
      height: 90%;

      .van-field__control {
        height: 100% !important;
      }
    }
  }
</style>
