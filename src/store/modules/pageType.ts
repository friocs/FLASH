const PageType = {
  namespaced: true, //开启命名空间，能让代码更加的独立，以后项目开发的时候都要开启命名空间
  state: {
    screen_type: false,
  },
  getters: {},
  mutations: {
    setScreen(state: { screen_type: any }, setScreen: boolean) {
      state.screen_type = setScreen;
    },
  },
  actions: {
    setScreen({ commit }: any, screen: boolean) {
      commit('setScreen', screen);
    },
  },
};
export default PageType;
