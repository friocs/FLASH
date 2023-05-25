import { axiosGet, axiosPost } from '@/utils/axios';

export const Login = (data: any) => axiosPost('/api/client/login', data);
