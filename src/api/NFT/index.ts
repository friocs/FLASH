import { axiosGet, axiosPost } from '@/utils/axios';

// /拿代币list
export const getTokenList = (data: any) =>
  axiosPost('/api/client/config/getTokenList', data);
