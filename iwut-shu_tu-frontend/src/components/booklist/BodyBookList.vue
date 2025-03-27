<script setup lang="ts">
import { useFormStore } from '@/stores/formStore';
import { onMounted } from 'vue';
import Bookbar from './BookBar.vue'

const formStore =useFormStore()
onMounted(()=>{
  formStore.getFormList() 
  console.log(formStore.formDataList);
})

</script>
<template>
<div class="list">
  <Bookbar v-for="(formItem,index) in formStore.formDataList" :key="index" :form-data="formItem"/>
  </div>
</template>
<style scoped lang="less">
    .list{
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
</style>
