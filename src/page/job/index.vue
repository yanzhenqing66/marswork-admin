<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { fetchJobList } from '@/api/path/job'
import Filter from './components/filter.vue'
import { debounce } from '@/libs/optimizeFn'
import TableList from './components/list.vue'

const tableData = ref([])

const curPage = ref(1)
const total = ref(0)

const search: any = reactive({
  q: '',
  id: '',
  label: {},
  salaryRange: [0, 200000],
  isRemote: false,
  checked: null
})

watch(
  search,
  () => {
    getJobList()
  },
  // { immediate: true }
)

const pageChange = (val: number) => {
  curPage.value = val
  getJobList()
}

const getJobList = debounce(async () => {
  const params = {
    curPage: curPage.value,
    pageSize: 40,
    ...search,
    isRemote: search.isRemote ? 1 : 0,
    includeNullSalary: search.includeNullSalary ? 1 : 0,
    min_yearly_salary: search.salaryRange[0] === 0 ? null : search.salaryRange[0],
    max_yearly_salary: search.salaryRange[1] === 200000 ? null : search.salaryRange[1],
    salaryRange: null,
    asc: true,
    checked: search.checked === 'Yes' ? 1 : search.checked === 'No' ? 0 : null
  }
  const res: any = await fetchJobList(params)
  tableData.value = res.data.contents
  total.value = res.data.total
})
</script>

<template>
  <div>
    <Filter :search="search" />
    <TableList :table-data="tableData" />
    <div class="my-10 flex justify-center">
      <ElPagination layout="prev, pager, next" background :total="total" :page-size="40" @current-change="pageChange" />
    </div>
  </div>
</template>
