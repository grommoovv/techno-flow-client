import axios from 'axios'
import { IDataResponse, ISignInResponse } from './types'

export const API_URL = `http://localhost:8000/api/v1`

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<IDataResponse<ISignInResponse>>(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('access_token', response.data.data.access_token)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('unauthorized')
      }
    }
    throw error
  }
)
