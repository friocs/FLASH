<template>
  <div class="box">
    <search />
    <div class="subject">
      <h4><img src="../../assets/img/establish.png" alt="">{{$t('INO.create')}}</h4>
      <div class="content">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
          status-icon>
          <el-form-item :label="t('INO.image')" prop="logo">
            <p class="p1">{{$t('INO.p1')}}</p>
            <p class="p2">{{$t('INO.p2')}}</p>
            <el-upload class="avatar-uploader" :show-file-list="false" :http-request="field101BeforeUpload">
              <el-image  fit="cover" v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <!--  -->
          <el-form-item :label="t('INO.name')" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item :label="t('INO.Abbreviation')" prop="symbol">
            <el-input v-model="ruleForm.symbol" />
          </el-form-item>
          <el-form-item :label="t('INO.describe')"  prop="introduce">
            <el-input v-model="ruleForm.introduce" type="textarea" />
          </el-form-item>
          <el-form-item :label="t('INO.mintTotal')" prop="maxmint">
            <el-input v-model="ruleForm.maxmint"  oninput="value=value.replace(/\D/g, '').replace(/^0{1,}/g, '')" />
          </el-form-item>
          <el-form-item :label="t('INO.maximum')" prop="maximum">
            <el-input v-model="ruleForm.maximum" oninput="value=value.replace(/\D/g, '').replace(/^0{1,}/g, '')"  />
          </el-form-item>
          <el-form-item label="SBT">
            <el-checkbox-group v-model="SBT">
              <div>
                <el-checkbox :label=BABTAddress>BABT <span class="span1">Contract</span> <span class="span2">{{
                    BABTAddress
                }}</span> </el-checkbox><img @click="copy(BABTAddress)"
                  src="../../assets/img/copy_2.png" alt="">
              </div>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item :label="t('INO.StartTime')" prop="startTime1">
            <el-date-picker v-model="ruleForm.startTime1" type="datetime" placeholder="Select date and time" />
            <p>{{$t('INO.default')}}</p>
          </el-form-item>
          <h5>{{$t('INO.connect')}}</h5>
          <p>{{$t('INO.exhibit')}}</p>
          <el-form-item>
            <div class="relation"><img src="../../assets/img/home_icon9.png" alt=""> <p>Official website</p>  <el-input v-model="ruleForm.youtube"/></div>
            <div class="relation"><img src="../../assets/img/home_icon.png" alt=""> <p>Telegram</p>  <el-input v-model="ruleForm.telegram"/></div>
            <div class="relation"><img src="../../assets/img/home_icon6.png" alt=""> <p>Twitter</p>  <el-input v-model="ruleForm.twitter"/></div>
            <div class="relation"><img src="../../assets/img/home_icon7.png" alt=""> <p>Discord</p>  <el-input v-model="ruleForm.discord"/></div>
          </el-form-item>
          <el-form-item>
            <el-button @click="cast(ruleFormRef)">
              <van-loading type="spinner" v-if="loading"/>
              <span v-else>{{$t('INO.casting')}}</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <connectBox :ConnectWallet="ConnectWallet" @change="changeConect"></connectBox>
  </div>
</template>
<script lang='ts' setup>
import {
  ref,
  computed,
  reactive,
  onMounted,
  getCurrentInstance,
  inject,
} from "vue";
import "@/assets/css/vant1.scss";
import search from "@/components/search.vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import { ethers } from "ethers";
import { ElLoading } from "element-plus";
import { uploadProfilePhotoForClient } from "@/api/my";
import { EstablishINO,uploadImage} from "@/api/INO"
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import INO from "@/utils/contracts/INO.json"
import { initSigner } from "@/utils/thhersUtils";
import { useStates, useActions } from "@/hooks/userStore";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const route = useRoute();
let { t } = useI18n();
let ConnectWallet = ref<boolean>(false)
let loading = ref(false)
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
onMounted(() => {
  let tries = 0;
  setTimeout(function initTimer(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
    else init();
  });
});


let useraddress = ref("");
let contracts: {
  LSSVMPairFactory: any;
  INO: any;
} = {
  LSSVMPairFactory: null,
  INO: null
};
let providers: any,
  signers: any;
