// src/axios.ts
import axios from 'axios';
import { computed } from 'vue';
import { useStates, useActions } from '@/hooks/userStore';
import store from '@/store';

import cacheStore from '@/hooks/CacheStore';

// 开发环境
// export const baseURL = "https://api.metapro.superswap.cool/"


//生产环境
export const baseURL = "https://api.xflash.io/"
//使用create方法创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000, // 请求超时时间
});
let userinfo: any;
// let userinfo: any = JSON.parse(cacheStore.getLocal('userinfo') as string);
setTimeout(() => {
  userinfo = computed(() => (store as any).state.userMap.userinfo);
});
// const storeState: any = useStates('userMap', ['userMap']);
// let userinfo = storeState.userMap.userinfo;
service.defaults.headers.post['Content-Type'] =
  'application/json;charset=utf-8';
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    let configs: any = config;
    let token;
    let userinfos: any = JSON.parse(cacheStore.getLocal('userinfo') as string);
    if (cacheStore.getLocal('token')) {
      token = JSON.parse(cacheStore.getLocal('token') as string);
    }
    if (token && userinfo && (userinfo.value.isLogin || userinfos.isLogin))
      configs.headers.token = token;
    // if(window.ethereum?.selectedAddress) config.headers.hexAddress = window.ethereum.selectedAddress.toLocaleLowerCase()
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    let res = response.data || response;
    if (!res.code) {
      res.code = response.status;
    }
    if (res.code != 0 && res.code != 200) {
      if (res.code === -14) {
        //token过期的操作
        cacheStore.removeLocal('token');
        return;
      }
      return Promise.reject(new Error(res.message || res.msg || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    // console.log('err' + error); // 打印错误信息
    return Promise.reject(error);
  }
);

export function axiosPost(url: string, params: any = {}) {
  url = url.startsWith('/') ? baseURL + url : url;
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then((response) => {
        resolve(response.data || response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function axiosGet(url: string, params?: any) {
  url = url.startsWith('/') ? baseURL + url : url;
  return new Promise((resolve, reject) => {
    if (params) {
      service
        .get(url, { params })
        .then((response) => {
          resolve(response?.data || response);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      service
        .get(url)
        .then((response) => {
          resolve(response?.data || response);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

export default service;
