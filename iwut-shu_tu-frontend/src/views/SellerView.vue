<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import NavSeller from '../components/seller/NavSeller.vue'
import BodySeller from '../components/seller/BodySeller.vue'
</script>

<template>
<div class="seller-box">
  <NavSeller/>
  <BodySeller/>
  </div>
</template>

<style lang="less" scoped>
.seller-box{
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 100vh;
  width: 100vw;
}
</style>