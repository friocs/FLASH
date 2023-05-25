/*
 * @Author: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @Date: 2022-10-24 15:14:06
 * @LastEditors: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @LastEditTime: 2022-11-22 10:31:53
 * @FilePath: \metapro-pc\src\utils\thhersUtils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'ethers';
import common from '@/utils/common';
import { ElLoading, ElMessage } from "element-plus";


declare let window: any;


let commonNow =
  Number(window.ethereum && window.ethereum.chainId) == 97
    ? common.commom_text
    : common.commom;

const initSigner = async () => {

  let address: any, Balance: any;
  let { ethereum } = window;
  let provider = ethereum
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(commonNow.jsonRpc);
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (err) {
    console.log(err,localStorage.getItem('locale'));
    // ElMessage.warning(t('wallet.noWallet'))
    // ElMessage.warning("请安装钱包")
    if(localStorage.getItem('locale')=='CN'){
      ElMessage.warning("请安装钱包")
    }else if(localStorage.getItem('locale')=='EN'){
      ElMessage.warning("Please install wallet")
    }
  }
  let signer = provider.getSigner();
  try {
    address = await signer.getAddress();
    Balance = await provider?.getBalance(address);
  } catch (error) {
    console.log(error);
  }
  /*第一个是provider对象  第二个是当前授权地址*/
  return {
    provider: provider,
    address: address,
    signer: signer,
    Balance: Balance,
  };
};

const initDefault = async () => {
  let { ethereum } = window;
  let provider = ethereum
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(commonNow.jsonRpc);
  /*第一个是接口对象  第二个是当前授权地址*/
  return provider;
};

export { initSigner, initDefault };
