<template>
  <div class="business_box">
   <search />
   <div class="business">
     <div class="business_new1" >
       <div class="business-header">
          <img class="business-logo"  v-if="nftContract.contractLogo" :src="nftContract.contractLogo" />
          <img class="business-logo"  v-else src="https://metapro.superswap.cool/image/profilePhoto/A_236.png" />
          <div style="padding-left:20px">
            <div class="business-flex" v-if="nftContract.contractName" >
               <div class="title" v-if="nftContract.name"> {{ nftContract.name }} ({{ nftContract.contractName }})</div>
               <span v-else class="title"> {{ nftContract.contractName }}</span>

               <img width="28" class="business-img"  v-if="nftContract.isAuth == 2" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA51JREFUSEvtl0loE1EYx//fNNPMtGPS2B5E64ZSEBRxPYjg1mL1ZlXc8CS4b61V0SqKWBfcFxTFg5dSt+rFSwy1Rw9K3REFF7QKYmKbdmqsSfzkjZl2pk2aidabc33z3u/9v/d9//c9wh9+zDwUQBMRxf9kCcp0EjNLAI4GQ/Hy/r4sSBJOAThPRC8zWSsjMDMPB7Ax0BDZXHNdh6oQpkxWsHBeLhQ3jSai507hjsHMPALA+tob+mZ/fQTRGHcySmaoWDJfgzsDeFIwM68CsAbAGAAitMYnVAbu2qHmmAVuFd0sjgHAXiKKWgd6gJm5+N37WODC5VZ8aIqBu4Q5jWLnf7k5hBXLPZg4zo2sLGRb4cnAdSfPh8saH3Ug/jNjVo8JikI4Xp0Pr0caQESfzR+Sgb+sLg8WtOl9QE1Qzh4pgC9PKiSij//BRgSYeSSAe/8o1GOI6FmPUCeg62uu6ZvuNEQQs9TpptVeTBCZKQGnL4TxoNGeeIMHubBrax60XAkfPsaw/0gL9PauHCmZrmLxAk2YTCfcSC5mlgEcqrmmV3SHivGcHMKJA/nGwu+bxMLNaP/WVWcbVnowabwiSgZnLrbifuN3xLs5uAGfr0FRaCwRPTHB+/z1kd1X6nT8iCYv3GULNZTMVCG7yKZ6SKELVZW/1T580oFzl1rxLZJ8jVnTVCwVyhXymOC0JZRK9cZVXtMgsOdgM16/jaY0HcVNOFadjzyvNJCYediXUPxt1b6vtvAls47Zs1QsLtOQnU04cS6MYCiOnVt8EA6VTq253p7tPhSNlKeaiqv99ZGdvYXaPGvhQv00Ca9eR9HRwRhVJMPlIqyrDKIl3LvpLJqnobRERbZMObbk8tdHKtLBx491Y+0KD1S1y/Rq63QYN1aK/BCbXlSmobTYgPqIqKVztpnZ6eAirDsqfBg2xAUiGIm0pSqE1rbUagV0TrEKWaY8IgqLjdi8OgH/lM5ArKprb+jwi6uyF7V96tXla70oyM/CgWP2mk6WlH0KLhohi44DL15FbS73z8GZ3NROFfdpI1A4yIXdwtk0qYCIQr3dx8Vv3sUCt2634/HTv+tCMmp9EpdGaaLZmwvAZe5SZO/Vm7phHN0/0WUKZ5NlW6E4b/ZSnR0ziw0cDDREKoVhWOEWqIeI2pycv+O+OhEJ0eoetsKXLNAwW9xaMjmG9jAQJztNPGEOB0PxysQTRvTN24hIdzI/ZXI5nfy3j7ZfvezyjGOz3EUAAAAASUVORK5CYII='/>
            </div>

          <div style="display:flex;margin-top: 25px;" >
            <div class="business-flex newFlex"  v-if="nftContract.contractAddr">
               <div class="title" style="font-size: 12px;color: #353945;font-weight: 500;">  {{ proxy.$filters.addressFilters(nftContract.contractAddr, 6, 4) }}</div>
               <img width="15" height="13" class="business-img"  style="cursor: pointer;"   @click.stop="copy(nftContract.contractAddr)"  src='../../assets/img/copy_2.png'/>
            </div>
            <div  class="business-right" style="display:flex">
                <img width="20" height="20"  v-if="nftContract.twitterUrl &&  nftContract.isAuth == 2 || nftContract.twitterUrl  && nftContract.isAuth == 1" style="cursor: pointer;"  @click="opnes(nftContract.twitterUrl)"  src="../../assets/img/business_icon.png"/>
                <img width="20" height="20"  v-if="nftContract.officialUrl && nftContract.isAuth == 2 || nftContract.officialUrl && nftContract.isAuth == 1" style="cursor: pointer;"  @click="opnes(nftContract.officialUrl)" src="../../assets/img/business_icon2.png"/>
                <div v-if="nftContract.officialUrl && nftContract.twitterUrl && nftContract.isAuth == 2">
                  <img width="20" height="20" src="../../assets/img/business_icon3.png"/>
                  <span style="color: #353945;">{{ Number(nftContract.royaltyFee) * 100 || 0 }}%</span>
                </div>

             </div>
          </div>

          </div>
       </div>

     </div>
     <div v-if='nftContract.description && nftContract.isAuth == 1 || nftContract.description && nftContract.isAuth == 2' style="padding-left: 120px;">
      <div class="business-Introduction" v-if="textShow_1">
         {{ nftContract.description || "No Description" }}
      </div>
      <div class="business-Introduction2" v-if="textShow">
         {{ nftContract.description|| "No Description" }}
      </div>
        <span  v-if=' textShow_1 && nftContract.description.length>15 ' @click="moreText()" style="color: #3B82F6;cursor: pointer;position: relative;top: 5px;">{{$t('overall.Showmore')}}</span>
        <span v-if='Showmore_1 && nftContract.description.length>15'  @click="moreText_1()" style="color: #3B82F6;cursor: pointer;position: relative;top: 5px;">{{$t('overall.Stow')}}</span>
     </div>
     <div class="business-item">
          <div class="business-list"  v-for="key in Object.keys(pricelist)" :key="key">
            <div class="Floor">  {{ $t(`Home.${key}`) }}</div>

              <div style="display:flex">
                <img width="16" src="../../assets/img/chain_2.png" style='object-fit: contain;'/>
                <div class="price">  {{
                Number(pricelist[key]).toFixed(4) == "null"
                  ? 0
                  : Number(pricelist[key]).toFixed(4)
            }}</div>
              </div>
          </div>
      </div>
      <div class="business-table"  >
        <el-tabs v-model="activeName" class="demo-tabs" >
          <el-tab-pane :label="$t('Home.Handicap')" name="first">
            <div class="businessNew_list" >
              <div class="table-list newList">
                <div class="table-flex" style="justify-content: space-between;">
                   <div class="number">{{$t('business.number')}}</div>
                   <div class="priceBNB">{{$t('business.price')}}(BNB)</div>
                </div>
                <div class="table-flex left" style="justify-content: space-between;">
                    <div class="number">{{$t('business.Cumulative_depth')}}</div>
                    <div class="priceBNB" >
                      {{ proxy.$filters.numFilters2(transactionDepth.sellOrderCount)
                        }}{{$t('business.single')}}
                      </div>
                    <div class="priceBNB">  {{
                    Number(transactionDepth.sellTotalPrice).toFixed(4)
                  }}</div>
                </div>
                <!-- --------- -->
              <template v-if="sellOrders.length != 0">
                  <div class="table-flex left" style="justify-content: space-between;"   v-for="item in sellOrders" :key="item.code">
                    <div v-if="item.nftTokenId">#{{ item.nftTokenId }}</div>
                    <div v-else>--</div>
                    <div class="priceBNB" >    {{
                        item.feePrice
                        ? numFilters(item.feePrice)
                        : "--"
                  }}</div>
                  </div>
              </template>
              <template v-else>
                <div class="table-flex left" style="justify-content: space-between;" v-for="item in orders" :key="item.code">
                   <div class="number">--</div>
                   <div class="priceBNB">
                      --
                   </div>
                </div>
              </template>

                <!-- --------- -->
                <template v-if="buyOrders.length != 0" >
                  <div class="table-flex right_1" style="justify-content: space-between;" v-for="item in buyOrders" :key="item.code">
                    <div v-if="item.nftTokenId">{{ item.nftTokenId }}</div>
                    <div v-else>--</div>
                      <div class="priceBNB"  >  {{
                       item.feePrice
                      ? numFilters(item.feePrice)
                      : "--"
                       }}</div>

                </div>
               </template>
               <template v-else>
                <div class="table-flex right_1" style="justify-content: space-between;"   v-for="item in orders" :key="item.code">
                   <div class="number">--</div>
                   <div class="priceBNB">
                      --
                   </div>
                </div>
               </template>

              <div class="table-flex right_1" style="justify-content: space-between;">
                    <div class="number">{{$t('business.Cumulative_depth')}}</div>
                    <div class="priceBNB"> {{ proxy.$filters.numFilters2(transactionDepth.buyOrderCount)
                  }}{{$t('business.single')}}</div>
                   <div class="priceBNB"> {{
                      numFilters(transactionDepth.buyTotalPrice) == 'null' ? '--' :
                      numFilters(transactionDepth.buyTotalPrice)
                  }}</div>
             </div>
              </div>
              <div></div>
              <div class="right">
                <div style="display:flex;">

                   <img src='../../assets/img/business_icon6.png' style='width: 22px;height: 26px;margin-right: 10px;'/>
                   <div style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color: #20A886;">{{$t('business.purchase')}}</div>
                </div>
                 <div class="right-title">
                  {{
                    t("business.minimumprice")

                }}
                 </div>
                 <div style=" position: relative;">
                  <div  class="" style="border: 1px solid #EEF0F2;border-radius: 5px;height: 48px;    text-align: center;line-height: 48px;
    ">
                    {{updatePrice(sellOrders, "sell")}}
                  </div>

                     <div class="right-flex_1">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA19JREFUSEvFl0lv00AUx/+vTk2TSXFKSUHc+ALcESCaUhpoQXAp8CUoJxaJC03ZL8AdTmxiuSBBiaGiB/YiwYUrSAghoEXUbm2T2EkGjRtHrpM2dlnqo/3m/Wb+b5lnwhKfaZVdIlCbUjaGqB/FqG4o6gJhrz1iR8BxEkArQKcU3cjRPthRfEUGayo7DODUHNR7osMjgTWVHQOQmw+twjmdVmaM4bAnDw2uQkcAxBaR9IxSNofDxDwUWMuzoyA3potBvf2cVcrmiWbwpuAqVMRU8p+UOH/GicoANge/AWgKXxRclVecdB4UwIQim1spg4KWZ2MgZAC0BEJwRpHNnLBpFJqG4M8vEF85y05zYKiBwwmnEO9N7/kxKxzyccT0IssvAL8CJ3Y4tUufDsIbgifH00nZtu4AyALw27x1CvFuD+o5c+E2ewigJ7DRiVbO97Id1tdQYM9IU9l1AAdcZxzvpApl2/uNqUbS8duQdIWNAtjmhoZDdYrxweAma5XvdzI9nkp1ZDTN/24uhrQ+VuKbkgPmN+/bNxWsRU5TunvKJAKvyW6z5wBkW05s6cpMGZ698J3q1nTPtibjXO/F1piEbLLX/O4tmLq3ur2l1VRW7fz1xVvktk2VPQHALNvMrNsNy7OfHU2myxWppAzommfvhs6xhP37AjcPrs3CdMGamjgOkGgOBMIbuzXR499tUFpNZTcBDApJOXA/JZuDC2VvNQR5wM18EYLzlmMOk66yCxw4ND+J6CMvlXo6Bgqf/NCZsfbOSqlyqz6D6VUZ5X2d2V+f/fbu6SX+GMAGv38OXFseMOFqvdTAa1tO9P5VqVeyByD0ulITzllFM1eXXBKorz1rTHqS/Xzcochkt7Ft5mSo5FKTXWVHcvzJVa3zMQAfCjCHasnlT/lgOen5xNNKC62qlFZs7Oz/ObPUchLlt6YPVl05NWoKWp7dAGH/XDeil7Yc71soBH/UQDy4W3dF6y4IfYGW+dopxLf/s5b51y4JTpdRko6EviR8vVqMOku7FsUotMIYiXQtBnq1mD6iDgJNR6CmE4jbUqONPk2hwmcocPVSELIvPuwJeStGrtm8FQnsg//f8daXcHUDPQedTOnGSNiZOvKJa/Dl+IXx4HqeXeTk/rQdChPTYGf8DRix4CDVdH6DAAAAAElFTkSuQmCC"/>
                        <div class="right-bnb" style="color: #353945;">BNB</div>
                     </div>
                 </div>

                 <div class="right-title" >
                  {{$t('business.quantity')}}
                 </div>

                  <van-stepper  v-model="Purchase" disable-input integer min="0"
                 :max="updateLength(sellOrdersAll)" />
                 <div class="right-title">
                  {{
                    t("business.amount")

                  }}
                  <span style="padding-left:10px;color: #5a64e9;">{{ businesslist_type === 1 ? buyPrice + " BNB" : currency.length
                }}     </span>
                 </div>
                 <div class="right-footer" @click="buy(1)">

                    <div style="display:flex;justify-content: center;">
                      <van-loading type="spinner" v-show="loadingShow" size="25px" style='padding-right: 10px;'/>
                      <span v-show="loadingShow" > {{
                        t("overall.Purchasing")

                      }}</span>
                    </div>

                    <span v-show="!loadingShow">{{ t("business.purchase") }}</span>

                 </div>
              </div>
              <div class="right">
                <div style="display:flex;">
                   <img src='../../assets/img/business_icon5.png' style='width: 22px;height: 26px;margin-right: 10px;'/>
                   <div style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color: #F05D62;">{{$t('business.sellout')}}</div>
                </div>
                 <div class="right-title">
                  {{
                   t("business.Bestprice")
                }}
                 </div>
                 <div style=" position: relative;">

                  <div  style="border: 1px solid #EEF0F2;border-radius: 5px;height: 48px;    text-align: center;line-height: 48px;color: #353945;">
                    {{ updatePrice(buyOrders, "buy") }}
                  </div>
                     <div class="right-flex_1">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA19JREFUSEvFl0lv00AUx/+vTk2TSXFKSUHc+ALcESCaUhpoQXAp8CUoJxaJC03ZL8AdTmxiuSBBiaGiB/YiwYUrSAghoEXUbm2T2EkGjRtHrpM2dlnqo/3m/Wb+b5lnwhKfaZVdIlCbUjaGqB/FqG4o6gJhrz1iR8BxEkArQKcU3cjRPthRfEUGayo7DODUHNR7osMjgTWVHQOQmw+twjmdVmaM4bAnDw2uQkcAxBaR9IxSNofDxDwUWMuzoyA3potBvf2cVcrmiWbwpuAqVMRU8p+UOH/GicoANge/AWgKXxRclVecdB4UwIQim1spg4KWZ2MgZAC0BEJwRpHNnLBpFJqG4M8vEF85y05zYKiBwwmnEO9N7/kxKxzyccT0IssvAL8CJ3Y4tUufDsIbgifH00nZtu4AyALw27x1CvFuD+o5c+E2ewigJ7DRiVbO97Id1tdQYM9IU9l1AAdcZxzvpApl2/uNqUbS8duQdIWNAtjmhoZDdYrxweAma5XvdzI9nkp1ZDTN/24uhrQ+VuKbkgPmN+/bNxWsRU5TunvKJAKvyW6z5wBkW05s6cpMGZ698J3q1nTPtibjXO/F1piEbLLX/O4tmLq3ur2l1VRW7fz1xVvktk2VPQHALNvMrNsNy7OfHU2myxWppAzommfvhs6xhP37AjcPrs3CdMGamjgOkGgOBMIbuzXR499tUFpNZTcBDApJOXA/JZuDC2VvNQR5wM18EYLzlmMOk66yCxw4ND+J6CMvlXo6Bgqf/NCZsfbOSqlyqz6D6VUZ5X2d2V+f/fbu6SX+GMAGv38OXFseMOFqvdTAa1tO9P5VqVeyByD0ulITzllFM1eXXBKorz1rTHqS/Xzcochkt7Ft5mSo5FKTXWVHcvzJVa3zMQAfCjCHasnlT/lgOen5xNNKC62qlFZs7Oz/ObPUchLlt6YPVl05NWoKWp7dAGH/XDeil7Yc71soBH/UQDy4W3dF6y4IfYGW+dopxLf/s5b51y4JTpdRko6EviR8vVqMOku7FsUotMIYiXQtBnq1mD6iDgJNR6CmE4jbUqONPk2hwmcocPVSELIvPuwJeStGrtm8FQnsg//f8daXcHUDPQedTOnGSNiZOvKJa/Dl+IXx4HqeXeTk/rQdChPTYGf8DRix4CDVdH6DAAAAAElFTkSuQmCC"/>
                        <div class="right-bnb" style="color: #353945;">BNB</div>
                     </div>
                 </div>
                 <div class="right-title">
                  {{$t('business.SelectNFT_1')}}
                 </div>

                 <div  >
                  <el-select v-model="currency"  :no-data-text="t('overall.nonft')" :placeholder="t('NFTdetails.SelectNFT')" multiple collapse-tags collapse-tags-tooltip>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />

                  </el-select>
                 </div>


                 <div class="right-title">
                  {{

                         `${t("business.Selected")}`
                  }} :
                  <span style="padding-left:10px;color: #5a64e9;">{{ currency.length}}     </span>
                 </div>
                 <div class="right-footer footer_btn" @click="buy(2, authorization)">

                    <div style="display:flex;justify-content: center;" v-show="loadingShow_1">
                      <van-loading   type="spinner" size='25px' style='padding-right: 10px;'/>
                      <span> {{$t('overall.Selling')}}</span>
                    </div>

                    <span v-show="!loadingShow_1">   {{$t('business.sellout')}}</span>

                </div>

              </div>
              <div class="table-list" style="margin-left: 50px;justify-content: space-around;padding-right: 0px;justify-content: flex-start;border-left: 1px solid #EEF0F2;
    padding-left: 30px;">

                <div style="padding-bottom: 24px;font-family: PingFang SC;font-weight: bold;color: #3B82F6;">{{$t('business.Whole_network_transaction')}}</div>
                <div class="table-flex">
                   <div class="number" style="width: 48%;    text-align: left;">{{$t('business.number')}}</div>
                   <div class="priceBNB" style="width: 40%;    text-align: left;">{{$t('business.price')}}(BNB)</div>
                   <div class="priceBNB" style="width: 40%;    text-align: right;">{{$t('my.date')}}</div>

                </div>

                <!-- --------- -->
              <template v-if="transactionlist.length != 0">
                <div class="table-flex left"  v-for="item in transactionlist" :key="item.nftTokenId">
                   <div class="number"   v-if="item.newType==1"   style="width: 48%; text-align: left;color: #47a182">#{{ item.id}}</div>
                   <div class="number"   v-else   style="width: 48%; text-align: left;">#{{ item.id}}</div>

                   <div @click="openHash(item.has)" class="priceBNB" style="width: 40%;color:#23262F;;text-align: left;cursor: pointer;"> {{
                     numFilters(item.price)

                    }}</div>
                    <div @click="openHash(item.has)" class="dateNew"   style="width: 40%;    color: rgb(59, 130, 246);text-align: right;cursor: pointer;"> {{ setTime(webValue.timeNow, new Date(item.time).getTime()) }}{{t('browse.ago')}}</div>
                </div>
              </template>


              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="NFT" name="second">
            <newnftlist :searchKey="searchKey.value" type="1"  :active_1="active_1.value" :data="marketList.value" v-show="!secondCard.value"></newnftlist>
         </el-tab-pane>

         </el-tabs>

      </div>
      <!-- 我的池子 我的成交 全网成交 -->
      <div class="make" v-if="activeName=='first'">
        <el-tabs v-model="activeName_1" class="demo-tabs" >
           <el-tab-pane :label="t('business.Mypool')"  name="first">
               <div style="display:flex;justify-content: space-between;padding-right:0px;margin-top: 10px;">
                 <div class="make-btn" @click="createPool(1)">  {{$t('business.CreatingBuying')}}</div>
                 <div class="make-btn" @click="createPool(2)" style="background-color: #f6455d;">{{$t('business.CreatingSelling')}}</div>
                 <div class="make-btn" @click="createPool(3)" style="background-color: #5a64e9;">{{$t('business.CreatingTrading')}}</div>
               </div>
              <!-- 表格 -->
              <div style="margin-top:20px">
                  <czTable :data="Mypool"  :active="1" :contractLogo='nftContract.contractLogo' ></czTable>
               </div>
            </el-tab-pane>
           <el-tab-pane :label="t('business.Mydeal')" name="second">
               <!-- 表格 -->
               <div style="margin-top:10px">
                <czTable :data="Mytransactionlist"  :active="2"></czTable>
                <div style="display:flex;justify-content: center; margin-top: 40px;">
                  <div class="more" @click="goRankinglist" v-if="Mytransactionlist.length>4">{{ $t('overall.more') }} </div>
                </div>
               </div>
           </el-tab-pane>
        </el-tabs>
      </div>

  <van-overlay :show="create_show_1" @click.stop="create_show_1 = false">
    <div class="wrapper_1" @click.stop>
      <div class="block">
        <div class="wrapper_1-title">
          <div>{{ t("business.Authorize") }}</div>
          <div @click="create_show_1 = false" style="cursor: pointer;">x</div>
        </div>
        <div class="wrapper_1-describe">
          <img src='@/assets/img/shouquan.png'/>
        </div>
        <div style="text-align: center;">
          <van-loading  color="#1989fa"/>
        </div>
        <div style='padding-top: 10px;line-height: 25px;'>

          {{ t("overall.series") }}        </div>

        <!-- <div style="display:flex;justify-content: center;margin-top: 15px;">
          <div class="wrapper_1-btn" @click="create_show_1 = false">{{ t("business.Cancel") }}</div>

          <div class="wrapper_1-btn" @click="submit"
            style='background: #5A64E9;color: #fff;border:none;margin-left: 20px;'>{{ t("business.confirm") }}</div>
        </div> -->
      </div>
    </div>
  </van-overlay>
    <!-- 购买成功的弹框 -->
  <van-overlay :show="buy_show_2">
    <div class="wrapper_1" @click.stop>
      <div style="width: 15%;  background: #FFFFFF;border-radius:15px; padding-bottom: 20px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
        <img style="margin-top:25px" src="../../assets/icon.png" width="45" height="45" />
        <div style="font-weight: 400;color: #0F0F0F;font-size: 16px;padding-top: 10px;">{{ t("overall.spSucceed") }}
        </div>
        <div style="display:flex;    align-items: center;justify-content: center;margin-top:20px">
          <div @click.stop="buy_show_2 = false" class=""
            style="height: 45px;background: #5A64E9;border-radius: 21px;width: 200px;line-height: 45px;font-size: 14px;color: #fff; text-align: center;">
            {{ t("business.confirm") }}
          </div>
        </div>

      </div>
    </div>

  </van-overlay>
  <!-- 出售成功 -->
  <van-overlay :show="buy_show">
    <div class="wrapper_1" @click.stop>
      <div style="width: 15%;  background: #FFFFFF;border-radius:15px; padding-bottom: 20px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
        <img style="margin-top:25px" src="../../assets/icon.png" width="45" height="45" />
        <div style="font-weight: 400;color: #0F0F0F;font-size: 16px;padding-top: 10px;">{{ t("overall.Succeed") }}</div>
        <div style="display:flex;    align-items: center;justify-content: center;margin-top:20px">
          <div @click.stop="buy_show = false" class=""
            style="height: 45px;background: #5A64E9;border-radius: 21px;width: 200px;line-height: 45px;font-size: 14px;color: #fff;    text-align: center;">
            {{ t("business.confirm") }}
          </div>
        </div>

      </div>
    </div>

  </van-overlay>
   </div>
   <connectBox :ConnectWallet="ConnectWallet" @change="changeConect"></connectBox>

  </div>
