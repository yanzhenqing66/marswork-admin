<template>
  <div>
    <h2 class="text-4xl">{{ jobData.title }}</h2>
    <p>ID: {{ jobData._id }}</p>
    <div class="my-6">
      <el-form ref="jobDataRef" :model="jobData" :rules="rules" size="default" label-position="top">
        <d-container>
          <h3 class="text-2xl">Job Description</h3>
          <div class="my-4 rounded-lg border border-gray-300">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" />
            <Editor style="height: 500px; overflow-y: hidden" v-model="jobData.description" @onCreated="handleCreated" />
          </div>
        </d-container>
        <d-container>
          <el-row :gutter="40">
            <el-col :span="item.id === '48' || item.id === '47' || item.id === '57' || item.id === '34' ? 12 : 0" v-for="item in queryData" :key="item.id">
              <el-form-item v-if="item.id === '48' || item.id === '47' || item.id === '57' || item.id === '34'" :label="item.labelName">
                <el-tree-select
                  @change="change"
                  v-model="search[item.id]"
                  :data="item.children"
                  :render-after-expand="false"
                  show-checkbox
                  multiple
                  :placeholder="item.labelName"
                  class="w-full"
                />
              </el-form-item>
              <!-- </div> -->
            </el-col>
            <!-- 
            <el-col :span="12">
              <el-form-item label="Duration" prop="duration">
                <el-input v-model="jobData.duration"></el-input>
                <el-select v-model="jobData.duration" multiple class="w-full" placeholder="Select">
                  <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col> -->

            <el-col :span="12">
              <el-form-item label="Remote" prop="isRemote">
                <el-select class="w-full" v-model="jobData.isRemote" placeholder="Select">
                  <el-option v-for="item in remote" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Application link/email" prop="apply_url">
                <el-input v-model="jobData.apply_url" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Data Source" prop="save_from">
                <el-input v-model="jobData.save_from" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Company" prop="companyId">
                <el-select
                  v-model="jobData.companyId"
                  filterable
                  remote
                  class="w-full"
                  reserve-keyword
                  placeholder="Please enter a keyword"
                  remote-show-suffix
                  :remote-method="remoteMethod"
                >
                  <el-option v-for="item in companyList" :key="item.id" :label="item.companyName" :value="item.id">
                    <div class="flex justify-between items-center">
                      <el-avatar size="small" :src="item.logo" />
                      <span class="w-36 overflow-ellipsis">{{ item.companyName }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="Mini Salary" prop="min_yearly_salary" required>
                <el-input v-model="jobData.min_yearly_salary" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="1" class="flex justify-center items-center">
              <span>-</span>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Max Salary" prop="max_yearly_salary" required>
                <el-input v-model="jobData.max_yearly_salary" type="number" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mt-5 text-gray-600">
            <span class="mr-2">原链接</span>
            <a class="text-sm hover:text-red-500" :href="`https://marswork.xyz/detail/${jobData._id}`" target="_blank">
              {{ `https://marswork.xyz/detail/${jobData._id}` }}
            </a>
          </div>
        </d-container>

        <div class="mt-8">
          <el-form-item class="float-right">
            <el-button @click="resetForm(jobDataRef)">Cancel</el-button>
            <el-button @click="submitForm(jobDataRef)">Save</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import DContainer from '@/components/d-container.vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, onMounted, shallowRef, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { checkOrUpdateJob, fetchJobDetail, fetchSearchQuery } from '@/api/path/job'
import untieTree from '@/libs/treeToArray'
import { fetchCompanyList } from '@/api/path/company'

const route = useRoute()
const router = useRouter()
const jobData = ref<object | any>({})

const editorRef = shallowRef()

const search = ref<object | any>({})
const queryData = ref<Array<object> | any>([])
const companyList = ref<Array<object> | any>([])
const labels = ref<Object | any>({})
const jobDataRef = ref<FormInstance>()
const detailRef = ref<any>()
function change() {
  console.log(search.value)
}

onMounted(() => {
  fetchSearchQuery().then((res: any) => {
    const resData = res.data.map((item: any) => {
      if (item.children) {
        item.children.map((item2: any) => {
          item2.value = item2.id
          item2.label = item2.labelName
          if (item2.children) {
            item2.children.map((item3: any) => {
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

    // console.log(resData)
    // 初始化数据
    queryData.value = resData
    labels.value = getLabels(resData)
  })
  getDetailJob()
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

async function getDetailJob() {
  const { data } = await fetchJobDetail({ id: route?.params?.id })
  jobData.value = data
  jobData.value.min_yearly_salary = data.salary.min_yearly_salary
  jobData.value.max_yearly_salary = data.salary.max_yearly_salary

  const labelIds = data?.labelIds?.map((item: Number) => item.toString())
  // console.log(labels)
  search.value = {
    '57': data.mainSkillList || getSame(labels.value['57'], labelIds),
    '48': data.jobTypeList || getSame(labels.value['48'], labelIds),
    '47': data.jobRolesList || getSame(labels.value['47'], labelIds),
    '34': data.experience_level || getSame(labels.value['34'], labelIds)
  }
}

async function remoteMethod(params: string) {
  const { data }: any = await fetchCompanyList({ q: params })
  if (data) {
    companyList.value = data.contents
  } else {
    companyList.value = []
  }
}

const option: any = [
  { label: '5 – 9', value: '5 – 9' },
  { label: '10 – 19', value: '10 – 19' },
  { label: '50 – 99', value: '50 – 99' },
  { label: '100 – 249', value: '100 – 249' },
  { label: '500 – 999', value: '500 – 999' },
  { label: '10,000 – 49,999', value: '10,000 – 49,999' },
  { label: '50,000 – 99,999', value: '50,000 – 99,999' },
  { label: '100,000+', value: '100,000+' }
]

const getLabels = (arr: Array<any>) => {
  // if (!arr.length) {
  //   return {}
  // }
  const result: any = {}
  arr.map((item: any) => {
    if (item.children) {
      result[item.id] = untieTree(item.children)
    }
  })
  return result
}

const getSame = (arr1: Array<any>, arr2: Array<object>) => {
  return [...new Set(arr1)].filter((item) => arr2.includes(item))
}

const remote: any = [
  { label: 'YES', value: 1 },
  { label: 'No', value: 0 }
]

const rules = reactive<FormRules>({
  apply_url: [{ required: true, trigger: 'blur' }],
  isRemote: [
    {
      required: true,
      trigger: 'change'
    }
  ],
  description: [
    {
      required: true,
      trigger: 'blur'
    }
  ],
  mainSkillList: [
    {
      required: true,
      trigger: 'change'
    }
  ],
  jobTypeList: {
    required: true,
    trigger: 'blur'
  },
  jobRolesList: {
    required: true,
    trigger: 'blur'
  },
  experienceLevelList: {
    required: true,
    trigger: 'blur'
  }
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const params: any = {}
      Object.keys(search.value).map((key) => {
        if (key === '34') {
          params.experienceLevelList = search.value[key]
        }
        if (key === '57') {
          params.mainSkillList = search.value[key]
        }
        if (key === '47') {
          params.jobRolesList = search.value[key]
        }
        if (key === '48') {
          params.jobTypeList = search.value[key]
        }
      })

      const { _id, apply_url, isRemote, description, save_from, companyId, min_yearly_salary, max_yearly_salary } = jobData.value
      const { mainSkillList, jobTypeList, jobRolesList, experienceLevelList } = params
      const { data, message } = await checkOrUpdateJob({
        ...params,
        _id,
        apply_url,
        isRemote,
        description,
        save_from,
        mainSkillList,
        jobTypeList,
        jobRolesList,
        experienceLevelList,
        companyId,
        salary: {
          min_yearly_salary,
          max_yearly_salary
        }
      })
      ElMessage.success(message)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  router.go(-1)
}
</script>
