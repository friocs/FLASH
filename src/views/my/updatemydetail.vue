<template>
  <div class="home">
    <search />
    <div class="bj">

    </div>
    <div>
      <div class="box">
        <div class="title"> <img src="../../assets/img/edit.png" alt=""> {{ t('my.Edit_data') }}</div>
        <div class="form-box">
          <div class="form-title">{{ t('my.head_portrai') }}</div>
          <div class="head">
            <el-image v-if="imageUrl" class="head-img" :src="imageUrl" fit="fit" />
            <div class="head-img default-img" v-else></div>
            <div class="head-right">
              <p>{{ t('my.support') }}</p>
              <div>
                <el-upload class="avatar-uploader" action="" :show-file-list="false" :multiple="false"
                  :on-change="onChange" :http-request="field101BeforeUpload" accept=".jpg,.png,gif,JPG,PNG,GIF">
                  <el-button type="primary" class="head-btn">{{ t('my.SelectFile') }}</el-button>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="form-title">{{ t('my.username') }}</div>
          <div class="input-box">
            <input type="text" :placeholder="($t('NFTdetails.Pleaseenter'))" v-model="userinfo.name">
          </div>
          <div class="tips">{{ t('my.limit') }}</div>
          <div class="form-title">{{ t('my.briefintroduction') }}</div>
          <div class="text-box">
            <el-input v-model="userinfo.introduction" maxlength="100" :placeholder="($t('my.Tips'))" show-word-limit
              type="textarea" :autosize="false" resize="none">
            </el-input>
          </div>
          <div class="Submit" @click="submit">{{ t('my.Submit') }}</div>
        </div>
      </div>
    </div>
    <!-- <Footer></Footer> -->
  </div>

</template>

<script lang="ts" setup>

import { ref, computed, onMounted, onUnmounted } from "vue";
import { Dialog } from "vant";
import { useRouter } from "vue-router";
import { useStates, useActions } from "@/hooks/userStore";
import { copy } from "@/utils/copy";
import { modifyUserInfo, uploadProfilePhotoForClient } from "@/api/my";
import search from "@/components/search.vue";
import footer from "@/components/footer.vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from 'element-plus'
let { t, locale } = useI18n();
const router = useRouter();
const VanDialog = Dialog.Component;
const storeState: any = useStates("userMap", ["userMap"]);
const Actions: any = useActions(["loginOut", "getuserinfo"], "userMap");

// const userinfo = computed(() => storeState.userMap.userinfo);
let nameType = ref<boolean>(false);
let headPicType = ref<boolean>(false);
let nameValue = ref<string>("");

const updatenameType = (): void => {
  nameType.value = true;
};
const imageUrl = ref('')
const textarea = ref('')
const userinfo = ref<any>('')

