<template>
  <div>
    <el-table :data="nftlist.data" style="width: 100%" v-if="nftlist.active==5">
      <el-table-column prop="date" :label="t('business.Transactiontype')" width="200">
        <template #default="scope">
          <div :style="{
            color:
              scope.row.Pooltype === '0'
                ? '#47A182'
                : scope.row.Pooltype === '1'
                  ? '#F6455D'
                  : '#5A64E9',
          }">
            {{
              scope.row.Pooltype === "0"
                ? t("NFTdetails.Buyapool")
                : scope.row.Pooltype === "1"
                  ? t("NFTdetails.Sellingpool")
                  : t("NFTdetails.Tradingpool")
            }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="Name"  /> -->
      <el-table-column prop="name" :label="t('my.offer')">
        <template #default="scope">
          <div style="display:flex;align-items: center;">
            <img style="    margin-right: 8px;" width="30" src="@/assets/img/WBNB.png" />
            <span>{{ scope.row.price != '--' && Number(scope.row.price).toFixed(4) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('my.series')">
        <template #default="scope">
          <div>
            {{ scope.row.series }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('business.Token')">
        <template #default="scope">
          <div style="display:flex;align-items: center;">
            <img style="    margin-right: 8px;" width="30" src="@/assets/img/WBNB.png" />
            <span>{{ scope.row.Token }}</span>

          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('business.Purchasequantity')">
        <template #default="scope">
          <div>
            {{ scope.row.quantity }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('my.Curvetype')">
        <template #default="scope">
          <div style="color: #5a64e9;">
            {{ scope.row.curvetype ? t("business.Finger") : t("business.linear") }}
            <span class="curvetquantity">{{ scope.row.curvetquantity }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('NFTdetails.ServiceCharge')">
        <template #default="scope">
          <div v-if="scope.row.Pooltype === '2'">
            {{ scope.row.Service }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="操作" :label="t('my.operation')">
        <template #default="scope">
          <div
            @click.stop="scope.row.type ? setRevoke(scope.row.id, scope.row.Pooltype, scope.row.poolAddr, scope.row.nftContractAddr) : ''"
            :style="{ color: scope.row.type ? '#5A64E9' : '#96959A' }" @click="handleEdit(scope.row)"
            style="color: rgba(46, 104, 231, 1);"> {{ scope.row.type ? t("my.cancel_the_order") : t("my.rescinded") }}
          </div>
        </template>
      </el-table-column>

    </el-table>
    <div v-if="nftlist.active == 1" class="main">
      <div class="box" v-for='(item, index) in nftlist.data' :key="index">
        <div class="sell">
          <div style="    display: flex;align-items: center;">
            <img v-if="item.Pooltype === '0'" width="22" height="26" src="../assets/img/business_icon6.png"
              style='margin-right: 5px;' />

            <img v-if="item.Pooltype === '1'" width="22" height="26" src="../assets/img/business_icon5.png"
              style='margin-right: 5px;' />

            <img v-if="item.Pooltype === '2'" width="22" height="26" src="../assets/img/bussiness_icon8.png"
              style='margin-right: 5px;' />

            <div style="border:none;width: 50px;"> {{
              item.Pooltype === "0"
                ? t("NFTdetails.Buyapool")
                : item.Pooltype === "1"
                  ? t("NFTdetails.Sellingpool")
                  : t("NFTdetails.Tradingpool")
            }} </div>
          </div>

          <div class="withdraw" style="cursor: pointer;" v-if="item.type"
            @click.stop="item.type ? setRevoke(item.id, item.Pooltype, item.poolAddr, item.nftContractAddr) : ''"> {{
              t("my.cancel_the_order")
            }}</div>
          <div style="border: none;" v-else> {{
            t("my.rescinded")
          }}</div>
        </div>
        <div class="sell-box" @click="next(item.poolAddr)">
          <div style=" display: flex;justify-content: space-between;" v-if="item.Pooltype == '2'">
            <div>
              <div class="sell-price">{{ t("business.SellingpoolNew") }}</div>
              <div style='display:flex;padding-top:.0469rem'>

                <img src='@/assets/img/chain_2.png' class="sell-img" />
                <div class="sell-num">{{ item.price != '--' && Number(item.price).toFixed(4) }}</div>
              </div>
            </div>
            <div>
              <div class="sell-price">{{ t("business.BuyapoolNew") }}</div>

              <div style='display:flex;padding-top:.0469rem'>

                <img src='@/assets/img/chain_2.png' class="sell-img" />

                <div v-if="item.buyAmount" class="sell-num">{{
                  item.buyAmount != '--' &&
                    Number(item.buyAmount).toFixed(4)
                }}</div>
                <div class="sell-num" v-else>0.0000</div>
              </div>
            </div>
          </div>
          <div style=" display: flex;justify-content: space-between;"
            v-if="item.Pooltype == '1' || item.Pooltype == '0'">
            <div class="sell-list">
              <div class="sell-price">{{
                item.Pooltype === "0" ? t("business.BuyapoolNew") :
                  t("business.SellingpoolNew")
              }} </div>
              <div style='display:flex;padding-top:.0469rem'>
                <img src='@/assets/img/chain_2.png' class="sell-img" />
                <div class="sell-num">{{ item.price != '--' && Number(item.price).toFixed(4) }}</div>
              </div>
            </div>
          </div>
          <!-- <div class="sell-line"></div> -->
          <div>

          </div>
          <div style="display: flex;justify-content: space-between;">
            <div class="sell-delta">
              <div class="sell-left">Delta: </div>
              <div style="display:flex;align-items: center;">
                <img src="../assets/img/xianshu.png" class="sell-icon" v-if="item.curvetype" />
                <img src="../assets/img/zhishu.png" class="sell-icon" v-else />

                <div class="sell-right">{{ item.curvetquantity }}</div>
              </div>
            </div>
            <div class="sell-delta">
              <div class="sell-left">{{ t("business.Balance") }}: </div>

              <div style="display:flex">
                <div style="display:flex;margin-right: 12px;" v-if="item.Pooltype == '1' || item.Pooltype == '2'">
                  <img :src="nftlist.contractLogo" width="16" height="16"
                    style='margin-right: 8px;border-radius: 50%; object-fit: cover;' />
                  <div class="sell-right"> {{ item.sellNftCount }} </div>
                </div>
                <div style="display:flex" v-if="item.Pooltype != '1'">
                  <img src="@/assets/img/chain_2.png" width="12" class="sell-img"
                    style='margin-right: 8px;width: 14px;' />

                  <div class="sell-right">{{ item.Token }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sell-line"></div>
        <div class="sell-delta" v-if="item.Pooltype == '2'"
          style="align-items: center; justify-content: space-between;position: relative;">
          <div class="sell-left" style="font-size:16px">{{ t("business.ServiceCharge") }}</div>
          <div style="display:flex;    justify-content: space-between;">
            <!-- <div class="sell-icon">EXP</div> -->
            <div class="sell-right" style="   font-size: 16px;"> {{ item.Service }}</div>
          </div>
        </div>
        <div class="sell-delta" :style="{
          padding:
            item.Pooltype === '2'
              ? '5px 0px 0px 0px'
              : '35px 0px 0px 0px'
        }" style="align-items: center; justify-content: space-between;   ">
          <div class="sell-left" style="font-size:16px">{{ t("my.Consignment_order") }}</div>
          <div style="display:flex">
            <!-- <div class="sell-icon">EXP</div> -->
            <div class="sell-right" style="    font-size: 16px;">

              {{ proxy.$filters.addressFilters(item.poolAddr, 6, 4) }}


              <img width="18" height="18" @click.stop="copy(item.poolAddr)" class="business-img"
                src='../assets/img/copy_3.png' style=" cursor: pointer;" />

            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-if="(nftlist.active == 11)" class="main_new" style="position:relative;min-height: 250px;">
      <div class="box_new" v-for='(item, index) in nftlist.data' :key="index">
        <div class="sell">
          <div style="    display: flex;align-items: center;">
            <img v-if="item.Pooltype === '0'" width="22" height="26" src="../assets/img/business_icon6.png"
              style="margin-right: 5px;" />

            <img v-if="item.Pooltype === '1'" width="22" height="26" src="../assets/img/business_icon5.png"
              style="margin-right: 5px;" />

            <img v-if="item.Pooltype === '2'" width="22" height="26" src="../assets/img/bussiness_icon8.png"
              style="margin-right: 5px;" />

            <div style="border:none;width: 50px;"> {{
              item.Pooltype === "0"
                ? t("NFTdetails.Buyapool")
                : item.Pooltype === "1"
                  ? t("NFTdetails.Sellingpool")
                  : t("NFTdetails.Tradingpool")
            }} </div>
          </div>

          <div class="withdraw" style="cursor: pointer;" v-if="item.type"
            @click.stop="item.type ? setRevoke(item.id, item.Pooltype, item.poolAddr, item.nftContractAddr) : ''"> {{
              t("my.cancel_the_order")
            }}</div>
          <div style="border: none;" v-else> {{
            t("my.rescinded")
          }}</div>
        </div>
        <div class="sell-box" @click="next(item.poolAddr)">
          <div style=" display: flex;justify-content: space-between;" v-if="item.Pooltype == '2'">
            <div>
              <div class="sell-price">{{ t("business.SellingpoolNew") }}</div>
              <div style='display:flex;padding-top:.0469rem'>
                <img src='@/assets/img/chain_2.png' class="sell-img" />
                <div class="sell-num">{{ item.price != '--' && Number(item.price).toFixed(5) }}</div>
              </div>
            </div>
            <div>
              <div class="sell-price">{{ t("business.BuyapoolNew") }}</div>

              <div style='display:flex;padding-top:.0469rem'>

                <img src='@/assets/img/chain_2.png' class="sell-img" />

                <div v-if="item.buyAmount" class="sell-num">{{
                  item.buyAmount != '--' &&
                    Number(item.buyAmount).toFixed(4)
                }}</div>
                <div class="sell-num" v-else>0.0000</div>
              </div>
            </div>
          </div>
          <div style=" display: flex;justify-content: space-between;"
            v-if="item.Pooltype == '1' || item.Pooltype == '0'">
            <div class="sell-list" style="display: flex;  align-items: center; justify-content: space-between;">
              <div class="sell-price">{{
                item.Pooltype === "0" ? t("business.BuyapoolNew") :
                  t("business.SellingpoolNew")
              }} </div>
              <div style='display:flex;'>
                <img src='@/assets/img/chain_2.png' class="sell-img" />
                <div class="sell-num">{{ item.price != '--' && Number(item.price).toFixed(4) }}</div>
              </div>
            </div>
          </div>
          <!-- <div class="sell-line"></div> -->
          <div>

          </div>
          <div style="display: flex;justify-content: space-between;">
            <div class="sell-delta">
              <div class="sell-left">Delta: </div>
              <div style="display:flex;align-items: center;">
                <img src="../assets/img/xianshu.png" class="sell-icon" v-if="item.curvetype" />
                <img src="../assets/img/zhishu.png" class="sell-icon" v-else />

                <div class="sell-right">{{ item.curvetquantity }}</div>
              </div>
            </div>
            <div class="sell-delta">
              <div class="sell-left">{{ t("business.Balance") }}: </div>

              <div style="display:flex">
                <div style="display:flex;margin-right: 12px;" v-if="item.Pooltype == '1' || item.Pooltype == '2'">
                  <img :src="nftlist.contractLogo" width="16" height="16"
                    style='margin-right: 8px;border-radius: 50%; object-fit: cover;' />
                  <div class="sell-right"> {{ item.sellNftCount }} </div>
                </div>
                <div style="display:flex" v-if="item.Pooltype != '1'">
                  <img src="@/assets/img/chain_2.png" width="12" class="sell-img"
                    style='margin-right: 8px;width: 14px;' />

                  <div class="sell-right">{{ item.Token }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sell-line"></div>
        <div class="sell-delta" v-if="(item.Pooltype == 2)"
          style="align-items: center; justify-content: space-between;position: relative;">
          <div class="sell-left" style="font-size:16px">{{ t("business.ServiceCharge") }}</div>
          <div style="display:flex;    justify-content: space-between;">
            <!-- <div class="sell-icon">EXP</div> -->
            <div class="sell-right" style="   font-size: 16px;"> {{ item.Service }}</div>
          </div>
        </div>
        <div class="sell-delta" :style="{ padding: item.Pooltype === '2' ? '5px 0px 0px 0px' : '35px 0px 0px 0px' }"
          style="align-items: center; justify-content: space-between;">
          <div class="sell-left" style="font-size:16px">{{ t("my.Consignment_order") }}</div>
          <div style="display:flex">
            <div class="sell-right" style="font-size: 0.625vw; ">

              {{ proxy.$filters.addressFilters(item.poolAddr, 6, 4) }}


              <img width="14" height="14" @click.stop="copy(item.poolAddr)" class="business-img"
                src='../assets/img/copy_3.png' style=" cursor: pointer;" />

            </div>

          </div>
        </div>
      </div>
      <el-empty style="position: absolute;left: 50%;transform: translateX(-50%);top: 10%;"
        v-if="(nftlist.data.length <= 0)" :image-size="120" description="No Data" />
    </div>
    <el-table :data="nftlist.data" style="width: 100%" v-if="nftlist.active == 2">
      <template #empty>
        <el-empty :image-size="120" description="No Data" />
      </template>
      <el-table-column prop="name" :label="t('business.Transactiontype')" align="center">
        <template #default="scope">
          <div v-if="scope.row.Pooltype === '0'"
            style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color: #20A886;white-space: nowrap; ">{{
              t("business.purchase")
            }}</div>
          <div v-else style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color:#F05D62 ">
            {{ t("my.sellout") }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" :label="t('my.number')" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.code }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('business.price')" align="center">
        <template #default="scope">
          <div style=" font-weight: bold;color: rgb(35, 38, 47);">
            <img src='../assets/img/business_icon4.png' width="16" height="16" style="position:relative;top:2px" />
            {{
              scope.row.price != '--' &&
                Number(scope.row.price).toFixed(4)
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('my.Sender')" align="center">
        <template #default="scope">
          <div style="cursor: pointer;font-weight: bold;color:#47a182;" @click.stop="opens2(scope.row.to)"
            v-if="scope.row.newType == 2">
            {{
              proxy.$filters.addressFilters(scope.row.to.toString(), 5, 4)
            }}
          </div>
          <div style="cursor: pointer;    font-weight: bold;color:#47a182;" @click.stop="opens2(scope.row.from)"
            v-if="scope.row.newType == 1">
            {{
              proxy.$filters.addressFilters(scope.row.from.toString(), 5, 4)
            
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('my.Receiver')" align="center">
        <template #default="scope">
          <div style="cursor: pointer;    font-weight: bold;color: #f6465d" @click.stop="opens2(scope.row.from)"
            v-if="scope.row.newType == 2">
            {{
              proxy.$filters.addressFilters(scope.row.from.toString(), 5, 4)
            
            }}
          </div>
          <div style="cursor: pointer;font-weight: bold;color:  #f6465d" @click.stop="opens2(scope.row.to)"
            v-if="scope.row.newType == 1">
            {{
              proxy.$filters.addressFilters(scope.row.to.toString(), 5, 4)
            
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date" :label="t('my.date')" align="left">
        <template #default="scope">
          <div style="display: flex;align-items: center;cursor: pointer;white-space: nowrap;"
            @click.stop="opens(scope.row.has)">
            <div style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color: #23262F;">
              {{ setTime(webValue.timeNow, new Date(scope.row.time).getTime()) }}{{ t('browse.ago') }}
            </div>
            <img src="../assets/img/time.png" width="16" height="16" style="margin-left:10px" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="nftlist.data" style="width: 100%" v-if="(nftlist.active == 22)">
      <template #empty>
        <el-empty :image-size="120" description="No Data" />
      </template>
      <el-table-column prop="name" :label="t('business.Transactiontype')" align="center">
        <template #default="scope">
          <div v-if="(scope.row.newType == 1)"
            style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color: #20A886; ">{{
              t("business.purchase")
            }}</div>
          <div v-else style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color:#F05D62 ">
            {{ t("my.sellout") }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" :label="t('my.number')" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.id }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('business.price')" align="center">
        <template #default="scope">
          <div style=" font-weight: bold;color: rgb(35, 38, 47);">
            <img src='../assets/img/business_icon4.png' width="16" height="16" style="position:relative;top:2px" />
            {{
              scope.row.price != '--' &&
                Number(scope.row.price).toFixed(4)
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('my.Sender')" align="center">
        <template #default="scope">
          <div style="cursor: pointer;font-weight: bold;color:#47a182;" @click.stop="opens2(scope.row.to)"
            v-if="scope.row.newType == 2">
            {{
              proxy.$filters.addressFilters(scope.row.to, 4, 4)
            }}
          </div>
          <div style="cursor: pointer;    font-weight: bold;color:#47a182;" @click.stop="opens2(scope.row.from)"
            v-if="scope.row.newType == 1">
            {{
              proxy.$filters.addressFilters(scope.row.from, 4, 4)
            
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="t('my.Receiver')" align="center">
        <template #default="scope">
          <div style="cursor: pointer;    font-weight: bold;color: #f6465d" @click.stop="opens2(scope.row.from)"
            v-if="scope.row.newType == 2">
            {{
              proxy.$filters.addressFilters(scope.row.from, 4, 4)
            
            }}
          </div>
          <div style="cursor: pointer;font-weight: bold;color:  #f6465d" @click.stop="opens2(scope.row.to)"
            v-if="scope.row.newType == 1">
            {{
              proxy.$filters.addressFilters(scope.row.to, 4, 4)
            
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date" :label="t('my.date')" align="left">
        <template #default="scope">
          <div style="display: flex;align-items: center;cursor: pointer;white-space: nowrap;"
            @click.stop="opens(scope.row.has)">
            <div style="font-size: 16px;font-family: PingFang SC;font-weight: bold;color: #23262F;">
              {{ setTime(webValue.timeNow, new Date(scope.row.time).getTime()) }}{{ t('browse.ago') }}
            </div>
            <img src="../assets/img/time.png" width="16" height="16" style="margin-left:10px" />
          </div>
        </template>
      </el-table-column>

    </el-table>

    <el-table :data="nftlist.data" style="width: 100%" v-if="nftlist.active == 3">

      <el-table-column prop="date" :label="t('my.number')">
        <template #default="scope">
          <div>
            {{ scope.row.code }}
          </div>
        </template>

      </el-table-column>
      <el-table-column prop="name" :label="t('my.price')">
        <template #default="scope">
          <div>
            {{ scope.row.price != '--' && Number(scope.row.price).toFixed(4) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="TX">
        <template #default="scope">
          <div style="color: #5a64e9;cursor: pointer;" @click.stop="opens(scope.row.has)">
            {{ proxy.$filters.addressFilters(scope.row.has.toString(), 5, 4) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="date" :label="t('my.date')">

        <template #default="scope">
          <div>
            {{ scope.row.time }}
          </div>
        </template>
      </el-table-column>

    </el-table>

    <div v-if="nftlist.active == 9" style=" cursor: default;">
      <el-table :data="nftlist.data" style="width:100%;margin: 0 auto 100px;">
        <el-table-column prop="date" :label="$t('my.type')" align="center">
          <template #default="scope">
            <div :style="scope.row.type ? 'color:rgb(24, 159, 122);' : 'color:rgb(246, 69, 93);'">
              {{ scope.row.type ? t('my.purchase') : t('my.sellout') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('NFTdetails.price')">
          <template #default="scope">
            <div style="color:#3f3f5b;">
              <img style="width: 12px;
height: 12px;" src="@/assets/img/BNB.png" alt=""> {{ Number(scope.row.price).toFixed(4) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('my.series')">
          <template #default="scope">
            <span>{{ scope.row.series }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('business.code')">
          <template #default="scope">
            <div>
              {{ scope.row.code }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('my.Sender')">
          <template #default="scope">
            <!-- <div style="color:rgb(24, 159, 122);">
              <span class="curvetquantity">{{
                  scope.row.type ? proxy.$filters.addressFilters(scope.row.from.toString(), 5,
                    4) : proxy.$filters.addressFilters(scope.row.to.toString(), 5, 4)
              }}</span>
            </div> -->

            <div style="cursor: pointer;font-weight: bold;color:#47a182;" @click.stop="opens2(scope.row.to)"
              v-if="scope.row.type == false">
              {{
                proxy.$filters.addressFilters(scope.row.to.toString(), 5, 4)
              }}
            </div>
            <div style="cursor: pointer;    font-weight: bold;color:#47a182;" @click.stop="opens2(scope.row.from)"
              v-if="scope.row.type == true">
              {{
                proxy.$filters.addressFilters(scope.row.from.toString(), 5, 4)
              
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('my.Receiver')">
          <template #default="scope">
            <!-- <div style="color:rgb(246, 69, 93);">
              <span class="curvetquantity">{{
                  scope.row.type ? proxy.$filters.addressFilters(scope.row.to.toString(), 5,
                    4) : proxy.$filters.addressFilters(scope.row.from.toString(), 5, 4)
              }}</span>
            </div> -->
            <div style="cursor: pointer;    font-weight: bold;color: #f6465d" @click.stop="opens2(scope.row.from)"
              v-if="scope.row.type == false">
              {{
                proxy.$filters.addressFilters(scope.row.from.toString(), 5, 4)
              
              }}
            </div>
            <div style="cursor: pointer;font-weight: bold;color:  #f6465d" @click.stop="opens2(scope.row.to)"
              v-if="scope.row.type == true">
              {{
                proxy.$filters.addressFilters(scope.row.to.toString(), 5, 4)
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date" :label="$t('my.date')">
          <template #default="scope">
            <div>
              <a style="color:rgb(63, 63, 91);" target="_blank" @click.stop="opens(scope.row.has)"
                href="javascript:;">{{
                  setTime(webValue.timeNow, new Date(scope.row.time).getTime())
                }} <img style="width: 10px;
height: 10px;" src="@/assets/img/time.png" alt=""></a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--  撤销弹出   nameType-->
    <!-- <van-overlay :show="nameType" @click="cancel">
      <div class="wrapper" @click.stop>
        <p>{{ $t('my.cancel_the_order') }}</p>
        <div class="btn">
          <div @click="cancel">{{ $t('overall.cancel') }}</div>
          <div @click="
            revoke()
          ">
            {{ $t('overall.confirm') }}
          </div>
        </div>
      </div>
    </van-overlay> -->
    <van-overlay style="z-index: 10002;" :show="nameType">
      <div class="wrapper_1" @click.stop>
        <div class="block">
          <div class="wrapper_1-title">
            <div> {{ $t('overall.withdrawal') }}</div>
            <div @click="nameType = false" style="cursor: pointer;font-size: 1.5em;">×</div>
          </div>
          <div class="wrapper_1-describe">
            <img src='@/assets/img/chexiao.png' />
          </div>
          <div style="    text-align: center;">
            <van-loading color="#1989fa" />
          </div>
          <div style="padding-top: 10px;line-height: 25px;text-align: center;">
            {{ $t('overall.cancellation') }}
          </div>
          <!-- <div style="display:flex;justify-content: center;margin-top: 15px;">
          <div class="wrapper_1-btn" @click="create_show_1 = false">{{ t("business.Cancel") }}</div>

          <div class="wrapper_1-btn" @click="submit"
            style='background: #5A64E9;color: #fff;border:none;margin-left: 20px;'>{{ t("business.confirm") }}</div>
        </div> -->
        </div>
      </div>
    </van-overlay>
  </div>
</template>


<script lang="ts" setup>
// //接收父组件传过来的值,需要注意defineProps只能在setup语法糖里面使用，不需要import引入
import {
  onMounted,
  PropType,
  computed,
  getCurrentInstance,
  ref,
  inject,
  reactive
} from "vue";
import { nftrecordType } from "@/utils/type";
import { Dialog } from "vant";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useStates } from "@/hooks/userStore";
import { Toast } from "vant";

import { number } from "@intlify/core-base";
import { initSigner } from "@/utils/thhersUtils";
import { BigNumber, ethers } from "ethers";
import LSSVMPairETH from "@/utils/contracts/LSSVMPairETH.json";
import { SetUp } from "@element-plus/icons-vue";
import numFilters from '@/hooks/userNumFilters'
import { copy } from "@/utils/copy";

// import {switchChainNoArgs} from '@/utils/DialogSwitchChain'
let updatepool = inject('updatepool')

const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const router = useRouter();
const storeState: any = useStates("userMap", ["userMap"]);
const userinfo = computed(() => storeState.userMap.userinfo);
const create_show = ref(false);
const contracts: any = {};
let servenameDiv = ref<HTMLParagraphElement | null>(null);
let providers: any = "";
let signers: any = "";
const hexAddress: any = inject("hexAddress");
const emit = defineEmits(["updatepool"]);
interface revokedetailType {
  id: number | string,
  pooltype: string | undefined,
  poolAddr: string | undefined,
  nftContractAddr: string | undefined,
}

let revokedetail = reactive<revokedetailType>({
  id: 0,
  pooltype: '',
  poolAddr: '',
  nftContractAddr: '',
})
// const setRevoke = (
//   id: number,
//   pooltype: string | undefined,
//   poolAddr: string | undefined,
//   nftContractAddr: string | undefined) => {

//   revokedetail.id = id;
//   revokedetail.pooltype = pooltype;
//   revokedetail.poolAddr = poolAddr;
//   revokedetail.nftContractAddr = nftContractAddr;
//   nameType.value = true;
// }

// const VanDialog = Dialog.Component;
const nftlist = defineProps({
  data: {
    type: Array as unknown as PropType<nftrecordType[]>,
    default: () => [],
  },
  active: {
    type: Number,
    default: 0,
  },
  width: {
    type: String,
    default: "90%",
  },
  select: {
    type: Number,
    default: 1,
  },
  servename: {
    type: String,
    default: "",
  },
  searchKey: {
    type: String,
    default: "",
  },
  contractLogo: {
    type: String,
    default: "",
  },
  isAuth: {
    type: String,
    default: "0",
  },
});
let nameType = ref(false);
let { t } = useI18n();

const webValue = reactive<any>({
  timeNow: new Date().getTime(),

})
onMounted(() => {
  console.log(nftlist.contractLogo)
  time()

  let tries = 0;
  setTimeout(function initTimer(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ethereum && ++tries < 20) return setTimeout(initTimer, 50);
    else init();
    console.log('route', route.path);
    console.log('servenameDiv', Array.isArray(servenameDiv.value));
    if (Array.isArray(servenameDiv.value)) {
      (servenameDiv.value as unknown as []).forEach((val: HTMLParagraphElement) => {
        if (val.innerText.length > 15) val.style.width = '3rem';
      })
    }
  });
  setInterval(() => {
    webValue.timeNow = new Date().getTime();
  }, 1000)
});

function time() {
  nftlist.data.forEach((val: any) => {
    setTime(new Date().getTime(), new Date(val.time).getTime())
  })

}
const init = async () => {
  //第一步 ----  获取 当前钱包对象 和 provider
  if ((window as any).ethereum && userinfo.value.isLogin) {
    let { provider, address, signer, Balance } = await initSigner();
    providers = provider;
    signers = signer;
    addressNow.value = address;
  }
  // useraddress.value = address;
  // contracts.LSSVMPairETH = new ethers.Contract('0xa4e1cd0cd3e433c2e4fe5498e7faa136b0f6a4fd', LSSVMPairETH, providers.value).connect(signers.value);
  // console.log(contracts.LSSVMPairETH);
  //第二部 ----  创建合约对象              '合约地址'       'JSON'  这是上面的provider和signer
  // contracts.LSSVMPairFactory = new ethers.Contract(proxy.$common.LSSVMPairFactory, LSSVMPairFactory, provider).connect(signer);
  // try {
  //     contracts.LSSVMPairETH = new ethers.Contract('0xa4e1cd0cd3e433c2e4fe5498e7faa136b0f6a4fd', LSSVMPairETH, providers).connect(signers);
  // } catch (e) {
  //     console.log(e, 456)
  // }
};
// 取消按钮
const cancel = () => {
  nameType.value = false;
};


function setTime(newtime: any, usedtime: any) {
  let time = newtime - usedtime
  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) > 0 ? Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) : 1;
  let seconds = Math.floor(time / 1000);
  let times = ''

  if (seconds > 0) {
    times = seconds + ` ${t('browse.seconds')}`
  }
  if (minutes > 0 && seconds > 60) {
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
}


const setRevoke = async (id: any, pooltype: any, poolAddr: any, nftContractAddr: any) => {

  nameType.value = true;

  // revokedetail.id = id;
  // revokedetail.pooltype = pooltype;
  // revokedetail.poolAddr = poolAddr;
  // revokedetail.nftContractAddr = nftContractAddr;
  // nameType.value = true;

  //let { id, pooltype, poolAddr, nftContractAddr } = revokedetail;


  try {
    contracts.LSSVMPairETH = new ethers.Contract(
      poolAddr as string,
      LSSVMPairETH,
      providers
    ).connect(signers);
  } catch (e) {
    console.log(e);
    Toast.clear();
    nameType.value = false;

    Toast.fail(t('overall.Cancellationfailed'));
  }
  console.log(id, pooltype, poolAddr, nftContractAddr);
  // Toast.loading({
  //   message: t('overall.Cancelling') + "...",
  //   forbidClick: true,
  //   loadingType: "spinner",
  //   duration: 0,
  // });
  if (pooltype === "0") {
    //撤销买池
    console.log(contracts.LSSVMPairETH);
    contracts.LSSVMPairETH.withdrawAllETH().then(async (res: any) => {
      await res.wait();
      Toast.clear();
      // create_show.value = false;
      nameType.value = false;
      setTimeout(() => {
        proxy.$message.success(t("overall.Cancellation"))

        // Toast.success(t('overall.Cancellation'));
        if (typeof updatepool == 'function') updatepool()
        else emit("updatepool");
        revokedetail = {
          id: 0,
          pooltype: '',
          poolAddr: '',
          nftContractAddr: '',
        }
      }, 3500);
    }).catch((e: any) => {
      // create_show.value = false;
      nameType.value = false;
      proxy.$message.error(t("overall.Cancellationfailed"))
      Toast.clear();
      console.log(e);
      // Toast.fail(t('overall.Cancellationfailed'));
    });
  } else if (pooltype === "1") {
    //撤销卖池
    // 声明合约的时候用当前池子的地址，撤销nft的时候用当前池子下nft的地址
    contracts.LSSVMPairETH.getAllHeldIds().then(async (res: any) => {
      console.log(res);
      contracts.LSSVMPairETH.withdrawERC721(nftContractAddr, res).then(async (res2: any) => {
        await res2.wait();
        Toast.clear();
        create_show.value = false;
        nameType.value = false;
        proxy.$message.success(t("overall.Cancellationfailed"))

        setTimeout(() => {
          // Toast.success(t('overall.Cancellation'));
          if (typeof updatepool == 'function') updatepool()
          else emit("updatepool");
          revokedetail = {
            id: 0,
            pooltype: '',
            poolAddr: '',
            nftContractAddr: '',
          }
        }, 3500);
      }).catch((e: any) => {
        // create_show.value = false;
        nameType.value = false;
        proxy.$message.error(t("overall.Cancellationfailed"))

        Toast.clear();
        console.log(e);
        // Toast.fail(t('overall.Cancellationfailed'));
      });
    });
  } else {

    //撤销买卖池
    // contracts.LSSVMPairETH.balance()  查询当前池子中是否有币

    contracts.LSSVMPairETH.getAllHeldIds().then(async (res2: any) => {
      contracts.LSSVMPairETH.withdrawAll(nftContractAddr, res2).then(async (res3: any) => {
        await res3.wait();
        Toast.clear();
        create_show.value = false;
        nameType.value = false;

        setTimeout(() => {
          proxy.$message.success(t("overall.Cancellation"))

          // Toast.success(t('overall.Cancellation'));
          if (typeof updatepool == 'function') updatepool()
          else emit("updatepool");
          revokedetail = {
            id: 0,
            pooltype: '',
            poolAddr: '',
            nftContractAddr: '',
          }
        }, 3500);
      }).catch((e: any) => {
        create_show.value = false;
        nameType.value = false;

        Toast.clear();
        console.log(e);
        proxy.$message.error(t("overall.Cancellationfailed"))

        // Toast.fail(t('overall.Cancellationfailed'));
      });
    });

  }
};
let addressNow = ref<string>()
const create = (type: string) => {
  // if (!userinfo.value.isLogin || !hexAddress) return Toast.fail(t('overall.logTips'));
  // switchChainNoArgs(async ()=>{
  //   router.push(
  //   "/business/createpond?type=" + type + "&searchKey=" + nftlist.searchKey
  // );
  // },userinfo.value.isLogin,hexAddress.value || addressNow.value)
};

const go = (address: string | undefined) => {
  if (!route.path.includes('/business')) router.push("/business?searchKey=" + address);
};

const opens = (has: any) => {

  console.log(has)
  window.open(
    proxy.$common.bscscan + has
  );

};
const opens2 = (has: any) => {

  console.log(has)
  window.open(
    proxy.$common.bscscanAddress + has
  );

};
const next = (address: any) => {

  router.push("/business/detail?hash=" + address);



}
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  // width: 580px;
  width: 1.3188rem;
  height: 0.8rem;
  border-radius: .0469rem;
  padding: .0938rem;

  p {
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #0f0f0f;
    font-size: .0844rem;
    padding-top: .0469rem;
    margin-bottom: .1875rem;
    text-align: center;
  }

  input {
    background-color: #f6f6f6;
    border-radius: 30px;
    border: none;
    outline: none;
    width: 95%;
    text-align: center;
    height: 1rem;
  }

  >div {
    display: flex;
    // margin-top: 1.3rem;
    justify-content: space-between;
    margin-bottom: .0938rem;

    >div {
      width: 40%;
      height: .225rem;
      line-height: .225rem;
      border-radius: 0.5rem;
    }

    >div:nth-of-type(1) {
      border: 2px solid #7c7c7c;
      color: #7c7c7c;
      text-align: center;
    }

    >div:nth-of-type(2) {
      background-color: #5a64e9;
      color: white;
      text-align: center;
    }
  }
}

.sell {
  display: flex;
  justify-content: space-between;

  div:nth-child(1) {

    font-weight: 500;
    color: #23262F;
    // width: .3188rem;
    // height: .1406rem;
    text-align: center;
    line-height: .1406rem;
  }

  div:nth-child(2) {
    width: .4563rem;
    height: .1813rem;
    border: 1px solid #3699FF;
    border-radius: .0188rem;
    text-align: center;
    line-height: .1813rem;
    font-size: 14px;
    color: #3699FF;
    // cursor: pointer;

  }

  .sell-list {
    display: flex;
    align-items: center;
  }

  .withdraw:hover {
    color: #fff;
    background: #3699FF;
  }
}

.box {
  width: 23%;
  // height:1.4407rem;+++++++++++++++++++
  margin-bottom: .0703rem;
  margin-right: .0703rem;
  background: #F5F6F8;
  border: 1px solid #DADADA;
  padding: .0844rem .1078rem .0844rem .1078rem;
  border-radius: .0469rem;
}

.main_new {
  display: grid;
  overflow-y: scroll;
  padding: 10px 10px;
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(0deg, rgba(224, 221, 255, 0) 0%, #DEF1FD 100%);
  border-radius: 8px;
  // height: calc(660px + 3*5px);
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 25px;
  justify-content: space-between;

  @media screen and (max-width:1280px) {
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 3px;
    justify-content: space-around;
  }
}

.box_new {
  width: 100%;
  margin-bottom: .0703rem;
  margin-right: .0703rem;
  background: #fff;
  padding: .0844rem .1078rem .0844rem .1078rem;
  border-radius: .0469rem;
}

.sell-box {
  // background-color: rgba(36, 36, 47, 1);

  // padding: .0563rem .0938rem .0563rem .0938rem;
  margin-top: .0469rem;
  // border-bottom: 1px solid;

}

.sell-list {
  width: 100%;
  padding: 5px 10px;
  background: linear-gradient(45deg, #DEF1FD 0%, rgba(224, 221, 255, 0) 100%);
  border-radius: 8px;
}

.sell-price {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #777E90;
  margin-right: 10px;
}

.sell-list {
  // padding-right: .2344rem;
  // border-right: 1px solid rgba(67, 67, 89, 1);
  // padding-right: .1172rem;
}

.sell-num {
  font-size: 0.833vw;
  font-family: PingFang SC;
  font-weight: bold;
  color: #23262F;
}

.sell-img {
  object-fit: contain;
  width: .1072rem;
  margin-right: .0703rem;
}

.sell-line {
  width: 100%;
  height: 1px;
  background: #DADADA; // margin-left: .0938rem;
  margin-right: .0938rem;
  margin-top: .0938rem;
}

.sell-delta {
  display: flex;
  // justify-content: space-between;
  padding-top: .0844rem;

}

.sell-left {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #777E90;
  padding-top: 2px;
  padding-right: 8px;
}

.sell-right {
  font-family: PingFang SC;
  font-weight: bold;
  font-size: 0.833vw;
  color: #23262F;
}

.withdraw {}

// .withdraw:hover{
//   background: #424546;
//   color: #FFFFFF;
// }
.main {
  margin: 0 auto;
  margin-top: 9px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  // display: grid !important;
  // grid-template-columns: 19.5% 19.5% 19.5% 19.5% 19.5%;
  // grid-column-gap: 0.675%;

  @media screen and (max-width: 2030px) {
    // //400 * 4 + 160 = 1760
    // grid-template-columns: 23.5% 23.5% 23.5% 23.5%;
    // grid-column-gap: 2%;
  }

  @media screen and (max-width: 1630px) {
    //400 * 3 + 160 = 1360
    // grid-template-columns: 32% 32% 32%;
    // grid-column-gap: 2%;
  }

  @media screen and (max-width: 1330px) {
    // //400 * 2 + 160 = 960
    // grid-template-columns: 48% 48%;
    // grid-column-gap: 4%;
  }
}

.sell-icon {
  width: .1406rem;
  height: .0563rem;
  object-fit: contain;
  margin-right: 10px;
  //  border-radius: 50%;

}

.more {
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

.more:hover {
  background: #23262F;
  color: #fff;
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

@media screen and (min-width: 1140px) {
  .box {
    width: 40% !important;
  }
}

@media screen and (min-width: 1280px) {
  .box {
    // width: 32% !important;
  }
}

@media screen and (min-width: 1366px) {
  // .box{
  //   width: 23% !important;
  // }
}

@media screen and (min-width: 1920px) {
  .box {
    width: 23% !important;
  }
}
</style>