</template>

<script lang='ts' setup>
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
import type { TabsPaneContext } from 'element-plus'
 import * as echarts from 'echarts'
 import { EleResize } from '@/utils/esresize'

import { nftrecordType } from "@/utils/type";
import { useRouter, useRoute } from "vue-router";
import nftrecord from "@/components/nftrecord.vue";
import czTable from "@/components/czTable.vue";

import search from "@/components/search.vue";

import Footer from '@/components/footer.vue'
import { useI18n } from "vue-i18n";
import { BigNumber, ethers } from "ethers";
import LSSVMRouter from "@/utils/contracts/LSSVMRouter.json";
import LSSVMPairFactory from "@/utils/contracts/LSSVMPairFactory.json";
import { copy } from "@/utils/copy";
import {
  getNftContractHandicap,
  buyNftForCurPrice,
  sellNftForCurPrice,
  getNftHandicapAnalysis
} from "@/api/business";
import { getAllTransaction, getMyTransaction } from "@/api/my";
import { getMyNft, getMyPoolList } from "@/api/my";
import { useStates, useActions } from "@/hooks/userStore";
import { initSigner } from "@/utils/thhersUtils";
import { mynftType } from "@/utils/type";
import { Toast,Loading  } from "vant";
import NFT from "@/utils/contracts/NFT.json";
import Factory from "@/utils/contracts/Factory.json";
import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";
import AggregationJSON from "@/utils/contracts/Aggregation.json";
import "@/assets/css/vant2.scss"
import numFilters from '@/hooks/userNumFilters'
import path from "path";
import { getNftTop } from "@/api/home";
import { getNftListByMarket } from "@/api/browse";
import { subS, mulS } from "@/utils/bignumberMath";
import { ElMessage,ElLoading } from 'element-plus'
import { filterLogin } from '@/utils/DialogSwitchChain'
// import nftlist from '@/components/nftlist.vue'
import newnftlist from "@/components/newnftlist.vue";
import {getPath} from '@/utils'
let ConnectWallet = ref<boolean>(false)
const Actions: any = useActions(["setScreen"], "PageType");
const orders: any = reactive([1, 2, 3, 4, 5])

