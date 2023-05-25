<template>
  <div class="max_box" >
    <search />
    <div class="headSlideshow" >
      <div class="bg" :style="{backgroundImage: `url(${imgs})`}">

      </div>
      <div class="content">
        <div   style="display:flex;align-items: stretch;justify-content: space-between;">
        <div style="display: flex;flex-direction: column;width: 55%;padding-top: 5.208vw" >
          <div class="index-title" v-if="name">  {{name}}</div>

          <div class="index-title" v-else> {{contractName}}</div>


          <div class="index-text">{{description}}</div>
          <div style="display: flex;">
                <div class="index-btn" style="margin-right:0.521vw;cursor: pointer;" @click="goBuy">{{$t('Home.jy')}}</div>
                <!-- <div class="index-btn btn" >出售</div> -->
          </div>
          <div class="index-list">
            <div class="index-leftItem" style="border-right: 0.052vw solid #EBEEF2;padding-left: 0vw;" >
              <div>{{ $t('Home.floorPrice') }}(ETC)
              </div>
              <div>{{minPrice?numFilters(minPrice) : "--"}}</div>
              <!-- <div>24小时</div> -->
            </div>
            <div class="index-leftItem" style="border-right: 0.052vw solid #EBEEF2;" >
              <div>{{ $t('Home.highestOffer') }}(ETC)</div>
              <div>{{maxPrice?numFilters(maxPrice) : "--"}}</div>
              <!-- <div>24小时</div> -->
            </div>
            <div class="index-leftItem">
              <div>{{ $t('Home.gross') }}</div>
              <div class="spn">{{Total?numFilters(Total):'--'}}</div>
            </div>
          </div>
        </div>

      <div>
        <div style="margin-top:5.208vw;margin-right: 0.521vw;">
          <div class="block text-center">
          <span class="demonstration"
            ></span
          >
          <el-carousel height="19.792vw" interval="300000"  @change="carousel">
            <el-carousel-item  v-for="(item, index) in bannerList"  :key="index" @click="go(item.contractAddr)">
              <img :src=item.image height="380"   style="height:19.792vw"/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="index-carouseFooter" v-if="name">
        {{name}}<span>({{contractName}})</span>

        <img  v-if="isAuth==2" class="index-popularIcon_1"  src='@/assets/img/iconNew.png' style='position: relative;top: 0.104vw;'/>
      </div>
      <div class="index-carouseFooter"  v-else>
       <span> {{contractName}}</span>

        <img  v-if="isAuth==2" class="index-popularIcon_1"  src='@/assets/img/iconNew.png' style='position: relative;top: 0.104vw;'/>
      </div>
      </div>
        </div>
        <div class="issue">
        <h5>{{$t('Home.issue')}} <svgIcon name="bnb" class="bnb_icon"></svgIcon></h5>
        <div class="introduce"><p>{{$t('Home.fast')}}</p> <div @click="toLauchPad">LaunchPad <img src="../../assets/img/xx.png" alt=""></div></div>
        <div class="lists">
           <div>
            <img src="../../assets/img/list1.png" alt="">
            <p>{{$t('Home.p1')}}</p>
           </div>
           <!-- <img src="../../assets/img/qu.png" alt=""> -->
           <svgIcon name="arrows" class="arrows_icon"></svgIcon>
           <div>
            <img src="../../assets/img/list2.png" alt="">
            <p>{{$t('Home.p2')}}</p>
           </div>
           <!-- <img src="../../assets/img/qu.png" alt=""> -->
           <svgIcon name="arrows" class="arrows_icon"></svgIcon>
           <div>
            <img src="../../assets/img/list3.png" alt="">
            <p>{{$t('Home.p3')}}</p>
           </div>
        </div>
        </div>
      </div>
      
    </div>
     <div class="index">
     
    
      <div class="index-popular" id="popular"> {{ $t('Home.popular') }}</div>
      <div class="index-list list_2">
        <swiper
      :slidesPerView="4"
      :spaceBetween="8"
      :slidesPerGroup="1"
      :loop="true"
      :loopFillGroupWithBlank="true"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide  v-for="(item,index) in popularlist"   :key="index" @click="go(item.contractAddr)">
          <div class="index-popularItem"  >
                    <div class="tu">
                      <img class="index-popularImg"  v-if="item.topImage" :src="item.topImage"/>
                      <img class="index-popularImg"  v-else src="@/assets/img/default_img.png"/>
                    </div>
                    <div style="display: flex;align-items: center;    padding: 0.26vw 1.042vw 0vw;">
                        <div class="index-popularName" v-if="item.name"> {{item.name || '--'}}</div>
                        <div class="index-popularName" v-else> {{item.contractName || '--'}}</div>

                        <img  class="index-popularIcon_1" v-show="item.isAuth == 2"  src='@/assets/img/iconNew.png'/>
                    </div>
                    <div style="display:flex;align-items: center;padding: 0.26vw 1.042vw 0vw;">
                        <div class="index-popularFooter" style="padding-right:1.563vw">
                            <div>{{ $t('Home.floorPrice') }}  </div>
                            <div>
                              <img src='@/assets/img/WBNB.png' style="position: relative; width:0.833vw; height:0.833vw; top: 0.104vw;"/>
                                {{ item.minPrice?numFilters(item.minPrice) : "--" }}</div>
                        </div>
                        <div class="index-popularFooter" style="padding-right:1.563vw">
                          <div>{{ $t('Home.highestOffer') }}

                          </div>
                            <div> <img src='@/assets/img/WBNB.png' style='position: relative; top: 0.104vw; width:0.833vw; height:0.833vw; right: 0.104vw;'/>{{ item.maxPrice?numFilters(item.maxPrice) :"--" }}</div>
                        </div>
                        <div class="index-popularFooter" style="padding-right:1.042vw">
                          <div>{{ $t('Home.gross') }}</div>
                          <div class="index-popularSpan">{{ item.changeCount?numFilters(item.changeCount):'--' }}</div>
                        </div>
                    </div>

                  </div>
                 
      </swiper-slide>
      
        </swiper>
    
  <!-- <div class="swiper-button-prev swiper_btn" style="left:-60px; top:40%; color: #777e90;"></div>
  <div class="swiper-button-next swiper_btn" style="right:-60px; top:40%; color: #777e90;"></div> -->
      </div>
 
      <div class="index-popular"> {{ $t('Home.Dataranking') }}</div>
      <div class="sol">
        <homTable :data="tableData" @getNftTopList="getNftTopList" @param="param"></homTable>
      </div>
      <!-- <div style="display:flex;justify-content: center ; margin-top: 40px;">
        <div class="more" @click="goRankinglist" v-if="tableData.length<50">{{ $t('overall.more') }} </div>
      </div> -->
     </div>
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

  </div>




