<script setup lang="ts">
import { useFormStore } from '@/stores/formStore'
import { onMounted } from 'vue'
import { ref} from 'vue'
import { _ActionSheet } from 'tdesign-mobile-vue'
import Bookbar from './BookBar.vue'

const formStore = useFormStore()

//进入页面获取帖子
onMounted(() => {
   formStore.clearFormDataList()
   formStore.getFormList(true)
})

const refreshing = ref<boolean>(false)

//下拉刷新
const handleRefresh = () => {
  refreshing.value = true
  setTimeout(() => {
    formStore.getFormList(true)
    refreshing.value = false
  }, 1000)
}

//下滑刷新
const handleScrolltolower = () => {
  formStore.getFormList(false)
}
</script>
<template>
  <t-pull-down-refresh
    v-model="refreshing"
    :loading-bar-height="66"
    :loading-texts="['下拉刷新', '松开刷新', '正在刷新', '刷新完成']"
    @refresh="handleRefresh"
    @scrolltolower="handleScrolltolower"
  >
    <div class="list">
      <Bookbar
        v-for="formItem in formStore.formDataList"
        :key="formItem._id"
        :form-data="formItem"
      />
    </div>
  </t-pull-down-refresh>
</template>
<style scoped lang="less">
.list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>
