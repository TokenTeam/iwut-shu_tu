<script lang="ts" setup>
import { ref, reactive,  toRefs, onMounted } from 'vue'
import type { PickerValue } from 'tdesign-mobile-vue'
import type { FormDataType } from '@/types'
import type {
  UploadChangeContext,
  UploadFile,
  UploadRemoveContext,
  SuccessContext,
  ProgressContext,
} from 'tdesign-mobile-vue'
import { useFormStore } from '@/stores/formStore'
import { http } from '@/utils'


const props = defineProps({
  disabled: Boolean,
})
const { disabled } = toRefs(props)

// upload
const onFail = ({ file, e }: { file: UploadFile; e: ProgressEvent }): any => {
  // console.log('---onFail', file, e)
  return null
}

const onProgress = ({ file, percent, type, e }: ProgressContext) => {
  // console.log('---onProgress:', file, percent, type, e)
}
const onChangeUpload = (
  files: Array<UploadFile>,
  { e, response, trigger, index, file }: UploadChangeContext,
) => {
  // console.log('====onChange', files, e, response, trigger, index, file)
}
const onPreview = ({ file, e }: { file: UploadFile; e: MouseEvent }) => {
  // console.log('====onPreview', file, e)
}
const onSuccess = ({ file, fileList, response, e }: SuccessContext | any) => {
  // console.log('====onSuccess', file, 'aaa', fileList, 'bbb', e, 'ccc', response)
  formData.imagePic.push({ name: file.name, type: file.type, url: response[0] })
}
const onRemove = ({ index, file, e }: UploadRemoveContext) => {
  console.log('====onRemove', index, file, e)
  // 从表单数据中移除对应的图片信息
  formData.imagePic.splice(index!, 1)
}
const onSelectChange = (files: Array<UploadFile>) => {
  console.log('====onSelectChange', files)
}
async function doUpload(x:{name: string, raw: File}[]) {
  console.log("doUpload");
  console.log("name",x[0].name);
  console.log("file",x[0].raw);
  const formData = new FormData();
  formData.append('file', x[0].raw);
  const result = await http({
    url: '/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  console.log( result);
  return { status: 'success', response: { url: result.data.url } };
}

const files = ref([])
const formData: FormDataType = reactive({
  _id: '',
  title: '',
  content: '',
  book: '',
  isbn: '',
  price: null,
  imagePic: files,
  classification: '',
  b_status:1
})

const form = ref(null)

//分类
const bookOptions = () => {
  return [
    {
      label: '教科书',
      value: '教科书',
    },
    {
      label: '小说',
      value: '小说',
    },
    {
      label: '练习册',
      value: '练习册',
    },
  ]
}
const bookState = reactive({
  show: false,
  book: [],
})
const selectedClassification = ref('')
const onConfirm = (val: string[], context: number[]) => {
  console.log(val)
  console.log('context', context)
  selectedClassification.value = val[0]
  formData.classification = val[0]
  bookState.show = false
}

const onPick = (value: PickerValue[], context: any) => {
  console.log('value', value)
  console.log('context', context)
}

const formStore = useFormStore()
const onSubmit = () => {
  formStore.formData = formData
  formStore.submitForm()
}

const rules = {
  // 标题规则：必填，长度在 2 到 50 个字符之间
  title: [
    { required: true, message: '标题不能为空', trigger: 'blur' },
    { min: 2, max: 50, message: '标题长度应在 2 到 50 个字符之间', trigger: 'blur' },
  ],
  // 内容规则：必填，长度不少于 10 个字符
  content: [
    { required: true, message: '内容不能为空', trigger: 'blur' },
    { min: 10, message: '内容长度不能少于 10 个字符', trigger: 'blur' },
  ],
  // 书名规则：必填，长度在 1 到 100 个字符之间
  book: [
    { required: true, message: '书名不能为空', trigger: 'blur' },
    { min: 1, max: 100, message: '书名长度应在 1 到 100 个字符之间', trigger: 'blur' },
  ],
  // ISBN 规则：选填，若填写需符合 ISBN 格式（10 位或 13 位数字）
  isbn: [
    {
      pattern: /^(?:\d{10}|\d{13})?$/,
      message: '请输入有效的 ISBN（10 位或 13 位数字）',
      trigger: 'blur',
    },
  ],
  // 价格规则：必填，为正数且最多保留两位小数
  price: [
    { required: true, message: '价格不能为空', trigger: 'blur' },
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: '请输入有效的价格（正数且最多保留两位小数）',
      trigger: 'blur',
    },
  ],
  // 分类规则：必填
  classification: [{ required: true, message: '请选择分类', trigger: 'change' }],
}
onMounted(() => {
  //@ts-ignore
  form.value.setValidateMessage(rules)
})
</script>
<template>
  <t-form
    ref="form"
    :data="formData"
    :rules="rules"
    reset-type="empty"
    show-error-message
    label-align="top"
    :disabled="disabled"
    scroll-to-first-error="auto"
    @submit="onSubmit"
  >
    <!-- 标题 -->
    <t-form-item name="title">
      <t-input
        v-model="formData.title"
        class="title-box"
        placeholder="标题，4-20字，请精准描述你的需求"
        status="error"
      />
    </t-form-item>

    <!-- 内容-->
    <t-form-item name="content">
      <t-textarea
        v-model="formData.content"
        borderless
        class="textarea-example"
        placeholder="请详细描述你所需要出售的书籍，禁止发布重复信息，违法违规，广告营销，含二维码等内容。"
      ></t-textarea>
    </t-form-item>
    <!-- 添加tag -->

    <!-- 上传图片 -->
    <t-form-item name="photo">
      <t-upload
        :default-files="formData.imagePic"
        multiple
        :max="8"
        :on-fail="onFail"
        :on-progress="onProgress"
        :on-change="onChangeUpload"
        :on-preview="onPreview"
        :on-success="onSuccess"
        :on-remove="onRemove"
        :on-select-change="onSelectChange"
        :allowUploadDuplicateFile="true"
        :request-method="doUpload"
      >
      </t-upload>
    </t-form-item>

    <!-- 书名 -->
    <t-form-item label="书名" name="book">
      <t-input v-model="formData.book" borderless placeholder="请输入内容"></t-input>
    </t-form-item>

    <!-- ISBN -->
    <t-form-item label="ISBN" name="isbn">
      <t-input v-model="formData.isbn" borderless placeholder="请输入ISBN"></t-input>
    </t-form-item>

    <!-- 分类 -->
    <t-form-item arrow label="分类" name="classification" @click="bookState.show = true">
      <div v-if="selectedClassification">{{ selectedClassification }}</div>
      <t-popup
        v-if="bookState.show"
        v-model="bookState.show"
        class="classification"
        placement="bottom"
      >
        <t-picker
          v-model="bookState.book"
          :columns="bookOptions"
          @confirm="onConfirm"
          @cancel="bookState.show = false"
          @pick="onPick"
        />
      </t-popup>
    </t-form-item>

    <!-- 价格 -->
    <t-form-item label="价格" name="price">
      <t-input v-model="formData.price" borderless placeholder="请输入价格"></t-input>
    </t-form-item>

    <div class="button-group">
      <t-button
        theme="primary"
        variant="base"
        type="submit"
        size="large"
        :disabled="formStore.isSubmitting"
        >提交</t-button
      >
    </div>
  </t-form>
</template>

<style lang="less" scoped>
/* 同步标签内间距 */
.tag-button .tdesign-tag {
  padding: var(--td-tag-padding, 4px 8px) !important;
}

.t-form .t-form__item:not(:last-child)::after {
  display: none;
}
.textarea-example {
  height: 128px;
  width: 100%;
}

.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.textarea {
  height: 100px;
  width: 100%;
}

.button-group {
  background-color: var(--bg-color-demo, #fff);
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 0.5px solid #e7e7e7;

  .t-button {
    height: 32px;
    flex: 1;

    &:not(:last-child) {
      flex: 1;
      margin-right: 16px;
    }
  }
}
</style>