onMounted(() => {
  userinfo.value = JSON.parse(localStorage.getItem('userinfo'))
  imageUrl.value = userinfo.value.headPic
  console.log(userinfo.value, "userinfo.value")
})
onUnmounted(() => {
  clearInterval(back);
});
const onChange = () => {
  console.log("123")
}
const field101BeforeUpload = (file: any) => {
  var formData = new FormData();
  console.log(file.file.size, '======11111');
  let type = /jpg|png|gif|jpeg$/;
  formData.append("file", file.file);
  console.log(formData, "formData", file.file)
  if (file.file.size / 1024 / 1024 > 1) {
    // console.log(12121212212);
    // Toast.fail('图片超过1m');
    ElMessage.warning(t('my.pictureMore'))
  }else if(!type.test(file.file.type)){
    ElMessage.warning(t('my.pictureTips'))
  } else {

    uploadProfilePhotoForClient(formData).then((res: any) => {
      if (res.code === 200) {
        // Actions.getuserinfo({ hexAddress: userinfo.value.hexAddress }).then(
        //   (res: any) => {
        //     Toast.success(t('overall.Modification'));
        //   }
        // );
        imageUrl.value = res.msg
        console.log(res, "res")
      } else {
        // Toast.fail(t('overall.fail'));
        ElMessage.error(t('overall.fail'))
        console.log();
        

      }
    }).catch(e => {
      // Toast.fail(t('overall.fail'));
      ElMessage.error(t('overall.fail'))
    })
  }

}
let submit = () => {
  let test = /^[\u4e00-\u9fa5a-z\d_]{2,16}$/gi;
  if (!test.test(userinfo.value.name)) {
    // Toast.fail(t('overall.Non'));
    ElMessage.warning(t('overall.Non'))

  }
  // else if (!userinfo.value.introduction || userinfo.value.introduction.trim() == "") {
  //   Toast.fail('个人简介不能为空');
  // }
  else {
    modifyUserInfo({
      nickName: userinfo.value.name,
      description: userinfo.value.introduction,
      walletAddr: userinfo.value.hexAddress,
    }).then((res: any) => {
      if (res.nickName === userinfo.value.name) {
        Actions.getuserinfo({ hexAddress: userinfo.value.hexAddress }).then(
          (res: any) => {
            // ElMessage({
            //   message: `t('overall.Modification')`,
            //   type: 'success',
            // })
            ElMessage.success(t('overall.Modification'));

            nameType.value = false;
          }
        );
        Actions.getuserinfo({ hexAddress: userinfo.value.hexAddress })
        // ElMessage.success(t('overall.Modification'));

        back.value = setTimeout(() => {
          router.back();
        }, 1000)
      } else {
        ElMessage({
          message: t('overall.fail'),
          type: 'warning',
        })
      }
    })
  }
}
let back: any = ref(null)
// 取消按钮
const cancel = () => {
  nameType.value = false;
  nameValue.value = "";
};
const confirmname = () => {
  let test = /^[\u4e00-\u9fa5a-z\d_]{2,16}$/gi;
  if (!test.test(nameValue.value)) {
    // Toast.fail(t('overall.Non'));
    ElMessage.error(t('overall.Non'))
  } else {
    modifyUserInfo({
      nickName: nameValue.value,
      walletAddr: userinfo.value.hexAddress,
    }).then((res: any) => {
      if (res.nickName === nameValue.value) {
        Actions.getuserinfo({ hexAddress: userinfo.value.hexAddress }).then(
          (res: any) => {
            ElMessage.success(t('overall.Modification'));
            // ElMessage({
            //   message: `t('overall.Modification')`,
            //   type: 'success',
            // })
            nameValue.value = "";
            nameType.value = false;
          }
        );
      } else {
        // Toast.fail(t('overall.fail'));
        ElMessage.error(t('overall.fail'))
      }
    });
  }
};
// 格式化
const updateaddress = (address: string): string => {
  let newaddress = "";
  if (address) {
    newaddress =
      address.substring(0, 6) + "...." + address.substring(address.length - 4);
  }
  return newaddress;
};
// let test = /[a-zA-z0-9\u4e00-\u9fa5]{2,16}/
// if (!nameValue.value) return Toast.fail('请输入修改内存');
// if (!test.test(nameValue.value)) return  Toast.fail(t('overall.Non'));
// modifyUserInfo({ nickName: nameValue.value, walletAddr: userinfo.value.hexAddress }).then((res: any) => {
//     if (res.nickName === nameValue.value) {
//         Actions.getuserinfo({ hexAddress: userinfo.value.hexAddress }).then((res: any) => {
//             Toast.success('修改成功');
//             nameValue.value = '';
//             nameType.value = false;
//         })
//     } else {
//         Toast.fail('失败');
//     }
// })
// };

const language = locale.value === "CN" ? "中文" : "English";
let album = ref<HTMLInputElement | null>(null);

const camera = (type: string): void => {
  if (type === "xc") {
    album.value?.click();
    (album.value as HTMLInputElement).onchange = (e: any) => {
      if (e.target.files && e.target.files[0]) {
        setformData(e.target.files[0]);
      }
    };
  } else {
    // 不加capture属性的时候，会同时调用相册和相机。
    let fileType = "image/*"; //文件类型 TODO
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", fileType);
    input.setAttribute("capture", "camera");
    input.click();
    input.onchange = (e: any) => {
      if (e.target.files && e.target.files[0]) {
        setformData(e.target.files[0]);
      }
    };
  }
};

