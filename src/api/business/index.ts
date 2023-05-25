import { axiosPost } from '@/utils/axios';

export const getNftContractHandicap = (data: any) => {
  return axiosPost('/api/client/nftContract/getNftContractHandicap', data);
};
// 市价购买NFT
export const buyNftForCurPrice = (data: any) => {
  return axiosPost('/api/client/transaction/buyNftForCurPrice', data);
};
// 市价出售NFT
export const sellNftForCurPrice = (data: any) => {
  return axiosPost('/api/client/transaction/sellNftForCurPrice', data);
};
//统计图
export const getNftHandicapAnalysis = (data: any) => {
  return axiosPost('/api/client/nftContract/getNftHandicapAnalysis', data);
};