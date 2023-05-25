<script setup>
import { ref, reactive, inject, toRefs, nextTick, defineEmits } from "vue";

const message = inject("$message");
const config = inject("$CONFIG");
const tool = inject("$TOOL");
const api = inject("$API");

const videoWidth = ref(200);
const videoHeight = ref(100);

const thisVideo = ref();
const thisVideoData = ref();

const show = ref(false);
const bigUrl = ref();
const emit = defineEmits(["showVideoDisabled"]);
const videoSrc = reactive([]);

const record = () => {
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
            let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error("此浏览器中未实现getUserMedia,不能调用摄像头"));
            }
            return new Promise((resolve, reject) => {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        };
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
            }
            return new Promise((resolve, reject) => {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        };
    }
    const constraints = {
        audio: false,
        video: {
            width: videoWidth.value,
            height: videoHeight.value,
            transform: "scaleX(-1)",
        },
    };
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            if ("srcObject" in thisVideo.value) {
                thisVideo.value.srcObject = stream;
            } else {
                // 避免在新的浏览器中使用它，新浏览器正在被弃用。没有开启摄像头权限或浏览器版本不兼容
                thisVideo.value.src = window.URL.createObjectURL(stream);
            }

            thisVideo.value.onloadedmetadata = (e) => {
                thisVideo.value.play();
            };

            // 录制视频窗口(这个窗口是录制视频时显示的窗口)
            thisVideo.value.srcObject = stream;
            thisVideo.value.play();
            startRecording(stream); //调用录制控件方法，触发开始录制
        })
        .catch((err) => {
            console.log('请开启摄像头');
            emit("showVideoDisabled");
        });
};

const videoCecorded = ref([]);
const mediaRecorderData = ref();
const startRecording = (stream) => {
    mediaRecorderData.value = new MediaRecorder(stream);

    mediaRecorderData.value.start();

    mediaRecorderData.value.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
            videoCecorded.value.push(e.data); //视频录制视频流数据
        }
    });

    mediaRecorderData.value.addEventListener("stop", () => {
        // console.log("暂停 自动下载");
        updata(); //上传实时录制的视频
    });

    mediaRecorderData.value.addEventListener("start", (e) => {
        // console.log("开始 录制");
    });
};

// 结束录制视频，触发基数录制视频事件
const stop = () => {
    if (mediaRecorderData.value) {
        mediaRecorderData.value.stop();
    }
};

// 上传录制视频方法，获取视频地址
const updata = () => {
    const blob = new Blob(videoCecorded.value, { type: "video/mp4" });
    const videoUrl = window.URL.createObjectURL(blob);

    var file = new File(videoCecorded.value, "video-" + new Date().toISOString().replace(/:|\./g, "-") + ".mp4", {
        type: "video/mp4",
    });

    let data = new FormData();
    data.append("file", file);
    videoSrc.push(videoUrl);
    //传后台
};

const closeClick = () => {
    show.value = !show.value;
};
//显示视频
const showVideo = (item) => {
    show.value = !show.value;
    bigUrl.value = item;
    console.log(bigUrl.value);
};
// 删除视频
const videoDelete = (index) => {
    videoSrc.splice(index, 1);
};

defineExpose({
    record,
    stop,
});
</script>
