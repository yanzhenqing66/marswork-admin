<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { fetchSearchQuery } from '@/api/path/job'
import type { QueryItem } from '@/api/path/job'
import { debounce } from '@/libs/optimizeFn'

const props = defineProps({
  search: {
    type: Object,
    default: {}
  }
})

const checkedList = ['Yes', 'No']

const queryData = ref<QueryItem[]>([])

onMounted(() => {
  fetchSearchQuery().then((res) => {
    const resData = res.data.map((item: QueryItem) => {
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
    })

    queryData.value = resData
  })
})

const salaryRangeChange = debounce((val: any[]) => {
  props.search.salaryRange = val
}, 500)
</script>

<template>
  <div>
    <section class="flex">
      <ElInput v-model="search.id" placeholder="Job ID" :prefix-icon="Search" size="large" class="mr-5" />
      <ElInput v-model="search.q" placeholder="Job title, keywords, or company" :prefix-icon="Search" size="large" />
    </section>
    <div class="flex flex-wrap">
      <section v-for="item in queryData" :key="item.id">
        <div v-if="item.id === '85'" style="min-width: 200px; margin: 0 20px">
          <div class="flex justify-between text-sm mt-1">
            <span>{{ search.salaryRange[0] }}</span>
            <span>Price</span>
            <span>{{ search.salaryRange[1] }}</span>
          </div>
          <ElSlider v-model="search.salaryRange" :min="0" :max="200000" range :show-tooltip="false" :step="1000" @change="salaryRangeChange" size="small" />
        </div>
        <ElSwitch v-else-if="item.id === '84'" v-model="search.isRemote" class="mt-3 mr-2" active-text="Remote" />
        <el-tree-select
          v-else
          v-model="search.label[item.id]"
          :data="item.children"
          :render-after-expand="false"
          show-checkbox
          multiple
          :placeholder="item.labelName"
          size="large"
          check-strictly="true"
          class="mt-2 mr-2"
        />
      </section>
      <el-select v-model="search.checked" class="mt-2 mr-2" placeholder="Checked" size="large" clearable>
        <el-option v-for="item in checkedList" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </div>
</template>
