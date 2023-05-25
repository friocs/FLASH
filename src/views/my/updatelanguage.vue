<template>
    <van-config-provider :theme-vars="themeVars">
        <van-nav-bar :title="t('my.languages')" left-arrow safe-area-inset-top @click-left="onClickLeft"
            :right-text="t('overall.preservation')" @click-right="onClickRight" />
    </van-config-provider>

    <van-radio-group v-model="checked">
        <van-cell-group inset>
            <van-cell center value="简体中文" clickable @click="checked = '1'">
                <template #right-icon>
                    <van-radio name="1" />
                </template>
            </van-cell>
            <van-cell center value="English" clickable @click="checked = '2'">
                <template #right-icon>
                    <van-radio name="2" />
                </template>
            </van-cell>
        </van-cell-group>
    </van-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
let { locale, t } = useI18n();
const router = useRouter();
const checked = ref('1');
if (localStorage.getItem('locale')) {
    let locale = localStorage.getItem('locale');
    locale === 'CN' ? checked.value = '1' : checked.value = '2'
}
const onClickRight = (): void => {
    checked.value === '1' ? locale.value = 'CN' : locale.value = 'EN';
    localStorage.setItem('locale', locale.value);
    onClickLeft();
}
const onClickLeft = (): void => {
    router.go(-1);
    // router.push('/me/info');
    // router.push('/me/updatemydetail');
}

const themeVars = {
    navBarIconColor: '#101010',
    navBarTextColor: '#101010'
}
</script>