const init = async () => {
  if ((window as any).ethereum) {
    //第一步 ----  获取 当前钱包对象 和 provider
    let { provider, address, signer } = await initSigner();
    providers = provider;
    signers = signer;
    useraddress.value = address;
    //第二部 ----  创建合约对象              '合约地址'       'JSON'  这是上面的provider和signer
    contracts.INO = new ethers.Contract(proxy.$common.INO, INO, providers).connect(signers)
  }
};
const ruleFormRef = ref<FormInstance>()
let ruleForm: any = reactive({
  name: '',
  symbol: '',//简称
  introduce: '',//介绍
  maxmint: '',//最大mint数量
  maximum: '',//单个地址最大铸造数
  website: '',//官网
  price: '',//价格
  logo: '',//上传文件获得Url
  type: '1',//
  startTime: '',//开始时间
  startTime1:'',
  endTime: '',//结束时间
  babt:'',
  youtube:'',
  telegram:'',
  twitter:'',
  discord:'',
  medium:'',
})
let SBT = ref([])
const checked2 = ref(6666666)
let date = ref(dayjs(ruleForm.startTime).unix())
let BABTAddress = ref('0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8')
const rules = reactive<FormRules>({
  logo: [
    { required: true, message: `${t('INO.rules1')}`, trigger: 'blur' },
  ],
  name: [
    { required: true, message: `${t('INO.rules2')}`, trigger: 'blur' },
    { min: 0, max: 50, message: `${t('INO.rules2_1')}`, trigger: 'blur' },
  ],
  symbol: [
    { required: true, message: `${t('INO.rules3')}`, trigger: 'blur' },
    { min: 0, max: 8, message: `${t('INO.rules3_1')}`, trigger: 'blur' },
  ],
  introduce: [
    { required: true, message: `${t('INO.rules4')}`, trigger: 'blur' },
    { min: 0, max: 500, message: `${t('INO.rules4_1')}`, trigger: 'blur' },
  ],
  maxmint: [
    { required: true, message: `${t('INO.rules5')}`, trigger: 'blur' },
  ],
  maximum: [
    { required: true, message: `${t('INO.rules6')}`, trigger: 'blur' },
  ],
  startTime1: [
    { required: true, message: `${t('INO.rules7')}`, trigger: 'blur' },
  ],
})
//图片上传
const imageUrl = ref('')
const field101BeforeUpload = (file: any) => {
  if (!userinfo.value.isLogin) return ConnectWallet.value = true
  var formData = new FormData();
  let type = /jpg|png|gif|jpeg$/;
  formData.append("file", file.file);
  if (file.file.size / 1024 / 1024 > 10) {
    ElMessage.warning(t('my.pictureMore1'))
  } else if (!type.test(file.file.type)) {
    ElMessage.warning(t('my.pictureTips'))
  } else {
    uploadImage(formData).then((res: any) => {
      if (res.code === 200) {
        imageUrl.value = res.msg
        ruleForm.logo = res.msg
      } else {
        ElMessage.error(t('overall.fail'))
      }
    }).catch(e => {
      ElMessage.error(t('overall.fail'))
    })
  }
}
const cast = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if(loading.value) return
      if (!userinfo.value.isLogin) return ConnectWallet.value = true
      // 604800
      ruleForm.endTime = dayjs(ruleForm.startTime1).unix() + 604800
      ruleForm.startTime = dayjs(ruleForm.startTime1).unix()
      if(Number(ruleForm.maxmint) <=0 || Number(ruleForm.maximum) <= 0) return proxy.$message.warning(t('INO.Tip1'))
      if(Number(ruleForm.maximum) > Number(ruleForm.maxmint)) return proxy.$message.warning(t('INO.Tip2'))
      if(Number(ruleForm.startTime) < (Math.trunc(new Date().getTime() / 1000))) return proxy.$message.warning(t('INO.Tip3'))
      if(SBT.value.length > 0){
        ruleForm.babt = 1
      } 
      loading.value = true
      EstablishINO(ruleForm).then(async (res: any) => {
        contracts.INO.CreateNft(ruleForm.name, ruleForm.symbol, ruleForm.maxmint, ruleForm.maximum, ruleForm.startTime, ruleForm.endTime, SBT.value, 0, res.orderid).then(async (tx) => {
          await tx.wait();
          ElMessage.success(t('INO.success'));
          ruleForm = {
            name: '',
            symbol: '',//简称
            introduce: '',//介绍
            maxmint: '',//最大mint数量
            maximum: '',//单个地址最大铸造数
            website: '',//官网
            price: '',//价格
            logo: '',//上传文件获得Url
            type: '',//开始时间
            startTime: '',//开始时间
            startTime1:'',
            endTime: '',//结束时间
          }
          router.push("/ino/Establish");
          loading.value = false
        }).catch((e) => {
          console.error(e);
          ElMessage.error(t('INO.fail'))
          loading.value = false
        });
      })
    } else {
      console.log('error submit!', fields)
    }
  })

}
//复制
const copy = (value: string) => {
  let input = document.createElement("input");
  input.value = value;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  proxy.$message.success(t('INO.success'))
}
const changeConect = () => {
  ConnectWallet.value = false
}
</script>
  
  
<style scoped lang="scss">
.box {
  background-image: url("../../assets/img/topView.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding-bottom: 50px;
  font-family: PingFang SC !important;
  .subject {
    width: 67.708vw;
    margin: 0 auto;
    margin-top: 17vw;

    h4 {
      font-size: 2.083vw;
      font-weight: bold;
      color: #23262F;
      margin-bottom: 3.125vw;
      img{
        margin-right: 0.521vw;
      }
    }

    :deep(.el-input) {
      .el-input__wrapper.is-focus{
        box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
      }
    }
    :deep(.el-textarea__inner:focus ){
      box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
    }
    :deep(.el-textarea__inner){
      min-height: 5.208vw !important;
    }
    :deep(.el-form){
      >h5{
        font-size: 0.833vw;
        color: #23262F;
        font-weight: 400;
        margin-bottom: 0.26vw;
      }
      >p{
        font-size: 0.729vw;
        color: #777E90;
        margin-bottom: 0.521vw;
      }
    }
    :deep(.el-form-item) {
      flex-direction: column;
      margin-bottom: 2.604vw;
      .el-form-item__label {
        width: 10.417vw !important;
        display: inline;
        font-size: 0.833vw;
        color: #23262F;
      }

      .el-form-item__content {
        flex-direction: column;
        align-items: flex-start;
        margin: 0 !important;
       
        >.relation{
          width: 60%;
          display: flex;
          align-items: center;
          margin-bottom: 0.521vw;
          >img{
            width: 1.042vw;
            margin-right: 0.521vw;
          }
          p{
            width: 6.25vw;
            font-size: 0.625vw;
            color: #353945;
          }
        }
        >p{
        font-size: 0.729vw;
        color: #777E90;
        }
        .el-input {
          width: 60%;
        }

        .el-textarea {
          width: 60%;
        }

        .el-input__wrapper {
          width: 100%;
        }

        .el-button {
          width: 13.49vw;
          height: 2.5vw;
          text-align: center;
          line-height: 2.5vw;
          background: #3B82F6;
          border-radius: 0.417vw;
          font-size: 0.833vw;
          font-weight: bold;
          color: #FFFFFF;
        }

        .p1 {
          font-size: 0.833vw;
          color: #777E90;
        }

        .p2 {
          font-size: 0.833vw;
          color: #F05D62;
        }
      }
    }

    :deep(.avatar-uploader) {
      .avatar {
        width: 21.354vw;
        height: 9.375vw;
        display: block;
      }

      .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 0.313vw;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }

      .el-upload:hover {
        border-color: var(--el-color-primary);
      }

      .el-icon.avatar-uploader-icon {
        font-size: 1.458vw;
        color: #8c939d;
        width: 21.354vw;
        height: 9.375vw;
        text-align: center;
      }
    }

    :deep(.el-checkbox-group) {
      >div {
        img {
          width: 0.781vw;
          margin-left: 1.042vw;
          cursor: pointer;
        }
      }
    }

    :deep(.el-checkbox) {
      >span {
        .span1 {
          margin-left: 1.042vw;
          margin-right: 0.521vw;
        }

        img {
          margin-left: 0.521vw;
          width: 0.625vw;
        }
      }
    }
  }
}
</style>
  