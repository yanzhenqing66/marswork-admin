import api from '../index'

export interface QueryItem {
  id: string
  labelName: string
  children?: QueryItem[]
  value?: string
  label?: string
}

export const fetchJobList = (params: any) => api.post('job/list', params)
export const fetchJobDetail = (params: any) => api.get('job/detail', params)
export const checkOrUpdateJob = (params: any) => api.post('job/checkOrUpdateJob', params)
export const fetchSearchQuery = () => api.get('label/treeVos')
