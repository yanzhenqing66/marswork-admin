import api from '../index'

export const saveHelpCategory = (params?: any) => api.post('helpCenter/saveHelpCategory', params)
export const categoryList = (params?: any) => api.post('helpCenter/categoryList', params || {})

export const deleteCategory = (params?: any) => api.get('helpCenter/deleteCategory', params)

export const saveHelpText = (params?: any) => api.post('helpCenter/saveHelpText', params)

export const deleteText = (params?: any) => api.get('helpCenter/deleteText', params)

export const textDetail = (params?: any) => api.get('helpCenter/textDetail', params)
export const textList = (params?: any) => api.post('helpCenter/textList', params)
export const feedbackList = (params?: any) => api.get('helpCenter/feedbackList', params)

export const uploadRichTextImage = (params?: any) => api.post('helpCenter/upHelpPhoto', params, { 'Content-Type': 'multipart/form-data' })

export const categorySort = (params?: any) => api.get('helpCenter/categorySort', params)
export const textSort = (params?: any) => api.get('helpCenter/textSort', params)
