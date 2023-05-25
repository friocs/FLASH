<script setup>
import { ref, reactive, inject, nextTick, onMounted, onUnmounted } from "vue";
import Video from "@/components/Fit";
const videos = ref();
//录像是否禁用
const isVideoDisabled = ref(false);
const showVideoDisabled = () => {
  isVideoDisabled.value = true;
};
const videoBtnText = ref("开始录制");
const isRecord = ref(false);
const videoTape = () => {
  if (!isRecord.value) {
    isRecord.value = true;
    videoBtnText.value = "结束录制";
    videos.value.record();
  } else {
    isRecord.value = false;
    videoBtnText.value = "开始录制";
    videos.value.stop();
  }
};
</script>
<template>
  <el-button :plain="true" class="videotape" @click="videoTape" :disabled="isVideoDisabled">{{ videoBtnText }}
  </el-button>
  <Video ref="videos" @showVideoDisabled="showVideoDisabled" />
</template>