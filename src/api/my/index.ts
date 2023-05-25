import { axiosGet, axiosPost } from '@/utils/axios';

// 拿个人信息
export const getuserinfo = (data: any) =>
  axiosPost('/api/client/user/getUserInfo', data);
// 拿我的系列
// /client/nftContract/getNftContractListForUser
export const getNftContractListForUser = () =>
  axiosPost('/api/client/nftContract/getNftContractListForUser');

  export const getNftContractListForMyPool = () =>
  axiosPost('/api/client/nftContract/getNftContractListForMyPool');
// 通过系列获取个人NFT
export const getMyNft = (data: any) =>
  axiosPost('/api/client/nft/getMyNft', data);

// 修改个人信息
type userinfoType = {
  nickName?: string;
  walletAddr: string;
  profilePhoto?: FormData;
  description?: string;
};

export const modifyUserInfo = (data: userinfoType) =>
  axiosPost('/api/client/user/modifyUserInfo', data);

// 修改头像
export const uploadProfilePhotoForClient = (data: any) =>
  axiosPost('/api/client/common/uploadProfilePhotoForClient', data);
// 我的池子
export const getMyPoolList = (data?: any) =>
  axiosPost('/api/client/pool/getMyPoolList', data);

// 我的交易记录
export const getMyTransaction = (data?: any) =>
  axiosPost('/api/client/transaction/getMyTransaction', data);
// 全网成交
export const getAllTransaction = (data?: any) =>
  axiosPost('/api/client/transaction/getAllTransaction', data);


// 我的交易记录
export const getMaketMyTransaction = (data?: any) =>
  axiosPost('/api/client/transaction/getMaketMyTransaction', data);
// 全网成交
export const getMaketAllTransaction = (data?: any) =>
  axiosPost('/api/client/transaction/getMaketAllTransaction', data);


// 邀请链接
export const getInviter = (data?: any) =>
axiosPost('/api/client/inviter/generate', data);
// 数据总览
export const getOverview = (data?: any) =>
axiosPost('/api/client/inviter/overview', data);
// 邀请记录
export const getRecord = (data?: any) =>
  axiosPost('/api/client/inviter/record', data);