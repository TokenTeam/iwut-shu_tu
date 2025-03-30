<script lang="ts" setup>
import { ref } from 'vue';
import { useFormStore } from '@/stores/formStore'
import { useRouter } from 'vue-router'

const router=useRouter()
const formStore =useFormStore()
const images = [
  ...formStore.formData.imagePic.map(item=>item.i_url)
];

const onClose=async ()=>{
  formStore.isViewing=false
  formStore.viewFinish =true
  formStore.clearFormData()
  router.back()
}
</script>
<template>
    <t-image-viewer v-model:images="images" v-model:visible="formStore.isViewing" :onClose="onClose" show-index/>
  </template>
  

  