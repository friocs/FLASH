/*
 * @Author: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @Date: 2022-10-24 15:14:06
 * @LastEditors: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @LastEditTime: 2022-11-04 10:58:48
 * @FilePath: \metapro-pc\src\api\home\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { axiosGet, axiosPost } from '@/utils/axios';

export const getBannerList = (data: any) =>
  axiosPost('/api/client/banner/getBannerList', data);

export const getNftTop = (data: any) =>
  axiosPost('/api/client/homePage/tradingVolumeToday',data);

export const popular = () => axiosPost('/api/client/homePage/popular');
