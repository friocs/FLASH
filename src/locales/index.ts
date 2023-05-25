//语言
import { createI18n } from 'vue-i18n'; //引入vue-i18n组件
import CN from './lang/zh-CN/cn';
import EN from './lang/en/en';
const langs = ['CN', 'EN'];
let lang = String(localStorage.getItem('locale'));
// import { 引入的组件 export 出来的 变量} from 'vue-i18n'
//注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false,
  locale: langs.includes(lang) ? lang : 'CN', //默认显示的语言
  messages: {
    CN: CN, //引入语言文件
    EN: EN,
    en: EN, //引入语言文件
    'zh-CN': CN,
  },
});
export default i18n; //将i18n暴露出去，在main.js中引入挂载
