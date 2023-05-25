/*
 * @Author: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @Date: 2022-10-24 10:48:55
 * @LastEditors: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @LastEditTime: 2022-11-15 18:46:52
 * @FilePath: \meta-pro-h5\src\api\browse\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { axiosGet, axiosPost } from '@/utils/axios';

export const getNftContractList = (data: any) => {
  return axiosPost('/api/client/nftContract/getNftContractList', data);
};
export const getContractListByHot = () => {
  return axiosGet('/api/client/nftContract/getContractListByHot');
};
export const getNftList = (data: any) => {
  return axiosPost('/api/client/nft/getNftList', data);
};

//市场
export const getNftListByMarket = (data: any) => {
  return axiosPost('/api/client/nft/getNftListByMarket', data);
};

// nft详情
export const getNftDetail = (nftId: number) => {
  return axiosPost('/api/client/nft/getNftDetail/' + nftId);
};

// nft交易历史
export const getNftTransactionHistory = (data: any) => {
  return axiosPost('/api/client/transaction/getNftTransactionHistory', data);
};


export const reloadNftMetadata = (data: any) => {
  return axiosPost('/api/client/nft/reloadMetaData', data);
};

//

export const nftContractByAddress = (data: any) => {
  return axiosPost('/api/client/nftContract/nftContractByAddress', data);
};

//池子详情
export const poolDetail = (data: any) => {
  return axiosPost('/api/client/pool/poolDetail', data);
};
//市场NFT系列列表
export const getNftContractListForMarket = (data: any) => {
  return axiosPost('/api/client/nftContract/getNftContractListForMarket', data);
};