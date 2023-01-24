<script setup lang="ts">
import { textSort } from '@/api/path/article'
import { deleteText } from '@/api/path/article'
import { ElMessage } from 'element-plus'
import moment from 'moment'
const props = defineProps({
  tableData: {
    type: Array
  }
})

const emit = defineEmits(['change'])

const setTextSort = async (id: any, sort: any, flag: any) => {
  if (sort === 0 && flag === 'up') {
    return
  }
  if (sort === props.tableData?.length && flag === 'down') {
    return
  }

  // if (flag === "down") {
  //   tableData.tableDataList.splice(
  //     sort + 1,
  //     1,
  //     ...tableData.tableDataList.splice(
  //       sort,
  //       1,
  //       tableData.tableDataList[sort + 1]
  //     )
  //   );
  // }
  // if (flag === "up") {
  //   tableData.tableDataList.splice(
  //     sort - 1,
  //     1,
  //     ...tableData.tableDataList.splice(
  //       sort,
  //       1,
  //       tableData.tableDataList[sort - 1]
  //     )
  //   );
  // }
  try {
    await textSort({ id, direction: flag })
    // this.textList();
    emit('change')
  } catch (err) {
    console.log(err)
  } finally {
  }
}

const setDeleteText = async (id: any) => {
  const search = {
    id: id
  }
  try {
    // this.tableData.loading = true
    await deleteText(search)
    emit('change')
    ElMessage.success('删除成功')
  } catch (err) {
    ElMessage.error('删除失败')
  } finally {
    // this.tableData.loading = false
  }
}
</script>

<template>
  <el-table :data="tableData" fit class="rounded-md mt-5">
    <el-table-column label="序号" type="index" width="50"></el-table-column>
    <el-table-column label="标题" prop="titleName" width="500"></el-table-column>
    <el-table-column label="时间" prop="addTime">
      <template #default="scope">
        <span>{{ moment(scope.row.addTime).format('MMM Do YY') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template #default="scope">
        <span>{{ scope.row.state === 0 ? '草稿' : '发布' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click="
            $router.push({
              path: `/article/${scope.row.id}`,
            })
          "
        >
          编辑
        </el-button>
        <el-button type="text" size="small" class="isCurrent" @click="setDeleteText(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    <el-table-column label="排序">
      <template #default="scope">
        <span class="cursor-pointer" @click="setTextSort(scope.row.id, scope.$index, 'down')">
          <el-icon><SortDown /></el-icon>
        </span>
        <span class="cursor-pointer" @click="setTextSort(scope.row.id, scope.$index, 'up')">
          <el-icon><SortUp /></el-icon>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
