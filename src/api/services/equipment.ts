import { __API__ } from '../constants'
import { IDataResponse, IEquipment, IEquipmentUsageHistory } from '../types'

export const Equipment = {
  async getAll() {
    try {
      const req = await fetch(`${__API__}/equipment`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipment[]>

      if (resp.data) {
        return resp.data as IEquipment[]
      }

      throw new Error(`failed to fetch equipment: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment: ${e}`)
    }
  },

  async getAvailableByDate(data: { start_date: Date; end_date: Date }) {
    try {
      const req = await fetch(`${__API__}/equipment/available`, {
        method: 'POST',
        body: JSON.stringify(data),
      })

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipment[]>

      if (resp.data) {
        return resp.data as IEquipment[]
      }

      throw new Error(`failed to fetch equipment: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment: ${e}`)
    }
  },

  async getByEventId(id: number) {
    try {
      const req = await fetch(`${__API__}/equipment/event/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipment[]>

      if (resp.data) {
        return resp.data as IEquipment[]
      }

      throw new Error(`failed to fetch equipment: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment: ${e}`)
    }
  },

  async getById(id: number) {
    try {
      const req = await fetch(`${__API__}/equipment/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipment>

      if (resp.data) {
        return resp.data as IEquipment
      }

      throw new Error(`failed to fetch equipment: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment: ${e}`)
    }
  },

  async getUsageHistoryById(id: number) {
    try {
      const req = await fetch(`${__API__}/equipment/history/${id}`)

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }

      const resp = (await req.json()) as IDataResponse<IEquipmentUsageHistory[]>

      if (resp.data) {
        return resp.data as IEquipmentUsageHistory[]
      }

      throw new Error(`failed to fetch equipment usage history: ${resp.error}`)
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`failed to fetch equipment usage history: ${e}`)
    }
  },

  async create(data: { title: string; status: string }) {
    try {
      const req = await fetch(`${__API__}/equipment`, {
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
      throw new Error(`failed to create equipment: ${e}`)
    }
  },

  async update(data: { id: number; title: string; status: string }) {
    try {
      const req = await fetch(`${__API__}/equipment/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          status: data.status,
        }),
      })

      if (!req.ok) {
        throw new Error(`http error: ${req.body}`)
      }
    } catch (e) {
      throw new Error(`failed to create equipment: ${e}`)
    }
  },
}
