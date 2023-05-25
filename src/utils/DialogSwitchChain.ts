/*
 * @Author: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @Date: 2022-11-02 17:55:58
 * @LastEditors: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @LastEditTime: 2022-11-21 16:10:46
 * @FilePath: \metapro-pc\src\utils\DialogSwitchChain.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Dialog } from 'vant';
import common from '@/utils/common';
// import {Toast} from 'vant'
import { ElMessage } from 'element-plus'
import VueI18n from '@/locales/index';
import { switchChain as siwtchMsd } from '@/utils/SwitchUtils'
let t = VueI18n.global.t
let commonNow = common.commom_text;
declare let window:any;
let {ethereum} = window;

export const switchChain = (
    func:(type: number, authorizationType: boolean)=>Promise<any>,
    isLogin:boolean,
    address:string,
    type: number,
    authorizationType: boolean,
) => {
   if(filterLogin(isLogin,address)) func.call(this,type,authorizationType)
}

//没有参数情况
export const switchChainNoArgs = (
    func:()=>Promise<any>,
    isLogin:boolean,
    address:string,
) => {
    if(filterLogin(isLogin,address)) func.call(this)
}

function filterLogin(isLogin:boolean,address:string):boolean{
    console.log(isLogin,address);
    if(!ethereum){ //没有钱包对象
        ElMessage.error(t("overall.errorChainId3"))
        return false;
    }else if(ethereum && ethereum.chainId && (!isLogin || !address)){ //有但是没登入
        ElMessage.error(t("overall.logTips"))
        return false;
    }else if(ethereum && ethereum.chainId && (Number(commonNow.chainId) != Number(ethereum.chainId)) && isLogin && address){
        //登入但是链不对
        // Dialog.confirm({
        //     cancelButtonText:t('overall.cancel'),
        //     confirmButtonText:t('overall.confirm'),
        //     cancelButtonColor:'#7C7C7C',
        //     confirmButtonColor:'#189F7A',
        //     message:t('wallet.switchChainDialog'),
        // })
        // .then(async () => {
           siwtchMsd(('0x'+commonNow.chainId.toString(16)) as '0x61'|'0x38')
        // })
        // .catch(() => {
        //     // on cancel
        // });
        return false;
    }else{
        return true;
    }
}
export {
    filterLogin
}