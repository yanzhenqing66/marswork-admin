<template>
  <div>
    <div class="flex justify-between">
      <div class="flex items-center font-default text-2xl">
        <Back />
        <span class="font-default text-2xl">类目管理</span>
      </div>
      <el-button @click="addCategory">新增类目</el-button>
    </div>
    <div class="mt-5">
      <el-table
        :data="categoryTree"
        border
        row-key="id"
        v-loading="loading"
        :tree-props="{
          children: 'sonCategory'
        }"
      >
        <el-table-column label="序号" prop="sort"></el-table-column>
        <el-table-column label="名称" prop="name" width="500"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div>
              <el-button type="text"  @click="editCategory(scope.row)">编辑</el-button>
              <el-button type="text"  @click="setDeleteCategory(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template class="sort" #default="scope">
            <span @click="setCategorySort(scope.row.id, scope.row.sort, 'down')">
              <el-icon><SortDown /></el-icon>
            </span>
            <span @click="setCategorySort(scope.row.id, scope.row.sort, 'up')">
              <el-icon><SortUp /></el-icon>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <article-dialog :visible="editDialog" :options="options" @close="editDialog = false" @success="getCategoryList" />
  </div>
</template>

<script setup lang="ts">
import { categoryList, categorySort, deleteCategory } from '@/api/path/article'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import ArticleDialog from './components/article-dialog.vue'

const categoryTree = ref([])
const loading = ref(false)
const options = reactive<any>({})
const editDialog = ref<Boolean | any>(false)
components: {
  ArticleDialog
}

onMounted(async () => {
  await getCategoryList()
})

const getCategoryList = async () => {
  try {
    loading.value = true
    const { data } = await categoryList()
    categoryTree.value = data
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

const setCategorySort = async (id: any, sort: any, flag: any) => {
  try {
    loading.value = true
    await categorySort({ id, direction: flag })
    // this.textList();
    getCategoryList()
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

const editCategory = (row: any) => {
  editDialog.value = true
  options.data = row
  options.title = '编辑类目'
}

const addCategory = (row: any) => {
  editDialog.value = true
  options.data = {}
  options.title = '新增类目'
}

const setDeleteCategory = async (id: any) => {
  //   console.log(id)
  try {
    loading.value = true
    await deleteCategory({ id })
    getCategoryList()
    ElMessage.success('删除成功')
  } catch (err) {
    ElMessage.error('删除失败')
  } finally {
    loading.value = false
  }
}
</script>