</template>

<script setup lang="ts">

import { onMounted, getCurrentInstance, reactive, ref, computed, onUnmounted, watch ,nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

import "swiper/css/pagination";
import "swiper/css/navigation";
import {  Navigation } from "swiper";
import { useRoute, useRouter } from "vue-router";
import { nftType } from "@/utils/type";
import { useI18n } from "vue-i18n";
import search from "@/components/search.vue";
import homTable from "@/components/homTable.vue";
import { copy } from "@/utils/copy";

import {getPath} from '@/utils'

import Decimal from "decimal.js"
import { getBannerList, getNftTop, popular } from "@/api/home";
import numFilters from '@/hooks/userNumFilters'
import Rankinglist from "@/components/Rankinglist.vue";
const modules = [ Navigation];
  const tableData = ref<any[]>([]);
  const top = ref<any[]>([]);

// import 'swiper/css/swiper.min.css';

const router = useRouter();
const nft_list = reactive<nftType[]>([
  {
    id: 1,
    name: "cs",
    img: getPath("@/assets/img/nft1.png"),
    logo: getPath("@/assets/img/nft1.png"),
    type: true,
  },
  { id: 132, name: "cs32", img: getPath("@/assets/img/nft1.png") },
]);
const nft_list2 = reactive([
  getPath("@/assets/img/nft1.png"),
  getPath("@/assets/img/nft1.png"),
  getPath("@/assets/img/nft1.png"),
]);
const nft_list3 = reactive<nftType[]>([
  {
    id: 1,
    name: "cs",
    img: getPath("@/assets/img/nft1.png"),
    logo: getPath("@/assets/img/nft1.png"),
    type: true,
  },
  { id: 12, name: "cs2", img: getPath("@/assets/img/nft1.png") },
  { id: 132, name: "cs32", img: getPath("@/assets/img/nft1.png") },
]);
// const bannerList = ref<bannerListType[]>([]);
const TopList = ref<any[]>([{ no: "-" }, { no: "-" }, { no: "-" }]);
const isActive = ref(true);
const { locale } = useI18n();
const Language_switching = (val: string) => {
  locale.value = val; // 切换
  localStorage.setItem("locale", val);
};
const popularlist = ref<any>("");
const bannerName = ref<any>("");
const adddress = ref<any>("");
const asc = ref<any>("");
const imgs = ref<any>("")
const minPrice = ref<any>(""); //地板价
const differenceRatio= ref<any>("");
const maxPrice = ref<any>(""); //最高价
const description = ref<any>(""); //最高价
const contractName= ref<any>(""); //系列名称
 const name = ref<any>(""); //系列名称
 const Total = ref<any>("");
  const isAuth= ref<any>("");
  const seachData = reactive({
    description:'',
    isAuth:''
  })

const bannerList = ref<any>("");
const NewList = ref<any[]>([{ no: "-" }, { no: "-" }, { no: "-" }]);;

const TopListType = ref(false);

const opens = (url: any) => {

  open(
        url
    );

};
const route = useRoute();
onMounted(() => {
  getDate(1)
  popular().then((res: any) => {
     popularlist.value = res;
     
     getNftTopList()
  })
})
const param=(val:any)=>{

  getNftTopList_1(val)
}
const getNftTopList_1=(param:any)=>{


  getNftTop(param).then(async (res: any) => {
       top.value =res;
       tableData.value =top.value.slice(0, 50);
  })
}
const getNftTopList=(param:any)=>{
  getNftTop(param).then(async (res: any) => {
       top.value =res;
       tableData.value =top.value.slice(0, 10);
  })
}
const getDate = (val:any) => {

  getBannerList({ isCheck: val }).then((res: any) => {
     bannerList.value = res.rows;
     bannerName.value=bannerList.value [0].name
     Total.value = bannerList.value [0].changeCount
     adddress.value=bannerList.value [0].contractAddr
     minPrice.value=bannerList.value [0].minPrice
     maxPrice.value=bannerList.value [0].maxPrice
     differenceRatio.value=bannerList.value [0].differenceRatio
     description.value=bannerList.value[0].nftContractVO.description
     imgs.value = bannerList.value [0].image
     name.value=bannerList.value[0].nftContractVO.name
     contractName.value=bannerList.value[0].nftContractVO.contractName
     isAuth.value=bannerList.value[0].nftContractVO.isAuth

  });
}

const carousel= (val:any) => {
  bannerName.value=bannerList.value [val].name
  adddress.value=bannerList.value [val].contractAddr
  minPrice.value=bannerList.value [val].minPrice
  maxPrice.value=bannerList.value [val].maxPrice
  imgs.value = bannerList.value [val].image
  Total.value = bannerList.value [val].changeCount
  differenceRatio.value=bannerList.value [val].differenceRatio

  if(bannerList.value[val].nftContractVO!==null){
    contractName.value=bannerList.value[val].nftContractVO.contractName
    description.value= bannerList.value[val].nftContractVO.description
    name.value=bannerList.value[val].nftContractVO.name
    isAuth.value=bannerList.value[val].nftContractVO.isAuth
  }else{
    description.value= ''
    contractName.value=''
    name.value=''
    isAuth.value=''
  }
  }
const goRankinglist = () => {
  tableData.value =top.value.slice(0, 50);
};
const go = (address: string) => {
  if (!address) return
  router.push("/business?searchKey=" + address);
};
const goBuy= () => {
  if (!adddress.value) return
  router.push("/business?searchKey=" + adddress.value);
}
const toLauchPad= ()=>{
  router.push("/ino/Establish");
}
</script>


<style scoped lang="scss">
  .index{
    font-family: Poppins-Light !important;
    margin: 0 auto;
    >div{
      width: 66.667vw;
      margin: 0 auto;
    }
    
    //  margin-right: 100px;
    &-title{
      color: #101010;
      font-size: 2.5vw;
      // font-weight: 600;
      margin-top: 3.802vw;
      width: 30vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }
    &-text{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      width:23.438vw;
      font-size:0.729vw;
      padding-top: 1.042vw;
      font-weight: 400;
      line-height: 1.042vw;
      height: 3.3vw;
    }
    &-popular{
      color: #23262F;
      font-size:1.667vw;
      text-align: left;
      padding-top: 3.906vw;
      margin-bottom: 3.125vw !important;
    }
    .sol{
      margin-bottom: 3.125vw;
    }
    &-list{
      display: flex;
      width: 101%;
      margin-top: 1.823vw;
      position: relative;
      :deep(.swiper-slide){
        width: 15.938vw !important;
        height: 15.938vw !important;
        margin: 0.4vw !important;
        border-radius: 0.417vw;
        cursor: pointer;
      }
      :deep(.swiper-slide:hover){
        box-shadow:0px 1px 9px 1px #8399ef !important;
        .index-popularItem{
          border:none !important;
        }
      }
    }
    &-btn{
      border-radius: 0.417vw;
      color: rgba(255, 255, 255, 1);
      font-size: 1.042vw;
      width: 25%;
      height: 2.5vw;
      text-align: center;
      line-height: 2.5vw;
      background: #3B82F6;
      margin-top: 1.563vw;
    }
    &-btn:hover{
      background: #3743DB;
    }
    .btn{
      background-color: rgba(255, 255, 255, 1);
      border: 1px solid #000;
      color: #000

    }
      &-item{
        // width: 60%;
        background: #101010;
        height:11.198vw;
        border-radius: 0.521vw;
        margin-right: 0.417vw;
          display: flex;
        flex-direction: column;
        margin-top: 1.823vw;
        padding-top: 1.563vw;
      }
      &-img{
        width: 2.604vw;
        position: absolute;
        left: 41%;
        right: 0px;
        top: -1.042vw;
        border-radius: 50%;
      }
    &-icon{
        width: 0.938vw;
        height: 0.938vw;
        background: #1194ff;
        position: absolute;
        top: 1.563vw;

    }
    &-name{
        color: rgba(255, 255, 255, 1);
        font-size:.075rem;
        -webkit-box-orient: vertical;
        word-break: break-all;
        width: 10.417vw;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-bottom: 1.042vw;
        margin-top: 0.521vw;
    }
    &-line{
      width: 4.896vw;
      height: 0.417vw;
      border-top: 1px solid #1684FC;
      //  border-right: 1px solid #1684FC;
      border-left: 1px solid #1684FC;
      background-color: #101010;
      margin-top: 0.26vw;
    }

    &-percentage{
      color: rgba(22, 132, 252, 1);
      font-size: 0.625vw;
      padding-left: 0.521vw;
      padding-right: 0.521vw;
      position: relative;
      top: -0.104vw;
    }
    .line2{
      width:4.896vw;
      height: 0.417vw;
      border-top: 0.052vw solid #1684FC;
      border-right: 0.052vw solid #1684FC;
      border-left:0px;
      background-color: #101010;
    }
    &-icon2{
      width: 0.781vw;
      height: 0.781vw;
    }
    &-num{
      padding-left: 1.042vw;
    }
    &-spn{
      padding-right: 1.563vw;
      color: rgba(255, 255, 255, 1);
      font-size:.075rem;
      padding-left: 0.156vw;
    }

    &-carouseFooter{
        width:26.042vw;
        height: 2.865vw;
        background: #FFFFFF;
        border-radius: 0vw 0vw 0.417vw 0.417vw;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        font-size: 1.042vw;
        padding-left: 1.875vw;
        // font-weight: bold;
        color: #000004;
        line-height: 2.865vw;
        // width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    &-list{
      display: flex;
    }

    &-leftItem{
     padding-right: .1875rem;
     padding-left: .1875rem;
    .spn{
      background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    }
    &-leftItem div:nth-child(1){
        font-size: 0.677vw;
        font-weight: 500;
        color: #777E90;
    }
    &-leftItem div:nth-child(2){
      font-size: 1.667vw;
      font-weight: bold;
      color: #353945;
    }
    &-leftItem div:nth-child(3){
      font-size: 0.625vw;
      font-weight: 500;
      color: #C3C7D4;
    }
    &-popularImg{
     
    }

    &-popularItem{
      height: 15.938vw;
      box-sizing: border-box;
      position: relative;
      border-radius: 0.521vw;
      border: 1px solid #EEF0F2;
      box-sizing: border-box;
      .tu{
        width: 100%;
        height: 11.302vw;
        border-top-left-radius: 0.417vw;
        border-top-right-radius: 0.417vw;
        overflow: hidden;
        >img{
          width: 100%;
          height: 11.302vw;
          // border-radius: 8px;
          object-fit: cover;
          
        }
      }
    }
    &-popularItem{
      .index-popularImg:hover{
        transform: scale(1.1);
      }
    }
    &-popularLogo{
      width: 3.021vw;
      height: 3.021vw;
      background: #3772FF;
      border-radius: 50%;
      border: 0.156vw solid #fff;
    }
    &-popularIcon{
      position: absolute;
    /* left: 118px; */
    right: 0.521vw;
    bottom:1.979vw;
    }
    &-popularIcon_1{
      width: 0.833vw;
      height: 0.833vw;
      margin-top: 0.26vw;
      position: relative;
      top: -0.104vw;
    }
    &-popularName{
      font-size: 0.938vw;
      font-weight: bold;
      color: #000004;
      padding-right: 0.26vw;
      white-space: nowrap;
      // width: .9375rem;
    overflow: hidden;
    text-overflow: ellipsis;
    }
    &-popularFooter  div:nth-child(1){
      font-size: 0.677vw;
      font-weight: 500;
      color: #777E90;
    }
    &-popularFooter  div:nth-child(2){
      font-size: 0.729vw;
      font-weight: bold;
      padding-top: 0.26vw;
      color: #353945;
    }
    &-popularSpan{
      background: linear-gradient(62deg, #3772FF 0%, #9757D7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 0.729vw;
      font-weight: bold;
      color: #353945;

    }
  }
  .headSlideshow{
    display: flex;
    justify-content: center;
    position: relative;
    height: 50vw;
    >div{
      width: 66.667vw;
      margin: 0 auto;
    }
    .issue{
      margin-top:3.646vw;
      margin-bottom: 3.646vw;
      h5{
        font-size: 1.667vw;
        display:flex;
        align-items: center;
        font-weight:400;
        color: #101010;
        >img{
          margin-left: 0.521vw;
        }
        .bnb_icon{
          margin-left: 5px;
          width: 25px;
          height: 25px;
        }
      }
      .introduce{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.083vw;
          >p{
            font-size: 1.25vw;
            color: #101010;
          }
          >div{
            width: 7.813vw;
            height: 2.5vw;
            text-align: center;
            line-height: 2.5vw;
            background: #3B82F6;
            border-radius: 0.417vw;
            font-size: 0.938vw;
            font-weight: bold;
            color: #FFFFFF;
            cursor: pointer;
            background: linear-gradient(to right, #3772ff, #9757d7);
            >img{
              width: 1.042vw;
            }

          }
          >div:hover{
            box-shadow:0px 1px 9px 1px #a09f9f;
          }
        }
        .lists{
          display:flex;
          align-items: center;
          justify-content: space-between;
          .arrows_icon{
            width: 1.563vw;
            height: 1.563vw;
          }
          >div{
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
              width: 17.708vw;
            }
            >p{
              font-size: 0.938vw;
              font-weight: bold;
              color: #101010;
            }
          }
        }
    }
    .bg{
      position:absolute;
      z-index: 1;
      width: 100%;
      height: 50vw;
      filter: blur(72px);
      opacity: 0.2;
    }
    .content{
      z-index: 20;
      position: absolute;
    }
  }
  // 表格
  .table{
      margin-top: 2.083vw;
      &-flex{

      }
      &-img{
        width: 2.083vw;
        height: 2.083vw;
        border-radius: 50%;
        object-fit: contain;
      }
      &-name{
         color: rgba(16, 16, 16, 1);
         font-size: 0.521vw;
         font-weight: 600;
      }
      &-flex{
        display: flex;
        align-items: center;
      }
      &-name{
        color: rgba(16, 16, 16, 1);
        font-size: 0.833vw;
        padding-left: 0.156vw;
      }

      .name{
        font-weight: 500;
      }

  }
  .more{
        background-color: rgba(244, 247, 249, 1);
        font-size: 0.833vw;
        font-weight: bold;
        color: #353945;
        // padding: 34px 0px 34px 0px;
        cursor: pointer;
        width: 5.208vw;
        height: 2.5vw;
        border: 1px solid #EEF0F2;
        border-radius: 0.417vw;
        text-align: center;
        line-height: 2.5vw;
        margin-bottom: 1.563vw;
      }
      .more:hover{
        background: #23262F;
        color: #fff;
      }

      .list_2{
        // overflow-x: auto;
        width: 77.083vw !important;
        position: relative;
        padding: 0 5.208vw;
        .mySwiper{
          position:initial;
        }
        :deep(.swiper-button-prev){
          color: #777e90;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          left: 30px;
        }
        :deep(.swiper-button-next){
          color: #777e90;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          right:30px;
        }
        :deep(.swiper-button-prev:after){
          font-size: 25px;
        }
        :deep(.swiper-button-prev:hover){
          background-color: #cccc;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #2b2f33;
        }
        :deep(.swiper-button-next:after){
          font-size: 25px;
        }
        :deep(.swiper-button-next:hover){
          background-color: #cccc;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #2b2f33;
        }
      }
  //     @media screen and (min-width: 1140px){
  //   .index{
  //     padding: 0px 100px 0px 100px;
  //   }

  // }
  // @media screen and (min-width: 1280px){
  //   .index{
  //     padding: 0px 100px 0px 100px;
  //   }

  // }
  // @media screen and (min-width: 1366px){
  //   .index{
  //     padding: 0px 100px 0px 100px;
  //   }

  // }
  // @media screen and (min-width: 1400px){
  //   .index{
  //     padding: 0px 100px 0px 100px;
  //   }
  // }
  // @media screen and (min-width: 1680px){
  //   .index{
  //     padding: 0px 300px 0px 300px;
  //   }

  // }
  // @media screen and (min-width: 1920px){
  //   .index{
  //     padding: 0px 300px 0px 380px;
  //   }

  // }
</style>
<style lang="scss">
.swiper-backface-hidden .swiper-slide{
  // margin-left: 10px;
  overflow: hidden;
}
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 1.042vw;
    line-height: 7.813vw;
    text-align: center;
    background-color: #39a9ed;
      }
      .demonstration {
      color: var(--el-text-color-secondary);
    }

    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 7.813vw;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item{
      img{
        width: 100%;
        object-fit: cover;
      }

    }
    .el-carousel--horizontal{
        width: 26.042vw !important;
        border-top-left-radius: 0.521vw !important;
        border-top-right-radius: 0.521vw !important;
        border-bottom-right-radius: 0vw !important;
        border-bottom-left-radius: 0vw !important;

      //  border-bottom-right-radius:0px !important ;
      }

    .el-carousel__item:nth-child(2n + 1) {
      // background-color: #d3dce6;
    }
    .el-carousel--horizontal{
      width: 34.792vw;
      border-radius: 1.042vw;
    }

    .cell{
      color: rgba(131, 139, 160, 1);
    }
    .index {
      // .el-table, .el-table__expanded-cell {background-color: #fff !important;}
      // .el-table th, .el-table tr, .el-table td {background-color: #fff !important;cursor: pointer;}
    }


    .max_box{
      background: #fff;
      background: url() no-repeat;
      background-size: 100% 100%;
      background-size: contain;
   
     }
   .swiper-slide{
      // width: 20% !important;
   }
  //  .swiper-button-prev{
  //   color: #fff;
  //   font-weight: 600;
  //  }
  //  .swiper-button-next{
  //   color: #fff;
  //   font-weight: 600;
  //  }

   .wrapper{

   }

   .index .el-table__row{
    height: 3.646vw !important;
   }
   .el-table__row:hover{
    cursor: pointer;
   }
//    .swiper-button-prev:after{
//     display: none;
// }
// .swiper-button-next:after{
//     display: none;
// }
// .swiper-button-prev{
//     width: 70px;
//     height: 70px;
//     background: url('https://www.element.market/build/angle-left-ed7861fe.svg') no-repeat;
// }
// .swiper-button-next{
//     width: 70px;
//     height: 70px;
//     background:url('https://www.element.market/build/angle-left-ed7861fe.svg') no-repeat;
// }
  /*滚动条样式*/
  ::-webkit-scrollbar {
          width: 0.365vw;
          height: 0.365vw;
        }
        ::-webkit-scrollbar-thumb {
           border-radius: 0.521vw;
           background: #C3C7D4;
           opacity: 0.2;

        }
        ::-webkit-scrollbar-track {
            // background: #C3C7D4;
            //  opacity: 0.2;
             background: rgba(0,0,0,0.1);
            border-radius: 0.521vw;



        }
        ::-webkit-scrollbar-track-piece{

        }
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
