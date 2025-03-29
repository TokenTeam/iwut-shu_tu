<script setup lang="ts">
import { ref } from 'vue'
import { useFormStore } from '@/stores/formStore'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})
const { formData } = props
console.log(formData)
const showDialog = ref(false)

const formStore = useFormStore()

const onConfirm = () => {
  formStore.offUserPost(formData._id)
  window.location.reload()
}

const onCancel = () => {
  console.log('dialog: cancel')
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
      </span>
    </div>

    <div class="bar-body">
      <t-cell :title="formData.title" :description="formData.content" class="title-content" />
      <!-- <div class="pic-box" >
          <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px', borderRadius:'5px'}"
          fit="fill"
          :src="imagePic.i_url"
          v-for="(imagePic,index) in formData.imagePic" :key="index"
        />
        </div> -->
    </div>

    <div class="bar-foot">
      <!-- <div class="tag"></div> -->

      <div class="post-pub-time">发布时间</div>

      <div class="post-views"></div>

      <button class="post-off" :class="{ 'post-off-disabled': formData.b_status === 0 }" @click="showDialog = true"
      :disabled="formData.b_status===0">
  {{ formData.b_status === 1 ? '下架' : '已下架' }}
</button>
      <t-dialog
        v-model:visible="showDialog"
        width="200px"
        content="是否下架该帖"
        cancel-btn="取消"
        :confirm-btn="{ content: '确认', theme: 'danger' }"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
      </t-dialog>
    </div>
    <span class="material-symbols-outlined" v-if="formData.b_status===0"> check_circle </span>
  </div>
</template>

<style lang="less" scoped>
.material-symbols-outlined {
  font-size: 48px;
  position: absolute; 
  top: 0; 
  right:20px; 
  color: #75fb4c;
}
.bar-foot {
  margin-top: 1px;
  display: flex;
  bottom: 3px;
  font-size: 0.8rem;
  padding-left: 20px;
  position: relative;

  .post-off.post-off-disabled{
    border: 1px solid #ccc;
    color: #ccc;
    cursor: not-allowed;
    &:hover {
      border: 1px solid #ccc;
      color: #ccc;
      background-color: #fff;
    }
  }
  .post-off {
    position: absolute;
    right: 0;
    margin-right: 20px;

    padding: 0 12px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #ff4d4f;
    color: #ff4d4f;
    background-color: #fff;
    border-radius: 12px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      border-color: #ff1a1a;
      color: #ff1a1a;
      background-color: #fff5f5;
    }
  }
}
.bar-header,
.bar-body {
  margin-top: 6px;
  margin-bottom: 6px;
  .avatar,
  .head-content-wrap,
  .t-cell.title-content {
    margin: 0; /* 清除默认 margin */
    padding: 0; /* 清除默认 padding */
    --td-cell-description-color: #000000e6;
    --td-cell-title-color: #000000e6;
    --td-cell-description-font-size: 1rem;
    --td-cell-description-line-height: 1rem;
    --td-cell-title-font-size: 1rem;
    --td-cell-title-line-height: 1rem;
  }
  .t-cell.title-content {
    padding-left: 20px;
  }
  .avatar {
    --td-avatar-small-width: 30px;
  }
  .head-content-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 4px;
  }
}

.bar {
  margin: 0;
  padding: 0;
  background: #fff;
  width: 100%;
  position: relative;
}

.pic-box {
  display: flex;
  gap: 10px;
}
.bar-header {
  display: flex;
}
</style>
