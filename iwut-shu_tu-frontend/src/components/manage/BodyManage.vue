<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useFormStore } from '@/stores/formStore'
import type { FormDataType } from '@/types'
import PostBar from './PostBar.vue'

const formStore = useFormStore()

const loadData = (data: any) => {
  const ONCE_LOAD_NUM = 5
  return new Promise((resolve) => {
    setTimeout(() => {
      const temp = []
      for (
        let i = 0;
        i < ONCE_LOAD_NUM && data.value.length + i < formStore.formDataList.length;
        i++
      ) {
        temp.push(formStore.formDataList[data.value.length + i])
      }
      data.value.push(...temp)

      resolve(data)
    }, 1000)
  })
}

const list = ref<FormDataType[]>([])
const loading = ref('')

const onLoad = () => {
  if (list.value.length >= formStore.formDataList.length || loading.value) {
    return
  }

  loading.value = 'loading'
  loadData(list).then(() => {
    loading.value = ''
  })
}

const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 50) {
    onLoad()
  }
}

onMounted(async () => {
  //异步获取
  await formStore.getUserPosts()
  onLoad()
})
</script>
<template>
  <t-list :async-loading="loading" @scroll="onScroll">
    <t-cell v-for="formItem in list" :key="formItem._id" class="post-bar">
      <PostBar :form-data="formItem" />
    </t-cell>
  </t-list>
</template>

<style lang="less" scoped>
.post-bar {
  --td-cell-vertical-padding: 0;
  --td-cell-horizontal-padding: 0;
}
</style>