const { proxy } = getCurrentInstance() as any;
const buy_show = ref(false);
const buy_show_2 = ref(false);
const create_show_1 = ref(false);
const textShow_1 = ref(true);
const textShow= ref(false);
const Showmore_1= ref(false);
const Showmore= ref(false);

let echartsRef  = ref();
let myChart = null;
let loadingShow = ref(false)
let loadingShow_1= ref(false)
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
const router = useRouter();
const route = useRoute();
const activeName = ref('first')
const activeName_1 = ref('first')
const priceData=  ref<any[]>([]);
const sumCount=  ref<any[]>([]);
 const intervalsNumber=reactive<any>({
     val:'0.05'
 });

let { t } = useI18n();
const { locale } = useI18n();
const form = reactive({
  name:'',
  region:''
})
console.log(locale.value, "====================");
const tableData = ref<any[]>([]);
const getMarlData= ref<any[]>([]);
  let seachData = reactive({
  param: {
    sort: 1, //排序：0,时间 1，低价优先；2，高价优先"
    sortUn: 1, //排序：0,时间 1，低价优先；2，高价优先"
    priceStart: "", //起始价格
    priceStartUn: "", //起始价格
    priceEnd: "", //结束价格
    priceEndUn: "", //结束价格
    transactionType: "", //"交易类型：0，买；1，卖"
    status: "", //"状态：0，未成交；1，已成交"
    currency: "BNB",
    currency_img: getPath("@/assets/img/WBNB.png"),
    contractAddr:'',
  },

  current: 1,
  size: 10

});
let marketList = ref<any>([]);
let handicapList=ref<any>([]);
// 当前委托
let Mypool = ref<nftrecordType[]>([]);
// { id: 1, series: 'cs', time: '2022-01-01 11:10', price: 123, Pooltype: '0', type: true, Token: '10BNB', quantity: 5, curvetype: true, curvetquantity: '5%' },
// { id: 12, series: 'cs2', time: '2022-01-20 11:10', price: 123, Pooltype: '1', type: true, NFT_quantity: 5, curvetype: true, curvetquantity: '5%' },
// { id: 13, series: 'cs3', time: '2022-03-01 11:10', price: 123, Pooltype: '2', type: false, Token: '10BNB', quantity: 3, NFT_quantity: 3, curvetype: false, curvetquantity: '5%', Service: '5%' }
// 我的成交
const nft_list2 = reactive<nftrecordType[]>([
  // { id: 1, time: '2022-01-01 11:10', Pooltype: '1', price: 12.123456111111111, code: '#0', has: '121212', Delegation: '市价' },
  // { id: 12, time: '2022-01-20 11:10', Pooltype: '1', price: 123, code: '#1', has: '232323', Delegation: '卖池' },
  // { id: 13, time: '2022-03-01 11:10', Pooltype: '0', price: 123, code: '#2', has: '2323232', Delegation: '买池' }
]);
// 全网成交
const nft_list3 = reactive<nftrecordType[]>([
  // { id: 1, time: '2022-01-01 11:10', price: 1.123456, code: '#0', has: '121212', },
  // { id: 12, time: '2022-01-20 11:10', price: 123, code: '#1', has: '232323' },
  // { id: 13, time: '2022-03-01 11:10', price: 123, code: '#2', has: '2323232' }
]);
const create_show = ref(false);
const buy_type= ref(1);
const poolType_1=1
// const intervalsNumber= ref();
const buyOrder= ref();

