<template>
  <main>
    <div class="flex justify-between">
      <div class="flex items-center">
        <!-- <Back path="/" /> -->
        <span class="font-default text-2xl">文章管理</span>
      </div>
      <div>
        <el-button><a href="https://marswork.xyz/blog" target="_blank" rel="noopener noreferrer">去Blog</a></el-button>
        <el-button @click="$router.push('/article/category')">类目管理</el-button>
        <el-button @click="$router.push('/article/add')">新增文章</el-button>
      </div>
    </div>
    <div class="mt-5">
      <p class="block">
        <span>选择类目</span>
      </p>
      <el-cascader
        class="my-2"
        placeholder="选择分类"
        v-model="search.categoryId"
        filterable
        :options="options"
        :props="{
          label: 'name',
          value: 'id',
          children: 'sonCategory',
          expandTrigger: 'click'
        }"
        clearable
        @change="handleChange"
      ></el-cascader>
    </div>
    <List :tableData="tableData" @change="getTextList" />
    <div class="my-10 flex justify-center">
      <ElPagination v-show="pages !== 1" layout="prev, pager, next" background :total="total" :page-size="10" @current-change="pageChange" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import List from './components/list.vue'
import { categoryList, textList } from '@/api/path/article'
import { debounce } from '@/libs/optimizeFn'
import { Search } from '@element-plus/icons-vue'
const tableData = ref([])
const curPage = ref(1)
const total = ref(0)
const pages = ref(0)
const options = ref([])

const search = reactive<any>({
  categoryId: ''
})

const getTextList = async () => {
  try {
    const params = {
      categoryId: search.categoryId
    }
    const len = search.categoryId?.length || 0
    params.categoryId = len > 1 ? search.categoryId[len - 1] : search.categoryId[0]

    const { data }: any = await textList({ ...params, curPage: curPage.value })
    tableData.value = data.contents

    console.log(tableData.value)
    total.value = data.total
    pages.value = data.pages
  } catch (err) {
    console.log(err)
  } finally {
  }
}

const pageChange = (val: number) => {
  curPage.value = val
  getTextList()
}

const getCategoryList = async () => {
  try {
    const { data }: any = await categoryList({})
    options.value = data
    search.categoryId = [data[0].id, data[0].sonCategory[0].id]
    getTextList()
  } catch (err) {
    console.log(err)
  } finally {
  }
}

onMounted(async () => {
  await getCategoryList()
  // await getTextList
})
const handleChange = () => {
  getTextList()
}
</script>
