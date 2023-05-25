<template>
  <div class="footer_line"></div>
  <div class="footer">
          <div class="footer-left">
              <div style="display:flex;align-items: center;">
                <svgIcon name="logo" class="logo_in"></svgIcon>
              </div>
              <div>{{$t('Home.introduce1')}}</div>
              <div style="width: 20.052vw; line-height: 1.042vw; margin-top: 0.104vw">{{$t('Home.introduce2')}}</div>
          </div>
          <div class="link">
            <div>
              <h5><a href="https://xflash.gitbook.io/flash/" target="_blank">{{$t('Home.Help1')}}</a></h5>
              <p><a href="https://xflash.gitbook.io/flash/5-kai-qi-jiao-yi" target="_blank">{{$t('Home.LimitedTrade')}}</a></p>
              <p><a href="https://xflash.gitbook.io/flash/8-sheng-tai-xi-tong" target="_blank">{{$t('Home.Ecosystem')}}</a></p>
              <p><a href="https://xflash.gitbook.io/flash/6-cheng-wei-he-zuo-huo-ban" target="_blank">{{$t('Home.Partnership')}}</a></p>
            </div>
          </div>
          <div class="link">
            <div>
              <h5><a href="/business">{{$t('Home.Marketplace')}}</a></h5>
              <p><a href="/browse">{{$t('Home.Explore')}}</a></p>
              <p><a href="/ino/Establish">{{$t('Home.LaunchPad')}}</a></p>
              <p><a href="/me/info">{{$t('Home.PersonalCenter')}}</a></p>
            </div>
          </div>
          <div>
            <div style="text-align: right;">

              <a class="aa1"  @click="opens('https://t.me/Xflashio')">
                <!-- home_icon.png -->
                <img class="footer-img tu1" src="@/assets/img/home_icon1.png"/>
                <img class="footer-img tu2" src="@/assets/img/home_icon.png"/>
              </a>
              <a class="aa2"  @click="opens('https://twitter.com/xflashio')">
                <img class="footer-img tu1" src="@/assets/img/home_icon66.png"/>
                <img class="footer-img tu2" src="@/assets/img/home_icon6.png"/>
              </a>
              <a class="aa3"  @click="opens('https://discord.gg/Ay3vUjBK')">
                <img class="footer-img tu1" src="@/assets/img/home_icon77.png"/>
                <img class="footer-img tu2" src="@/assets/img/home_icon7.png"/>
              </a>
              <a class="aa4" @click="opens('https://medium.com/@xflashio')">
                <img class="footer-img tu1" src="@/assets/img/home_icon88.png"/>
                <img class="footer-img tu2" src="@/assets/img/home_icon8.png"/>
              </a>
              <a class="aa5"  @click="opens('https://www.youtube.com/channel/UCMs2t3-m72wzU4tgtKVeMNQ')">
                <img class="footer-img tu1" src="@/assets/img/home_icon99.png"/>
                <img class="footer-img tu2" src="@/assets/img/home_icon9.png"/>
              </a>
              <a class="aa6" @click="opens('https://www.reddit.com/user/xflashio')">
                <img class="footer-img tu1" src="@/assets/img/home_1010.png" style='margin-right: 0px;'/>
                <img class="footer-img tu2" src="@/assets/img/home_10.png" style='margin-right: 0px;'/>
              </a>
              <!-- <a href="https://www.reddit.com/user/SuperSwapcool/">
                <img class="footer-img" src="@/assets/img/home-icon8.png"/>

              </a> -->
            </div>
          <div style="display: flex;flex-direction: column; margin-top: 1.042vw; align-items: flex-end;">
            <a href="https://xflash.gitbook.io/flash/">
            
            </a>
            <div style='color: #777E90;cursor: pointer;margin-bottom: 1.198vw; font-size:0.729vw;'>{{$t('Home.PrivacyPolicy')}}   <span style="margin-left: 0.521vw;">Copyright @2022 Flash</span> </div>
            <div @click="copy('hello@xflash.io')" style='color: #777E90;cursor: pointer; font-size:0.729vw;'>{{$t('Home.Contact')}}   <span style="margin-left: 0.521vw;">hello@xflash.io</span> </div>
          </div>

          </div>
        </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { copy } from "@/utils/copy";
const opens = (url: any) => {
    open(
          url
      );
};
</script>
<style scoped lang="scss">
.footer{
    width:66.667vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 2.604vw;
    padding-top: 2.604vw;
    >div{
      >div{
        >a{
          .tu2{
              display: none;
            }
        }
        .aa1:hover{
            .tu1{
              display: none;
            }
            .tu2{
              display:inline-block;
            }
          }
          .aa2:hover{
            .tu1{
              display: none;
            }
            .tu2{
              display:inline-block;
            }
          }
          .aa3:hover{
            .tu1{
              display: none;
            }
            .tu2{
              display:inline-block;
            }
          }
          .aa4:hover{
            .tu1{
              display: none;
            }
            .tu2{
              display:inline-block;
            }
          }
          .aa5:hover{
            .tu1{
              display: none;
            }
            .tu2{
              display:inline-block;
            }
          }
          .aa6:hover{
            .tu1{
              display: none;
            }
            .tu2{
              display:inline-block;
            }
          }
      }
    }
    .link{
      display: flex;
      >div{
        margin-right: 3.125vw;
        >h5{
        font-size: 0.833vw;
        font-weight: 500;
        color: #23262F;
        >a{
          font-size: 0.833vw;
          font-weight: 500;
          color: #23262F;
        }
      }
      >p{
        font-size: 0.729vw;
        font-weight: 500;
        color: #777E90;
        margin-top: 10px;
        >a{
          font-size: 0.729vw;
          font-weight: 500;
          color: #777E90;
          margin-top: 18px;
        }
      }
      }
    }
  &-left div:nth-child(1){
    font-size: 0.833vw;
    font-weight: 400;
    color: #23262F;
    .logo_in{
      width: 7.813vw;
      height: 2.865vw;
    }
  }
  &-left div:nth-child(2){
    font-size: 0.729vw;
    font-weight: 500;
    color: #777E90;
    padding-top: 0.938vw;
  }
  &-left div:nth-child(3){
    font-size: 0.729vw;
    font-weight: 500;
    color: #777E90;
  }
  &-img{
  width: 1.25vw;
  height: 1.042vw;
  object-fit: contain;
  margin-right: 0.781vw;
  cursor: pointer;
  }
  &-logo{
    width: 7.813vw;
    margin-right: 0.26vw;
    cursor: pointer;
  }
  &-text{
    text-align: center;
    font-size: 0.729vw;
    font-weight: 500;
    color: #777E90;
    display: flex;
    font-size: 14px;
    color: #23262F;
  span{
    padding-right: 1.042vw;
  }
  }
  &-text span:nth-child(2){
   padding-left: 0.521vw;

  }
}
.footer_line{
  width: 100%;
  height: 0.052vw;
  background: #EEF0F2;
}
</style>