let pricelist = reactive<any>({
  floorPrice: 0,
  highestOffer: 0,
  totalPrice: 0,
  totalTransaction: 0,
});
let nftContract = reactive<any>({
  contractAddr: "",
  contractCreate: "",
  contractLogo: "",
  contractName: "",
  description: "",
  circulation: 0,
  isAuth: 0,
  officialUrl:'',
  twitterUrl:'',
  royaltyFee:'',
  name:''

});
let transactionDepth = reactive<any>({
  sellOrderCount: 0,
  sellTotalPrice: 0,
  buyOrderCount: 0,
  buyTotalPrice: 0,
});

let useraddress = ref("");
let authorization = ref(false);
// let create_show_close =ref(false)
// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(activeName_1.value)
// }
const contracts: any = {};
const sell = (data: any) => {
  // console.log("updateLength");

}
const webValue = reactive<any>({
  timeNow: new Date().getTime(),

})

const updateLength = (data: any) => {
  // debugger
  let arr = data.filter((val: any) => val.feePrice != "--");
  // console.log("updateLength", data);
  return arr.length;
};

let buyPrice = computed(() => {
  if (Purchase.value <= 0) {
    return 0;
  } else {
    let newsellOrders: any[] = [];
    sellOrdersAll.value.forEach((val: any) => {
      newsellOrders.push(val.feePrice);
    });
    newsellOrders = newsellOrders.sort((a, b) => b - a);
    newsellOrders = newsellOrders.reverse();
    console.log(newsellOrders);
    let total = 0;
    for (let i = 0; i < Purchase.value; i++) {
      if (newsellOrders[i] && !newsellOrders[i].toString().includes("-")) total += newsellOrders[i];
    }
    return total.toFixed(4);
  }
});
// 禁止换行
let nfttitle: any = ref(null);
// let unfold_type = ref(true);
// const unfold = (type: boolean) => {
//     unfold_type.value = !type;
//     console.log(type);
//     if (type) {
//         (profile.value as HTMLDivElement).style.overflow = 'visible';
//         (profile.value as HTMLDivElement).style.whiteSpace = 'normal';
//         (profile.value as HTMLDivElement).style.wordBreak = 'break-all';

//     } else {
//         (profile.value as HTMLDivElement).style.overflow = 'hidden';
//         (profile.value as HTMLDivElement).style.whiteSpace = 'nowrap';
//     }
// }
let buyOrders = ref<any[]>([]);
let buyOrdersAll = ref<any[]>([]);
let sellOrders = ref<any[]>([]);
let sellOrdersAll = ref<any>([]);
  let  Mytransactionlist_new = ref<any>([]);

let timeType = ref<any>("");
let active_1=reactive<any>({
  value: '1',
});
let toggle= ref<any>("");
const hexAddress: any = inject("hexAddress");
const transactionlist = ref<any>([]);
const Mytransactionlist = ref<any>([]);


let secondCard: any = ref(false);
// 路由上的盘口与默认盘口
// 路由上的盘口与默认盘口
const searchKey = reactive<any>({
  value: '',
});

//监听切换
  watch(() => activeName_1.value, (newValue, oldValue) => {

    console.log(newValue)
    if(newValue=='first'){
      getMyPoolList();
    }else if(newValue=='second'){

      getMyAllTransaction();
    }else{
      getAllTransactions();
    }
  })
  watch(() => activeName.value, (newValue, oldValue) => {

    console.log(newValue)
    if(newValue=='second'){
      console.log( secondCard.value);
      secondCard.value = true;

      getMarketlist();
      active_1.value=1
    }else
    {
      console.log( secondCard.value);
      secondCard.value = false;

    }
  })

onMounted(async () => {
  searchKey.value = route.query.searchKey
  time()

  await getNftTopList()

  // getMarketlist()
  let tries = 0;
  setInterval(() => {
    webValue.timeNow = new Date().getTime();
  }, 1000)
  setTimeout(function initTimer (): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore

    if (!userinfo.value.hexAddress && ++tries < 50) return setTimeout(initTimer, 100);
    else init();
  });
  timeType.value = setInterval(() => {
    getDate();
  }, 30000);
});
onActivated(async() => {
  searchKey.value = route.query.searchKey

  await getNftTopList()

// AnalysisList(intervalsNumber.val,poolType_1)
 getMarketlist()
let tries = 0;
setTimeout(function initTimer (): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (!userinfo.value.hexAddress && ++tries < 50) return setTimeout(initTimer, 100);
  else init();
});
setInterval(() => {
    webValue.timeNow = new Date().getTime();
  }, 1000)

timeType.value = setInterval(() => {
  getDate();
}, 30000);
})
const moreText=()=>{
  textShow.value=true
  textShow_1.value=false
  Showmore.value=false
  Showmore_1.value=true
}
const moreText_1=()=>{
  textShow.value=false
  textShow_1.value=true
  Showmore.value=true
  Showmore_1.value=false
}

onUnmounted(() => {
  clearInterval(timeType.value);
});

