<script setup lang="ts">
import TwitterIcon from '@/components/icons/twitter.vue'
import LinkedInIcon from '@/components/icons/linkedin.vue'
import DiscordIcon from '@/components/icons/discord.vue'

defineProps({
  tableData: {
    type: Array
  }
})

const getUrlList = (urlList: string, key: string) => {
  if (!urlList) return
  const list = JSON.parse(urlList)
  const url = list.filter((item: { href: string; name: string }) => item.name === key)[0]
  return url
}
</script>

<template>
  <el-table
    :data="tableData"
    @row-click="
      (row:any) => {
        $router.push('/company/' + row.id)
      }
    "
    style="width: 100%"
    class="mt-5"
  >
    <el-table-column prop="companyName" label="Name" />
    <el-table-column prop="locations" label="Location" />
    <el-table-column prop="foundedIn" label="Founded in" />
    <el-table-column prop="companySize" label="Size" />
    <el-table-column prop="jobCount" label="Opening" />
    <el-table-column label="Media">
      <template #default="scope">
        <div class="flex">
          <a v-if="getUrlList(scope.row.urlList, 'LinkedIn URL')" :href="getUrlList(scope.row.urlList, 'LinkedIn URL').href" class="mr-1" target="_blank">
            <LinkedInIcon />
          </a>
          <a v-if="getUrlList(scope.row.urlList, 'Twitter URL')" :href="getUrlList(scope.row.urlList, 'Twitter URL').href" class="mr-1" target="_blank">
            <TwitterIcon />
          </a>
          <a v-if="getUrlList(scope.row.urlList, 'Discord URL')" :href="getUrlList(scope.row.urlList, 'Discord URL').href" class="mr-1" target="_blank">
            <DiscordIcon />
          </a>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="isChecked" label="Checked" />
  </el-table>
</template>
