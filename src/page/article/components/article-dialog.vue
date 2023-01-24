<template>
  <el-dialog class="rounded-2xl" :title="options.title" width="600px" @open="open" v-model:model-value="visible" @close="cancel" center>
    <div class="orderOperate_dialog">
      <el-form ref="itemFormRef" :model="itemForm" :rules="itemRules" label-width="80px">
        <el-form-item label="类目名称" prop="name">
          <el-input v-model="itemForm.name" placeholder="请输入类目名称"></el-input>
        </el-form-item>
        <el-form-item label="类目等级" prop="level">
          <el-select v-model="itemForm.level" placeholder="请选择类目等级">
            <el-option v-for="item in levelOptions" :key="item.level" :label="item.label" :value="item.level"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="父级类目" prop="parentId" v-if="itemForm.level === 2">
          <el-select v-model="itemForm.parentId" placeholder="请选择父级类目">
            <el-option v-for="item in categoryTree" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="itemForm.level === 1" label="类目归属" prop="type">
          <el-select v-model="itemForm.type" placeholder="请选择类目文档类型">
            <el-option v-for="item in articleLevelType1" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="itemForm.level === 2" label="类目归属" prop="type">
          <el-select v-model="itemForm.type" placeholder="请选择类目文档类型">
            <el-option v-for="item in articleLevelType2" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="mt-8 text-right text-black">
        <el-button class="text-black" type="danger" @click="cancel()">Cancel</el-button>
        <el-button class="text-black" type="primary" @click="saveAddMenu">Save</el-button>
      </div>
      <!-- <span slot="footer" class="dialog-footer"> -->
      <!-- </span> -->
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { categoryList, saveHelpCategory } from '@/api/path/article'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
const props = defineProps({
  options: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  },
  visible: {
    type: Boolean,
    default() {
      return false
    }
  }
})

const emit = defineEmits(['change', 'success', 'close'])
const itemForm = ref<any>({})
const itemRules = {
  name: {
    required: true,
    message: '请输入类目名称不能为空',
    trigger: 'blur'
  },
  level: {
    required: true,
    message: '请选择类目等级不能为空',
    trigger: 'change'
  },
  parentId: {
    required: true,
    message: '请选择父级类目',
    trigger: 'change'
  },
  type: {
    required: true,
    message: '请选择类目文档类型',
    trigger: 'change'
  }
}

const levelOptions = [
  { level: 1, label: '一级' },
  { level: 2, label: '二级' }
]

const articleLevelType1 = [
  { type: 1, label: 'helpCenter' },
  { type: 2, label: 'NewsRoom&Blog' }
]

const articleLevelType2 = [
  { type: 1, label: 'helpCenter' },
  { type: 3, label: '商家' },
  { type: 4, label: '用户' },
  { type: 5, label: '公司' }
]

const categoryTree = ref<Array<object> | any>([])
const loading = ref(false)
const itemFormRef = ref<FormInstance>()

// watch: {
//   "this.options.data": {
//     deep: true,
//     handler: (val) => {
//       this.itemForm = { ...val };
//     }
//   }
// },

// async mounted() {
//   this.itemForm = { ...this.options.data };
// },
async function getCategoryList() {
  try {
    loading.value = true
    const { data }: any = await categoryList()
    categoryTree.value = data
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
//保存新增
async function saveAddMenu() {
  // itemFormRef.validate(async (va:Boolean) => {
  // if (va) {
  // let search: object | any = {}
  // // const methodType = this.options.type === "add" ? "initRoleMenu" : "updateRoleMenu";
  // Object.keys(itemForm.value).forEach((x) => {
  //   if (itemForm.value[x] === '') return
  //   search[x] = itemForm[0]
  // })

  try {
    loading.value = true
    await saveHelpCategory({ ...itemForm.value })
    emit('success')
    cancel()
    ElMessage.success('保存成功')
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
  // }
  // })
}

async function open() {
  itemForm.value = { ...props.options.data }
  await getCategoryList()
}
function cancel() {
  emit('close')
  // itemFormRef.resetFields()
}
</script>
