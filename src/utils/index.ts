//@ts-ignore
import { ethers } from "ethers"
import common from '@/utils/common'



const modules:any = import.meta.glob('/src/assets/img/*',{ eager: true }); //批量导入静态资源

//由于vue3无require  动态图片需要通过该方法引入（如果是Public里面的资源则不需要该方法 直接动态拼接就好了）
//getPath('图片名','img') 获取/src/assets 目录下的png图片
//getPath('图片名','img','/test')  获取/src/assets/test 目录下的png图片
export const getPath = (path:string):any => {
    path = path.replace('@','/src')
    // console.log(path,'path');
    // console.log(modules,'modules');
    return modules[path] && modules[path].default;
}