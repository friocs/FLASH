<template>
    <teleport to="body">
        <div class="mask">
            <el-header class="go">
                <div class="box">
                    <video id="videoCamera" class="canvas" :width="videoWidth" :height="videoHeight" autoPlay></video>
                    <canvas id="canvasCamera" class="canvas" :width="videoWidth" :height="videoHeight"></canvas>
                </div>
                <div class="footer">
                    <p @click="getCompetence" icon="el-icon-video-camera"> 打开摄像头</p>
                    <p @click="drawImage" icon="el-icon-camera"> 拍照 </p>
                    <p @click="stopNavigator" icon="el-icon-switch-button"> 关闭摄像头 </p>
                    <p @click="resetCanvas" icon="el-icon-refresh"> 重置 </p>
                    <p @click="$emit('closed')" class="closeBtn">关闭</p>
                </div>
            </el-header>
        </div>
    </teleport>
</template>
<script setup>
import { ref, reactive, inject, toRefs, nextTick } from "vue";
const message = inject("$message");
const config = inject("$CONFIG");
const tool = inject("$TOOL");
const api = inject("$API");

const loading = ref(false);
const os = ref(false); //控制摄像头开关
let thisVideo = ref("");
let thisContext = ref("");
let thisCancas = ref("");
const videoWidth = ref(200);
const videoHeight = ref(200);
const postOptions = ref([]);
const certCtl = ref("");
const mask = ref(true);

//查询参数
const queryParams = reactive({
    pageNum: 1,
    pageSize: 10,
    imgSrc: undefined,
});
const closedPhono = ref(null);

const emit = defineEmits(["closed"]);
const props = defineProps({
    visible: { type: Boolean },
});
const { visible } = toRefs(props);
const handleChange = (val) => {
    console.log(visible);
};

//调用摄像头权限
const getCompetence = () => {
    nextTick(() => {
        os.value = false;
        thisCancas.value = document.getElementById("canvasCamera");
        thisContext.value = thisCancas.value.getContext("2d");
        thisVideo.value = document.getElementById("videoCamera");
        closedPhono.value = thisVideo;
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                // 首先获取现存的getUserMedia(如果存在)
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
                }
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        const constraints = {
            audio: false,
            video: { width: videoWidth.value, height: videoHeight.value, transform: "scaleX(-1)" },
        };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
                if ("srcObject" in thisVideo.value) {
                    thisVideo.value.srcObject = stream;
                } else {
                    thisVideo.value.src = window.URL.createObjectURL(stream);
                }
                thisVideo.value.onloadedmetadata = function (e) {
                    thisVideo.value.play();
                };
            })
            .catch((err) => {
                console.log('没有开启摄像头权限或浏览器版本不兼容');
            });
    });
};

//绘制图片
const drawImage = () => {
    getCompetence();
    thisCancas.value = document.getElementById("canvasCamera");
    thisContext.value = thisCancas.value.getContext("2d");
    thisVideo.value = document.getElementById("videoCamera");
    thisContext.value.drawImage(thisVideo.value, 0, 0, 300, 200);
    //获取图片地址
    console.log(thisCancas.value, thisVideo.value, thisContext.value);
    // 用于将canvas对象转换为base64位编码；
    queryParams.imgSrc = thisCancas.value.toDataURL('image/png');
    console.log(queryParams.imgSrc);
};

//清空画布
const clearCanvas = (id) => {
    let c = document.getElementById(id);
    let cxt = c.getContext("2d");
    cxt.clearRect(0, 0, 300, 200);

};

//重置画布
const resetCanvas = () => {
    queryParams.imgSrc = "";
    clearCanvas("canvasCamera");
};

//关闭摄像头
const stopNavigator = () => {
    // thisVideo = document.getElementById("videoCamera");
    if (closedPhono.value && closedPhono.value !== null) {
        thisVideo.value.srcObject.getTracks()[0].stop();
        os.value = true;
    } else {
        console.log('没有开启摄像头权限或浏览器版本不兼容');
    }
};
defineExpose({
    stopNavigator,
});
</script>
<style scoped>
.footer {
    width: 100%;
    height: 50px;
    background-color: white;
    justify-content: space-between;
}

.detailed {
    width: 1200px !important;
    height: 800px !important;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
}


.oText {
    margin-left: 42px;
}

.mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.closeBtn {
    float: right;
}

.box {
    width: 100%;
    height: 500px;
    margin-top: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    float: left !important;
}

.go {
    width: 100%;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
}
</style>