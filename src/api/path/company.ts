import api from '../index'

export const fetchCompanyDetail = (params: { id: string }) => api.get('/company/detail', params)
export const fetchCompanyUpdate = (params: { id: string }) => api.post('/company/update', params)
export const fetchCompanyList = (params: any) => api.post('company/search', params)

export const uploadCompanyLogo = (params: any) => api.post('company/uploadLogoPhoto', params)
