<script setup lang="ts">

  const props = defineProps({
    formData:{
      type:Object,
      required:true
    }
  })
  const {formData} = props
  console.log(props.formData);
</script>


<template>
<div class="bar">
    <div class="bar-header">
  <span class="avatar">
    <t-avatar class="avatar-example" image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"></t-avatar>
  </span>
    <span class="head-content-wrap">
  <div class="nick-name">nick-name</div>
  <div class="pub-time">pub-time</div>
  </span>
  </div>

    <div class="bar-body">
        <!-- <div class="headline-box">
          <t-cell title="单行标题"  />
        </div>
        <div class="content-box">
          <t-cell title="单行标题" description="props.formData.content" />
        </div> -->
        <t-cell :title="formData.title" :description="formData.content" class="title-content"/>
        <div class="pic-box" >
          <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px', borderRadius:'5px'}"
          fit="fill"
          :src="imagePic.i_url"
          v-for="(imagePic,index) in formData.imagePic" :key="index"
        />
        </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title-content{
  
}

 //去除分割线
.t-cell.title-content::after{
    display: none;
  }

.pic-box {
  display: flex;
  gap: 10px;
}

.bar-header{
    display: flex;
}
.bar{
background: #fff;
width: 100%;
}
.avatar {
  margin-left: 16px;
  margin-bottom: 16px;

  .avatar-example:not(:last-child) {
    margin-right: 64px;
  }
  .custom {
    .t-avatar__inner {
      background-color: #0052d9;
      color: #fff;
    }
  }
}
</style>
