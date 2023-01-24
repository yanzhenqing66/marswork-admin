<script setup lang="ts">
import moment from 'moment'

defineProps({
  tableData: {
    type: Array,
    default: () => []
  }
})

const formatLocation = (locations: any) => {
  if (!locations) return
  return Object.entries(locations).map((item: any) => {
    return item?.[1].toString() + ' ' + item[0]
  })[0]
}
</script>

<template>
  <el-table
    :data="tableData"
    @row-click="
      (row:any) => {
        $router.push('/job/' + row.id)
      }
    "
    style="width: 100%"
    class="rounded-md mt-5"
  >
    <el-table-column label="Title">
      <template #default="scope">
        <span class="break-words">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="hiring_organization_name" label="Company" />
    <el-table-column label="Location">
      <template #default="scope">
        {{ formatLocation(scope.row.locations[0]) }}
      </template>
    </el-table-column>
    <el-table-column label="Salary">
      <template #default="scope">
        {{ '$' + scope.row.min_yearly_salary + '-' + '$' + scope.row.max_yearly_salary }}
      </template>
    </el-table-column>
    <el-table-column label="发布时间">
      <template #default="scope">
        {{ moment(scope.row.date_posted).format('MMMM Do YYYY') }}
      </template>
    </el-table-column>
    <el-table-column label="Role">
      <template #default="{ row }">
        <el-tag v-for="item in row?.job_roles?.['Non Tech Jobs']" :key="item" class="mx-1" round>
          {{ item }}
        </el-tag>
        <el-tag v-for="item in row?.job_roles?.['Tech Jobs']" :key="item" class="mx-1" round>
          {{ item }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Level">
      <template #default="scoped">
        {{ scoped.row?.experience_level?.toString() }}
      </template>
    </el-table-column>

    <el-table-column label="Checked">
      <template #default="scoped">
        {{ scoped.row.checked ? 'checked' : '' }}
      </template>
    </el-table-column>
  </el-table>
</template>