const setformData = (img_url: File) => {
  console.log(img_url,"img_url.type")

  let type = /jpg|png|gif|jpeg$/;
  let size = 1024 * 1024 * 1;
  if (img_url.size > size) return ElMessage.error(t('overall.imgSize'));
  // if (!type.test(img_url.type))
    // return ElMessage.error(t('overall.imgType'));
  let formData: FormData = new FormData();
  formData.append("file", img_url);
  uploadProfilePhotoForClient(formData).then((res: any) => {
    if (res.code === 200) {
      Actions.getuserinfo({ hexAddress: userinfo.value.hexAddress }).then(
        (res: any) => {
          ElMessage.success(t('overall.Modification'));
        }
      );
    } else {
      ElMessage.error(t('overall.fail'));
    }
  }).catch(e => {
    ElMessage.error(t('overall.fail'));
  })
};

const logout = (): void => {
  Actions.loginOut().then((res: any) => {
    onClickLeft();
  });
};
const onClickLeft = (): void => {
  router.go(-1);
  // router.push('/me/info');
};

const go = () => {
  router.push("/me/updatelanguage");
};
const goupdateintroduction = (): void => {
  router.push("/me/updateintroduction");
};

const themeVars = {
  popupBackgroundColor: "transparent",
  navBarTextColor: "white",
};
</script>
<style lang="scss" scoped>
// :deep(.el-textarea__inner) {
//   height: 0.68rem !important;
// }

@media screen and (min-width: 650px) {
  .editHeader {
    left: 50% !important;
    transform: translateX(-50%);
  }
}

.box {
  width: 4.2292rem;
  margin: 0 auto;
  // padding: .2135rem 0 .1979rem .7708rem;
  padding: .349rem 0 .8958rem 0;
  margin-top: 15.625vw;

  .title {
    font-size: .2083rem;
    color: #23262F;
    font-family: PingFang SC;
    font-weight: bold;

    img {
      width: .1406rem;
      height: .1406rem;
      margin-right: .0781rem;
    }
  }

  .form-box {
    margin-top: .4219rem;

    .form-title {
      color: #23262F;
      font-size: .0833rem;
      font-family: PingFang SC;
      font-weight: 500;
      padding-left: 1.042vw;
    }
    .head {
      display: flex;
      margin-top: .0573rem;
      margin-bottom: .1198rem;
      height: .4167rem;
      align-items: center;
      box-sizing: border-box;
      .head-img {
        width: .4167rem;
        height: .4167rem;
        border-radius: 50%;
      }
      .default-img {
        background-image: url("../../assets/img/defalt-head.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      .head-right {
        margin-left: .1823rem;

        p {
          font-size: .0833rem;
          color: #777E90;
          font-family: PingFang SC;
          font-weight: 500;
          // line-height: .1563rem;
          margin-bottom: .0729rem;
        }

        .head-btn {
          width: .7813rem;
          height: .25rem;
          font-size: .0833rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #fff;
          background-color: #3B82F6;
          border-radius: .0417rem;
        }
      }


    }

    .input-box {
      width: 100%;
      height: .25rem;
      border: 2px solid #EEF0F2;
      margin-top: .0573rem;

      input {
        width: 100%;
        height: 100%;
        padding-left: .0938rem;
        font-size: .0833rem;
        color: #353945;
        border: none;
        background-color: transparent;
      }
    }

    .tips {
      margin-top: .0677rem;
      font-size: .0833rem;
      color: #777E90;
      margin-bottom: .1146rem;
    }

    .text-box {
      margin-top: .0625rem;
      height: .8438rem;
      font-size: .0833rem;
    }

    .Submit {
      width: 1.349rem;
      height: .25rem;
      background-color: #3B82F6;
      color: #fff;
      font-size: .0833rem;
      text-align: center;
      line-height: .25rem;
      margin-top: .1458rem;
      cursor: pointer;
      border-radius: .0417rem;
    }
  }
}

:deep(.el-textarea__inner) {
  height: .8438rem;
  background-color: transparent;
  padding: .0885rem .099rem;
}

:deep(.el-textarea) {
  font-size: .0938rem;

}

.home {
  background-image: url("../../assets/img/topView.png");
  background-size: contain;
  background-repeat: no-repeat;
  
}
</style>