function time() {
  transactionlist.value.forEach((val: any) => {
    let time = ''
    time = setTime(new Date().getTime(), new Date(val.time).getTime())
  })

}
let type = route.query.type || 2
const getDate = () => {


  localStorage.setItem('chooseNFTAddress', searchKey.value)

  getNftContractHandicap({ searchKey: searchKey.value,type:type })
    .then((res: any) => {
      if (!res.buyOrders) res.buyOrders = []
      if (!res.sellOrders) res.sellOrders = []

      console.log(res);
      Object.keys(transactionDepth).forEach((key) => {
        transactionDepth[key] = res.transactionDepth[key];
      });
      Object.keys(nftContract).forEach((key) => {
        nftContract[key] = res.nftContract[key];
      });

      Object.keys(pricelist).forEach((key) => {
        pricelist[key] = res[key];
      });

      pricelist.floorPrice = res.floorPrice
      buyOrdersAll.value = res.buyOrders;
      sellOrdersAll.value = res.sellOrders;
      res.buyOrders = res.buyOrders.sort((a: any, b: any) => b.feePrice - a.feePrice);
      res.sellOrders = res.sellOrders.sort(
        (a: any, b: any) => a.feePrice - b.feePrice
      );
      for (let i = 0; i < 5; i++) {
        buyOrders.value[i] = (res.buyOrders && res.buyOrders[i]) || {
          nftTokenId: "--",
          feePrice: "--",
        };

        sellOrders.value[i] = (res.sellOrders && res.sellOrders[i]) || {

          nftTokenId: "--",
          feePrice: "--",
        };
      }
      sellOrders.value.sort((a, b) => a.feePrice - b.feePrice);
      sellOrders.value = sellOrders.value.reverse();
      console.log("sellOrders",  buyOrders.value);
    })
    .catch((e) => {
      console.error(e);
    });
  if (userinfo.value.isLogin) {
    updatepool();
    // 当前系列下我的nft
    console.log("个人中心", userinfo.value.hexAddress);
    console.log("inject", hexAddress.value);
    console.log("当前钱包", useraddress.value);
    getMyNft({
      walletAddr:
        userinfo.value.hexAddress || hexAddress.value || useraddress.value,
      contractAddr: searchKey.value,
      isSell: 0,
    }).then(async (res: any) => {
      let arr: any = [];
      res.forEach((val: any) => {
        arr.push({
          value: val.nftTokenId,
          label: "#" + val.nftTokenId,
          nftContractAddr: val.nftContractAddr,
          id: val.id,
        });
      });
      options.value = arr;
      console.log(options.value);
    });
    getMyAllTransaction();
  }
  getAllTransactions();
};

const updatePrice = (data: any, type: string) => {

  if (type === "sell") {
    let sellAll: any[] = [];
    data.forEach((val: { feePrice: string | number }) => {

      if (val.feePrice != "--") sellAll.push(val.feePrice);
    });
    let feePrice: any = Math.min(...sellAll);
    return feePrice.toString().includes("Infinity") ? "--" : feePrice.toFixed(4);
  } else {
    let buyAll: any[] = [];
    data.forEach((val: { feePrice: string | number }) => {
      if (val.feePrice != "--") buyAll.push(val.feePrice);
    });
    let feePrice: any = Math.max(...buyAll);
    return feePrice.toString().includes("Infinity") ? "--" : feePrice.toFixed(4);
  }
};

const options = ref<mynftType[]>([]);
let providers: any, signers: any;
const getNftTopList = async () => {
    console.log(localStorage.getItem('address'))
    console.log(searchKey.value)

    if ( !localStorage.getItem('address') && !searchKey.value) {

      try {
        let res: any = await getNftTop()
        if (res) {
          let top = [...JSON.parse(res)];
          searchKey.value = top[0].address

        } else {
          searchKey.value = proxy.$common.DefaultUrl
        }
      } catch (e: any) {
        console.error(e);
        searchKey.value = proxy.$common.DefaultUrl
      }
    }
    else if (!searchKey.value && localStorage.getItem('address')) {

      searchKey.value = localStorage.getItem('address')
    }
    localStorage.setItem('address', searchKey.value)
}

const init = async () => {

  getDate()
  if ((window as any).ethereum && userinfo.value.isLogin) {
    //第一步 ----  获取 当前钱包对象 和 provider
    let { provider, address, signer } = await initSigner();
    providers = provider;
    signers = signer;
    useraddress.value = address;
    //第二部 ----  创建合约对象              '合约地址'       'JSON'  这是上面的provider和signer
    // contracts.LSSVMPairFactory = new ethers.Contract(proxy.$common.LSSVMPairFactory, LSSVMPairFactory, provider).connect(signer);
    contracts.LSSVMRouter = new ethers.Contract(
      proxy.$common.LSSVMRouter,
      LSSVMRouter,
      provider
    ).connect(signer);

    contracts.Factory = new ethers.Contract(
      proxy.$common.Factory,
      Factory,
      provider
    ).connect(signer);

    contracts.Aggregation = new ethers.Contract(
      proxy.$common.Aggregation,
      AggregationJSON,
      provider
    ).connect(signer);
    // contracts.Factory.getHaveNFT(searchKey, userinfo.value.hexAddress || hexAddress.value).then((res: any) => {
    //     console.log(res);
    // })
    try {
      // contracts.NFT = new ethers.Contract('0x327ab464cfAC7C82b497851EC8729a8a4AACa865', NFT, provider).connect(signer);
      contracts.NFT = new ethers.Contract(
        searchKey.value as string,
        NFT,
        provider
      ).connect(signer);
    } catch (e) {
      console.log(e);
    }

    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );
    authorization.value = res || false;
    console.log("authorization", authorization.value);
  }
};

