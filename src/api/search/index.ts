/*
 * @Author: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @Date: 2022-10-24 15:14:06
 * @LastEditors: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @LastEditTime: 2022-11-24 10:14:01
 * @FilePath: \metapro-pc\src\api\search\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { axiosGet, axiosPost } from '@/utils/axios';
// 拿搜索历史
export const getSearchInfo = () =>
  axiosPost('/api/client/nftContract/getSearchInfo');
// 拿热门搜索
export const getContractListByHot = () =>
axiosPost('/api/client/nftContract/getContractListByHot');

// 拿所有数据
export const getNftContractListAll = () =>
axiosPost('/api/client/nftContract/getNftContractListAll');
// 删除历史记录
export const clearHistorySearch = (data?: any) =>
  axiosPost('/api/client/user/clearHistorySearch', data);

export const getNftContractListAllRedis = (data?: any) =>
axiosPost('/api/client/nftContract/getNftContractListAllRedis', data);

export const getNftContractListAllSearch = (searchKey: string) =>
axiosPost('/api/client/nftContract/getNftContractListAllSearch/' + searchKey);
