<template>

<div  class="table">
      <el-table :data="nftlist.data" style="width: 100%" @row-click="rowClick" @sort-change="sort_change" >
        <el-table-column type="index" :label="$t('Home.Ranking')" width="120"  id='ranking'/>
        <el-table-column prop="name" :label="$t('Home.seriestitle')" width="250">
          <template #default="scope">
            <div class="table-flex">
                <img class="portrait"  style="border-radius: 50%;"  :src="scope.row.contractLogo" v-if="scope.row.contractLogo" />
                <img class="portrait"  src="@/assets/img/Defaultavatar3.png" v-else />
                <div class="table-name">{{  scope.row.contractName|| "--" }}
                  <img class="authentication" width="20" src="@/assets/img/authentication.png"  v-if="scope.row.isAuth == 2"  />     
                </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="minPrice" :label="$t('Home.Price')" sortable=“custom”  align="right">
          <template #default="scope">
          <div style="text-align: center;display: flex;flex-direction: column;align-items: end;">
            <div class="table-flex">
              <img src="../assets/img/WBNB.png" width="20" />      
                <div class="table-name">
                  <div>
                    {{scope.row.minPrice?Number(scope.row.minPrice).toFixed(4):'--' }}
                  </div>  
                </div>
             </div>

             <div v-if="Number(scope.row.avgPricePercentage)>0 || Number(scope.row.avgPricePercentage)<0">
                    <div style="color: rgba(2, 166, 92, 1);font-size: 14px;font-weight: 600;    padding-left: 0.103rem;"  v-if="Number(scope.row.avgPricePercentage)>0">{{scope.row.avgPricePercentage + '%'}}</div> 
                    <div style=" color: rgba(240, 93, 98, 1);font-size: 14px;font-weight: 600;    padding-left: 0.103rem;"  v-if="Number(scope.row.avgPricePercentage)<0">{{scope.row.avgPricePercentage +'%'}}</div> 
              </div>
               <div  v-else style="font-size: 14px;font-weight: 600;    padding-left: 0.103rem;" >{{scope.row.avgPricePercentage +'%'}}</div>
            </div>
             <!-- <div style="color: rgba(240, 93, 98, 1);font-size: 14px;font-weight: 600;padding-left: .1903rem;">-3.3%</div>  -->
            </template>
        </el-table-column>
        <el-table-column prop="changePrice" :label="$t('Home.Turnover')" sortable=“custom” align="right">
          <template #default="scope">
           <div  style="    text-align: center;display: flex;flex-direction: column;align-items: end;">
                <div class="table-flex">
                    <div class="table-name" >
                      <img src="../assets/img/WBNB.png" width="20" style='position: relative;top: 4px;'/> 
                      {{scope.row.changePrice  ?Number(scope.row.changePrice  ).toFixed(4):'--' }}
                    </div>
                  </div>
                  <div v-if="Number(scope.row.turnoverPrecedences)>0 || Number(scope.row.turnoverPrecedences)<0">
                    <div style="color: rgba(2, 166, 92, 1);font-size: 14px;font-weight: 600;    padding-left: 0.103rem;"  v-if="Number(scope.row.turnoverPrecedences)>0">{{scope.row.turnoverPrecedences + '%'}}</div> 
                    <div style=" color: rgba(240, 93, 98, 1);font-size: 14px;font-weight: 600;    padding-left: 0.103rem;"  v-if="Number(scope.row.turnoverPrecedences)<0">{{scope.row.turnoverPrecedences +'%'}}</div> 
                  </div>
                
                  <div  v-else style="font-size: 14px;font-weight: 600;    padding-left: 0.103rem;" >{{scope.row.turnoverPrecedences +'%'}}</div> 
            </div>

            </template>     
        </el-table-column>
        <el-table-column prop="changeCount" :label="$t('Home.volume')" sortable=“custom” align="right">
          <template #default="scope">
            <div style="    text-align: center;display: flex;flex-direction: column;align-items: end;">
                <div class="table-flex">
                  <div class="table-name" >{{Number(scope.row.changeCount)||'--' }}</div>
                </div>
                <div v-if="Number(scope.row.changeCountPrecedences) >0 || Number(scope.row.changeCountPrecedences<0)">
                    <div style="color: rgba(2, 166, 92, 1);font-size: 14px;font-weight: 600;    padding-left: 0.05rem;" v-if="Number(scope.row.changeCountPrecedences) >0">{{scope.row.changeCountPrecedences + '%'}}</div> 
                    <div style="color: rgba(240, 93, 98, 1);font-size: 14px;font-weight: 600;    padding-left: 0.05rem;" v-if="Number(scope.row.changeCountPrecedences) <0">{{scope.row.changeCountPrecedences + '%'}}</div> 
                </div>
                <div v-else style="font-size: 14px;font-weight: 600;    padding-left: 0.103rem;" >
                    {{scope.row.changeCountPrecedences +'%'}}
                </div>
            </div>

            </template>     
        </el-table-column>
        <el-table-column prop="buyUserCount"  :label="$t('Home.buyers')" sortable=“custom” align="right">
          <template #default="scope">
            <div style="    text-align: center;display: flex;flex-direction: column;align-items: end;">
              <div class="table-flex">
              <div class="table-name" >
                {{ scope.row.buyUserCount?scope.row.buyUserCount:'--' }}
              </div>
             </div>
             <div v-if="Number(scope.row.buyUserCountPrecedences) >0 || Number(scope.row.buyUserCountPrecedences<0)">
                <div style="color: rgba(2, 166, 92, 1);font-size: 14px;font-weight: 600;    padding-left: 0.05rem;" v-if="Number(scope.row.buyUserCountPrecedences) >0">{{scope.row.buyUserCountPrecedences + '%'}}</div> 
                <div style="color: rgba(240, 93, 98, 1);font-size: 14px;font-weight: 600;    padding-left: 0.05rem;" v-if="Number(scope.row.buyUserCountPrecedences) <0">{{scope.row.buyUserCountPrecedences + '%'}}</div> 
             </div>
             <!-- <div style="color: rgba(240, 93, 98, 1);font-size: 14px;font-weight: 600;    padding-left: 0.103rem;">-3.3%</div>  -->
             <div v-else style="font-size: 14px;font-weight: 600;    padding-left: 0.05rem;" >
                 {{scope.row.buyUserCountPrecedences +'%'}}
             </div>
            </div>
         
            </template>     
        </el-table-column>
      </el-table>
    </div>
