<template>
    <t-list :async-loading="loading" @scroll="onScroll">
      <t-cell v-for="formItem in formStore.formDataList" :key="formItem._id" align="middle" class="post-bar">
        <PostBar :form-data="formItem"/>
      </t-cell>
    </t-list>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useFormStore } from '@/stores/formStore';
  import PostBar from './PostBar.vue';
  const formStore =useFormStore()
  const loadData = (data: any, isRefresh?: Boolean) => {
    const ONCE_LOAD_NUM = 20;
  
    return new Promise((resolve) => {
      setTimeout(() => {
        const temp = [];
        for (let i = 0; i < ONCE_LOAD_NUM; i++) {
          if (isRefresh) {
            temp.push(`${i + 1}`);
          } else {
            temp.push(`${data.length + 1 + i}`);
          }
        }
  
        if (isRefresh) {
          data = temp;
        } else {
          data.push(...temp);
        }
  
        resolve(data);
      }, 1000);
    });
  };
  
  const loading = ref('');
  
  const onLoad = (isRefresh?: Boolean) => {
    if ((formStore.formDataList.length >= 60 && !isRefresh) || loading.value) {
      return;
    }
    loading.value = 'loading';
    loadData(formStore.formDataList, isRefresh).then(() => {
      loading.value = '';
    });
  };
  
  const onScroll = (scrollBottom: number) => {
    if (scrollBottom < 50) {
      onLoad();
    }
  };
  
  onMounted(() => {
    formStore.getUserPosts()
    onLoad();
  });
  </script>
  
  <style lang="less" scoped> 
    .post-bar{
        --td-cell-vertical-padding:0;
        --td-cell-horizontal-padding:0;
    }
</style>