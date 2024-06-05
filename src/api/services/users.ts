import { AxiosResponse } from 'axios'
import { IDataResponse, IUser } from '../types'
import { $api } from '../axios'
import { __API__ } from '../constants'

export interface SignInDto {
  username: string
  password: string
}

export const User = {
  async getAll() {
    try {
      const req = await fetch(`${__API__}/users`)

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
      const req = await fetch(`${__API__}/users/${id}`)

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
      const req = await fetch(`${__API__}/users`, {
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
