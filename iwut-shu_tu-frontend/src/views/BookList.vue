<script setup lang="ts">
import NavBookList from '../components/booklist/NavBookList.vue'
import BodyBookList from '../components/booklist/BodyBookList.vue'
import Switch from '../components/Switch.vue'
</script>

<template>
  <div>
    <div class="nav">
      <NavBookList />
    </div>
    <BodyBookList />
    <Switch />
  </div>
</template>

<style lang="less" scoped>
.nav {
  height: 48px;
}
</style>
