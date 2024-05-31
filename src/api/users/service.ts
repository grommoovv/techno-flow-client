import { AxiosResponse } from 'axios'
import { IDataResponse, IUser } from '../types'
import { $api } from '../axios'

export interface SignInDto {
  username: string
  password: string
}

export const User = {
  async getAll() {
    try {
      const req = await fetch('http://localhost:8000/api/v1/users')

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IUser[]>

      if (resp.data) {
        return resp.data as IUser[]
      }

      throw new Error(`failed to fetch users: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch users: ${e}`)
    }
  },

  async getById(id: number) {
    try {
      const req = await fetch(`http://localhost:8000/api/v1/users/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IUser>

      if (resp.data) {
        return resp.data as IUser
      }

      throw new Error(`failed to fetch user: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch user: ${e}`)
    }
  },

  async create(data: { username: string; password: string }) {
    try {
      const req = await fetch('http://localhost:8000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }
    } catch (e) {
      throw new Error(`failed to create user: ${e}`)
    }
  },

  async update() {},

  async delete() {},
}
