import { __API__ } from '../constants'
import { IDataResponse, IMaintenance } from '../types'

export const Maintenance = {
  async GetAll() {
    try {
      const req = await fetch(`${__API__}/maintenance`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IMaintenance[]>

      if (resp.data) {
        return resp.data as IMaintenance[]
      }

      throw new Error(`failed to fetch maintenance: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch maintenance: ${e}`)
    }
  },

  async GetById(id: number) {
    try {
      const req = await fetch(`${__API__}/maintenance/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IMaintenance>

      if (resp.data) {
        return resp.data as IMaintenance
      }

      throw new Error(`failed to fetch maintenance: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch maintenance: ${e}`)
    }
  },
}
