import { userMapType } from '@/utils/type';
import dayjs from 'dayjs';
import { CellGroup, Toast } from 'vant';
import { Login } from '@/api/login';
import { getuserinfo } from '@/api/my';
import VueI18n from '@/locales';
import { ElLoading, ElMessage } from "element-plus";
import cacheStore from '@/hooks/CacheStore';
declare let window: any;
const t = VueI18n.global.t
const userMap = {
  namespaced: true, //开启命名空间，能让代码更加的独立，以后项目开发的时候都要开启命名空间
  state: {
    userinfo: {
      hexAddress: '',
      name: 'Flash',
      headPic: '',
      token: '',
      isLogin: false,
      introduction: 'Flash是一个NFT交易平台',
    },
  },
  getters: {
    getuserMap(state: { userinfo: any }) {
      return state?.userinfo;
    },
  },
  mutations: {
    setUserMap(state: any, userMap: any): void {
      state.userinfo = userMap;
      cacheStore.setLocal('userinfo', state.userinfo);
    },
  },
  actions: {
    setUserMap({ commit }: any, userMap: object): void {
      commit('setUserMap', userMap);
    },
    login(
      { commit, dispatch }: any,
      data: { hexAddress: any; signature: any; provider: any }
    ) {
      return new Promise((resolve, reject) => {
        if (!data.hexAddress) {
          // return ElMessage.warning(
          //  t('wallet.noWallet')
          // );
        } else if (!window.ethereum) {
          // return ElMessage.warning(t('wallet.errorChainId'));
        } else {
          dispatch('sign', data)
            .then((res: any) => {
              data.signature = res;
              delete data.provider;
              Login({ walletAddr: data.hexAddress })
                .then((res2: any) => {
                  commit('setUserMap', { token: res2, isLogin: true });
                  cacheStore.setLocal('token', res2.userToken);
                  dispatch('getuserinfo', {
                    hexAddress: data.hexAddress,
                    token: res2,
                  });
                })
                .catch((e: any) => {
                  reject(e);
                });
            })
            .catch((e: any) => {
              reject(e);
            });
        }
      });
    },
    sign(
      { commit }: any,
      data: {
        provider: { send: (arg0: string, arg1: any[]) => any };
        timestamp: number;
        hexAddress: any;
      }
    ) {
      console.log('internal provider', data.provider);
      let timestamp = dayjs().unix();
      data.timestamp = timestamp;
      console.log('data', timestamp, data.hexAddress);
      let msgParams = [
        //实际使用给对应的value字段赋值
        {
          //防重入字段
          type: 'string',
          name: 'name',
          value: 'Flash_login',
        },
        {
          //登录签名地址
          type: 'string',
          name: 'signer',
          value: data.hexAddress,
        },
        {
          //防重入字段 时间戳
          type: 'uint',
          name: 'timestamp',
          value: timestamp,
        },
        // {//id
        //   type: 'number',
        //   name: 'id',
        //   value:
        // }
      ];
      let params = [msgParams, data.hexAddress];
      let method = 'eth_signTypedData';
      return data.provider.send(method, params);
    },
    loginOut({ commit }: any) {
      return new Promise<void>((resolve, reject) => {
        try {
          cacheStore.removeLocal('token');
          cacheStore.removeLocal('userinfo');
          commit('setUserMap', { isLogin: false, headPic: '' });
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    getuserinfo({ commit }: any, { hexAddress, token }: any): void {
      getuserinfo({ walletAddr: hexAddress })
        .then((res: any) => {
          let data = {
            hexAddress: hexAddress,
            name: res.nickName,
            headPic: res.profilePhoto,
            token: token,
            isLogin: true,
            introduction: res.description,
          };
          commit('setUserMap', data);
          cacheStore.setLocal('userinfo', data);
        })
        .catch((e) => {
          return e;
          console.log(e);
        });
    },
  },
};
export default userMap;
