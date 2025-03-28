<script setup lang="ts">
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})
const { formData } = props
console.log(props.formData)
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

      <button class="post-off">下架</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bar-foot {
  margin-top: 1px;
  display: flex;
  bottom: 3px;
  font-size: 0.8rem;
  padding-left: 20px;
  position: relative;
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
  .avatar{
    --td-avatar-small-width:30px;
  }
  .head-content-wrap{
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
}

.pic-box {
  display: flex;
  gap: 10px;
}
.bar-header {
  display: flex;
}
</style>
