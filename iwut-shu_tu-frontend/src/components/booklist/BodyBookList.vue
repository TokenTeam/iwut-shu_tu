<script setup lang="ts">
import { useFormStore } from '@/stores/formStore';
import { onMounted } from 'vue';
import { ref } from 'vue';
import Bookbar from './BookBar.vue'
import { _ActionSheet } from 'tdesign-mobile-vue';

const formStore =useFormStore()

//进入页面获取帖子
onMounted(()=>{
  formStore.getFormList(true) 
  console.log(formStore.formDataList);
})

const refreshing = ref<boolean>(false);

//下拉刷新
const handleRefresh = () => {
  refreshing.value = true;
  setTimeout(() => {
    formStore.hasFetched =false
    formStore.getFormList(true)
    refreshing.value = false;
  }, 1000);
};

//下滑刷新
const handleScrolltolower = () => {
  formStore.hasFetched =false
  formStore.getFormList(false) 
  console.log('aaaa');
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
  <Bookbar v-for="(formItem) in formStore.formDataList" :key="formItem._id" :form-data="formItem"/>
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
