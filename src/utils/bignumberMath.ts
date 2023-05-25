import { ethers } from "ethers";


export const addS = (num1:string|number|any,num2:string|number|any) => { //加
    let num11 = ethers.utils.parseUnits(String(num1),18)
    let num22 = ethers.utils.parseUnits(String(num2),18)
    return ethers.utils.formatUnits(num11.add(num22),18)
}

export const subS = (num1:string|number|any,num2:string|number|any) => {//减
    let num11 = ethers.utils.parseUnits(String(num1),18)
    let num22 = ethers.utils.parseUnits(String(num2),18)
    return ethers.utils.formatUnits(num11.sub(num22),18)
}

export const mulS = (num1:string|number|any,num2:string|number|any) => {//乘
    let num11 = ethers.utils.parseUnits(String(num1),18)
    let num22 = ethers.utils.parseUnits(String(num2),18)
    return ethers.utils.formatUnits(num11.mul(num22),18*2)
}
export const divS = (num1:string|number|any,num2:string|number|any) => {//除
    let num11 = ethers.utils.parseUnits(String(num1),18)
    let num22 = ethers.utils.parseUnits(String(num2),18)
    return ethers.utils.formatUnits(num11.div(num22),0)
}
export const gtS = (num1:string|number|any,num2:string|number|any) => {//大于
    let num11 = ethers.utils.parseUnits(String(num1),18)
    let num22 = ethers.utils.parseUnits(String(num2),18)
    return num11.gt(num22)
}
export const gteS = (num1:string|number|any,num2:string|number|any) => {//大于等于
    let num11 = ethers.utils.parseUnits(String(num1),18)
    let num22 = ethers.utils.parseUnits(String(num2),18)
    return num11.gte(num22)
}
export const ltS = (num1:string|number|any,num2:string|number|any) => {//小于
    let num11 = ethers.utils.parseUnits(String(num1),18)
    let num22 = ethers.utils.parseUnits(String(num2),18)
    return num11.lt(num22)
}
export const lteS = (num1:string|number|any,num2:string|number|any) => {//小于等于
    let num11 = ethers.utils.parseUnits(String(num1),18)
    let num22 = ethers.utils.parseUnits(String(num2),18)
    return num11.lte(num22)
}
