<template>
  <div>
    <p @click="camera">调用摄像</p>
    <van-uploader :after-read="afterRead" accept="image/*" />
  </div>
</template>
 
<script setup lang="ts" >
import { onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any;
declare let window: any;
const camera = () => {
  proxy.$plusExtends(() => {
    console.log(456);
    var cmr = window.plus.camera.getCamera();
    cmr.captureImage((path: any) => {
      alert(path)
    })
  })
}

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  alert(file)
  console.log(file);
};


</script>
<style scoped  lang="scss">
.pic {
  width: 200px;
  height: 200px;
}
</style>