import { axiosGet, axiosPost } from '@/utils/axios';
export const EstablishINO = (data: any) =>
axiosPost('/api/client/launchpad/createLaunchpads', data);

export const Launchpads = (data: any) =>
axiosPost('/api/client/launchpad/launchpads', data);

export const MintRecord = (data: any) =>
axiosPost('/api/client/launchpad/launchpadsRecord', data);

//上传图片
export const uploadImage = (data: any) =>
  axiosPost('/api/client/common/uploadImageFileClient', data);

  //根据id获取信息
  export const Getinfoid = (data: any) =>
  axiosPost('/api/client/launchpad/launchpadDetail', data);