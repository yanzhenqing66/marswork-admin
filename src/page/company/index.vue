<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { fetchCompanyList } from '@/api/path/company'
import { debounce } from '@/libs/optimizeFn'
import Filter from './components/filter.vue'
import List from './components/list.vue'

const tableData = ref([])
const curPage = ref(1)
const total = ref(0)

const search = reactive<any>({
  companyTitle: '',
  location: '',
  companySize: '',
  foundedIn: '',
  isChecked: null
})

watch(search, () => {
  getCompanyList()
})

onMounted(() => {
  getCompanyList()
})

const pageChange = (val: number) => {
  curPage.value = val
  getCompanyList()
}

const getCompanyList = debounce(() => {
  const params = {
    curPage: curPage.value,
    pageSize: 40,
    ...search,
    isChecked: search.isChecked ? 'Checked' : null
  }
  fetchCompanyList(params).then((res) => {
    tableData.value = res.data.contents
    total.value = res.data.total
  })
})
</script>

<template>
  <main>
    <Filter :search="search" />
    <List :tableData="tableData" />
    <div class="my-10 flex justify-center">
      <ElPagination layout="prev, pager, next" background :total="total" :page-size="40" @current-change="pageChange" />
    </div>
  </main>
</template>
