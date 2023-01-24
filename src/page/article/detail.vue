<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="top" size="default">
      <el-form-item label="所属类目" prop="categoryId" style="width: 30%">
        <el-cascader
          style="width: 100%"
          placeholder="选择分类"
          v-model="ruleForm.categoryId"
          :options="options"
          filterable
          :props="{
            label: 'name',
            value: 'id',
            children: 'sonCategory',
            expandTrigger: 'click'
          }"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="文章分类(blog必填)" prop="textType" style="width: 30%">
        <!-- <el-input v-model="ruleForm."></el-input> -->

        <el-select style="width: 100%" v-model="ruleForm.textType">
          <el-option v-for="item in typeOptions" :key="item.label.toString()" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阅读时间" prop="lookTime" style="width: 30%">
        <el-select style="width: 100%" v-model="ruleForm.lookTime">
          <el-option v-for="i in 20" :key="i.toString()" :label="i + ' minute'" :value="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="titleName">
        <el-input v-model="ruleForm.titleName"></el-input>
      </el-form-item>

      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="ruleForm.keyword"></el-input>
      </el-form-item>

      <el-form-item>
        <div>
          封面图
          <span class="option">（可选）</span>
        </div>
        <div class="image"></div>
        <el-upload drag action="api" :limit="1" :http-request="uploadFirstImage">
          <el-image v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" fit="cover" class="w-60 h-28 mr-5"></el-image>
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item prop="mainBody">
        <div class="my-4 rounded-lg border border-gray-300 w-full">
          <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" />
          <Editor style="min-height: 300px; overflow-y: hidden" v-model="ruleForm.mainBody" @onCreated="handleCreated" :defaultConfig="editorConfig" />
        </div>
      </el-form-item>
      <!-- <el-form-item prop="isHot">
        <el-checkbox v-model="ruleForm.isHot">设置为自动回复热门问题</el-checkbox>
      </el-form-item> -->
    </el-form>
    <div class="header_button float-right">
      <el-button class="btn-border" size="default" @click="back">取消</el-button>
      <el-button class="btn-black" size="default" @click="submitForm(ruleFormRef, 0)">保存为草稿</el-button>
      <el-button class="btn-red" size="default" @click="submitForm(ruleFormRef, 1)">发布</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categoryList, saveHelpText, textDetail, uploadRichTextImage } from '@/api/path/article'
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const editorRef = ref()

const options = ref<Array<object> | any>([])
const ruleForm = ref<Object | any>({})
const quillRef = ref<any>()
const rules = reactive<FormRules>({
  categoryId: [{ required: true, trigger: 'change' }],
  mainBody: [{ required: true, trigger: 'blur' }]
})
const route = useRoute()
const router = useRouter()
const typeOptions = [
  { label: 'Getting start/Guides', value: 1 },
  { label: 'Poppy Updates', value: 2 },
  { label: 'Poppy tips', value: 3 },
  { label: 'Shipping', value: 4 },
  { label: 'Branding and marketing', value: 5 },
  { label: 'Finance', value: 6 },
  { label: 'Productivity', value: 7 },
  { label: 'Community', value: 8 },
  { label: 'Promotion', value: 9 },
  { label: 'Growth strategies', value: 10 }
]

const editorConfig = {
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: any, insertFn: any) {
        const fd = new FormData()
        fd.append('resource', file)
        try {
          const { data, code } = await uploadRichTextImage(fd)
          console.log(data)
          // 如果上传成功
          if (code === 200) {
            insertFn(data, file.name, data)
          }
        } catch (err) {
          console.log(err)
        } finally {
        }
      }
    }
  }
}

const getCategoryList = async () => {
  try {
    const { data }: any = await categoryList({})
    options.value = data
  } catch (err) {
    console.log(err)
  } finally {
  }
}
// 封面图片上传
const uploadFirstImage = async (params: any) => {
  // 获取富文本组件实例
  //   this.loading = true
  // const quill = this.$refs.myQuillEditor.quill;
  // 上传图片
  const fd = new FormData()
  fd.append('resource', params.file)
  console.log(fd.get('resource'))

  try {
    const { data, code } = await uploadRichTextImage(fd)
    // 如果上传成功
    if (code === 200) {
      // // 获取光标所在位置
      // const length = quill.getSelection().index;
      // // 插入图片，data为服务器返回的图片链接地址
      // quill.insertEmbed(length, "image", data);
      // // 调整光标到最后
      // quill.setSelection(length + 1);
      // this.loading = false;
      ruleForm.value.imageUrl = data
    }
  } catch (err) {
    console.log(err)
    // this.$message.error('封面上传失败')
  } finally {
    // this.loading = false
  }
}

onMounted(async () => {
  await getCategoryList()
  await getTextInfo()
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const getTextInfo = async () => {
  if (!route.params.id) {
    return
  }
  // console.log(router.params.id)
  try {
    // this.loading = true;
    const { data } = await textDetail({ id: route.params.id })
    // console.log(data)
    ruleForm.value = {
      ...data,
      isHot: data.isHot === 1,
      categoryId: [findParentId(data.categoryId), data.categoryId]
    }
  } catch (err) {
    console.log(err)
  } finally {
    // this.loading = false
  }
}

const findParentId = (id: string) => {
  let result = ''
  options.value.map((item: any) => {
    if (item.sonCategory) {
      item.sonCategory.map((son: any) => {
        if (son.id === id) {
          result = son.parentId
        }
      })
    }
  })
  return result
}

const back = async () => {
  router.go(-1)
}

const submitForm = async (formEl: FormInstance | undefined, state: number | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    console.log(formEl)
    if (valid) {
      const len = ruleForm.value.categoryId?.length
      const isHot = ruleForm.value.isHot ? 1 : 0
      const categoryId = len > 1 ? ruleForm.value.categoryId[len - 1] : ruleForm.value.categoryId[0]
      const { message } = await saveHelpText({
        ...ruleForm.value,
        categoryId,
        state,
        isHot
      })
      ElMessage.success(message)
      back()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped></style>
