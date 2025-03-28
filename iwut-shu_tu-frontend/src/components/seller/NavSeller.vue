<template>
  <t-navbar title="发帖" :fixed="false" left-arrow @left-click="handleClick">
    <template #right>
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>
  <div class="nav-gap"></div>
</template>

<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { useRouter } from 'vue-router';
const router =useRouter()
const handleClick = () => {
  router.back()
};
</script>

<style lang="less" scoped>
.nav-gap{
  height: 1px;
  background: #e7e7e7;
}
</style>
