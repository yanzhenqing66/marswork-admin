<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { fetchSearchQuery } from '@/api/path/job'
import type { QueryItem } from '@/api/path/job'

const SizeOptions = [
  { value: '5 - 9', label: '5 - 9' },
  { value: '20 - 49', label: '20 - 49' },
  { value: '50 - 99', label: '50 - 99' },
  { value: '100 - 249', label: '100 - 249' },
  { value: '250 - 499', label: '250 - 499' },
  { value: '500 - 999', label: '500 - 999' },
  { value: '1000 - 5000', label: '1000 - 5000' },
  { value: '10,000 - 49,999', label: '10,000 - 49,999' },
  { value: '50,000 - 99,999', label: '50,000 - 99,999' },
  { value: '100,000+', label: '100,000+' }
]

const checkEmun = ['Checked']

const year = new Date(Date.now()).getFullYear()
const foundedInList: number[] = []

for (let i = year; i >= year - 100; i--) {
  foundedInList.push(i)
}

defineProps({
  search: {
    type: Object,
    default: {}
  }
})

const queryData = ref([])

onMounted(() => {
  fetchSearchQuery().then((res) => {
    const resData = res.data.map((item: QueryItem) => {
      if (item.id === '54') {
        if (item.children) {
          item.children.map((item2: QueryItem) => {
            item2.value = item2.id
            item2.label = item2.labelName
            if (item2.children) {
              item2.children.map((item3: QueryItem) => {
                item3.value = item3.id
                item3.label = item3.labelName
                return item3
              })
            }
            return item2
          })
          return item
        } else {
          return item
        }
      }
    })

    queryData.value = resData[0].children
  })
})
</script>

<template>
  <div>
    <ElInput v-model="search.companyTitle" placeholder="Company ID, name" :prefix-icon="Search" size="large" style="width: 570px" clearable />
    <section>
      <el-tree-select
        v-model="search.location"
        :data="queryData"
        :render-after-expand="false"
        show-checkbox
        placeholder="Location"
        size="large"
        check-strictly="true"
        class="mt-2 mr-2"
        clearable
      />
      <el-select v-model="search.companySize" clearable placeholder="Size" size="large" class="mt-2 mr-2">
        <el-option v-for="item in SizeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="search.foundedIn" clearable placeholder="Founded in" size="large" class="mt-2 mr-2">
        <el-option v-for="item in foundedInList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="search.isChecked" clearable placeholder="Checked" size="large" class="mt-2 mr-2">
        <el-option v-for="item in checkEmun" :key="item" :label="item" :value="item" />
      </el-select>
    </section>
  </div>
</template>
