import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import { API } from '@/libs/config'

// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
  code: number
  message: string
  success?: boolean
}

// 请求响应参数，包含data
interface ResultData extends Result {
  data?: any
}
// const URL = ''
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 401, // 登录失效
  SUCCESS = 200 // 请求成功
}
const config = {
  // 默认地址
  baseURL: API,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  withCredentials: true
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const { headers }: any = config

        return {
          ...config,
          headers: {
            'x-poppy-token': Cookies.get('token') || '2ec01a2e-5f48-483b-bd3f-fd80103d8e38', // 请求头中携带token信息
            ...headers
          }
        }
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response // 解构
        if (data.code === RequestEnums.OVERDUE) {
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          // ElMessage.error(data) // 此处也可以使用组件提示报错信息
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) {
          this.handleCode(response.status)
        }
        // if (!window.navigator.onLine) {
        // ElMessage.error('网络连接失败')
        // 可以跳转到错误页面，也可以不做操作
        // return router.replace({
        //   path: '/404'
        // });
        // }
      }
    )
  }
  handleCode(code: number): void {
    switch (code) {
      case 401:
        Cookies.remove('token')
        break
      default:
        break
    }
  }

  // 常用方法封装
  get(url: string, params?: object, headers?: any): Promise<ResultData> {
    return this.service.get(url, { params, headers })
  }
  post(url: string, params?: object, headers?: any): Promise<ResultData> {
    return this.service.post(url, params, { headers })
  }
  put(url: string, params?: object): Promise<ResultData> {
    return this.service.put(url, params)
  }
  delete(url: string, params?: object): Promise<ResultData> {
    return this.service.delete(url, { params })
  }
}

// 导出一个实例对象
export default new RequestHttp(config)
