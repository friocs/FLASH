<!--
 * @Author: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @Date: 2022-11-18 10:04:45
 * @LastEditors: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @LastEditTime: 2022-11-23 20:06:09
 * @FilePath: \metapro-pc\src\components\connectBox.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>

    <div class="connect">
        <el-dialog v-model="ConnectWallet" :title="$t('my.wallet')" @close="closeDialog">
            <div class="connect-box">
                <div class="content">
                    <div class="connect-item " v-for="(item, index) in contentList" :key="index"
                         @click="connect_address(index)">
                        <img :src="item.img" alt="">
                        <span>{{ item.name }}</span>
                    </div>
                </div>

            </div>
        </el-dialog>
    </div>


</template>

<script lang='ts' setup>
import { ref, reactive, toRefs} from 'vue';
import { initSigner } from "@/utils/thhersUtils";
import { useActions } from "@/hooks/userStore";
import { ElMessage } from 'element-plus'
import { useI18n } from "vue-i18n";
import {getPath} from '@/utils/index'
const Actions: any = useActions(["login", "setuserMap"], "userMap");
let { t } = useI18n();

const data = reactive({})
let current = ref(-1)
let contentList = ref([
    { img: getPath('@/assets/img/MetaMask.png'), name: 'MetaMask' },
    { img: getPath('@/assets/img/tp.png'), name: 'TokenPocket ' },
    { img: getPath('@/assets/img/imToken.png'), name: 'imToken' },
    // { img: getPath('@/assets/img/WalletConnect.png'), name: 'WalletConnect' },
    // { img: '@/assets/img/OneKeyWallet.png', name: ' OneKey Wallet' },
    { img: getPath('@/assets/img/BitKeep.png'), name: 'BitKeep' },
])

const props = defineProps({
    ConnectWallet: Boolean
})
let { ConnectWallet } = toRefs(props)

const emit = defineEmits(['change']) 


const connect_address = async (index: any) => {
    current.value = index
    // if (index == 0) {
        let { provider, address, signer } = await initSigner();
        Actions.login({ hexAddress: address, provider: provider })

            .then((res: any) => {
                ConnectWallet.value = false
            })
            .catch((err: any) => {
                if (err.name === "AxiosError") {
                    ElMessage.error(t('overall.Timeout'));
                } else {
                    ElMessage.error(t('wallet.Cancelled'));
                }
            });

        try {
            emit('change',false)
            console.log(ConnectWallet,"ConnectWallet")
            ConnectWallet.value = false
        } catch (e) {
            console.log(e, "失败")
        }
    // }


};
const closeDialog = ()=>{
    console.log("关闭了")
    emit('change',false)
}
defineExpose({
    props,connect_address,closeDialog
})
// onBeforeMount(() => {
//     //console.log('2.组件挂载页面之前执行----onBeforeMount')
// })
// onMounted(() => {
//     //console.log('3.-组件挂载到页面之后执行-------onMounted')
// })
// watchEffect(() => {
// })
</script>
<style lang="scss" scoped>
.connect-box {
    // width: 3.3854rem;
    height: 1.0417rem;

}

.connect {
    .content {
        display: flex;
        flex-wrap: wrap;

        .connect-item {
            display: flex;
            width: 1.4063rem;
            height: .3333rem;
            align-items: center;
            border-radius: .1667rem;
            padding: 0 .0625rem;
            box-sizing: border-box;
            margin-bottom: .125rem;
            cursor: pointer;

            img {
                width: .2083rem;
                height: .2083rem;
                margin-right: .0781rem;
            }

            span {
                color: #353945;
                font-size: .0833rem;
            }
        }
        .connect-item:hover{
            background-color: #EAEAEB;
        }

        .connect-item:nth-child(even) {
            margin-left: .0625rem;
        }

        .active {
            // background-color: #EAEAEB;
        }
    }

    :deep(.el-dialog) {
        width: 3.3854rem;
        border-radius: .125rem;
    }

    :deep(.el-dialog__title) {
        color: #23262F;
        font-size: .1667rem;
    }

    :deep(.el-dialog__header) {
        padding: .1563rem;
    }

    :deep(.el-dialog__headerbtn) {
        top: .0833rem;
        right: .1302rem;
        .el-dialog__close {
            font-size: .125rem;
        }
    }

    :deep(.el-dialog__body) {
        padding: 0 .1563rem;
    }
}
</style>