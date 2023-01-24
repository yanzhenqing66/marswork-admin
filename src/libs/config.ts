// 当前环境
export const DOMAIN_ENV: string | undefined = process.env.NODE_ENV

// 是否为生产
export const PROD_ENV: boolean = DOMAIN_ENV === 'production' ? true : false

// 接口
export const API: string = PROD_ENV ? 'https://marswork.xyz/api/' : 'http://47.254.32.179:8080/api/'
