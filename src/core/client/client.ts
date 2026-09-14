import axios, { type AxiosInstance } from 'axios'
import { buildWebStorage, setupCache } from 'axios-cache-interceptor'

import type { MethodType } from '@/core/client/types'
import { AUTH_IS_DEMO, getToken, isDemoTokenExpired, removeToken } from '@/core/helpers'

const blockedURLs = [
  'ads/widget/referral/demo',
  'ads/widget/demo',
  'auth/nightbot',
]

export class Client {
  private static instance: Client
  axios: AxiosInstance & { storage: any }

  constructor() {
    // Create a regular axios instance
    const axiosInstance = axios.create()

    axiosInstance.defaults.headers.common['x-uplify-domain'] = window.location.host

    axiosInstance.interceptors.request.use(request => {
      const isDemoStreamer = localStorage.getItem(AUTH_IS_DEMO)
      const isLocaleRequest = request.url?.includes('/locale/save')

      if (isDemoStreamer) {
        if (isDemoTokenExpired()) {
          removeToken()
        }

        if (!isLocaleRequest) {
          const isPost = request.method === 'post'
          const isBlockedUrl = blockedURLs.find(url => request.url?.includes(url))

          if (isPost || isBlockedUrl) {
            throw new axios.Cancel('DEMO_REQUEST')
          }
        }
      }

      return request
    })

    axiosInstance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        // vm.config.globalProperties.$rollbar.critical(error)

        const is401 = error?.response?.status === 401
        if (is401 && getToken()) {
          removeToken()
        }
        return Promise.reject(error)
      },
    )

    this.axios = setupCache(axiosInstance, {
      storage: buildWebStorage(localStorage, 'uplify-cache:'),
      ttl: 0, // By default, cache is disabled
      interpretHeader: false,
      methods: ['get', 'post'],
      cachePredicate: {
        statusCheck: (status: number) => status >= 200 && status < 300,
      },
      // eslint-disable-next-line no-console
      debug: console.log,
    })
  }

  public static getInstance() {
    if (!Client.instance) {
      Client.instance = new Client()
    }

    return Client.instance
  }

  public setAuthToken(token: string) {
    this.axios.defaults.headers.common.Authorization = token
  }

  public get<RequestData>(url: string, params: RequestData, cacheConfig?: any) {
    return this.axios({
      method: 'get',
      url,
      params,
      ...cacheConfig,
    })
  }

  public post<RequestData>(url: string, data: RequestData, cacheConfig?: any) {
    return this.axios({
      method: 'post',
      url,
      data,
      ...cacheConfig,
    })
  }

  public patch<RequestData>(url: string, data: RequestData) {
    return this.axios({
      method: 'patch',
      url,
      data,
    })
  }

  public delete<RequestData>(url: string, data: RequestData) {
    return this.axios({
      method: 'delete',
      url,
      data,
    })
  }

  public request<RequestData>(
    method: MethodType,
    url: string,
    data: RequestData,
    cacheConfig?: any,
  ) {
    if (method === 'get') {
      return this.get(url, data, cacheConfig)
    }
    if (method === 'post') {
      return this.post(url, data, cacheConfig)
    }
    if (method === 'patch') {
      return this.patch(url, data)
    }
    if (method === 'delete') {
      return this.delete(url, data)
    }
    throw new Error('Undefined request method')
  }
}
