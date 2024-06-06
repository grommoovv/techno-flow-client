import { __API__ } from '../constants'
import { IDataResponse, IReport } from '../types'

export const Report = {
  async getAll() {
    try {
      const req = await fetch(`${__API__}/reports`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IReport[]>

      if (resp.data) {
        return resp.data as IReport[]
      }

      throw new Error(`failed to fetch events: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch events: ${e}`)
    }
  },

  async getByUserId(id: number) {
    try {
      const req = await fetch(`${__API__}/reports/user/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IReport[]>

      if (resp.data) {
        return resp.data as IReport[]
      }

      throw new Error(`failed to fetch reports: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch reports: ${e}`)
    }
  },

  async create(data: { message: string; user_id: number; equipment_id: number }) {
    try {
      const req = await fetch(`${__API__}/reports`, {
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
}