</template>
<script lang="ts" setup>
import {
  onMounted,
  PropType,
  computed,
  getCurrentInstance,
  ref,
  inject,
  reactive,
  watch
} from "vue";
import { nftrecordType } from "@/utils/type";
import { useRoute, useRouter } from "vue-router";
import { getBannerList, getNftTop, popular } from "@/api/home";
const top = ref<any[]>([]);
  const tableData = ref<any[]>([]);  
  const emit = defineEmits(["getNftTopList",'param']);

let transactionlist = ref<any>([]);
const router = useRouter();

let nftlist = defineProps({
    data: {
    type: Array as unknown as PropType<nftrecordType[]>,
    default: () => [],
  },})

  watch(() => nftlist.data, (newValue, oldValue) => {
   
    // debugger
    transactionlist=newValue
    console.log('transactionlist')
    console.log(transactionlist)
  })
  const rowClick=(row:any, column:any, event:any)=>{
      router.push("/business?searchKey=" + row.address);
  }
  // const List=()=>{
  //   getNftTop().then(async (res: any) => {
  //      top.value =res;
  //      console.log('top',  top.value)
      
  //      tableData.value =top.value.slice(0, 10);
  //     console.log(  tableData.value)
  // })
  // }
  const sort_change=(culumn:any)=>{
    if(culumn.order=='ascending'){
      culumn.order='asc'
    }else{
      culumn.order='desc'
    }
    let param={
      sortColumn:culumn.prop,
      sortMethod:culumn.order
    }
    //  emit("getNftTopList");
     emit("param",param);

    // getNftTop(param).then(async (res: any) => {
    //    top.value =res;
    //    console.log('top',  top.value)
      
      //  nftlist.data =top.value.slice(0, 10);
      // console.log(  tableData.value)
  // })

  }
</script>
<style scoped lang="scss">
  // 表格
  .table{
      margin-top: 2.083vw;
      // width: 93%;
      // border: 1px solid #EBEEF2;
      border-top:1px solid #EBEEF2;
      border-left:1px solid #EBEEF2;
      border-right:1px solid #EBEEF2;
      border-radius: 0.417vw;
      &-flex{

      }
      &-img{
        width: 2.083vw;
        height: 2.083vw;
        border-radius: 50%;
        object-fit: contain;
      }
      .portrait{
        width: 2.083vw;
        height: 2.083vw;
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
        color: #23262F !important;
        font-size: 0.833vw;
        
        font-family: PingFang SC;
        padding-left: 0.417vw;
      }
     
      .name{
        font-weight: 500;
      }
    .authentication{
      position: relative;
     top: 0.156vw;
    }
    :deep(.el-table_1_column_6){
      padding-right: 2.083vw;
    }
    :deep(.el-table_1_column_1){
      padding-left: 2.083vw;
    }
    :deep(.el-table_1_column_2){
      .cell{
        width: 13.021vw !important;
      }
    }
    :deep(.el-table__header){
      height: 3.125vw !important;
    }
    :deep(.el-table__body-wrapper .el-table_1_column_3){
      padding-right: 1.25vw;
    }
    :deep(.el-table__body-wrapper .el-table_1_column_4){
      padding-right: 1.25vw;
    }
    :deep(.el-table__body-wrapper .el-table_1_column_5){
      padding-right: 1.25vw;
    }
    :deep(.el-table__body-wrapper .el-table_1_column_6){
      padding-right: 3.333vw;
    }
    :deep(.el-table__header-wrapper){
      .cell{
        font-size: 0.729vw;
      }
    }
  }
</style>