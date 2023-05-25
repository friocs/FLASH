<template>
  <search />
  <!-- <p class="Popular">{{ $t('Home.Popular') }}</p> -->
  <!-- <div class="Popularlist">
        <div v-for="item in nft_list" :key="item.id" @click="go">
            <van-image width="100%" height="100%" :src="item.img" />
            <div class="content">
                <div>
                    <van-image style="position:absolute;bottom: 0.7rem;left: 0.2rem;" round width="15%" height="100%"
                        :src="getPath('@/assets/img/nft1.png')" />
                    <div class="title">Azuki</div>
                </div>
                <div>
                    <div>
                        <van-image width="20%" height="65%" :src="getPath('@/assets/img/WBNB.png')" />2.95
                    </div>
                    <div>{{ $t('Home.Floorprice') }}</div>
                </div>
                <div>
                    <div>
                        <van-image width="20%" height="65%" :src="getPath('@/assets/img/WBNB.png')" />2.95
                    </div>
                    <div>{{ $t('Home.Highestquotation') }}</div>
                </div>
                <div>
                    <div>
                        <van-image width="20%" height="65%" :src="getPath('@/assets/img/WBNB.png')" />2.95
                    </div>
                    <div>{{ $t('Home.Transactionvolume') }}</div>
                </div>
                <div>
                    <div>
                        <van-image width="20%" height="65%" :src="getPath('@/assets/img/WBNB.png')" />2.95
                    </div>
                    <div>{{ $t('Home.Cumulativetotalprice') }}</div>
                </div>
            </div>
        </div>
    </div> -->
   <div class="index">
     <div style="display:flex">
      <div>
        <div class="index-title">Melody NFT</div>
        <div class="index-text">Application based on BSC chain which completely combines Game-Fi  and Social-Fi...</div>
        <div style="display: flex;margin-top: 46px;">
              <div class="index-btn" style="margin-right:10px">购买</div>
              <div class="index-btn btn" >出售</div>
        </div>
      </div>
      
    
      <div style="margin-top:40px;margin-right: 10px;">
        <div class="block text-center">
        <span class="demonstration"
          ></span
        >
        <el-carousel height="350px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
  
      </div>
    </div>
    <div class="index-popular"> 时下流行</div>
    <div class="index-list">
      <div class="index-item">
           <div style="  position: relative;top: -25px;">
               <div style="position: relative;display:flex;flex-direction: column;align-items: center;">
                  <img class="index-img" src="../../assets/img/Defaultavatar.png"/>
                  <img class="index-icon" src="../../assets/img/wallet.png"/>
                  <div class="index-name">Azsw</div>
               </div>
               <div style="display:flex;align-items: center;margin-top: 10px;align-items: center;justify-content: center;">
                 <div class="index-line"></div>
                 <div class="index-percentage">1212</div>
                 <div class="index-line line2"></div>
               </div>
               <div style="display: flex;justify-content: space-between;padding-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between">
                  <div class="index-num">
                  
                    <span class="index-spn">地板价</span>
                  </div>
                  <div >
                    <span class="index-spn">最高报价</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">累计总价</span>
                  </div>
                  <div >
                    <span class="index-spn">交易总量</span>
                  </div>
                  
                  
               </div>
              </div>
      </div>
      <div class="index-item">
           <div style="  position: relative;top: -25px;">
               <div style="position: relative;display:flex;flex-direction: column;align-items: center;;">
                  <img class="index-img" src="../../assets/img/Defaultavatar.png"/>
                  <img class="index-icon" src="../../assets/img/wallet.png"/>
                  <div class="index-name">Azsw</div>
               </div>
               <div style="display:flex;align-items: center;margin-top: 10px;align-items: center;justify-content: center;">
                 <div class="index-line"></div>
                 <div class="index-percentage">1212</div>
                 <div class="index-line line2"></div>
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">地板价</span>
                  </div>
                  <div >
                    <span class="index-spn">最高报价</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">累计总价</span>
                  </div>
                  <div >
                    <span class="index-spn">交易总量</span>
                  </div>
                  
                  
               </div>
              </div>
      </div>
      <div class="index-item">
           <div style="  position: relative;top: -25px;">
               <div style="position: relative;display:flex;flex-direction: column;align-items: center;;">
                  <img class="index-img" src="../../assets/img/Defaultavatar.png"/>
                  <img class="index-icon" src="../../assets/img/wallet.png"/>
                  <div class="index-name">Azsw</div>
               </div>
               <div style="display:flex;align-items: center;margin-top: 10px;align-items: center;justify-content: center;">
                 <div class="index-line"></div>
                 <div class="index-percentage">1212</div>
                 <div class="index-line line2"></div>
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">地板价</span>
                  </div>
                  <div >
                    <span class="index-spn">最高报价</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">累计总价</span>
                  </div>
                  <div >
                    <span class="index-spn">交易总量</span>
                  </div>
                  
                  
               </div>
              </div>
      </div>
      <div class="index-item">
           <div style="  position: relative;top: -25px;">
               <div style="position: relative;display:flex;flex-direction: column;align-items: center;;">
                  <img class="index-img" src="../../assets/img/Defaultavatar.png"/>
                  <img class="index-icon" src="../../assets/img/wallet.png"/>
                  <div class="index-name">Azsw</div>
               </div>
               <div style="display:flex;align-items: center;margin-top: 10px;align-items: center;justify-content: center;">
                 <div class="index-line"></div>
                 <div class="index-percentage">1212</div>
                 <div class="index-line line2"></div>
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">地板价</span>
                  </div>
                  <div >
                    <span class="index-spn">最高报价</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">累计总价</span>
                  </div>
                  <div >
                    <span class="index-spn">交易总量</span>
                  </div>
                  
                  
               </div>
              </div>
      </div>
      <div class="index-item">
           <div style="  position: relative;top: -25px;">
               <div style="position: relative;display:flex;flex-direction: column;align-items: center;;">
                  <img class="index-img" src="../../assets/img/Defaultavatar.png"/>
                  <img class="index-icon" src="../../assets/img/wallet.png"/>
                  <div class="index-name">Azsw</div>
               </div>
               <div style="display:flex;align-items: center;margin-top: 10px;align-items: center;justify-content: center;">
                 <div class="index-line"></div>
                 <div class="index-percentage">1212</div>
                 <div class="index-line line2"></div>
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">地板价</span>
                  </div>
                  <div >
                    <span class="index-spn">最高报价</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;margin-top: 5px;">
                  <div class="index-num">
                    <img  class="index-icon2"  src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  <div >
                    <img  class="index-icon2" src="../../assets/img/Defaultavatar.png"/>
                    <span class="index-spn">265</span>
                  </div>
                  
                  
               </div>
               <div style="display: flex;justify-content: space-between;">
                  <div class="index-num">
                  
                    <span class="index-spn">累计总价</span>
                  </div>
                  <div >
                    <span class="index-spn">交易总量</span>
                  </div>
                  
                  
               </div>
              </div>
      </div>
            <div class="swiper-button-prev swp2" style="    width: 50px;
    height: 50px;
    background: red;"></div>
            <div class="swiper-button-next swp2"></div>
    </div>
    <div class="index-popular"> 实时数据追踪</div>
    <div  class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="#" width="">
          <template #default="scope">
            <div class="table-flex">
               <div class="table-name name">{{scope.row.date}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="系列名称" width="" >
          <template #default="scope">
            <div class="table-flex">
               <img class="table-img" src="../../assets/img/Defaultavatar.png"/>
               <div class="table-name">{{scope.row.name}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="num" label="地板价" >
          <template #default="scope">
            <div class="table-flex">
              <img width="20" height="20"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA19JREFUSEvFl0lv00AUx/+vTk2TSXFKSUHc+ALcESCaUhpoQXAp8CUoJxaJC03ZL8AdTmxiuSBBiaGiB/YiwYUrSAghoEXUbm2T2EkGjRtHrpM2dlnqo/3m/Wb+b5lnwhKfaZVdIlCbUjaGqB/FqG4o6gJhrz1iR8BxEkArQKcU3cjRPthRfEUGayo7DODUHNR7osMjgTWVHQOQmw+twjmdVmaM4bAnDw2uQkcAxBaR9IxSNofDxDwUWMuzoyA3potBvf2cVcrmiWbwpuAqVMRU8p+UOH/GicoANge/AWgKXxRclVecdB4UwIQim1spg4KWZ2MgZAC0BEJwRpHNnLBpFJqG4M8vEF85y05zYKiBwwmnEO9N7/kxKxzyccT0IssvAL8CJ3Y4tUufDsIbgifH00nZtu4AyALw27x1CvFuD+o5c+E2ewigJ7DRiVbO97Id1tdQYM9IU9l1AAdcZxzvpApl2/uNqUbS8duQdIWNAtjmhoZDdYrxweAma5XvdzI9nkp1ZDTN/24uhrQ+VuKbkgPmN+/bNxWsRU5TunvKJAKvyW6z5wBkW05s6cpMGZ698J3q1nTPtibjXO/F1piEbLLX/O4tmLq3ur2l1VRW7fz1xVvktk2VPQHALNvMrNsNy7OfHU2myxWppAzommfvhs6xhP37AjcPrs3CdMGamjgOkGgOBMIbuzXR499tUFpNZTcBDApJOXA/JZuDC2VvNQR5wM18EYLzlmMOk66yCxw4ND+J6CMvlXo6Bgqf/NCZsfbOSqlyqz6D6VUZ5X2d2V+f/fbu6SX+GMAGv38OXFseMOFqvdTAa1tO9P5VqVeyByD0ulITzllFM1eXXBKorz1rTHqS/Xzcochkt7Ft5mSo5FKTXWVHcvzJVa3zMQAfCjCHasnlT/lgOen5xNNKC62qlFZs7Oz/ObPUchLlt6YPVl05NWoKWp7dAGH/XDeil7Yc71soBH/UQDy4W3dF6y4IfYGW+dopxLf/s5b51y4JTpdRko6EviR8vVqMOku7FsUotMIYiXQtBnq1mD6iDgJNR6CmE4jbUqONPk2hwmcocPVSELIvPuwJeStGrtm8FQnsg//f8daXcHUDPQedTOnGSNiZOvKJa/Dl+IXx4HqeXeTk/rQdChPTYGf8DRix4CDVdH6DAAAAAElFTkSuQmCC"/>
              <div class="table-name">{{scope.row.num}}</div>
             </div>
            </template>
    
        </el-table-column>

        <el-table-column prop="num" label="24H涨幅" >
          <template #default="scope">
            <div class="table-flex">
              <div class="table-name" style="color:#F05D62">{{scope.row.num}}</div>
             </div>
            </template>     
         </el-table-column>
        <el-table-column prop="address" label="成交额" >
          <template #default="scope">
            <div class="table-flex">
              <img width="20" height="20"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA19JREFUSEvFl0lv00AUx/+vTk2TSXFKSUHc+ALcESCaUhpoQXAp8CUoJxaJC03ZL8AdTmxiuSBBiaGiB/YiwYUrSAghoEXUbm2T2EkGjRtHrpM2dlnqo/3m/Wb+b5lnwhKfaZVdIlCbUjaGqB/FqG4o6gJhrz1iR8BxEkArQKcU3cjRPthRfEUGayo7DODUHNR7osMjgTWVHQOQmw+twjmdVmaM4bAnDw2uQkcAxBaR9IxSNofDxDwUWMuzoyA3potBvf2cVcrmiWbwpuAqVMRU8p+UOH/GicoANge/AWgKXxRclVecdB4UwIQim1spg4KWZ2MgZAC0BEJwRpHNnLBpFJqG4M8vEF85y05zYKiBwwmnEO9N7/kxKxzyccT0IssvAL8CJ3Y4tUufDsIbgifH00nZtu4AyALw27x1CvFuD+o5c+E2ewigJ7DRiVbO97Id1tdQYM9IU9l1AAdcZxzvpApl2/uNqUbS8duQdIWNAtjmhoZDdYrxweAma5XvdzI9nkp1ZDTN/24uhrQ+VuKbkgPmN+/bNxWsRU5TunvKJAKvyW6z5wBkW05s6cpMGZ698J3q1nTPtibjXO/F1piEbLLX/O4tmLq3ur2l1VRW7fz1xVvktk2VPQHALNvMrNsNy7OfHU2myxWppAzommfvhs6xhP37AjcPrs3CdMGamjgOkGgOBMIbuzXR499tUFpNZTcBDApJOXA/JZuDC2VvNQR5wM18EYLzlmMOk66yCxw4ND+J6CMvlXo6Bgqf/NCZsfbOSqlyqz6D6VUZ5X2d2V+f/fbu6SX+GMAGv38OXFseMOFqvdTAa1tO9P5VqVeyByD0ulITzllFM1eXXBKorz1rTHqS/Xzcochkt7Ft5mSo5FKTXWVHcvzJVa3zMQAfCjCHasnlT/lgOen5xNNKC62qlFZs7Oz/ObPUchLlt6YPVl05NWoKWp7dAGH/XDeil7Yc71soBH/UQDy4W3dF6y4IfYGW+dopxLf/s5b51y4JTpdRko6EviR8vVqMOku7FsUotMIYiXQtBnq1mD6iDgJNR6CmE4jbUqONPk2hwmcocPVSELIvPuwJeStGrtm8FQnsg//f8daXcHUDPQedTOnGSNiZOvKJa/Dl+IXx4HqeXeTk/rQdChPTYGf8DRix4CDVdH6DAAAAAElFTkSuQmCC"/>
              <div class="table-name">{{scope.row.num}}</div>
             </div>
            </template>
          </el-table-column>
        <el-table-column prop="address" label="24H涨幅" >
          <template #default="scope">
            <div class="table-flex">
              <div class="table-name" style="color:#02A65C ">{{scope.row.num}}</div>
             </div>
            </template>  
        </el-table-column>
      </el-table>
    </div>
    <div class="more">更多</div>
</div>

 

</template>

<script setup lang="ts">
import {getPath} from '@/utils'
import { onMounted, getCurrentInstance, reactive, ref, computed, onUnmounted, watch ,nextTick } from 'vue';
import Swiper from "swiper"
// import 'swiper/css/swiper.min.css';
   const tableData = [
  {
    date: '1',
    name: 'Azuki',
    num: '0.013',
  },
  {
    date: '2',
    name: 'Azuki',
    num: '0.013',
  },
  {
    date: '3',
    name: 'Azuki',
    num: '0.013',
  },
  {
    date: '4',
    name: 'Azuki',
    num: '0.013',
  },
]
const getDate = () => {

  var gamelistSwiper = new Swiper('.swiper-container.more-content-item', {
              navigation: {
                nextEl: '.swiper-button-next.swp',
                prevEl: '.swiper-button-prev.swp',
              },
              slidesPerView : 5,
              slidesPerGroup : 5,
            })
}

</script>


<style scoped lang="scss">
  .index{
   
    //  margin-right: 100px;
    &-title{
      color: #101010;
      font-size: .2174rem;
      font-weight: 600;
      margin-top: 73px;
    }
    &-text{
     
      word-wrap: break-word;
    // width: 85%;
      color: rgba(16, 16, 16, 1);
      font-size: .1691rem;
      padding-top: 45px;
    }
    &-popular{
      color: rgba(16, 16, 16, 1);
      font-size: .1812rem;
      text-align: left;
      // font-family: SourceHanSansSC-bold;
      font-weight: 600;
      padding-top:70px ;
    }
    &-list{
      display: flex;
      margin-top: 35px;
    
    }
    &-btn{
      border-radius: 10px;
      background-color: #000000;
      color: rgba(255, 255, 255, 1);
      font-size: 20px;
      width: 48%;
      height: 65px;
      text-align: center;
      line-height: 65px;
      
    }
    .btn{
      background-color: rgba(255, 255, 255, 1);
      border: 1px solid #000;
      color: #000

    }
      &-item{
        width: 25%;
        background: #101010;
        height:185px;
        border-radius: 10px;
        margin-right: 8px;
          display: flex;
        flex-direction: column;
        // align-items: center;
      }
      &-img{
        width: 50px;
        // height: 50px;
        
        border-radius: 50%;
      }
    &-icon{
        width: 18px;
        height: 18px;
        background: #1194ff;
        position: absolute;
        top: 30px;
        
    }
    &-name{
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
    }
    &-line{
      width: 94px;
      height: 8px;
      border-top: 1px solid #1684FC;
      //  border-right: 1px solid #1684FC;
      border-left: 1px solid #1684FC;
      background-color: #101010;
      margin-top: 5px;
    }
 
    &-percentage{
      color: rgba(22, 132, 252, 1);
      font-size: 12px;
      font-family: Roboto;
      padding-left: 10px;
      padding-right: 10px;
      position: relative;
    top: -2px;
    }
    .line2{
      width:94px;
      height: 8px;
      border-top: 1px solid #1684FC;
      border-right: 1px solid #1684FC;
      border-left:0px;
      background-color: #101010;
    }
    &-icon2{
      width: 15px;
    height: 15px;
    }
    &-num{
      padding-left: 20px;
     
    }
    &-spn{
      padding-right: 30px;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      padding-left: 3px;
    }


  }
 
  // 表格
  .table{
      margin-top: 40px;
      &-flex{

      }
      &-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: contain;
      }
      &-name{
         color: rgba(16, 16, 16, 1);
         font-size: 10px;
         font-weight: 600;
      }
      &-flex{
        display: flex;
        align-items: center; 
      }
      &-name{
        color: rgba(16, 16, 16, 1);
        font-size: 16px;
        
        font-family: PingFangSC-regular;
        padding-left: 3px;
      }
     
      .name{
        font-weight: 500;
      }
    
  }
  .more{
        background-color: rgba(244, 247, 249, 1);
        color: rgba(16, 16, 16, 1);
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        font-family: Roboto;
        padding: 34px 0px 34px 0px;
      }
  @media screen and (min-width: 1366px){
    .index{
      padding: 0px 100px 0px 100px;
    }
  }
  @media screen and (min-width: 1400px){
    .index{
      padding: 0px 100px 0px 100px;
    }
  }
  @media screen and (min-width: 1680px){
    .index{
      padding: 0px 300px 0px 300px;
    }
  }
</style>
<style lang="scss">
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
      }
      .demonstration {
      color: var(--el-text-color-secondary);
    }

    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .el-carousel--horizontal{
      width: 668px;
      /* height: 377px; */
      border-radius: 20px;
    }
      
    .cell{
      color: rgba(131, 139, 160, 1);
    }
    .index {
      .el-table, .el-table__expanded-cell {background-color: #fff !important;}
      .el-table th, .el-table tr, .el-table td {background-color: #fff !important;}
    }
     
    
    #app{
    background: #fff;
   }
</style>
