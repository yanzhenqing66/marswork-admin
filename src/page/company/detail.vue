<template>
  <div>
    <div class="flex items-center">
      <div class="flex flex-col mr-5">
        <el-avatar :src="companyDetail.logo" style="width: 100px; height: 100px" />
        <el-upload :limit="1" :http-request="handleUploadLogo">
          <el-button type="primary" class="mt-3">更换 logo</el-button>
        </el-upload>
      </div>
      <div class="ml-3">
        <h2 class="text-4xl">{{ companyDetail.companyName }}</h2>
        <p>ID: {{ companyDetail.id }}</p>
      </div>
    </div>
    <div class="my-6">
      <el-form ref="companyDetailRef" :model="companyDetail" :rules="rules" size="default" label-position="top" status-icon>
        <d-container>
          <el-form-item label="Company intro" prop="oneLineDescription">
            <el-input v-model="companyDetail.oneLineDescription" :autosize="{ minRows: 3 }" type="textarea" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="Company overview" prop="description">
            <el-input v-model="companyDetail.description" :autosize="{ minRows: 6 }" type="textarea" placeholder="Please input" />
          </el-form-item>
        </d-container>
        <d-container>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="Location" prop="locations" required>
                <el-tree-select
                  v-model="companyDetail.locations"
                  :data="queryData[0]?.children"
                  :render-after-expand="false"
                  show-checkbox
                  multiple
                  :placeholder="queryData[0]?.labelName"
                  check-strictly="true"
                  class="w-full"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Company Size" prop="companySize">
                <el-select class="w-full" v-model="companyDetail.companySize" placeholder="Select">
                  <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Founded in" prop="foundedIn">
                <el-input v-model="companyDetail.foundedIn" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Industry" prop="industry">
                <el-input v-model="companyDetail.industry" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Twitter" prop="twitterUrl">
                <el-input v-model="companyDetail.twitterUrl" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="LinkedIn" prop="linkedInUrl">
                <el-input v-model="companyDetail.linkedInUrl" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Website" prop="website">
                <el-input v-model="companyDetail.website" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mt-5 text-gray-600">
            <span class="mr-2">原链接</span>
            <a class="text-sm hover:text-red-500" :href="`https://marswork.xyz/company/${companyDetail.id}`" target="_blank">
              {{ `https://marswork.xyz/company/${companyDetail.id}` }}
            </a>
          </div>
        </d-container>
        <d-container>
          <h3 class="text-2xl">Company overview</h3>
          <List :list="list" />
          <div class="flex items-center justify-center">
            <el-button type="success" :disabled="curPage === 1" @click="getJobList(curPage - 1)" :icon="ArrowLeftBold"></el-button>
            <span class="mx-3">
              {{ curPage + '/' + total }}
            </span>
            <el-button type="success" :disabled="curPage === total" @click="getJobList(curPage + 1)" :icon="ArrowRightBold"></el-button>
          </div>
        </d-container>
      </el-form>
      <div class="mt-8 float-right">
        <!-- <el-form-item class=""> -->
        <el-button type="danger" class="text-black" @click="resetForm(companyDetailRef)">Reset</el-button>
        <el-button type="primary" class="text-black" @click="submitForm(companyDetailRef)">Save</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import List from '@/components/job-list/index.vue'
import DContainer from '@/components/d-container.vue'
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { fetchCompanyDetail, fetchCompanyUpdate, uploadCompanyLogo } from '@/api/path/company'
import { fetchJobList, fetchSearchQuery } from '@/api/path/job'

const companyDetail = ref<object | any>({})
const queryData = ref<Array<object> | any>([])
const total = ref<number>(0)

const curPage = ref<number | any>(1)
const list = ref<Array<object> | any>([])

const router = useRoute()

onMounted(() => {
  fetchSearchQuery().then((res: any) => {
    const resData = res.data.map((item: any) => {
      if (item.children) {
        item.children.map((item2: any) => {
          item2.value = item2.labelName
          item2.label = item2.labelName
          if (item2.children) {
            item2.children.map((item3: any) => {
              item3.value = item3.labelName
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

    // console.log(resData);
    queryData.value = resData
  })
  getDetailJob()
  getJobList()
})

const handleUploadLogo = (options: any) => {
  const formdata = new FormData()
  formdata.append('resource', options.file)
  uploadCompanyLogo(formdata).then((res: any) => {
    if (res.code === 200) {
      companyDetail.value.logo = res.data
    }
  })
}

async function getDetailJob() {
  const { data } = await fetchCompanyDetail({
    id: router?.params?.id as string
  })

  companyDetail.value = {
    ...data,
    locations: data.locations ? JSON.parse(data.locations) : null,
    industry: data.industry ? JSON.parse(data.industry).toString() : ''
  }
}
async function getJobList(page?: number) {
  // const curPage =  page&&page >0 ? search.curPage :  page+
  const { data } = await fetchJobList({
    companyId: router?.params?.id as string,
    curPage: page
  })
  list.value = data.contents
  curPage.value = data.curPage
  total.value = data.pages
}

const companyDetailRef = ref<FormInstance>()

const option: any = [
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
const rules = reactive<FormRules>({
  oneLineDescription: [{ required: true, trigger: 'blur' }],
  description: [
    {
      required: true,
      trigger: 'blur'
    }
  ],
  region: [
    {
      required: true,
      trigger: 'change'
    }
  ],
  website: {
    required: true,
    trigger: 'blur'
  }
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data, message } = await fetchCompanyUpdate({
        ...companyDetail.value,
        industry: companyDetail.value.industry ? JSON.stringify(companyDetail.value.industry) : null,
        locations: companyDetail.value.locations ? JSON.stringify(companyDetail.value.locations) : null
      })
      ElMessage.success(message)
    } else {
      // console.log('error submit!', fields)
      ElMessage.error('失败!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped></style>