const updatepool = () => {

  // 当前盘口下我的池子
  getMyPoolList({ contractAddr: searchKey.value }).then(async (res: any) => {
    console.log(res);
    let old_nft_list2: nftrecordType[] = [];
    for (const val of res) {

      let amount = val.tokenAmount;
      if (val.poolType == 2) {
        amount
        try {
          amount = await providers.getBalance(val.poolAddr)
        } catch (e) {
          amount = null;
        }
        if (amount) amount = ethers.utils.formatUnits(amount, 18)
        console.log('合约与接口token', amount, val.tokenAmount, val.poolAddr, val.curAmount)
      }
      old_nft_list2.push({
        id: val.id,
        series: val.nftContractName || "--",
        time: val.createTime,
        price: val.poolType == 2 || val.poolType == 1 ? Number(val.curAmountBySell) : Number(val.curAmountByBuy),
        Pooltype: val.poolType + "",
        type: val.status === 0 ? true : false,
        Token: amount ? numFilters(amount) : numFilters(val.tokenAmount),
        quantity: val.buyNftCount || 0,
        NFT_quantity: val.sellNftCount || 0,
        curvetype: val.rateType === 0 ? false : true,
        curvetquantity:
            val.rateType === 1
              ? proxy.$filters.numFilters5(mulS(subS(val.delta, 1), 100)) + "%"
              : val.delta,
          Service: proxy.$filters.numFilters5(val.fee * 100) + "%",

        poolAddr: val.poolAddr,
        nftContractAddr: val.nftContractAddr,

        sellNftCount:val.sellNftCount,

        buyAmount:val.curAmountByBuy
      });
    }
    Mypool.value = old_nft_list2;
    // Mypool.value = Mypool.value.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    Mypool.value.forEach((val) => {
      val.time = val.time.replace(/-/g, "/").substring(0, 16);
    });
    console.log(old_nft_list2, 78);
  });
};
const buy = async (type: number, authorizationType: boolean) => {

  if (!userinfo.value.isLogin) return ConnectWallet.value = true
  if(!filterLogin(userinfo.value.isLogin, useraddress.value || String(userinfo.value.hexAddress))) return
  // Toast.fail(t("overall.logTips"));

  if (!authorizationType && type === 2) {
    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );
    if (!res) {
      console.log('授权', 123)
      create_show_1.value = true;
      let res2;
      try {
        res2 = await contracts.NFT.setApprovalForAll(
          proxy.$common.LSSVMRouter,
          true
        );
      } catch (e) {
        proxy.$message.error(t("overall.privilegegrantfailed"))
        loadingShow.value = false

        // Toast.fail(t("overall.privilegegrantfailed"));
        console.log(e);
        create_show_1.value = false;
        setTimeout(() => {
          Toast.clear();
        }, 1000);
      }
      if (res2) {
        res2 && (await res2.wait());
        create_show_1.value = false;

        Toast.clear();
        proxy.$message.success(t("overall.Empowersucceeded"))
        loadingShow.value = false

        // Toast.success(t("overall.Empowersucceeded"));

        setTimeout(() => {
          Toast.clear();
        }, 1000);
        let res = await contracts.NFT.isApprovedForAll(
          useraddress.value,
          proxy.$common.LSSVMRouter
        );
        authorization.value = res || false;
      }
    }
    return;
  }
  let time = Date.parse(new Date() as unknown as string) / 1000;
  if (type === 1) {

    //购买
    if (Purchase.value <= 0) return proxy.$message.warning(t("overall.Tips"))
    loadingShow.value = true
    const loadingInstance = ElLoading.service({
        lock: false,
        text: '',
        background: 'rgba(0, 0, 0, 0.0)',
        spinner:'spinner'

      })
    Actions.setScreen(false);

    buyNftForCurPrice({ contractAddr: searchKey.value, buyCount: Purchase.value }).then(async (res: any) => {
      let arr: any = [];
      // 接口
      let totals = 0;
      let pools:any =[];
      let nums:any =[];
      let prices:any =[];
      let positions:any =[];
      let types:any=[];
      console.log(res);
      let type1Totals = 0;
      let type2Totals = 0;

      res.forEach((val: any) => {

        if (val.type==1)
        {
          arr.push([val.poolAddr, val.buyPrice.length]);

          pools.push(val.poolAddr);

        }else if(val.type==2)
        {
          pools.push(searchKey.value);
        }
        nums.push(val.buyPrice.length);
        positions.push(val.position);
        types.push(val.type);

        let poolPrice = 0;
        val.buyPrice.forEach((item: number) => {
          if (val.type==1)
          {
            type1Totals +=Number(item);
            poolPrice +=  Number( ethers.utils.parseUnits((Number(item) * 1.01).toFixed(18), 18));

          }else if(val.type==2)
          {
            type2Totals +=Number(item);
            poolPrice += Number( ethers.utils.parseUnits((Number(item) * 1).toFixed(18), 18));
          }
        });
        prices.push(poolPrice.toString());
      });
      // 合约
      let contract_total = 0;
      for (let i = 0; i < arr.length; i++) {
        try {
          contracts.LSSVMPairETH = new ethers.Contract(
            arr[i][0],
            LSSVMPairETH,
            providers
          ).connect(signers);
        } catch (e) {
          console.log(e);
        }
        let res2 = await contracts.LSSVMPairETH.getBuyNFTQuote(
          arr[i][1]
        );
        contract_total += Number(ethers.utils.formatUnits(res2[3], 18));
      }

      let newtotal = totals > contract_total ? type1Totals+type2Totals : contract_total+type2Totals;

      let total = ethers.utils.parseUnits((Number(newtotal) * 1.01).toFixed(18), 18);

      console.log(
        pools,
        nums,
        prices,
        positions,
        types,
        { value: total });

      contracts.Aggregation.buyNFT(
        pools,
        nums,
        prices,
        positions,
        types,
        { value: total}
      ).then(async (res: any) => {

        await res.wait();
        create_show.value = false;
        loadingInstance.close()

        Actions.setScreen(true);
        Toast.clear();
        proxy.$message.success(t("overall.spSucceed"))
        // buy_show_2.value = true
        loadingShow.value = false

      })
        .catch((e: any) => {
          console.log("购买失败的情况");
          console.log(e);
          Toast.clear();
          create_show.value = false;
          loadingShow.value = false
          loadingInstance.close()
          Actions.setScreen(true);
          if (e?.data?.message && e.data.message.includes('err: insufficient funds for gas * price + value'))
            proxy.$message.error(t("overall.Balance"))
          //  Toast.fail(t("overall.Balance"));
          else  proxy.$message.error(t("overall.spFailed"))
        });
      // contracts.LSSVMRouter.swapETHForAnyNFTs(
      //   arr,
      //   useraddress.value,
      //   useraddress.value,
      //   time + 60,
      //   { value: total }
      // )
      //   .then(async (res: any) => {
      //     await res.wait();
      //     create_show.value = false;
      //     Toast.clear();
      //     buy_show_2.value = true
      //     // Toast.success(t("overall.spSucceed"));
      //   })
      //   .catch((e: any) => {
      //     console.log(e);
      //     Toast.clear();
      //     create_show.value = false;
      //     if (e?.data?.message && e.data.message.includes('err: insufficient funds for gas * price + value')) Toast.fail(t("overall.Balance"));
      //     else Toast.fail(t("overall.spFailed"));
      //   });

    }).catch((e: any) => {
      console.log(e);
      Toast.clear();
      create_show.value = false;
      Actions.setScreen(true);
      // create_show_close.value=false
      loadingInstance.close()
      proxy.$message.error(t("overall.spFailed"))
    });

  }
  else {
    //出售


    if (currency.value.length <= 0) return   proxy.$message.warning(t("business.choicenft"))
    //  Toast.fail(t("business.choicenft"));
    loadingShow_1.value = true
    console.log("buyOrdersAll", buyOrdersAll.value.length);
    console.log("currency", currency.value.length);

    console.log('transactionDepth',Number(proxy.$filters.numFilters2(transactionDepth.buyOrderCount)))
    // currency.value.length > buyOrdersAll.value.length //之前的判断
    // `${t('overall.sellsum')}${buyOrdersAll.value.length}

    // if (Number(currency.value.length) > Number(proxy.$filters.numFilters2(transactionDepth.buyOrderCount)))
    //   return
    //    Toast.fail(
    //     `${t('overall.sellsum')}${Number(proxy.$filters.numFilters2(transactionDepth.buyOrderCount))}`
    //   );
    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );

    if (!res) {
      //没有授权
      create_show.value = true;
      Toast.loading({
        message: t("overall.empowering") + "...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      let res2;
      try {
        res2 = await contracts.NFT.setApprovalForAll(
          proxy.$common.LSSVMRouter,
          true
        );
      } catch (e) {
        proxy.$message.error(t("overall.privilegegrantfailed"))
        // Toast.fail(t("overall.privilegegrantfailed"));
        console.log(e);
        loadingShow_1.value = false;
        create_show.value = false;
        Toast.clear();
      }
      if (res2) {
        res2 && (await res2.wait());
        Toast.clear();
        proxy.$message.success(t("overall.Empowersucceeded"))
        loadingShow_1.value = false;

        // Toast.success(t("overall.Empowersucceeded"));
        setTimeout(() => {
          Toast.clear();
        }, 1000);
      }
    }
    const loadingInstance = ElLoading.service({
        lock: false,
        text: '',
        background: 'rgba(0, 0, 0, 0.0)',
        spinner:'spinner'
      })
    Toast.clear();
    create_show.value = true;

    Actions.setScreen(false);
    let nfts_token_id = Object.values(currency.value);
    let token_ids = "";
    nfts_token_id.forEach((val) => (token_ids += val + ","));
    token_ids = token_ids.substring(0, token_ids.length - 1);
    sellNftForCurPrice({
      contractAddr:searchKey.value,
      nfts: token_ids.toString(),
      sellCount: currency.value.length,
    }).then(async (res: any) => {
      let arr: any[] = [];
      let arrLength: any[] = [];  //所有的单数
      res.forEach(async (val: any) => {
        arr.push([val.poolAddr, val.nftTokenId]);
        arrLength.push(...val.nftTokenId)
      });
      let contract_total = 0;
      console.log('length', arr);
      console.log('arrLength', arrLength)
      if (arrLength.length != currency.value.length) {
        create_show.value = false;
        loadingShow_1.value = false
        proxy.$message.warning(`${t('overall.buylen')}${arrLength.length},${t('overall.sellleng')}${arrLength.length}`)
         return

        // Toast.fail(`${t('overall.buylen')}${arrLength.length},${t('overall.sellleng')}${arrLength.length}`);
      }
    //   Toast.loading({
    //   message: t("overall.Selling") + "...",
    //   forbidClick: true,
    //   loadingType: "spinner",
    //   duration: 0,
    // });
      for (let i = 0; i < arr.length; i++) {
        try {
          contracts.LSSVMPairETH = new ethers.Contract(
            arr[i][0],
            LSSVMPairETH,
            providers
          ).connect(signers);
        } catch (e) {
          console.log(e);
          Actions.setScreen(true);
        }
        console.log("arr[i][1]", arr[i][1]);
        let res2 = await contracts.LSSVMPairETH.getSellNFTQuote(
          arr[i][1].length
        );
        console.log("res2", res2[3]);
        contract_total += Number(ethers.utils.formatUnits(res2[3], 18));
      }
      let a1 = Number(buyOrders.value[0].feePrice);
      // if (buyOrders.value[0].fee) {
      //     a1 = Number(buyOrders.value[0].price) + (Number(buyOrders.value[0].price) * (Number(buyOrders.value[0].fee)));
      // }
      a1 = Number(buyOrders.value[0].feePrice);
      // a1 = a1 * (1 - 0.105);
      a1 = a1 * currency.value.length;
      console.log("这里是a1", a1);
      console.log("contract_total", contract_total);
      // let newtotal = a1 > contract_total ? contract_total : a1;
      let newtotal = contract_total
      newtotal = newtotal * (99.99 / 100);  //上下浮动
      console.log("newtotal", newtotal);
      // let total = ethers.utils.parseUnits(a1.toString(), 18);
      // let total = ethers.utils.parseUnits(contract_total.toString(), 18);
      let total = ethers.utils.parseUnits((newtotal.toFixed(18)).toString(), 18);

      console.log("参数", arr, total, useraddress.value, time + 60);
      contracts.LSSVMRouter.swapNFTsForToken(
        arr,
        total,
        useraddress.value,
        time + 60
      )
        .then(async (res3: any) => {
          await res3.wait();
          Toast.clear();
          loadingShow_1.value = false
          loadingInstance.close()

          create_show.value = false;
          currency.value = '';
          getDate();
          getMarketlist()

          // buy_show.value = true
          proxy.$message.success(t("overall.Succeed"));
          // Toast.success(t("overall.Succeed"));
        })
        .catch((e: any) => {
          console.log(e);
          Toast.clear();
          create_show.value = false;
          loadingShow_1.value = false
          loadingInstance.close()

          proxy.$message.error(t("overall.Failed"));
          // Toast.fail(t("overall.Failed"));
        });
    }).catch((e) => {
      console.log(e);
      Toast.clear();
      create_show.value = false;
      loadingShow_1.value = false
      loadingInstance.close()


      if (e.toString().includes('当前该系列暂时没有用户挂买单')) proxy.$message.error(t("overall.nobuylist"));

      // Toast.fail(t("overall.nobuylist"));
      else   proxy.$message.error(t("overall.Failed"));

      //  Toast.fail(t("overall.Failed"));
    });
  }
};
const submit = async (type: number, authorizationType: boolean) => {

  create_show_1.value = false;
  Toast.loading({
    message: t("overall.empowering") + "...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 0,
  });
  let res2;
  try {
    res2 = await contracts.NFT.setApprovalForAll(
      proxy.$common.LSSVMRouter,
      true
    );
  } catch (e) {
    Toast.fail(t("overall.privilegegrantfailed"));
    console.log(e);
    create_show.value = false;
    setTimeout(() => {
      Toast.clear();
    }, 1000);
  }

  if (res2) {
    res2 && (await res2.wait());
    Toast.clear();
    Toast.success(t("overall.Empowersucceeded"));
    setTimeout(() => {
      Toast.clear();
    }, 1000);
    create_show_1.value = false;
    let res = await contracts.NFT.isApprovedForAll(
      useraddress.value,
      proxy.$common.LSSVMRouter
    );
    authorization.value = res || false;
  }
};
let currency = ref<string>("BNB");
let active = ref("1");
let active2 = ref(1);
let pond_type = ref<string>("");
const pondlist = reactive([
  {
    value: "1",
    label: t("NFTdetails.Buyapool"),
  },
  {
    value: "2",
    label: t("NFTdetails.Sellingpool"),
  },
  {
    value: "3",
    label: t("NFTdetails.Tradingpool"),
  },
]);
const changeConect = () => {
  ConnectWallet.value = false
}

