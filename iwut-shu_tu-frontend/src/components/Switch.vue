<script lang="ts" setup>
import { AddIcon } from 'tdesign-icons-vue-next'
import { ref, h } from 'vue'
import type { ActionSheetItem } from 'tdesign-mobile-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const iconFunc = () => h(AddIcon, { size: '24px' })
const items = ref([
  {
    label: '发帖',
    icon: '../../public/edit_square_40dp_75FBFD_FILL1_wght0_GRAD0_opsz40.png',
  },
  {
    label: '帖子管理',
    icon: '../../public/folder_managed_40dp_75FBFD_FILL1_wght0_GRAD0_opsz40.png',
  },
  {
    label: '个人中心',
    icon: '../../public/person_40dp_75FBFD_FILL1_wght0_GRAD0_opsz40.png',

  },
])
const visible = ref(false)
const count = ref(8)
const handleSelected = (selected: ActionSheetItem, selectedIndex: number) => {
  switch (selected.label) {
    case '发帖': {
      router.push('/seller')
      break
    }
    case '帖子管理': {
      router.push('/manage')
      break
    }
    default:
      break
  }
  visible.value = false
}
const handleCancel = (): void => {
  console.log('cancel')
}
</script>

<template>
  <t-fab :icon="iconFunc" @click="visible = true"/>
  <t-action-sheet
    v-model="visible"
    theme="grid"
    :items="items"
    :count="count"
    @selected="handleSelected"
    @cancel="handleCancel"
  class="action-sheet"
  >
  </t-action-sheet>
</template>

<style lang="less" scoped>
.t-image__img{
  background-color: #fff!important;
}
.action-sheet-demo {
  margin-bottom: 16px;

}
</style>
