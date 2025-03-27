<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next';
</script>

<template>
  <t-navbar :fixed="true" class="search">
    <template #left>
      <t-search placeholder="搜索书籍" shape="round" />
    </template>
    <template #right>
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>

</template>


<style lang="less" scoped>
.search{
  z-index: 1;
}
.t-icon {
  margin-right: 4px;
}
</style>