const createPool = (type: any) => {
  console.log("111")
  if (!userinfo.value.isLogin) return ConnectWallet.value = true
  if (filterLogin(userinfo.value.isLogin, useraddress.value || String(userinfo.value.hexAddress))) {
    router.push({
      path: "/business/createpond",
      query: { type: type, searchKey: searchKey.value, contractName: nftContract.contractName, floorPrice: pricelist.floorPrice }
    });
  }


  console.log(searchKey.value, "searchKey")

}

let businesslist = computed(() => [
  { id: 1, name: t("business.purchase") },
  { id: 2, name: t("business.sellout") },
]);
let intervalSize= computed(() => [
  { id: 1, name:'0.005' },
  { id: 2, name: '0.01' },
  { id: 3, name: '0.02' },
  { id: 5, name: '0.05' },
  { id: 6, name: '0.1' },
  { id: 7, name: '0.2' },
  { id: 8, name: '0.5' },
  { id: 9, name: '1' },
  { id: 10, name: '2' },
  { id: 11, name: '5' },

]);

let businesslist_type = ref(1);
let intervalSize_type= ref(5);
const switchbusinesslist = (id: number) => {

  businesslist_type.value = id;
};
const switintervalSize= (id: number,name:any) => {
   intervalSize_type.value=id

  intervalsNumber.val=name

}
const switchbuy= (val:any) => {
  buy_type.value=val

}
const themeVars = {
  vanTabsBottomBarColor: "#5A64E9",
};
let selectoptions = [
  {
    id: "1",
    name: t("business.purchase"),
  },
  {
    id: "2",
    name: t("business.sellout"),
  },
];
let selectoptions_san_type = ref<number>(1);
let selectoptions_san = computed(() => [
  {
    id: "1",
    // name: t('business.Currententrustment')
    name: t("business.Mypool"),
  },
  {
    id: "2",
    name: t("business.Mydeal"),
  },
  {
    id: "3",
    name: t("business.Whole_network_transaction"),
  },
]);
const business = (type: string) => {
  if (!userinfo.value.isLogin) return console.log(t("overall.logTips"));
  if (type === "sell") {
    console.log("卖");
  } else {
    console.log("买");
  }
};
const openHash= (url: string) => {

  open(
    proxy.$common.bscscan + url
  );
}
const opnes = (url: string) => {
  // debugger
 open(
    url
  );
};

let Purchase = ref<number>(0);
let disabled_type = ref<boolean>(false);
let btn_name = ref<string>(t("business.buy"));
const Single_type = ref<string>(t("business.Market_single"));
let number = ref<number | string>("");
const options_nft_type = [
  {
    value: "USDT",
    label: "USDT",
    img: getPath("@/assets/img/USDT-icons.png"),
  },
  {
    value: "WBNB",
    label: "WBNB",
    img: getPath("@/assets/img/WBNB.png"),
  },
  {
    value: "ETH",
    label: "ETH",
    img: getPath("@/assets/img/WETH-icons.png"),
  },
  {
    value: "BNB",
    label: "BNB",
    img: getPath("@/assets/img/WBNB.png"),
  },
];
// 我的成交
const getMyAllTransaction = () => {
  getMyTransaction({
    contractAddr: searchKey.value,
  }).then((res: any) => {
    let Transaction: nftrecordType[] = [];
    res.rows.forEach((val: any) => {
      Transaction.push({
        id: val.nftTokenId,
        series: val.contractName || "--",
        time: new Date(val.createTime).toLocaleString() || "--",
        price: val.nftPrice || "--",
        type: Number(val.type) == 1 ? true : false,
        Pooltype: Number(val.type) == 1 ? '0' : '1',
        code: "#" + val.nftTokenId,
        has: val.txHash,
        from:val.from,

        to:val.to,
        newType:val.type

        // Delegation: '买单'
      });
    });
    Mytransactionlist.value = Transaction;
    Mytransactionlist_new.value=Mytransactionlist.value

    // Mytransactionlist.value = Mytransactionlist.value.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
      Mytransactionlist.value=Mytransactionlist.value.slice(0,5)
    console.log(Transaction);
  });
};

const goRankinglist = () => {
  //  debugger
  // router.push("/home/Rankinglist");
   Mytransactionlist.value=Mytransactionlist_new.value.slice(0,100)
  console.log(Mytransactionlist.value)
};
// 全网成交
const getAllTransactions = () => {
  getAllTransaction({ contractAddr: searchKey.value }).then((res: any) => {
    let Transaction: nftrecordType[] = [];
    res.rows.forEach((val: any) => {
      Transaction.push({
        id: val.nftTokenId,
        series: val.contractName || "--",
        time: new Date(val.createTime).toLocaleString() || "--",
        price: val.nftPrice || "--",
        type: Number(val.type) == 1 ? true : false,
        code: "#" + val.nftTokenId,
        has: val.txHash,
        newType:val.type
      });
    });
    transactionlist.value = Transaction;
    transactionlist.value = transactionlist.value.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
    transactionlist.value=transactionlist.value.slice(0,10)
    Mytransactionlist_new.value=Transaction
    console.log(transactionlist.value);
  });
};
let currency_img = reactive({ img: "" });
const select_san_name = (name: number, title: string): void => {
  selectoptions_san_type.value = name;
  if (selectoptions_san_type.value === 0) {
    //我的池子
    updatepool();
  } else if (selectoptions_san_type.value === 1) {
    //我的成交
    getMyAllTransaction();
  } else {
    //全网成交
    getAllTransactions();
  }
  console.log(selectoptions_san_type.value);
  // console.log(id);
};
const godetails = (): void => {
  router.push({ path: "/business/nftseriesdetail", query: nftContract });
};
 // 筛选
 const getMarketlist = () => {

  // loading.value=true
  // seachData.param.contractAddr=searchKey.value
  //
  // getNftListByMarket(seachData)
  //   .then((res: any) => {
  //      marketList.value = res.rows;
  //      // console.log(marketList.value);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //
  //   });
};
// function time() {
//   nftlist.data.forEach((val: any) => {
//     let time = ''
//     time = setTime(new Date().getTime(), new Date(val.time).getTime())
//   })

// }
function setTime(newtime: any, usedtime: any) {

  let time = newtime - usedtime
  let days = parseInt(time / (1000 * 60 * 60 * 24));
  let hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) > 0 ? parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) : 1;
  let seconds = parseInt(time/1000);
  let times = ''

  if (seconds>0) {
    times = seconds + ` ${t('browse.seconds')}`
  }
  if (minutes > 0 && seconds>60) {
    times = minutes + ` ${t('browse.minutes')}`
  }
  if (hours > 0 && hours < 24) {
    times = hours + ` ${t('browse.hours')}`
  }
  if (days > 0 && days < 30) {
    times = days + ` ${t('browse.day')}`
  }
  if (days > 30) {
    times = 1 + `${t('browse.month')}`
  }

  return times;

// if(hours>0){
//     times =  hours + " hour " + minutes + " minute ";
// }
// if(days>0){
//     times = days + " day " + hours + " hour " + minutes + " minute ";
// }
}
</script>

<style scoped lang="scss">
.business_box{
    background: url(@/assets/img/buiness_icon.png) no-repeat;
      background-size: 100% 100%;
      background-size: contain;
}
//新加的样式
.business_new1{
  display: flex;
  justify-content: space-between;
  padding-left: 120px;
}
.newFlex{
  align-items: center;
  border: 1px solid #EBEEF2;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 12px;
}
.businessNew_list{
  display:flex;
  margin-top:10px;
  align-items: stretch;
  padding-left: 30px;
  padding-right: 30px;
}
 .max_box{
      // background: #fff;
      // background: url(@/assets/img/home_3.png) no-repeat;
      // background-size: 100% 100%;
      // background-size: contain;
     }
