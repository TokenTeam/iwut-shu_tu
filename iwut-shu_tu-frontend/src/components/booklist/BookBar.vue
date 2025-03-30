<script setup lang="ts">
import { ref} from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/formStore'
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})
const formStore =useFormStore()
const router =useRouter()
const { formData } = props

//预览图片时进入另一个页面
const handleClick=()=>{
  formStore.isViewing=true
  formStore.setFormData(formData)
  router.push('/pic')
}


</script>

<template>
  <div class="bar">
    <div class="bar-header">
      <t-avatar
        class="avatar"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        size="small"
      ></t-avatar>
      <span class="head-content-wrap">
        <div class="nick-name">nick-name</div>
        <div class="pub-time">pub-time</div>
      </span>
    </div>

    <div class="bar-body">
      <t-cell :title="formData.title" :description="formData.content" class="title-content" />
      <div class="pic-box">
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px', borderRadius: '5px' }"
          fit="fill"
          :src="imagePic.i_url"
          v-for="(imagePic, index) in formData.imagePic"
          :key="index"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.avatar {
  --td-avatar-small-width: 35px;
}
.head-content-wrap {
  padding-left: 5px;
}

//去除分割线
.t-cell.title-content::after {
  display: none;
}

.pic-box {
  display: flex;
  gap: 10px;
}

.bar-header {
  display: flex;
  margin-bottom: 2px;
  padding-inline: 10px;
}
.bar-body {
  .title-content {
    --td-cell-horizontal-padding: 10px;
    --td-cell-vertical-padding: 7px;
  }
}
.bar {
  background: #fff;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
