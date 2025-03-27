<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Icon as TIcon } from 'tdesign-icons-vue-next';
</script>

<template>
    <div class="app">
      <RouterLink to="/booklist"></RouterLink>
      <RouterLink to="/seller"></RouterLink>
      <RouterView/>
    </div>

</template>

<style lang="less" scoped>

</style>