.business{
  padding: 30px 0px 0px 0px;
  margin-top: 80px;
  // margin-top: 30px;
  //  position: fixed;
  //   box-sizing: border-box;
  //   overflow-y: scroll;
  //   overflow-x: hidden;
  //   min-width: 100vw;
  //   max-width: 100vw;
  //   min-height: 100vh;
  //   max-height: 100vh;
  //   background: #000;
    .main{
       height: 450px;
       position: relative;
       top:0px;
       margin-left: 35px;
       width:100%;
    }
  &-header{
    display: flex;
    align-items: center;
  }
    &-logo{
      width: 128px;
      height: 128px;
     border-radius: 50%;

    }
    &-right{
       margin-left: 20px;
      img{
        margin-right: 15px;
      }
      div img{
        margin-right: 5px;
      }
      span{
        color: #999;
        font-size: 14px;
        position: relative;
        top: -4px;
      }

    }
    &-flex{
      display: flex;
    }
    .title{
      font-family: PingFang SC;
      font-weight: bold;
      color: #23262F;
      font-size: 30px;
    }
    &-img{
      object-fit: contain;
      margin-left: 3px;
    }
    &-Introduction2{
      font-size: 14px;
     font-family: PingFangSC-regular;
     padding-top:10px;
    //  overflow: hidden;
    // text-overflow: ellipsis;
    width: 350px;
    // white-space: nowrap;
    }
    &-Introduction{
      // color: rgba(255, 255, 255, 1);
     font-size: 14px;
     font-family: PingFangSC-regular;
     padding-top:10px;
     overflow: hidden;
    text-overflow: ellipsis;
    width: 350px;
    white-space: nowrap;
    }
    &-item{
      display: flex;
      margin-top: 17px;
      padding-left: 120px;
    }
    &-list
  {
    margin-right:35px ;
  }
    .price{
      color: #23262F;
      font-size: 30px;
      padding-left: 5px;

    }
    .Floor{
      color: #777E90;
      font-size: 14px;
      text-align: left;
      padding-top: 3px;
    }
  &-table{
      padding-top: 20px;
      background: #fff;
      padding-right: 120px;
      padding-left: 120px;
    }
    .table-list{
      width: 25%;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
    }
    .table-flex{
      font-weight: bold;
color: #777E90;
      font-size: 14px;
      display: flex;
      // justify-content: space-between;
      padding-bottom:5px;
    }
    .echarts{
      color: #949494;
      span{
        padding-right: 10px;
        cursor: pointer;
        font-weight: 600;
      }
    }
    .buyorder{
      width: 30px;
      height: 20px;;
      line-height: 20px;
      background-color: rgba(24, 159, 122, 1);
      color: rgba(16, 16, 16, 1);
      font-size: 14px;
      margin-right: 10px;
      span{
        color: #fff;
      }
    }
    .buyorderSpn{
      color: #949494;
      padding-right: 10px;
      cursor: pointer;
    }
    .activeSpn{
      color: #fff;
    }
    .active{
      color: #fff;
    }
    // 中间部分
    .right{
      width: 25%;
      margin-left: 50px;
      display: flex;
    flex-direction: column;
    justify-content: space-around;
      &-flex{
        display: flex;
      }
      &-btn{
        width: 50%;
        height: 45px;
        border-radius: 4px;
        line-height: 45px;
        background-color: rgba(153, 153, 153, 1);
        color:#000;
        font-size: 14px;
        text-align: center;
        font-family: Microsoft Yahei;
        border: 1px solid rgba(187, 187, 187, 1);
        margin-right: 5px;
        cursor: pointer;
      }
      .spn{
        color: #fff;
        background-color: v-bind('businesslist_type===1 ? "#189F7A" : "#FF4848"'
            );

      }
      .right-title{
        font-weight: bold;
color: #23262F;
        font-size: 16px;
        text-align: left;
        font-family: PingFangSC-regular;
        padding: 10px 0px 10px 0px;
        // padding: 22px 0px 25px 0px;
      }
      &-flex_1{
        position: absolute;
          right: 10px;
          top: 13px;
          display: flex;
        img{
          width: 15px;
          object-fit: contain;

        }
        div{
          color: rgba(255, 255, 255, 1);
          font-size: 14px;
          padding-left: 5px;
        }
      }
      &-footer{
            width: 100%;
            height: 48px;
            line-height: 48px;
            cursor: pointer;
            border-radius: 5px;
            background-color: v-bind('businesslist_type===1 ? "#189F7A" : "#FF4848"'
                );
            color: rgba(255, 255, 255, 1);
            font-size: 16px;
            text-align: center;
            font-family: Roboto;
            margin-top:.0938rem
          }
      }
    // 我的成交
    .make{
      margin-top: 20px;
      padding-right: 120px;
      padding-left: 120px;

      &-btn{
        width: 20%;
        // margin-right: 15px;
        height: 50px;
        line-height: 50px;
        background-color: rgba(24, 159, 122, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: center;
        font-family: Microsoft Yahei;
        border-radius: 8px;
        cursor: pointer;
      }
      &-btn:nth-child(1){
        margin-right: 15px;
      }
      &-btn:nth-child(2){
        margin-right: 15px;
      }
    }

}

@media screen and (min-width: 1280px){
  .newFlex{
    // width: 790px !important;
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
  .echarts{
    padding-top: 20px;
  }
}
@media screen and (min-width: 1366px){
  .newFlex{
  display: flex;
  flex-direction: column;
  justify-content: center;

}
}
@media screen and (min-width: 1440px){
  .newFlex{
  display: flex;
  justify-content: space-between;
  flex-direction: row;

}
.echarts{
    padding-top: 0px;
  }
}
.more{
        background-color: rgba(244, 247, 249, 1);
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #353945;
        font-family: Roboto;
        // padding: 34px 0px 34px 0px;
        cursor: pointer;
        width: 100px;
        height: 48px;
        border: 1px solid #EEF0F2;
        border-radius: 8px;
        text-align: center;
        line-height: 48px;
        margin-bottom: 30px;
      }
      .more:hover{
        background: #23262F;
        color: #fff;
      }
.newFlex{
  // display: flex;
  //   justify-content: space-between;
}
.left{
  color: #f6465d !important;
}
.right_1{
  color: #47a182 !important;
}
.el-select__popper.el-popper{
   background: red !important;
}
.newList{
  border-right: 1px solid #EEF0F2;
    padding-right: 30px;
}
</style>
<style lang="scss">
    .business .el-tabs--top .el-tabs__item.is-top{
        font-size: 18px;
        color: #777E90;
       }
    .el-tabs__item.is-active{
      color: #23262F !important;
      font-weight: 600
    }

    .business .el-input{
      height: 48px;
    }
    .business  .el-select{
      width: 100%;
    }
    .business  .el-input__inner{
      text-align: center;
    }
    .business .el-tabs__nav-wrap::after{
        background-color: rgba(153, 153, 153, 0.2);;
    }
    .business {
      .el-table td.el-table__cell{
       border-bottom: 1px solid rgba(153, 153, 153, 0.2) !important;
      }

      .el-table__row{
       height: 80px;
       }
       .el-table__body-wrapper{
            border: 1px solid
      }
      .el-table th.el-table__cell.is-leaf{
        border-bottom: 1px solid rgba(153, 153, 153, 0.2) !important;

      }
      .cell{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #777E90;
        }
        .van-stepper{
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #fff;
          border-radius: 5px;
          height:48px;
        }
        .van-stepper__minus{
          width: 35px;
          height:30px;

        }
        .van-stepper__input{
          width: 30px;
          height:30px;
        }
        .van-stepper__plus{
          width: 35px;
          height:30px;

        }
        .el-table__body-wrapper{
          border: none;

      }

    }


.wrapper_1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  &-title {
    display: flex;
    justify-content: space-between;
    text-align: center;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #0F0F0F;
  }

  &-describe {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #B2B2B4;
    padding-top: 15px;
    text-align: center;
  }

  &-btn {
    width: 90px;
    height: 45px;
    background: #FEFEFE;
    border: 1px solid #7C7C7C;
    border-radius: 21px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
  }

  .block {
    width: 400px;
    background: #FFFFFF;
    border-radius: 15px;
    padding: 20px 40px 40px 40px;
  }
}

.make .el-tab-pane{
  padding-left: 30px;
    padding-right: 30px;
}
.el-select-dropdown__wrap{
  max-height: 140px;
}
.footer_btn{
  background-color: rgb(246, 69, 93) !important;
}
.van-overlay{
  background-color: rgba(0, 0, 0, .3) !important;
}
.spinner{
  display: none;
}
// @media screen and (min-width: 1366px){
//      .dateNew{
//        width: 55% !important;
//       }
//   }
// @media screen and (min-width: 1400px){
//      .dateNew{
//        width: 55% !important;
//       }
//   }
//   @media screen and (min-width: 1680px){
//      .dateNew{
//        width: 50% !important;
//       }
//   }
</style>
