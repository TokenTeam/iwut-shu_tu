<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <keep-alive>
    <RouterLink to="/" ></RouterLink>
  </keep-alive>
    <RouterLink to="/seller"></RouterLink>
    <RouterView />
  </div>
</template>

<style lang="less" scoped></style>
