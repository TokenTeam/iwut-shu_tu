<template>
    <t-fab :icon="iconFunc" @click="visible = true" />  
    <t-action-sheet
    v-model="visible"
    theme="grid"
    :items="items"
    :count="count"
    @selected="handleSelected"
    @cancel="handleCancel"
  >
  </t-action-sheet>

  </template>
  
  <script lang="ts" setup>
  import { AddIcon } from 'tdesign-icons-vue-next';
  import { ref, h } from 'vue';
import type { ActionSheetItem } from 'tdesign-mobile-vue';
import { useRouter } from 'vue-router';

const router =useRouter()
const iconFunc = () => h(AddIcon, { size: '24px' });
const items = ref([
  {
    label: '发帖',
    icon: 'https://tdesign.gtimg.com/mobile/demos/wechat.png',
  },
  {
    label: '管理',
    icon: 'https://tdesign.gtimg.com/mobile/demos/wechat.png',
  },
  {
    label: '个人中心',
    icon: 'https://tdesign.gtimg.com/mobile/demos/wechat.png',
  },
]);
const visible = ref(false);
const count = ref(8);
const handleSelected = (selected: ActionSheetItem, selectedIndex: number) => {
  switch(selected.label){
    case '发帖':{
        router.push('/seller')
        break;
    }
    case '管理':{
      router.push('/manage')
      break
    }
    default:
        break;
  }
  visible.value =false
};
const handleCancel = (): void => {
  console.log('cancel');
};
  </script>

<style lang="less" scoped>
.action-sheet-demo {
  margin-bottom: 16px;
}
</style>