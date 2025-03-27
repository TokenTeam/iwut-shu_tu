<script setup lang="ts">
import { useFormStore } from '@/stores/formStore';
import { onMounted } from 'vue';
import { ref } from 'vue';
import Bookbar from './BookBar.vue'

const formStore =useFormStore()
onMounted(()=>{
  formStore.getFormList() 
  console.log(formStore.formDataList);
})

const refScrollpage=ref<number>(1)
const refreshing = ref<boolean>(false);
const handleRefresh = (value: any) => {
  refreshing.value = true;
  setTimeout(() => {
    refreshing.value = false;
  }, 1000);
};
const handleScrolltolower = () => {
  formStore.hasFetched =false
  formStore.getFormList(++refScrollpage.value) 
};

</script>
<template>
  <t-pull-down-refresh
    v-model="refreshing"
    :loading-bar-height="66"
    :loading-texts="['下拉刷新', '松开刷新', '正在刷新', '刷新完成']"
    @refresh="handleRefresh"
    @scrolltolower="handleScrolltolower"
  >
<div class="list">
  <Bookbar v-for="(formItem,index) in formStore.formDataList" :key="index" :form-data="formItem"/>
  </div>
</t-pull-down-refresh>
</template>
<style scoped lang="less">

    .list{
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
</style>
