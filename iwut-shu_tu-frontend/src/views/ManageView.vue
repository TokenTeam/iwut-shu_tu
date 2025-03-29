<script setup lang="ts">
import NavManage from '@/components/manage/NavManage.vue'
import BodyManage from '@/components/manage/BodyManage.vue'
</script>

<template>
  <div class="manage-box">
    <NavManage />
    <BodyManage />
  </div>
</template>

<style lang="less" scoped>
.seller-box {
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 100vh;
  width: 100vw;
}
</style>
