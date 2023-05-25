/*
 * @Author: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @Date: 2022-10-24 10:48:55
 * @LastEditors: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @LastEditTime: 2022-11-16 20:28:02
 * @FilePath: \meta-pro-h5\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'vant/lib/index.css';
import 'lib-flexible-computer';
import '@/assets/font_qutls260iaa/iconfont.css';
import 'element-plus/theme-chalk/el-loading.css';
import Vant from './Vant';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';
// import 'element-plus/dist/index.css';
import common from './utils/common';
import plusExtends from '@/utils/plusextends.js';
import VueI18n from '@/locales/index';
import 'virtual:svg-icons-register'
// 引入SvgIcon.vue组件
import SvgIcon from '@/components/SvgIcon.vue'

const app = createApp(App);
app.component('SvgIcon', SvgIcon)

app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$filters = {
  numFilters0(value: any) {
    if (!value) value = 0;
    return String(value)
      .replace(/(.*\..{0})(.*)/g, '$1')
      .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
  },
  numFilters2(value: any) {
    if (!value) value = 0;
    return String(value)
      .replace(/(.*\..{2})(.*)/g, '$1')
      .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
  },
  numFilters4(value: any) {
    if (!value) value = 0;
    return String(value)
      .replace(/(.*\..{4})(.*)/g, '$1')
      .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
  },
  numFilters6(value: any) {
    if (!value) value = 0;
    return String(value)
      .replace(/(.*\..{6})(.*)/g, '$1')
      .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
  },
  addressFilters(value: any, startLen: number, endLen: number) {
    if (!value) value = "";
    return (
      value.substr(0, startLen) +
      '...' +
      value.substr(value.length - endLen, value.length)
    );
  },
  addressFilters2(value: any, startLen: number, endLen: number) {
    if (!value) value = "";
    return value.substr(0, startLen) + '...' + value.substr(value.length - endLen, value.length)
},
numFilters5(value: any) {
  if(!value) value = 0;
  return String(value).replace(/(.*\..{4})(.*)/g,'$1').replace(/(?:\.0*|(\.\d+?)0+)$/,'$1')
},
};

// let chainId;
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //@ts-ignore
// if (ethereum.chainId) chainId = Number(ethereum.chainId);
// else chainId = 56;
// app.config.globalProperties.$common =
//   chainId == 97 ? common.commom_text : common.commom;
app.config.globalProperties.$common = common.commom_text; //测试
// app.config.globalProperties.$common = common.commom;    //正式
app.config.globalProperties.$plusExtends = plusExtends;

app.use(store).use(router).use(Vant).use(VueI18n).mount('#app');
