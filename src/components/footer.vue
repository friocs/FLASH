<template>
    <div>
      <!-- <div class="footer_line"></div> -->
      <div class="footer">
          <div class="footer-left">
              <div style="display:flex;align-items: center;">
                 <img class="footer-logo"  src="@/assets/img/logo_2.png"/>SuperSwap，Trade Anything Faster
              </div>
              <div>Copyright @2022 Superswap</div>
          </div>
          <div>
            <div style="text-align: right;">

             <a  @click="opens('https://t.me/MetaSuperSwap')">
               <img class="footer-img" src="@/assets/img/home_icon.png"/>
             </a>

             <a  @click="opens('https://twitter.com/superswapcool')">
               <img class="footer-img" src="@/assets/img/home_icon6.png"/>
             </a>

             <a  @click="opens('https://discord.gg/MatHReYX')">
               <img class="footer-img" src="@/assets/img/home_icon7.png"/>
             </a>

             <a @click="opens('https://medium.com/@superswap.cool')">
               <img class="footer-img" src="@/assets/img/home_icon8.png"/>

             </a>
             <a  @click="opens('https://youtu.be/HvLehAPUvPw')">
               <img class="footer-img" src="@/assets/img/home_icon9.png"/>

             </a>
             <a @click="opens('https://www.reddit.com/user/SuperSwapcool/')">
               <img class="footer-img" src="@/assets/img/home_10.png" style='margin-right: 0px;'/>

             </a>
             <!-- <a href="https://www.reddit.com/user/SuperSwapcool/">
               <img class="footer-img" src="@/assets/img/home-icon8.png"/>

             </a> -->
           </div>
          <div style="display: flex;align-items: center;">
            <a href="https://superswap.gitbook.io/superswap_cn/">
              <div class="footer-text">
                <span>{{ $t('Home.Help') }}</span>
             </div>
            </a>
            <div @click="copy('hello@xflash.io')" style='padding-top:18px;    color: #777E90;cursor: pointer;'>{{ $t('Home.Email') }} : hello@xflash.io </div>
          </div>

          </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  getCurrentInstance,
  onMounted,
  inject,
  onUnmounted,
  watch,
  onActivated
} from "vue";
import { copy } from "@/utils/copy";
const opens = (url: any) => {

  open(
        url
    );

};
</script>
<style scoped lang="scss">
.footer{
    width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
    padding-top: 50px;

  &-left div:nth-child(1){
    font-size: 24px;
    font-family: FZCuQian-M17S;
    font-weight: 400;
    color: #23262F;
  }
  &-left div:nth-child(2){
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #777E90;
    padding-top: 18px;
  }
  &-img{
  width: 24px;
  height: 20px;
  object-fit: contain;
  margin-right: 15px;
  cursor: pointer;
  }
  &-logo{
    width: 176px;
    margin-right: 5px;
    cursor: pointer;
  }
  &-text{
    text-align: center;
    padding-top: 18px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #777E90;
    display: flex;
  span{
    padding-right: 20px;
  }
  }
  &-text span:nth-child(2){
   padding-left: 10px;

  }
}
.footer_line{
  width: 100%;
  height: 1px;
  background: #EEF0F2;
}
</style>
