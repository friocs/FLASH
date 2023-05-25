import { createStore } from 'vuex';
import userMap from './modules/userMap';
import PageType from './modules/pageType';
export default createStore({
  modules: {
    userMap,
    PageType,
  },
});
